import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { DietPlanRequest, DietPlanResponse, InsertSavedDietPlan, SavedDietPlan, dietPlanResponseSchema } from "@shared/schema";
import { extractJsonFromText, cleanJsonString } from "../utils";
import { databaseStorage } from "../databaseStorage";

// Initialize the Gemini model
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
    console.log("Generated prompt for Gemini:", prompt);
    
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
    
    // Try to parse the cleaned JSON
    let dietPlan: DietPlanResponse;
    
    try {
      dietPlan = JSON.parse(cleanedJson);
      
      // Check if the diet plan is empty or incomplete
      if (!dietPlan.weeklyPlan || dietPlan.weeklyPlan.length === 0) {
        console.log("Diet plan is empty or has no weekly plan, trying to extract partial data");
        
        // Try to extract partial data from the text
        const partialDays = extractPartialDietPlanData(text);
        
        if (partialDays.length > 0) {
          console.log(`Found ${partialDays.length} days of partial data`);
          // We have partial data, sort it in the correct order
          const sortedPlan = ensureAllDaysPresent(partialDays, planRequest.calorieTarget, planRequest.dietType);
          
          dietPlan = {
            weeklyPlan: sortedPlan,
            planSummary: "Personalized diet plan based on your preferences.",
            weeklyNutritionAverage: calculateAverageNutrition(sortedPlan)
          };
        } else {
          console.log("No partial data found in response, trying again with simplified prompt");
          
          // Try again with a simplified prompt
          const simplifiedPrompt = `Generate a JSON 7-day meal plan for a ${planRequest.dietType} diet with ${planRequest.mealsPerDay} meals per day.
           The daily calorie target is ${planRequest.calorieTarget}.
           ${planRequest.dietType === 'vegetarian' ? 'MAKE SURE THERE ARE NO MEAT, FISH, OR SEAFOOD IN ANY MEAL.' : 
           planRequest.dietType === 'vegan' ? 'MAKE SURE THERE ARE NO ANIMAL PRODUCTS OF ANY KIND IN ANY MEAL.' : ''}
           Return ONLY the JSON with this structure:
           {
             "weeklyPlan": [
               {
                 "day": "Monday",
                 "meals": [
                   {
                     "name": "Meal name",
                     "timeOfDay": "Breakfast (7:30 AM)",
                     "ingredients": ["ingredient 1", "ingredient 2"],
                     "instructions": ["step 1", "step 2"],
                     "nutritionalInfo": { "calories": 300, "protein": 20, "carbs": 30, "fat": 10 }
                   }
                 ],
                 "totalDailyCalories": 2000
               }
             ],
             "planSummary": "Brief summary of the diet plan",
             "weeklyNutritionAverage": {
               "calories": 2000,
               "protein": 100,
               "carbs": 250,
               "fat": 70
             }
           }`;

          try {
            // Make a second API call with the simplified prompt
            console.log("Making second Gemini API call with simplified prompt");
            const secondResult = await model.generateContent(simplifiedPrompt);
            const secondResponse = secondResult.response;
            const secondText = secondResponse.text();
            
            console.log("Raw second response:", secondText);
            
            // Try to extract valid JSON
            const secondJsonStr = extractJsonFromText(secondText);
            const secondCleanedJson = cleanJsonString(secondJsonStr);
            
            console.log("Second cleaned JSON:", secondCleanedJson);
            
            try {
              // Parse the second attempt
              const secondAttempt = JSON.parse(secondCleanedJson);
              
              if (secondAttempt.weeklyPlan && secondAttempt.weeklyPlan.length > 0) {
                console.log("Second attempt successful, found valid data");
                // Sort days in the correct order
                const sortedPlan = ensureAllDaysPresent(secondAttempt.weeklyPlan, planRequest.calorieTarget, planRequest.dietType);
                
                dietPlan = {
                  weeklyPlan: sortedPlan,
                  planSummary: secondAttempt.planSummary || "Personalized meal plan based on your dietary preferences.",
                  weeklyNutritionAverage: secondAttempt.weeklyNutritionAverage || calculateAverageNutrition(sortedPlan)
                };
              } else {
                throw new Error("Second attempt returned empty plan");
              }
            } catch (secondError) {
              console.error("Error parsing second attempt:", secondError);
              // Try one final attempt with an even more direct prompt
              const finalPrompt = `Return just a 7-day meal plan JSON with ${planRequest.mealsPerDay} meals per day.
                Diet: ${planRequest.dietType}. Calories: ${planRequest.calorieTarget}.
                ONLY return the JSON, nothing else.`;
                
              const finalResult = await model.generateContent(finalPrompt);
              const finalText = finalResult.response.text();
              const finalJsonStr = extractJsonFromText(finalText);
              const finalCleanedJson = cleanJsonString(finalJsonStr);
              
              try {
                const finalAttempt = JSON.parse(finalCleanedJson);
                if (finalAttempt.weeklyPlan && finalAttempt.weeklyPlan.length > 0) {
                  const sortedPlan = ensureAllDaysPresent(finalAttempt.weeklyPlan, planRequest.calorieTarget, planRequest.dietType);
                  dietPlan = {
                    weeklyPlan: sortedPlan,
                    planSummary: "Meal plan based on your dietary preferences.",
                    weeklyNutritionAverage: finalAttempt.weeklyNutritionAverage || calculateAverageNutrition(sortedPlan)
                  };
                } else {
                  throw new Error("Final attempt failed");
                }
              } catch (finalError) {
                // Return an honest error message
                dietPlan = {
                  weeklyPlan: [],
                  planSummary: "We couldn't generate a complete meal plan. Please try again with different preferences.",
                  weeklyNutritionAverage: {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                  }
                };
              }
            }
          } catch (retryError) {
            console.error("Error during retry attempts:", retryError);
            // Return an error message to the user
            dietPlan = {
              weeklyPlan: [],
              planSummary: "We couldn't generate a meal plan at this time. Please try again later.",
              weeklyNutritionAverage: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
              }
            };
          }
        }
      } else {
        // We have a plan with days, sort it to ensure correct order
        console.log(`Found ${dietPlan.weeklyPlan.length} days in the plan`);
        dietPlan.weeklyPlan = ensureAllDaysPresent(dietPlan.weeklyPlan, planRequest.calorieTarget, planRequest.dietType);
        
        // Recalculate average nutrition based on the days we actually have
        dietPlan.weeklyNutritionAverage = calculateAverageNutrition(dietPlan.weeklyPlan);
      }
      
      // Validate the structure against our schema
      return dietPlanResponseSchema.parse(dietPlan);
      
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      
      // Try to extract partial data using our extraction function
      const partialDays = extractPartialDietPlanData(text);
      
      if (partialDays.length > 0) {
        console.log(`Extracted ${partialDays.length} days from partial data`);
        
        // Sort the days of the week in the correct order
        const sortedDays = ensureAllDaysPresent(partialDays, planRequest.calorieTarget, planRequest.dietType);
        
        // Create a response with what we have
        const partialPlan: DietPlanResponse = {
          weeklyPlan: sortedDays,
          planSummary: "Personalized diet plan based on your preferences.",
          weeklyNutritionAverage: calculateAverageNutrition(sortedDays)
        };
        
        // Try to validate against schema
        try {
          return dietPlanResponseSchema.parse(partialPlan);
        } catch (schemaError) {
          console.error("Schema validation error for partial plan:", schemaError);
          
          // Try one more API call with a direct prompt
          try {
            console.log("Making final attempt with direct prompt");
            const directPrompt = `Generate a JSON 7-day meal plan with ${planRequest.mealsPerDay} meals per day. 
              Diet type: ${planRequest.dietType}. Target calories: ${planRequest.calorieTarget}.
              ${planRequest.dietType === 'vegetarian' ? 'ENSURE NO MEAT PRODUCTS.' : 
              planRequest.dietType === 'vegan' ? 'ENSURE NO ANIMAL PRODUCTS.' : ''}
              ONLY return valid JSON.`;
              
            const directResult = await model.generateContent(directPrompt);
            const directText = directResult.response.text();
            const directJsonStr = extractJsonFromText(directText);
            const directCleanedJson = cleanJsonString(directJsonStr);
            
            const directAttempt = JSON.parse(directCleanedJson);
            if (directAttempt.weeklyPlan && directAttempt.weeklyPlan.length > 0) {
              const sortedPlan = ensureAllDaysPresent(directAttempt.weeklyPlan, planRequest.calorieTarget, planRequest.dietType);
              return dietPlanResponseSchema.parse({
                weeklyPlan: sortedPlan,
                planSummary: "Meal plan based on your preferences.",
                weeklyNutritionAverage: calculateAverageNutrition(sortedPlan)
              });
            }
          } catch (finalTryError) {
            console.error("Final attempt failed:", finalTryError);
          }
        }
      }
      
      // No usable data at all - return a clear error message
      const errorPlan: DietPlanResponse = {
        weeklyPlan: [],
        planSummary: "We couldn't generate a meal plan based on your preferences. Please try again with different options.",
        weeklyNutritionAverage: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      };
      
      return dietPlanResponseSchema.parse(errorPlan);
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
              console.warn(`Failed to parse individual meal for ${dayName}:`, err);
            }
          }
        }
        
        if (mealMatches.length > 0) {
          meals = mealMatches;
        } else {
          console.log(`Could not extract any meals for ${dayName}`);
          continue;
        }
      }
      
      if (!Array.isArray(meals)) {
        console.log(`Meals for ${dayName} is not an array`);
        continue;
      }
      
      // Find the total daily calories
      const totalDailyCaloriesMatch = text.match(new RegExp(`"totalDailyCalories"\\s*:\\s*(\\d+)`, 'i'));
      let totalDailyCalories = totalDailyCaloriesMatch ? parseInt(totalDailyCaloriesMatch[1]) : 0;
      
      // If we don't have total calories, sum from individual meals
      if (!totalDailyCalories && meals.length > 0) {
        totalDailyCalories = meals.reduce((sum, meal) => {
          return sum + (meal.nutritionalInfo?.calories || 0);
        }, 0);
      }
      
      // Add this day to our results
      partialDays.push({
        day: dayName,
        meals: meals,
        totalDailyCalories
      });
      
      extractedDays.add(dayName);
      console.log(`Successfully extracted ${dayName} with ${meals.length} meals and ${totalDailyCalories} calories`);
    } catch (error) {
      console.warn(`Failed to parse meals for ${dayName}:`, error);
    }
    
    // Try targeted extraction for days that are missing
    for (const day of daysOfWeek) {
      if (extractedDays.has(day)) continue;
      
      console.log(`Trying targeted extraction for ${day}`);
      const dayPattern = `"day"\\s*:\\s*"${day}"`;
      const dayMatch = text.match(new RegExp(dayPattern, 'i'));
      
      if (dayMatch) {
        try {
          // Extract a section around this day
          const matchIndex = dayMatch.index;
          const sectionStart = Math.max(0, matchIndex - 100);
          const sectionEnd = Math.min(text.length, matchIndex + 2000);
          const section = text.substring(sectionStart, sectionEnd);
          
          // Try to extract just this day's data
          const partialExtracted = extractPartialDietPlanData(section);
          if (partialExtracted.length > 0) {
            for (const extracted of partialExtracted) {
              if (extracted.day === day && !extractedDays.has(day)) {
                partialDays.push(extracted);
                extractedDays.add(day);
                console.log(`Successfully extracted ${day} using targeted approach`);
              }
            }
          }
        } catch (error) {
          console.warn(`Failed to parse meals for ${day} using targeted approach:`, error);
        }
      }
    }
  }
  
  // Step 3: Only return what we were able to extract from the AI response
  // We no longer create template days as that would not be honest to the user
  console.log(`Extracted ${partialDays.length} days from the AI response: ${partialDays.map(d => d.day).join(', ')}`);
  
  // Return only the days we successfully extracted - no templates
  return partialDays;
}

