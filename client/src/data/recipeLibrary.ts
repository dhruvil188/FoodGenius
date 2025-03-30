import { AnalyzeImageResponse, YoutubeVideo } from "@shared/schema";

// Sample YouTube videos for recipes
const pastaYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "D_2DBLAt57c",
    title: "Pasta Carbonara | Basics with Babish",
    channelTitle: "Babish Culinary Universe",
    description: "Learn how to make authentic pasta carbonara with this simple recipe.",
    publishedAt: "2022-04-15T12:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/D_2DBLAt57c/mqdefault.jpg"
  },
  {
    videoId: "6Oy5ITdDQ3o",
    title: "How To Make Carbonara | Jamie Oliver",
    channelTitle: "Jamie Oliver",
    description: "Jamie shows you his take on a classic carbonara with a few little tips and tricks.",
    publishedAt: "2021-09-22T14:30:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/6Oy5ITdDQ3o/mqdefault.jpg"
  }
];

const pizzaYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "sv3TXMSv6Lw",
    title: "The Best Homemade Pizza You'll Ever Eat",
    channelTitle: "Joshua Weissman",
    description: "Learn how to make pizza at home better than delivery.",
    publishedAt: "2020-04-24T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/sv3TXMSv6Lw/mqdefault.jpg"
  },
  {
    videoId: "5mIbyLKPZ8M",
    title: "The Pizza Show: Naples, The Birthplace of Pizza",
    channelTitle: "MUNCHIES",
    description: "Explore the origins of pizza in Naples, Italy.",
    publishedAt: "2016-09-28T15:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/5mIbyLKPZ8M/mqdefault.jpg"
  }
];

const curryYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "pCBcIN0YEhw",
    title: "Butter Chicken Recipe | Chicken Makhani | Murgh Makhani",
    channelTitle: "Get Curried",
    description: "Learn how to make the creamiest butter chicken at home.",
    publishedAt: "2021-03-12T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/pCBcIN0YEhw/mqdefault.jpg"
  },
  {
    videoId: "h_qsg8Gof4Q",
    title: "Indian Curry | Basics with Babish",
    channelTitle: "Babish Culinary Universe",
    description: "Learn the fundamentals of making a delicious Indian curry.",
    publishedAt: "2020-09-07T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/h_qsg8Gof4Q/mqdefault.jpg"
  }
];

/**
 * Library of pre-populated recipes that don't require Gemini API calls
 * This can be expanded in the future with more recipes
 */
