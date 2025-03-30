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
    process.env.GEMINI_API_KEY || "AIzaSyBPdE26_ZZpOg5Ru91QJ9Ihp1TodQKQsZo"
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
      Analyze this food image and provide:
      1. The exact name of the dish
      2. A brief description of the dish
      3. Tags/categories (cuisine type, diet type, meal type)
      4. 3 recipes for how to make this dish. For each recipe, include:
         - Title
         - Brief description
         - Preparation time
         - Cooking time
         - Total time
         - Servings
         - Difficulty level
         - Tags for dietary restrictions
         - Ingredients list (detailed with measurements)
         - Step-by-step instructions (be very specific and detailed)
         - Nutritional information (calories, protein, carbs, fats, fiber, sugar)
         - Healthy alternatives for ingredients
         - Dietary notes (if high in something or good for certain diets)
         - Recipe variations (spicy, buttery & rich, and non-spicy versions with their adjustments)
         - Suggested side dishes that complement the main dish (name, brief description, preparation time)
      
      Format your response as a JSON object with the following structure:
      {
        "foodName": "Name of the dish",
        "description": "Brief description",
        "tags": ["tag1", "tag2", "tag3"],
        "recipes": [
          {
            "title": "Recipe title",
            "description": "Recipe description",
            "prepTime": "Prep time",
            "cookTime": "Cook time",
            "totalTime": "Total time", 
            "servings": number,
            "difficulty": "Difficulty level",
            "tags": ["tag1", "tag2"],
            "ingredients": ["ingredient1", "ingredient2"],
            "instructions": ["step1", "step2"],
            "nutritionInfo": {
              "calories": number,
              "protein": "amount in grams",
              "carbs": "amount in grams",
              "fats": "amount in grams",
              "fiber": "amount in grams",
              "sugar": "amount in grams",
              "healthyAlternatives": ["alternative1", "alternative2"],
              "dietaryNotes": ["note1", "note2"]
            },
            "variations": [
              {
                "type": "spicy",
                "description": "Spicier version of the recipe",
                "adjustments": ["adjustment1", "adjustment2"]
              },
              {
                "type": "buttery",
                "description": "Rich and buttery version",
                "adjustments": ["adjustment1", "adjustment2"]
              },
              {
                "type": "non-spicy",
                "description": "Mild version of the recipe",
                "adjustments": ["adjustment1", "adjustment2"]
              }
            ],
            "sideDishSuggestions": [
              {
                "name": "Side dish name",
                "description": "Brief description",
                "preparationTime": "Preparation time"
              }
            ]
          }
        ]
      }

      Ensure the JSON is valid with no trailing commas.
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
