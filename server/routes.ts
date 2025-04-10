import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import crypto from "crypto";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import {
  analyzeImageRequestSchema,
  loginSchema,
  registerSchema,
  firebaseAuthSyncSchema,
  type AnalyzeImageResponse,
  type AuthResponse,
  type AppUser
} from "@shared/schema";

// Import error handling middleware
import { 
  errorHandler, 
  asyncHandler,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseConnectionError
} from "./middleware/errorHandler";

// Import service layer
import { analyzeImage } from "./services/aiService";
import { 
  syncFirebaseUser, 
  validateSession, 
  endUserSession,
  getUserById
} from "./services/authService";
import {
  saveRecipe,
  getUserRecipes,
  getRecipeById,
  deleteRecipe,
  toggleFavorite
} from "./services/recipeService";
import {
  generateRecipeFromChatPrompt,
  getChatMessages,
  getUserConversations,
  createChatMessage,
  deleteConversation
} from "./services/chatService";

// Import storage for user conversion
import { storage } from './storage';
import { isDatabaseConnected } from './db';

// Simple mock user ID for guest access
const GUEST_USER_ID = 1;

// Setup Stripe if API key available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

/**
 * Middleware to extract auth token from request
 */
function extractAuthToken(req: Request): string | null {
  // Check Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  
  // Then check cookies
  if (req.cookies && req.cookies.auth_token) {
    return req.cookies.auth_token;
  }
  
  return null;
}

/**
 * Middleware to validate authentication
 */
