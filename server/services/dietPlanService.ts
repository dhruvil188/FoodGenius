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
    
    // Apply cleaning to fix JSON syntax errors
    const cleanedJson = cleanJsonString(jsonStr);
    
    console.log("Cleaned JSON:", cleanedJson);
    
    // Parse the cleaned JSON
    let dietPlan: DietPlanResponse;
    
    try {
      dietPlan = JSON.parse(cleanedJson);
      
      // Check if the diet plan is empty or incomplete
      if (!dietPlan.weeklyPlan || dietPlan.weeklyPlan.length === 0) {
        // Try to extract partial data from the text
        const partialDays = extractPartialDietPlanData(text);
        
        if (partialDays.length > 0) {
          // We have partial data, create a partial plan and ensure all 7 days are present
          const completePlan = ensureAllDaysPresent(partialDays);
          dietPlan = {
            weeklyPlan: completePlan,
            planSummary: "Personalized diet plan based on your preferences.",
            weeklyNutritionAverage: calculateAverageNutrition(completePlan)
          };
        } else {
          // No usable data found
          dietPlan = {
            weeklyPlan: [],
            planSummary: "Diet plan could not be generated. Please try again with different preferences.",
            weeklyNutritionAverage: {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0
            }
          };
        }
      } else {
        // Ensure all seven days are present in the plan
        dietPlan.weeklyPlan = ensureAllDaysPresent(dietPlan.weeklyPlan);
        // Recalculate average nutrition
        dietPlan.weeklyNutritionAverage = calculateAverageNutrition(dietPlan.weeklyPlan);
      }
      
      // Validate the structure against our schema
      return dietPlanResponseSchema.parse(dietPlan);
      
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      
      // Try to extract partial data
      const partialDays = extractPartialDietPlanData(text);
      
      if (partialDays.length > 0) {
        // Check which days are missing
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const foundDays = new Set(partialDays.map(day => day.day));
        
        console.log("Days successfully extracted:", Array.from(foundDays).join(", "));
        
        // Try to find any missing days specifically
        for (const day of daysOfWeek) {
          if (!foundDays.has(day)) {
            console.log(`Attempting to specifically extract ${day} data...`);
            
            // Create a specific regex for this day
            const dayRegex = new RegExp(`"day"\\s*:\\s*"${day}"`, 'i');
            const dayIndex = text.search(dayRegex);
            
            if (dayIndex !== -1) {
              console.log(`Found ${day} in text at position ${dayIndex}`);
              // Extract just this section until the next day or end
              let endIndex = text.length;
              
              // Find the next day section if any
              for (const nextDay of daysOfWeek) {
                if (nextDay === day) continue;
                const nextDayRegex = new RegExp(`"day"\\s*:\\s*"${nextDay}"`, 'i');
                const nextDayIndex = text.indexOf(nextDayRegex, dayIndex + 10);
                if (nextDayIndex !== -1 && nextDayIndex < endIndex) {
                  endIndex = nextDayIndex;
                }
              }
              
              // Extract this day's section and try to parse it
              const daySection = text.substring(dayIndex, endIndex);
              const extractedDayData = extractPartialDietPlanData(daySection);
              
              if (extractedDayData.length > 0) {
                console.log(`Successfully extracted data for ${day}`);
                partialDays.push(extractedDayData[0]);
                foundDays.add(day);
              }
            }
          }
        }
        
        // Sort the days of the week in the correct order
        partialDays.sort((a, b) => {
          const dayOrder = {"monday": 0, "tuesday": 1, "wednesday": 2, "thursday": 3, "friday": 4, "saturday": 5, "sunday": 6};
          return dayOrder[a.day.toLowerCase()] - dayOrder[b.day.toLowerCase()];
        });
        
        // We were able to extract some data - ensure all seven days are present
        const completePlan = ensureAllDaysPresent(partialDays);
        const partialPlan: DietPlanResponse = {
          weeklyPlan: completePlan,
          planSummary: "Personalized diet plan based on your preferences.",
          weeklyNutritionAverage: calculateAverageNutrition(completePlan)
        };
        
        // Try to validate against schema
        try {
          return dietPlanResponseSchema.parse(partialPlan);
        } catch (schemaError) {
          console.error("Schema validation error for partial plan:", schemaError);
        }
      }
      
      // Fallback to minimal structure
      const fallbackPlan: DietPlanResponse = {
        weeklyPlan: [],
        planSummary: "Error generating complete plan. Please try again with different preferences.",
        weeklyNutritionAverage: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      };
      
      return dietPlanResponseSchema.parse(fallbackPlan);
    }
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw new Error("Failed to generate diet plan. Please try again later.");
  }
}

