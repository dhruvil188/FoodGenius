import { GoogleGenerativeAI } from "@google/generative-ai";
import { ValidationError } from "../middleware/errorHandler";
import type { AnalyzeImageResponse } from "@shared/schema";
import { enhanceRecipeWithVideos } from "./recipeService";
import { analyzeImageResponseSchema } from "@shared/schema";
import { getMockAnalysisResponse } from "../mockData";

// Initialize the Google AI client
const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("❗ GEMINI_API_KEY not found. AI image analysis will not work.");
}

/**
 * Adapts the Gemini API response to match our schema when validation fails.
 * This handles cases where the API response format slightly differs from our expected schema.
 */
function adaptResponseToSchema(data: any): AnalyzeImageResponse {
  // Create a base compliant object
  const adapted: AnalyzeImageResponse = {
    foodName: data.foodName || "Unknown Food",
    description: data.description || "No description available",
    tags: Array.isArray(data.tags) ? data.tags : [],
    recipes: [],
    imageUrl: data.imageUrl || "",
  };
  
  // Adapt recipes if they exist
  if (Array.isArray(data.recipes) && data.recipes.length > 0) {
    adapted.recipes = data.recipes.map((recipe: any) => {
      // Ensure required fields exist
      const adaptedRecipe = {
        title: recipe.title || "Untitled Recipe",
        description: recipe.description || "No description available",
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
      };
      
      // Copy all other fields that exist
      Object.keys(recipe).forEach(key => {
        if (key !== 'title' && key !== 'description' && key !== 'ingredients' && key !== 'instructions') {
          (adaptedRecipe as any)[key] = recipe[key];
        }
      });
      
      return adaptedRecipe;
    });
  }
  
  // Copy YouTube videos if they exist
  if (Array.isArray(data.youtubeVideos)) {
    adapted.youtubeVideos = data.youtubeVideos;
  }
  
  return adapted;
}

/**
 * Analyzes a food image using the Gemini AI API
 */
export async function analyzeImage(imageData: string, userId: number): Promise<AnalyzeImageResponse> {
  if (!imageData) {
    throw new ValidationError("No image data provided");
  }
  
  if (!imageData.startsWith("data:image/")) {
    throw new ValidationError("Invalid image format. Must be a base64 encoded image");
  }
  
  // Check if Gemini API is available
  if (!genAI || !apiKey) {
    console.error("❌ Gemini API key is missing or invalid");
    throw new ValidationError("API configuration error: Gemini API key is missing. Please contact support.");
  }
  
  try {
    // Configure the Gemini 1.5 Flash model with appropriate parameters
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });
    
    // Remove the data:image/jpeg;base64, part
    const base64Image = imageData.split(",")[1];
    
    const promptText = `
      You are a master chef and cooking expert. Analyze the food in this image and provide detailed information.
      
      Please identify the dish and create a comprehensive recipe card including:
      
      1. A descriptive name for the dish
      2. A brief description of what it is
      3. Full ingredients list with quantities
      4. Step-by-step cooking instructions
      5. Nutritional information
      6. Difficulty level
      7. Preparation and cooking times
      8. Recommended side dishes
      9. Cultural context of the dish
      10. Cooking equipment needed
      11. Chef's tips and techniques
      12. Recipe variations (vegetarian, vegan, etc.)
      13. Flavor profile
      14. Health benefits
      15. Approximate cost per serving
      
      Format the response strictly as a JSON object that matches this exact schema (important!):
      
      {
        "foodName": "string",
        "description": "string",
        "tags": ["string"],
        "recipes": [{
          "title": "string",
          "description": "string",
          "prepTime": "string",
          "cookTime": "string",
          "totalTime": "string",
          "servings": number,
          "difficulty": "string",
          "ingredients": ["string"],
          "instructions": ["string"],
          "nutritionInfo": {
            "calories": number,
            "protein": "string",
            "carbs": "string",
            "fats": "string"
          },
          "equipment": [{
            "name": "string",
            "description": "string"
          }],
          "techniqueDetails": [{
            "name": "string",
            "description": "string"
          }],
          "variations": [{
            "type": "string",
            "description": "string",
            "adjustments": ["string"]
          }],
          "sideDishSuggestions": [{
            "name": "string",
            "description": "string"
          }],
          "culturalContext": {
            "origin": "string",
            "history": "string"
          },
          "cookingScience": {
            "keyReactions": ["string"],
            "safetyTips": ["string"]
          }
        }]
      }

      Be thorough but concise. Make sure your response ONLY contains the JSON object with no additional text.
    `;
    
    // Create a request with text and an image part
    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ];
    
    console.log("🔍 Analyzing image with Gemini AI...");
    const result = await model.generateContent([promptText, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON from the text response
    try {
      // Find JSON content (handling potential extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not extract JSON from AI response");
      }
      
      const jsonString = jsonMatch[0];
      const parsedData = JSON.parse(jsonString);
      
      // Add imageUrl to the parsed data if it doesn't exist
      if (!parsedData.imageUrl && imageData) {
        parsedData.imageUrl = `data:image/jpeg;base64,${imageData}`;
      }
      
      // Make schema validation more flexible
      try {
        // Validate response against our schema
        const validatedData = analyzeImageResponseSchema.parse(parsedData);
        
        // Enhance with YouTube videos
        const enhancedData = await enhanceRecipeWithVideos(validatedData);
        
        return enhancedData;
      } catch (validationError) {
        console.error("Schema validation error:", validationError);
        
        // Try to adapt the response to match our schema
        const adaptedData = adaptResponseToSchema(parsedData);
        
        // Enhance with YouTube videos
        const enhancedData = await enhanceRecipeWithVideos(adaptedData);
        
        return enhancedData;
      }
      
    } catch (error) {
      console.error("Error parsing AI response:", error);
      console.debug("Raw AI response:", text);
      throw new Error("Failed to parse AI response into valid recipe format");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to analyze image with AI: " + (error as Error).message);
  }
}