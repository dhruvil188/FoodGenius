import { AnalyzeImageResponse, YoutubeVideo, CulturalContext, TechniqueDetail, CookingScience, SensoryGuidance, PresentationGuidance } from "@shared/schema";
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
        ],
        techniqueDetails: [
          {
            name: "Perfect Searing",
            description: "Properly searing the beef tenderloin is crucial for developing flavor and creating a barrier that helps keep the meat juicy. The goal is to quickly brown the exterior without overcooking the interior.",
            visualCues: [
              "A deep brown crust should form on all sides",
              "The meat should be firm to the touch but still springy",
              "The pan should be very hot - you should see a light smoke before adding the meat"
            ],
            commonErrors: [
              "Using a pan that's not hot enough, resulting in steaming rather than searing",
              "Overcrowding the pan, which lowers the temperature and prevents proper browning",
              "Moving the meat too frequently instead of letting it develop a crust"
            ]
          },
          {
            name: "Mushroom Duxelles Preparation",
            description: "The mushroom duxelles (a finely chopped mixture of mushrooms, shallots, and herbs) must be cooked until completely dry to prevent moisture from making the pastry soggy.",
            visualCues: [
              "The mixture should look relatively dry and concentrated",
              "It will significantly reduce in volume - about 1/4 of its original size",
              "The color will deepen to a medium-dark brown"
            ],
            commonErrors: [
              "Undercooked mushrooms that release moisture during baking",
              "Chopping the mushrooms too coarsely, which makes an uneven layer",
              "Not allowing the mixture to cool completely before assembly"
            ]
          },
          {
            name: "Pastry Wrapping",
            description: "The puff pastry must be handled carefully and wrapped around the beef in a way that seals completely without trapping air pockets.",
            visualCues: [
              "The pastry should be rolled to about 1/8 inch thickness",
              "Seams should be underneath the Wellington",
              "The egg wash should give the pastry a shiny appearance"
            ],
            commonErrors: [
              "Rolling the pastry too thin, causing it to tear or not rise properly",
              "Not sealing the edges well, allowing juices to escape during baking",
              "Overworking the pastry, which makes it tough and prevents proper puff"
            ]
          }
        ],
        cookingScience: {
          keyReactions: [
            "The Maillard reaction during searing creates hundreds of flavor compounds on the beef's surface",
            "Puff pastry rises through steam generated between its many butter-separated layers",
            "Prosciutto acts as a moisture barrier, preventing the beef's juices from making the pastry soggy"
          ],
          techniquePurpose: [
            "Chilling the assembled Wellington before baking helps maintain the pastry's structure and layers",
            "Scoring the pastry creates vents for steam to escape, preventing the pastry from becoming soggy",
            "Resting the Wellington after baking allows the internal temperature to stabilize and juices to redistribute"
          ],
          safetyTips: [
            "Always use a meat thermometer to ensure the beef reaches a safe temperature (125°F for rare, 135°F for medium-rare)",
            "Keep puff pastry cold until ready to use to ensure proper lamination and rising",
            "Let the Wellington rest for 10 minutes before slicing to prevent both burns and juice loss"
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "A rich, buttery scent from the pastry indicates proper baking",
            "A nutty, earthy aroma from the mushrooms should be present",
            "The beef should have a roasted, meaty fragrance that's not too intense (which would indicate overcooking)"
          ],
          textureDescriptors: [
            "The pastry should be crisp and flaky on the outside",
            "The beef should be tender and juicy, with a slight resistance when sliced",
            "The mushroom layer should be soft but not mushy"
          ],
          tasteProgression: [
            "First comes the buttery, rich flavor of the pastry",
            "Then the earthy, umami notes from the mushroom duxelles",
            "Finally, the savory, juicy beef flavor at the center"
          ]
        },
        culturalContext: {
          origin: "The dish has somewhat disputed origins, but is firmly part of British culinary tradition. It was named after Arthur Wellesley, 1st Duke of Wellington, though whether he actually enjoyed the dish is uncertain.",
          history: "While the dish bears the name of the Duke of Wellington (who defeated Napoleon at Waterloo in 1815), it likely emerged in the early 20th century rather than during the Duke's lifetime. Some food historians suggest it evolved from the French dish 'filet de bœuf en croûte'.",
          traditionalServing: "Traditionally served at formal dinners and special occasions in British households. It's typically presented center table and carved in front of guests, with slices revealing the attractive contrast between the pink meat and the pastry layers.",
          festiveRelevance: [
            "Christmas dinner alternative to turkey or goose",
            "New Year's Eve celebratory meals",
            "Easter Sunday lunch",
            "Special anniversary dinners"
          ]
        },
        presentationGuidance: {
          platingSuggestions: [
            "Slice the Wellington into 1-inch thick portions with a very sharp knife",
            "Place slices on warmed plates slightly off-center",
            "Position any sauce in a small pool beside, not on top of, the Wellington to maintain the pastry's crispness",
            "Arrange side dishes in a way that highlights the Wellington as the centerpiece"
          ],
          garnishingTips: [
            "Keep garnishes minimal and purposeful - a small sprig of fresh thyme reflects ingredients within",
            "A light dusting of sea salt on the plate around the Wellington enhances flavors",
            "Avoid wet or heavy garnishes that could make the pastry soggy"
          ],
          photoTips: [
            "Capture the cross-section showing all the layers - the golden pastry, dark mushroom layer, and pink beef center",
            "Photograph in natural light to highlight the contrast of textures and colors",
            "Style with classic, elegant tableware that reflects the dish's sophisticated nature"
          ]
        }
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
        ],
        techniqueDetails: [
          {
            name: "Proper Marination",
            description: "The key to authentic tandoori chicken lies in its marination process. The yogurt tenderizes the meat while the spices infuse flavor throughout.",
            visualCues: [
              "The marinade should be thick enough to coat and cling to the chicken pieces",
              "After marination, the chicken should have absorbed some of the color from the spices",
              "The chicken should look well-coated but not swimming in excess marinade"
            ],
            commonErrors: [
              "Using low-fat yogurt which doesn't have enough fat to properly coat and tenderize",
              "Skipping the cuts in the chicken, which prevents marinade penetration",
              "Not allowing enough marination time for the enzymes in the yogurt to tenderize the meat"
            ]
          },
          {
            name: "Two-Step Cooking Method",
            description: "Traditional tandoor cooking uses intense radiant heat in a clay oven. Home cooks can replicate this with a two-step process of baking followed by direct heat for char.",
            visualCues: [
              "The chicken should develop a reddish-orange color with slightly charred edges",
              "Clear juices should run when the chicken is pierced",
              "The surface should look relatively dry, not wet or saucy"
            ],
            commonErrors: [
              "Cooking at too low a temperature, which steams rather than roasts the chicken",
              "Not using a rack during baking, which can make the chicken sit in its juices and become soggy",
              "Skipping the final high-heat step, which is essential for the authentic char flavor"
            ]
          }
        ],
        cookingScience: {
          keyReactions: [
            "Lactic acid in yogurt acts as a tenderizer by breaking down proteins in the chicken",
            "Turmeric and paprika create the signature color through their natural pigments",
            "Caramelization of sugars in the yogurt and spices creates the characteristic charred exterior"
          ],
          techniquePurpose: [
            "Making cuts in the chicken allows the marinade to penetrate deeper into the meat",
            "High cooking temperature creates the Maillard reaction, developing complex flavors on the surface",
            "Resting after cooking allows protein fibers to relax and reabsorb juices, resulting in moister meat"
          ],
          safetyTips: [
            "Ensure chicken reaches an internal temperature of 165°F (74°C) for food safety",
            "Never reuse the marinade that has been in contact with raw chicken without boiling it first",
            "Keep the chicken refrigerated during the entire marination process to prevent bacterial growth"
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "The aroma should be fragrant with toasted spices, not acrid or burnt",
            "A pleasant smoky scent should be present if properly charred",
            "The yogurt should lend a subtle tanginess to the overall aroma"
          ],
          textureDescriptors: [
            "The exterior should be slightly crisp and charred in spots",
            "The meat should be tender and juicy, not rubbery or dry",
            "The chicken should pull away cleanly from the bone when eaten"
          ],
          tasteProgression: [
            "Initial tangy notes from the yogurt marinade",
            "Middle notes of complex spices with moderate heat",
            "Finishing with a smoky char flavor and juicy meat"
          ]
        },
        culturalContext: {
          origin: "Tandoori cooking originated in the Punjab region of northern India and Pakistan. The dish was popularized in the 1940s at Moti Mahal restaurant in Delhi, India.",
          history: "While cooking in clay ovens (tandoors) dates back thousands of years in the Indian subcontinent, the specific recipe for tandoori chicken as we know it today was developed in the 20th century. The distinctive red color was originally achieved with traditional spices like Kashmiri chili, though some restaurants later adopted food coloring.",
          traditionalServing: "Traditionally served hot from the tandoor, garnished with fresh lime, onion rings, and mint chutney. It's often presented on a sizzling plate with a bed of sliced onions to maintain the theatre of the dish's arrival at the table.",
          festiveRelevance: [
            "Popular at wedding celebrations throughout India and Pakistan",
            "Commonly served at religious festivals and family gatherings",
            "A staple dish at important national celebrations and events",
            "Often featured as a starter for special dinner parties"
          ]
        },
        presentationGuidance: {
          platingSuggestions: [
            "Arrange chicken pieces on a bed of sliced raw onions",
            "Garnish with lime wedges and fresh cilantro sprigs",
            "Add a small bowl of mint chutney or raita on the side",
            "Sprinkle with chat masala for an extra flavor dimension"
          ],
          garnishingTips: [
            "Use thinly sliced rings of red onion for color contrast",
            "Add a light dusting of chaat masala just before serving for a tangy finish",
            "Include fresh green chilies for those who enjoy extra heat"
          ],
          photoTips: [
            "Capture the vibrant reddish-orange color of the chicken against white or green plates",
            "Highlight the char marks that indicate authentic preparation",
            "Include traditional accompaniments like naan bread and raita in the frame to tell a complete story"
          ]
        }
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
        ],
        techniqueDetails: [
          {
            name: "Caramel Making",
            description: "Creating the perfect caramel is the foundation of Tarte Tatin. It should be a deep amber color that balances sweetness with slight bitterness without burning.",
            visualCues: [
              "The caramel should be a rich amber color, similar to maple syrup",
              "It should be completely smooth with no sugar crystals",
              "When tilted, the caramel should flow slowly but not be thick or sticky"
            ],
            commonErrors: [
              "Removing the caramel from heat too soon, resulting in a pale, overly sweet flavor",
              "Cooking the caramel too long, creating bitter, burnt flavors",
              "Stirring the sugar as it melts, which can cause crystallization"
            ]
          },
          {
            name: "Apple Arrangement",
            description: "The apples must be arranged carefully to create a beautiful pattern when the tart is inverted. They also need to be packed tightly to prevent collapse.",
            visualCues: [
              "Apples should be tightly packed with minimal gaps",
              "The rounded sides should face down (toward the caramel)",
              "The pattern should be concentric, working from the outside in"
            ],
            commonErrors: [
              "Leaving large gaps between apples, which can cause the tart to collapse when inverted",
              "Cutting the apples too thin, which causes them to disintegrate during cooking",
              "Not arranging decoratively, missing the opportunity for a beautiful presentation"
            ]
          },
          {
            name: "Pastry Handling",
            description: "The pastry should be handled minimally and kept cold to ensure it remains flaky after baking.",
            visualCues: [
              "The pastry should be rolled to even thickness (about 1/8 inch)",
              "It should be draped over the apples and tucked down the sides of the pan",
              "After baking, it should be golden brown and crisp"
            ],
            commonErrors: [
              "Overworking the pastry, making it tough rather than flaky",
              "Not tucking the edges down into the pan, which can cause the tart to fall apart when inverted",
              "Rolling the pastry too thick, resulting in an undercooked layer"
            ]
          }
        ],
        cookingScience: {
          keyReactions: [
            "Caramelization occurs when sugar is heated to about 340°F (170°C), creating complex flavor compounds",
            "The Maillard reaction between the sugars and proteins in the apples creates additional flavor depth",
            "Steam from the apples helps cook the underside of the pastry while the top browns in the oven"
          ],
          techniquePurpose: [
            "Cooking the apples in caramel before baking softens them and infuses them with flavor",
            "Using a heavy-bottomed pan (especially cast iron) provides even heat distribution for uniform caramel",
            "Inverting while still warm ensures the caramel doesn't harden and stick to the pan"
          ],
          safetyTips: [
            "Be extremely careful when making caramel as it can cause severe burns",
            "Use oven mitts when inverting the hot tart to prevent burns",
            "Allow the tart to cool slightly before serving to prevent mouth burns from hot caramel"
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "A rich, sweet, buttery aroma should dominate",
            "There should be distinct notes of caramelized sugar and baked apples",
            "A pleasant hint of vanilla or spice if those were added to the recipe"
          ],
          textureDescriptors: [
            "The apples should be tender but still hold their shape - not mushy",
            "The caramel should coat the apples with a glossy finish that's soft but not runny",
            "The pastry should be crisp and flaky, providing textural contrast to the soft apples"
          ],
          tasteProgression: [
            "First comes the buttery, flaky pastry",
            "Then the deep, complex sweetness of the caramel",
            "Finally, the subtle tartness of the apples balancing the sweet elements"
          ]
        },
        culturalContext: {
          origin: "Created in the 1880s at the Hotel Tatin in Lamotte-Beuvron, France, by the Tatin sisters, Stéphanie and Caroline. Legend has it that Stéphanie accidentally created the dessert when she was making a traditional apple pie but left the apples cooking in butter and sugar too long.",
          history: "Rather than throw away the caramelized apples, she put the pastry on top and baked it anyway. The hotel guests loved the dessert, and it became a signature dish. The recipe was later popularized by the famous Maxim's restaurant in Paris in the early 20th century.",
          traditionalServing: "In France, Tarte Tatin is traditionally served slightly warm with a dollop of crème fraîche or a small scoop of vanilla ice cream. It's a common dessert for family meals and is often served during autumn when apples are in season.",
          festiveRelevance: [
            "Popular during apple harvest festivals throughout France",
            "Often served during family gatherings and Sunday lunches",
            "A staple dessert for Christmas and New Year celebrations in many French households",
            "Featured during Epiphany celebrations in January as an alternative to galette des rois"
          ]
        },
        presentationGuidance: {
          platingSuggestions: [
            "Serve each slice on a white plate to highlight the amber colors",
            "Place a small quenelle of crème fraîche or scoop of vanilla ice cream alongside, not on top",
            "Drizzle any extra caramel from the pan around the plate, not over the tart",
            "For special occasions, add a thin slice of apple that has been dried or fried as a crisp garnish"
          ],
          garnishingTips: [
            "A small sprig of fresh mint provides color contrast without interfering with flavors",
            "A light dusting of powdered sugar can add visual appeal for serving",
            "Avoid elaborate garnishes that would detract from the tart's rustic elegance"
          ],
          photoTips: [
            "Capture a cross-section view to show the layers of flaky pastry, tender apples, and glossy caramel",
            "Photograph while still warm to capture the slight steam and glossiness of the caramel",
            "Include traditional French elements in the background (like a vintage fork or linen napkin) to emphasize heritage"
          ]
        }
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