export const recipeLibrary: AnalyzeImageResponse[] = [
  {
    foodName: "Pasta Carbonara",
    description: "A rich and creamy Italian pasta dish that originated in Rome, traditionally made with eggs, hard cheese, cured pork, and black pepper. This iconic dish gained popularity after World War II and is now considered one of Italy's most treasured culinary classics.",
    tags: ["Italian", "Pasta", "Creamy", "Quick", "Dinner"],
    youtubeVideos: pastaYoutubeVideos,
    recipes: [
      {
        title: "Authentic Roman Pasta alla Carbonara",
        description: "The quintessential Roman pasta dish featuring a silky, creamy sauce made from raw eggs that cook gently from the heat of freshly boiled pasta. This authentic version uses traditional guanciale (cured pork jowl) and a combination of Pecorino Romano and Parmigiano Reggiano cheeses.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        servingSize: "1.5 cups cooked",
        difficulty: "Intermediate",
        tags: ["Italian", "Traditional", "Egg-based"],
        ingredients: [
          "400g (14oz) spaghetti",
          "150g (5oz) guanciale or pancetta, diced",
          "3 large eggs",
          "1 large egg yolk",
          "75g (2.5oz) Pecorino Romano cheese, grated",
          "50g (1.75oz) Parmigiano Reggiano, grated",
          "Freshly ground black pepper, to taste",
          "Salt, for pasta water"
        ],
        instructions: [
          "Bring a large pot of generously salted water to a boil for the pasta.",
          "While waiting for the water to boil, whisk together the eggs, egg yolk, and grated cheeses in a medium bowl. Season with plenty of black pepper. Set aside.",
          "In a large skillet, cook the diced pancetta over medium heat until crispy and the fat has rendered, about 5-7 minutes.",
          "Cook the pasta in the boiling water according to package instructions until al dente (typically 8-10 minutes).",
          "Just before draining, reserve about 1 cup of the starchy pasta water.",
          "Drain the pasta and immediately add it to the skillet with the pancetta and rendered fat. Toss to coat the pasta.",
          "Allow the pasta to cool slightly for 1-2 minutes (so the eggs don't scramble).",
          "With the pan off the heat, quickly pour in the egg and cheese mixture, tossing constantly to create a creamy sauce.",
          "Add a splash of the reserved pasta water as needed to loosen the sauce and make it creamy.",
          "Serve immediately, topped with extra grated cheese and freshly ground black pepper."
        ],
        chefTips: [
          "The key to silky carbonara is working quickly off the heat - too hot and the eggs scramble, too cool and they won't form a sauce",
          "Use room temperature eggs to prevent them from cooling the pasta too quickly",
          "Authentic carbonara never contains cream - the creaminess comes from properly emulsified eggs and cheese"
        ],
        commonMistakes: [
          "Adding eggs to pasta while still on heat, causing them to scramble instead of forming a silky sauce",
          "Not using enough black pepper - 'carbonara' refers to the black pepper resembling coal dust",
          "Adding cream, which is not traditional and changes the authentic texture"
        ],
        nutritionInfo: {
          calories: 550,
          protein: "25g",
          carbs: "65g",
          fats: "22g",
          fiber: "3g",
          sugar: "2g",
          sodium: "860mg",
          vitamins: [
            "Vitamin A: 15% DV",
            "Vitamin D: 22% DV",
            "Calcium: 35% DV"
          ],
          healthyAlternatives: [
            "Use whole wheat pasta for more fiber",
            "Substitute turkey bacon for a lighter version",
            "Use egg whites instead of whole eggs to reduce fat"
          ],
          dietaryNotes: [
            "High in protein from eggs and cheese",
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
          }
        ],
        sideDishSuggestions: [
          {
            name: "Mixed Italian Salad",
            description: "A refreshing side salad with mixed greens, cherry tomatoes, red onions, and balsamic vinaigrette",
            preparationTime: "5 minutes",
            pairingReason: "The bright acidity cuts through the richness of the carbonara"
          },
          {
            name: "Garlic Bread",
            description: "Crusty bread with garlic butter and herbs",
            preparationTime: "10 minutes",
            pairingReason: "Perfect for soaking up extra sauce"
          }
        ],
        storageInstructions: "Best enjoyed immediately. Refrigerate leftovers for up to 2 days in an airtight container.",
        reheatingMethods: "To reheat, add a splash of water and warm gently over low heat, stirring constantly.",
        beveragePairings: [
          "Pinot Grigio - light bodied white with good acidity",
          "Frascati - crisp, dry white wine from the Rome region",
          "Sparkling water with lemon"
        ]
      }
    ]
  },
  {
    foodName: "Neapolitan Pizza Margherita",
    description: "A classic Italian pizza originating from Naples, featuring a thin, chewy crust topped with San Marzano tomatoes, fresh mozzarella cheese, fresh basil, and extra-virgin olive oil. Named after Queen Margherita of Italy, this pizza represents the colors of the Italian flag: red, white, and green.",
    tags: ["Italian", "Pizza", "Vegetarian", "Baked", "Neapolitan"],
    youtubeVideos: pizzaYoutubeVideos,
    recipes: [
      {
        title: "Authentic Neapolitan Pizza Margherita",
        description: "This traditional Neapolitan pizza features a hand-stretched, thin crust with a puffy, charred edge (cornicione), topped minimally with the highest quality ingredients for a simple yet perfect flavor combination.",
        prepTime: "3 hours (including dough rising)",
        cookTime: "5-7 minutes",
        totalTime: "3.5 hours",
        servings: 4,
        servingSize: "1 10-inch pizza per serving",
        difficulty: "Intermediate",
        tags: ["Italian", "Traditional", "Wood-fired", "Vegetarian"],
        ingredients: [
          "500g (4 cups) tipo 00 flour",
          "325ml (1⅓ cups) lukewarm water",
          "10g (2 tsp) salt",
          "3g (1 tsp) active dry yeast",
          "400g (14 oz) San Marzano tomatoes, crushed by hand",
          "250g (8 oz) fresh mozzarella cheese (preferably buffalo), torn into pieces",
          "Fresh basil leaves",
          "30ml (2 tbsp) extra virgin olive oil",
          "Sea salt, to taste"
        ],
        instructions: [
          "In a large bowl, dissolve the yeast in the lukewarm water and let it sit for 5-10 minutes until foamy.",
          "Add flour and salt to the water mixture, stirring until a shaggy dough forms.",
          "Turn the dough onto a floured surface and knead for 10-15 minutes until smooth and elastic.",
          "Place the dough in a lightly oiled bowl, cover with plastic wrap, and let rise for 2 hours or until doubled in size.",
          "Divide the dough into 4 equal portions and shape each into a ball. Cover and let rest for 30 minutes.",
          "Preheat your oven to the highest temperature (ideally 500°F/260°C or higher) with a pizza stone or steel inside for at least 45 minutes.",
          "On a floured surface, gently stretch one dough ball into a 10-inch circle, leaving a slightly thicker edge.",
          "Transfer to a floured pizza peel or inverted baking sheet.",
          "Spread a thin layer of crushed tomatoes over the dough, leaving the edge bare.",
          "Distribute pieces of mozzarella evenly over the tomatoes.",
          "Slide the pizza onto the preheated stone and bake for 5-7 minutes until the crust is puffed and charred in spots.",
          "Remove from the oven, drizzle with olive oil, sprinkle with salt, and top with fresh basil leaves.",
          "Slice and serve immediately while hot and repeat with remaining dough balls."
        ],
        chefTips: [
          "The secret to great Neapolitan pizza is extremely high heat - use the highest setting on your home oven",
          "A pizza stone or steel is essential for proper crust development",
          "Don't overload with toppings - Neapolitan pizza is all about simplicity and balance",
          "Use only high-quality ingredients - the simplicity of this pizza means every component matters"
        ],
        commonMistakes: [
          "Adding too many toppings, which weighs down the delicate crust",
          "Not preheating the oven and stone long enough",
          "Overworking the dough, which makes it tough instead of tender",
          "Using pre-shredded mozzarella instead of fresh mozzarella"
        ],
        nutritionInfo: {
          calories: 380,
          protein: "14g",
          carbs: "48g",
          fats: "15g",
          fiber: "2g",
          sugar: "3g",
          sodium: "690mg",
          vitamins: [
            "Vitamin A: 10% DV",
            "Vitamin C: 15% DV",
            "Calcium: 25% DV"
          ],
          healthyAlternatives: [
            "Use whole wheat flour for part of the dough for more fiber",
            "Try low-moisture part-skim mozzarella to reduce fat content",
            "Add vegetables like spinach or mushrooms for extra nutrients"
          ],
          dietaryNotes: [
            "Vegetarian friendly",
            "Provides complex carbohydrates for energy",
            "Contains calcium from cheese for bone health"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A fiery version with chili and spicy oils",
            adjustments: [
              "Add red pepper flakes to the tomato sauce",
              "Drizzle with hot chili oil after baking",
              "Add thinly sliced fresh chili peppers before baking"
            ]
          },
          {
            type: "buttery",
            description: "A richer version with more cheese and olive oil",
            adjustments: [
              "Double the amount of mozzarella",
              "Add 2 tablespoons of butter to the crust edge before baking",
              "Finish with a generous drizzle of high-quality olive oil"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Arugula Salad with Lemon Dressing",
            description: "Peppery arugula tossed with lemon juice, olive oil, shaved Parmesan, and black pepper",
            preparationTime: "5 minutes",
            pairingReason: "The bright, peppery flavors cut through the richness of the pizza"
          },
          {
            name: "Marinated Olives",
            description: "Mixed olives marinated in herbs, garlic, and olive oil",
            preparationTime: "10 minutes (plus marinating time)",
            pairingReason: "A traditional Italian antipasto that complements the pizza flavors"
          }
        ],
        storageInstructions: "Pizza is best eaten immediately. If needed, store in an airtight container in the refrigerator for up to 2 days.",
        reheatingMethods: "Reheat on a preheated pizza stone or in a skillet over medium heat until warm and crispy. Avoid the microwave which will make the crust soggy.",
        beveragePairings: [
          "Chianti Classico - traditional Italian red wine",
          "Peroni - Italian lager beer",
          "San Pellegrino - sparkling mineral water with lemon"
        ]
      }
    ]
  },
  {
    foodName: "Butter Chicken (Murgh Makhani)",
    description: "A popular North Indian dish consisting of chicken marinated in yogurt and spices, then cooked in a rich, creamy tomato-based sauce. Developed in Delhi in the 1950s, this dish is known for its velvety texture and complex flavor profile that balances tangy tomatoes with rich cream and butter.",
    tags: ["Indian", "Curry", "Chicken", "Creamy", "Spicy"],
    youtubeVideos: curryYoutubeVideos,
    recipes: [
      {
        title: "Classic Delhi-Style Butter Chicken",
        description: "This authentic version of butter chicken features tender chicken pieces in a luscious, aromatic tomato and butter sauce. The chicken is first marinated in yogurt and spices, then tandoor-grilled (or oven-baked) before being folded into the silky sauce.",
        prepTime: "30 minutes (plus 4 hours marinating)",
        cookTime: "45 minutes",
        totalTime: "5 hours 15 minutes",
        servings: 6,
        servingSize: "1.5 cups with sauce",
        difficulty: "Intermediate",
        tags: ["Indian", "North Indian", "Curry", "Gluten-free"],
        ingredients: [
          "800g (1.75 lbs) boneless, skinless chicken thighs, cut into 2-inch pieces",
          "For the marinade:",
          "1 cup plain yogurt",
          "2 tablespoons lemon juice",
          "2 teaspoons turmeric powder",
          "2 tablespoons garam masala",
          "2 tablespoons cumin powder",
          "2 tablespoons Kashmiri red chili powder (or paprika for less heat)",
          "4 cloves garlic, minced",
          "2-inch piece ginger, grated",
          "For the sauce:",
          "4 tablespoons butter, divided",
          "2 tablespoons vegetable oil",
          "1 large onion, finely chopped",
          "4 cloves garlic, minced",
          "1-inch piece ginger, grated",
          "2 green chilies, slit (optional)",
          "2 teaspoons garam masala",
          "1 teaspoon cumin powder",
          "800g (28 oz) canned tomatoes, pureed",
          "1 tablespoon tomato paste",
          "1 cup heavy cream",
          "2 tablespoons dried fenugreek leaves (kasuri methi)",
          "2 tablespoons honey or sugar",
          "Salt to taste",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "In a large bowl, combine all the marinade ingredients. Add the chicken pieces and mix well to coat. Cover and refrigerate for at least 4 hours, preferably overnight.",
          "Preheat the oven to 450°F (230°C). Line a baking sheet with foil and arrange the marinated chicken pieces on it. Bake for 15 minutes until slightly charred on the edges.",
          "Meanwhile, prepare the sauce. Heat 2 tablespoons of butter and oil in a large, heavy-bottomed pot over medium heat.",
          "Add the chopped onions and sauté until translucent, about 5 minutes.",
          "Add the minced garlic, grated ginger, and green chilies (if using). Cook for another 2 minutes until fragrant.",
          "Add the garam masala and cumin powder. Cook for 30 seconds to release the aromas.",
          "Pour in the pureed tomatoes and tomato paste. Bring to a simmer and cook for 15 minutes until the sauce thickens and the oil begins to separate at the edges.",
          "Transfer the sauce to a blender and puree until smooth. Return to the pot.",
          "Add the baked chicken pieces to the sauce and simmer for 10 minutes.",
          "Stir in the heavy cream, remaining 2 tablespoons of butter, dried fenugreek leaves, and honey. Simmer for another 5-10 minutes until the sauce reaches your desired consistency.",
          "Taste and adjust the seasoning with salt as needed.",
          "Garnish with fresh cilantro and serve hot with naan bread or rice."
        ],
        chefTips: [
          "For authentic flavor, use Kashmiri chili powder which provides color without excessive heat",
          "The longer you marinate the chicken, the more tender and flavorful it will be",
          "Don't skip the fenugreek leaves (kasuri methi) - they provide a distinctive flavor that's essential to authentic butter chicken",
          "For a smoother sauce, strain it after blending to remove any remaining solids"
        ],
        commonMistakes: [
          "Skipping the marination step, which is crucial for flavor development",
          "Using breast meat instead of thighs, which can become dry",
          "Rushing the cooking of the sauce - it needs time to develop depth of flavor",
          "Adding too much cream too early, which can cause the sauce to split"
        ],
        nutritionInfo: {
          calories: 520,
          protein: "35g",
          carbs: "12g",
          fats: "38g",
          fiber: "2g",
          sugar: "8g",
          sodium: "680mg",
          vitamins: [
            "Vitamin A: 35% DV",
            "Vitamin C: 15% DV",
            "Calcium: 10% DV",
            "Iron: 20% DV"
          ],
          healthyAlternatives: [
            "Use boneless skinless chicken breast instead of thighs to reduce fat",
            "Substitute half-and-half or coconut milk for the heavy cream",
            "Use Greek yogurt instead of cream for a tangier, lighter sauce"
          ],
          dietaryNotes: [
            "High in protein from chicken",
            "Contains anti-inflammatory compounds from turmeric and ginger",
            "Naturally gluten-free (ensure all spice blends are certified GF if needed)"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A fiery version for those who love heat",
            adjustments: [
              "Double the amount of chili powder in the marinade",
              "Add 2-3 finely chopped green chilies to the sauce",
              "Include 1 teaspoon of red chili flakes when simmering the sauce"
            ]
          },
          {
            type: "buttery",
            description: "An extra rich and indulgent version",
            adjustments: [
              "Use 6 tablespoons of butter instead of 4",
              "Add 1/4 cup more heavy cream",
              "Finish with a swirl of melted ghee before serving"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Garlic Naan",
            description: "Soft, buttery Indian flatbread with garlic and herbs",
            preparationTime: "20 minutes (plus rising time)",
            pairingReason: "Perfect for scooping up the rich sauce"
          },
          {
            name: "Jeera Rice",
            description: "Basmati rice flavored with cumin seeds and cooked to fluffy perfection",
            preparationTime: "25 minutes",
            pairingReason: "The simplicity of the rice balances the rich, complex curry"
          },
          {
            name: "Cucumber Raita",
            description: "Cooling yogurt dip with cucumber, mint, and cumin",
            preparationTime: "10 minutes",
            pairingReason: "Provides a refreshing contrast to the rich, spicy curry"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 3 days. The flavor often improves with time as the spices meld.",
        reheatingMethods: "Reheat gently on the stovetop over medium-low heat, stirring occasionally and adding a splash of water or cream if needed to restore the consistency.",
        beveragePairings: [
          "Kingfisher Beer - classic Indian lager",
          "Riesling - off-dry white wine that balances the spices",
          "Mango Lassi - traditional yogurt drink that cools the palate"
        ]
      }
    ]
  }
];