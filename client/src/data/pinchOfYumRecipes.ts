import { AnalyzeImageResponse } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

/**
 * Recipes from Pinch of Yum website
 * These recipes provide variety to the recipe library
 */
export const pinchOfYumRecipes: AnalyzeImageResponse[] = [
  {
    foodName: "Sweet Potato Curry",
    description: "A creamy, comforting curry featuring tender sweet potatoes, hearty chickpeas, and vibrant spinach in a silky coconut milk sauce. This flavorful vegetarian dish balances warm spices with a hint of sweetness from the sweet potatoes, creating a satisfying meal that's both nutritious and easy to prepare.",
    tags: ["Vegetarian", "Indian-inspired", "Curry", "One-pot", "Healthy", "Comfort food", "Dairy-free", "Gluten-free", "Plant-based"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Coconut Sweet Potato Curry",
        description: "This nourishing sweet potato curry combines creamy coconut milk with warm spices, creating a comforting bowl that's both healthy and satisfying. With tender sweet potatoes, protein-packed chickpeas, and fresh spinach, it's a complete meal in one pot that comes together in under 30 minutes.",
        prepTime: "10 minutes",
        cookTime: "20 minutes",
        totalTime: "30 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Vegetarian", "Dairy-free", "Gluten-free", "One-pot", "Quick dinner"],
        ingredients: [
          "2 tablespoons olive oil",
          "1 onion, diced",
          "3 cloves garlic, minced",
          "1 tablespoon grated fresh ginger",
          "2 tablespoons curry powder",
          "1 teaspoon ground cumin",
          "1/4 teaspoon cayenne pepper (optional)",
          "2 medium sweet potatoes (about 1 pound), peeled and cubed",
          "1 can (15 oz) chickpeas, drained and rinsed",
          "1 can (14 oz) diced tomatoes",
          "1 can (14 oz) coconut milk (full-fat for creaminess)",
          "1 cup vegetable broth",
          "3 cups baby spinach",
          "Salt and pepper to taste",
          "Fresh cilantro for garnish",
          "Cooked rice for serving"
        ],
        instructions: [
          "Heat olive oil in a large pot over medium heat. Add onion and cook until softened, about 5 minutes.",
          "Add garlic and ginger, cooking for another minute until fragrant.",
          "Stir in curry powder, cumin, and cayenne (if using), toasting the spices for 30 seconds.",
          "Add sweet potatoes, chickpeas, diced tomatoes, coconut milk, and vegetable broth. Stir to combine.",
          "Bring to a simmer, then reduce heat to medium-low. Cover and cook for about 15-20 minutes, until sweet potatoes are tender.",
          "Stir in spinach and cook until wilted, about 2 minutes.",
          "Season with salt and pepper to taste.",
          "Serve over rice and garnish with fresh cilantro."
        ],
        chefTips: [
          "For extra flavor, toast the spices in the oil before adding the liquid ingredients",
          "Cut sweet potatoes into even-sized cubes for consistent cooking",
          "If you prefer a thicker curry, let it simmer uncovered for a few extra minutes",
          "This curry actually tastes better the next day as flavors develop, making it perfect for meal prep"
        ],
        commonMistakes: [
          "Using light coconut milk instead of full-fat - the curry won't be as creamy",
          "Overcooking the sweet potatoes until they're mushy",
          "Not allowing the spices to bloom in the oil, which can result in less developed flavor",
          "Adding the spinach too early, causing it to overcook and lose its vibrant color"
        ],
        nutritionInfo: {
          calories: 385,
          protein: "9g",
          carbs: "42g",
          fats: "22g",
          fiber: "9g",
          sugar: "8g",
          sodium: "480mg",
          vitamins: [
            "Vitamin A: 380% DV",
            "Vitamin C: 15% DV",
            "Iron: 20% DV",
            "Potassium: 15% DV"
          ],
          healthyAlternatives: [
            "Use light coconut milk to reduce calories and fat (though the curry won't be as creamy)",
            "Add more vegetables like bell peppers or cauliflower for extra nutrients",
            "Serve over cauliflower rice instead of regular rice for a lower-carb option"
          ],
          dietaryNotes: [
            "Naturally vegan and gluten-free",
            "Rich in complex carbohydrates from sweet potatoes",
            "Good source of plant-based protein from chickpeas",
            "Contains anti-inflammatory compounds from turmeric in curry powder"
          ]
        },
        variations: [
          {
            type: "protein-rich",
            description: "A heartier version with added protein",
            adjustments: [
              "Add 1 cup of red lentils with the sweet potatoes for extra protein",
              "Include 1 cup of green peas for added texture and protein",
              "Top with roasted cashews for crunch and additional protein"
            ]
          },
          {
            type: "spicy",
            description: "A fiery version for those who love heat",
            adjustments: [
              "Double the cayenne pepper",
              "Add 1-2 finely chopped Thai chili peppers",
              "Include 1 teaspoon of red pepper flakes when cooking the onions"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Garlic Naan Bread",
            description: "Soft, pillowy Indian flatbread with garlic butter",
            preparationTime: "30 minutes",
            pairingReason: "Perfect for scooping up the flavorful curry sauce"
          },
          {
            name: "Cucumber Raita",
            description: "Cool yogurt dip with cucumber, mint, and cumin",
            preparationTime: "10 minutes",
            pairingReason: "Provides a cooling contrast to the warm spices in the curry"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 4 days. The flavors will continue to develop over time.",
        reheatingMethods: "Reheat on the stovetop over medium-low heat, adding a splash of water or broth if needed to loosen the sauce. Alternatively, microwave for 2-3 minutes, stirring halfway through.",
        beveragePairings: [
          "Mango lassi - the sweet and tangy yogurt drink complements the spices",
          "Coconut water - enhances the coconut flavors in the curry",
          "Hoppy IPA beer - the bitterness balances the richness of the curry"
        ],
        equipmentNeeded: [
          {
            name: "Large pot or Dutch oven",
            purpose: "For cooking the curry"
          },
          {
            name: "Sharp knife",
            purpose: "For cutting vegetables"
          },
          {
            name: "Wooden spoon",
            purpose: "For stirring ingredients"
          }
        ],
        techniques: [
          {
            name: "Blooming spices",
            description: "Heating spices in oil to release their flavors",
            tips: "Cook spices just until fragrant, about 30 seconds, to prevent burning"
          },
          {
            name: "Simmering",
            description: "Cooking at a gentle bubble to slowly develop flavors",
            tips: "Maintain a gentle simmer, not a rolling boil, to allow the sweet potatoes to cook evenly without breaking apart"
          }
        ],
        culturalContext: {
          origin: "This dish is inspired by various curry traditions from South and Southeast Asia, particularly adapted for Western kitchens by food bloggers looking for accessible, plant-based meals.",
          history: "Sweet potato curries have become popular in Western vegetarian cooking as nutritious alternatives to meat-based dishes, combining the comfort of sweet potatoes with global flavors.",
          significance: "Represents the modern fusion of culinary traditions, making Indian and Southeast Asian flavors more accessible to home cooks worldwide.",
          traditionalServing: "While not strictly traditional, this curry is typically served family-style over rice or with flatbread for scooping."
        },
        presentationGuidance: {
          platingSuggestions: [
            "Serve in a shallow bowl over a bed of rice",
            "Create a small well in the center of the curry for a drizzle of additional coconut milk",
            "Arrange fresh herbs in a small pile on top rather than scattered"
          ],
          garnishingTips: [
            "Sprinkle with fresh cilantro just before serving",
            "Add a few thin slices of red chili for color contrast",
            "Drizzle with a small amount of coconut milk for visual appeal"
          ],
          photoTips: [
            "Capture the steam rising from the hot curry for an appetizing effect",
            "Shoot from a 45-degree angle to show both the surface texture and the side of the bowl",
            "Use natural light to highlight the vibrant orange and green colors"
          ]
        }
      }
    ]
  },
  {
    foodName: "Cauliflower Walnut Taco Meat",
    description: "A plant-based alternative to traditional ground beef taco filling, made with cauliflower and walnuts seasoned with smoky, savory spices. This innovative vegetarian option provides the satisfying texture and bold flavors of traditional taco meat while being entirely plant-based, offering a healthy twist on classic tacos.",
    tags: ["Vegetarian", "Vegan", "Mexican-inspired", "Plant-based", "Gluten-free", "Dairy-free", "Healthy", "Tacos"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Cauliflower Walnut Taco 'Meat'",
        description: "This ingenious plant-based taco filling combines finely chopped cauliflower and walnuts with a robust blend of Mexican spices to create a satisfying alternative to ground beef. Roasted until perfectly browned and seasoned to perfection, this versatile mixture delivers all the texture and flavor you crave in tacos, burritos, or taco salads—without the meat.",
        prepTime: "10 minutes",
        cookTime: "25 minutes",
        totalTime: "35 minutes",
        servings: 6,
        servingSize: "1/2 cup",
        difficulty: "Easy",
        tags: ["Vegetarian", "Vegan", "Gluten-free", "Mexican-inspired", "Plant-based"],
        ingredients: [
          "1 medium head cauliflower, cut into florets",
          "2 cups walnuts",
          "2 tablespoons olive oil",
          "1 tablespoon chili powder",
          "1 teaspoon ground cumin",
          "1 teaspoon smoked paprika",
          "1 teaspoon garlic powder",
          "1 teaspoon onion powder",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "2 tablespoons soy sauce or tamari (for gluten-free)",
          "1 tablespoon tomato paste",
          "Tortillas, taco shells, and your favorite toppings for serving"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C) and line a large baking sheet with parchment paper.",
          "Place cauliflower florets in a food processor and pulse until they resemble rice-sized pieces. Transfer to a large bowl.",
          "Add walnuts to the food processor and pulse until chopped into small pieces, similar in size to the cauliflower. Be careful not to over-process into a paste.",
          "Combine the processed walnuts with the cauliflower in the bowl.",
          "Add olive oil, chili powder, cumin, smoked paprika, garlic powder, onion powder, salt, and pepper to the mixture.",
          "In a small bowl, whisk together soy sauce and tomato paste, then pour over the cauliflower mixture.",
          "Stir everything until well combined and all pieces are evenly coated with seasonings.",
          "Spread the mixture in an even layer on the prepared baking sheet.",
          "Bake for 25-30 minutes, stirring halfway through, until the mixture is browned and slightly crispy around the edges.",
          "Serve in taco shells or tortillas with your favorite toppings, such as lettuce, tomato, avocado, salsa, and lime wedges."
        ],
        chefTips: [
          "Pulse the cauliflower and walnuts separately for the best texture - you want them to be similar in size but not mushy",
          "Don't overcrowd the baking sheet - use two sheets if necessary for even browning",
          "The mixture can be made ahead and reheated, making it perfect for meal prep",
          "For extra umami flavor, add 1 tablespoon of nutritional yeast to the spice blend"
        ],
        commonMistakes: [
          "Over-processing the walnuts until they become paste-like, which changes the final texture",
          "Not stirring the mixture halfway through baking, resulting in uneven cooking",
          "Using raw walnuts instead of toasted - toasted have better flavor, or you can toast them in the oven before chopping",
          "Skimping on spices - the robust seasoning is key to mimicking taco meat flavor"
        ],
        nutritionInfo: {
          calories: 220,
          protein: "6g",
          carbs: "8g",
          fats: "19g",
          fiber: "4g",
          sugar: "2g",
          sodium: "380mg",
          vitamins: [
            "Vitamin C: 40% DV",
            "Vitamin B6: 10% DV",
            "Folate: 15% DV",
            "Manganese: 30% DV"
          ],
          healthyAlternatives: [
            "Use sunflower seeds in place of some or all of the walnuts for a nut-free version",
            "Reduce oil to 1 tablespoon and add 1 tablespoon of water to lower fat content",
            "Use coconut aminos instead of soy sauce for a soy-free option"
          ],
          dietaryNotes: [
            "Excellent source of plant-based omega-3 fatty acids from walnuts",
            "High in antioxidants from both walnuts and spices",
            "Lower in calories and higher in fiber than beef taco meat",
            "Contains no cholesterol and is rich in heart-healthy fats"
          ]
        },
        variations: [
          {
            type: "lentil-boost",
            description: "A higher-protein version including lentils",
            adjustments: [
              "Reduce cauliflower to half a head and add 1 cup cooked brown or green lentils",
              "Increase cumin to 1.5 teaspoons for deeper flavor with lentils",
              "Add 1/4 teaspoon of cayenne pepper for extra heat to complement the earthy lentils"
            ]
          },
          {
            type: "smoky chipotle",
            description: "A smoky, spicier version with chipotle peppers",
            adjustments: [
              "Add 1-2 chopped chipotle peppers in adobo sauce to the mixture",
              "Reduce the chili powder to 2 teaspoons to balance the heat",
              "Add 1 teaspoon of maple syrup to balance the heat with a touch of sweetness"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Mexican Street Corn Salad",
            description: "Grilled corn kernels tossed with lime, cotija cheese (or vegan alternative), and spices",
            preparationTime: "15 minutes",
            pairingReason: "The sweet corn complements the savory taco 'meat' with contrasting texture and flavor"
          },
          {
            name: "Cilantro Lime Rice",
            description: "Fluffy rice infused with fresh lime juice and chopped cilantro",
            preparationTime: "25 minutes",
            pairingReason: "Provides a neutral base that soaks up the taco flavors while adding its own bright notes"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 5 days. The mixture can also be frozen for up to 3 months in a freezer-safe container.",
        reheatingMethods: "Reheat in a skillet over medium heat until warmed through, adding a splash of water if it seems dry. Alternatively, microwave for 1-2 minutes, stirring halfway through. For best texture when reheating from frozen, thaw overnight in the refrigerator first.",
        beveragePairings: [
          "Mexican beer with lime - the crisp, light flavor complements the bold spices",
          "Horchata - the sweet, cinnamon rice milk provides a cooling contrast",
          "Cucumber lime agua fresca - refreshing and light against the savory filling"
        ],
        equipmentNeeded: [
          {
            name: "Food processor",
            purpose: "For chopping cauliflower and walnuts"
          },
          {
            name: "Baking sheet",
            purpose: "For roasting the mixture"
          },
          {
            name: "Parchment paper",
            purpose: "To prevent sticking and make cleanup easier"
          }
        ],
        techniques: [
          {
            name: "Pulsing",
            description: "Using the food processor to chop ingredients into small, uniform pieces",
            tips: "Use short pulses and check frequently to avoid over-processing into a paste"
          },
          {
            name: "Even spreading",
            description: "Distributing the mixture evenly on the baking sheet",
            tips: "Use a spatula to create a thin, even layer for maximum browning and texture"
          }
        ],
        culturalContext: {
          origin: "This plant-based adaptation was created as part of the modern vegetarian and vegan food movement, drawing inspiration from traditional Mexican taco seasonings.",
          history: "Plant-based meat alternatives gained popularity in the 2010s as more people sought to reduce meat consumption for health, environmental, and ethical reasons.",
          traditionalServing: "While not a traditional dish, it's typically served in the same manner as regular taco meat - in shells or tortillas with classic toppings."
        },
        presentationGuidance: {
          platingSuggestions: [
            "Serve in a build-your-own taco bar style with separate bowls for each topping",
            "Pre-assemble tacos and arrange in a taco holder for an impressive presentation",
            "Create a taco bowl with the 'meat' as the base layer, topped with fresh ingredients in sections"
          ],
          garnishingTips: [
            "Top with microgreens or finely chopped cilantro for a fresh pop of color",
            "Add thin radish slices for a crisp, peppery contrast",
            "Finish with a sprinkle of nutritional yeast or vegan cheese for a cheesy note"
          ],
          photoTips: [
            "Capture the texture by shooting close-up to show the browned edges and varied texture",
            "Style with colorful fresh toppings like red tomatoes, green avocado, and purple cabbage",
            "Use a dark backdrop to make the taco colors pop in photographs"
          ]
        }
      }
    ]
  },
  {
    foodName: "Creamy Garlic Sun-Dried Tomato Pasta",
    description: "A luxurious pasta dish featuring tender noodles coated in a silky sauce made with garlic, sun-dried tomatoes, and cream. The intense flavor of sun-dried tomatoes provides bursts of sweet-tart richness, while the creamy sauce creates a comforting, indulgent meal that comes together quickly. This versatile dish balances sophisticated flavors with everyday comfort.",
    tags: ["Italian-inspired", "Pasta", "Creamy", "Quick dinner", "Vegetarian", "Comfort food"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Creamy Sun-Dried Tomato Pasta with Garlic and Herbs",
        description: "This luxurious pasta dish combines the intense flavor of sun-dried tomatoes with a velvety garlic cream sauce, creating a restaurant-quality meal in under 30 minutes. The sweet-tart tomatoes and savory garlic create perfect balance, while fresh herbs add brightness to this indulgent comfort food classic.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Italian-inspired", "Pasta", "Vegetarian", "Quick dinner"],
        ingredients: [
          "12 oz fettuccine or pasta of choice",
          "2 tablespoons olive oil",
          "4 cloves garlic, minced",
          "1/2 cup sun-dried tomatoes in oil, drained and chopped",
          "1/4 teaspoon red pepper flakes (optional)",
          "1 cup heavy cream",
          "1/2 cup chicken or vegetable broth",
          "1/2 cup grated Parmesan cheese, plus more for serving",
          "1/4 cup fresh basil, chopped, plus more for garnish",
          "2 tablespoons fresh parsley, chopped",
          "Salt and pepper to taste",
          "2 tablespoons butter",
          "Optional protein: Grilled chicken, shrimp, or Italian sausage"
        ],
        instructions: [
          "Bring a large pot of salted water to a boil and cook pasta according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
          "While pasta cooks, heat olive oil in a large skillet over medium heat.",
          "Add minced garlic and red pepper flakes (if using) to the skillet and cook until fragrant, about 30 seconds, being careful not to burn the garlic.",
          "Add chopped sun-dried tomatoes and cook for 1 minute to release their flavor.",
          "Pour in the heavy cream and broth, then bring to a gentle simmer.",
          "Reduce heat to low and stir in the Parmesan cheese until melted and smooth.",
          "Add the drained pasta to the sauce and toss to coat, adding a splash of reserved pasta water if the sauce is too thick.",
          "Stir in the butter until melted, then add fresh basil and parsley.",
          "Season with salt and pepper to taste, keeping in mind that the Parmesan and sun-dried tomatoes are already salty.",
          "Serve immediately, garnished with extra Parmesan cheese and fresh basil."
        ],
        chefTips: [
          "For extra flavor, use the oil from the sun-dried tomato jar in place of regular olive oil",
          "Save some pasta water - the starchy water helps create a silky sauce that clings to the pasta",
          "Don't rinse the pasta after cooking - the starch helps the sauce adhere better",
          "If the sauce seems too thick, add pasta water a tablespoon at a time until you reach your desired consistency"
        ],
        commonMistakes: [
          "Overheating the cream sauce, which can cause it to separate or curdle",
          "Overcooking the pasta - aim for al dente as it will continue to cook slightly in the hot sauce",
          "Not properly draining the sun-dried tomatoes, which can make the sauce too oily",
          "Adding cold cheese to the hot sauce, which can cause it to clump - let it come to room temperature first"
        ],
        nutritionInfo: {
          calories: 520,
          protein: "15g",
          carbs: "48g",
          fats: "30g",
          fiber: "3g",
          sugar: "5g",
          sodium: "450mg",
          vitamins: [
            "Vitamin A: 20% DV",
            "Calcium: 25% DV",
            "Iron: 10% DV",
            "Vitamin D: 8% DV"
          ],
          healthyAlternatives: [
            "Use half-and-half or milk instead of heavy cream to reduce fat and calories",
            "Try whole wheat or chickpea pasta for more fiber and protein",
            "Replace half the cream with pureed cauliflower for a lighter sauce"
          ],
          dietaryNotes: [
            "Contains dairy and gluten in standard recipe",
            "Can be made gluten-free by using gluten-free pasta",
            "High in calcium from Parmesan cheese",
            "Sun-dried tomatoes are concentrated sources of lycopene and antioxidants"
          ]
        },
        variations: [
          {
            type: "spinach-artichoke",
            description: "A Mediterranean-inspired variation with added vegetables",
            adjustments: [
              "Add 2 cups of fresh spinach and 1 cup of chopped artichoke hearts when adding the sun-dried tomatoes",
              "Increase garlic to 6 cloves for more flavor",
              "Add 1/4 cup of crumbled feta cheese at the end for a tangy note"
            ]
          },
          {
            type: "vodka sauce",
            description: "A twist on classic vodka sauce with sun-dried tomatoes",
            adjustments: [
              "Add 1/4 cup vodka after cooking the sun-dried tomatoes and reduce until almost evaporated",
              "Use 1/2 cup tomato paste in addition to sun-dried tomatoes",
              "Add a pinch of nutmeg to the cream sauce"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Garlic Bread",
            description: "Crusty bread slathered with garlic butter and toasted until golden",
            preparationTime: "10 minutes",
            pairingReason: "The crispy, aromatic bread is perfect for soaking up any remaining cream sauce"
          },
          {
            name: "Arugula Salad with Lemon Vinaigrette",
            description: "Peppery arugula tossed with a bright lemon dressing, shaved Parmesan, and cracked black pepper",
            preparationTime: "5 minutes",
            pairingReason: "The light, tangy salad cuts through the richness of the creamy pasta"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 3 days. The sauce may thicken when chilled.",
        reheatingMethods: "Reheat gently on the stovetop over low heat, adding a splash of cream or milk to restore the sauce's creaminess. Alternatively, microwave in 30-second intervals, stirring between each, until warmed through.",
        beveragePairings: [
          "Medium-bodied white wine like Pinot Grigio or Chardonnay - complements the creamy sauce without overpowering it",
          "Light red wine like Pinot Noir - works well with the sun-dried tomato flavor",
          "Sparkling water with lemon - provides a refreshing contrast to the rich dish"
        ],
        equipmentNeeded: [
          {
            name: "Large pot",
            purpose: "For boiling pasta"
          },
          {
            name: "Colander",
            purpose: "For draining pasta"
          },
          {
            name: "Large skillet or sauté pan",
            purpose: "For making the sauce"
          }
        ],
        techniques: [
          {
            name: "Emulsification",
            description: "Creating a smooth, cohesive sauce by blending fat (cream, butter) with starchy pasta water",
            tips: "Reserve pasta water and add it gradually to the sauce while stirring to create the perfect consistency"
          },
          {
            name: "Infusing oil",
            description: "Extracting flavors from aromatics into oil",
            tips: "Cook garlic just until fragrant but not browned for the best flavor without bitterness"
          }
        ],
        culturalContext: {
          origin: "This dish is inspired by Italian-American cuisine, which has evolved from traditional Italian cooking to incorporate local ingredients and preferences.",
          history: "Creamy pasta dishes gained popularity in American restaurants in the mid-20th century, with sun-dried tomatoes becoming a trendy ingredient in the 1980s and 1990s.",
          traditionalServing: "Typically served as a main course, often with garlic bread and a simple salad."
        },
        presentationGuidance: {
          platingSuggestions: [
            "Twirl pasta onto the plate using a large fork and spoon for an elegant presentation",
            "Serve in wide, shallow bowls to showcase the sauce and ingredients",
            "Create height by piling pasta in the center rather than spreading it out"
          ],
          garnishingTips: [
            "Top with a fresh basil sprig or small basil leaves rather than chopped herbs for a more polished look",
            "Add a light dusting of freshly grated Parmesan and cracked black pepper just before serving",
            "Drizzle a small amount of high-quality olive oil around the edge of the plate for a restaurant-style finish"
          ],
          photoTips: [
            "Capture the creaminess by showing the sauce coating the pasta strands",
            "Use a fork to twirl some pasta for action shots that show the texture",
            "Shoot in natural light to highlight the cream sauce and red flecks of sun-dried tomato"
          ]
        }
      }
    ]
  },
  {
    foodName: "Honey Garlic Salmon",
    description: "A quick and flavorful seafood dish featuring salmon fillets glazed with a sweet and savory sauce made from honey, garlic, and soy sauce. The glaze caramelizes slightly during cooking, creating a beautiful lacquered finish and irresistible flavor combination that enhances the natural richness of the salmon. This simple yet impressive dish balances sweet, savory, and umami notes.",
    tags: ["Seafood", "Asian-inspired", "Quick dinner", "Healthy", "Gluten-free option", "High protein", "Omega-3"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Easy Honey Garlic Glazed Salmon",
        description: "This restaurant-quality salmon dish features a perfect balance of sweet honey, aromatic garlic, and savory soy sauce in a glossy glaze that caramelizes beautifully on tender salmon fillets. Ready in just 20 minutes, it's an impressive yet simple dinner that's healthy, protein-rich, and bursting with flavor.",
        prepTime: "5 minutes",
        cookTime: "15 minutes",
        totalTime: "20 minutes",
        servings: 4,
        servingSize: "1 salmon fillet (about 6 oz)",
        difficulty: "Easy",
        tags: ["Seafood", "Quick dinner", "Healthy", "High protein"],
        ingredients: [
          "4 salmon fillets (about 6 oz each), skin-on",
          "Salt and pepper to taste",
          "1 tablespoon olive oil",
          "4 cloves garlic, minced",
          "1/4 cup honey",
          "3 tablespoons soy sauce (or tamari for gluten-free)",
          "1 tablespoon water",
          "2 tablespoons lemon juice, divided",
          "1 teaspoon cornstarch (optional, for thicker sauce)",
          "Red pepper flakes to taste (optional)",
          "2 tablespoons fresh parsley, chopped",
          "Lemon wedges for serving"
        ],
        instructions: [
          "Pat the salmon fillets dry with paper towels and season both sides with salt and pepper.",
          "Heat olive oil in a large non-stick skillet over medium-high heat.",
          "Place salmon in the skillet, skin-side down, and cook for 4-5 minutes until the skin is crispy.",
          "While the salmon cooks, whisk together garlic, honey, soy sauce, water, and 1 tablespoon of lemon juice in a small bowl. If using cornstarch for a thicker sauce, mix it with the water before adding to the other ingredients.",
          "Flip the salmon and cook for another 2 minutes.",
          "Pour the honey garlic sauce into the pan, around (not on top of) the salmon.",
          "Allow the sauce to simmer and reduce for about 1-2 minutes, spooning it over the salmon as it thickens.",
          "Add the remaining tablespoon of lemon juice and sprinkle with red pepper flakes if desired.",
          "Continue cooking until the salmon is cooked through and flakes easily with a fork, and the sauce has thickened slightly, about 1-2 more minutes.",
          "Garnish with chopped parsley and serve immediately with lemon wedges."
        ],
        chefTips: [
          "For the crispiest skin, make sure the salmon is completely dry before seasoning and cooking",
          "Don't move the salmon for the first 4-5 minutes to allow the skin to crisp up properly",
          "The salmon is done when it flakes easily with a fork and reaches an internal temperature of 145°F (63°C)",
          "For a more caramelized glaze, you can broil the salmon for the last minute of cooking"
        ],
        commonMistakes: [
          "Overcooking the salmon, which makes it dry and tough - it should still be slightly translucent in the center",
          "Not patting the salmon dry, which prevents proper searing and crispy skin",
          "Using cold salmon straight from the refrigerator, which causes uneven cooking - let it sit at room temperature for 15 minutes before cooking",
          "Flipping the salmon too early before the skin has crisped up"
        ],
        nutritionInfo: {
          calories: 380,
          protein: "34g",
          carbs: "18g",
          fats: "19g",
          fiber: "0g",
          sugar: "16g",
          sodium: "850mg",
          vitamins: [
            "Vitamin D: 100% DV",
            "Vitamin B12: 80% DV",
            "Omega-3 fatty acids: 1,800mg",
            "Selenium: 60% DV"
          ],
          healthyAlternatives: [
            "Use low-sodium soy sauce to reduce sodium content",
            "Replace some or all of the honey with maple syrup for a different flavor profile",
            "For a sugar-free version, use a monk fruit sweetener instead of honey"
          ],
          dietaryNotes: [
            "Excellent source of lean protein and omega-3 fatty acids",
            "Naturally gluten-free when made with tamari instead of regular soy sauce",
            "Low in carbohydrates and high in healthy fats",
            "Rich in selenium, which supports thyroid function and immune health"
          ]
        },
        variations: [
          {
            type: "teriyaki",
            description: "A Japanese-inspired variation with traditional teriyaki flavors",
            adjustments: [
              "Add 2 tablespoons of mirin (Japanese sweet rice wine) to the sauce",
              "Include 1 teaspoon of grated ginger for a spicy note",
              "Garnish with toasted sesame seeds instead of parsley"
            ]
          },
          {
            type: "orange-ginger",
            description: "A citrusy variation with warm ginger notes",
            adjustments: [
              "Replace lemon juice with orange juice and add 1 teaspoon of orange zest",
              "Add 1 tablespoon of grated fresh ginger to the sauce",
              "Include 1 tablespoon of rice vinegar for tanginess"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Coconut Rice",
            description: "Jasmine rice cooked with coconut milk and a pinch of salt",
            preparationTime: "25 minutes",
            pairingReason: "The creamy, slightly sweet rice complements the glazed salmon and soaks up the delicious sauce"
          },
          {
            name: "Roasted Broccoli",
            description: "Broccoli florets tossed with olive oil, salt, and garlic, then roasted until crispy at the edges",
            preparationTime: "20 minutes",
            pairingReason: "The crisp, caramelized vegetables balance the rich salmon and provide nutritional contrast"
          }
        ],
        storageInstructions: "Store leftovers in an airtight container in the refrigerator for up to 2 days. The skin may lose its crispness upon storage.",
        reheatingMethods: "Reheat gently in a skillet over medium-low heat until just warmed through. Alternatively, microwave at 50% power in 30-second increments. Avoid overheating, which will dry out the salmon.",
        beveragePairings: [
          "Pinot Gris/Grigio - light, crisp white wine that complements the honey-sweetness without overwhelming the salmon",
          "Dry Riesling - aromatic white wine with acidity that cuts through the rich salmon",
          "Green tea - the grassiness works well with the honey and soy flavors"
        ],
        equipmentNeeded: [
          {
            name: "Large non-stick skillet or well-seasoned cast iron pan",
            purpose: "For cooking the salmon and making the sauce"
          },
          {
            name: "Fish spatula or thin turner",
            purpose: "For flipping the delicate salmon without breaking it"
          },
          {
            name: "Small bowl",
            purpose: "For mixing the sauce ingredients"
          }
        ],
        techniques: [
          {
            name: "Pan-searing",
            description: "Cooking at high heat to develop a crisp exterior while maintaining a moist interior",
            tips: "Start with a hot pan and don't move the salmon until it releases naturally from the pan"
          },
          {
            name: "Glazing",
            description: "Coating food with a flavorful liquid that reduces to a shiny finish",
            tips: "Continuously spoon the sauce over the salmon as it reduces to build up layers of flavor"
          }
        ],
        culturalContext: {
          origin: "This dish combines Asian flavor profiles with Western cooking techniques, representing modern fusion cuisine popular in home cooking.",
          history: "The combination of honey and garlic has roots in both Asian and Western cooking traditions, with this particular preparation gaining popularity through food blogs and social media in the 2010s.",
          traditionalServing: "Typically served as a main dish with a starch (rice or potatoes) and vegetables."
        },
        presentationGuidance: {
          platingSuggestions: [
            "Place the salmon over a bed of rice or vegetables, skin-side down to maintain crispness",
            "Spoon extra glaze over and around the salmon for a glossy presentation",
            "Arrange lemon wedges alongside the salmon for both visual appeal and functionality"
          ],
          garnishingTips: [
            "Sprinkle with finely chopped parsley or green onions for color contrast",
            "Add a light dusting of black or white sesame seeds for texture and visual interest",
            "Place small lemon wedges or thin lemon slices alongside for brightness"
          ],
          photoTips: [
            "Capture the glossy sheen of the glaze by shooting at an angle that catches the light",
            "Show the flakiness of the salmon by gently separating a small piece with a fork",
            "Include a side dish in the frame to create a complete meal presentation"
          ]
        }
      }
    ]
  },
  {
    foodName: "Mediterranean Chickpea Salad",
    description: "A vibrant, protein-rich salad featuring chickpeas, colorful vegetables, feta cheese, and herbs tossed in a lemony olive oil dressing. This refreshing dish combines the bright flavors of the Mediterranean with hearty ingredients for a satisfying meal that's perfect for warm weather. High in fiber and protein, it offers a nutritious option that's as beautiful as it is delicious.",
    tags: ["Mediterranean", "Salad", "Vegetarian", "Healthy", "Make ahead", "High protein", "High fiber", "No cook"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Colorful Mediterranean Chickpea Salad",
        description: "This vibrant chickpea salad bursts with Mediterranean flavors, featuring crisp vegetables, tangy feta, and aromatic herbs in a bright lemon-olive oil dressing. Perfect as a light lunch, side dish, or potluck contribution, this versatile salad can be prepared in advance and stays fresh for days. It's a nutritional powerhouse that's as healthy as it is delicious.",
        prepTime: "20 minutes",
        cookTime: "0 minutes",
        totalTime: "20 minutes",
        servings: 6,
        servingSize: "1 cup",
        difficulty: "Easy",
        tags: ["Mediterranean", "Vegetarian", "Salad", "No cook", "Make ahead"],
        ingredients: [
          "2 (15 oz) cans chickpeas, drained and rinsed",
          "1 English cucumber, diced",
          "1 pint cherry tomatoes, halved",
          "1 bell pepper (red, yellow, or orange), diced",
          "1/2 red onion, finely diced",
          "1/2 cup kalamata olives, pitted and halved",
          "1/2 cup feta cheese, crumbled",
          "1/4 cup fresh parsley, chopped",
          "1/4 cup fresh mint, chopped",
          "For the dressing:",
          "1/3 cup extra virgin olive oil",
          "3 tablespoons fresh lemon juice",
          "1 tablespoon red wine vinegar",
          "2 cloves garlic, minced",
          "1 teaspoon dried oregano",
          "1/2 teaspoon Dijon mustard",
          "1 teaspoon honey (optional)",
          "Salt and freshly ground black pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine chickpeas, cucumber, cherry tomatoes, bell pepper, red onion, olives, feta cheese, parsley, and mint.",
          "In a small bowl or jar, whisk together olive oil, lemon juice, red wine vinegar, garlic, oregano, Dijon mustard, and honey (if using).",
          "Season the dressing with salt and pepper to taste.",
          "Pour the dressing over the salad and toss gently to combine.",
          "For best flavor, refrigerate for at least 30 minutes before serving to allow the flavors to meld.",
          "Taste and adjust seasoning before serving, adding more salt, pepper, or lemon juice if needed."
        ],
        chefTips: [
          "Soak the diced red onion in cold water for 5-10 minutes before adding to the salad to reduce its sharpness",
          "Use high-quality extra virgin olive oil for the dressing - it makes a significant difference in flavor",
          "If making ahead, reserve some of the herbs to add just before serving for the freshest color and flavor",
          "For a creamier texture, lightly mash about 1/4 of the chickpeas before mixing with other ingredients"
        ],
        commonMistakes: [
          "Not drying the chickpeas thoroughly after rinsing, which dilutes the dressing",
          "Over-salting the salad without accounting for the saltiness of the olives and feta",
          "Using dried herbs instead of fresh, which significantly changes the flavor profile",
          "Adding too much dressing, which can make the salad soggy - you can always add more later"
        ],
        nutritionInfo: {
          calories: 290,
          protein: "10g",
          carbs: "28g",
          fats: "16g",
          fiber: "8g",
          sugar: "5g",
          sodium: "480mg",
          vitamins: [
            "Vitamin C: 50% DV",
            "Vitamin A: 15% DV",
            "Folate: 30% DV",
            "Iron: 15% DV"
          ],
          healthyAlternatives: [
            "Use reduced-fat feta cheese to lower the fat content",
            "Skip the honey in the dressing for a lower-sugar version",
            "For a vegan option, replace feta with cubed avocado or a plant-based feta alternative"
          ],
          dietaryNotes: [
            "Excellent source of plant-based protein and fiber",
            "Rich in heart-healthy monounsaturated fats from olive oil and olives",
            "Contains various antioxidants from colorful vegetables",
            "Naturally gluten-free and vegetarian; easily made vegan by omitting feta"
          ]
        },
        variations: [
          {
            type: "Greek-style",
            description: "A more traditional Greek salad variation",
            adjustments: [
              "Add 1 cup of cooked orzo or pearl couscous for a heartier dish",
              "Include 1 teaspoon of dried mint in the dressing",
              "Top with an extra 1/4 cup of feta and a sprinkle of sumac"
            ]
          },
          {
            type: "Moroccan-inspired",
            description: "A North African twist with warm spices",
            adjustments: [
              "Add 1/2 teaspoon ground cumin and 1/4 teaspoon cinnamon to the dressing",
              "Include 1/4 cup golden raisins or chopped dried apricots for sweetness",
              "Garnish with 2 tablespoons of toasted pine nuts or sliced almonds"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Warm Pita Bread",
            description: "Soft, warm pita bread, lightly brushed with olive oil and za'atar spice",
            preparationTime: "5 minutes",
            pairingReason: "Provides a warm contrast to the cool salad and is perfect for scooping up the chickpeas and dressing"
          },
          {
            name: "Grilled Lemon Chicken",
            description: "Boneless chicken breasts marinated in lemon, garlic, and herbs, then grilled",
            preparationTime: "30 minutes (including marinating)",
            pairingReason: "Adds additional protein and complements the Mediterranean flavors in the salad"
          }
        ],
        storageInstructions: "Store in an airtight container in the refrigerator for up to 3-4 days. The flavors often improve after a day as they meld together.",
        reheatingMethods: "This salad is meant to be served cold and does not require reheating. If it has been refrigerated, allow it to sit at room temperature for 15-20 minutes before serving for best flavor.",
        beveragePairings: [
          "Crisp white wine like Sauvignon Blanc or Assyrtiko - complements the bright, acidic notes in the salad",
          "Sparkling water with lemon or cucumber - refreshing and light alongside the hearty salad",
          "Iced mint tea - the herbal notes pair well with the fresh herbs in the salad"
        ],
        equipmentNeeded: [
          {
            name: "Large mixing bowl",
            purpose: "For combining all salad ingredients"
          },
          {
            name: "Small bowl or jar with lid",
            purpose: "For mixing and emulsifying the dressing"
          },
          {
            name: "Sharp knife and cutting board",
            purpose: "For chopping vegetables and herbs"
          }
        ],
        techniques: [
          {
            name: "Emulsifying",
            description: "Blending oil and acidic ingredients into a smooth, cohesive dressing",
            tips: "Whisk continuously while slowly adding oil to the acidic ingredients, or shake vigorously in a jar with a tight-fitting lid"
          },
          {
            name: "Maceration",
            description: "Allowing foods to soak in liquid to soften and absorb flavors",
            tips: "Let the completed salad rest for at least 30 minutes before serving to allow the flavors to develop and chickpeas to absorb the dressing"
          }
        ],
        culturalContext: {
          origin: "This salad draws inspiration from various Mediterranean cuisines, particularly Greek, Lebanese, and Israeli cooking, where chickpeas and fresh vegetables are dietary staples.",
          history: "Chickpea-based salads have been common throughout the Mediterranean region for centuries, with each country adding their own local ingredients and seasonings.",
          traditionalServing: "Often served as part of a mezze spread, as a side dish with grilled meats, or as a light lunch with bread."
        },
        presentationGuidance: {
          platingSuggestions: [
            "Serve in a wide, shallow bowl to showcase the colorful ingredients",
            "Use a slotted spoon for serving to leave excess dressing behind",
            "For a buffet presentation, line the serving bowl with lettuce leaves for added color and freshness"
          ],
          garnishingTips: [
            "Reserve some of the crumbled feta and fresh herbs to sprinkle on top just before serving",
            "Add a light dusting of paprika or sumac for color and flavor",
            "Place a few lemon wedges around the edge of the dish for both appearance and additional seasoning"
          ],
          photoTips: [
            "Capture the vibrant colors by shooting in natural light",
            "Style with additional Mediterranean ingredients like whole lemons, olive oil bottles, or fresh herb springs",
            "Show the texture by using a fork to gently lift some of the salad, revealing the various ingredients"
          ]
        }
      }
    ]
  }
];