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
  // Always proceed with the request even if database is not connected
  // This prevents the red error card on mobile while still logging the issue
  if (!isDatabaseConnected()) {
    // Log the warning but allow all requests to proceed
    console.warn("⚠️ Database connection not established, some functionality may be limited");
    
    // Only collect debug info, but don't block the request
    const missingVars = [];
    if (!process.env.DATABASE_URL) missingVars.push('DATABASE_URL');
    if (!process.env.PGHOST) missingVars.push('PGHOST');
    if (!process.env.PGDATABASE) missingVars.push('PGDATABASE');
    if (!process.env.PGUSER) missingVars.push('PGUSER');
    if (!process.env.PGPASSWORD) missingVars.push('PGPASSWORD');
    
    if (missingVars.length > 0) {
      console.warn(`Missing database variables: ${missingVars.join(', ')}`);
    }
  }
  
  // Always proceed to the next middleware
  next();
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
    if (req.user.credits <= 0 && req.user.subscriptionTier === 'free') {
      throw new ValidationError("You don't have enough credits. Please upgrade your subscription.");
    }
    
    // Process image with AI
    const result = await analyzeImage(imageData, req.user.id);
    
    // Store the original image URL in the result for saving
    result.imageUrl = imageData;
    
    // Return analysis result
    return res.status(200).json(result);
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
    if (req.user.credits <= 0 && req.user.subscriptionTier === 'free') {
      throw new ValidationError("You don't have enough credits. Please upgrade your subscription.");
    }
    
    // Generate recipe from chat prompt
    const result = await generateRecipeFromChatPrompt(req.user.id, prompt, conversationId);
    
    return res.status(200).json(result);
  }));
  


  // ==== Stripe Routes ====
  
  // Only setup Stripe routes if API key is available
  if (stripe) {
    // Update user credits (for testing)
    app.post('/api/stripe/update-credits', authenticate, asyncHandler(async (req: Request, res: Response) => {
      // This is just for testing - in production you'd use webhooks to update credits
      const { credits } = req.body;
      
      if (typeof credits !== 'number' || credits < 0) {
        throw new ValidationError("Invalid credits amount");
      }
      
      // Get the user and update their credits
      const updatedUser = await storage.updateUserCredits(req.user.id, credits);
      
      // In production, this would be triggered by a Stripe webhook after payment confirmation
      // Here we're updating the credits directly for testing purposes
      
      return res.status(200).json({ 
        success: true,
        user: storage.convertToAppUser(updatedUser)
      });
    }));
  }
  
  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}