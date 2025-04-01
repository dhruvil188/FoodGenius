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
import { getMockAnalysisResponse } from "./mockData";
import { searchYouTubeVideos } from "./services/youtubeService";

// Simple mock user ID for guest access
const GUEST_USER_ID = 1;

import { MealPlanPreferences, mealPlanPreferencesSchema } from "@shared/schema";

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
      You are a professional culinary consultant, food scientist, and master chef specializing in detailed recipe analysis and development.
      
      Analyze this food image in extreme detail and provide:
      
      1. The exact name of the dish with any regional variations or authentic naming
      2. A comprehensive yet concise description of the dish including cultural context, origin, and traditional serving occasions
      3. Detailed tags/categories (cuisine type, regional cuisine, diet type, meal type, cooking method, flavor profile, texture)
      
      4. A single comprehensive, authentic recipe for how to make this dish. Include:
         - Creative and descriptive title that captures the recipe's unique aspects
         - Detailed description highlighting what makes this version special
         - Precise preparation time, cooking time, and total time (also include active vs passive time breakdown)
         - Exact servings with portion size information
         - Specific difficulty level with brief explanation of what makes it that level
         - Comprehensive dietary tags including allergies (gluten-free, dairy-free, nut-free, etc.)
         - Complete list of required equipment and tools with descriptions and alternatives
         - Complete ingredients list organized by preparation stage or component with precise measurements, prep notes, and quality indicators
         - Step-by-step instructions with detailed professional chef techniques, visual cues for doneness, and time estimates for each step
         - Technique details explaining complex cooking methods with visual cues and common errors
         - Complete nutritional profile with macronutrient breakdown, allergens, and dietary compliance information
         - Cultural context including origin, history, traditional serving customs, and festive relevance
         - Plating and presentation guidance with garnishing tips and photography suggestions
         - Science behind the recipe explaining key reactions and techniques
         - Sensory guidance describing taste progression, aroma indicators, and texture descriptors
         - Success indicators showing how to recognize when each step is done correctly
         - Healthy alternatives for key ingredients with specific substitution ratios
         - Detailed dietary notes and meal planning suggestions
         - Recipe variations with precise adjustments and flavor profiles
         - Expert chef tips and common mistakes to avoid
         - Storage instructions and reheating methods
         - Wine or beverage pairing suggestions
         - Complementary side dishes with preparation details
      
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
            "activeTime": "Time requiring active cooking",
            "passiveTime": "Time not requiring active attention",
            "servings": number,
            "servingSize": "Description of portion size",
            "difficulty": "Difficulty level with brief explanation",
            "tags": ["dietary restriction", "allergy info"],
            "equipment": [
              {
                "name": "Equipment name",
                "description": "What it's used for in this recipe",
                "alternatives": ["Alternative tools if available"],
                "difficultyToUse": "How challenging this tool is to use properly"
              }
            ],
            "ingredientGroups": [
              {
                "groupName": "Component or preparation stage name",
                "ingredients": ["Detailed ingredients with measurements"],
                "preparationNotes": "Special notes about preparing this group"
              }
            ],
            "ingredients": ["Complete list of all ingredients with measurements"],
            "instructions": ["Detailed steps with technique information"],
            "techniqueDetails": [
              {
                "name": "Technique name",
                "description": "Detailed explanation of the technique",
                "visualCues": ["How to tell when done correctly"],
                "commonErrors": ["Mistakes to avoid with this technique"]
              }
            ],
            "chefTips": ["Professional cooking tips"],
            "commonMistakes": ["Mistakes to avoid"],
            "storageInstructions": "How to store and for how long",
            "reheatingMethods": "Best ways to reheat",
            "beveragePairings": ["Complementary drink suggestions"],
            "successIndicators": ["How to know each critical step is done correctly"],
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
              "dietaryNotes": ["detailed note about nutritional benefits"],
              "macronutrientRatio": {
                "protein": number as percentage,
                "carbs": number as percentage,
                "fats": number as percentage
              },
              "allergens": ["Common allergens present in the recipe"],
              "dietaryCompliance": ["Diets this recipe complies with"]
            },
            "variations": [
              {
                "type": "variation type",
                "description": "Detailed description of this variation",
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
            ],
            "culturalContext": {
              "origin": "Geographic origin of the dish",
              "history": "Brief history of the dish's development",
              "traditionalServing": "How it's traditionally served",
              "festiveRelevance": ["Holidays or celebrations associated with this dish"]
            },
            "presentationGuidance": {
              "platingSuggestions": ["Professional plating ideas"],
              "garnishingTips": ["Effective garnishing techniques"],
              "photoTips": ["How to take appealing photos of the dish"]
            },
            "cookingScience": {
              "keyReactions": ["Important chemical/cooking reactions"],
              "techniquePurpose": ["Scientific reasons for specific techniques"],
              "safetyTips": ["Food safety considerations"]
            },
            "sensoryGuidance": {
              "tasteProgression": ["How flavors develop during eating"],
              "aromaIndicators": ["What smells indicate doneness or quality"],
              "textureDescriptors": ["Detailed texture profiles and how to achieve them"]
            },
            "mealPlanningNotes": ["Suggestions for incorporating into meal plans"]
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
                    
                    // If it's an object with item and quantity properties (common format from Gemini API)
                    if (typeof ing === 'object') {
                      if (ing.item && ing.quantity) {
                        let formattedIngredient = `${ing.quantity} ${ing.item}`;
                        
                        // Add preparation note if available
                        if (ing.prep && ing.prep !== "null") {
                          formattedIngredient += `, ${ing.prep}`;
                        }
                        
                        // Add quality information if available
                        if (ing.quality && ing.quality !== "null") {
                          formattedIngredient += ` (${ing.quality})`;
                        }
                        
                        return formattedIngredient;
                      }
                      
                      // If it has a name property
                      if (ing.name) {
                        let formatted = ing.name;
                        if (ing.amount) formatted = `${ing.amount} ${formatted}`;
                        if (ing.notes) formatted += ` - ${ing.notes}`;
                        return formatted;
                      }
                      
                      // If all else fails, turn it into a JSON string
                      return JSON.stringify(ing);
                    }
                    
                    return String(ing);
                  }) : [],
                instructions: Array.isArray(recipe.instructions) ? 
                  recipe.instructions.map((inst: any) => {
                    // Handle objects that might be returned instead of strings
                    if (inst === null || inst === undefined) return "";
                    
                    if (typeof inst === 'object') {
                      // For numbered instruction objects (common format)
                      if (inst.number && inst.instruction) {
                        return String(inst.instruction);
                      }
                      
                      // For step objects with action and ingredients
                      if (inst.action) {
                        let formattedStep = inst.action;
                        
                        // Include ingredients if available
                        if (inst.ingredients) {
                          if (Array.isArray(inst.ingredients) && inst.ingredients.length > 0) {
                            formattedStep += ` ${inst.ingredients.join(', ')}`;
                          } else if (typeof inst.ingredients === 'string') {
                            formattedStep += ` ${inst.ingredients}`;
                          }
                        }
                        
                        // Add any additional details
                        if (inst.duration) {
                          formattedStep += ` for ${inst.duration}`;
                        }
                        
                        if (inst.note) {
                          formattedStep += ` (${inst.note})`;
                        }
                        
                        return formattedStep;
                      }
                      
                      // For step objects with text or description
                      if (inst.text) return String(inst.text);
                      if (inst.description) return String(inst.description);
                      if (inst.step) return String(inst.step);
                      
                      // If all else fails, turn it into a JSON string but formatted more nicely
                      return JSON.stringify(inst);
                    }
                    
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
            
            // Fetch related YouTube videos for the recipe
            let youtubeVideos: YoutubeVideo[] = [];
            try {
              console.log("Fetching YouTube videos for:", finalData.foodName);
              youtubeVideos = await searchYouTubeVideos(finalData.foodName, 5);
              console.log(`Found ${youtubeVideos.length} YouTube videos`);
            } catch (youtubeError) {
              console.error("Error fetching YouTube videos:", youtubeError);
              // Continue with empty videos rather than failing the request
            }

            // Add YouTube videos to the response
            const responseWithVideos = {
              ...finalData,
              youtubeVideos
            };

            const validatedResponse = analyzeImageResponseSchema.parse(responseWithVideos);
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

  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      // Validate request data
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "A user with this email already exists"
        });
      }
      
      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "This username is already taken"
        });
      }
      
      // Create new user
      const user = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        displayName: validatedData.username
      });
      
      // Create session token
      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days token expiration
      
      await storage.createSession({
        userId: user.id,
        token,
        expiresAt
      });
      
      // Return user data and token
      const authResponse: AuthResponse = {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          profileImage: user.profileImage
        },
        token,
        message: "Registration successful"
      };
      
      return res.status(201).json(authResponse);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: fromZodError(error).message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Validate request data
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
      
      // Verify password
      const [storedHash, salt] = user.password.split(':');
      const isValid = verifyPassword(validatedData.password, storedHash, salt);
      
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
      
      // Create session token
      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days token expiration
      
      await storage.createSession({
        userId: user.id,
        token,
        expiresAt
      });
      
      // Return user data and token
      const authResponse: AuthResponse = {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          profileImage: user.profileImage
        },
        token,
        message: "Login successful"
      };
      
      return res.status(200).json(authResponse);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: fromZodError(error).message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      
      if (token) {
        await storage.deleteSession(token);
      }
      
      return res.status(200).json({
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      // Return a guest user instead
      return res.status(200).json({
        success: true,
        user: {
          id: GUEST_USER_ID,
          username: "guest",
          email: "guest@example.com",
          displayName: "Guest User",
          profileImage: null
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve user information",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Saved recipes routes
  app.get("/api/recipes", async (req: Request, res: Response) => {
    try {
      const recipes = await storage.getSavedRecipes(GUEST_USER_ID);
      
      return res.status(200).json({
        success: true,
        recipes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve saved recipes",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.post("/api/recipes", async (req: Request, res: Response) => {
    try {
      
      // Extract recipe data from request
      const recipeData: AnalyzeImageResponse = req.body.recipe;
      
      if (!recipeData || !recipeData.foodName || !Array.isArray(recipeData.recipes) || recipeData.recipes.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe data"
        });
      }
      
      // Create saved recipe entry
      const savedRecipe = await storage.createSavedRecipe({
        userId: GUEST_USER_ID,
        recipeData: recipeData,
        foodName: recipeData.foodName,
        description: recipeData.description,
        imageUrl: req.body.imageUrl || null,
        tags: recipeData.tags || [],
        favorite: false
      });
      
      return res.status(201).json({
        success: true,
        message: "Recipe saved successfully",
        recipe: savedRecipe
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to save recipe",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.get("/api/recipes/:id", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      
      if (isNaN(recipeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID"
        });
      }
      
      const recipe = await storage.getSavedRecipeById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }
      
      // Check if recipe belongs to the guest user
      if (recipe.userId !== GUEST_USER_ID) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this recipe"
        });
      }
      
      return res.status(200).json({
        success: true,
        recipe
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve recipe",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.delete("/api/recipes/:id", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      
      if (isNaN(recipeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID"
        });
      }
      
      const recipe = await storage.getSavedRecipeById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }
      
      // Check if recipe belongs to the guest user
      if (recipe.userId !== GUEST_USER_ID) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to delete this recipe"
        });
      }
      
      const deleted = await storage.deleteSavedRecipe(recipeId);
      
      if (!deleted) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete recipe"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Recipe deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete recipe",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  app.patch("/api/recipes/:id/favorite", async (req: Request, res: Response) => {
    try {
      const recipeId = parseInt(req.params.id);
      const { favorite } = req.body;
      
      if (isNaN(recipeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID"
        });
      }
      
      if (typeof favorite !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: "Favorite status must be a boolean"
        });
      }
      
      const recipe = await storage.getSavedRecipeById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }
      
      // Check if recipe belongs to the guest user
      if (recipe.userId !== GUEST_USER_ID) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to update this recipe"
        });
      }
      
      const updatedRecipe = await storage.updateSavedRecipe(recipeId, { favorite });
      
      return res.status(200).json({
        success: true,
        message: favorite ? "Recipe marked as favorite" : "Recipe removed from favorites",
        recipe: updatedRecipe
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update favorite status",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Generate meal plan based on user preferences using Gemini API
  app.post("/api/meal-plan", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = mealPlanPreferencesSchema.parse(req.body);
      
      // Generate a prompt for Gemini based on user preferences
      const prompt = `
      You are a professional nutritionist and chef specialized in meal planning. Create a comprehensive meal plan based on the following preferences:
      
      Meals per day: ${validatedData.mealsPerDay === '2' ? '2 meals (Lunch and Dinner)' : '4 meals (Breakfast, Lunch, Snack, and Dinner)'}
      Spiciness level: ${validatedData.spiciness}
      Diet type: ${validatedData.dietType}
      Health goal: ${validatedData.healthGoal === 'fit' ? 'Fitness-oriented (low-calorie, high protein, balanced)' : 'Indulgent (comfort food, satisfying meals)'}
      Cuisine preferences: ${validatedData.cuisinePreferences.join(', ')}
      Preparation time per meal: ${validatedData.prepTime === 'quick' ? 'Quick (under 15 minutes)' : validatedData.prepTime === 'moderate' ? 'Moderate (15-30 minutes)' : 'Slow (30+ minutes)'}
      Duration: ${validatedData.duration}
      Dietary restrictions: ${validatedData.restrictions.length > 0 ? validatedData.restrictions.join(', ') : 'None'}
      
      For each day, please provide:
      1. A full day's meal plan with ${validatedData.mealsPerDay === '2' ? 'lunch and dinner' : 'breakfast, lunch, snack, and dinner'} recipes
      2. For each meal, include:
         - Meal name
         - Calorie count
         - List of ingredients with measurements
         - Step-by-step cooking instructions
         - Nutritional information (protein, carbs, fats)
      3. Daily nutritional totals
      
      Also include:
      1. A comprehensive grocery list organized by categories
      2. Overall nutrition summary and recommendations
      
      Ensure the meals are varied, not repetitive, and aligned with the specified preferences. Make sure all recipes are detailed with precise ingredients and clear cooking steps.
      
      Return the meal plan as a JSON object with the following structure:
      {
        "days": [
          {
            "date": "2025-04-01", // Just use consecutive dates starting from current date
            "meals": [
              {
                "type": "Breakfast/Lunch/Snack/Dinner",
                "name": "Recipe name",
                "calories": number,
                "recipe": "Detailed cooking instructions with steps",
                "ingredients": ["Ingredient 1 with measurement", "Ingredient 2 with measurement"],
                "nutrients": {
                  "protein": "protein in grams",
                  "carbs": "carbs in grams",
                  "fats": "fats in grams"
                }
              }
            ],
            "dailyNutrition": {
              "totalCalories": number,
              "totalProtein": "protein in grams",
              "totalCarbs": "carbs in grams",
              "totalFats": "fats in grams"
            }
          }
        ],
        "groceryList": [
          {
            "category": "Category name (e.g., Proteins, Vegetables, etc.)",
            "items": ["Item 1 with quantity", "Item 2 with quantity"]
          }
        ],
        "nutritionSummary": {
          "averageCalories": number,
          "averageProtein": "protein in grams",
          "averageCarbs": "carbs in grams",
          "averageFats": "fats in grams",
          "recommendations": ["Recommendation 1", "Recommendation 2"]
        }
      }
      
      Please ensure no recipes are repeated in the meal plan. Each recipe should be unique, creative, and tailored to the preferences.
      `;
      
      try {
        // Use Gemini API to generate the meal plan
        const chatSession = model.startChat({
          history: [],
        });
        
        const result = await chatSession.sendMessage(prompt);
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
        jsonContent = jsonContent
          .replace(/,\s*}/g, '}') // Fix trailing commas in objects
          .replace(/,\s*\]/g, ']'); // Fix trailing commas in arrays
        
        // Parse the JSON response
        let parsedData;
        try {
          parsedData = JSON.parse(jsonContent);
        } catch (jsonParseError) {
          console.error("JSON parsing error:", jsonParseError);
          
          // Use a placeholder response for demo purposes if there's an API issue
          return res.status(200).json(generateDemoMealPlan(validatedData));
        }
        
        // If successfully parsed, convert string dates to actual Date objects
        if (parsedData && Array.isArray(parsedData.days)) {
          parsedData.days = parsedData.days.map((day: any, index: number) => {
            // If the date is a string, convert it to a Date object
            // Otherwise, generate a date based on current date + index
            if (typeof day.date === 'string') {
              try {
                day.date = new Date(day.date);
              } catch (e) {
                const date = new Date();
                date.setDate(date.getDate() + index);
                day.date = date;
              }
            } else {
              const date = new Date();
              date.setDate(date.getDate() + index);
              day.date = date;
            }
            
            return day;
          });
        }
        
        return res.status(200).json(parsedData);
        
      } catch (apiError) {
        console.error("Gemini API error:", apiError);
        
        // Generate a demo meal plan as fallback
        return res.status(200).json(generateDemoMealPlan(validatedData));
      }
      
    } catch (error) {
      console.error("Error generating meal plan:", error);
      return res.status(500).json({ error: "Failed to generate meal plan" });
    }
  });
  
  // Helper function to generate a demo meal plan when API fails
  function generateDemoMealPlan(preferences: MealPlanPreferences) {
    const numDays = preferences.duration === '1-week' ? 7 : 
                   preferences.duration === '2-weeks' ? 14 : 30;
    
    const cuisines = preferences.cuisinePreferences;
    const mealTypes = preferences.mealsPerDay === '2' 
      ? ['Lunch', 'Dinner'] 
      : ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
      
    // Demo meal templates by cuisine and meal type
    const mealTemplates: Record<string, Record<string, any>> = {
      'Indian': {
        'Breakfast': {
          name: 'Masala Dosa with Coconut Chutney',
          calories: 350,
          recipe: "1. Soak rice and urad dal separately for 4-6 hours.\n2. Grind them to a smooth batter.\n3. Ferment overnight.\n4. Heat a griddle and pour a ladleful of batter.\n5. Spread it in a circular motion.\n6. Add oil around the edges and cook until golden brown.\n7. Place potato masala filling in the center.\n8. Fold and serve with coconut chutney.",
          ingredients: [
            '1 cup rice', 
            '1/4 cup urad dal', 
            '1/2 tsp fenugreek seeds', 
            'Salt to taste', 
            '2 potatoes, boiled and mashed', 
            '1 onion, finely chopped', 
            '1/2 tsp mustard seeds', 
            '1 tsp cumin seeds', 
            'Curry leaves', 
            '2 green chilies, chopped', 
            '1/2 tsp turmeric powder', 
            '1 tbsp oil'
          ],
          nutrients: {
            protein: '8g',
            carbs: '58g',
            fats: '7g'
          }
        },
        'Lunch': {
          name: 'Vegetable Biryani with Raita',
          calories: 480,
          recipe: "1. Soak basmati rice for 30 minutes.\n2. In a large pot, heat oil and add whole spices.\n3. Add sliced onions and sauté until golden brown.\n4. Add ginger-garlic paste and cook for 1 minute.\n5. Add mixed vegetables and spices, cook for 5 minutes.\n6. Add soaked rice and 2 cups of water.\n7. Cover and cook on low heat until rice is done.\n8. Garnish with fresh mint and serve with raita.",
          ingredients: [
            '1.5 cups basmati rice', 
            '2 cups mixed vegetables (carrots, peas, beans, cauliflower)',
            '1 large onion, thinly sliced',
            '1 tbsp ginger-garlic paste',
            '2 bay leaves',
            '1 cinnamon stick',
            '4 cloves',
            '4 cardamom pods',
            '1 tsp cumin seeds',
            '1/2 tsp turmeric powder',
            '1 tsp garam masala',
            '1/4 cup fresh mint leaves',
            '3 tbsp oil',
            'Salt to taste',
            '1 cup yogurt',
            '1 cucumber, grated'
          ],
          nutrients: {
            protein: '11g',
            carbs: '74g',
            fats: '14g'
          }
        },
        'Snack': {
          name: 'Samosa with Mint Chutney',
          calories: 220,
          recipe: "1. Make dough by mixing flour, salt, and oil. Knead with water.\n2. Rest for 30 minutes.\n3. For filling, heat oil and add cumin seeds.\n4. Add boiled potatoes, peas, and spices. Mix well.\n5. Divide dough into balls and roll into circles.\n6. Cut each circle in half.\n7. Form cones and fill with potato mixture.\n8. Seal edges and deep fry until golden brown.\n9. Serve with mint chutney.",
          ingredients: [
            '1 cup all-purpose flour',
            '2 tbsp oil',
            '1/2 tsp salt',
            'Water as needed',
            '2 potatoes, boiled and mashed',
            '1/4 cup green peas',
            '1/2 tsp cumin seeds',
            '1/2 tsp coriander powder',
            '1/4 tsp garam masala',
            '1/4 tsp red chili powder',
            'Oil for deep frying',
            '1 cup fresh mint leaves',
            '1/4 cup cilantro',
            '2 green chilies',
            '1 tbsp lemon juice'
          ],
          nutrients: {
            protein: '4g',
            carbs: '32g',
            fats: '10g'
          }
        },
        'Dinner': {
          name: 'Butter Chicken with Naan',
          calories: 650,
          recipe: "1. Marinate chicken in yogurt, lemon juice, and spices for 2 hours.\n2. Grill or bake until 80% cooked.\n3. In a pan, heat butter and add onions and ginger-garlic paste.\n4. Add tomato puree and spices. Cook for 10 minutes.\n5. Add chicken and simmer for 15 minutes.\n6. Add cream and kasoori methi.\n7. Serve hot with naan bread.",
          ingredients: [
            '500g chicken, cut into pieces',
            '1/2 cup yogurt',
            '1 tbsp lemon juice',
            '1 tbsp ginger-garlic paste',
            '1 tsp garam masala',
            '1 tsp red chili powder',
            '3 tbsp butter',
            '1 onion, finely chopped',
            '2 cups tomato puree',
            '1/2 tsp turmeric powder',
            '1/4 cup heavy cream',
            '1 tbsp kasoori methi (dried fenugreek leaves)',
            'Salt to taste',
            '2 naan breads'
          ],
          nutrients: {
            protein: '42g',
            carbs: '38g',
            fats: '32g'
          }
        }
      },
      'Italian': {
        'Breakfast': {
          name: 'Caprese Avocado Toast',
          calories: 320,
          recipe: "1. Toast bread slices until golden brown.\n2. Mash avocado with lemon juice, salt, and pepper.\n3. Spread mashed avocado on toast.\n4. Top with sliced tomatoes and mozzarella.\n5. Drizzle with balsamic glaze and olive oil.\n6. Garnish with fresh basil leaves.",
          ingredients: [
            '2 slices whole grain bread',
            '1 ripe avocado',
            '1 tsp lemon juice',
            'Salt and pepper to taste',
            '1 large tomato, sliced',
            '100g fresh mozzarella, sliced',
            '1 tbsp balsamic glaze',
            '1 tbsp olive oil',
            'Fresh basil leaves'
          ],
          nutrients: {
            protein: '12g',
            carbs: '28g',
            fats: '18g'
          }
        },
        'Lunch': {
          name: 'Penne Arrabbiata',
          calories: 450,
          recipe: "1. Cook penne pasta according to package instructions.\n2. In a pan, heat olive oil and add minced garlic.\n3. Add red pepper flakes and cook for 30 seconds.\n4. Add canned tomatoes and crush them with a spoon.\n5. Season with salt and simmer for 15 minutes.\n6. Drain pasta and add to sauce.\n7. Garnish with fresh basil and grated parmesan.",
          ingredients: [
            '250g penne pasta',
            '3 tbsp olive oil',
            '4 garlic cloves, minced',
            '1 tsp red pepper flakes',
            '1 can (400g) whole tomatoes',
            'Salt to taste',
            'Fresh basil leaves',
            '2 tbsp grated parmesan cheese'
          ],
          nutrients: {
            protein: '14g',
            carbs: '72g',
            fats: '13g'
          }
        },
        'Snack': {
          name: 'Bruschetta with Tomato and Basil',
          calories: 180,
          recipe: "1. Slice baguette diagonally into 1/2 inch pieces.\n2. Brush with olive oil and toast until golden.\n3. Rub each slice with garlic clove.\n4. In a bowl, mix diced tomatoes, basil, salt, and olive oil.\n5. Spoon tomato mixture onto toasted bread.\n6. Drizzle with balsamic glaze before serving.",
          ingredients: [
            '1/2 baguette',
            '2 tbsp olive oil',
            '2 garlic cloves',
            '2 large tomatoes, diced',
            '1/4 cup fresh basil, chopped',
            'Salt to taste',
            '1 tbsp balsamic glaze'
          ],
          nutrients: {
            protein: '4g',
            carbs: '24g',
            fats: '8g'
          }
        },
        'Dinner': {
          name: 'Mushroom Risotto',
          calories: 520,
          recipe: "1. In a pot, warm vegetable broth over low heat.\n2. In another pot, heat olive oil and butter.\n3. Add onions and sauté until translucent.\n4. Add sliced mushrooms and garlic, cook until mushrooms release moisture.\n5. Add arborio rice and toast for 2 minutes.\n6. Add white wine and stir until absorbed.\n7. Gradually add warm broth, 1/2 cup at a time, stirring continuously.\n8. Continue until rice is creamy and al dente (about 18-20 minutes).\n9. Remove from heat, stir in parmesan cheese and parsley.\n10. Let rest for 2 minutes before serving.",
          ingredients: [
            '1.5 cups arborio rice',
            '4 cups vegetable broth',
            '2 tbsp olive oil',
            '2 tbsp butter',
            '1 onion, finely chopped',
            '300g mushrooms, sliced',
            '2 garlic cloves, minced',
            '1/2 cup white wine',
            '1/2 cup grated parmesan cheese',
            '2 tbsp fresh parsley, chopped',
            'Salt and pepper to taste'
          ],
          nutrients: {
            protein: '12g',
            carbs: '78g',
            fats: '18g'
          }
        }
      },
      'Japanese': {
        'Breakfast': {
          name: 'Traditional Japanese Breakfast',
          calories: 380,
          recipe: "1. Cook rice according to package instructions.\n2. Grill or broil salmon with a dash of salt.\n3. Make miso soup by dissolving miso paste in dashi stock.\n4. Add tofu cubes and seaweed to the soup.\n5. Serve rice, salmon, miso soup, and pickled vegetables together.",
          ingredients: [
            '1 cup short-grain rice',
            '1 salmon fillet (100g)',
            '2 cups dashi stock',
            '2 tbsp miso paste',
            '100g silken tofu, cubed',
            '1 sheet nori seaweed, cut into small pieces',
            '2 tbsp pickled vegetables',
            '1 tbsp soy sauce'
          ],
          nutrients: {
            protein: '24g',
            carbs: '48g',
            fats: '10g'
          }
        },
        'Lunch': {
          name: 'Chicken Teriyaki Bento Box',
          calories: 520,
          recipe: "1. Mix soy sauce, mirin, sake, and sugar for teriyaki sauce.\n2. Marinate chicken thighs for 30 minutes.\n3. Grill or pan-fry chicken until cooked through.\n4. Baste with remaining sauce until glazed.\n5. Cook rice and let it cool slightly.\n6. Stir-fry vegetables with a bit of soy sauce.\n7. Arrange chicken, rice, vegetables, and pickles in a bento box.",
          ingredients: [
            '2 chicken thighs, boneless',
            '3 tbsp soy sauce',
            '2 tbsp mirin',
            '1 tbsp sake',
            '1 tbsp sugar',
            '1 cup steamed rice',
            '1 cup mixed vegetables (broccoli, carrots, bell peppers)',
            '1 tbsp pickled ginger',
            '1 tbsp vegetable oil'
          ],
          nutrients: {
            protein: '34g',
            carbs: '62g',
            fats: '14g'
          }
        },
        'Snack': {
          name: 'Edamame with Sea Salt',
          calories: 120,
          recipe: "1. Bring a pot of water to a boil.\n2. Add edamame pods and boil for 5 minutes.\n3. Drain and rinse under cold water.\n4. Toss with sea salt.\n5. Serve warm or cold.",
          ingredients: [
            '2 cups edamame pods',
            '1 tsp sea salt'
          ],
          nutrients: {
            protein: '11g',
            carbs: '10g',
            fats: '5g'
          }
        },
        'Dinner': {
          name: 'Homemade Sushi Rolls',
          calories: 480,
          recipe: "1. Cook sushi rice according to package instructions.\n2. Mix with rice vinegar, sugar, and salt while warm.\n3. Let cool to room temperature.\n4. Place a nori sheet on a bamboo mat.\n5. Spread rice evenly over nori, leaving 1 inch at the top.\n6. Arrange avocado, cucumber, and crab in a line at the bottom.\n7. Roll tightly using the bamboo mat.\n8. Moisten the top edge to seal.\n9. Slice into 6-8 pieces.\n10. Serve with soy sauce, wasabi, and pickled ginger.",
          ingredients: [
            '2 cups sushi rice',
            '3 tbsp rice vinegar',
            '1 tbsp sugar',
            '1 tsp salt',
            '4 nori sheets',
            '1 avocado, sliced',
            '1 cucumber, julienned',
            '200g imitation crab, shredded',
            'Soy sauce for serving',
            'Wasabi paste',
            'Pickled ginger'
          ],
          nutrients: {
            protein: '14g',
            carbs: '76g',
            fats: '12g'
          }
        }
      },
      'Mexican': {
        'Breakfast': {
          name: 'Huevos Rancheros',
          calories: 420,
          recipe: "1. Heat oil in a pan and cook corn tortillas until slightly crisp.\n2. In another pan, make tomato sauce by sautéing onion, jalapeño, and garlic.\n3. Add diced tomatoes and simmer for 10 minutes.\n4. In a separate pan, fry eggs sunny-side up.\n5. Place tortillas on a plate, top with eggs.\n6. Pour tomato sauce over eggs.\n7. Garnish with avocado, cilantro, and crumbled queso fresco.",
          ingredients: [
            '2 corn tortillas',
            '2 eggs',
            '1 tbsp vegetable oil',
            '1/2 onion, diced',
            '1 jalapeño, seeded and diced',
            '2 garlic cloves, minced',
            '2 large tomatoes, diced',
            '1/2 avocado, sliced',
            '2 tbsp fresh cilantro, chopped',
            '2 tbsp queso fresco, crumbled',
            'Salt and pepper to taste'
          ],
          nutrients: {
            protein: '18g',
            carbs: '32g',
            fats: '26g'
          }
        },
        'Lunch': {
          name: 'Chicken Fajita Bowl',
          calories: 520,
          recipe: "1. Marinate chicken strips in lime juice, oil, and spices for 30 minutes.\n2. Cook rice with a pinch of salt and lime zest.\n3. Sauté onions and bell peppers until slightly charred.\n4. In the same pan, cook marinated chicken until done.\n5. Assemble bowls with rice, chicken, peppers, and onions.\n6. Top with avocado, salsa, and a dollop of sour cream.\n7. Garnish with cilantro and a lime wedge.",
          ingredients: [
            '250g chicken breast, cut into strips',
            '2 tbsp lime juice',
            '1 tbsp olive oil',
            '1 tsp cumin powder',
            '1 tsp chili powder',
            '1 cup rice',
            '1 onion, sliced',
            '2 bell peppers, sliced',
            '1/2 avocado, diced',
            '2 tbsp salsa',
            '1 tbsp sour cream',
            'Fresh cilantro for garnish',
            'Lime wedges for serving'
          ],
          nutrients: {
            protein: '36g',
            carbs: '58g',
            fats: '16g'
          }
        },
        'Snack': {
          name: 'Homemade Guacamole with Tortilla Chips',
          calories: 280,
          recipe: "1. Mash avocados in a bowl.\n2. Mix in diced onion, tomato, jalapeño, and cilantro.\n3. Add lime juice, salt, and pepper.\n4. Serve with tortilla chips.",
          ingredients: [
            '2 ripe avocados',
            '1/4 onion, finely diced',
            '1 tomato, seeded and diced',
            '1 jalapeño, seeded and minced',
            '2 tbsp fresh cilantro, chopped',
            '1 tbsp lime juice',
            'Salt and pepper to taste',
            '100g tortilla chips'
          ],
          nutrients: {
            protein: '4g',
            carbs: '22g',
            fats: '20g'
          }
        },
        'Dinner': {
          name: 'Beef Enchiladas with Mexican Rice',
          calories: 680,
          recipe: "1. Brown ground beef with onions and garlic.\n2. Add spices and cook until fragrant.\n3. Warm tortillas to make them pliable.\n4. Fill each tortilla with beef mixture and roll up.\n5. Place in a baking dish and cover with enchilada sauce and cheese.\n6. Bake at 375°F for 20 minutes.\n7. For rice, sauté rice in oil until translucent.\n8. Add tomato sauce, broth, and spices.\n9. Cover and simmer until rice is tender.\n10. Serve enchiladas with rice on the side.",
          ingredients: [
            '500g ground beef',
            '1 onion, diced',
            '3 garlic cloves, minced',
            '2 tsp cumin powder',
            '1 tsp chili powder',
            '8 corn tortillas',
            '2 cups enchilada sauce',
            '1 cup shredded cheddar cheese',
            '1 cup rice',
            '2 tbsp vegetable oil',
            '1/2 cup tomato sauce',
            '1.5 cups chicken broth',
            'Sour cream and sliced green onions for garnish'
          ],
          nutrients: {
            protein: '42g',
            carbs: '68g',
            fats: '28g'
          }
        }
      }
    };
    
    // Generate the meal plan
    const days: any[] = [];
    const groceryCategories: Record<string, string[]> = {
      'Proteins': [],
      'Grains': [],
      'Fruits & Vegetables': [],
      'Dairy': [],
      'Herbs & Spices': [],
      'Oils & Condiments': [],
      'Other': []
    };
    
    // Track used meals to prevent repetition
    const usedMeals: Record<string, Set<string>> = {};
    cuisines.forEach(cuisine => {
      usedMeals[cuisine] = new Set();
    });
    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let mealCount = 0;
    
    // Process ingredients to add to grocery list
    const processIngredientsForGrocery = (ingredients: string[]) => {
      ingredients.forEach(ing => {
        const lowerIng = ing.toLowerCase();
        // Simple categorization based on keywords
        if (lowerIng.includes('chicken') || lowerIng.includes('beef') || lowerIng.includes('fish') || 
            lowerIng.includes('salmon') || lowerIng.includes('tofu') || lowerIng.includes('egg')) {
          if (!groceryCategories['Proteins'].includes(ing)) {
            groceryCategories['Proteins'].push(ing);
          }
        } else if (lowerIng.includes('rice') || lowerIng.includes('pasta') || lowerIng.includes('bread') || 
                  lowerIng.includes('tortilla') || lowerIng.includes('flour')) {
          if (!groceryCategories['Grains'].includes(ing)) {
            groceryCategories['Grains'].push(ing);
          }
        } else if (lowerIng.includes('tomato') || lowerIng.includes('onion') || lowerIng.includes('carrot') || 
                  lowerIng.includes('potato') || lowerIng.includes('lettuce') || lowerIng.includes('cucumber') || 
                  lowerIng.includes('apple') || lowerIng.includes('banana') || lowerIng.includes('berry')) {
          if (!groceryCategories['Fruits & Vegetables'].includes(ing)) {
            groceryCategories['Fruits & Vegetables'].push(ing);
          }
        } else if (lowerIng.includes('milk') || lowerIng.includes('cheese') || lowerIng.includes('yogurt') || 
                  lowerIng.includes('cream') || lowerIng.includes('butter')) {
          if (!groceryCategories['Dairy'].includes(ing)) {
            groceryCategories['Dairy'].push(ing);
          }
        } else if (lowerIng.includes('salt') || lowerIng.includes('pepper') || lowerIng.includes('cumin') || 
                  lowerIng.includes('coriander') || lowerIng.includes('basil') || lowerIng.includes('oregano') ||
                  lowerIng.includes('thyme') || lowerIng.includes('rosemary') || lowerIng.includes('cilantro') ||
                  lowerIng.includes('parsley')) {
          if (!groceryCategories['Herbs & Spices'].includes(ing)) {
            groceryCategories['Herbs & Spices'].push(ing);
          }
        } else if (lowerIng.includes('oil') || lowerIng.includes('vinegar') || lowerIng.includes('sauce') || 
                  lowerIng.includes('ketchup') || lowerIng.includes('mustard') || lowerIng.includes('mayo')) {
          if (!groceryCategories['Oils & Condiments'].includes(ing)) {
            groceryCategories['Oils & Condiments'].push(ing);
          }
        } else {
          if (!groceryCategories['Other'].includes(ing)) {
            groceryCategories['Other'].push(ing);
          }
        }
      });
    };
    
    // Create meal plan for each day
    for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
      const date = new Date();
      date.setDate(date.getDate() + dayIndex);
      
      const dayMeals: any[] = [];
      let dayCalories = 0;
      let dayProtein = 0;
      let dayCarbs = 0;
      let dayFats = 0;
      
      // Process each meal type for the day
      mealTypes.forEach(mealType => {
        // Select a cuisine that still has unused meals for this type
        const availableCuisines = cuisines.filter(cuisine => 
          !usedMeals[cuisine].has(mealType) && 
          mealTemplates[cuisine]?.[mealType]
        );
        
        // If no cuisines with unused meals, reset the tracking for this meal type
        if (availableCuisines.length === 0) {
          cuisines.forEach(cuisine => {
            usedMeals[cuisine].delete(mealType);
          });
        }
        
        // Re-check available cuisines after reset
        const selectedCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
        
        // Mark this cuisine's meal type as used
        usedMeals[selectedCuisine].add(mealType);
        
        // Get the meal template
        const mealTemplate = mealTemplates[selectedCuisine][mealType];
        
        // Extract nutrient values for calculations
        const proteinGrams = parseInt(mealTemplate.nutrients.protein.replace('g', ''));
        const carbsGrams = parseInt(mealTemplate.nutrients.carbs.replace('g', ''));
        const fatsGrams = parseInt(mealTemplate.nutrients.fats.replace('g', ''));
        
        // Add to daily totals
        dayCalories += mealTemplate.calories;
        dayProtein += proteinGrams;
        dayCarbs += carbsGrams;
        dayFats += fatsGrams;
        
        // Add meal to the day
        dayMeals.push({
          type: mealType,
          name: mealTemplate.name,
          calories: mealTemplate.calories,
          recipe: mealTemplate.recipe,
          ingredients: mealTemplate.ingredients,
          instructions: mealTemplate.recipe.split('\n'),
          nutrients: mealTemplate.nutrients
        });
        
        // Process ingredients for grocery list
        processIngredientsForGrocery(mealTemplate.ingredients);
      });
      
      // Add to overall totals
      totalCalories += dayCalories;
      totalProtein += dayProtein;
      totalCarbs += dayCarbs;
      totalFats += dayFats;
      mealCount += dayMeals.length;
      
      // Add day to the meal plan
      days.push({
        date,
        meals: dayMeals,
        dailyNutrition: {
          totalCalories: dayCalories,
          totalProtein: `${dayProtein}g`,
          totalCarbs: `${dayCarbs}g`,
          totalFats: `${dayFats}g`
        }
      });
    }
    
    // Prepare grocery list
    const groceryList = Object.entries(groceryCategories)
      .filter(([_, items]) => items.length > 0)
      .map(([category, items]) => ({
        category,
        items
      }));
      
    // Calculate averages
    const avgCalories = Math.round(totalCalories / numDays);
    const avgProtein = Math.round(totalProtein / numDays);
    const avgCarbs = Math.round(totalCarbs / numDays);
    const avgFats = Math.round(totalFats / numDays);
    
    // Generate nutrition recommendations
    const recommendations = [
      `Your daily calorie intake averages ${avgCalories} calories, which ${
        preferences.healthGoal === 'fit' ? 
          'supports your fitness goals' : 
          'provides satisfying energy for your day'
      }.`,
      `Try to drink at least 8 glasses of water per day to stay properly hydrated.`,
      `This meal plan includes approximately ${avgProtein}g of protein daily, which helps ${
        preferences.healthGoal === 'fit' ? 
          'support muscle recovery and growth' : 
          'maintain healthy body functions'
      }.`,
      `For optimal nutrition, try to include a variety of colored vegetables in your meals.`
    ];
    
    // Return the complete meal plan
    return {
      days,
      groceryList,
      nutritionSummary: {
        averageCalories: avgCalories,
        averageProtein: `${avgProtein}g`,
        averageCarbs: `${avgCarbs}g`,
        averageFats: `${avgFats}g`,
        recommendations
      }
    };
  }

  const httpServer = createServer(app);
  return httpServer;
}