async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = extractAuthToken(req);
  
  if (!token) {
    return next(new AuthenticationError());
  }
  
  try {
    const user = await validateSession(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token
 */
async function optionalAuthenticate(req: Request, res: Response, next: NextFunction) {
  const token = extractAuthToken(req);
  
  if (!token) {
    return next();
  }
  
  try {
    const user = await validateSession(token);
    req.user = user;
  } catch (error) {
    // Ignore auth errors in optional auth
    console.warn("Optional auth failed:", error);
  }
  
  next();
}

// Middleware to check database connectivity
function checkDatabaseConnectivity(req: Request, res: Response, next: NextFunction) {
  if (!isDatabaseConnected()) {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    if (isDevelopment) {
      // In development, show a warning but allow the request to proceed
      console.warn("⚠️ Database connection not established, some functionality may be limited");
      next();
    } else {
      // In production, throw a proper database connection error
      const missingVars = [];
      if (!process.env.DATABASE_URL) missingVars.push('DATABASE_URL');
      if (!process.env.PGHOST) missingVars.push('PGHOST');
      if (!process.env.PGDATABASE) missingVars.push('PGDATABASE');
      if (!process.env.PGUSER) missingVars.push('PGUSER');
      if (!process.env.PGPASSWORD) missingVars.push('PGPASSWORD');
      
      const errorDetails = missingVars.length > 0 
        ? `Missing required environment variables: ${missingVars.join(', ')}`
        : 'Please check your database configuration';
      
      // Use our new DatabaseConnectionError class
      const error = new DatabaseConnectionError("Database connection required", errorDetails);
      
      // Add additional properties for frontend handling
      const responseObj = {
        success: false,
        message: error.message,
        status: error.statusCode,
        setup_required: true
      };
      
      res.status(error.statusCode).json(responseObj);
    }
  } else {
    next();
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register global error handler middleware
  app.use(errorHandler);
  
  // Add route to check database status - useful for deployment health checks
  app.get("/api/health", (req: Request, res: Response) => {
    const isDbConnected = isDatabaseConnected();
    
    res.status(isDbConnected ? 200 : 503).json({
      status: isDbConnected ? "healthy" : "degraded",
      database: isDbConnected ? "connected" : "disconnected",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString()
    });
  });
  
  // Apply database connectivity check to all API routes except health check
  app.use([
    '/api/auth/*', 
    '/api/recipes/*', 
    '/api/recipes',
    '/api/analyze-image',
    '/api/chat/*',
    '/api/stripe/*'
  ], checkDatabaseConnectivity);
  
  // ==== Auth Routes ====
  
  // Firebase Auth sync endpoint - syncs Firebase user with our database
  app.post("/api/auth/firebase-sync", asyncHandler(async (req: Request, res: Response) => {
    // Validate request data using the Firebase auth sync schema
    const validatedData = firebaseAuthSyncSchema.parse(req.body);
    
    // Sync the Firebase user with our database
    const { user, token } = await syncFirebaseUser(validatedData);
    
    // Return successful response with user data and token
    const authResponse: AuthResponse = {
      success: true,
      user: storage.convertToAppUser(user),
      token,
      message: "Firebase authentication successful"
    };
    
    // Set token in cookie for future requests
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    
    return res.status(200).json(authResponse);
  }));
  
  // Get current user info
  app.get("/api/auth/me", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    
    return res.status(200).json({
      success: true,
      user: storage.convertToAppUser(user)
    });
  }));
  
  // Logout endpoint
  app.post("/api/auth/logout", asyncHandler(async (req: Request, res: Response) => {
    const token = extractAuthToken(req);
    
    if (token) {
      await endUserSession(token);
    }
    
    // Clear auth cookie
    res.clearCookie("auth_token");
    
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  }));
  
  // ==== Recipe Routes ====
  
  // Analyze food image
  app.post("/api/analyze-image", authenticate, asyncHandler(async (req: Request, res: Response) => {
    // Validate the request body
    const validatedData = analyzeImageRequestSchema.parse(req.body);
    const { imageData } = validatedData;
    
    // Check user has enough credits
    if (req.user.credits <= 0 && req.user.subscriptionTier !== 'premium') {
      throw new ValidationError("You don't have enough credits. Please upgrade your subscription.");
    }
    
    try {
      // Process image with AI
      const result = await analyzeImage(imageData, req.user.id);
      
      // Store the original image URL in the result for saving
      result.imageUrl = imageData;
      
      // If the user doesn't have premium subscription, deduct a credit
      let creditsCost = 0;
      let creditsRemaining = req.user.credits;
      
      if (req.user.subscriptionTier !== 'premium') {
        // Deduct 1 credit
        creditsCost = 1;
        creditsRemaining = Math.max(0, req.user.credits - 1);
        await storage.updateUserCredits(req.user.id, creditsRemaining);
        console.log(`Deducted 1 credit from user ${req.user.id}, credits remaining: ${creditsRemaining}`);
      }
      
      // Log the activity
      await storage.logUserActivity({
        userId: req.user.id,
        activityType: "image_analysis",
        details: {
          foodName: result.foodName,
          tags: result.tags
        },
        creditsCost: creditsCost,
        creditsRemaining: creditsRemaining,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"]
      });
      
      // Return analysis result
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in image analysis:", error);
      throw error;
    }
  }));
  
  // Get all saved recipes for a user
  app.get("/api/recipes", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const recipes = await getUserRecipes(req.user.id);
    return res.status(200).json(recipes);
  }));
  
  // Get recipe by ID (with optional auth for public browsing)
  app.get("/api/recipes/:id", optionalAuthenticate, asyncHandler(async (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const userId = req.user?.id;
    
    // If user is logged in, check permission, otherwise just get recipe
    const recipe = await getRecipeById(recipeId, userId);
    return res.status(200).json(recipe);
  }));
  
  // Create a new saved recipe
  app.post("/api/recipes", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const recipeData: AnalyzeImageResponse = req.body.recipe;
    const savedRecipe = await saveRecipe(req.user.id, recipeData);
    return res.status(201).json(savedRecipe);
  }));
  
  // Delete a recipe
  app.delete("/api/recipes/:id", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    await deleteRecipe(recipeId, req.user.id);
    return res.status(200).json({ success: true });
  }));
  
  // Toggle recipe favorite status
  app.patch("/api/recipes/:id/favorite", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const recipeId = parseInt(req.params.id);
    const updatedRecipe = await toggleFavorite(recipeId, req.user.id);
    return res.status(200).json(updatedRecipe);
  }));

  // ==== Chat Routes ====
  
  // Get user conversations (chat history)
  app.get("/api/chat/conversations", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const conversations = await getUserConversations(req.user.id);
    return res.status(200).json(conversations);
  }));
  
  // Delete a conversation
  app.delete("/api/chat/conversations/:conversationId", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const success = await deleteConversation(req.user.id, conversationId);
    
    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
  }));
  
  // Get messages for a specific conversation
  app.get("/api/chat/messages/:conversationId", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const messages = await getChatMessages(req.user.id, conversationId);
    return res.status(200).json(messages);
  }));
  
  // Create a new chat message
  app.post("/api/chat/messages", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const { content, conversationId } = req.body;
    
    if (!content) {
      throw new ValidationError("Message content is required");
    }
    
    const message = await createChatMessage(
      req.user.id,
      content,
      conversationId || crypto.randomUUID(), // Generate new conversation ID if not provided
      'user'
    );
    
    return res.status(201).json(message);
  }));
  
  // Generate a recipe from chat prompt
  app.post("/api/chat/generate-recipe", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const { prompt, conversationId } = req.body;
    
    if (!prompt) {
      throw new ValidationError("Recipe prompt is required");
    }
    
    // Check user has enough credits
    if (req.user.credits <= 0 && req.user.subscriptionTier !== 'premium') {
      throw new ValidationError("You don't have enough credits. Please upgrade your subscription.");
    }
    
    try {
      // Generate recipe from chat prompt
      const result = await generateRecipeFromChatPrompt(req.user.id, prompt, conversationId);
      
      // If the user doesn't have premium subscription, deduct a credit
      let creditsCost = 0;
      let creditsRemaining = req.user.credits;
      
      if (req.user.subscriptionTier !== 'premium') {
        // Deduct 1 credit
        creditsCost = 1;
        creditsRemaining = Math.max(0, req.user.credits - 1);
        await storage.updateUserCredits(req.user.id, creditsRemaining);
        console.log(`Deducted 1 credit from user ${req.user.id}, credits remaining: ${creditsRemaining}`);
      }
      
      // Log the activity
      await storage.logUserActivity({
        userId: req.user.id,
        activityType: "generate_recipe",
        resourceId: result.message.conversationId,
        details: {
          prompt: prompt,
          foodName: result.recipe.foodName
        },
        creditsCost: creditsCost,
        creditsRemaining: creditsRemaining,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"]
      });
      
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in recipe generation:", error);
      throw error;
    }
  }));
  


  // ==== Stripe Routes ====
  
  // Only setup Stripe routes if API key is available
  if (stripe) {
    // Create a Stripe Checkout Session for the premium plan
    app.post('/api/stripe/create-checkout-session', authenticate, asyncHandler(async (req: Request, res: Response) => {
      try {
        // Get the user from the request
        const user = req.user;
        if (!user) {
          throw new AuthenticationError();
        }
        
        // Check if the user already has a Stripe customer ID
        let customerId = user.stripeCustomerId;
        
        // If not, create a new customer in Stripe
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            name: user.displayName || user.username,
            metadata: {
              userId: user.id.toString()
            }
          });
          
          customerId = customer.id;
          
          // Update the user's Stripe customer ID in our database
          await storage.updateStripeCustomerId(user.id, customerId);
        }
        
        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_1R9K9GRp4HZDUL919GPin0ra',
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/payment-cancel`,
          metadata: {
            userId: user.id.toString()
          }
        });
        
        // Return the session ID to the client
        res.json({ 
          sessionId: session.id,
          url: session.url 
        });
      } catch (error) {
        console.error('Stripe checkout session creation error:', error);
        throw new Error(`Failed to create checkout session: ${(error as Error).message}`);
      }
    }));
    
    // Verify a successful payment and update user credits
    // New endpoint for updating credits after payment from payment link
    app.post('/api/stripe/update-credits', authenticate, asyncHandler(async (req: Request, res: Response) => {
      try {
        const { userId, credits } = req.body;
        
        if (!userId || !credits) {
          throw new ValidationError("User ID and credits are required");
        }
        
        // Only allow admins or the user themselves to update credits
        if (Number(req.user.id) !== Number(userId) && req.user.role !== 'admin') {
          console.log('Auth Error:', { requestUserId: req.user.id, targetUserId: userId, userRole: req.user.role });
          throw new AuthorizationError("You don't have permission to update credits for this user");
        }
        
        // Update the user credits
        const updatedUser = await storage.updateUserCredits(userId, credits);
        
        // Send email notification to admin (commented out as we don't have email setup)
        // await sendEmailNotification(`User ID ${userId} has purchased ${credits} credits`);
        
        // Log the purchase for audit purposes
        console.log(`[PAYMENT] User ID ${userId} purchased ${credits} credits`);
        
        // Track the credit purchase activity
        await storage.logUserActivity({
          userId: Number(userId),
          activityType: "purchase_credits",
          details: {
            creditsAdded: credits,
            totalCredits: updatedUser.credits
          },
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"]
        });
        
        return res.status(200).json({
          success: true,
          user: storage.convertToAppUser(updatedUser),
          message: `Successfully added ${credits} credits to user ${userId}`
        });
      } catch (error) {
        console.error('Error updating credits:', error);
        throw error;
      }
    }));
    
    // Keep the old endpoint for backward compatibility
    app.get('/api/stripe/session-status/:sessionId', authenticate, asyncHandler(async (req: Request, res: Response) => {
      try {
        const { sessionId } = req.params;
        
        if (!sessionId) {
          throw new ValidationError("Session ID is required");
        }
        
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        // Check if payment was successful
        if (session.payment_status === 'paid') {
          // Update the user credits (15 credits for premium plan)
          const updatedUser = await storage.updateUserCredits(req.user.id, 15);
          
          // Update subscription status
          await storage.updateUser(req.user.id, {
            subscriptionStatus: 'active',
            subscriptionTier: 'premium'
          });
          
          return res.status(200).json({
            success: true,
            user: storage.convertToAppUser(updatedUser),
            session
          });
        }
        
        // If payment is still pending or failed
        return res.status(200).json({
          success: false,
          message: `Payment ${session.payment_status}`,
          session
        });
        
      } catch (error) {
        console.error('Stripe session status error:', error);
        throw new Error(`Failed to verify payment: ${(error as Error).message}`);
      }
    }));
    
    // Webhook to handle stripe events (payment confirmations, etc.)
    // Note: For this to work in production, you'll need to configure express.raw before routes
    app.post('/api/stripe/webhook', asyncHandler(async (req, res) => {
      const sig = req.headers['stripe-signature'];
      
      if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
        return res.status(400).send('Webhook signature or secret missing');
      }
      
      let event;
      
      try {
        // Verify the webhook signature
        event = stripe.webhooks.constructEvent(
          req.body, 
          sig, 
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      }
      
      // Handle specific events
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract user ID from metadata
        const userId = session.metadata?.userId;
        
        if (userId && session.payment_status === 'paid') {
          try {
            // Get the user from DB
            const user = await storage.getUser(parseInt(userId));
            
            if (user) {
              // Add credits to the user account (10 credits for premium)
              await storage.updateUserCredits(user.id, 10);
              
              // Update subscription status
              await storage.updateUser(user.id, {
                subscriptionStatus: 'active',
                subscriptionTier: 'premium'
              });
              
              // Track the payment activity
              await storage.logUserActivity({
                userId: user.id,
                activityType: "webhook_payment",
                resourceId: session.id,
                details: {
                  creditsAdded: 10,
                  totalCredits: user.credits + 10,
                  paymentType: "stripe_webhook",
                  paymentStatus: session.payment_status
                }
              });
              
              console.log(`✅ Added 10 credits to user ${userId} after payment`);
            }
          } catch (error) {
            console.error('Error processing webhook payment:', error);
          }
        }
      }
      
      // Return a 200 response to acknowledge receipt of the event
      res.json({received: true});
    }));
    
    // Endpoint for updating credits is defined above
  }
  
  // Serve sitemap.xml with proper XML content type
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    try {
      // Get base URL from request or use a default
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://image2recipe.com' 
        : `${req.protocol}://${req.get('host')}`;
      
      // Current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Generate XML content directly
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Add static routes
      const staticRoutes = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/library', priority: '0.8', changefreq: 'weekly' },
        { path: '/recipes', priority: '0.8', changefreq: 'daily' },
        { path: '/chat', priority: '0.7', changefreq: 'weekly' },
        { path: '/auth', priority: '0.6', changefreq: 'monthly' },
        { path: '/contact', priority: '0.5', changefreq: 'monthly' },
        { path: '/terms', priority: '0.3', changefreq: 'yearly' },
        { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
        { path: '/blog', priority: '0.9', changefreq: 'daily' },
        { path: '/credits', priority: '0.6', changefreq: 'monthly' },
      ];
      
      staticRoutes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
      });
      
      // Add blog posts routes - just a few examples
      const blogPosts = [
        { slug: 'science-behind-perfect-sourdough-bread', date: '2025-01-15' },
        { slug: 'plant-based-protein-guide-vegetarian-cooking', date: '2025-01-18' },
        { slug: 'thai-green-curry-authentic-recipe-history', date: '2025-01-25' },
        { slug: 'japanese-ramen-regional-varieties-techniques', date: '2025-02-01' },
        { slug: 'spanish-paella-valencian-tradition-modern-variations', date: '2025-02-05' },
        { slug: 'french-pastry-techniques-perfect-croissants', date: '2025-02-10' },
        { slug: 'mexican-mole-poblano-complex-sauce-history', date: '2025-02-20' },
        { slug: 'korean-kimchi-fermentation-guide-variations', date: '2025-02-25' },
        { slug: 'indian-butter-chicken-tandoori-tradition', date: '2025-03-01' }
      ];
      
      blogPosts.forEach(post => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
      });
      
      // Close the XML document
      xml += '</urlset>';
      
      // Set the correct content type for XML
      res.setHeader('Content-Type', 'application/xml');
      
      // Send the XML content
      res.send(xml);
    } catch (error) {
      console.error('Error generating sitemap.xml:', error);
      res.status(500).send('Error generating sitemap');
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}