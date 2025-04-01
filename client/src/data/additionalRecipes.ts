import { AnalyzeImageResponse, YoutubeVideo } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

// New recipes from TheMealDB
export const theMealDBRecipes: AnalyzeImageResponse[] = [
  {
    foodName: "Beef Wellington",
    description: "Beef Wellington is a classic British dish, consisting of a tender fillet of beef coated with pâté (often pâté de foie gras) and duxelles, wrapped in puff pastry and baked. The dish is named after Arthur Wellesley, 1st Duke of Wellington, with some sources suggesting the dish was created to honor his victory at the Battle of Waterloo in 1815.",
    tags: ["British", "Beef", "Elegant", "Special Occasion", "Baked"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Classic Beef Wellington",
        description: "This elegant Beef Wellington features a tender beef fillet coated with mushroom duxelles, wrapped in prosciutto and golden puff pastry. It's a showstopping centerpiece for special occasions, offering complex flavors and textures that make it worth the effort.",
        prepTime: "45 minutes",
        cookTime: "40 minutes",
        totalTime: "1 hour 25 minutes (plus chilling time)",
        servings: 6,
        servingSize: "1 slice (approx. 6 oz)",
        difficulty: "Challenging",
        tags: ["British", "Beef", "Elegant", "Special Occasion", "Baked"],
        ingredients: [
          "2-2.5 lb beef tenderloin center cut",
          "2 tbsp olive oil",
          "Salt and freshly ground black pepper",
          "2 tbsp Dijon mustard",
          "1 lb mushrooms (cremini or button), finely chopped",
          "4 shallots, finely chopped",
          "4 cloves garlic, minced",
          "2 tbsp fresh thyme leaves",
          "8-10 slices prosciutto or parma ham",
          "1 package puff pastry, thawed (about 14 oz)",
          "1 large egg, beaten",
          "2 tbsp unsalted butter"
        ],
        instructions: [
          "Heat a large skillet over high heat. Pat the beef tenderloin dry with paper towels and season generously with salt and pepper.",
          "Add olive oil to the hot skillet. Sear the beef on all sides until browned, about 2-3 minutes per side. Remove from heat and let cool slightly.",
          "Brush the tenderloin with Dijon mustard on all sides. Place in the refrigerator while preparing the mushroom mixture.",
          "In the same skillet, melt butter over medium heat. Add shallots and cook until softened, about 3 minutes.",
          "Add mushrooms, garlic, and thyme. Cook until mushrooms have released their moisture and it has evaporated, about 10 minutes. Season with salt and pepper. Remove from heat and let cool completely.",
          "Lay a large piece of plastic wrap on your work surface. Arrange the prosciutto slices in a rectangle that's large enough to wrap around the beef tenderloin, slightly overlapping each slice.",
          "Spread the mushroom mixture evenly over the prosciutto.",
          "Place the beef tenderloin on top of the mushroom mixture. Use the plastic wrap to help roll the prosciutto and mushroom mixture tightly around the beef. Twist the ends of the plastic wrap to secure. Refrigerate for 30 minutes.",
          "Preheat oven to 400°F (200°C).",
          "Roll out the puff pastry on a lightly floured surface to a rectangle large enough to wrap around the beef.",
          "Unwrap the beef from the plastic wrap and place in the center of the puff pastry. Fold the pastry around the beef, trimming any excess. Seal the edges with beaten egg.",
          "Place the Wellington seam-side down on a baking sheet lined with parchment paper. Brush the entire pastry with beaten egg. Using a sharp knife, score the top of the pastry with a decorative pattern, being careful not to cut all the way through.",
          "Bake for 35-40 minutes for medium-rare beef (internal temperature of 125-130°F), or until the pastry is golden brown.",
          "Let rest for 10 minutes before slicing and serving."
        ],
        chefTips: [
          "Thoroughly cooling the seared beef and mushroom mixture is crucial to prevent the pastry from becoming soggy",
          "For extra flavor, deglaze the pan after searing the beef with a splash of cognac or red wine",
          "Make sure the puff pastry is cold but not frozen when you work with it",
          "A meat thermometer is essential for perfect doneness without cutting into the Wellington"
        ],
        commonMistakes: [
          "Not thoroughly cooling the components before assembly, which causes the pastry to become soggy",
          "Skipping the step of wrapping in prosciutto, which acts as a moisture barrier between the beef and pastry",
          "Rolling the pastry too thin or too thick - aim for about 1/8 inch thickness",
          "Overcooking the beef - remember it will continue cooking once removed from the oven"
        ],
        nutritionInfo: {
          calories: 650,
          protein: "42g",
          carbs: "28g",
          fats: "40g",
          fiber: "2g",
          sugar: "3g",
          sodium: "780mg",
          vitamins: [
            "Iron: 35% DV",
            "Vitamin B12: 60% DV",
            "Zinc: 45% DV"
          ],
          healthyAlternatives: [
            "Use a leaner cut of beef like filet mignon",
            "Opt for whole wheat puff pastry for more fiber",
            "Reduce sodium by using unsalted butter and low-sodium prosciutto"
          ],
          dietaryNotes: [
            "High in protein but also high in saturated fat",
            "Contains gluten from the puff pastry",
            "Rich in B vitamins from the beef"
          ]
        },
        variations: [
          {
            type: "Individual Wellingtons",
            description: "Create single-serving portions with individual filet mignons",
            adjustments: [
              "Use 6 filet mignon steaks (6 oz each) instead of a whole tenderloin",
              "Reduce cooking time to 20-25 minutes",
              "Cut puff pastry into 6 equal pieces and wrap each steak individually"
            ]
          },
          {
            type: "Salmon Wellington",
            description: "A seafood variation using salmon fillets",
            adjustments: [
              "Replace beef with salmon fillets",
              "Swap mushroom duxelles for a mixture of spinach, dill, and cream cheese",
              "Reduce cooking time to 20-25 minutes or until salmon reaches 145°F internally"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Roasted Garlic Mashed Potatoes",
            description: "Creamy potatoes with roasted garlic and a touch of cream",
            preparationTime: "30 minutes",
            pairingReason: "The creamy texture and mild flavor complement the richness of the Wellington"
          },
          {
            name: "Glazed Baby Carrots",
            description: "Tender baby carrots glazed with honey and herbs",
            preparationTime: "20 minutes",
            pairingReason: "Adds a sweet contrast and vibrant color to the plate"
          },
          {
            name: "Red Wine Reduction Sauce",
            description: "A rich sauce made from demi-glace and red wine",
            preparationTime: "15 minutes",
            pairingReason: "Enhances the beef flavor and adds moisture to each bite"
          }
        ],
        storageInstructions: "Leftover Beef Wellington can be stored in an airtight container in the refrigerator for up to 3 days. Note that the pastry will lose some crispness.",
        reheatingMethods: "Reheat in a 350°F (175°C) oven for 10-15 minutes. Avoid using a microwave as it will make the pastry soggy.",
        beveragePairings: [
          "Cabernet Sauvignon or Bordeaux red wine - the tannins pair beautifully with the rich beef",
          "Full-bodied Merlot - complements the mushroom flavors",
          "For non-alcoholic options, try a rich beef broth or cranberry juice with sparkling water"
        ]
      }
    ]
  },
  {
    foodName: "Chicken Tandoori",
    description: "Tandoori Chicken is a popular North Indian dish consisting of chicken marinated in yogurt and spices, then traditionally cooked in a clay oven called a tandoor. The dish's signature vibrant red-orange color comes from the spice mix, which typically includes red chili powder and turmeric. Dating back to the Mughal era, this iconic preparation is known for its smoky flavor and tender meat.",
    tags: ["Indian", "Chicken", "Grilled", "Spicy", "Yogurt"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Authentic Tandoori Chicken",
        description: "This authentic Tandoori Chicken recipe delivers tender, juicy chicken with a smoky flavor and vibrant color. Marinated in yogurt and a blend of aromatic spices, this dish captures the essence of North Indian cuisine and can be made in a regular oven with delicious results.",
        prepTime: "20 minutes (plus 4-24 hours marinating)",
        cookTime: "35 minutes",
        totalTime: "55 minutes (plus marinating time)",
        servings: 4,
        servingSize: "2 pieces",
        difficulty: "Moderate",
        tags: ["Indian", "Chicken", "Grilled", "Spicy"],
        ingredients: [
          "8 chicken pieces (thighs and drumsticks, skin removed)",
          "1 cup plain yogurt",
          "2 tbsp lemon juice",
          "2 tbsp vegetable oil",
          "4 cloves garlic, minced",
          "1 inch piece ginger, grated",
          "2 tbsp tandoori masala spice mix",
          "1 tsp ground cumin",
          "1 tsp ground coriander",
          "1 tsp turmeric powder",
          "1 tsp Kashmiri red chili powder (for color and mild heat)",
          "1 tsp garam masala",
          "Salt to taste",
          "Lemon wedges for serving",
          "Fresh cilantro for garnish",
          "Sliced onions and cucumber for serving"
        ],
        instructions: [
          "Make small cuts in the chicken pieces to allow the marinade to penetrate.",
          "In a large bowl, combine yogurt, lemon juice, oil, garlic, ginger, and all the spices. Mix well to form a smooth marinade.",
          "Add chicken pieces to the marinade, ensuring each piece is well coated. Cover and refrigerate for at least 4 hours, preferably overnight.",
          "Preheat oven to 425°F (220°C). If you have a grill, preheat it as well.",
          "Line a baking sheet with foil and place a wire rack on top. Arrange the marinated chicken pieces on the rack, shaking off excess marinade.",
          "Bake for 20 minutes, then flip the chicken and bake for another 15 minutes until fully cooked and slightly charred on the edges.",
          "If using a grill after baking, place the chicken pieces on the hot grill for 2-3 minutes per side to get the characteristic charred marks and smoky flavor.",
          "Let the chicken rest for 5 minutes before serving.",
          "Garnish with fresh cilantro and serve with lemon wedges, sliced onions, and cucumber."
        ],
        chefTips: [
          "For an authentic tandoor effect, place a metal tray of water at the bottom of the oven to create steam",
          "Baste the chicken with ghee (clarified butter) during the last 5 minutes of cooking for extra flavor",
          "Letting the chicken reach room temperature before cooking helps it cook more evenly",
          "Use bone-in chicken pieces for the most authentic flavor and juiciness"
        ],
        commonMistakes: [
          "Not marinating long enough - the longer the better, with overnight being ideal",
          "Overcooking the chicken, which makes it dry - it should be just cooked through but still juicy",
          "Using regular chili powder instead of Kashmiri chili powder, which provides color without excessive heat",
          "Not making cuts in the chicken, which helps the marinade penetrate deeper"
        ],
        nutritionInfo: {
          calories: 320,
          protein: "28g",
          carbs: "5g",
          fats: "21g",
          fiber: "1g",
          sugar: "3g",
          sodium: "380mg",
          vitamins: [
            "Vitamin A: 15% DV",
            "Vitamin C: 8% DV",
            "Calcium: 12% DV"
          ],
          healthyAlternatives: [
            "Use skinless chicken breast for a leaner version",
            "Replace some of the full-fat yogurt with Greek yogurt for more protein and less fat",
            "Reduce oil to 1 tablespoon for a lower-fat version"
          ],
          dietaryNotes: [
            "High in protein and low in carbs",
            "Contains probiotics from yogurt",
            "Turmeric and other spices have anti-inflammatory properties"
          ]
        },
        variations: [
          {
            type: "Green Tandoori Chicken",
            description: "A herb-infused variation with a vibrant green color",
            adjustments: [
              "Add 1 cup fresh cilantro, 1/2 cup mint leaves, and 2 green chilies to the marinade",
              "Blend all marinade ingredients to make a smooth green paste",
              "Reduce the turmeric and red chili powder by half"
            ]
          },
          {
            type: "Tandoori Fish",
            description: "A seafood version using the same flavorful marinade",
            adjustments: [
              "Replace chicken with 1.5 lbs firm white fish fillets like cod or haddock",
              "Reduce marinating time to 30 minutes to 1 hour (any longer will break down the fish)",
              "Reduce cooking time to 10-12 minutes until fish flakes easily"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Jeera Rice",
            description: "Fragrant basmati rice cooked with cumin seeds",
            preparationTime: "25 minutes",
            pairingReason: "The simple, nutty flavor of cumin rice complements the bold tandoori flavors"
          },
          {
            name: "Cucumber Raita",
            description: "Cool yogurt dip with cucumber, mint, and cumin",
            preparationTime: "10 minutes",
            pairingReason: "Provides a cooling contrast to the warm spices in the chicken"
          },
          {
            name: "Naan Bread",
            description: "Soft, pillowy Indian flatbread",
            preparationTime: "40 minutes (if homemade)",
            pairingReason: "Perfect for scooping up chicken and soaking up juices"
          }
        ],
        storageInstructions: "Store leftover tandoori chicken in an airtight container in the refrigerator for up to 3 days.",
        reheatingMethods: "Reheat in a 350°F (175°C) oven for 10-15 minutes until warmed through. Avoid microwave reheating as it can make the chicken rubbery.",
        beveragePairings: [
          "Indian Lager beer like Kingfisher or Taj Mahal",
          "Mango Lassi - a sweet yogurt drink that balances the spices",
          "Aromatic Gewürztraminer wine whose slight sweetness complements the spices"
        ]
      }
    ]
  },
  {
    foodName: "Tarte Tatin",
    description: "Tarte Tatin is a classic French upside-down caramelized apple tart, reportedly created accidentally in the 1880s by the Tatin sisters at their hotel in France's Loire Valley. The dessert features apples caramelized in butter and sugar, topped with pastry, baked, and then inverted to serve. What began as a kitchen mistake has become one of France's most celebrated desserts, known for its rich caramel flavor and tender fruit.",
    tags: ["French", "Dessert", "Baked", "Caramel", "Apple"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Classic French Tarte Tatin",
        description: "This traditional upside-down caramelized apple tart features buttery, tender apples bathed in amber caramel, topped with flaky pastry that becomes the base when inverted. The contrast between the rich, deeply caramelized apples and the crisp pastry creates an irresistible dessert that's impressive yet surprisingly straightforward to prepare.",
        prepTime: "30 minutes",
        cookTime: "45 minutes",
        totalTime: "1 hour 15 minutes",
        servings: 8,
        servingSize: "1 slice",
        difficulty: "Intermediate",
        tags: ["French", "Dessert", "Baked", "Caramel"],
        ingredients: [
          "6-8 large firm apples (Granny Smith, Honeycrisp, or Braeburn)",
          "1 cup granulated sugar",
          "6 tablespoons unsalted butter",
          "1 pinch of salt",
          "1 teaspoon vanilla extract (optional)",
          "1 teaspoon ground cinnamon (optional)",
          "1 sheet puff pastry, thawed if frozen (or homemade short crust pastry)",
          "Crème fraîche or vanilla ice cream, for serving"
        ],
        instructions: [
          "Peel, quarter, and core the apples. If the apples are very large, cut each quarter in half.",
          "Preheat oven to 375°F (190°C).",
          "In a 9 or 10-inch cast-iron skillet or oven-safe heavy-bottomed pan, spread the sugar evenly.",
          "Place the skillet over medium heat and allow the sugar to melt without stirring (you can gently swirl the pan occasionally).",
          "Once the sugar has melted completely and turned a golden amber color, remove from heat and immediately add the butter, salt, and vanilla if using. Be careful as the mixture will bubble up.",
          "Stir carefully until the butter is incorporated, then return to low heat if the caramel has hardened.",
          "Arrange the apple pieces in the skillet, rounded side down, fitting them tightly together in a circular pattern. Fill any gaps with smaller apple pieces.",
          "Sprinkle with cinnamon if using.",
          "Return the skillet to medium heat and cook for about 10-15 minutes until the apples have softened slightly and absorbed some of the caramel.",
          "Remove from heat and let cool for 5 minutes.",
          "Roll out the puff pastry to about 1/8 inch thickness and cut it into a circle slightly larger than the skillet.",
          "Place the pastry over the apples, tucking the edges down inside the skillet.",
          "Cut a few small vents in the pastry to allow steam to escape.",
          "Bake in the preheated oven for 25-30 minutes, until the pastry is golden brown and puffed.",
          "Remove from oven and let cool for 5-10 minutes.",
          "Run a knife around the edge of the skillet to loosen the tart.",
          "Place a serving plate larger than the skillet over the top and carefully but quickly invert the tart onto the plate.",
          "Serve warm with crème fraîche or vanilla ice cream."
        ],
        chefTips: [
          "The key to a perfect Tarte Tatin is achieving the right caramel color - aim for deep amber, not too dark or it will taste burnt",
          "Use firm apples that hold their shape when cooked - avoid McIntosh or Red Delicious which get too mushy",
          "Let the tart rest a few minutes after baking, but don't wait too long to invert it or the caramel might harden and stick to the pan",
          "If any apple pieces stick to the pan when inverting, simply remove them and place them back on the tart"
        ],
        commonMistakes: [
          "Cooking the caramel too long, causing it to burn and become bitter",
          "Not packing the apples tightly enough, which can cause the tart to collapse when inverted",
          "Cutting the apples too thin, which makes them cook too quickly and lose their shape",
          "Waiting too long to invert the tart, allowing the caramel to harden and stick to the pan"
        ],
        nutritionInfo: {
          calories: 320,
          protein: "2g",
          carbs: "48g",
          fats: "15g",
          fiber: "3g",
          sugar: "36g",
          sodium: "120mg",
          vitamins: [
            "Vitamin C: 8% DV",
            "Vitamin A: 4% DV",
            "Iron: 6% DV"
          ],
          healthyAlternatives: [
            "Reduce the sugar to 3/4 cup for a less sweet version",
            "Use a whole wheat pastry crust instead of puff pastry for more fiber",
            "Add a tablespoon of lemon juice to the caramel for a brighter flavor with less sweetness"
          ],
          dietaryNotes: [
            "High in sugar due to the caramel and natural fruit sugars",
            "Contains gluten from the pastry",
            "Good source of fiber from the apples"
          ]
        },
        variations: [
          {
            type: "Pear Tarte Tatin",
            description: "A variation using pears instead of apples",
            adjustments: [
              "Replace apples with 6-7 firm but ripe Bosc or Anjou pears",
              "Add 1 tablespoon of lemon juice to the caramel",
              "Consider adding a few crushed cardamom pods to the caramel for complementary flavor"
            ]
          },
          {
            type: "Salted Caramel Apple Tarte Tatin",
            description: "A modern twist with the popular salted caramel flavor",
            adjustments: [
              "Increase salt to 1/2 teaspoon for a more pronounced salted caramel flavor",
              "Add 2 tablespoons of heavy cream to the caramel for richness",
              "Sprinkle flaky sea salt on top after inverting the tart"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Vanilla Bean Ice Cream",
            description: "High-quality vanilla ice cream with visible bean specks",
            preparationTime: "0 minutes (store-bought)",
            pairingReason: "The cold, creamy texture perfectly contrasts with the warm, caramelized apples"
          },
          {
            name: "Crème Fraîche",
            description: "Tangy cultured cream",
            preparationTime: "5 minutes",
            pairingReason: "The slight tanginess balances the sweetness of the caramel"
          },
          {
            name: "Calvados Crème Anglaise",
            description: "Vanilla custard sauce with a splash of apple brandy",
            preparationTime: "15 minutes",
            pairingReason: "Enhances the apple flavor while adding a luxurious sauce"
          }
        ],
        storageInstructions: "Tarte Tatin is best consumed the day it's made. If necessary, store at room temperature for up to 24 hours. Do not refrigerate as this will make the pastry soggy.",
        reheatingMethods: "To reheat, warm in a 300°F (150°C) oven for 10 minutes.",
        beveragePairings: [
          "Calvados (apple brandy) - the classic French pairing",
          "Late harvest Riesling or Sauternes - sweet wines that complement the caramel notes",
          "Strong coffee or espresso to balance the sweetness"
        ]
      }
    ]
  },
  {
    foodName: "Irish Stew",
    description: "Irish Stew is a traditional hearty dish from Ireland, historically made with mutton or lamb, potatoes, onions, and parsley. Dating back centuries, it was born of necessity among peasant families utilizing locally available ingredients. The slow-cooking method tenderizes tougher cuts of meat, while root vegetables absorb the rich flavors. This simple, rustic stew has become an iconic comfort food symbolizing Irish culinary heritage.",
    tags: ["Irish", "Stew", "Comfort Food", "Lamb", "One-pot"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Traditional Irish Stew",
        description: "This authentic Irish stew features tender chunks of lamb slowly simmered with potatoes, carrots, and onions until meltingly tender. The result is a rich, hearty meal with a flavorful broth that showcases the natural taste of the ingredients without heavy spices or thickeners - true to the dish's humble origins.",
        prepTime: "20 minutes",
        cookTime: "2 hours 30 minutes",
        totalTime: "2 hours 50 minutes",
        servings: 6,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Irish", "Stew", "Winter", "Lamb", "One-pot"],
        ingredients: [
          "2 pounds boneless lamb shoulder, trimmed and cut into 1.5-inch pieces",
          "Salt and freshly ground black pepper",
          "2 tablespoons vegetable oil",
          "2 large onions, coarsely chopped",
          "4 stalks celery, chopped",
          "2 pounds russet potatoes, peeled and cut into large chunks",
          "1 pound carrots, peeled and cut into large chunks",
          "4 cups low-sodium chicken or beef broth (or water)",
          "2 bay leaves",
          "4 sprigs fresh thyme",
          "1/4 cup fresh parsley, chopped (plus more for garnish)",
          "1 tablespoon Worcestershire sauce (optional)",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Season the lamb generously with salt and pepper.",
          "Heat oil in a large heavy-bottomed pot or Dutch oven over medium-high heat.",
          "Working in batches, add the lamb to the pot and brown on all sides, about 8 minutes per batch. Transfer browned meat to a plate.",
          "Add onions and celery to the same pot and cook until softened, about 5 minutes, scraping up any browned bits from the bottom of the pot.",
          "Return the lamb and any accumulated juices to the pot. Add the broth, bay leaves, and thyme.",
          "Bring to a boil, then reduce heat to low. Cover and simmer gently for 1 hour.",
          "Add the potatoes and carrots to the pot, and season with salt and pepper.",
          "Cover and continue to simmer until the meat is very tender and the vegetables are cooked through, about 1 to 1.5 hours more.",
          "During the last 10 minutes of cooking, stir in the parsley and Worcestershire sauce if using.",
          "Remove bay leaves and thyme sprigs before serving.",
          "Ladle into bowls and garnish with additional fresh parsley."
        ],
        chefTips: [
          "For the most authentic flavor, use lamb shoulder or neck instead of leg meat, which has more connective tissue that breaks down during long cooking",
          "Don't rush the browning process - it's key to developing depth of flavor",
          "If the stew is too liquidy, remove the lid during the last 30 minutes of cooking to allow it to reduce",
          "Some traditional Irish cooks add a small turnip or parsnip for additional flavor"
        ],
        commonMistakes: [
          "Using lean cuts of lamb that become tough with long cooking - fattier cuts work best for stew",
          "Cutting the vegetables too small, which causes them to disintegrate during the long cooking time",
          "Adding too many herbs and spices, which overwhelms the natural flavors of the ingredients",
          "Not allowing enough time for slow simmering, which is essential for tenderizing the meat"
        ],
        nutritionInfo: {
          calories: 420,
          protein: "28g",
          carbs: "40g",
          fats: "16g",
          fiber: "6g",
          sugar: "8g",
          sodium: "380mg",
          vitamins: [
            "Vitamin A: 180% DV",
            "Vitamin C: 35% DV",
            "Iron: 25% DV"
          ],
          healthyAlternatives: [
            "Use lean beef instead of lamb for less fat",
            "Leave the skin on the potatoes for extra fiber",
            "Add extra vegetables like mushrooms or leeks for more nutrients"
          ],
          dietaryNotes: [
            "Naturally gluten-free (if using gluten-free broth and Worcestershire sauce)",
            "High in protein and fiber",
            "Rich in vitamins A and C from the carrots and celery"
          ]
        },
        variations: [
          {
            type: "Beef Irish Stew",
            description: "A variation using beef instead of traditional lamb",
            adjustments: [
              "Replace lamb with 2 pounds of beef chuck, cut into 1.5-inch pieces",
              "Add 1 cup of Guinness stout beer (reduce broth by 1 cup)",
              "Add 1 tablespoon of tomato paste for depth of flavor"
            ]
          },
          {
            type: "Vegetarian Irish Stew",
            description: "A hearty meatless version",
            adjustments: [
              "Omit the lamb and use 8 ounces of mushrooms (cremini or portobello) for umami flavor",
              "Use vegetable broth instead of chicken/beef broth",
              "Add 1 cup of green cabbage, chopped, in the last 30 minutes of cooking",
              "Add 1 cup of cooked white beans for protein"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Irish Soda Bread",
            description: "Traditional quick bread made with buttermilk and baking soda",
            preparationTime: "15 minutes (plus 45 minutes baking)",
            pairingReason: "Perfect for sopping up the flavorful broth of the stew"
          },
          {
            name: "Colcannon",
            description: "Creamy mashed potatoes with kale or cabbage and butter",
            preparationTime: "30 minutes",
            pairingReason: "A traditional Irish side that complements the hearty flavors of the stew"
          },
          {
            name: "Simple Green Salad",
            description: "Mixed greens with a light vinaigrette dressing",
            preparationTime: "10 minutes",
            pairingReason: "Provides a fresh contrast to the rich stew"
          }
        ],
        storageInstructions: "Store cooled Irish stew in an airtight container in the refrigerator for up to 3 days. The flavor often improves after a day as the ingredients meld together.",
        reheatingMethods: "Reheat gently on the stovetop over medium-low heat until hot, adding a splash of broth if needed to thin. Alternatively, microwave individual portions on medium power, stirring occasionally.",
        beveragePairings: [
          "Guinness Stout or other dark Irish beer - the traditional pairing",
          "Smooth Irish whiskey like Jameson",
          "Full-bodied red wine such as Cabernet Sauvignon or Syrah"
        ]
      }
    ]
  },
  {
    foodName: "Ratatouille",
    description: "Ratatouille is a vibrant vegetable stew originating from Provence in southeastern France. Dating back to the 18th century, this rustic dish was traditionally made by poor farmers using summer vegetables from their gardens, including eggplant, tomatoes, zucchini, bell peppers, and aromatic herbs. The name comes from the Occitan word 'ratatolha,' meaning to stir up. Today, it remains a celebration of Mediterranean produce and a symbol of Provençal cuisine.",
    tags: ["French", "Vegetarian", "Mediterranean", "Summer", "Stew"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Provençal Ratatouille",
        description: "This authentic ratatouille features vibrant summer vegetables slowly simmered with olive oil, garlic, and herbs to create a rich, complex flavor. Each vegetable maintains its integrity while contributing to the harmonious whole. Served warm or at room temperature, this versatile dish can be a main course, side dish, or even breakfast topped with a poached egg.",
        prepTime: "30 minutes",
        cookTime: "1 hour",
        totalTime: "1 hour 30 minutes",
        servings: 6,
        servingSize: "1 cup",
        difficulty: "Intermediate",
        tags: ["French", "Vegetarian", "Mediterranean", "Gluten-free", "Vegan"],
        ingredients: [
          "1 large eggplant (about 1 lb), cut into 1-inch cubes",
          "2 medium zucchini, cut into 1-inch cubes",
          "2 medium yellow squash, cut into 1-inch cubes",
          "2 red bell peppers, seeded and cut into 1-inch pieces",
          "1 large onion, chopped",
          "4 large ripe tomatoes, peeled, seeded, and roughly chopped (or 1 28-oz can whole peeled tomatoes, drained and chopped)",
          "6 cloves garlic, minced",
          "1/4 cup olive oil, plus more as needed",
          "2 bay leaves",
          "3 sprigs fresh thyme (or 1 teaspoon dried)",
          "2 sprigs fresh rosemary (or 1/2 teaspoon dried)",
          "1/4 cup fresh basil leaves, torn, plus more for garnish",
          "2 tablespoons fresh parsley, chopped",
          "1 tablespoon tomato paste (optional, for deeper flavor)",
          "Salt and freshly ground black pepper to taste",
          "1 teaspoon sugar (optional, to balance acidity)"
        ],
        instructions: [
          "Place the eggplant cubes in a colander, sprinkle with salt, and let sit for 30 minutes to release bitter juices. Rinse and pat dry with paper towels.",
          "Heat 2 tablespoons of olive oil in a large, heavy-bottomed pot or Dutch oven over medium heat.",
          "Add the onions and cook until softened and translucent, about 5 minutes.",
          "Add the garlic and cook for another minute until fragrant.",
          "Add the bell peppers and cook for 5 minutes until slightly softened.",
          "Add the eggplant, zucchini, and yellow squash with a bit more olive oil if needed. Cook for 5-7 minutes, stirring occasionally.",
          "Add the tomatoes, tomato paste (if using), bay leaves, thyme, and rosemary. Season with salt, pepper, and sugar if using.",
          "Bring to a simmer, then reduce heat to low. Cover partially and cook gently for about 45 minutes, stirring occasionally, until all vegetables are tender but not mushy and the flavors have melded.",
          "Remove from heat and stir in the fresh basil and parsley. Remove bay leaves and herb sprigs.",
          "Let stand for at least 15 minutes before serving to allow flavors to develop further.",
          "Serve warm, at room temperature, or cold, garnished with additional fresh basil and a drizzle of olive oil."
        ],
        chefTips: [
          "Cook each vegetable separately before combining for the best texture and flavor - though the one-pot method in this recipe is a good compromise for home cooks",
          "Use the ripest summer tomatoes you can find for the best flavor, or good quality canned San Marzano tomatoes out of season",
          "A splash of good red wine vinegar at the end can brighten the flavors",
          "For the traditional Provençal flavor, use herbs de Provence instead of the individual herbs"
        ],
        commonMistakes: [
          "Overcooking the vegetables until they're mushy - each should retain some texture and identity",
          "Adding all vegetables at once instead of layering them in, which doesn't allow each to develop proper flavor",
          "Using too little olive oil - this is a dish that celebrates olive oil",
          "Skipping the step of salting the eggplant, which helps remove bitterness and improves texture"
        ],
        nutritionInfo: {
          calories: 180,
          protein: "4g",
          carbs: "20g",
          fats: "12g",
          fiber: "7g",
          sugar: "12g",
          sodium: "320mg",
          vitamins: [
            "Vitamin C: 180% DV",
            "Vitamin A: 45% DV",
            "Vitamin K: 30% DV"
          ],
          healthyAlternatives: [
            "Reduce oil to 2-3 tablespoons for a lower-fat version",
            "Roast the vegetables instead of sautéing for less oil and deeper flavor",
            "Use less salt and more herbs and garlic for flavor"
          ],
          dietaryNotes: [
            "Naturally vegan, vegetarian, and gluten-free",
            "High in fiber and antioxidants",
            "Low in calories and high in nutrients - excellent for weight management"
          ]
        },
        variations: [
          {
            type: "Ratatouille Tian",
            description: "A more elegant, layered presentation made famous by the Pixar film",
            adjustments: [
              "Slice vegetables very thinly instead of cubing them",
              "Make a tomato sauce base with onions, garlic, and crushed tomatoes",
              "Arrange vegetable slices in overlapping circles on top of the sauce",
              "Bake in a 375°F oven for 45-60 minutes instead of simmering"
            ]
          },
          {
            type: "Grilled Ratatouille",
            description: "A smoky summer version using the grill",
            adjustments: [
              "Cut vegetables into larger pieces suitable for grilling",
              "Brush with olive oil and grill until slightly charred",
              "Chop grilled vegetables and combine with fresh tomato sauce",
              "Add a pinch of smoked paprika to enhance the grilled flavor"
            ]
          }
        ],
        sideDishSuggestions: [
          {
            name: "Crusty Baguette",
            description: "Traditional French bread with a crisp crust and soft interior",
            preparationTime: "5 minutes (if purchased)",
            pairingReason: "Perfect for sopping up the flavorful juices"
          },
          {
            name: "Creamy Polenta",
            description: "Soft cornmeal porridge enriched with butter and Parmesan",
            preparationTime: "25 minutes",
            pairingReason: "Creates a heartier meal while providing a neutral base for the vibrant ratatouille flavors"
          },
          {
            name: "Grilled Fish",
            description: "Simply seasoned white fish like sea bass or branzino",
            preparationTime: "15 minutes",
            pairingReason: "Traditional Mediterranean pairing that makes for a complete protein-rich meal"
          }
        ],
        storageInstructions: "Ratatouille improves with time as flavors meld. Store in an airtight container in the refrigerator for up to 5 days, or freeze for up to 3 months.",
        reheatingMethods: "Gently reheat on the stovetop over medium-low heat. Alternatively, microwave on medium power, stirring occasionally. Bring to room temperature before serving for the best flavor.",
        beveragePairings: [
          "Provençal rosé wine - the classic regional pairing",
          "Light-bodied red wine such as Côtes du Rhône or Grenache",
          "For non-alcoholic options, sparkling water with lemon or a tomato-based vegetable juice"
        ]
      }
    ]
  }
];