import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  analyzeImageRequestSchema,
  analyzeImageResponseSchema,
  type AnalyzeImageResponse,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { getMockAnalysisResponse } from "./mockData";

export async function registerRoutes(app: Express): Promise<Server> {
  // Flag to enable development mode with mock data when API quota is exceeded
  const USE_MOCK_DATA_ON_QUOTA_EXCEEDED = true;
  
  // Initialize the Google Generative AI API with the user-provided key
  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || "AIzaSyCWVuSm3Dq_htbl2FgoQ_r5Fsw5N-mDTvc"
  );

  // Define the model to use for image analysis
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  app.post("/api/analyze-image", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = analyzeImageRequestSchema.parse(req.body);
      const { imageData } = validatedData;

      // Remove the data URL prefix to get the base64 string
      const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "");

      // Prepare the image part
      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      // Generate content using Gemini API
      const prompt = `
      You are a professional culinary consultant and food expert specializing in detailed recipe analysis.
      
      Analyze this food image in extreme detail and provide:
      
      1. The exact name of the dish with any regional variations or authentic naming
      2. A comprehensive yet concise description of the dish including cultural context, origin, and traditional serving occasions
      3. Detailed tags/categories (cuisine type, regional cuisine, diet type, meal type, cooking method, flavor profile, texture)
      
      4. 3 different recipes for how to make this dish - an authentic traditional version, a quick weeknight version, and a gourmet elevated version. For each recipe, include:
         - Creative and descriptive title that captures the recipe's unique aspects
         - Detailed description highlighting what makes this version special
         - Precise preparation time, cooking time, and total time
         - Exact servings with portion size information
         - Specific difficulty level with brief explanation of what makes it that level
         - Comprehensive dietary tags including allergies (gluten-free, dairy-free, nut-free, etc.)
         - Complete ingredients list with precise measurements (both metric and imperial), prep notes for each ingredient, and quality indicators
         - Step-by-step instructions with detailed professional chef techniques, visual cues for doneness, and time estimates for each step
         - Complete nutritional profile (calories, protein, carbs, fats, fiber, sugar, sodium, vitamins)
         - Healthy alternatives for key ingredients with specific substitution ratios and how they affect the final dish
         - Detailed dietary notes (if high in particular nutrients, good for specific diets or health conditions)
         - Recipe variations (spicy, buttery & rich, and non-spicy versions with precise adjustments and flavor profiles)
         - Expert chef tips and common mistakes to avoid
         - Storage instructions and reheating methods
         - Wine or beverage pairing suggestions
         - Complementary side dishes (name, description, preparation time, why they pair well)
      
      Format your response as a JSON object with the following structure:
      {
        "foodName": "Complete authentic name of the dish",
        "description": "Comprehensive description with cultural context",
        "tags": ["cuisine", "regional", "diet type", "meal type", "cooking method", "flavor profile", "texture"],
        "recipes": [
          {
            "title": "Descriptive recipe title",
            "description": "Detailed recipe description with what makes it unique",
            "prepTime": "Precise prep time",
            "cookTime": "Precise cook time",
            "totalTime": "Total time", 
            "servings": number,
            "servingSize": "Description of portion size",
            "difficulty": "Difficulty level with brief explanation",
            "tags": ["dietary restriction", "allergy info"],
            "ingredients": ["Detailed ingredient with measurement, prep note, and quality indicators"],
            "instructions": ["Detailed step with technique, visual cues, and time"],
            "chefTips": ["Professional cooking tips"],
            "commonMistakes": ["Mistakes to avoid"],
            "storageInstructions": "How to store and for how long",
            "reheatingMethods": "Best ways to reheat",
            "beveragePairings": ["Complementary drink suggestions"],
            "nutritionInfo": {
              "calories": number,
              "protein": "amount in grams",
              "carbs": "amount in grams",
              "fats": "amount in grams",
              "fiber": "amount in grams",
              "sugar": "amount in grams",
              "sodium": "amount in mg",
              "vitamins": ["key vitamins and minerals present"],
              "healthyAlternatives": ["specific alternative with substitution ratio"],
              "dietaryNotes": ["detailed note about nutritional benefits"]
            },
            "variations": [
              {
                "type": "spicy",
                "description": "Detailed description of spicy version",
                "adjustments": ["precise ingredient adjustments with measurements"]
              },
              {
                "type": "buttery",
                "description": "Detailed description of rich and buttery version",
                "adjustments": ["precise ingredient adjustments with measurements"]
              },
              {
                "type": "non-spicy",
                "description": "Detailed description of mild version",
                "adjustments": ["precise ingredient adjustments with measurements"]
              }
            ],
            "sideDishSuggestions": [
              {
                "name": "Side dish name",
                "description": "Detailed description",
                "preparationTime": "Precise preparation time",
                "pairingReason": "Why this complements the main dish"
              }
            ]
          }
        ]
      }

      Ensure the JSON is valid with no trailing commas. Make your response extremely detailed, professional, and useful for both amateur and professional cooks, but still ensure the JSON is properly formatted and parseable.
      `;

      try {
        // Generate content using the Gemini API
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        // Extract the JSON from the response
        let jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                        text.match(/\{[\s\S]*\}/);
        
        let jsonContent = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
        
        // Parse the JSON response
        try {
          const parsedData = JSON.parse(jsonContent);
          
          // Validate the response against our schema
          const validatedResponse = analyzeImageResponseSchema.parse(parsedData);
          
          return res.status(200).json(validatedResponse);
        } catch (err) {
          console.error("Error parsing Gemini API response:", err);
          console.log("Raw response:", text);
          
          return res.status(500).json({ 
            error: "Could not parse the AI response properly",
            details: "The response format from Gemini API was unexpected" 
          });
        }
      } catch (apiError: any) {
        console.error("API request error:", apiError);
        
        // Check if it's a quota or rate limit error (status code 429)
        if (apiError.status === 429) {
          // If in development mode, use mock data for demo purposes when quota is exceeded
          if (USE_MOCK_DATA_ON_QUOTA_EXCEEDED) {
            console.log("API quota exceeded, using mock data in development mode");
            
            // Use mock recipe data for carbonara pasta with a notice about mock mode
            const mockResponse = getMockAnalysisResponse();
            mockResponse.foodName = `${mockResponse.foodName} (DEMO MODE)`;
            mockResponse.description = `${mockResponse.description} [Using fallback demo data due to API quota limits]`;
            
            return res.status(200).json(mockResponse);
          }
          
          // In production mode, return the actual error
          return res.status(429).json({
            error: "API quota exceeded",
            details: "The Gemini API quota has been exceeded. Please try again later or upgrade your API plan.",
            retryAfter: apiError?.errorDetails?.[2]?.retryDelay || "60s"
          });
        }

        return res.status(500).json({
          error: "AI service error",
          details: "There was a problem connecting to the AI service. Please try again later."
        });
      }
    } catch (err) {
      console.error("Error in image analysis:", err);
      
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: validationError.message 
        });
      }
      
      // Handle PayloadTooLargeError from Express
      if ((err as any)?.type === 'entity.too.large' || 
          (err as Error).message?.includes('request entity too large')) {
        return res.status(413).json({
          error: "Image too large",
          details: "The uploaded image exceeds the maximum size limit. Please upload a smaller image (max 5MB)."
        });
      }
      
      return res.status(500).json({ 
        error: "Error analyzing image", 
        details: err instanceof Error ? err.message : "Unknown error" 
      });
    }
  });

  // Add a demo API endpoint for development/testing without consuming API quota
  app.get("/api/analyze-image/demo", (_req: Request, res: Response) => {
    console.log("Using demo mode data for development");
    
    // Get mock data and mark it as demo mode
    const mockResponse = getMockAnalysisResponse();
    mockResponse.foodName = `${mockResponse.foodName} (DEMO MODE)`;
    mockResponse.description = `${mockResponse.description} [Using demo data]`;
    
    return res.status(200).json(mockResponse);
  });

  const httpServer = createServer(app);
  return httpServer;
}