/**
 * Ensures all seven days of the week are present in the diet plan
 * If days are missing, we'll return what we have and not fill in templates
 */
function ensureAllDaysPresent(
  weeklyPlan: Array<{ day: string; meals: any[]; totalDailyCalories: number; }>, 
  calorieTarget: string | number = 2200,
  dietType: string = 'balanced'
): Array<{ day: string; meals: any[]; totalDailyCalories: number; }> {
  // Get days of the week in order
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
  
  // Sort the existing days by the day of week
  const sortedPlan = Array.from(existingDays.values());
  return sortedPlan.sort((a, b) => 
    (dayOrder[a.day.toLowerCase()] ?? 0) - (dayOrder[b.day.toLowerCase()] ?? 0)
  );
}

/**
 * Calculate weekly nutrition averages from partial data
 */
function calculateAverageNutrition(days: { day: string; meals: any[]; totalDailyCalories: number; }[]): { calories: number; protein: number; carbs: number; fat: number; } {
  if (!days || days.length === 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  }
  
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let mealCount = 0;
  
  // Sum up all nutritional info from all meals
  for (const day of days) {
    // Use the total daily calories if available, otherwise sum from meals
    if (day.totalDailyCalories) {
      totalCalories += day.totalDailyCalories;
    }
    
    // Extract nutrient data from each meal
    if (day.meals && Array.isArray(day.meals)) {
      for (const meal of day.meals) {
        if (meal.nutritionalInfo) {
          // Add calories only if we don't have a day total
          if (!day.totalDailyCalories && meal.nutritionalInfo.calories) {
            totalCalories += meal.nutritionalInfo.calories;
          }
          
          // Add other nutrients
          if (meal.nutritionalInfo.protein) totalProtein += meal.nutritionalInfo.protein;
          if (meal.nutritionalInfo.carbs) totalCarbs += meal.nutritionalInfo.carbs;
          if (meal.nutritionalInfo.fat) totalFat += meal.nutritionalInfo.fat;
        }
      }
      mealCount += day.meals.length;
    }
  }
  
  // Calculate daily averages
  const avgCalories = Math.round(totalCalories / days.length);
  
  // For macronutrients, if we have data, average per meal then multiply by typical meals per day
  let avgProtein = 0;
  let avgCarbs = 0;
  let avgFat = 0;
  
  if (mealCount > 0) {
    // Average per meal
    const proteinPerMeal = totalProtein / mealCount;
    const carbsPerMeal = totalCarbs / mealCount;
    const fatPerMeal = totalFat / mealCount;
    
    // Assume 3 meals per day for macro calculations if we don't have complete data
    const mealsPerDay = days.length > 0 ? (mealCount / days.length) : 3;
    
    avgProtein = Math.round(proteinPerMeal * mealsPerDay);
    avgCarbs = Math.round(carbsPerMeal * mealsPerDay);
    avgFat = Math.round(fatPerMeal * mealsPerDay);
  }
  
  return {
    calories: avgCalories,
    protein: avgProtein,
    carbs: avgCarbs,
    fat: avgFat
  };
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

/**
 * Generate the AI prompt based on user preferences
 */
function generatePrompt(planRequest: DietPlanRequest): string {
  // Calculate max daily calories from target
  const targetCalories = typeof planRequest.calorieTarget === 'number' 
    ? planRequest.calorieTarget 
    : planRequest.calorieTarget === 'high' 
      ? 3000 
      : planRequest.calorieTarget === 'low' 
        ? 1600 
        : 2200;

  // Start with the base prompt
  let prompt = `Generate a personalized 7-day meal plan for a ${planRequest.dietType} diet with ${planRequest.mealsPerDay} meals per day. The daily calorie target is ${targetCalories}.

The meal plan should follow these guidelines:
1. Include EXACTLY ${planRequest.mealsPerDay} meals per day
2. Daily calorie total should be approximately ${targetCalories} calories
3. Each meal should include:
   - Name of the meal
   - Time of day to eat it (e.g., "Breakfast (7:30 AM)", "Lunch (12:30 PM)", "Dinner (6:30 PM)", "Snack (3:30 PM)")
   - Ingredients list with quantities
   - Step-by-step instructions
   - Nutritional information (calories, protein, carbs, fat)
4. Each day should have a total calorie count
5. Provide a varied selection of meals across the week
6. Include appropriate meal timing for each meal

Present your response as a valid JSON object with the following structure:
{
  "weeklyPlan": [
    {
      "day": "Monday",
      "meals": [
        {
          "name": "Meal Name",
          "timeOfDay": "Breakfast (7:30 AM)",
          "ingredients": ["Ingredient 1", "Ingredient 2", ...],
          "instructions": ["Step 1", "Step 2", ...],
          "nutritionalInfo": { "calories": 300, "protein": 20, "carbs": 30, "fat": 10 }
        }
      ],
      "totalDailyCalories": 2000
    }
  ],
  "planSummary": "Brief summary of the diet plan",
  "weeklyNutritionAverage": {
    "calories": 2000,
    "protein": 100,
    "carbs": 250,
    "fat": 70
  }
}`;

  // Add specific dietary restrictions based on diet type
  if (planRequest.dietPreferences && planRequest.dietPreferences.length > 0) {
    prompt += `\n\nInclude these preferences in the meal plan: ${planRequest.dietPreferences.join(", ")}`;
  }

  // Add allergies if specified
  if (planRequest.allergies && planRequest.allergies.length > 0) {
    prompt += `\n\nAvoid these allergens: ${planRequest.allergies.join(", ")}`;
  }

  // Add dietary type-specific instructions
  prompt += "\n\n" + (
    planRequest.dietType === 'vegetarian' ? "MAKE SURE THERE ARE ABSOLUTELY NO MEAT, FISH, OR SEAFOOD IN ANY MEAL." : 
    planRequest.dietType === 'vegan' ? "MAKE SURE THERE ARE NO ANIMAL PRODUCTS OF ANY KIND IN ANY MEAL." : 
    "");

  return prompt;
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
    tags,
    calorieTarget: dietPlan.weeklyNutritionAverage.calories,
    createdAt: new Date()
  };
  
  return await databaseStorage.createSavedDietPlan(savedPlanData);
}

/**
 * Get all diet plans for a user
 */
export async function getUserDietPlans(userId: number): Promise<SavedDietPlan[]> {
  return await databaseStorage.getSavedDietPlans(userId);
}

/**
 * Get a specific diet plan by ID with ownership validation
 */
export async function getDietPlanById(planId: number, userId: number): Promise<SavedDietPlan> {
  const plan = await databaseStorage.getSavedDietPlanById(planId);
  
  if (!plan) {
    throw new Error("Diet plan not found");
  }
  
  if (plan.userId !== userId) {
    throw new Error("You do not have permission to access this diet plan");
  }
  
  return plan;
}

/**
 * Delete a diet plan with ownership validation
 */
export async function deleteDietPlan(planId: number, userId: number): Promise<boolean> {
  const plan = await databaseStorage.getSavedDietPlanById(planId);
  
  if (!plan) {
    throw new Error("Diet plan not found");
  }
  
  if (plan.userId !== userId) {
    throw new Error("You do not have permission to delete this diet plan");
  }
  
  return await databaseStorage.deleteSavedDietPlan(planId);
}