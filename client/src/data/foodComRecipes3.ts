import { AnalyzeImageResponse } from "@shared/schema";

/**
 * Third collection of recipes sourced from Food.com
 * Used to provide a rich browsing experience in the recipe library
 */
export const foodComRecipes3: AnalyzeImageResponse[] = [
  {
    foodName: "Cinnamon Rolls",
    description: "Soft, sweet rolls with swirls of cinnamon-sugar, topped with cream cheese frosting. This beloved baked treat is perfect for breakfast, brunch, or a special dessert.",
    tags: ["Breakfast", "Brunch", "Dessert", "Baking", "Sweet", "Cinnamon", "American"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/37/67/23/picxBTXXL.jpg",
    recipes: [
      {
        title: "Homemade Cinnamon Rolls",
        description: "Fluffy, decadent cinnamon rolls with a gooey filling and rich cream cheese frosting.",
        ingredients: [
          "For the dough:",
          "1 cup warm milk (110°F/45°C)",
          "2 1/4 teaspoons active dry yeast (1 package)",
          "1/2 cup granulated sugar",
          "1/3 cup unsalted butter, softened",
          "2 large eggs",
          "4 cups all-purpose flour",
          "1 teaspoon salt",
          "For the filling:",
          "1 cup packed brown sugar",
          "2 1/2 tablespoons ground cinnamon",
          "1/3 cup unsalted butter, softened",
          "For the cream cheese frosting:",
          "6 tablespoons unsalted butter, softened",
          "4 ounces cream cheese, softened",
          "1 1/2 cups powdered sugar",
          "1/2 teaspoon vanilla extract",
          "1/8 teaspoon salt"
        ],
        instructions: [
          "In the bowl of a stand mixer, dissolve yeast in warm milk and let sit for 5-10 minutes until foamy.",
          "Add sugar, butter, eggs, salt, and 2 cups of flour. Mix on low speed until combined.",
          "Using a dough hook attachment, slowly add remaining flour and knead on medium speed for 5-7 minutes until dough is smooth and elastic.",
          "Place dough in a lightly greased bowl, cover, and let rise in a warm place for 1 hour, or until doubled in size.",
          "Meanwhile, mix brown sugar and cinnamon in a small bowl for filling.",
          "After dough has risen, punch down and roll out on a floured surface into a 16x24 inch rectangle.",
          "Spread softened butter evenly over the dough, then sprinkle with the cinnamon-sugar mixture, leaving a 1/2-inch border at the far edge.",
          "Starting from the long edge closest to you, tightly roll up the dough. Pinch the seam to seal.",
          "Using a sharp knife or unflavored dental floss, cut the roll into 12 equal slices.",
          "Place rolls in a lightly greased 9x13 inch baking pan. Cover and let rise for 30 minutes, or until nearly doubled.",
          "Preheat oven to 350°F (175°C).",
          "Bake rolls for 20-25 minutes, or until golden brown.",
          "While rolls are baking, prepare the frosting. Beat together butter and cream cheese until smooth. Add powdered sugar, vanilla, and salt, and beat until fluffy.",
          "Let rolls cool for 10 minutes before spreading with frosting. Serve warm."
        ],
        prepTime: "2 hours 30 minutes (including rising time)",
        cookTime: "25 minutes",
        totalTime: "2 hours 55 minutes",
        servings: "12 large rolls",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 460,
          protein: "6g",
          carbs: "65g",
          fats: "19g",
          fiber: "2g",
          sugar: "36g",
          sodium: "220mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Fresh Fruit",
        description: "A bowl of fresh berries or sliced fruit adds a refreshing contrast to the sweet rolls."
      },
      {
        name: "Bacon",
        description: "Crispy bacon provides a savory balance to the sweet cinnamon rolls."
      },
      {
        name: "Coffee or Milk",
        description: "A hot cup of coffee or cold glass of milk is the perfect beverage pairing."
      }
    ],
    variations: [
      {
        name: "Pecan Cinnamon Rolls",
        description: "Adds chopped pecans to the filling and tops with a pecan praline sauce.",
        keyIngredients: ["Pecans", "Brown sugar", "Heavy cream"]
      },
      {
        name: "Orange Cinnamon Rolls",
        description: "Incorporates orange zest in the dough and orange juice in the frosting for a citrusy twist.",
        keyIngredients: ["Orange zest", "Orange juice", "Cream cheese"]
      },
      {
        name: "Pumpkin Cinnamon Rolls",
        description: "Adds pumpkin puree to the dough and pumpkin pie spice to the filling for a fall favorite.",
        keyIngredients: ["Pumpkin puree", "Pumpkin pie spice", "Maple syrup"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Yeast thrives at warm temperatures (around 110°F) but will die at temperatures above 130°F.",
        "Kneading develops gluten, giving the rolls their chewy, bread-like texture.",
        "Proper rising time allows yeast to produce CO2, creating fluffy rolls with the right texture."
      ],
      commonIssues: [
        "Insufficient rising time or cool environments can result in dense, heavy rolls.",
        "Overfilling can cause the filling to leak out during baking.",
        "Rolling the dough too loosely results in rolls that don't hold their shape."
      ]
    },
    culturalContext: {
      origin: "Northern Europe/Scandinavia, popularized in America",
      history: "Cinnamon rolls have their origins in Sweden (where they're called 'kanelbullar') and other Northern European countries. The American version, with cream cheese frosting, became popular in the early 20th century. Mall food court chain Cinnabon, founded in 1985, helped cement their place in American food culture.",
      significance: "Represents comfort and indulgence in American breakfast and dessert traditions.",
      traditionalServing: "Served warm, often for breakfast or brunch, especially on weekends or holidays.",
      occasions: ["Weekend breakfasts", "Holiday mornings", "Brunch gatherings", "Special treats"],
      festiveRelevance: ["Christmas morning", "Easter", "Mother's Day", "Father's Day"]
    },
    successIndicators: [
      "Rolls should be golden brown on top but still soft inside",
      "The filling should be gooey and well-distributed",
      "The spiral pattern should be distinct when cut",
      "Frosting should be smooth and creamy, with a balanced tang from the cream cheese"
    ]
  },
  {
    foodName: "Pot Roast",
    description: "A classic comfort dish featuring beef slow-cooked with vegetables in a rich gravy until fork-tender. This hearty one-pot meal is perfect for Sunday dinners and cold-weather gatherings.",
    tags: ["American", "Beef", "Comfort Food", "Slow-cooked", "Sunday Dinner", "Main Course", "Winter"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/22/78/36/Ws8m1k9vTIKSWPKHKUbh_pot%20roast%20vertical-3430.jpg",
    recipes: [
      {
        title: "Classic Sunday Pot Roast",
        description: "A tender, flavorful pot roast with carrots, potatoes, and onions in a rich gravy.",
        ingredients: [
          "4-5 pound beef chuck roast",
          "2 teaspoons salt, divided",
          "1 teaspoon black pepper, divided",
          "3 tablespoons vegetable oil",
          "2 large onions, quartered",
          "4 cloves garlic, minced",
          "1 cup red wine (or additional beef broth)",
          "3 cups beef broth",
          "2 tablespoons tomato paste",
          "1 tablespoon Worcestershire sauce",
          "2 bay leaves",
          "1 teaspoon dried thyme",
          "1 teaspoon dried rosemary",
          "1 pound carrots, peeled and cut into 2-inch pieces",
          "2 pounds potatoes, peeled and cut into 2-inch chunks",
          "2 celery stalks, cut into 2-inch pieces",
          "2 tablespoons cornstarch (optional, for thickening gravy)",
          "2 tablespoons cold water (optional, for thickening gravy)",
          "Fresh parsley, chopped (for garnish)"
        ],
        instructions: [
          "Preheat oven to 325°F (165°C).",
          "Pat the roast dry with paper towels. Season all over with 1 teaspoon salt and 1/2 teaspoon pepper.",
          "In a large Dutch oven, heat oil over medium-high heat. Brown the roast on all sides, about 3-4 minutes per side. Transfer to a plate.",
          "Reduce heat to medium. Add onions to the pot and cook until starting to brown, about 5 minutes. Add garlic and cook for 30 seconds more.",
          "Pour in wine (or additional broth) and scrape up any browned bits from the bottom of the pot.",
          "Stir in beef broth, tomato paste, Worcestershire sauce, bay leaves, thyme, rosemary, remaining salt, and pepper.",
          "Return the roast to the pot, along with any accumulated juices. Bring to a simmer.",
          "Cover the pot with a tight-fitting lid and transfer to the oven. Cook for 2 hours.",
          "Remove from oven, add carrots, potatoes, and celery around the roast. Return to oven and continue cooking for another 1-1.5 hours, until beef and vegetables are very tender.",
          "Transfer the roast and vegetables to a serving platter and tent with foil to keep warm.",
          "Optional: To thicken gravy, place the Dutch oven over medium heat. In a small bowl, whisk together cornstarch and cold water. Stir into the cooking liquid and simmer until thickened, about 2 minutes.",
          "Remove bay leaves, taste gravy and adjust seasoning if needed.",
          "Slice the pot roast against the grain and serve with vegetables. Pour gravy over the top and sprinkle with fresh parsley."
        ],
        prepTime: "30 minutes",
        cookTime: "3 hours 30 minutes",
        totalTime: "4 hours",
        servings: "8 servings",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 520,
          protein: "42g",
          carbs: "30g",
          fats: "24g",
          fiber: "4g",
          sugar: "6g",
          sodium: "710mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Green Beans",
        description: "Simply prepared green beans add color and freshness to the meal."
      },
      {
        name: "Dinner Rolls",
        description: "Warm, fluffy dinner rolls are perfect for sopping up the flavorful gravy."
      },
      {
        name: "Green Salad",
        description: "A light green salad with a simple vinaigrette provides contrast to the rich main dish."
      }
    ],
    variations: [
      {
        name: "Mississippi Pot Roast",
        description: "A tangy variation using ranch seasoning, pepperoncini peppers, and au jus gravy mix.",
        keyIngredients: ["Ranch seasoning", "Pepperoncini peppers", "Butter"]
      },
      {
        name: "Beer-Braised Pot Roast",
        description: "Uses dark beer instead of wine for a rich, malty flavor profile.",
        keyIngredients: ["Dark beer", "Mustard", "Brown sugar"]
      },
      {
        name: "Italian Pot Roast",
        description: "Seasoned with Italian herbs and often includes tomatoes and bell peppers.",
        keyIngredients: ["Italian seasoning", "Crushed tomatoes", "Bell peppers"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Slow, low-temperature cooking breaks down the tough connective tissues (collagen) in chuck roast, converting it to gelatin for tenderness.",
        "Browning the meat before braising creates deep flavor through the Maillard reaction.",
        "Adding vegetables later in the cooking process prevents them from becoming mushy."
      ],
      commonIssues: [
        "Cooking at too high a temperature can make the meat tough and dry.",
        "Not browning the meat adequately results in less developed flavor.",
        "Opening the oven or pot frequently lets heat escape, extending cooking time."
      ]
    },
    culturalContext: {
      origin: "European, especially British, with American adaptations",
      history: "Pot roast has its roots in European braising techniques brought to America by immigrants. It became especially popular during the Great Depression and World War II, when tougher, more economical cuts of meat needed to be tenderized through long cooking. Sunday pot roast became an American tradition in the mid-20th century as a special weekend family meal.",
      significance: "Represents American home cooking, family gatherings, and making the most of available resources.",
      traditionalServing: "Typically served as the centerpiece of a family dinner, especially Sunday meals.",
      occasions: ["Sunday family dinners", "Cold weather meals", "Holiday gatherings", "Family celebrations"],
      festiveRelevance: ["Sunday dinners", "Fall and winter gatherings", "Family holidays"]
    },
    successIndicators: [
      "Meat should be very tender, easily pulled apart with a fork",
      "Vegetables should be tender but still hold their shape",
      "Gravy should be rich and flavorful, not watery or greasy",
      "The dish should have a deep, savory aroma and taste"
    ]
  },
  {
    foodName: "Shrimp Scampi",
    description: "A classic Italian-American dish featuring shrimp sautéed in a garlic-infused butter and white wine sauce, typically served over pasta. This elegant yet simple preparation lets the delicate flavor of the shrimp shine.",
    tags: ["Italian-American", "Seafood", "Pasta", "Dinner", "Quick", "Garlic", "Main Course"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/23/27/36/picRQOLhL.jpg",
    recipes: [
      {
        title: "Classic Shrimp Scampi with Linguine",
        description: "Succulent shrimp in a buttery, garlicky white wine sauce served over perfectly cooked pasta.",
        ingredients: [
          "1 pound linguine",
          "4 tablespoons unsalted butter",
          "4 tablespoons olive oil",
          "5 cloves garlic, minced",
          "1 pound large shrimp (16-20 count), peeled and deveined, tails on",
          "1/2 teaspoon red pepper flakes (optional)",
          "1/2 cup dry white wine",
          "1 lemon, juiced (about 3 tablespoons)",
          "1 teaspoon lemon zest",
          "1/4 cup fresh parsley, chopped",
          "Salt and freshly ground black pepper to taste",
          "1/4 cup grated Parmesan cheese (optional)"
        ],
        instructions: [
          "Bring a large pot of salted water to a boil. Cook linguine according to package directions until al dente. Reserve 1/2 cup pasta water before draining.",
          "Meanwhile, in a large skillet, melt 2 tablespoons butter with 2 tablespoons olive oil over medium-high heat.",
          "Add garlic and red pepper flakes (if using) and cook, stirring, for 1 minute until fragrant but not browned.",
          "Add shrimp in a single layer and cook for 1-2 minutes per side until just pink and opaque. Be careful not to overcook. Remove shrimp to a plate.",
          "Add wine and lemon juice to the skillet and bring to a simmer. Cook for 2-3 minutes to reduce slightly.",
          "Lower heat to medium-low. Add remaining butter and olive oil, stirring to create a sauce.",
          "Return shrimp to the skillet along with any accumulated juices, lemon zest, and parsley. Toss to coat in the sauce.",
          "Add drained pasta to the skillet and toss to combine with the sauce. If sauce is too thick, add a splash of reserved pasta water to loosen.",
          "Season with salt and pepper to taste.",
          "Serve immediately, garnished with additional parsley and Parmesan cheese if desired."
        ],
        prepTime: "15 minutes",
        cookTime: "15 minutes",
        totalTime: "30 minutes",
        servings: "4 servings",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 520,
          protein: "31g",
          carbs: "54g",
          fats: "19g",
          fiber: "2g",
          sugar: "1g",
          sodium: "670mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Garlic Bread",
        description: "Crusty bread toasted with garlic butter, perfect for sopping up the scampi sauce."
      },
      {
        name: "Caesar Salad",
        description: "A classic Caesar salad provides a crisp, fresh contrast to the rich pasta dish."
      },
      {
        name: "Roasted Asparagus",
        description: "Simply roasted asparagus adds color and a nutritious element to the meal."
      }
    ],
    variations: [
      {
        name: "Lemon Herb Shrimp Scampi",
        description: "Emphasizes fresh herbs and lemon for a brighter flavor profile.",
        keyIngredients: ["Fresh herbs (basil, thyme)", "Extra lemon zest", "White wine"]
      },
      {
        name: "Creamy Shrimp Scampi",
        description: "Adds a touch of heavy cream to the sauce for a richer, more indulgent dish.",
        keyIngredients: ["Heavy cream", "Parmesan cheese", "Garlic"]
      },
      {
        name: "Scampi with Zucchini Noodles",
        description: "A low-carb version that substitutes spiralized zucchini for pasta.",
        keyIngredients: ["Zucchini noodles", "Cherry tomatoes", "Fresh basil"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Shrimp cook very quickly and continue to cook in residual heat, so removing them from the pan while making the sauce prevents overcooking.",
        "Using pasta water to adjust sauce consistency adds starch that helps the sauce cling to the pasta.",
        "Acids like lemon juice and wine balance the richness of butter and enhance the flavor of seafood."
      ],
      commonIssues: [
        "Overcooking shrimp makes them tough and rubbery instead of tender and succulent.",
        "Burning garlic creates a bitter taste that can ruin the dish.",
        "Adding cold pasta to the sauce can cool it too much; having everything ready at the same time is key."
      ]
    },
    culturalContext: {
      origin: "Italian-American cuisine",
      history: "Despite its Italian name ('scampi' refers to langoustines in Italian cuisine), shrimp scampi is primarily an American creation. Italian immigrants in the United States adapted their traditional preparation methods for langoustines to locally available shrimp. The dish gained popularity in Italian-American restaurants in the mid-20th century.",
      significance: "Represents the adaptation and evolution of Italian cooking techniques in America.",
      traditionalServing: "Typically served as a main course over pasta or with bread for dipping into the sauce.",
      occasions: ["Dinner parties", "Date nights", "Restaurant dining", "Quick weeknight dinners"],
      festiveRelevance: ["Italian-American gatherings", "Special dinners", "Romantic meals"]
    },
    successIndicators: [
      "Shrimp should be pink, opaque, and tender, not rubbery or translucent",
      "Sauce should be light and silky, coating the pasta without being too oily or watery",
      "Garlic should be fragrant but not burnt",
      "Flavors should be balanced between garlic, butter, wine, and lemon"
    ]
  },
  {
    foodName: "Chocolate Chip Muffins",
    description: "Moist, tender muffins studded with chocolate chips, perfect for breakfast, snacks, or dessert. These crowd-pleasing treats combine the comfort of traditional muffins with the indulgence of chocolate.",
    tags: ["Baking", "Breakfast", "Snack", "Dessert", "Chocolate", "Muffins", "Quick Bread"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/30/57/69/picWnp0ow.jpg",
    recipes: [
      {
        title: "Bakery-Style Chocolate Chip Muffins",
        description: "Tender, domed muffins with a soft interior and plenty of chocolate chips throughout.",
        ingredients: [
          "2 1/2 cups all-purpose flour",
          "1 tablespoon baking powder",
          "1 teaspoon baking soda",
          "1/2 teaspoon salt",
          "1/2 cup unsalted butter, softened",
          "1 cup granulated sugar",
          "2 large eggs",
          "1 cup plain yogurt or sour cream",
          "2 teaspoons vanilla extract",
          "1 1/2 cups semi-sweet chocolate chips, divided",
          "Coarse sugar for sprinkling (optional)"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C). Line a 12-cup muffin tin with paper liners or spray with non-stick cooking spray.",
          "In a medium bowl, whisk together flour, baking powder, baking soda, and salt.",
          "In a large bowl, cream together butter and sugar until light and fluffy, about 2-3 minutes.",
          "Add eggs one at a time, beating well after each addition. Stir in yogurt (or sour cream) and vanilla.",
          "Gradually fold the dry ingredients into the wet ingredients, mixing just until combined. Do not overmix.",
          "Fold in 1 1/4 cups of chocolate chips, reserving the remaining 1/4 cup for topping.",
          "Divide batter evenly among the muffin cups, filling each about 3/4 full.",
          "Sprinkle the tops with the reserved chocolate chips and coarse sugar, if using.",
          "Bake for 5 minutes at 375°F (190°C), then reduce the oven temperature to 350°F (175°C) and continue baking for 15-18 minutes, or until a toothpick inserted into the center comes out clean or with just a few moist crumbs.",
          "Allow muffins to cool in the pan for 5 minutes, then transfer to a wire rack to cool completely.",
          "Store in an airtight container at room temperature for up to 3 days, or freeze for longer storage."
        ],
        prepTime: "15 minutes",
        cookTime: "20 minutes",
        totalTime: "35 minutes",
        servings: "12 muffins",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 340,
          protein: "5g",
          carbs: "47g",
          fats: "16g",
          fiber: "2g",
          sugar: "28g",
          sodium: "280mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Fresh Fruit",
        description: "A side of fresh berries or sliced fruit adds color and balance to the sweet muffins."
      },
      {
        name: "Yogurt",
        description: "Plain or vanilla yogurt complements the chocolate flavor and adds protein."
      },
      {
        name: "Coffee or Milk",
        description: "A hot cup of coffee or cold glass of milk pairs perfectly with these muffins."
      }
    ],
    variations: [
      {
        name: "Double Chocolate Chip Muffins",
        description: "Adds cocoa powder to the batter for an extra chocolatey experience.",
        keyIngredients: ["Cocoa powder", "Chocolate chips", "Espresso powder"]
      },
      {
        name: "Banana Chocolate Chip Muffins",
        description: "Incorporates mashed ripe bananas for natural sweetness and moisture.",
        keyIngredients: ["Ripe bananas", "Cinnamon", "Chocolate chips"]
      },
      {
        name: "Chocolate Chip Streusel Muffins",
        description: "Topped with a cinnamon-sugar streusel for added texture and flavor.",
        keyIngredients: ["Brown sugar", "Cinnamon", "Butter"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Starting with a higher oven temperature helps create the signature muffin dome, while finishing at a lower temperature ensures even baking.",
        "Yogurt or sour cream adds moisture and activates the baking soda for proper rise.",
        "Minimal mixing prevents the development of gluten, which would make muffins tough instead of tender."
      ],
      commonIssues: [
        "Overmixing the batter results in dense, tunnel-filled muffins instead of light, tender ones.",
        "Using cold ingredients can prevent proper creaming and incorporation, leading to uneven texture.",
        "Baking at too low a temperature can prevent the characteristic dome from forming."
      ]
    },
    culturalContext: {
      origin: "United States/United Kingdom",
      history: "Muffins have been part of Anglo-American baking traditions for centuries, though early versions were quite different. The quick bread style of muffins we know today developed in the early 20th century with the availability of chemical leaveners. Chocolate chip muffins gained popularity in the late 20th century, capitalizing on America's love of chocolate chip cookies.",
      significance: "Represents the versatility of American quick breads and the casual approach to breakfast/snacking.",
      traditionalServing: "Served as a breakfast item, afternoon snack, or part of a brunch spread.",
      occasions: ["Breakfast", "Brunch", "Coffee breaks", "Bake sales", "On-the-go snacks"],
      festiveRelevance: ["Bake sales", "School functions", "Casual gatherings"]
    },
    successIndicators: [
      "Muffins should have a domed top with a slightly golden color",
      "Interior should be moist and tender, not dry or dense",
      "Chocolate chips should be evenly distributed throughout",
      "The texture should be soft but with good structure, not crumbly or gummy"
    ]
  },
  {
    foodName: "Beef Bourguignon",
    description: "A classic French stew featuring beef slowly braised in red wine with mushrooms, onions, and carrots. This elegant yet rustic dish is known for its rich, complex flavors and tender meat.",
    tags: ["French", "Beef", "Stew", "Wine", "Braised", "Comfort Food", "Dinner", "Main Course"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/79/94/4/X4QBQyhTRrKhkqmAtJlQ_beef%2520bourguignon%25205.jpg",
    recipes: [
      {
        title: "Classic Beef Bourguignon",
        description: "A traditional French beef stew braised in red wine with bacon, mushrooms, and pearl onions.",
        ingredients: [
          "8 ounces bacon, diced",
          "3 pounds beef chuck, cut into 2-inch cubes",
          "Salt and black pepper",
          "2 large carrots, sliced",
          "1 large onion, diced",
          "2 cloves garlic, minced",
          "1 tablespoon tomato paste",
          "3 tablespoons all-purpose flour",
          "1 bottle (750ml) dry red wine (preferably Burgundy or Pinot Noir)",
          "2 cups beef stock",
          "1 bouquet garni (thyme, parsley, and bay leaf tied together)",
          "1 pound small white mushrooms, quartered",
          "1 pound pearl onions, peeled (frozen is fine)",
          "2 tablespoons butter",
          "1 tablespoon olive oil",
          "Fresh parsley, chopped (for garnish)"
        ],
        instructions: [
          "Preheat oven to 325°F (165°C).",
          "In a large Dutch oven, cook bacon over medium heat until crispy. Remove with a slotted spoon and set aside, leaving the fat in the pot.",
          "Pat beef dry and season with salt and pepper. Working in batches, brown beef on all sides in the bacon fat, about 3-4 minutes per batch. Transfer to a plate.",
          "Add carrots and diced onion to the pot. Cook until softened, about 5 minutes. Add garlic and cook for 30 seconds more.",
          "Stir in tomato paste and cook for 1 minute. Sprinkle flour over vegetables and stir to coat.",
          "Slowly add wine, stirring constantly to prevent lumps. Add beef stock and bring to a simmer.",
          "Return beef and bacon to the pot. Add bouquet garni and season with salt and pepper.",
          "Cover and transfer to the oven. Cook for 2-2.5 hours, until beef is very tender.",
          "While the stew is in the oven, prepare the mushrooms and pearl onions: In a large skillet, melt 1 tablespoon butter with 1 tablespoon olive oil. Sauté mushrooms until browned and tender, about 5-7 minutes. In the same skillet, sauté pearl onions until browned, about 5 minutes. Set aside.",
          "When the beef is tender, remove the pot from the oven. Skim off any excess fat from the surface.",
          "Stir in the sautéed mushrooms and pearl onions. Place over medium heat and simmer uncovered for 15 minutes to blend flavors and reduce sauce if needed.",
          "Remove bouquet garni. Taste and adjust seasoning with salt and pepper.",
          "Serve hot, garnished with fresh parsley, with crusty bread, mashed potatoes, or egg noodles."
        ],
        prepTime: "45 minutes",
        cookTime: "3 hours",
        totalTime: "3 hours 45 minutes",
        servings: "6-8 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 580,
          protein: "40g",
          carbs: "12g",
          fats: "32g",
          fiber: "2g",
          sugar: "4g",
          sodium: "740mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Mashed Potatoes",
        description: "Creamy mashed potatoes are the perfect foundation for the rich sauce."
      },
      {
        name: "Crusty French Bread",
        description: "A loaf of crusty bread is essential for sopping up the flavorful sauce."
      },
      {
        name: "Simple Green Salad",
        description: "A light green salad with a vinaigrette dressing offers a refreshing contrast."
      }
    ],
    variations: [
      {
        name: "Slow Cooker Beef Bourguignon",
        description: "Adapts the classic recipe for a slow cooker for convenience and hands-off cooking.",
        keyIngredients: ["Beef chuck", "Red wine", "Pearl onions"]
      },
      {
        name: "Vegetable-Forward Bourguignon",
        description: "Adds extra vegetables like parsnips, celery root, or turnips for more flavor and nutrition.",
        keyIngredients: ["Root vegetables", "Beef chuck", "Burgundy wine"]
      },
      {
        name: "Modern Beef Bourguignon",
        description: "A simplified version that streamlines some traditional steps while maintaining key flavors.",
        keyIngredients: ["Beef stock concentrate", "Pre-peeled pearl onions", "Quality red wine"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Long, slow cooking breaks down tough collagen in the beef, transforming it to gelatin for fork-tender meat.",
        "Wine's acidity helps tenderize the meat while its complex flavors infuse the sauce.",
        "Sautéing mushrooms separately prevents them from releasing water into the stew and gives them better texture."
      ],
      commonIssues: [
        "Using a poor-quality wine can result in bitter or unpleasant flavors in the final dish.",
        "Cooking at too high a temperature can make the meat tough and the sauce too reduced.",
        "Not properly browning the meat results in less developed flavor and color."
      ]
    },
    culturalContext: {
      origin: "Burgundy region of France",
      history: "Beef Bourguignon (or Boeuf Bourguignon) originated as a peasant dish in the Burgundy region of France, where wine is a significant part of the culture. The recipe was elevated and popularized internationally by Julia Child in her 1961 cookbook 'Mastering the Art of French Cooking' and her television show.",
      significance: "Represents the French tradition of transforming simple ingredients into extraordinary dishes through technique and patience.",
      traditionalServing: "Served as a main course for dinner, especially for special occasions or Sunday meals.",
      occasions: ["Special dinners", "French-themed meals", "Cold weather dining", "Dinner parties"],
      festiveRelevance: ["Holiday dinners", "Special family gatherings", "Winter celebrations"]
    },
    successIndicators: [
      "Beef should be very tender, easily pulled apart with a fork",
      "Sauce should be rich and silky, not too thin or too thick",
      "Vegetables should be tender but not mushy",
      "The dish should have a deep color and complex, well-developed flavor"
    ]
  },
  {
    foodName: "Peanut Butter Cookies",
    description: "Classic cookies made with peanut butter, featuring a distinctive crisscross pattern on top. These sweet treats offer a perfect balance of sweet and salty flavors with a tender, slightly chewy texture.",
    tags: ["Cookies", "Dessert", "Baking", "Peanut Butter", "American", "Sweet", "Snack"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/10/12/10/a9tAxUMhTlaOfZDnUbkN_pbcookies.jpg",
    recipes: [
      {
        title: "Classic Peanut Butter Cookies",
        description: "Soft, chewy peanut butter cookies with the traditional crisscross pattern and perfect sweet-salty balance.",
        ingredients: [
          "1 cup unsalted butter, softened",
          "1 cup creamy peanut butter",
          "1 cup granulated sugar",
          "1 cup packed brown sugar",
          "2 large eggs",
          "1 teaspoon vanilla extract",
          "2 1/2 cups all-purpose flour",
          "1 teaspoon baking powder",
          "1 1/2 teaspoons baking soda",
          "1/2 teaspoon salt",
          "Additional granulated sugar for rolling"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
          "In a large bowl, cream together butter, peanut butter, granulated sugar, and brown sugar until light and fluffy, about 3 minutes.",
          "Beat in eggs one at a time, then stir in vanilla.",
          "In a separate bowl, whisk together flour, baking powder, baking soda, and salt.",
          "Gradually add dry ingredients to the peanut butter mixture, mixing just until combined.",
          "Shape dough into 1-inch balls (about 1 tablespoon of dough each). Roll each ball in additional granulated sugar.",
          "Place cookies 2 inches apart on prepared baking sheets.",
          "Using a fork, press a crisscross pattern into each cookie, flattening slightly.",
          "Bake for 8-10 minutes, until edges are lightly golden. Do not overbake; cookies will appear soft but will set as they cool.",
          "Let cookies cool on baking sheets for 5 minutes before transferring to wire racks to cool completely.",
          "Store in an airtight container at room temperature for up to 1 week."
        ],
        prepTime: "20 minutes",
        cookTime: "10 minutes",
        totalTime: "30 minutes",
        servings: "4 dozen cookies",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 140,
          protein: "3g",
          carbs: "16g",
          fats: "7g",
          fiber: "1g",
          sugar: "10g",
          sodium: "95mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Cold Milk",
        description: "A glass of cold milk is the classic beverage pairing for cookies."
      },
      {
        name: "Vanilla Ice Cream",
        description: "Sandwich a scoop of vanilla ice cream between two cookies for a special treat."
      },
      {
        name: "Hot Chocolate",
        description: "A mug of hot chocolate offers a cozy companion to these sweet-salty cookies."
      }
    ],
    variations: [
      {
        name: "Chocolate Chip Peanut Butter Cookies",
        description: "Adds chocolate chips to the dough for a delicious chocolate-peanut butter combination.",
        keyIngredients: ["Chocolate chips", "Peanut butter", "Brown sugar"]
      },
      {
        name: "Peanut Butter Blossoms",
        description: "Tops each cookie with a chocolate kiss pressed into the center after baking.",
        keyIngredients: ["Chocolate kisses", "Peanut butter", "Granulated sugar"]
      },
      {
        name: "Gluten-Free Peanut Butter Cookies",
        description: "A simplified version made without flour, often using just peanut butter, sugar, and egg.",
        keyIngredients: ["Peanut butter", "Sugar", "Egg"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "The high fat content from both butter and peanut butter creates a tender, rich cookie.",
        "Pressing with a fork before baking not only creates the signature pattern but helps the thick dough cook evenly.",
        "The combination of baking powder and baking soda provides the perfect rise and texture."
      ],
      commonIssues: [
        "Overbaking makes cookies hard instead of chewy; they should still look slightly underdone in the center when removed.",
        "Using natural peanut butter (with separated oils) can affect texture; traditional commercial peanut butter works best.",
        "Too much flour can make cookies dry and crumbly; measure accurately or weigh ingredients."
      ]
    },
    culturalContext: {
      origin: "United States, early 20th century",
      history: "Peanut butter cookies emerged in American cookbooks in the early 1900s, following the commercial production of peanut butter. The distinctive crisscross pattern became standard by the 1930s. Some suggest the pattern helped identify cookies that contained peanuts (for allergy awareness) or helped the thick dough bake evenly.",
      significance: "Represents classic American home baking and the versatility of peanut butter, a uniquely American staple.",
      traditionalServing: "Served as a snack, dessert, or lunchbox treat, often with milk.",
      occasions: ["After-school snacks", "Cookie exchanges", "Bake sales", "Everyday treats"],
      festiveRelevance: ["Bake sales", "Christmas cookie platters", "School functions"]
    },
    successIndicators: [
      "Cookies should be lightly golden on the edges but soft in the center",
      "Texture should be slightly chewy, not hard or crumbly",
      "The crisscross pattern should be distinct but not cause the cookie to split",
      "Flavor should have a good balance of sweetness and peanut butter taste"
    ]
  },
  {
    foodName: "Potato Soup",
    description: "A creamy, hearty soup featuring potatoes, onions, and often bacon or ham. This comforting dish is perfect for cold weather and can range from simple and rustic to rich and loaded with toppings.",
    tags: ["Soup", "Comfort Food", "Potatoes", "Creamy", "Winter", "Dinner", "Lunch"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/15/72/2/JmKpJIpSSeKA6qzYzlRD_potato%20soup-7653.jpg",
    recipes: [
      {
        title: "Loaded Potato Soup",
        description: "A rich, creamy potato soup topped with classic loaded baked potato toppings - bacon, cheese, green onions, and sour cream.",
        ingredients: [
          "6 slices bacon, diced",
          "1 large onion, diced",
          "2 cloves garlic, minced",
          "1/4 cup all-purpose flour",
          "2 pounds russet potatoes, peeled and diced into 1/2-inch cubes",
          "4 cups chicken broth",
          "1 cup whole milk",
          "1/2 cup heavy cream",
          "1 teaspoon salt, or to taste",
          "1/2 teaspoon black pepper",
          "1/4 teaspoon dried thyme",
          "1 bay leaf",
          "For toppings:",
          "1 1/2 cups shredded cheddar cheese",
          "1/2 cup sour cream",
          "4 green onions, thinly sliced",
          "Additional cooked bacon bits"
        ],
        instructions: [
          "In a large Dutch oven or soup pot, cook bacon over medium heat until crisp. Remove with a slotted spoon to a paper towel-lined plate. Reserve about 2 tablespoons of bacon fat in the pot.",
          "Add onion to the pot and cook in the bacon fat until softened, about 5 minutes. Add garlic and cook for 30 seconds more, until fragrant.",
          "Sprinkle flour over the onions and garlic, stirring constantly for 1-2 minutes to cook the flour.",
          "Gradually add chicken broth, stirring constantly to prevent lumps.",
          "Add potatoes, milk, salt, pepper, thyme, and bay leaf. Bring to a boil, then reduce heat to low and simmer, covered, for 15-20 minutes, until potatoes are very tender.",
          "Remove bay leaf. Using a potato masher or immersion blender, mash or blend some of the potatoes until soup reaches desired consistency. For a smoother soup, blend more; for a chunkier soup, blend less.",
          "Stir in heavy cream and half of the cooked bacon. Heat through but do not boil.",
          "Taste and adjust seasoning with additional salt and pepper if needed.",
          "Ladle soup into bowls and top each serving with shredded cheddar cheese, a dollop of sour cream, sliced green onions, and remaining bacon bits."
        ],
        prepTime: "15 minutes",
        cookTime: "30 minutes",
        totalTime: "45 minutes",
        servings: "6 servings",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 380,
          protein: "12g",
          carbs: "35g",
          fats: "22g",
          fiber: "3g",
          sugar: "4g",
          sodium: "820mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Crusty Bread",
        description: "A loaf of crusty bread or artisan rolls for dipping in the soup."
      },
      {
        name: "Simple Green Salad",
        description: "A crisp green salad with a light vinaigrette provides balance to the rich soup."
      },
      {
        name: "Ham and Cheese Sandwich",
        description: "The classic soup and sandwich pairing for a complete meal."
      }
    ],
    variations: [
      {
        name: "Cheesy Cauliflower Potato Soup",
        description: "Adds cauliflower for extra nutrition and a lighter version.",
        keyIngredients: ["Cauliflower", "Sharp cheddar", "Potatoes"]
      },
      {
        name: "Ham and Potato Soup",
        description: "Features diced ham instead of bacon for a heartier soup.",
        keyIngredients: ["Diced ham", "Potatoes", "Chicken broth"]
      },
      {
        name: "Vegan Potato Leek Soup",
        description: "A dairy-free version using leeks and vegetable broth.",
        keyIngredients: ["Leeks", "Coconut milk", "Vegetable broth"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Starchy potatoes like russets break down more easily, helping to naturally thicken the soup.",
        "Starting with a roux (flour cooked in fat) creates a stable base for a creamy soup that won't separate.",
        "Partially blending the soup while leaving some chunks creates an ideal texture with body and interest."
      ],
      commonIssues: [
        "Boiling the soup after adding dairy can cause it to separate or curdle.",
        "Undercooking the potatoes results in a grainy texture instead of creamy smoothness.",
        "Not starting with enough salt can result in bland flavor that's difficult to correct later."
      ]
    },
    culturalContext: {
      origin: "European, with variations across many cultures",
      history: "Potato soups have been staples in European cuisines since potatoes became widely available in the 17th century. The 'loaded' version with bacon, cheese, and sour cream was inspired by loaded baked potatoes, becoming popular in American cuisine in the late 20th century, especially in casual restaurants and home cooking.",
      significance: "Represents comfort food traditions and the ability to create satisfying meals from simple, affordable ingredients.",
      traditionalServing: "Served hot as a starter or main course, especially during colder months.",
      occasions: ["Winter meals", "Casual dinners", "Comfort food occasions", "Lunch with sandwiches"],
      festiveRelevance: ["Not typically associated with holidays, but popular in cold weather seasons"]
    },
    successIndicators: [
      "Soup should be creamy and thick but still spoonable, not gluey",
      "Potatoes should be fully cooked but some texture should remain (unless a completely smooth soup is desired)",
      "Flavor should be well-seasoned with a good balance of potato taste and savory elements",
      "Toppings should add complementary flavors and textural contrast"
    ]
  }
];