import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
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
  const USE_MOCK_DATA_ON_QUOTA_EXCEEDED = false;
  
  // Initialize the Google Generative AI API with the user-provided key
  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || ""
  );

  // Define the model to use for image analysis
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
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
        // Start a chat session and send message with the food image
        const chatSession = model.startChat({
          history: [],
        });
        
        const result = await chatSession.sendMessage([prompt, ...imageParts]);
        const response = result.response;
        const text = response.text();

        // Extract the JSON from the response - handle multiple possible formats
        let jsonContent = '';
        
        // First try to extract JSON from code blocks (most common format)
        const codeBlockMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
          jsonContent = codeBlockMatch[1].trim();
        } 
        // Then try to find JSON object directly 
        else {
          // Look for a complete JSON object with outer braces
          const directJsonMatch = text.match(/(\{[\s\S]*\})/);
          if (directJsonMatch && directJsonMatch[1]) {
            jsonContent = directJsonMatch[1].trim();
          } else {
            // As a last resort, use the whole text and hope for the best
            jsonContent = text.trim();
          }
        }
        
        // Additional cleanup to ensure valid JSON
        // Remove any trailing commas which are not valid in JSON
        jsonContent = jsonContent
          .replace(/,\s*}/g, '}') // Fix trailing commas in objects
          .replace(/,\s*\]/g, ']'); // Fix trailing commas in arrays
        
        // Extra validation and debug info before parsing
        if (!jsonContent || jsonContent.trim() === '') {
          console.error("Empty JSON content from Gemini API");
          console.log("Full API text response:", text);
          return res.status(500).json({
            error: "Empty response from AI",
            details: "The AI service returned an empty response. Please try with a clearer food image."
          });
        }

        // Log first part of the JSON response for debugging (limit to first 100 chars)
        console.log("Attempting to parse Gemini response:", jsonContent.substring(0, 100) + '...');
        
        // Parse the JSON response
        try {
          // Attempt to parse JSON with additional safety checks
          let parsedData;
          try {
            parsedData = JSON.parse(jsonContent);
          } catch (jsonParseError) {
            console.error("JSON parsing error:", jsonParseError);
            console.log("Invalid JSON content:", jsonContent.substring(0, 500) + '...');
            
            // Try to clean up the JSON further before giving up
            const cleanedJson = jsonContent
              .replace(/(\w+):/g, '"$1":') // Convert unquoted property names to quoted
              .replace(/'/g, '"') // Replace single quotes with double quotes
              .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas in objects/arrays
              
            try {
              parsedData = JSON.parse(cleanedJson);
              console.log("Successfully parsed after cleanup");
            } catch (secondAttemptError) {
              // Still failed, return proper error
              return res.status(500).json({
                error: "Invalid response format", 
                details: "The AI service returned data in an unexpected format. Please try again with a clearer food image."
              });
            }
          }
          
          // Log success and check for required fields
          console.log("Successfully parsed JSON response");
          if (!parsedData.foodName) {
            console.warn("Missing foodName in parsed data");
          }
          if (!Array.isArray(parsedData.recipes) || parsedData.recipes.length === 0) {
            console.warn("Missing or empty recipes array in parsed data");
          }
          
          // Process and normalize the response to ensure it matches our schema
          // For example, handle any nested structures, ensure arrays exist, etc.
          const normalizedData = {
            ...parsedData,
            recipes: parsedData.recipes?.map((recipe: any) => ({
              ...recipe,
              // Ensure required fields have defaults if missing
              servings: recipe.servings || 4,
              ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
              instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
              // Handle variations edge cases (if it exists but isn't in expected format)
              variations: Array.isArray(recipe.variations) ? recipe.variations.map((v: any) => ({
                type: v.type || 'spicy',
                description: v.description || '',
                adjustments: Array.isArray(v.adjustments) ? v.adjustments : []
              })) : [],
              // Handle nutrition info edge cases
              nutritionInfo: recipe.nutritionInfo ? {
                ...recipe.nutritionInfo,
                // Handle calories whether it's a number or string containing a number
                calories: typeof recipe.nutritionInfo.calories === 'number' ? 
                  recipe.nutritionInfo.calories : 
                  (typeof recipe.nutritionInfo.calories === 'string' ? 
                    parseInt(recipe.nutritionInfo.calories, 10) || 0 : 0),
                // Ensure required fields exist with proper formats
                protein: recipe.nutritionInfo.protein?.toString() || "0g",
                carbs: recipe.nutritionInfo.carbs?.toString() || "0g",
                fats: recipe.nutritionInfo.fats?.toString() || "0g",
                fiber: recipe.nutritionInfo.fiber?.toString() || "0g",
                sugar: recipe.nutritionInfo.sugar?.toString() || "0g",
                // Handle optional fields
                sodium: recipe.nutritionInfo.sodium?.toString() || undefined,
                vitamins: Array.isArray(recipe.nutritionInfo.vitamins) ? 
                  recipe.nutritionInfo.vitamins : [],
                // Handle complex structures that might come as arrays or objects
                healthyAlternatives: Array.isArray(recipe.nutritionInfo.healthyAlternatives) ? 
                  recipe.nutritionInfo.healthyAlternatives.map((alt: any) => 
                    typeof alt === 'string' ? alt : 
                    (alt.ingredient && alt.alternative ? 
                      `${alt.ingredient} → ${alt.alternative} (${alt.effect || 'alternative'})` : 
                      JSON.stringify(alt)
                    )
                  ) : [],
                dietaryNotes: Array.isArray(recipe.nutritionInfo.dietaryNotes) ? 
                  recipe.nutritionInfo.dietaryNotes.map((note: any) => typeof note === 'string' ? note : JSON.stringify(note)) : []
              } : {
                calories: 0,
                protein: "0g",
                carbs: "0g",
                fats: "0g",
                fiber: "0g",
                sugar: "0g",
                healthyAlternatives: [],
                dietaryNotes: []
              }
            })) || []
          };
          
          // Validate the response against our schema
          try {
            // Log the structure of the data before validation to debug
            console.log("Normalized data structure (for debugging):", 
              JSON.stringify({
                foodName: typeof normalizedData.foodName,
                description: typeof normalizedData.description,
                tags: Array.isArray(normalizedData.tags) ? "array" : typeof normalizedData.tags,
                recipes: Array.isArray(normalizedData.recipes) ? 
                  normalizedData.recipes.map((r: any) => ({
                    title: typeof r.title,
                    description: typeof r.description,
                    nutritionInfo: r.nutritionInfo ? {
                      calories: typeof r.nutritionInfo.calories,
                      protein: typeof r.nutritionInfo.protein,
                      carbs: typeof r.nutritionInfo.carbs,
                      fats: typeof r.nutritionInfo.fats,
                    } : "missing"
                  })) : "not-array"
              }, null, 2)
            );
            
            // Special handling for nested objects within the response
            const finalData = {
              // Convert top-level fields to strings
              foodName: String(normalizedData.foodName || ""),
              description: String(normalizedData.description || ""),
              tags: Array.isArray(normalizedData.tags) ? 
                normalizedData.tags.map((tag: any) => String(tag || "")) : [],
              recipes: normalizedData.recipes?.map((recipe: any) => ({
                ...recipe,
                // Convert all property values to strings if they're not already
                title: String(recipe.title || ""),
                description: String(recipe.description || ""),
                prepTime: String(recipe.prepTime || ""),
                cookTime: String(recipe.cookTime || ""),
                totalTime: String(recipe.totalTime || ""),
                servingSize: String(recipe.servingSize || ""),
                difficulty: String(recipe.difficulty || ""),
                storageInstructions: String(recipe.storageInstructions || ""),
                reheatingMethods: String(recipe.reheatingMethods || ""),
                chefTips: Array.isArray(recipe.chefTips) ? 
                  recipe.chefTips.map((tip: any) => String(tip || "")) : [],
                commonMistakes: Array.isArray(recipe.commonMistakes) ? 
                  recipe.commonMistakes.map((mistake: any) => String(mistake || "")) : [],
                beveragePairings: Array.isArray(recipe.beveragePairings) ? 
                  recipe.beveragePairings.map((pairing: any) => String(pairing || "")) : [],
                ingredients: Array.isArray(recipe.ingredients) ? 
                  recipe.ingredients.map((ing: any) => {
                    // Handle objects that might be returned instead of strings
                    if (ing === null || ing === undefined) return "";
                    if (typeof ing === 'object') return JSON.stringify(ing);
                    return String(ing);
                  }) : [],
                instructions: Array.isArray(recipe.instructions) ? 
                  recipe.instructions.map((inst: any) => {
                    // Handle objects that might be returned instead of strings
                    if (inst === null || inst === undefined) return "";
                    if (typeof inst === 'object') return JSON.stringify(inst);
                    return String(inst);
                  }) : [],
                tags: Array.isArray(recipe.tags) ? 
                  recipe.tags.map((tag: any) => String(tag || "")) : [],
                nutritionInfo: recipe.nutritionInfo ? {
                  ...recipe.nutritionInfo,
                  protein: String(recipe.nutritionInfo.protein || "0g"),
                  carbs: String(recipe.nutritionInfo.carbs || "0g"),
                  fats: String(recipe.nutritionInfo.fats || "0g"),
                  fiber: String(recipe.nutritionInfo.fiber || "0g"),
                  sugar: String(recipe.nutritionInfo.sugar || "0g"),
                  sodium: recipe.nutritionInfo.sodium ? String(recipe.nutritionInfo.sodium) : undefined,
                  vitamins: Array.isArray(recipe.nutritionInfo.vitamins) ? 
                    recipe.nutritionInfo.vitamins.map((v: any) => String(v || "")) : [],
                  healthyAlternatives: Array.isArray(recipe.nutritionInfo.healthyAlternatives) ? 
                    recipe.nutritionInfo.healthyAlternatives.map((alt: any) => String(alt || "")) : [],
                  dietaryNotes: Array.isArray(recipe.nutritionInfo.dietaryNotes) ? 
                    recipe.nutritionInfo.dietaryNotes.map((note: any) => String(note || "")) : []
                } : {
                  calories: 0,
                  protein: "0g",
                  carbs: "0g",
                  fats: "0g",
                  fiber: "0g",
                  sugar: "0g",
                  healthyAlternatives: [],
                  dietaryNotes: []
                },
                variations: Array.isArray(recipe.variations) ? 
                  recipe.variations.map((v: any) => ({
                    type: String(v.type || ""),
                    description: String(v.description || ""),
                    adjustments: Array.isArray(v.adjustments) ? 
                      v.adjustments.map((adj: any) => String(adj || "")) : []
                  })) : [],
                sideDishSuggestions: Array.isArray(recipe.sideDishSuggestions) ? 
                  recipe.sideDishSuggestions.map((s: any) => ({
                    name: String(s.name || ""),
                    description: String(s.description || ""),
                    preparationTime: String(s.preparationTime || ""),
                    pairingReason: String(s.pairingReason || "")
                  })) : []
              }))
            };
            
            const validatedResponse = analyzeImageResponseSchema.parse(finalData);
            return res.status(200).json(validatedResponse);
          } catch (validationErr) {
            console.error("Schema validation error:", validationErr);
            
            if (USE_MOCK_DATA_ON_QUOTA_EXCEEDED) {
              console.log("Using mock data due to schema validation errors");
              
              const mockResponse = getMockAnalysisResponse();
              // Use the mock data without any demo mode indicators
              return res.status(200).json(mockResponse);
            }
            
            return res.status(500).json({
              error: "Invalid AI response",
              details: "The AI service provided a response that doesn't match our expected format. Please try again with a clearer food image."
            });
          }
        } catch (err) {
          console.error("Error parsing Gemini API response:", err);
          console.log("Raw response:", text);
          
          if (USE_MOCK_DATA_ON_QUOTA_EXCEEDED) {
            console.log("Using mock data due to parsing error");
            
            const mockResponse = getMockAnalysisResponse();
            // Use the mock data without any demo mode indicators
            return res.status(200).json(mockResponse);
          }
          
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
            
            // Use mock recipe data without any demo mode indicators
            const mockResponse = getMockAnalysisResponse();
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

  const httpServer = createServer(app);
  return httpServer;
}
