import { AnalyzeImageResponse } from "@shared/schema";
import {
  mexicanYoutubeVideos,
  japaneseYoutubeVideos,
  frenchYoutubeVideos,
  chineseYoutubeVideos,
  thaiYoutubeVideos,
  mediterraneanYoutubeVideos,
  koreanYoutubeVideos,
  brazilianYoutubeVideos,
  middleEasternYoutubeVideos,
  genericYoutubeVideos
} from "./recipeLibrary";
import { theMealDBRecipes } from "./additionalRecipes";

/**
 * Expanded library of pre-populated recipes from diverse cuisines around the world
 * These recipes don't require Gemini API calls and provide a rich browsing experience
 */
export const expandedRecipes: AnalyzeImageResponse[] = [
  ...theMealDBRecipes,
  {
    foodName: "Guacamole",
    description: "A traditional Mexican avocado-based dip dating back to the Aztecs in the 14th century. This vibrant green, creamy dip combines ripe avocados with lime, cilantro, onions, and chili peppers for a perfect balance of flavors that has become popular worldwide.",
    tags: ["Mexican", "Appetizer", "Dip", "Vegetarian", "Raw"],
    youtubeVideos: mexicanYoutubeVideos,
    recipes: [
      {
        title: "Authentic Mexican Guacamole",
        description: "This traditional Mexican guacamole features perfectly ripe avocados with just the right amount of lime, cilantro, onion, and chili for an authentic taste that's both creamy and chunky. The key is using fresh ingredients and balancing the flavors carefully.",
        prepTime: "15 minutes",
        cookTime: "0 minutes",
        totalTime: "15 minutes",
        servings: 4,
        servingSize: "1/2 cup",
        difficulty: "Easy",
        tags: ["Mexican", "Traditional", "Vegan", "Gluten-free"],
        ingredients: [
          "3 ripe Hass avocados",
          "1 small white onion, finely diced (about 1/4 cup)",
          "1-2 serrano or jalapeño peppers, seeds removed and finely diced",
          "2 tablespoons fresh cilantro, chopped",
          "1 lime, juiced",
          "1/2 teaspoon sea salt, or to taste",
          "1 small tomato, seeded and diced (optional)",
          "1 clove garlic, minced (optional)"
        ],
        instructions: [
          "Cut the avocados in half and remove the pits.",
          "Scoop the avocado flesh into a bowl.",
          "Add the lime juice and salt. Mash with a fork until you reach your desired consistency (some prefer chunky, others smooth).",
          "Fold in the diced onion, peppers, and cilantro.",
          "If using, gently fold in the diced tomato and garlic.",
          "Taste and adjust seasoning as needed, adding more lime juice or salt if desired.",
          "Serve immediately or cover with plastic wrap pressed directly on the surface of the guacamole to prevent browning, and refrigerate for up to 2 hours."
        ],
        chefTips: [
          "The pit trick (leaving an avocado pit in the guacamole) does not actually prevent browning - proper sealing does",
          "For the freshest flavor, make guacamole just before serving",
          "To test avocado ripeness, gently press near the stem end - it should yield slightly but not feel mushy",
          "If your avocados are underripe, place them in a paper bag with a banana or apple to speed ripening"
        ],
        commonMistakes: [
          "Using underripe or overripe avocados - they should be just soft enough to yield to gentle pressure",
          "Overmixing, which creates a mushy texture instead of a slightly chunky one",
          "Adding too many ingredients - authentic guacamole is simple and focused on the avocado flavor",
          "Not enough lime juice, which helps prevent browning and adds essential acidity"
        ],
        nutritionInfo: {
          calories: 170,
          protein: "2g",
          carbs: "10g",
          fats: "15g",
          fiber: "7g",
          sugar: "1g",
          sodium: "150mg",
          vitamins: [
            "Vitamin C: 15% DV",
            "Vitamin K: 18% DV",
            "Folate: 20% DV"
          ],
          healthyAlternatives: [
            "Use less oil-rich avocados for a lower-fat version",
            "Add diced cucumber for extra freshness and fewer calories",
            "Use low-sodium salt to reduce sodium content"
          ],
          dietaryNotes: [
            "Excellent source of healthy monounsaturated fats",
            "Contains antioxidants that may help reduce inflammation",
            "Naturally vegan and gluten-free"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A fiery version with extra peppers and spices",
            adjustments: [
              "Double the amount of chili peppers and leave some seeds in",
              "Add 1/4 teaspoon cayenne pepper",
              "Mix in 1 tablespoon of chopped pickled jalapeños"
            ]
          },
          {
            type: "creamy",
            description: "A smoother, richer variation with added creaminess",
            adjustments: [
              "Blend half the avocados completely smooth before mixing with the chunky half",
              "Add 2 tablespoons of Mexican crema or sour cream",
              "Mix in 1/4 cup of queso fresco or mild feta cheese"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Homemade Tortilla Chips",
            description: "Crispy corn tortilla wedges, fried or baked and sprinkled with salt",
            preparationTime: "15 minutes",
            pairingReason: "The classic vehicle for enjoying guacamole, with a satisfying crunch"
          },
          {
            name: "Fresh Vegetable Crudités",
            description: "Assorted fresh vegetables like bell peppers, cucumbers, and jicama sticks",
            preparationTime: "10 minutes",
            pairingReason: "A lighter, lower-carb option for enjoying guacamole"
          }
        ],
        storageInstructions: "Store in an airtight container with plastic wrap pressed directly onto the surface of the guacamole to prevent browning. Best consumed within 24 hours.",
        reheatingMethods: "Guacamole is served cold and does not require reheating.",
        beveragePairings: [
          "Margarita - the classic lime and tequila cocktail complements the flavors perfectly",
          "Mexican beer with lime - like Corona or Modelo Especial",
          "Agua fresca - particularly cucumber or watermelon varieties"
        ]
      }
    ]
  },
  {
    foodName: "Sushi",
    description: "A traditional Japanese dish featuring vinegared rice combined with various ingredients such as seafood, vegetables, and sometimes tropical fruits. With origins dating back to the 8th century as a preservation method, modern sushi has evolved into an art form celebrated for its precise preparation, beautiful presentation, and clean flavors.",
    tags: ["Japanese", "Seafood", "Rice", "Fresh", "Healthy"],
    youtubeVideos: japaneseYoutubeVideos,
    recipes: [
      {
        title: "Homemade California Roll",
        description: "A perfect introduction to sushi-making at home, this inside-out roll features crab (or imitation crab), avocado, and cucumber wrapped in sushi rice and toasted nori, then coated with toasted sesame seeds. It's a beginner-friendly recipe that doesn't require raw fish.",
        prepTime: "30 minutes",
        cookTime: "20 minutes (for rice)",
        totalTime: "1 hour",
        servings: 4,
        servingSize: "8 pieces (2 rolls)",
        difficulty: "Intermediate",
        tags: ["Japanese", "Fusion", "Seafood", "No raw fish"],
        ingredients: [
          "2 cups Japanese short-grain sushi rice",
          "2 cups water",
          "1/4 cup rice vinegar",
          "2 tablespoons sugar",
          "1 teaspoon salt",
          "4 sheets nori (seaweed)",
          "1 cucumber, seeded and cut into thin strips",
          "2 ripe avocados, sliced",
          "8 oz crab meat or imitation crab sticks",
          "2 tablespoons toasted sesame seeds",
          "Wasabi paste (optional)",
          "Pickled ginger (optional)",
          "Soy sauce for serving"
        ],
        instructions: [
          "Rinse the rice in a strainer until the water runs clear. Drain well.",
          "Combine the rice and water in a medium saucepan. Bring to a boil, then reduce heat to low, cover, and simmer for 20 minutes, or until the water is absorbed.",
          "While the rice cooks, mix the rice vinegar, sugar, and salt in a small bowl until dissolved. This is your sushi vinegar.",
          "Transfer the cooked rice to a large wooden or glass bowl. Do not use metal as it can react with the vinegar.",
          "Sprinkle the sushi vinegar over the rice and mix gently with a cutting motion, being careful not to crush the grains. Fan the rice while mixing to help it cool quickly.",
          "Once the rice has cooled to room temperature, it's ready to use.",
          "Place a bamboo sushi mat on a work surface and cover it with plastic wrap.",
          "Place a sheet of nori on the mat, shiny side down.",
          "With wet hands (to prevent sticking), take a handful of rice and spread it evenly over the nori, leaving about a 1/2-inch border at the top edge.",
          "Sprinkle sesame seeds over the rice, then flip the nori and rice so the rice side is down on the mat.",
          "Along the center of the nori, arrange strips of cucumber, avocado, and crab meat in a line.",
          "Using the bamboo mat as a guide, roll the nori and rice over the fillings, applying gentle pressure to make a compact roll.",
          "Continue rolling until you reach the end of the nori. Wet the bare edge with a little water to seal.",
          "Use the bamboo mat to shape the roll into a nice cylinder.",
          "With a sharp, wet knife, slice the roll into 8 even pieces.",
          "Serve with soy sauce, wasabi, and pickled ginger if desired."
        ],
        chefTips: [
          "Keep a small bowl of water mixed with a splash of rice vinegar nearby to wet your hands - this prevents the rice from sticking to them",
          "For clean cuts, wipe the knife blade with a damp cloth between each slice",
          "Use plastic wrap over the bamboo mat to prevent rice from sticking to it",
          "Let the rice cool to room temperature, not cold, before making sushi - cold rice will be too firm to work with properly"
        ],
        commonMistakes: [
          "Using long-grain rice instead of short-grain sushi rice - it won't have the right stickiness",
          "Not rinsing the rice thoroughly, which prevents it from cooking properly",
          "Compressing the rice too much when spreading it, which makes it dense and gummy",
          "Overfilling the rolls, which makes them difficult to close and cut neatly"
        ],
        nutritionInfo: {
          calories: 310,
          protein: "9g",
          carbs: "48g",
          fats: "10g",
          fiber: "3g",
          sugar: "5g",
          sodium: "450mg",
          vitamins: [
            "Vitamin A: 10% DV",
            "Vitamin C: 8% DV",
            "Calcium: 4% DV",
            "Iron: 6% DV"
          ],
          healthyAlternatives: [
            "Use brown sushi rice for more fiber and nutrients",
            "Replace imitation crab with real crab meat for higher protein and fewer additives",
            "Use cauliflower rice instead of sushi rice for a low-carb version"
          ],
          dietaryNotes: [
            "Good source of complex carbohydrates from rice",
            "Contains healthy fats from avocado",
            "Can be high in sodium from soy sauce - look for low-sodium options"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A version with a spicy kick",
            adjustments: [
              "Mix the crab meat with 1-2 tablespoons of spicy mayo (Japanese mayo mixed with sriracha)",
              "Add thin slices of jalapeño to the filling",
              "Mix a little wasabi into the soy sauce for dipping"
            ]
          },
          {
            type: "vegetarian",
            description: "A plant-based version with no seafood",
            adjustments: [
              "Replace crab with sautéed shiitake mushrooms or baked tofu strips",
              "Add shredded carrots for color and texture",
              "Include thinly sliced bell peppers for extra crunch"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Miso Soup",
            description: "Traditional Japanese soup with tofu, seaweed, and green onions",
            preparationTime: "10 minutes",
            pairingReason: "Provides a warm, savory complement to the cool, fresh sushi"
          },
          {
            name: "Japanese Cucumber Salad (Sunomono)",
            description: "Thinly sliced cucumbers in a rice vinegar dressing",
            preparationTime: "15 minutes",
            pairingReason: "The tangy, refreshing flavor cleanses the palate between bites of sushi"
          }
        ],
        storageInstructions: "Sushi is best eaten fresh. If necessary, wrap tightly in plastic wrap and refrigerate for up to 24 hours.",
        reheatingMethods: "Sushi should not be reheated. Consume cold from the refrigerator if stored.",
        beveragePairings: [
          "Green tea - traditional Japanese pairing that cleanses the palate",
          "Sake (especially junmai or ginjo varieties) - traditional rice wine that complements the flavors of sushi",
          "Dry white wine such as Sauvignon Blanc or Pinot Grigio"
        ]
      }
    ]
  },
  {
    foodName: "Chinese Fried Rice",
    description: "A staple in Chinese cuisine, fried rice transforms leftover rice into a flavorful dish by stir-frying it with eggs, vegetables, and often meat or seafood. Dating back over 1,500 years to the Sui Dynasty, this adaptable dish varies by region but is universally beloved for its simplicity, versatility, and ability to utilize leftover ingredients.",
    tags: ["Chinese", "Rice", "Quick", "Stir-Fry", "Versatile"],
    youtubeVideos: chineseYoutubeVideos,
    recipes: [
      {
        title: "Classic Chinese Fried Rice",
        description: "This authentic Chinese fried rice features fluffy grains of rice, seasoned with soy sauce and stir-fried with eggs, vegetables, and your choice of protein. The key to perfect fried rice is using day-old rice and cooking in a very hot wok to achieve the signature 'wok hei' or breath of the wok.",
        prepTime: "15 minutes",
        cookTime: "10 minutes",
        totalTime: "25 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Chinese", "Stir-fry", "Quick dinner"],
        ingredients: [
          "4 cups cooked long-grain rice, preferably day-old and chilled",
          "3 tablespoons vegetable oil or peanut oil, divided",
          "2 eggs, lightly beaten",
          "1 small onion, diced",
          "2 cloves garlic, minced",
          "1 cup frozen peas and carrots, thawed",
          "2 green onions, thinly sliced",
          "2-3 tablespoons soy sauce, or to taste",
          "1 tablespoon oyster sauce (optional)",
          "1 teaspoon toasted sesame oil",
          "1/4 teaspoon white pepper",
          "Optional protein: 1 cup diced cooked chicken, shrimp, or char siu pork"
        ],
        instructions: [
          "If using refrigerated cooked rice, break up any clumps with your fingers so the grains are separated.",
          "Heat 1 tablespoon of oil in a wok or large skillet over high heat until shimmering.",
          "Add the beaten eggs and cook without stirring for 10 seconds, then gently scramble until just set but still moist. Remove to a plate.",
          "Add the remaining 2 tablespoons of oil to the wok and heat until nearly smoking.",
          "Add the diced onion and stir-fry for about 1 minute until translucent.",
          "Add the garlic and stir-fry for 30 seconds until fragrant.",
          "If using any raw protein, add it now and stir-fry until cooked through.",
          "Add the peas and carrots and stir-fry for 1 minute.",
          "Add the rice to the wok, breaking up any clumps. Stir-fry for 2-3 minutes, tossing frequently to heat through and coat with oil.",
          "If using cooked protein, add it now and stir to combine.",
          "Add the soy sauce, oyster sauce (if using), and white pepper. Toss to combine and cook for 1-2 minutes.",
          "Return the scrambled eggs to the wok and add most of the green onions (reserve some for garnish). Stir to combine.",
          "Drizzle with sesame oil, give it a final stir, and remove from heat.",
          "Garnish with the remaining green onions and serve immediately."
        ],
        chefTips: [
          "The key to great fried rice is using day-old rice that's been refrigerated - fresh rice has too much moisture and will become mushy",
          "Have all ingredients prepped and ready before you start cooking - stir-frying happens quickly",
          "Use a wok if possible, or a large cast-iron skillet - you need high heat and a large cooking surface",
          "Don't overdo the soy sauce - it should enhance, not dominate, and can make the rice too wet"
        ],
        commonMistakes: [
          "Using freshly cooked rice, which will produce sticky, mushy fried rice",
          "Cooking over too low heat, which steams rather than fries the rice",
          "Overcrowding the wok, which drops the temperature and causes steaming",
          "Using too many wet ingredients, which can make the rice soggy"
        ],
        nutritionInfo: {
          calories: 380,
          protein: "9g",
          carbs: "53g",
          fats: "14g",
          fiber: "3g",
          sugar: "3g",
          sodium: "620mg",
          vitamins: [
            "Vitamin A: 40% DV",
            "Vitamin C: 10% DV",
            "Iron: 8% DV"
          ],
          healthyAlternatives: [
            "Use brown rice instead of white for more fiber and nutrients",
            "Add more vegetables like bell peppers, broccoli, or spinach",
            "Reduce oil to 2 tablespoons total for a lower-fat version"
          ],
          dietaryNotes: [
            "Can be made gluten-free by using tamari instead of soy sauce",
            "Vegetarian version can be made by omitting the meat and using vegetable oyster sauce",
            "For vegan version, omit eggs and use plant-based protein"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A hot and spicy version with added heat",
            adjustments: [
              "Add 1-2 teaspoons of chili oil or chili paste",
              "Include 1 thinly sliced fresh chili pepper with the vegetables",
              "Use Sichuan peppercorns for a numbing heat (toast and grind 1/2 teaspoon)"
            ]
          },
          {
            type: "tropical",
            description: "A sweet-savory version with tropical flavors",
            adjustments: [
              "Add 1/2 cup diced pineapple",
              "Use 1 tablespoon of fish sauce instead of oyster sauce",
              "Include 1/4 cup chopped cashews for crunch"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Chinese Hot and Sour Soup",
            description: "A tangy, spicy soup with mushrooms, tofu, and bamboo shoots",
            preparationTime: "20 minutes",
            pairingReason: "The soup's tangy flavor provides a nice contrast to the savory fried rice"
          },
          {
            name: "Steamed Chinese Broccoli with Garlic Sauce",
            description: "Tender Chinese broccoli (gai lan) with a simple garlic sauce",
            preparationTime: "15 minutes",
            pairingReason: "Adds a fresh vegetable component to balance the meal"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 3 days.",
        reheatingMethods: "Reheat in a skillet over medium heat with a splash of water to restore moisture, or microwave covered with a damp paper towel.",
        beveragePairings: [
          "Chinese jasmine tea - traditional pairing that cleanses the palate",
          "Tsingtao beer - light lager that complements the savory flavors",
          "Gewürztraminer - aromatic white wine that pairs well with Asian spices"
        ]
      }
    ]
  },
  {
    foodName: "Pad Thai",
    description: "Thailand's most famous noodle dish, featuring stir-fried rice noodles with a perfect balance of sweet, sour, and savory flavors. Created in the 1930s as part of Thailand's national identity campaign, this iconic street food combines Chinese cooking techniques with distinctly Thai ingredients like tamarind, fish sauce, and palm sugar.",
    tags: ["Thai", "Noodles", "Stir-Fry", "Street Food", "Savory-Sweet"],
    youtubeVideos: thaiYoutubeVideos,
    recipes: [
      {
        title: "Authentic Bangkok-Style Pad Thai",
        description: "This classic Thai street food features chewy rice noodles stir-fried in a tangy-sweet sauce with shrimp, tofu, eggs, bean sprouts, and crushed peanuts. The hallmark of great Pad Thai is its perfect balance of flavors: sour from tamarind, sweet from palm sugar, savory from fish sauce, and umami from dried shrimp.",
        prepTime: "30 minutes",
        cookTime: "15 minutes",
        totalTime: "45 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Intermediate",
        tags: ["Thai", "Street food", "Stir-fried", "Gluten-free option"],
        ingredients: [
          "8 oz (225g) dried rice noodles (banh pho), medium width",
          "For the sauce:",
          "3 tablespoons tamarind paste",
          "3 tablespoons palm sugar or brown sugar",
          "2 tablespoons fish sauce",
          "1 tablespoon lime juice",
          "1/2 teaspoon Thai chili powder (to taste)",
          "For the stir-fry:",
          "3 tablespoons vegetable oil",
          "8 oz (225g) firm tofu, cut into small cubes",
          "8 oz (225g) shrimp, peeled and deveined",
          "2 shallots, thinly sliced",
          "3 cloves garlic, minced",
          "2 eggs, lightly beaten",
          "2 cups bean sprouts, divided",
          "1/4 cup preserved radish (optional)",
          "3 green onions, cut into 2-inch pieces",
          "1/3 cup roasted peanuts, roughly chopped",
          "For serving:",
          "Lime wedges",
          "Extra bean sprouts",
          "Fresh cilantro leaves",
          "Extra roasted peanuts",
          "Thai chili flakes"
        ],
        instructions: [
          "Soak the rice noodles in room temperature water for 30 minutes until they are pliable but still firm. Drain well.",
          "While the noodles soak, prepare the sauce by combining tamarind paste, palm sugar, fish sauce, lime juice, and chili powder in a small bowl. Stir until the sugar dissolves. Taste and adjust flavors if needed.",
          "Heat 1 tablespoon of oil in a wok or large skillet over high heat. Add the tofu cubes and fry until golden brown on all sides, about 3-4 minutes. Remove and set aside.",
          "Add another tablespoon of oil to the wok. Add the shrimp and cook until they just turn pink, about 1-2 minutes. Remove and set aside with the tofu.",
          "Add the remaining oil to the wok. Add the shallots and garlic, and stir-fry for 30 seconds until fragrant.",
          "Push the garlic and shallots to one side of the wok, then pour in the beaten eggs. Let them set slightly, then scramble them gently.",
          "Add the drained rice noodles to the wok and pour the prepared sauce over them. Toss everything together and stir-fry for 2-3 minutes until the noodles start to soften and absorb the sauce.",
          "If the noodles seem too dry, add a splash of water. If they're too wet, continue cooking to reduce the sauce.",
          "Add the fried tofu, cooked shrimp, half of the bean sprouts, preserved radish (if using), and green onions. Toss everything together and cook for another 1-2 minutes until the noodles are just tender (but still slightly chewy).",
          "Remove from heat and stir in half of the chopped peanuts.",
          "Transfer to serving plates and garnish with the remaining bean sprouts, peanuts, cilantro leaves, and lime wedges. Serve with Thai chili flakes on the side for those who want extra heat."
        ],
        chefTips: [
          "The key to authentic pad Thai is having all ingredients prepped and ready before you start cooking - the stir-frying happens very quickly",
          "Don't oversoak the noodles - they should still be quite firm as they'll continue cooking in the wok",
          "Cook in smaller batches if your wok or pan isn't large enough - overcrowding leads to steaming rather than stir-frying",
          "Taste and adjust the sauce before adding to the noodles - it should have a balance of sweet, sour, and salty flavors"
        ],
        commonMistakes: [
          "Oversoaking the rice noodles, which makes them mushy in the final dish",
          "Using too low heat, which prevents the characteristic wok flavor from developing",
          "Adding too much sauce, which makes the noodles wet and soggy",
          "Skipping the tamarind paste, which is essential for authentic flavor (not substitutable with ketchup or vinegar)"
        ],
        nutritionInfo: {
          calories: 490,
          protein: "24g",
          carbs: "58g",
          fats: "19g",
          fiber: "4g",
          sugar: "12g",
          sodium: "890mg",
          vitamins: [
            "Vitamin A: 8% DV",
            "Vitamin C: 15% DV",
            "Iron: 15% DV",
            "Calcium: 12% DV"
          ],
          healthyAlternatives: [
            "Use brown rice noodles for more fiber",
            "Reduce sugar to 2 tablespoons for a less sweet version",
            "Increase vegetables by adding shredded carrots and bell peppers"
          ],
          dietaryNotes: [
            "For gluten-free version, ensure fish sauce is gluten-free",
            "Can be made vegetarian by omitting shrimp and using vegetarian fish sauce",
            "High in protein from multiple sources (shrimp, tofu, eggs, peanuts)"
          ]
        },
        variations: [
          {
            type: "spicy",
            description: "A fiery version with extra heat",
            adjustments: [
              "Double the amount of chili powder in the sauce",
              "Add 1-2 thinly sliced Thai bird's eye chilies with the garlic and shallots",
              "Include a tablespoon of Thai chili jam (nam prik pao) in the sauce"
            ]
          },
          {
            type: "chicken",
            description: "A version with chicken instead of seafood",
            adjustments: [
              "Replace shrimp with 8 oz (225g) of thinly sliced chicken breast or thigh",
              "Marinate the chicken in 1 tablespoon each of fish sauce and cornstarch for 15 minutes before cooking",
              "Cook the chicken slightly longer than you would shrimp (3-4 minutes)"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Tom Kha Soup",
            description: "Coconut soup with galangal, lemongrass, and mushrooms",
            preparationTime: "20 minutes",
            pairingReason: "The creamy coconut soup balances the tangy pad Thai"
          },
          {
            name: "Thai Green Papaya Salad (Som Tam)",
            description: "Shredded unripe papaya with lime, chilies, fish sauce, and peanuts",
            preparationTime: "15 minutes",
            pairingReason: "The fresh, crunchy salad complements the soft noodles"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 2 days. The noodles will absorb more of the sauce as they sit.",
        reheatingMethods: "Reheat in a wok or skillet over medium-high heat with a splash of water to loosen the noodles. Alternatively, microwave covered with a damp paper towel.",
        beveragePairings: [
          "Thai iced tea - the sweet creaminess balances the tangy flavors",
          "Singha or Chang beer - light Thai lagers that pair perfectly with the dish",
          "Off-dry Riesling - the slight sweetness complements the mix of flavors"
        ]
      }
    ]
  },
  {
    foodName: "Korean Bibimbap",
    description: "A colorful Korean rice bowl topped with an array of individually prepared vegetables, meat, a fried egg, and spicy gochujang sauce. Dating back to the 19th century, this 'mixed rice' dish embodies key principles of Korean cuisine: balanced nutrition, varied textures, complementary flavors, and visual appeal with its vibrant components arranged by color.",
    tags: ["Korean", "Rice Bowl", "Healthy", "Colorful", "Balanced"],
    youtubeVideos: koreanYoutubeVideos,
    recipes: [
      {
        title: "Traditional Korean Bibimbap",
        description: "This iconic Korean mixed rice bowl features a variety of colorful vegetables, seasoned meat, and a fried egg, all arranged attractively over rice and mixed with spicy gochujang sauce before eating. The beauty of bibimbap lies in its balance of flavors, textures, and nutrients, as well as its striking visual presentation.",
        prepTime: "45 minutes",
        cookTime: "30 minutes",
        totalTime: "1 hour 15 minutes",
        servings: 4,
        servingSize: "1 bowl",
        difficulty: "Intermediate",
        tags: ["Korean", "Rice bowl", "Balanced meal", "Gluten-free option"],
        ingredients: [
          "For the rice:",
          "2 cups short-grain white rice",
          "2 1/4 cups water",
          "For the beef:",
          "8 oz (225g) lean ground beef or thinly sliced beef ribeye",
          "2 tablespoons soy sauce",
          "1 tablespoon sesame oil",
          "1 tablespoon brown sugar",
          "2 cloves garlic, minced",
          "1 teaspoon grated ginger",
          "For the vegetables:",
          "1 medium zucchini, julienned",
          "1 large carrot, julienned",
          "2 cups spinach, washed",
          "1 cup bean sprouts",
          "4 oz shiitake mushrooms, sliced",
          "1 small cucumber, julienned",
          "For the sauce:",
          "4 tablespoons gochujang (Korean red pepper paste)",
          "2 tablespoons sesame oil",
          "2 tablespoons sugar",
          "1 tablespoon water",
          "2 teaspoons vinegar",
          "For serving:",
          "4 eggs",
          "4 teaspoons toasted sesame seeds",
          "4 teaspoons toasted sesame oil",
          "Sliced green onions for garnish",
          "Kimchi (optional)"
        ],
        instructions: [
          "Rinse the rice several times until the water runs clear. Cook according to package instructions or in a rice cooker. Once cooked, keep warm.",
          "Make the gochujang sauce by mixing all sauce ingredients in a small bowl until smooth. Set aside.",
          "In a bowl, combine the beef with soy sauce, sesame oil, brown sugar, garlic, and ginger. Let marinate for 15 minutes.",
          "Prepare the vegetables: Season each vegetable separately with a pinch of salt. Working with one vegetable at a time:",
          "For spinach: Blanch in boiling water for 30 seconds, drain, rinse with cold water, squeeze out excess water, and season with a little sesame oil and salt.",
          "For bean sprouts: Blanch for 1 minute, drain, rinse with cold water, and season with a little sesame oil and salt.",
          "For zucchini, carrot, and cucumber: Sauté each separately in a little vegetable oil for 1-2 minutes until just tender but still crisp. Season lightly with salt.",
          "For mushrooms: Sauté in a little oil until soft and slightly browned.",
          "Heat a skillet over medium-high heat. Cook the marinated meat until browned and cooked through, about 5-7 minutes. Set aside.",
          "In the same pan, fry the eggs sunny-side up, keeping the yolks runny.",
          "To assemble: Divide the warm rice among four bowls. Arrange the cooked meat and vegetables on top of the rice in separate sections, placing the egg in the center.",
          "Sprinkle each bowl with sesame seeds and green onions. Drizzle with a little sesame oil.",
          "Serve with the gochujang sauce on the side or directly on top. Before eating, mix everything together thoroughly.",
          "Serve with kimchi on the side if desired."
        ],
        chefTips: [
          "The key to authentic bibimbap is preparing and seasoning each component separately to maintain distinct flavors and textures",
          "Traditional bibimbap is served in a hot stone bowl (dolsot bibimbap), which creates a crispy rice crust - if you have one, heat it first then add the ingredients",
          "For efficient preparation, work with the vegetables that require the same cooking method together",
          "The egg yolk should be runny enough to mix into the rice and create a silky sauce when combined with the gochujang"
        ],
        commonMistakes: [
          "Not seasoning each vegetable component separately, which results in bland flavors",
          "Overcooking the vegetables, which should remain somewhat crisp",
          "Using cold rice, which won't properly absorb the flavors",
          "Making the gochujang sauce too spicy without balancing the sweetness"
        ],
        nutritionInfo: {
          calories: 550,
          protein: "25g",
          carbs: "65g",
          fats: "22g",
          fiber: "6g",
          sugar: "10g",
          sodium: "750mg",
          vitamins: [
            "Vitamin A: 80% DV",
            "Vitamin C: 35% DV",
            "Iron: 25% DV",
            "Calcium: 15% DV"
          ],
          healthyAlternatives: [
            "Use brown rice instead of white for more fiber and nutrients",
            "For a vegetarian version, replace beef with tofu or tempeh",
            "Reduce sugar in the gochujang sauce for a lower-carb option"
          ],
          dietaryNotes: [
            "Naturally balanced with protein, carbs, and vegetables",
            "Can be made gluten-free by using gluten-free gochujang and tamari",
            "Rich in various vitamins and minerals from the diverse vegetables"
          ]
        },
        variations: [
          {
            type: "seafood",
            description: "A version featuring seafood instead of beef",
            adjustments: [
              "Replace beef with 8 oz of shrimp or thinly sliced squid",
              "Marinate the seafood in 1 tablespoon each of soy sauce and rice wine",
              "Cook the seafood for less time (2-3 minutes) until just opaque"
            ]
          },
          {
            type: "vegetarian",
            description: "A plant-based version with no animal products",
            adjustments: [
              "Omit the meat and egg",
              "Add extra mushrooms (like king oyster or enoki) for umami flavor",
              "Include cubed firm tofu marinated in the same beef seasoning",
              "Add strips of fried tofu skin (yuba) for texture"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Kimchi",
            description: "Traditional fermented Korean cabbage",
            preparationTime: "5 minutes (if using store-bought)",
            pairingReason: "The tangy, spicy flavor complements the bibimbap"
          },
          {
            name: "Korean Seaweed Soup (Miyeok Guk)",
            description: "Light soup made with seaweed and beef or anchovy broth",
            preparationTime: "20 minutes",
            pairingReason: "Provides a warming, comforting contrast to the mixed rice bowl"
          }
        ],
        storageInstructions: "It's best to store components separately in airtight containers in the refrigerator for up to 3 days. The sauce can be stored for up to a week.",
        reheatingMethods: "Reheat rice and cooked vegetables separately in the microwave. Prepare fresh eggs when ready to serve.",
        beveragePairings: [
          "Korean soju - traditional rice liquor",
          "Cold barley tea (boricha) - non-alcoholic traditional Korean tea",
          "Light Korean lager beer such as Hite or Cass"
        ]
      }
    ]
  },
  {
    foodName: "Paella",
    description: "An iconic Spanish rice dish originating from Valencia, featuring saffron-infused rice cooked in a wide, shallow pan with a variety of ingredients such as seafood, chicken, rabbit, and vegetables. Developed in the 18th century, authentic paella is known for its distinctive socarrat (crispy bottom layer) and is traditionally cooked outdoors over an open flame for large gatherings.",
    tags: ["Spanish", "Rice", "Seafood", "One-pot", "Celebration"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Traditional Valencian Paella",
        description: "This authentic Spanish paella features saffron-infused rice cooked with a flavorful combination of chicken, rabbit, seafood, and vegetables. The dish is cooked in a wide, shallow pan that allows the rice to cook evenly and develop the prized socarrat – the caramelized, crispy layer at the bottom that's considered the hallmark of a perfect paella.",
        prepTime: "30 minutes",
        cookTime: "1 hour",
        totalTime: "1 hour 30 minutes",
        servings: 6,
        servingSize: "1.5 cups",
        difficulty: "Intermediate",
        tags: ["Spanish", "Traditional", "Rice dish", "Entertaining"],
        ingredients: [
          "3 cups Spanish bomba or calasparra rice",
          "6 cups chicken or seafood stock, warmed",
          "1 generous pinch saffron threads",
          "1/4 cup extra virgin olive oil",
          "1 lb (450g) chicken thighs, cut into pieces",
          "1/2 lb (225g) rabbit (optional, can substitute with more chicken)",
          "1 large onion, finely chopped",
          "4 cloves garlic, minced",
          "1 red bell pepper, diced",
          "1 tomato, grated or finely chopped",
          "1 teaspoon sweet paprika",
          "1/2 cup flat green beans or romano beans, cut into 2-inch pieces",
          "1/2 cup lima beans or artichoke hearts",
          "12 large shrimp, peeled and deveined with tails on",
          "12 mussels, cleaned",
          "8 oz (225g) squid, cleaned and sliced into rings",
          "1/4 cup fresh parsley, chopped",
          "3 lemons, cut into wedges",
          "Salt and freshly ground black pepper, to taste"
        ],
        instructions: [
          "In a small bowl, steep the saffron threads in 1/4 cup of the warm stock for 15 minutes.",
          "Heat the olive oil in a 15-18 inch paella pan or large, shallow skillet over medium-high heat.",
          "Season the chicken and rabbit (if using) with salt and pepper, then add to the hot oil. Cook until browned on all sides, about 5-7 minutes. Push to the edges of the pan.",
          "Add the onion to the center of the pan and cook until softened, about 3-4 minutes. Add the garlic and cook for 1 minute more until fragrant.",
          "Stir in the bell pepper and cook for another 2-3 minutes until slightly softened.",
          "Add the grated tomato and paprika. Stir to combine and cook for 2 minutes until the tomato has darkened slightly.",
          "Spread the rice evenly across the pan and stir gently to coat with the oil and vegetable mixture.",
          "Pour in the warm stock, including the saffron-infused portion, and bring to a simmer. Taste and adjust seasoning with salt and pepper.",
          "Add the green beans and lima beans. Reduce heat to maintain a gentle simmer and cook, uncovered and without stirring, for about 15 minutes.",
          "When the rice has absorbed about half the liquid, arrange the shrimp, mussels (hinge-side down), and squid on top of the rice.",
          "Continue to cook without stirring for another 10-15 minutes, until the rice is tender and the seafood is cooked through. The mussels should open (discard any that don't).",
          "If desired, increase the heat to high for the final 1-2 minutes to create the socarrat (crispy bottom layer).",
          "Remove from heat, cover with a clean kitchen towel, and let rest for 5 minutes.",
          "Garnish with chopped parsley and lemon wedges. Serve directly from the pan at the table."
        ],
        chefTips: [
          "The key to authentic paella is not stirring once the rice is cooking - this allows the socarrat to form at the bottom",
          "Use bomba or calasparra rice which can absorb a lot of liquid while maintaining its structure",
          "A proper paella pan (paellera) is wide and shallow to maximize the rice's contact with the pan, but a large skillet will work",
          "If cooking indoors, rotate the pan occasionally for even heat distribution"
        ],
        commonMistakes: [
          "Stirring the rice while it cooks, which prevents the socarrat from forming and makes the rice sticky",
          "Using the wrong type of rice - long-grain varieties won't absorb the flavors or achieve the right texture",
          "Overcrowding the pan, which causes uneven cooking",
          "Adding all seafood at the beginning, which overcooks it - always add towards the end of cooking"
        ],
        nutritionInfo: {
          calories: 550,
          protein: "32g",
          carbs: "65g",
          fats: "18g",
          fiber: "4g",
          sugar: "3g",
          sodium: "780mg",
          vitamins: [
            "Vitamin A: 15% DV",
            "Vitamin C: 40% DV",
            "Iron: 20% DV",
            "Calcium: 8% DV"
          ],
          healthyAlternatives: [
            "Use brown rice for more fiber (note that cooking time will increase)",
            "Replace some of the rice with cauliflower rice for a lower-carb option",
            "For a vegetarian version, omit the meats and seafood and use vegetable stock, adding extra vegetables like artichokes and mushrooms"
          ],
          dietaryNotes: [
            "Rich in protein from various sources",
            "Contains heart-healthy monounsaturated fats from olive oil",
            "Saffron contains compounds with antioxidant properties"
          ]
        },
        variations: [
          {
            type: "Seafood (Paella de Marisco)",
            description: "A version focusing exclusively on seafood",
            adjustments: [
              "Omit the chicken and rabbit",
              "Increase the seafood varieties to include clams, scallops, and chunks of firm white fish",
              "Use seafood stock exclusively for deeper flavor",
              "Add 1 tablespoon of minced fresh herbs like thyme and oregano"
            ]
          },
          {
            type: "Vegetarian",
            description: "A plant-based version packed with vegetables",
            adjustments: [
              "Replace all meat and seafood with vegetables like artichokes, asparagus, and mushrooms",
              "Use vegetable stock infused with extra saffron and smoked paprika for depth",
              "Add 1/2 cup cooked chickpeas for protein",
              "Finish with toasted pine nuts for added texture"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Spanish Tomato Bread (Pan con Tomate)",
            description: "Grilled bread rubbed with garlic and ripe tomato, drizzled with olive oil",
            preparationTime: "10 minutes",
            pairingReason: "A simple, traditional Spanish appetizer that complements the complex flavors of paella"
          },
          {
            name: "Mixed Green Salad with Sherry Vinaigrette",
            description: "Fresh greens with a tangy Spanish-inspired dressing",
            preparationTime: "15 minutes",
            pairingReason: "The acidic dressing cuts through the richness of the paella"
          }
        ],
        storageInstructions: "Store leftovers in an airtight container in the refrigerator for up to 2 days. Note that seafood quality will deteriorate after the first day.",
        reheatingMethods: "Gently reheat in a skillet with a splash of stock or water to restore moisture. Cover with foil and heat at 325°F (165°C) until warmed through. Microwaving is not recommended as it can make the rice mushy.",
        beveragePairings: [
          "Spanish Albariño - crisp white wine with citrus notes that complement the seafood",
          "Sangria - traditional Spanish wine punch with fresh fruit",
          "Tinto de Verano - lighter version of sangria made with red wine and lemon soda"
        ]
      }
    ]
  },
  {
    foodName: "Tiramisu",
    description: "A beloved Italian dessert consisting of layers of coffee-soaked ladyfingers and a rich, creamy mascarpone mixture, dusted with cocoa powder. Originating in the Veneto region of Italy in the 1960s, the name tiramisu translates to 'pick me up' or 'cheer me up,' referring to the energizing effects of its espresso and sugar content.",
    tags: ["Italian", "Dessert", "No-bake", "Coffee", "Creamy"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Classic Italian Tiramisu",
        description: "This authentic Italian tiramisu features delicate ladyfinger cookies soaked in espresso and liqueur, layered with a light, airy mascarpone cream, and dusted with rich cocoa powder. The magic of tiramisu lies in its contrasting textures and the perfect balance of bitter coffee, sweet cream, and boozy notes.",
        prepTime: "30 minutes",
        cookTime: "0 minutes (plus 6 hours chilling)",
        totalTime: "6 hours 30 minutes",
        servings: 8,
        servingSize: "1 slice (3x4 inches)",
        difficulty: "Intermediate",
        tags: ["Italian", "Classic dessert", "Make ahead", "Egg-based"],
        ingredients: [
          "6 large egg yolks",
          "3/4 cup granulated sugar",
          "2/3 cup whole milk",
          "1 1/4 cups heavy cream",
          "1 lb (454g) mascarpone cheese, room temperature",
          "1/2 teaspoon vanilla extract",
          "1 3/4 cups strong espresso or strong brewed coffee, room temperature",
          "1/4 cup coffee liqueur (like Kahlúa) or dark rum",
          "2 packages (7 oz each) Italian ladyfingers (Savoiardi)",
          "2 tablespoons unsweetened cocoa powder",
          "1 oz dark chocolate, finely grated (optional)",
          "Fresh berries for garnish (optional)"
        ],
        instructions: [
          "In a heatproof bowl set over a pot of simmering water (don't let the bowl touch the water), whisk the egg yolks and sugar until pale and tripled in volume, about 5 minutes.",
          "Add the milk and cook, stirring constantly, until the mixture thickens slightly and reaches 160°F (71°C) on an instant-read thermometer to ensure the eggs are safe to eat.",
          "Remove from heat and let cool to room temperature, stirring occasionally to prevent a skin from forming.",
          "In a separate bowl, whip the heavy cream until stiff peaks form. Set aside.",
          "In another large bowl, whisk the mascarpone until smooth. Gently fold in the cooled egg yolk mixture, then the whipped cream and vanilla extract, being careful not to deflate the mixture.",
          "In a shallow dish, combine the espresso and coffee liqueur.",
          "Quickly dip each ladyfinger into the coffee mixture – about 1 second per side. Don't soak them too long or they'll become soggy and fall apart.",
          "Arrange half of the soaked ladyfingers in a single layer in a 9×13-inch baking dish, breaking them to fit if necessary.",
          "Spread half of the mascarpone mixture evenly over the ladyfingers.",
          "Repeat with a second layer of soaked ladyfingers and the remaining mascarpone mixture.",
          "Cover with plastic wrap and refrigerate for at least 6 hours, preferably overnight, to allow the flavors to meld and the dessert to set.",
          "Just before serving, sift the cocoa powder over the top. If desired, sprinkle with grated chocolate and garnish with fresh berries."
        ],
        chefTips: [
          "The key to perfect tiramisu is balancing the moisture in the ladyfingers - they should be damp but not soggy",
          "Using room temperature mascarpone prevents lumps in the filling",
          "For the traditional Italian method, ensure your eggs are very fresh and from a trusted source as they won't be fully cooked",
          "For a lighter version with cooked eggs, the zabaglione method (as described in instructions) is preferred"
        ],
        commonMistakes: [
          "Soaking the ladyfingers too long, which makes them disintegrate and creates a soggy dessert",
          "Not allowing enough chilling time, which prevents the dessert from setting properly",
          "Over-folding the mascarpone mixture, which can make it lose its airy texture",
          "Using cold mascarpone straight from the refrigerator, which can cause lumps"
        ],
        nutritionInfo: {
          calories: 450,
          protein: "7g",
          carbs: "37g",
          fats: "30g",
          fiber: "0g",
          sugar: "28g",
          sodium: "80mg",
          vitamins: [
            "Vitamin A: 25% DV",
            "Calcium: 15% DV",
            "Iron: 8% DV"
          ],
          healthyAlternatives: [
            "Use Greek yogurt in place of some of the mascarpone to reduce fat",
            "Substitute decaffeinated coffee for regular coffee",
            "Use whole wheat or gluten-free ladyfingers for dietary restrictions"
          ],
          dietaryNotes: [
            "Contains alcohol, which doesn't fully cook out",
            "Not suitable for pregnant women due to raw eggs (unless fully pasteurized)",
            "Contains dairy and gluten (in traditional ladyfingers)"
          ]
        },
        variations: [
          {
            type: "Limoncello",
            description: "A bright, citrusy alternative to the coffee version",
            adjustments: [
              "Substitute limoncello liqueur for the coffee liqueur",
              "Soak ladyfingers in lemon syrup (1 cup water, 1/2 cup sugar, 1/4 cup lemon juice) instead of coffee",
              "Add 1 tablespoon lemon zest to the mascarpone mixture",
              "Garnish with candied lemon peel instead of cocoa powder"
            ]
          },
          {
            type: "Alcohol-free",
            description: "A family-friendly version without any liqueur",
            adjustments: [
              "Omit the coffee liqueur and use extra strong coffee or espresso",
              "Add 1 tablespoon vanilla extract to the coffee mixture",
              "Use alcohol-free vanilla extract in the mascarpone cream",
              "Consider adding 1 teaspoon instant espresso powder to the mascarpone for enhanced coffee flavor"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Espresso",
            description: "A shot of strong Italian coffee",
            preparationTime: "2 minutes",
            pairingReason: "The classic accompaniment that echoes the coffee notes in the dessert"
          },
          {
            name: "Fresh Berry Medley",
            description: "A simple mix of seasonal berries",
            preparationTime: "5 minutes",
            pairingReason: "The tart, fresh fruit provides a contrast to the rich, creamy dessert"
          }
        ],
        storageInstructions: "Cover tightly with plastic wrap and refrigerate for up to 3 days. The flavor often improves after 24 hours as the components meld together.",
        reheatingMethods: "Tiramisu is served chilled and should not be reheated.",
        beveragePairings: [
          "Vin Santo - traditional Italian dessert wine",
          "Amaretto liqueur - almond-flavored spirit that complements the coffee notes",
          "Cappuccino - for a double dose of coffee flavor"
        ]
      }
    ]
  }
];