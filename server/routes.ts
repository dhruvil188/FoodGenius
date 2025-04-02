import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";

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
  dietPlanRequestSchema,
  loginSchema,
  registerSchema,
  firebaseAuthSyncSchema,
  type AnalyzeImageResponse,
  type DietPlanRequest,
  type DietPlanResponse,
  type AuthResponse
} from "@shared/schema";

// Import error handling middleware
import { 
  errorHandler, 
  asyncHandler,
  ValidationError,
  AuthenticationError
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
  generateDietPlan,
  saveDietPlan,
  getUserDietPlans,
  getDietPlanById,
  deleteDietPlan
} from "./services/dietPlanService";

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

export async function registerRoutes(app: Express): Promise<Server> {
  // Register global error handler middleware
  app.use(errorHandler);
  
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
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName || null,
        profileImage: user.profileImage || null,
        credits: typeof user.credits === 'number' ? user.credits : 0,
        subscriptionStatus: user.subscriptionStatus || 'free',
        subscriptionTier: user.subscriptionTier || 'free'
      },
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
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName || null,
        profileImage: user.profileImage || null,
        credits: typeof user.credits === 'number' ? user.credits : 0,
        subscriptionStatus: user.subscriptionStatus || 'free',
        subscriptionTier: user.subscriptionTier || 'free'
      }
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
  
  // ==== Diet Plan Routes ====
  
  // Generate a diet plan
  app.post("/api/diet-plans/generate", authenticate, asyncHandler(async (req: Request, res: Response) => {
    // Validate the request body
    const validatedData = dietPlanRequestSchema.parse(req.body);
    
    // Check user has enough credits
    if (req.user.credits <= 0 && req.user.subscriptionTier === 'free') {
      throw new ValidationError("You don't have enough credits. Please upgrade your subscription.");
    }
    
    // Generate diet plan with AI
    const dietPlan = await generateDietPlan(req.user.id, validatedData);
    
    // Return diet plan result
    return res.status(200).json(dietPlan);
  }));
  
  // Save a generated diet plan
  app.post("/api/diet-plans", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const { planName, dietPlan, mealsPerDay } = req.body;
    
    if (!planName || !dietPlan || !mealsPerDay) {
      throw new ValidationError("Missing required fields");
    }
    
    const savedPlan = await saveDietPlan(req.user.id, planName, dietPlan, mealsPerDay);
    return res.status(201).json(savedPlan);
  }));
  
  // Get all saved diet plans for a user
  app.get("/api/diet-plans", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const dietPlans = await getUserDietPlans(req.user.id);
    return res.status(200).json(dietPlans);
  }));
  
  // Get diet plan by ID
  app.get("/api/diet-plans/:id", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const planId = parseInt(req.params.id);
    const dietPlan = await getDietPlanById(planId, req.user.id);
    return res.status(200).json(dietPlan);
  }));
  
  // Delete a diet plan
  app.delete("/api/diet-plans/:id", authenticate, asyncHandler(async (req: Request, res: Response) => {
    const planId = parseInt(req.params.id);
    await deleteDietPlan(planId, req.user.id);
    return res.status(200).json({ success: true });
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
      
      const user = await getUserById(req.user.id);
      
      // In production, this would be triggered by a Stripe webhook after payment confirmation
      // Here we're just updating the credits directly for testing purposes
      // In the actual service this would use storage.updateUserCredits
      
      return res.status(200).json({ 
        success: true,
        user: { ...user, credits }
      });
    }));
  }
  
  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}