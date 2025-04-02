import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { storage } from "../storage";
import {
  dietPlanRequestSchema,
  dietPlanResponseSchema,
  type DietPlanRequest,
  type DietPlanResponse,
  type InsertSavedDietPlan,
  type SavedDietPlan
} from "@shared/schema";
import { extractJsonFromText, cleanJsonString } from "../utils";
import { NotFoundError, AuthorizationError } from "../middleware/errorHandler";

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.4,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  }
});

/**
 * Generates a personalized diet plan using the Gemini AI
 */
export async function generateDietPlan(userId: number, planRequest: DietPlanRequest): Promise<DietPlanResponse> {
  try {
    // Generate prompt for AI
    const prompt = generatePrompt(planRequest);
    
    // Get AI response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Log the raw response for debugging
    console.log("Raw AI response for diet plan:", text);
    
    // Extract JSON from response text
    const jsonStr = extractJsonFromText(text);
    
    // Log the extracted JSON
    console.log("Extracted JSON:", jsonStr);
    
    // Apply more aggressive cleaning to fix JSON syntax errors
    let cleanedJson = cleanJsonString(jsonStr);
    
    // Additional cleaning for common JSON issues
    cleanedJson = cleanedJson
      // Fix unescaped quotes in values
      .replace(/([a-zA-Z0-9])"([a-zA-Z0-9])/g, '$1\\"$2')
      // Fix missing quotes around property names
      .replace(/(\{|\,)\s*([a-zA-Z0-9_]+)\s*\:/g, '$1"$2":')
      // Fix trailing commas before closing brackets
      .replace(/,(\s*[\]}])/g, '$1');
    
    console.log("Cleaned JSON:", cleanedJson);
    
    // Use safe parsing with fallback
    let dietPlan: DietPlanResponse;
    try {
      dietPlan = JSON.parse(cleanedJson);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      
      // Last resort: try to fix by reconstructing JSON structure
      const dummyStructure: DietPlanResponse = {
        weeklyPlan: [],
        planSummary: "Error generating complete plan. Please try again.",
        weeklyNutritionAverage: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      };
      
      // Try to validate against schema anyway
      try {
        return dietPlanResponseSchema.parse(dummyStructure);
      } catch (schemaError) {
        console.error("Schema validation error:", schemaError);
        throw new Error("Invalid plan format returned. Please try again.");
      }
    }
    
    // Validate the response against our schema
    return dietPlanResponseSchema.parse(dietPlan);
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw new Error("Failed to generate diet plan. Please try again later.");
  }
}

/**
 * Save a generated diet plan to the user's library
 */
export async function saveDietPlan(userId: number, planName: string, dietPlan: DietPlanResponse, mealsPerDay: number): Promise<SavedDietPlan> {
  // Extract tags from the diet plan
  const tags = extractTagsFromDietPlan(dietPlan);
  
  // Create the insert data
  const savedPlanData: InsertSavedDietPlan = {
    userId,
    planName,
    planData: dietPlan,
    mealsPerDay,
    tags: tags.length > 0 ? tags : null
  };
  
  // Save to database
  return await storage.createSavedDietPlan(savedPlanData);
}

/**
 * Get all diet plans for a user
 */
export async function getUserDietPlans(userId: number): Promise<SavedDietPlan[]> {
  return await storage.getSavedDietPlans(userId);
}

/**
 * Get a specific diet plan by ID with ownership validation
 */
export async function getDietPlanById(planId: number, userId: number): Promise<SavedDietPlan> {
  const plan = await storage.getSavedDietPlanById(planId);
  
  if (!plan) {
    throw new NotFoundError("Diet plan not found");
  }
  
  // Check ownership
  if (plan.userId !== userId) {
    throw new AuthorizationError("You don't have permission to access this diet plan");
  }
  
  return plan;
}

/**
 * Delete a diet plan with ownership validation
 */
export async function deleteDietPlan(planId: number, userId: number): Promise<boolean> {
  const plan = await storage.getSavedDietPlanById(planId);
  
  if (!plan) {
    throw new NotFoundError("Diet plan not found");
  }
  
  // Check ownership
  if (plan.userId !== userId) {
    throw new AuthorizationError("You don't have permission to delete this diet plan");
  }
  
  return await storage.deleteSavedDietPlan(planId);
}

/**
 * Generate the AI prompt based on user preferences
 */