/**
 * Helper function to extract partial diet plan data from text
 */
function extractPartialDietPlanData(text: string): { day: string; meals: any[]; totalDailyCalories: number; }[] {
  const partialDays: { day: string; meals: any[]; totalDailyCalories: number; }[] = [];
  const extractedDays = new Set<string>(); // Track days we've already extracted
  
  // Days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Step 1: Try to extract using the standard approach
  const dayRegexStr = `"day"\\s*:\\s*"(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)"`;
  const dayRegex = new RegExp(dayRegexStr, 'g');
  
  // Using exec instead of matchAll for better compatibility
  const dayMatches: { day: string, index: number }[] = [];
  let match;
  while ((match = dayRegex.exec(text)) !== null) {
    dayMatches.push({ day: match[1], index: match.index });
  }
  
  console.log(`Found ${dayMatches.length} days in the text:`, dayMatches.map(m => m.day).join(', '));
  
  // Process day matches
  for (const dayMatch of dayMatches) {
    const dayName = dayMatch.day;
    const dayIndex = dayMatch.index;
    
    // Skip if we've already extracted this day
    if (extractedDays.has(dayName)) {
      continue;
    }
    
    console.log(`Processing ${dayName} at index ${dayIndex}`);
    
    // Find the meals array for this day
    let mealsStart = text.indexOf('"meals"', dayIndex);
    if (mealsStart === -1) {
      console.log(`No meals array found for ${dayName}`);
      continue;
    }
    
    mealsStart = text.indexOf('[', mealsStart);
    if (mealsStart === -1) {
      console.log(`No opening bracket for meals array found for ${dayName}`);
      continue;
    }
    
    // Find the end of the meals array or the next day
    let mealsEnd = -1;
    let bracketCount = 1;
    for (let i = mealsStart + 1; i < text.length; i++) {
      if (text[i] === '[') bracketCount++;
      else if (text[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          mealsEnd = i + 1;
          break;
        }
      }
    }
    
    if (mealsEnd === -1) {
      // Array wasn't closed properly, find the next day or end of string
      console.log(`Array not properly closed for ${dayName}, trying to find next day`);
      let nextDayIndex = text.length;
      
      // Look for the next day marker
      for (const day of daysOfWeek) {
        if (day === dayName) continue;
        
        const nextDayMatch = text.indexOf(`"day":"${day}"`, dayIndex + dayName.length);
        if (nextDayMatch !== -1 && nextDayMatch < nextDayIndex) {
          nextDayIndex = nextDayMatch;
        }
      }
      
      // Use the closest next day or the end of the string
      mealsEnd = nextDayIndex;
    }
    
    // Extract the meals array
    let mealsText = text.substring(mealsStart, mealsEnd);
    console.log(`Extracted meals text for ${dayName} (${mealsText.length} chars)`);
    
    // Try to parse the meals array
    try {
      // Clean up the array text
      mealsText = cleanJsonString(mealsText);
      
      // Add closing bracket if missing
      if (!mealsText.trim().endsWith(']')) {
        mealsText = mealsText.trim() + ']';
      }
      
      // Try to parse it
      let meals;
      try {
        meals = JSON.parse(mealsText);
      } catch (parseError) {
        console.log(`JSON parse error for ${dayName}, trying fallback approach`);
        
        // Fallback approach - extract individual meals
        const mealRegexStr = `\\{\\s*"name"\\s*:\\s*"([^"]+)"`;
        const mealRegex = new RegExp(mealRegexStr, 'g');
        const mealMatches = [];
        let mealMatch;
        
        while ((mealMatch = mealRegex.exec(mealsText)) !== null) {
          const mealStart = mealMatch.index;
          
          // Find the end of this meal object
          let mealEnd = -1;
          let braceCount = 1;
          for (let i = mealStart + 1; i < mealsText.length; i++) {
            if (mealsText[i] === '{') braceCount++;
            else if (mealsText[i] === '}') {
              braceCount--;
              if (braceCount === 0) {
                mealEnd = i + 1;
                break;
              }
            }
          }
          
          if (mealEnd !== -1) {
            const mealObj = mealsText.substring(mealStart, mealEnd);
            try {
              const cleanedMealObj = cleanJsonString(mealObj);
              const parsedMeal = JSON.parse(cleanedMealObj);
              mealMatches.push(parsedMeal);
            } catch (err) {
              console.warn(`Could not parse individual meal: ${mealMatch[1]}`);
            }
          }
        }
        
        if (mealMatches.length > 0) {
          meals = mealMatches;
          console.log(`Successfully extracted ${meals.length} meals for ${dayName} using fallback approach`);
        } else {
          console.warn(`No meals could be extracted for ${dayName}`);
          continue;
        }
      }
      
      // Calculate total calories
      let totalDailyCalories = 0;
      if (Array.isArray(meals)) {
        totalDailyCalories = meals.reduce((sum: number, meal: any) => {
          return sum + (meal.nutritionalInfo?.calories || 0);
        }, 0);
        
        // Add this day to our partial results
        partialDays.push({
          day: dayName,
          meals: meals,
          totalDailyCalories
        });
        
        // Mark this day as extracted
        extractedDays.add(dayName);
        console.log(`Successfully added ${dayName} with ${meals.length} meals and ${totalDailyCalories} calories`);
      } else {
        console.warn(`Meals is not an array for ${dayName}`);
        continue;
      }
    } catch (error) {
      console.warn(`Could not parse meals for ${dayName}:`, error);
      // Continue to the next day
    }
  }
  
  // Step 2: For days that weren't found, try a more targeted approach
  for (const day of daysOfWeek) {
    if (extractedDays.has(day)) {
      continue; // Skip days we've already extracted
    }
    
    console.log(`Trying targeted extraction for ${day}`);
    
    // Try to find this day in the text
    const dayPatternStr = `["']day["']\\s*:\\s*["']${day}["']`;
    const dayPattern = new RegExp(dayPatternStr, 'i');
    const dayMatch = text.match(dayPattern);
    
    if (dayMatch) {
      const dayStartIndex = dayMatch.index;
      
      // Find the meals
      const mealsPatternStr = `["']meals["']\\s*:\\s*\\[`;
      const mealsPattern = new RegExp(mealsPatternStr, 'i');
      const mealsMatch = text.substring(dayStartIndex ?? 0).match(mealsPattern);
      
      if (mealsMatch && mealsMatch.index !== undefined) {
        const mealsStartIndex = (dayStartIndex ?? 0) + mealsMatch.index + mealsMatch[0].length;
        
        // Find the end of the meals array
        let mealsEndIndex = -1;
        let bracketCount = 1;
        for (let i = mealsStartIndex; i < text.length; i++) {
          if (text[i] === '[') bracketCount++;
          else if (text[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
              mealsEndIndex = i + 1;
              break;
            }
          }
        }
        
        if (mealsEndIndex === -1) {
          // Try to find the next day or the end of the object
          const nextDayPatternStr = `["']day["']\\s*:`;
          const nextDayPattern = new RegExp(nextDayPatternStr);
          const nextDayMatch = text.substring(mealsStartIndex).match(nextDayPattern);
          
          if (nextDayMatch && nextDayMatch.index !== undefined) {
            mealsEndIndex = mealsStartIndex + nextDayMatch.index;
          } else {
            // Look for the end of the current day object
            const endOfDayPatternStr = `},\\s*{`;
            const endOfDayPattern = new RegExp(endOfDayPatternStr);
            const endOfDayMatch = text.substring(mealsStartIndex).match(endOfDayPattern);
            
            if (endOfDayMatch && endOfDayMatch.index !== undefined) {
              mealsEndIndex = mealsStartIndex + endOfDayMatch.index;
            } else {
              // Just go to end of text
              mealsEndIndex = text.length;
            }
          }
        }
        
        if (mealsEndIndex > mealsStartIndex) {
          // Extract and try to parse the meals array
          let mealsText = text.substring(mealsStartIndex - 1, mealsEndIndex); // Include opening bracket
          
          try {
            // Clean up and try to parse
            mealsText = cleanJsonString(mealsText);
            let meals = JSON.parse(mealsText);
            
            if (Array.isArray(meals)) {
              // Calculate total calories
              const totalDailyCalories = meals.reduce((sum: number, meal: any) => {
                return sum + (meal.nutritionalInfo?.calories || 0);
              }, 0);
              
              // Add this day to our results
              partialDays.push({
                day: day,
                meals: meals,
                totalDailyCalories
              });
              
              extractedDays.add(day);
              console.log(`Successfully extracted ${day} using targeted approach`);
            }
          } catch (error) {
            console.warn(`Failed to parse meals for ${day} using targeted approach:`, error);
          }
        }
      }
    }
  }
  
  // Step 3: Last resort - create skeleton days for any missing days
  for (const day of daysOfWeek) {
    if (!extractedDays.has(day)) {
      console.log(`Creating skeleton day for ${day}`);
      
      // Create placeholder day with default meal structure
      partialDays.push({
        day: day,
        meals: [
          {
            name: `${day} Breakfast`,
            timeOfDay: "Breakfast",
            ingredients: ["Contact support for more details"],
            instructions: ["This data could not be fully extracted"],
            nutritionalInfo: {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0
            }
          }
        ],
        totalDailyCalories: 0
      });
      
      extractedDays.add(day);
    }
  }
  
  // Sort days in correct order
  return partialDays.sort((a, b) => {
    const dayOrder: { [key: string]: number } = {
      "monday": 0, 
      "tuesday": 1, 
      "wednesday": 2, 
      "thursday": 3, 
      "friday": 4, 
      "saturday": 5, 
      "sunday": 6
    };
    const aDay = a.day.toLowerCase();
    const bDay = b.day.toLowerCase();
    return (dayOrder[aDay] ?? 0) - (dayOrder[bDay] ?? 0);
  });
}

