import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, generateToken, verifyPassword, hashPassword } from "./storage";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import {
  analyzeImageRequestSchema,
  analyzeImageResponseSchema,
  loginSchema,
  registerSchema,
  authResponseSchema,
  insertSavedRecipeSchema,
  type AnalyzeImageResponse,
  type YoutubeVideo,
  type AuthResponse,
  type User,
  type InsertSavedRecipe,
  type SavedRecipe,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

import { getMockAnalysisResponse } from "./mockData";
import { searchYouTubeVideos } from "./services/youtubeService";

// Simple mock user ID for guest access
const GUEST_USER_ID = 1;

export async function registerRoutes(app: Express): Promise<Server> {
  // Image analysis endpoint
  app.post("/api/analyze-image", async (req: Request, res: Response) => {
    try {
      // Validate request
      const { imageData } = analyzeImageRequestSchema.parse(req.body);

      // Check if the user is authenticated (optional - for future use)
      let userId = GUEST_USER_ID;
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const session = await storage.getSessionByToken(token);
        if (session) {
          userId = session.userId;
        }
      }

      // Configure the generative model
      const model = genAI.getGenerativeModel({
        model: "gemini-pro-vision",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      // Format the prompt
      const prompt = `Analyze this food image and provide a comprehensive recipe with the following structured information in JSON format:
      - name: Name of the dish
      - description: Detailed description of the dish
      - cuisine: Cuisine type
      - difficulty: Cooking difficulty (1-5)
      - prepTime: Preparation time in minutes
      - cookTime: Cooking time in minutes
      - servings: Number of servings
      - ingredientGroups: Array of objects with 'heading' and 'ingredients' array
      - instructions: Detailed step-by-step cooking instructions
      - nutritionInfo: Object with calories, protein, carbs, and fat
      - tips: Array of cooking tips and tricks
      - variations: Array of recipe variations
      - sideDishes: Array of recommended side dishes
      - youtubeVideos: Array of video IDs (leave empty, will be filled later)
      - equipmentNeeded: Array of kitchen equipment needed
      - techniques: Detailed cooking techniques used
      - culturalContext: Historical and cultural background of the dish
      - presentationTips: Tips for plating and serving
      - cookingScience: Scientific principles behind the recipe
      - sensoryProfile: Taste, texture, and aroma notes
      - allergens: Common allergens in the recipe
      - storageInstructions: How to store leftovers
      - reheatingInstructions: How to reheat leftovers

      Format the response as valid JSON with proper syntax.`;

      // Analyze the image
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData.split(",")[1],
          },
        },
      ]);

      const response = result.response;
      const text = response.text();
      
      // Extract the JSON object from the response
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      const jsonStr = text.substring(jsonStart, jsonEnd);
      
      // Parse the JSON and validate it against our schema
      const jsonData = JSON.parse(jsonStr);
      const validatedData = analyzeImageResponseSchema.parse(jsonData);
      
      // If YouTube API key is available, fetch related videos
      if (process.env.YOUTUBE_API_KEY) {
        try {
          const videos = await searchYouTubeVideos(validatedData.name);
          validatedData.youtubeVideos = videos;
        } catch (error) {
          console.error("Error fetching YouTube videos:", error);
        }
      }
      
      res.json(validatedData);
    } catch (error) {
      console.error("Error analyzing image:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      // For demo purposes, return mock data if the API fails
      if (error.message?.includes("quota")) {
        const mockData = getMockAnalysisResponse();
        return res.json(mockData);
      }
      
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Authentication endpoints
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Hash the password
      const { hash, salt } = hashPassword(userData.password);
      
      // Create the user
      const user = await storage.createUser({
        username: userData.username,
        email: userData.email,
        password: `${hash}.${salt}`,
        avatarUrl: userData.avatarUrl || null,
        createdAt: new Date(),
      });
      
      // Create a session
      const token = generateToken();
      const session = await storage.createSession({
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
      
      const authResponse: AuthResponse = {
        user,
        token: session.token,
      };
      
      res.status(201).json(authResponse);
    } catch (error) {
      console.error("Error registering user:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Find the user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Verify the password
      const [hash, salt] = user.password.split(".");
      if (!verifyPassword(password, hash, salt)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Create a session
      const token = generateToken();
      const session = await storage.createSession({
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
      
      const authResponse: AuthResponse = {
        user,
        token: session.token,
      };
      
      res.json(authResponse);
    } catch (error) {
      console.error("Error logging in:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      await storage.deleteSession(token);
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Failed to log out" });
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      const session = await storage.getSessionByToken(token);
      
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const user = await storage.getUser(session.userId);
      
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Recipe management endpoints
  app.get("/api/recipes", async (req: Request, res: Response) => {
    try {
      let userId = GUEST_USER_ID;
      
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const session = await storage.getSessionByToken(token);
        
        if (session) {
          userId = session.userId;
        }
      }
      
      const recipes = await storage.getSavedRecipes(userId);
      res.json(recipes);
    } catch (error) {
      console.error("Error getting recipes:", error);
      res.status(500).json({ error: "Failed to get recipes" });
    }
  });

  app.post("/api/recipes", async (req: Request, res: Response) => {
    try {
      let userId = GUEST_USER_ID;
      
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const session = await storage.getSessionByToken(token);
        
        if (session) {
          userId = session.userId;
        }
      }
      
      const recipeData: AnalyzeImageResponse = req.body.recipe;
      
      // Create the recipe
      const recipe = await storage.createSavedRecipe({
        userId,
        name: recipeData.name,
        description: recipeData.description,
        imageUrl: req.body.imageUrl || null,
        recipeData,
        isFavorite: false,
        createdAt: new Date(),
      });
      
      res.status(201).json(recipe);
    } catch (error) {
      console.error("Error saving recipe:", error);
      res.status(500).json({ error: "Failed to save recipe" });
    }
  });

  app.get("/api/recipes/:id", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      const recipe = await storage.getSavedRecipeById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      
      res.json(recipe);
    } catch (error) {
      console.error("Error getting recipe:", error);
      res.status(500).json({ error: "Failed to get recipe" });
    }
  });

  app.delete("/api/recipes/:id", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      const success = await storage.deleteSavedRecipe(recipeId);
      
      if (!success) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Failed to delete recipe" });
    }
  });

  app.patch("/api/recipes/:id/favorite", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      const { isFavorite } = req.body;
      
      const recipe = await storage.updateSavedRecipe(recipeId, { isFavorite });
      
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      
      res.json(recipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ error: "Failed to update recipe" });
    }
  });

  // Add Stripe API endpoints for subscription and one-time payments
  app.post("/api/create-subscription", async (req: Request, res: Response) => {
    try {
      const { planId, interval = "month" } = req.body;
      
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      const userSession = await storage.getSessionByToken(token);
      
      if (!userSession) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const user = await storage.getUser(userSession.userId);
      
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      
      // Price IDs would normally come from the database
      // For simplicity in this implementation, we're using fixed price values
      let priceAmount = 0;
      let analysisCount = 0;
      let name = "";
      
      switch (planId) {
        case "basic":
          priceAmount = interval === "month" ? 800 : 7680; // $8/mo or $76.80/yr (20% discount)
          analysisCount = 50;
          name = "Basic Plan";
          break;
        case "premium":
          priceAmount = interval === "month" ? 1200 : 11520; // $12/mo or $115.20/yr
          analysisCount = 100;
          name = "Premium Plan";
          break;
        case "unlimited":
          priceAmount = interval === "month" ? 2500 : 24000; // $25/mo or $240/yr
          analysisCount = -1; // Unlimited
          name = "Unlimited Plan";
          break;
        default:
          return res.status(400).json({ error: "Invalid plan ID" });
      }
      
      // Create a Stripe checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${name} (${interval}ly)`,
                description: `${analysisCount === -1 ? "Unlimited" : analysisCount} recipe analyses per ${interval}`
              },
              unit_amount: priceAmount, // in cents
              recurring: {
                interval: interval === "month" ? "month" : "year"
              }
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/subscription`,
      });
      
      res.json({ 
        clientSecret: checkoutSession.id
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ error: "Failed to create subscription" });
    }
  });
  
  app.post("/api/pay-per-use", async (req: Request, res: Response) => {
    try {
      const { amount } = req.body;
      
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      const userSession = await storage.getSessionByToken(token);
      
      if (!userSession) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const user = await storage.getUser(userSession.userId);
      
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      
      // Create a Stripe checkout session for a one-time payment
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Single Recipe Analysis",
                description: "One-time payment for a single recipe analysis"
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/subscription`,
      });
      
      res.json({ 
        clientSecret: checkoutSession.id
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Failed to process payment" });
    }
  });
  
  // Check subscription status
  app.get("/api/subscription-status", async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const token = req.headers.authorization.split(" ")[1];
      const userSession = await storage.getSessionByToken(token);
      
      if (!userSession) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const user = await storage.getUser(userSession.userId);
      
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      
      // In a real implementation, this would check the user's subscription status in the database
      // For now, we'll return a mock response
      res.json({
        subscribed: true,
        plan: "premium",
        analysisCount: 100,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      });
    } catch (error) {
      console.error("Error checking subscription status:", error);
      res.status(500).json({ error: "Failed to check subscription status" });
    }
  });
  
  // Webhook to handle Stripe events
  app.post("/api/webhook", async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    
    let event;
    
    try {
      // Verify the event came from Stripe
      // In production, you should configure the webhook secret in your Stripe dashboard
      // and use it to verify the signature
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || "whsec_test"
      );
    } catch (error: any) {
      console.error("Webhook signature verification failed:", error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object;
        // Update subscription status in database
        break;
      case "invoice.paid":
        const invoice = event.data.object;
        // Update subscription status in database
        break;
      case "invoice.payment_failed":
        const failedInvoice = event.data.object;
        // Notify customer of failed payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({ received: true });
  });
  
  const httpServer = createServer(app);
  return httpServer;
}