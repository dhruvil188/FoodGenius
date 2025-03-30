import { AnalyzeImageResponse } from "@shared/schema";

/**
 * Provides mock data for development when the API quota is exceeded
 */
export const getMockAnalysisResponse = (): AnalyzeImageResponse => {
  return {
    foodName: "Pasta Carbonara (Spaghetti alla Carbonara)",
    description: "A rich and creamy Italian pasta dish that originated in Rome, traditionally made with eggs, hard cheese, cured pork, and black pepper. This iconic dish gained popularity after World War II and is now considered one of Italy's most treasured culinary classics, typically served as a primo piatto (first course).",
    tags: ["Italian", "Roman Cuisine", "Pasta", "Dinner", "Creamy", "Quick", "Egg-based", "Cured Pork", "Stovetop Cooking", "Savory", "Al Dente"],
    recipes: [
      {
        title: "Authentic Roman Pasta alla Carbonara",
        description: "The quintessential Roman pasta dish featuring a silky, creamy sauce made from raw eggs that cook gently from the heat of freshly boiled pasta. This authentic version uses traditional guanciale (cured pork jowl) and a combination of Pecorino Romano and Parmigiano Reggiano cheeses for the perfect balance of salty, savory flavors.",
        prepTime: "10 minutes active preparation",
        cookTime: "15 minutes of careful attention",
        totalTime: "25 minutes from start to finish",
        servings: 4,
        servingSize: "85g dry pasta per person (about 1.5 cups cooked)",
        difficulty: "Intermediate - requires quick timing and temperature control",
        tags: ["Italian", "Roman Specialty", "Egg-based", "Quick dinner", "Gluten-free adaptable", "Dinner party worthy", "No cream added"],
        chefTips: [
          "The key to silky carbonara is working quickly off the heat - too hot and the eggs scramble, too cool and they won't form a sauce",
          "Use room temperature eggs to prevent them from cooling the pasta too quickly",
          "Authentic carbonara never contains cream - the creaminess comes from properly emulsified eggs and cheese",
          "The pasta water is crucial - its starchiness helps bind the sauce, so be sure to reserve some before draining"
        ],
        commonMistakes: [
          "Adding eggs to pasta while still on heat, causing them to scramble instead of forming a silky sauce",
          "Not using enough black pepper - 'carbonara' refers to the black pepper resembling coal dust",
          "Adding cream, which is not traditional and changes the authentic texture",
          "Overcooking the pasta - it should be truly al dente as it will continue cooking slightly in the hot pan"
        ],
        storageInstructions: "Carbonara is best enjoyed immediately after preparation. If you must store leftovers, refrigerate in an airtight container for up to 2 days. The texture will change significantly upon reheating.",
        reheatingMethods: "To reheat, add a splash of water and warm gently over low heat, stirring constantly. Better yet, carbonara can be repurposed into a frittata by mixing with additional eggs and baking.",
        beveragePairings: [
          "Frascati - a crisp, dry white wine from the Rome region, traditional pairing",
          "Pinot Grigio - light bodied white with good acidity to cut through the richness",
          "Sparkling water with lemon - for a non-alcoholic option that refreshes the palate"
        ],
        ingredients: [
          "400g (14oz) spaghetti or bucatini pasta",
          "150g (5oz) pancetta or guanciale, diced",
          "3 large eggs",
          "1 large egg yolk",
          "75g (2.5oz) Pecorino Romano cheese, finely grated",
          "50g (1.75oz) Parmigiano Reggiano, finely grated",
          "2-3 cloves garlic, minced (optional)",
          "Freshly ground black pepper, to taste",
          "Salt, for pasta water",
          "Extra virgin olive oil, 1 tablespoon"
        ],
        instructions: [
          "Bring a large pot of generously salted water to a boil for the pasta.",
          "While waiting for the water to boil, whisk together the eggs, egg yolk, and grated cheeses in a medium bowl. Season with plenty of black pepper. Set aside.",
          "In a large skillet, cook the diced pancetta over medium heat until crispy and the fat has rendered, about 5-7 minutes.",
          "If using garlic, add it to the pancetta and cook for about 1 minute until fragrant. Remove the pan from heat.",
          "Cook the pasta in the boiling water according to package instructions until al dente (typically 8-10 minutes).",
          "Just before draining, reserve about 1 cup of the starchy pasta water.",
          "Drain the pasta and immediately add it to the skillet with the pancetta and rendered fat. Toss to coat the pasta.",
          "Allow the pasta to cool slightly for 1-2 minutes (so the eggs don't scramble).",
          "With the pan off the heat, quickly pour in the egg and cheese mixture, tossing constantly to create a creamy sauce.",
          "Add a splash of the reserved pasta water as needed to loosen the sauce and make it creamy.",
          "Serve immediately, topped with extra grated cheese and freshly ground black pepper."
        ],
        nutritionInfo: {
          calories: 550,
          protein: "25g (50% of daily recommended intake)",
          carbs: "65g (22% of daily recommended intake)",
          fats: "22g (34% of daily recommended intake)",
          fiber: "3g (12% of daily recommended intake)",
          sugar: "2g (2% of daily recommended intake)",
          sodium: "860mg (37% of daily recommended intake)",
          vitamins: [
            "Vitamin A: 15% DV (from eggs)",
            "Vitamin D: 22% DV (from eggs and cheese)",
            "Calcium: 35% DV (primarily from Pecorino and Parmigiano)",
            "Iron: 18% DV (from enriched pasta and eggs)",
            "B12: 40% DV (from animal products)"
          ],
          healthyAlternatives: [
            "Use whole wheat pasta for more fiber (increases fiber to 8g per serving)",
            "Substitute turkey bacon for a lighter version (reduces fat to 14g per serving)",
            "Use 2 whole eggs and 2 egg whites instead of 3 whole eggs and 1 yolk to reduce fat (saves approximately 5g of fat per serving)",
            "For gluten-free diets, use certified gluten-free pasta made from rice or corn flour (maintains similar calorie count)"
          ],
          dietaryNotes: [
            "High in protein from eggs and cheese (excellent for muscle maintenance)",
            "Contains significant amount of saturated fat from pancetta and cheese (25% of daily limit)",
            "Good source of calcium from the cheeses (supports bone health)",
            "Moderate glycemic index when made with traditional pasta (consider whole grain for lower GI)",
            "High in cholesterol (approximately 215mg per serving) primarily from egg yolks"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A zesty version with red pepper flakes and black pepper",
            adjustments: [
              "Add 1-2 teaspoons of red pepper flakes when cooking the pancetta",
              "Double the amount of black pepper",
              "Add a pinch of cayenne pepper to the egg mixture"
            ]
          },
          {
            type: "buttery",
            description: "An extra rich version with butter and cream",
            adjustments: [
              "Add 3 tablespoons of unsalted butter to the pancetta fat",
              "Mix in 1/4 cup of heavy cream to the egg mixture",
              "Use extra Parmigiano Reggiano cheese for a more buttery flavor"
            ]
          },
          {
            type: "non-spicy",
            description: "A milder version without garlic or excess pepper",
            adjustments: [
              "Omit garlic completely",
              "Use minimal black pepper",
              "Add 1/4 teaspoon of nutmeg to the egg mixture for a subtle flavor"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Insalata Mista (Mixed Italian Salad)",
            description: "A refreshing side salad with crisp mixed greens, sweet cherry tomatoes, thinly sliced red onions, and cucumber dressed with high-quality extra virgin olive oil, aged balsamic vinegar, and a pinch of flaky sea salt",
            preparationTime: "5 minutes active work",
            pairingReason: "The bright acidity and fresh crunch of this salad provides a perfect counterbalance to the rich, creamy texture of the carbonara, cleansing the palate between bites"
          },
          {
            name: "Pane all'Aglio (Italian Garlic Bread)",
            description: "Crusty ciabatta bread sliced and brushed with a compound butter made from unsalted butter, fresh garlic, Italian parsley, and a touch of Parmigiano-Reggiano, then toasted until golden brown",
            preparationTime: "10 minutes including baking time",
            pairingReason: "The aromatic garlic and herbs complement the savory flavors of the carbonara while the crusty bread provides a perfect vehicle for soaking up any extra sauce"
          },
          {
            name: "Asparagi al Forno (Roasted Asparagus with Lemon)",
            description: "Fresh asparagus spears tossed with extra virgin olive oil, lemon zest, and freshly ground black pepper, then roasted until tender-crisp and finished with freshly grated Parmigiano-Reggiano and a squeeze of lemon juice",
            preparationTime: "15 minutes including roasting time",
            pairingReason: "The slightly bitter, earthy flavor of asparagus and bright lemon notes cut through the richness of the carbonara, while the shared Parmigiano cheese creates flavor harmony between the dishes"
          }
        ]
      },
      {
        title: "Vegetarian Pasta Carbonara",
        description: "A flavorful vegetarian adaptation of the classic carbonara using mushrooms instead of pancetta.",
        prepTime: "15 minutes",
        cookTime: "20 minutes",
        totalTime: "35 minutes",
        servings: 4,
        difficulty: "Easy",
        tags: ["Vegetarian", "Italian-inspired", "Creamy"],
        ingredients: [
          "400g (14oz) spaghetti or linguine pasta",
          "250g (9oz) cremini or portobello mushrooms, sliced",
          "2 cloves garlic, minced",
          "1 small shallot, finely diced",
          "3 large eggs",
          "70g (2.5oz) Pecorino Romano or vegetarian hard cheese, grated",
          "30g (1oz) Parmigiano Reggiano or vegetarian alternative, grated",
          "2 tablespoons extra virgin olive oil",
          "1 tablespoon butter",
          "1 teaspoon smoked paprika (for a smoky flavor similar to pancetta)",
          "1/4 teaspoon nutmeg (optional)",
          "Salt and freshly ground black pepper, to taste",
          "Fresh parsley, chopped, for garnish"
        ],
        instructions: [
          "Bring a large pot of generously salted water to a boil for the pasta.",
          "In a large bowl, whisk together the eggs and grated cheeses. Season with black pepper and set aside.",
          "Heat olive oil and butter in a large skillet over medium heat.",
          "Add the shallot and cook until translucent, about 2-3 minutes.",
          "Add the mushrooms and cook until they release their moisture and begin to brown, about 5-7 minutes.",
          "Add the garlic, smoked paprika, and nutmeg (if using). Cook for another minute until fragrant.",
          "Cook the pasta according to package instructions until al dente. Reserve 1 cup of pasta water before draining.",
          "Add the hot drained pasta directly to the skillet with the mushroom mixture. Toss to combine.",
          "Remove the skillet from heat and let cool for 1-2 minutes.",
          "Quickly add the egg and cheese mixture, tossing constantly to create a creamy sauce.",
          "Add a splash of the reserved pasta water as needed to achieve a silky consistency.",
          "Taste and adjust seasonings with salt and pepper as needed.",
          "Serve immediately, garnished with chopped parsley and additional grated cheese."
        ],
        nutritionInfo: {
          calories: 480,
          protein: "20g",
          carbs: "65g",
          fats: "18g",
          fiber: "4g",
          sugar: "3g",
          healthyAlternatives: [
            "Use whole grain pasta for additional fiber",
            "Substitute some of the pasta with zucchini noodles",
            "Use low-fat cheese options to reduce calories"
          ],
          dietaryNotes: [
            "Suitable for vegetarians (ensure cheese is made with vegetarian rennet)",
            "Source of B vitamins from mushrooms",
            "Lower in saturated fat than traditional carbonara"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A fiery version with chili and extra black pepper",
            adjustments: [
              "Add 1-2 finely chopped fresh chilies or 1 teaspoon red pepper flakes",
              "Mix 1/4 teaspoon cayenne into the egg and cheese mixture",
              "Finish with chili oil instead of olive oil"
            ]
          },
          {
            type: "buttery",
            description: "An indulgent creamy variation with extra richness",
            adjustments: [
              "Add 3 tablespoons of butter instead of 1",
              "Include 2 tablespoons of heavy cream in the egg mixture",
              "Use 50% more cheese overall for extra richness",
              "Add 1/4 cup toasted pine nuts for buttery flavor and texture"
            ]
          },
          {
            type: "non-spicy",
            description: "A delicate version with subtle flavors",
            adjustments: [
              "Omit the smoked paprika and black pepper",
              "Add 1 tablespoon of lemon zest for brightness",
              "Use shiitake mushrooms for a more delicate flavor",
              "Substitute the shallot with sweet onion"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Caprese Salad",
            description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
            preparationTime: "10 minutes"
          },
          {
            name: "Sautéed Spinach with Garlic",
            description: "Fresh spinach quickly sautéed with olive oil and garlic",
            preparationTime: "5 minutes"
          },
          {
            name: "Focaccia Bread",
            description: "Italian flatbread topped with olive oil, salt and herbs",
            preparationTime: "10 minutes (if store-bought)"
          }
        ]
      },
      {
        title: "Lighter Carbonara with Turkey and Herbs",
        description: "A healthier take on carbonara using turkey bacon and incorporating fresh herbs for extra flavor.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        difficulty: "Easy",
        tags: ["Healthy option", "Lower calorie", "High protein"],
        ingredients: [
          "350g (12oz) whole grain spaghetti or linguine",
          "120g (4oz) turkey bacon, chopped",
          "2 cloves garlic, minced",
          "1 tablespoon olive oil",
          "2 whole eggs plus 2 egg whites",
          "40g (1.5oz) Parmigiano Reggiano cheese, grated",
          "40g (1.5oz) Pecorino Romano cheese, grated",
          "1/4 cup fresh parsley, chopped",
          "2 tablespoons fresh basil, chopped",
          "1 teaspoon lemon zest",
          "1/4 teaspoon red pepper flakes (optional)",
          "Salt and black pepper, to taste",
          "1/2 cup frozen peas (optional, for added nutrition)"
        ],
        instructions: [
          "Bring a large pot of salted water to a boil for the pasta.",
          "In a bowl, whisk together the eggs, egg whites, grated cheeses, lemon zest, and a generous amount of black pepper. Set aside.",
          "Heat olive oil in a large skillet over medium heat. Add the chopped turkey bacon and cook until it begins to crisp, about 5-6 minutes.",
          "Add the garlic and red pepper flakes (if using) and cook for 30 seconds until fragrant.",
          "If using peas, add them to the skillet and cook for 2-3 minutes until warmed through.",
          "Cook the pasta according to package instructions until al dente. Before draining, reserve 1 cup of the pasta water.",
          "Working quickly, add the hot drained pasta directly to the skillet with the turkey bacon mixture.",
          "Remove the skillet from heat and let cool for about 1 minute.",
          "Pour the egg and cheese mixture over the pasta, tossing constantly to create a creamy sauce without scrambling the eggs.",
          "Add a splash of the reserved pasta water as needed to create a silky consistency.",
          "Stir in the fresh herbs, saving some for garnish.",
          "Season with additional salt and pepper to taste.",
          "Serve immediately, garnished with the remaining herbs and extra grated cheese if desired."
        ],
        nutritionInfo: {
          calories: 420,
          protein: "28g",
          carbs: "55g",
          fats: "12g",
          fiber: "7g",
          sugar: "3g",
          healthyAlternatives: [
            "Use chickpea or lentil pasta for even more protein and fiber",
            "Replace half the pasta with spiralized zucchini noodles",
            "Use only egg whites for an even lower-fat version"
          ],
          dietaryNotes: [
            "Lower in calories and fat than traditional carbonara",
            "Higher in fiber due to whole grain pasta",
            "Good source of lean protein from turkey bacon and eggs"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A zippy version with extra heat",
            adjustments: [
              "Double the red pepper flakes to 1/2 teaspoon",
              "Add 1 finely diced jalapeño pepper when cooking the turkey bacon",
              "Include 1/4 teaspoon cayenne pepper in the egg mixture",
              "Finish with a drizzle of chili oil"
            ]
          },
          {
            type: "buttery",
            description: "A richer version with a buttery finish",
            adjustments: [
              "Add 2 tablespoons of unsalted butter at the end",
              "Use 1/4 cup of half-and-half in the egg mixture",
              "Include 1 tablespoon of cream cheese for added richness",
              "Use 25% more cheese overall"
            ]
          },
          {
            type: "non-spicy",
            description: "A milder version focusing on herbs",
            adjustments: [
              "Omit the red pepper flakes completely",
              "Double the amount of fresh herbs for flavor",
              "Add 1/4 teaspoon of ground white pepper instead of black pepper",
              "Include 1 tablespoon of lemon juice for brightness"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Arugula Salad with Lemon Dressing",
            description: "Peppery arugula with a light lemon and olive oil dressing",
            preparationTime: "5 minutes"
          },
          {
            name: "Roasted Cherry Tomatoes",
            description: "Sweet cherry tomatoes roasted with garlic and herbs",
            preparationTime: "15 minutes"
          },
          {
            name: "Steamed Broccoli with Lemon",
            description: "Fresh broccoli florets lightly steamed and dressed with lemon juice",
            preparationTime: "8 minutes"
          }
        ]
      }
    ]
  };
};