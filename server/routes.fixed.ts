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

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});
import { getMockAnalysisResponse } from "./mockData";
import { searchYouTubeVideos } from "./services/youtubeService";

// Simple mock user ID for guest access
const GUEST_USER_ID = 1;

export async function registerRoutes(app: Express): Promise<Server> {
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
  
  // Rest of the Express routes...
  
  const httpServer = createServer(app);
  return httpServer;
}