function generatePrompt(planRequest: DietPlanRequest): string {
  const {
    dietType,
    healthGoals,
    calorieTarget,
    mealsPerDay,
    excludedFoods,
    medicalConditions,
    cookingSkill,
    timeConstraint,
    budgetLevel,
    preferredCuisines,
    seasonalPreference,
    proteinPreference,
    extraNotes
  } = planRequest;
  
  return "I need you to generate a personalized 7-day meal plan based on the following criteria:\n\n" +
    `Diet Type: ${dietType}\n` +
    `Health Goals: ${healthGoals.join(", ")}\n` +
    `Calorie Target: ${calorieTarget} calories per day\n` +
    `Meals Per Day: ${mealsPerDay}\n` +
    `Excluded Foods: ${excludedFoods.join(", ")}\n` +
    `Medical Conditions: ${medicalConditions.join(", ")}\n` +
    `Cooking Skill Level: ${cookingSkill}\n` +
    `Time Constraint: ${timeConstraint} minutes per meal\n` +
    `Budget Level: ${budgetLevel}\n` +
    `Preferred Cuisines: ${preferredCuisines.join(", ")}\n` +
    `Seasonal Preference: ${seasonalPreference}\n` +
    `Protein Preference: ${proteinPreference}\n` +
    `Additional Notes: ${extraNotes || "None"}\n\n` +
    
    `For each day, generate exactly ${mealsPerDay} different meals. Each meal should be appropriate for the time of day (breakfast, lunch, dinner, snacks).\n` +
    "Make sure each daily plan is different (no repeating the exact same meals).\n" +
    "For EACH meal, provide:\n" +
    "1. Meal name\n" +
    "2. Time of day to eat\n" +
    "3. List of ingredients with quantities\n" +
    "4. Step-by-step cooking instructions\n" +
    "5. Nutritional information (calories, protein, carbs, fat)\n\n" +
    
    "***EXTREMELY IMPORTANT***: Your response MUST be a valid, parseable JSON object. Do not include explanations, text, or markdown outside the JSON. " +
    "Use proper JSON syntax with double quotes for all strings and property names. All numbers must be numeric values without quotes. " +
    "All arrays and objects must be properly terminated.\n\n" +
    
    "REQUIRED JSON FORMAT:\n\n" +
    
    `{
  "weeklyPlan": [
    {
      "day": "Monday",
      "meals": [
        {
          "name": "Meal name",
          "timeOfDay": "Breakfast/Lunch/Dinner/Snack",
          "ingredients": ["Ingredient 1 with quantity", "Ingredient 2 with quantity"],
          "instructions": ["Step 1", "Step 2", "Step 3"],
          "nutritionalInfo": {
            "calories": 123,
            "protein": 12,
            "carbs": 34,
            "fat": 5
          }
        }
      ],
      "totalDailyCalories": 1200
    }
  ],
  "planSummary": "Brief summary of overall plan",
  "weeklyNutritionAverage": {
    "calories": 1500,
    "protein": 100,
    "carbs": 150,
    "fat": 50
  }
}\n\n` +
    
    "Your response must follow strict JSON format and be able to parse with JSON.parse() with no modifications. " +
    "Do not include markdown code blocks or other formatting. The response must be the raw JSON object only. " +
    "Make sure all meals combined meet the target calories per day.";
}

/**
 * Extract tags from the diet plan for easier categorization
 */
function extractTagsFromDietPlan(dietPlan: DietPlanResponse): string[] {
  const tags: Set<string> = new Set();
  
  // Add diet type as a tag
  tags.add(dietPlan.planSummary.includes("vegan") ? "vegan" : 
          dietPlan.planSummary.includes("vegetarian") ? "vegetarian" : 
          dietPlan.planSummary.includes("keto") ? "keto" : 
          dietPlan.planSummary.includes("paleo") ? "paleo" : 
          "balanced");
  
  // Add calorie range tag
  const avgCalories = dietPlan.weeklyNutritionAverage.calories;
  if (avgCalories < 1200) tags.add("low-calorie");
  else if (avgCalories > 2000) tags.add("high-calorie");
  else tags.add("medium-calorie");
  
  // Add protein tag
  const avgProtein = dietPlan.weeklyNutritionAverage.protein;
  if (avgProtein > 100) tags.add("high-protein");
  
  // Extract cuisine types from plan summary
  const cuisines = ["italian", "mexican", "asian", "indian", "mediterranean", "american"];
  for (const cuisine of cuisines) {
    if (dietPlan.planSummary.toLowerCase().includes(cuisine)) {
      tags.add(cuisine);
    }
  }
  
  return Array.from(tags);
}