/**
 * Calculate weekly nutrition averages from partial data
 */
function calculateAverageNutrition(days: { day: string; meals: any[]; totalDailyCalories: number; }[]): { calories: number; protein: number; carbs: number; fat: number; } {
  if (days.length === 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  }
  
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let mealCount = 0;
  
  for (const day of days) {
    for (const meal of day.meals) {
      if (meal.nutritionalInfo) {
        totalCalories += meal.nutritionalInfo.calories || 0;
        totalProtein += meal.nutritionalInfo.protein || 0;
        totalCarbs += meal.nutritionalInfo.carbs || 0;
        totalFat += meal.nutritionalInfo.fat || 0;
        mealCount++;
      }
    }
  }
  
  // Calculate daily averages
  const daysCount = days.length;
  return {
    calories: Math.round(totalCalories / (daysCount || 1)),
    protein: Math.round(totalProtein / (daysCount || 1)),
    carbs: Math.round(totalCarbs / (daysCount || 1)),
    fat: Math.round(totalFat / (daysCount || 1))
  };
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
    "1. Meal name (use creative, appetizing names)\n" +
    "2. Time of day to eat\n" +
    "3. List of ingredients with precise quantities and brief explanations (e.g., '2 tbsp extra virgin olive oil (for heart-healthy fats)')\n" +
    "4. Detailed step-by-step cooking instructions including:\n" +
    "   - Preparation steps with timing (chopping, marinating, etc.)\n" +
    "   - Exact cooking temperatures and times (e.g., '375°F for 25 minutes' or 'medium-high heat for 3-4 minutes per side')\n" +
    "   - Specific cooking methods (sauté, bake, steam, etc.) with equipment needed\n" +
    "   - Clear indicators for doneness (e.g., 'until golden brown' or 'internal temperature reaches 165°F')\n" +
    "   - Professional plating and serving suggestions with garnishes\n" +
    "   - Tips for meal prep or storage if applicable\n" +
    "5. Detailed nutritional information (calories, protein, carbs, fat) with additional health benefits\n\n" +
    
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
          "name": "Golden Mediterranean Sunrise Bowl",
          "timeOfDay": "Breakfast",
          "ingredients": [
            "1/2 cup Greek yogurt (high in protein and probiotics for gut health)",
            "1/4 cup granola (provides fiber and sustained energy)",
            "1 tbsp honey (natural sweetener with antimicrobial properties)",
            "1/4 cup mixed berries (rich in antioxidants and vitamin C)",
            "1 tbsp sliced almonds (heart-healthy fats and vitamin E)"
          ],
          "instructions": [
            "Prepare all ingredients (2 minutes): Wash berries and pat dry with paper towel.",
            "In a medium serving bowl, spread the Greek yogurt as the base layer.",
            "Sprinkle granola evenly over the yogurt, creating a crunchy layer.",
            "Arrange mixed berries decoratively on top of the granola.",
            "Drizzle honey in a circular pattern for even distribution of sweetness.",
            "Finish by scattering sliced almonds on top for extra crunch and visual appeal.",
            "For best texture and flavor contrast, serve immediately after assembly.",
            "Meal prep tip: Store granola and berries separately and assemble just before eating to maintain crunchiness."
          ],
          "nutritionalInfo": {
            "calories": 320,
            "protein": 18,
            "carbs": 42,
            "fat": 12
          }
        }
      ],
      "totalDailyCalories": 1900
    }
  ],
  "planSummary": "A nutrient-rich Mediterranean-inspired meal plan focused on balanced macronutrients, complex carbohydrates, lean proteins, and healthy fats. Each meal incorporates fresh, seasonal ingredients with attention to proper portion control for optimal weight management while providing sustained energy throughout the day.",
  "weeklyNutritionAverage": {
    "calories": 1800,
    "protein": 105,
    "carbs": 180,
    "fat": 65
  }
}\n\n` +
    
    "Your response must follow strict JSON format and be able to parse with JSON.parse() with no modifications. " +
    "Do not include markdown code blocks or other formatting. The response must be the raw JSON object only. " +
    "Make sure all meals combined meet the target calories per day.";
}

/**
 * Ensures all seven days of the week are present in the diet plan
 * If a day is missing, it creates a placeholder with default meals
 */
function ensureAllDaysPresent(weeklyPlan: Array<{ day: string; meals: any[]; totalDailyCalories: number; }>): Array<{ day: string; meals: any[]; totalDailyCalories: number; }> {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayOrder: { [key: string]: number } = {
    "monday": 0, 
    "tuesday": 1, 
    "wednesday": 2, 
    "thursday": 3, 
    "friday": 4, 
    "saturday": 5, 
    "sunday": 6
  };
  
  // Create a map of existing days
  const existingDays = new Map<string, { day: string; meals: any[]; totalDailyCalories: number; }>();
  for (const day of weeklyPlan) {
    existingDays.set(day.day.toLowerCase(), day);
  }
  
  // Check for missing days and add placeholder data
  for (const day of daysOfWeek) {
    if (!existingDays.has(day.toLowerCase())) {
      console.log(`Adding placeholder for missing day: ${day}`);
      
      // Get a template from an existing day if available
      let templateMeal = { 
        name: `${day} Default Meal`,
        timeOfDay: "Breakfast",
        ingredients: ["This data could not be generated. Please regenerate the plan."],
        instructions: ["This data could not be generated. Please regenerate the plan."],
        nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
      };
      
      // Try to copy a meal structure from an existing day
      if (weeklyPlan.length > 0 && weeklyPlan[0].meals.length > 0) {
        const existingMeal = { ...weeklyPlan[0].meals[0] };
        templateMeal = {
          name: `${day} ${existingMeal.timeOfDay}`,
          timeOfDay: existingMeal.timeOfDay,
          ingredients: ["This data could not be generated. Please regenerate the plan."],
          instructions: ["This data could not be generated. Please regenerate the plan."],
          nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
        };
      }
      
      // Create a full day's meals based on the average number of meals in other days
      const avgMealsPerDay = Math.max(
        1, 
        Math.round(weeklyPlan.reduce((sum, day) => sum + day.meals.length, 0) / Math.max(1, weeklyPlan.length))
      );
      
      const meals = [];
      const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack", "Snack 2"];
      
      for (let i = 0; i < avgMealsPerDay; i++) {
        meals.push({
          ...templateMeal,
          name: `${day} ${mealTimes[i] || "Meal"}`,
          timeOfDay: mealTimes[i] || "Meal",
        });
      }
      
      existingDays.set(day.toLowerCase(), {
        day,
        meals,
        totalDailyCalories: 0
      });
    }
  }
  
  // Convert map back to array and sort by day of week
  const fullWeeklyPlan = Array.from(existingDays.values());
  return fullWeeklyPlan.sort((a, b) => 
    (dayOrder[a.day.toLowerCase()] ?? 0) - (dayOrder[b.day.toLowerCase()] ?? 0)
  );
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