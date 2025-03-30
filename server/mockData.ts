import { AnalyzeImageResponse } from "@shared/schema";

/**
 * Provides mock data for development when the API quota is exceeded
 */
export const getMockAnalysisResponse = (): AnalyzeImageResponse => {
  return {
    foodName: "Pasta Carbonara",
    description: "A rich and creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    tags: ["Italian", "Pasta", "Dinner", "Creamy", "Quick"],
    recipes: [
      {
        title: "Classic Pasta Carbonara",
        description: "Traditional Roman pasta dish with a creamy egg sauce, pancetta, and Pecorino Romano cheese.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        difficulty: "Intermediate",
        tags: ["Italian", "Quick dinner", "Egg-based"],
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
          protein: "25g",
          carbs: "65g",
          fats: "22g",
          fiber: "3g",
          sugar: "2g",
          healthyAlternatives: [
            "Use whole wheat pasta for more fiber",
            "Substitute turkey bacon for a lighter version",
            "Use 2 whole eggs and 2 egg whites instead of 3 whole eggs and 1 yolk to reduce fat"
          ],
          dietaryNotes: [
            "High in protein from eggs and cheese",
            "Contains significant amount of saturated fat from pancetta and cheese",
            "Good source of calcium from the cheeses"
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
            name: "Italian Green Salad",
            description: "A simple salad with mixed greens, cherry tomatoes, and balsamic vinaigrette",
            preparationTime: "5 minutes"
          },
          {
            name: "Garlic Bread",
            description: "Crusty Italian bread with garlic butter and herbs",
            preparationTime: "10 minutes"
          },
          {
            name: "Roasted Asparagus",
            description: "Fresh asparagus roasted with olive oil, lemon, and Parmesan",
            preparationTime: "15 minutes"
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