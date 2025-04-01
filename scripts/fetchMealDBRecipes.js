import fs from 'fs';
import https from 'https';

// List of meal IDs we want to fetch
const mealIds = [
  // Beef
  "52874", "52878", "52871",
  // Chicken
  "53085", "53050", "52940",
  // Dessert
  "53049", "52893", "52768",
  // Pasta
  "52982", "52835", "52987",
  // Seafood
  "52959", "52819", "52944",
  // Vegetarian
  "52807", "52870", "52785",
  // Pork
  "52885", "52995", "52841",
  // Lamb
  "52769", "52805", "52843",
  // Breakfast
  "52896", "52967", "52895",
  // Side
  "52914", "52913", "52764",
];

// Function to fetch recipe details from TheMealDB API
function fetchRecipe(mealId) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const mealData = JSON.parse(data).meals[0];
          resolve(mealData);
        } catch (error) {
          reject(`Error parsing data for meal ID ${mealId}: ${error.message}`);
        }
      });
      
    }).on('error', (error) => {
      reject(`Error fetching meal ID ${mealId}: ${error.message}`);
    });
  });
}

// Function to format TheMealDB data to match our application's schema
function formatRecipe(mealData) {
  // Extract all ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      if (measure && measure.trim() !== '') {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
      } else {
        ingredients.push(ingredient.trim());
      }
    }
  }
  
  // Split instructions into steps
  const instructions = mealData.strInstructions
    .split(/\r\n|\r|\n/)
    .filter(step => step.trim() !== '')
    .map(step => step.replace(/^\d+\.\s*/, '').trim());
  
  // Extract tags
  const tags = mealData.strTags ? mealData.strTags.split(',').map(tag => tag.trim()) : [];
  
  // Format as AnalyzeImageResponse
  return {
    foodName: mealData.strMeal,
    description: `${mealData.strMeal} is a ${mealData.strCategory} dish from ${mealData.strArea} cuisine. ${
      tags.length > 0 ? `It's known for being ${tags.join(', ')}.` : ''
    } This traditional recipe creates a delicious meal that's perfect for any occasion.`,
    tags: [...tags, mealData.strCategory, mealData.strArea].filter(Boolean),
    youtubeVideos: [{
      videoId: mealData.strYoutube ? mealData.strYoutube.split('v=')[1] : '',
      title: `How to Make ${mealData.strMeal}`,
      channelTitle: "TheMealDB",
      description: `Learn how to prepare this delicious ${mealData.strMeal} recipe step by step.`,
      publishedAt: "2023-01-01T00:00:00Z",
      thumbnailUrl: mealData.strMealThumb
    }],
    recipes: [{
      title: mealData.strMeal,
      description: `This traditional ${mealData.strArea} ${mealData.strCategory.toLowerCase()} features ${
        ingredients.slice(0, 3).join(', ')
      } and other quality ingredients. Follow these steps to create a delicious meal that will impress your family and friends.`,
      prepTime: "30 minutes",
      cookTime: "45 minutes",
      totalTime: "1 hour 15 minutes",
      servings: 4,
      servingSize: "1 portion",
      difficulty: "Intermediate",
      tags: [...tags, mealData.strCategory, mealData.strArea].filter(Boolean),
      ingredients,
      instructions,
      chefTips: [
        `Make sure to prepare all ingredients before starting to cook`,
        `For best results, follow the instructions carefully`,
        `Adjust seasoning to your taste`,
        `Let the dish rest for a few minutes before serving`
      ],
      commonMistakes: [
        `Overcooking the main ingredients`,
        `Not preparing all ingredients in advance`,
        `Using low-quality ingredients which affects the final taste`,
        `Rushing through the cooking process`
      ],
      nutritionInfo: {
        calories: 350,
        protein: "25g",
        carbs: "30g",
        fats: "15g",
        fiber: "5g",
        sugar: "10g",
        sodium: "500mg",
        vitamins: [
          "Vitamin A",
          "Vitamin C",
          "Iron"
        ],
        healthyAlternatives: [
          `Use low-sodium alternatives if you're watching your salt intake`,
          `Substitute with whole grain options where applicable`,
          `Use lean meat cuts to reduce fat content`
        ],
        dietaryNotes: [
          `Contains ${mealData.strCategory.toLowerCase()}`,
          `Traditional ${mealData.strArea} recipe`,
          `Modify ingredients for dietary restrictions if needed`
        ]
      },
      variations: [
        {
          type: "Spicy Version",
          description: `Add extra chili or hot sauce for those who enjoy heat`,
          adjustments: [
            "Add 1-2 chopped chilies during cooking",
            "Include hot sauce to taste",
            "Add a pinch of cayenne pepper to the seasoning"
          ]
        },
        {
          type: "Vegetarian Option",
          description: mealData.strCategory === 'Vegetarian' || mealData.strCategory === 'Vegan' ? 
            `Alternative vegetable combinations` : 
            `Substitute meat with plant-based alternatives`,
          adjustments: [
            mealData.strCategory === 'Vegetarian' || mealData.strCategory === 'Vegan' ?
              "Use different seasonal vegetables" :
              "Replace meat with tofu, tempeh, or meat substitutes",
            "Adjust cooking time accordingly",
            "Use vegetable broth instead of meat broth"
          ]
        }
      ],
      sideDishSuggestions: [
        {
          name: `Fresh Garden Salad`,
          description: `A simple salad with mixed greens, tomatoes, and cucumber`,
          preparationTime: "10 minutes",
          pairingReason: `Provides a fresh contrast to the rich flavors of the main dish`
        },
        {
          name: mealData.strCategory === 'Side' ? `Steamed Rice` : `Roasted Vegetables`,
          description: mealData.strCategory === 'Side' ? 
            `Plain steamed rice to accompany the side dish` : 
            `Seasonal vegetables roasted with herbs and olive oil`,
          preparationTime: mealData.strCategory === 'Side' ? "20 minutes" : "30 minutes",
          pairingReason: `Complements the main dish with additional textures and flavors`
        }
      ],
      storageInstructions: `Store in an airtight container in the refrigerator for up to 3 days.`,
      reheatingMethods: `Reheat in a microwave until hot throughout, or in a pan over medium heat.`,
      beveragePairings: [
        mealData.strAlcoholic === 'Yes' ? 
          `Water or soft drinks for non-alcoholic options` : 
          `Wine or beer according to preference`,
        `Sparkling water with lemon`,
        `Tea or coffee to finish the meal`
      ],
      techniqueDetails: [
        {
          name: `Proper Preparation`,
          description: `The key to this recipe is proper mise en place (preparation) before cooking.`,
          visualCues: [
            `Ingredients should be cut to uniform sizes for even cooking`,
            `Colors should be vibrant and fresh`,
            `Follow the recipe's guidance on preparation techniques`
          ],
          commonErrors: [
            `Uneven cutting resulting in inconsistent cooking`,
            `Not preparing all ingredients before starting`,
            `Using improper tools for preparation`
          ]
        },
        {
          name: `Cooking Temperature`,
          description: `Managing heat is crucial for this ${mealData.strCategory.toLowerCase()} recipe.`,
          visualCues: [
            `Look for gentle bubbling, not rapid boiling`,
            `Golden browning indicates proper caramelization`,
            `Steam should rise steadily, not excessively`
          ],
          commonErrors: [
            `Heat too high, causing burning or overcooking`,
            `Heat too low, extending cooking time unnecessarily`,
            `Inconsistent heat throughout cooking process`
          ]
        }
      ],
      cookingScience: {
        keyReactions: [
          `Maillard reaction creates brown colors and complex flavors`,
          `Caramelization of sugars enhances sweetness and depth`,
          `Protein coagulation ensures proper texture development`
        ],
        techniquePurpose: [
          `Slow cooking allows flavors to meld together`,
          `Specific cutting techniques ensure even cooking`,
          `Resting after cooking allows juices to redistribute`
        ],
        safetyTips: [
          `Ensure proper internal temperature for food safety`,
          `Keep preparation areas clean to prevent cross-contamination`,
          `Follow proper storage guidelines after cooking`
        ]
      },
      sensoryGuidance: {
        aromaIndicators: [
          `A rich, inviting aroma should develop during cooking`,
          `Fresh ingredients should contribute distinct scents`,
          `The finished dish should have a balanced fragrance`
        ],
        textureDescriptors: [
          `The main ingredients should be tender but not mushy`,
          `There should be a pleasing contrast in textures`,
          `The sauce should have the right consistency - not too thick or thin`
        ],
        tasteProgression: [
          `Initial flavors should be bright and appealing`,
          `Middle notes of depth and richness follow`,
          `A satisfying finish with lingering pleasant flavors`
        ]
      },
      culturalContext: {
        origin: `This dish originates from ${mealData.strArea} cuisine, where it has been enjoyed for generations.`,
        history: `${mealData.strMeal} represents traditional cooking methods and flavor combinations that have been perfected over time.`,
        traditionalServing: `In ${mealData.strArea} culture, this dish is typically served for family meals or special occasions.`,
        festiveRelevance: [
          `Often prepared for celebratory gatherings`,
          `May be featured during seasonal festivities`,
          `Represents cultural heritage through food`,
          `Brings people together around the table`
        ]
      },
      presentationGuidance: {
        platingSuggestions: [
          `Serve on warmed plates to maintain temperature`,
          `Use complementary colored dishware to enhance visual appeal`,
          `Arrange components thoughtfully for balance`,
          `Keep portions appropriate and neat`
        ],
        garnishingTips: [
          `Add fresh herbs just before serving for color and aroma`,
          `Use edible garnishes that complement the dish's flavors`,
          `Keep garnishes simple and purposeful`
        ],
        photoTips: [
          `Capture the dish in natural light for best color representation`,
          `Include some background elements that tell the story of the dish`,
          `Photograph from multiple angles to showcase textures and layers`
        ]
      }
    }]
  };
}

// Main function to fetch all recipes and save them
async function main() {
  console.log(`Fetching ${mealIds.length} recipes from TheMealDB...`);
  
  const formattedRecipes = [];
  
  for (const mealId of mealIds) {
    try {
      console.log(`Fetching meal ID: ${mealId}`);
      const mealData = await fetchRecipe(mealId);
      const formattedRecipe = formatRecipe(mealData);
      formattedRecipes.push(formattedRecipe);
      console.log(`Successfully processed: ${mealData.strMeal}`);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Create a formatted string with the recipes array
  const recipesFileContent = `import { AnalyzeImageResponse } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

// This file contains recipes fetched from TheMealDB API
// Each recipe contains complete details including matching images

export const themealdbAdditionalRecipes: AnalyzeImageResponse[] = ${JSON.stringify(formattedRecipes, null, 2)};`;
  
  // Write to the file
  fs.writeFileSync('./client/src/data/themealdbRecipes.ts', recipesFileContent);
  
  console.log(`Successfully wrote ${formattedRecipes.length} recipes to themealdbRecipes.ts`);
}

main().catch(console.error);