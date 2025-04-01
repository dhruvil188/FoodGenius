import { AnalyzeImageResponse, YoutubeVideo, CulturalContext, TechniqueDetail, CookingScience, SensoryGuidance, PresentationGuidance } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

// New recipes from TheMealDB
export const theMealDBRecipes: AnalyzeImageResponse[] = [
  {
    foodName: "Chicken Tandoori",
    description: "Tandoori Chicken is a popular North Indian dish consisting of chicken marinated in yogurt and spices, then traditionally cooked in a clay oven called a tandoor. The dish's signature vibrant red-orange color comes from the spice mix, which typically includes red chili powder and turmeric. Dating back to the Mughal era, this iconic preparation is known for its smoky flavor and tender meat.",
    tags: ["Indian", "Chicken", "Grilled", "Spicy", "Yogurt"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Authentic Tandoori Chicken",
        description: "This classic Indian dish features juicy chicken pieces marinated in a flavorful blend of yogurt and spices, then roasted to perfection. The result is tender meat with a smoky, slightly charred exterior and a bright, appetizing color.",
        prepTime: "20 minutes",
        cookTime: "30 minutes (plus marination time)",
        totalTime: "50 minutes (plus marination time)",
        servings: 4,
        servingSize: "2 pieces per person",
        difficulty: "Moderate",
        ingredientGroups: [
          {
            name: "For the First Marinade",
            ingredients: [
              "2 lbs chicken pieces (thighs and drumsticks preferred)",
              "1 tbsp lemon juice",
              "1 tsp salt",
              "1 tsp Kashmiri red chili powder (or paprika for less heat)"
            ]
          },
          {
            name: "For the Second Marinade",
            ingredients: [
              "1 cup plain yogurt (Greek or hung yogurt preferred)",
              "1 tbsp ginger paste",
              "1 tbsp garlic paste",
              "1 tbsp Kashmiri red chili powder",
              "1 tsp garam masala",
              "1 tsp ground cumin",
              "1 tsp ground coriander",
              "1/2 tsp turmeric powder",
              "2 tbsp lemon juice",
              "2 tbsp mustard oil or vegetable oil",
              "Salt to taste"
            ]
          },
          {
            name: "For Basting",
            ingredients: [
              "2 tbsp melted ghee or butter",
              "1 tsp chaat masala (for serving)",
              "Lemon wedges and sliced onions (for serving)",
              "Fresh cilantro, chopped (for garnish)"
            ]
          }
        ],
        steps: [
          "Clean the chicken pieces and make 2-3 deep cuts in each piece to allow the marinade to penetrate.",
          "Prepare the first marinade by mixing lemon juice, salt, and Kashmiri red chili powder in a bowl.",
          "Apply this marinade to the chicken pieces, making sure to rub it into the cuts. Let it sit for 20-30 minutes.",
          "In another bowl, prepare the second marinade by combining yogurt, ginger paste, garlic paste, all the spice powders, lemon juice, and oil. Mix well to form a smooth paste.",
          "Apply this second marinade to the chicken pieces, rubbing it in thoroughly. Cover and refrigerate for at least 4 hours, preferably overnight.",
          "When ready to cook, preheat the oven to 400°F (200°C).",
          "Remove the chicken from the refrigerator and let it come to room temperature for about 30 minutes.",
          "Arrange the marinated chicken pieces on a baking rack placed over a tray to catch drippings.",
          "Bake for 20 minutes, then increase the temperature to 450°F (230°C).",
          "Brush the chicken with melted ghee or butter and continue baking for another 10 minutes until the chicken is cooked through and slightly charred at the edges.",
          "Alternatively, you can grill the chicken on a barbecue for a more authentic smoky flavor.",
          "Check that the chicken is done by ensuring the internal temperature reaches 165°F (74°C) and the juices run clear when pierced.",
          "Sprinkle with chaat masala and garnish with chopped cilantro.",
          "Serve hot with lemon wedges, sliced onions, and mint chutney."
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
            "Vitamin A",
            "Vitamin B6",
            "Vitamin B12",
            "Calcium",
            "Iron"
          ],
          dietaryRestrictions: [
            "Gluten-free",
            "Contains dairy",
            "Not suitable for vegetarians/vegans"
          ],
          safetyTips: [
            "Ensure chicken reaches an internal temperature of 165°F (74°C)",
            "If yogurt is left at room temperature too long, it may spoil - keep refrigerated until needed",
            "Don't reuse marinade that has been in contact with raw chicken"
          ]
        },
        culturalContext: {
          origin: "Tandoori cooking originated in the Punjab region of northern India and Pakistan. The dish gained widespread popularity after the partition of India in 1947 when refugees from Punjab brought this cooking style to Delhi.",
          history: "While cooking in clay ovens (tandoors) dates back 5,000 years to the Harappan civilization, modern tandoori chicken was pioneered in the 1940s by Kundan Lal Gujral at his restaurant Moti Mahal in Delhi. During food shortages, he experimented with cooking marinated chicken in the tandoor previously used only for breads.",
          traditionalServing: "Traditionally served hot from the tandoor on a sizzling metal plate with onion rings, lemon wedges, and fresh green chutney. The meat is often garnished with chaat masala and served with naan bread and raita (yogurt sauce) to balance the spice.",
          significance: "Tandoori chicken represents India's culinary innovation and adaptability, becoming a diplomatic tool when served to international dignitaries. It symbolizes the cultural exchange along the Grand Trunk Road that connected South and Central Asia for centuries.",
          festiveRelevance: [
            "Essential dish at North Indian wedding celebrations and family gatherings",
            "Featured prominently during Eid festivities in many Muslim communities",
            "Popular during Baisakhi (Punjabi harvest festival) celebrations",
            "A staple offering at large community events and celebrations"
          ],
          regionalVariations: [
            {
              region: "Delhi Style",
              description: "The classic preparation with bright red color from Kashmiri chili powder, served with chaat masala",
              uniqueIngredients: ["Kashmiri chili powder", "Chaat masala"]
            },
            {
              region: "Peshawar Style",
              description: "Hotter preparation with more garlic and green chilies, often cooked in coal tandoors",
              uniqueIngredients: ["Extra green chilies", "Black salt"]
            }
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "A balanced blend of spices should be immediately detectable",
            "A slight smoky aroma should be present if properly cooked",
            "The aroma of toasted spices should be prominent but not overwhelming"
          ],
          textureDescriptors: [
            "The outside should have a slightly charred, firm texture",
            "The meat inside should be tender and juicy, not dry",
            "The marinade should form a cohesive coating that adheres to the chicken"
          ],
          tasteProgression: [
            "Initial tangy flavor from the yogurt and lemon",
            "Followed by the complex spice blend with notes of cumin, coriander and garam masala",
            "A mild heat that builds gradually, not immediately overwhelming",
            "A subtle smoky finish that lingers on the palate"
          ],
          visualCues: [
            "Vibrant reddish-orange color from the Kashmiri chili powder",
            "Slight charring at the edges indicates proper cooking",
            "A few darker spots where the marinade has caramelized",
            "Cuts in the meat should reveal juicy, fully cooked chicken without pinkness"
          ]
        },
        techniqueDetail: {
          name: "Two-Stage Marination",
          description: "Tandoori chicken traditionally uses a two-stage marination process that ensures maximum flavor penetration and tenderization of the meat.",
          steps: [
            "First marinade with acidic ingredients (lemon juice) helps to tenderize the meat and create pathways for the second marinade to penetrate",
            "Allow the first marinade to work for 20-30 minutes, but not longer as it can start to toughen the meat",
            "Second marinade with yogurt and spices provides both flavor and additional tenderization through enzymes in the yogurt",
            "Ensure the second marinade reaches into all cuts and covers the chicken completely",
            "Refrigerate during the second marination period to maintain food safety"
          ],
          expertTips: [
            "Using hung yogurt (yogurt strained of its whey) creates a thicker marinade that adheres better to the chicken",
            "Adding mustard oil imparts an authentic flavor, but it must be heated until it smokes and then cooled before adding to the marinade",
            "Gently massaging the marinade into the meat helps it penetrate better than simply coating the surface"
          ]
        },
        cookingScience: {
          principle: "Enzymatic Tenderization and Acid-Protein Interaction",
          explanation: "Tandoori chicken's distinctive texture comes from the combined effects of acid (lemon juice) and enzymes (in yogurt) on muscle proteins. The acid denatures proteins on the meat's surface, while the enzymes in yogurt (particularly protease) break down muscle fibers more deeply, creating the signature tender texture.",
          keyPoints: [
            "Lactic acid in yogurt helps to break down connective tissues without toughening the meat as stronger acids might",
            "The fat content in yogurt helps to carry fat-soluble flavor compounds from spices into the meat",
            "The high heat of traditional tandoor cooking (up to 900°F) creates a Maillard reaction on the surface while sealing in juices",
            "Yogurt marinade creates a protective layer that moderates the intense heat, preventing the meat from drying out"
          ],
          applicationTips: [
            "Full-fat yogurt works better than low-fat versions as it creates a more effective barrier against moisture loss",
            "Room temperature meat absorbs marinade more effectively than cold meat directly from the refrigerator",
            "Adding a small amount of sugar to the marinade enhances browning and flavor development"
          ]
        },
        presentationGuidance: {
          platingTechniques: [
            "Arrange the tandoori chicken pieces on a sizzling hot plate for dramatic effect and to maintain temperature",
            "Create height by stacking pieces or using a metal skewer stand",
            "Add color contrast with fresh green herbs, lemon wedges, and red onion rings"
          ],
          garnishIdeas: [
            "Sprinkle chaat masala over the chicken just before serving for an extra flavor boost",
            "Add a light dusting of Kashmiri chili powder for color enhancement",
            "Garnish with thinly sliced fresh green chilies for those who enjoy extra heat",
            "Place small bowls of mint chutney and tamarind chutney alongside for dipping"
          ],
          serviceDetails: [
            "Traditional service includes providing wet towels for guests to clean their hands after eating",
            "Serve with naan bread or roti on the side to complete the meal",
            "If served as a main course, accompany with basmati rice and dal (lentil curry)",
            "For authentic presentation, bring the sizzling platter directly to the table"
          ]
        }
      }
    ],
    thumbnail: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
    imageUrl: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg"
  },
  {
    foodName: "Tarte Tatin",
    description: "Tarte Tatin is a classic French upside-down caramelized apple tart, traditionally made with butter, sugar, apples, and puff pastry. The dessert was reportedly created accidentally in the 1880s at the Hotel Tatin in Lamotte-Beuvron, France, when one of the Tatin sisters made a mistake while preparing a traditional apple pie. This elegant dessert showcases caramelized apples on a crisp pastry base, creating a perfect balance of rich, buttery sweetness and tartness.",
    tags: ["French", "Dessert", "Apple", "Caramel", "Pastry"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Classic Tarte Tatin",
        description: "This upside-down caramelized apple tart features tender apples bathed in a rich caramel sauce atop a crisp, buttery pastry. It's an elegant French dessert that's impressive yet achievable, showcasing the natural beauty of caramelized fruit.",
        prepTime: "30 minutes",
        cookTime: "45 minutes",
        totalTime: "1 hour 15 minutes",
        servings: 8,
        servingSize: "1 slice",
        difficulty: "Intermediate",
        ingredientGroups: [
          {
            name: "Main Ingredients",
            ingredients: [
              "6-8 medium-sized firm apples (Braeburn, Honeycrisp, or Granny Smith)",
              "1 sheet puff pastry, thawed if frozen (or shortcrust pastry)",
              "1/2 cup (100g) granulated sugar",
              "6 tablespoons (85g) unsalted butter",
              "Pinch of salt",
              "1/2 teaspoon vanilla extract (optional)",
              "1/4 teaspoon ground cinnamon (optional)"
            ]
          },
          {
            name: "For Serving",
            ingredients: [
              "Crème fraîche or vanilla ice cream",
              "Confectioners' sugar for dusting (optional)"
            ]
          }
        ],
        steps: [
          "Peel and core the apples, then cut them into quarters or sixths depending on their size.",
          "Preheat the oven to 375°F (190°C).",
          "In a 9 or 10-inch cast-iron skillet (or oven-safe pan), spread the sugar evenly.",
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
          "Burning the caramel - if it smells acrid or looks very dark brown, it's burnt and will taste bitter",
          "Not packing the apples tightly enough - they shrink during cooking, so pack them very tightly",
          "Using too thin a layer of pastry, which may become soggy from the apple juices",
          "Waiting too long to invert the tart after removing from the oven"
        ],
        nutritionInfo: {
          calories: 320,
          protein: "3g",
          carbs: "42g",
          fats: "17g",
          fiber: "3g",
          sugar: "29g",
          sodium: "130mg",
          vitamins: [
            "Vitamin C",
            "Vitamin A",
            "Iron",
            "Calcium"
          ],
          dietaryRestrictions: [
            "Contains gluten",
            "Contains dairy",
            "Not suitable for vegans"
          ],
          safetyTips: [
            "Be extremely careful when working with hot caramel as it can cause severe burns",
            "Use oven mitts when handling the hot skillet",
            "Allow the caramel to cool slightly before arranging the apples to prevent splattering"
          ]
        },
        culturalContext: {
          origin: "Created in the late 19th century at the Hotel Tatin in Lamotte-Beuvron, a small commune in the Loire Valley region of France, by the Tatin sisters, Stéphanie and Caroline.",
          history: "The creation story involves a cooking accident where Stéphanie, overwhelmed with customers during hunting season, accidentally overcooked apples in butter and sugar. To salvage the dish, she placed pastry on top and flipped it after baking. The caramelized result was so popular with guests that it became the hotel's signature dessert, eventually spreading throughout France and globally.",
          traditionalServing: "In France, Tarte Tatin is traditionally served warm rather than hot, accompanied by a small dollop of crème fraîche or sometimes lightly whipped cream. It's never served with ice cream in traditional French homes, though this has become common in restaurants catering to international tastes.",
          significance: "The dish represents French culinary ingenuity and the philosophy that cooking errors can lead to delicious innovations. It embodies the importance of simple, seasonal ingredients treated with respect.",
          festiveRelevance: [
            "A centerpiece dessert during apple harvest celebrations in the Loire Valley",
            "Popular for Sunday family gatherings in France",
            "Often featured during local culinary festivals in Sologne region",
            "Prepared for Epiphany celebrations as an alternative to the traditional Galette des Rois"
          ],
          regionalVariations: [
            {
              region: "Normandy Version",
              description: "Made with Normandy apples and often incorporates Calvados (apple brandy)",
              uniqueIngredients: ["Calvados", "Local Normandy apples"]
            },
            {
              region: "Alsace Adaptation",
              description: "Sometimes incorporates cinnamon and replaces some apples with pears",
              uniqueIngredients: ["Cinnamon", "Williams pears"]
            }
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "Rich caramel scent with sweet apple notes should be prominent",
            "Buttery pastry aroma should be noticeable but not overwhelming",
            "A hint of vanilla or cinnamon if used in the recipe"
          ],
          textureDescriptors: [
            "The pastry should be crisp and flaky on the bottom (formerly the top)",
            "The apples should be tender but still hold their shape, not mushy",
            "The caramel should coat the apples with a glossy finish and be slightly chewy but not hard"
          ],
          tasteProgression: [
            "Initial buttery pastry flavor",
            "Rich, deep caramel notes with slight bitterness balancing the sweetness",
            "Sweet-tart apple flavor infused with caramel",
            "Lingering buttery caramel finish"
          ],
          visualCues: [
            "Glossy, amber-colored caramelized apples arranged in a circular pattern",
            "Golden-brown pastry base",
            "Caramel sauce pooling slightly around the edges",
            "Apples should retain their shape while being clearly softened"
          ]
        },
        techniqueDetail: {
          name: "Caramelization",
          description: "The success of a Tarte Tatin depends largely on properly caramelizing the sugar, which creates both the distinctive flavor and the glossy sauce that coats the apples.",
          steps: [
            "Spread sugar evenly in a cold pan to ensure uniform melting",
            "Heat the sugar over medium heat without stirring to prevent crystallization (swirling is acceptable)",
            "Watch carefully as the sugar melts - it should turn from white to golden amber",
            "Remove from heat immediately when the desired color is reached to prevent burning",
            "Add butter quickly after removing from heat to stop the cooking process and create a rich sauce"
          ],
          expertTips: [
            "Use a light-colored pan if possible so you can see the changing color of the caramel",
            "If crystals form, brush the sides of the pan with a wet pastry brush to dissolve them",
            "Have all ingredients measured and ready before starting the caramel process as timing is critical",
            "If the caramel hardens after adding butter, return to low heat briefly to re-melt"
          ]
        },
        cookingScience: {
          principle: "Sugar Caramelization and Maillard Reaction",
          explanation: "Tarte Tatin showcases two important chemical processes: caramelization and the Maillard reaction. Caramelization occurs when sugar is heated to around 340°F (170°C), breaking down and forming hundreds of new compounds that create complex flavors. The Maillard reaction happens when the proteins in the apples and butter react with sugars under heat, creating additional flavor compounds and browning.",
          keyPoints: [
            "True caramelization involves only sugar and heat, no water or other ingredients",
            "The browning of apples comes from both caramelization and the Maillard reaction",
            "Acid in apples helps prevent the caramel from crystallizing",
            "The pectin in apples helps thicken the caramel sauce as it cooks"
          ],
          applicationTips: [
            "Using a small amount of lemon juice can help prevent crystallization in the caramel",
            "Different types of sugar caramelize at different rates and temperatures",
            "Adding a small pinch of salt enhances the complexity of the caramel flavor by balancing sweetness"
          ]
        },
        presentationGuidance: {
          platingTechniques: [
            "Invert the tart onto a flat serving plate with a slight lip to contain any caramel sauce",
            "For individual servings, use a sharp knife dipped in hot water to make clean cuts",
            "Place the slice on the plate with the caramelized apples facing up to showcase their glossy appearance"
          ],
          garnishIdeas: [
            "A small quenelle or dollop of crème fraîche or vanilla ice cream on the side",
            "A light dusting of powdered sugar on the plate around the tart",
            "A small sprig of mint for color contrast",
            "A drizzle of additional caramel sauce on the plate for visual appeal"
          ],
          serviceDetails: [
            "Serve the tart while still warm but not hot for the best texture and flavor",
            "Provide dessert forks and possibly small dessert knives for cutting through the caramelized portions",
            "For an elegant touch, pre-slice but keep the tart in its original form, allowing guests to serve themselves",
            "When serving with ice cream, ensure it's slightly softened for the perfect temperature contrast"
          ]
        }
      }
    ],
    thumbnail: "https://www.themealdb.com/images/media/meals/ryspuw1511786688.jpg",
    imageUrl: "https://www.themealdb.com/images/media/meals/ryspuw1511786688.jpg"
  },
  {
    foodName: "Irish Stew",
    description: "Irish Stew is a traditional meat and root vegetable stew native to Ireland. Made with lamb or mutton, potatoes, onions, and carrots, this hearty dish has been a staple of Irish cuisine for generations. Known for its simple ingredients and nourishing qualities, it represents the resourceful cooking of rural Ireland, where families made the most of locally available ingredients. The stew's rich broth and tender meat make it an ideal comfort food for cold weather.",
    tags: ["Irish", "Stew", "Lamb", "Potatoes", "Comfort Food"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Traditional Irish Stew",
        description: "This classic Irish stew features tender pieces of lamb simmered with root vegetables in a rich, savory broth. Simple but deeply satisfying, it's a hearty meal that captures the essence of Irish home cooking.",
        prepTime: "20 minutes",
        cookTime: "2 hours",
        totalTime: "2 hours 20 minutes",
        servings: 6,
        servingSize: "1 1/2 cups",
        difficulty: "Easy",
        ingredientGroups: [
          {
            name: "Main Ingredients",
            ingredients: [
              "2 lbs lamb shoulder, trimmed and cut into 1-inch cubes",
              "2 lbs potatoes, peeled and cut into quarters",
              "1 lb carrots, peeled and cut into chunks",
              "2 large onions, roughly chopped",
              "4 cups lamb or chicken stock",
              "2 bay leaves",
              "2 sprigs fresh thyme",
              "2 tablespoons chopped fresh parsley",
              "Salt and freshly ground black pepper",
              "2 tablespoons vegetable oil",
              "1 tablespoon butter"
            ]
          },
          {
            name: "Optional Additions",
            ingredients: [
              "2 stalks celery, chopped",
              "1 leek, sliced",
              "1 tablespoon Worcestershire sauce",
              "1 tablespoon tomato paste",
              "1 cup fresh or frozen peas (added in the last 10 minutes)"
            ]
          }
        ],
        steps: [
          "Pat the lamb dry with paper towels and season generously with salt and pepper.",
          "Heat the oil in a large Dutch oven or heavy-bottomed pot over medium-high heat.",
          "Working in batches, brown the lamb on all sides, about 3-4 minutes per batch. Transfer to a plate.",
          "Reduce heat to medium and add the butter to the pot. Add the onions and cook until softened, about 5 minutes.",
          "Return the lamb to the pot, along with any accumulated juices.",
          "Add the stock, bay leaves, and thyme. If using optional tomato paste and Worcestershire sauce, add them now.",
          "Bring to a simmer, then reduce heat to low. Cover and cook for about 1 hour, until the meat is starting to become tender.",
          "Add the potatoes and carrots (and celery/leek if using). Return to a simmer.",
          "Cover and cook for another 40-45 minutes, until the vegetables and meat are very tender.",
          "If a thicker stew is desired, you can remove about 1 cup of liquid, whisk in 2 tablespoons of flour, and return to the pot.",
          "If using peas, add them in the last 10 minutes of cooking.",
          "Remove the bay leaves and thyme sprigs. Taste and adjust seasoning with salt and pepper.",
          "Stir in the fresh parsley just before serving.",
          "Serve hot with crusty Irish soda bread."
        ],
        chefTips: [
          "For the most authentic flavor, use lamb shoulder rather than leg meat, as it has more flavor and becomes more tender when slow-cooked",
          "Don't rush the browning process - it adds significant depth of flavor to the final dish",
          "Irish stew tastes even better the next day, so consider making it ahead and reheating",
          "Use waxy potatoes like Yukon Gold or red potatoes that will hold their shape during the long cooking process"
        ],
        commonMistakes: [
          "Cutting the vegetables too small, causing them to disintegrate during cooking",
          "Not browning the meat properly, which results in less complex flavor",
          "Adding too much liquid, making the stew watery rather than rich and hearty",
          "Overcooking to the point where the potatoes break down completely (unless a thicker stew is desired)"
        ],
        nutritionInfo: {
          calories: 420,
          protein: "28g",
          carbs: "35g",
          fats: "18g",
          fiber: "5g",
          sugar: "6g",
          sodium: "480mg",
          vitamins: [
            "Vitamin A",
            "Vitamin C",
            "Potassium",
            "Iron",
            "B vitamins"
          ],
          dietaryRestrictions: [
            "Gluten-free (if using gluten-free stock)",
            "Contains meat (not vegetarian/vegan)",
            "Dairy-free if butter is omitted"
          ],
          safetyTips: [
            "Ensure lamb reaches an internal temperature of 145°F (63°C)",
            "Cool leftovers quickly and refrigerate within 2 hours of cooking",
            "Reheat thoroughly to 165°F (74°C) before serving leftovers"
          ]
        },
        culturalContext: {
          origin: "Irish Stew (or 'stobhach gaelach' in Gaelic) originated in Ireland during the early 1800s among poor rural communities, particularly shepherds who needed to make the most of limited ingredients.",
          history: "Originally made with mutton (older sheep meat), potatoes, and onions - the only ingredients widely available to the rural poor. The recipe evolved over time as Ireland's fortunes changed. During the Great Famine (1845-1849), it became even more essential as a means of stretching scarce resources. Early versions were cooked in a cauldron over an open hearth, the central feature of traditional Irish cottages.",
          traditionalServing: "Traditionally served in a deep bowl with a side of soda bread for soaking up the rich broth. In Irish homes, it's often the main meal served in the afternoon rather than evening, especially in rural areas. Historically, the cook would take a ladle of broth from the top for children and give the meat and vegetables to working adults.",
          significance: "Irish Stew represents survival and resourcefulness during times of hardship. It embodies the Irish value of making something wonderful from simple ingredients and is tied to the country's pastoral heritage and the importance of sheep farming in Ireland's history.",
          festiveRelevance: [
            "Essential dish for St. Patrick's Day celebrations, both in Ireland and abroad",
            "Traditional meal served after Samhain harvest celebrations",
            "Common offering during community gatherings like céilís (traditional social gatherings)",
            "Featured in Bealtaine spring festivals that mark the beginning of summer"
          ],
          regionalVariations: [
            {
              region: "Dublin City Version",
              description: "Typically includes carrots and sometimes turnips, with beef often replacing mutton",
              uniqueIngredients: ["Beef brisket", "Root vegetables"]
            },
            {
              region: "Coastal Western Ireland",
              description: "Sometimes incorporates seaweed (dulse or Irish moss) for flavor and nutrition",
              uniqueIngredients: ["Dulse seaweed", "Sea salt"]
            }
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "Rich, savory aroma with herbaceous notes from thyme",
            "Subtle sweetness from the onions and carrots",
            "Comforting, home-cooked smell that fills the kitchen"
          ],
          textureDescriptors: [
            "Meat should be fork-tender but still hold its shape",
            "Potatoes should be soft but not falling apart",
            "Broth should be moderately thick - not watery but not as thick as gravy"
          ],
          tasteProgression: [
            "Initial savory umami flavor from the browned meat",
            "Followed by the earthy sweetness of root vegetables",
            "Subtle herb notes in the background",
            "Lingering richness from the long-simmered broth"
          ],
          visualCues: [
            "A mixture of golden broth with visible specks of herbs",
            "Colorful with white potatoes, orange carrots, and brown meat pieces",
            "Steam rising from the bowl when served hot",
            "Broth should coat the back of a spoon but still flow freely"
          ]
        },
        techniqueDetail: {
          name: "Proper Browning and Slow Simmering",
          description: "The key techniques in Irish stew involve properly browning the meat to develop flavor and then slowly simmering to tenderize the meat while allowing the flavors to meld.",
          steps: [
            "Pat meat completely dry before browning to ensure proper caramelization",
            "Brown meat in batches to avoid overcrowding the pan, which would cause steaming instead of browning",
            "Maintain a consistent, gentle simmer throughout cooking - never allow to boil vigorously",
            "Add vegetables in stages based on their cooking times to ensure each is properly cooked",
            "Allow the stew to rest before serving to let flavors develop and stabilize"
          ],
          expertTips: [
            "If using tougher cuts of meat, consider marinating overnight in beer or wine to help tenderize",
            "For a richer flavor, use bone-in meat and remove the bones before serving",
            "Adding a splash of Irish whiskey near the end of cooking can enhance the traditional flavor profile",
            "The ideal pot has a heavy bottom for even heat distribution and is just large enough to hold all ingredients"
          ]
        },
        cookingScience: {
          principle: "Collagen Conversion and Flavor Development",
          explanation: "Irish stew showcases two important scientific cooking principles: the conversion of collagen to gelatin in tough meat cuts and the development of complex flavors through the Maillard reaction during browning.",
          keyPoints: [
            "Long, slow cooking breaks down collagen (a tough protein in meat) into gelatin, creating tenderness and a rich mouthfeel in the broth",
            "The Maillard reaction during meat browning creates hundreds of new flavor compounds",
            "Slow cooking allows for flavor migration between ingredients, creating a unified taste profile",
            "Starches from the potatoes naturally thicken the broth slightly as they release during cooking"
          ],
          applicationTips: [
            "Maintain a temperature between 180-190°F (82-88°C) for optimal collagen conversion",
            "Don't rush the initial browning process, as this develops up to 40% of the dish's final flavor",
            "Adding salt at the beginning helps extract water-soluble flavors from the meat and vegetables",
            "Cooling and reheating the stew enhances flavor as compounds continue to interact over time"
          ]
        },
        presentationGuidance: {
          platingTechniques: [
            "Serve in wide, shallow bowls to showcase the ingredients while containing the broth",
            "Arrange larger pieces of meat and vegetables visibly on top with broth partially covering them",
            "Wipe the rim of the bowl clean for a more refined presentation"
          ],
          garnishIdeas: [
            "Sprinkle freshly chopped parsley across the top for color contrast and freshness",
            "Add a small pat of butter on top to melt into the hot stew for richness",
            "Place a small sprig of thyme on top for an elegant touch",
            "For modern presentations, a light drizzle of good quality olive oil can add visual appeal"
          ],
          serviceDetails: [
            "Serve with a side of traditional Irish soda bread or crusty sourdough",
            "Provide both a spoon and fork to make eating easier",
            "Warm the serving bowls in advance to keep the stew hot longer",
            "Accompany with a small side of pickled cabbage or beetroot for authentic Irish contrast"
          ]
        }
      }
    ],
    thumbnail: "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg",
    imageUrl: "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg"
  },
  {
    foodName: "Ratatouille",
    description: "Ratatouille is a classic Provençal vegetable stew originating from Nice in southeastern France. This colorful dish consists primarily of eggplant, zucchini, bell peppers, tomatoes, and onions, cooked in olive oil and seasoned with herbs from Provence. Traditionally prepared in summer when these vegetables are at their peak, ratatouille can be served hot, warm, or cold, making it a versatile accompaniment to various meals or a standalone vegetarian main course.",
    tags: ["French", "Vegetarian", "Stew", "Mediterranean", "Healthy"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Traditional Provençal Ratatouille",
        description: "This classic French vegetable stew features a colorful medley of summer vegetables slowly simmered with olive oil and herbs. The result is a fragrant, flavorful dish that can be served as a side or main course.",
        prepTime: "30 minutes",
        cookTime: "1 hour 15 minutes",
        totalTime: "1 hour 45 minutes",
        servings: 6,
        servingSize: "1 cup",
        difficulty: "Moderate",
        ingredientGroups: [
          {
            name: "Vegetables",
            ingredients: [
              "1 large eggplant (about 1 lb), cut into 1-inch cubes",
              "2 medium zucchini, cut into 1-inch chunks",
              "2 bell peppers (red and yellow), seeded and cut into 1-inch pieces",
              "1 large onion, diced",
              "4 large tomatoes, peeled, seeded, and roughly chopped (or 1 can 28oz whole peeled tomatoes, drained and chopped)",
              "4 cloves garlic, minced"
            ]
          },
          {
            name: "Seasonings and Oil",
            ingredients: [
              "1/4 cup extra virgin olive oil, plus more as needed",
              "1 bay leaf",
              "3 sprigs fresh thyme (or 1 teaspoon dried)",
              "1 sprig fresh rosemary (or 1/2 teaspoon dried)",
              "2 tablespoons fresh basil, chopped, plus more for garnish",
              "1 tablespoon fresh parsley, chopped",
              "Salt and freshly ground black pepper to taste",
              "Optional: 1 tablespoon tomato paste for deeper flavor"
            ]
          }
        ],
        steps: [
          "Optional but traditional first step: Salt the eggplant cubes and let them sit in a colander for 30 minutes to draw out bitterness. Rinse and pat dry thoroughly.",
          "Heat 2 tablespoons of olive oil in a large, heavy-bottomed pot or Dutch oven over medium heat.",
          "Add the onions and cook until softened, about 5 minutes.",
          "Add the garlic and cook for another minute until fragrant.",
          "Add the bell peppers and cook for 5 minutes until they begin to soften.",
          "In a separate large skillet, heat 1 tablespoon olive oil over medium-high heat and sauté the eggplant until golden, about 5-7 minutes. Add to the pot.",
          "In the same skillet, add another tablespoon of olive oil if needed and sauté the zucchini until golden, about 5 minutes. Add to the pot.",
          "Add the chopped tomatoes to the pot along with the bay leaf, thyme, and rosemary.",
          "If using tomato paste, add it now and stir to incorporate.",
          "Season with salt and pepper, then reduce heat to low. Cover and simmer gently for 30-45 minutes, stirring occasionally.",
          "The vegetables should be tender but not mushy, and the flavors should meld together. If there's too much liquid, simmer uncovered for a few minutes to reduce.",
          "Stir in the chopped basil and parsley. Taste and adjust seasoning if necessary.",
          "Remove bay leaf and herb sprigs before serving.",
          "Serve hot, warm, or at room temperature, drizzled with a little extra olive oil and garnished with fresh basil leaves."
        ],
        chefTips: [
          "For the best flavor, cook each vegetable separately before combining. This prevents them from steaming and helps maintain their individual flavors",
          "Use the best quality olive oil you can afford as it significantly impacts the final flavor",
          "Ratatouille tastes even better the next day after the flavors have had time to develop",
          "If you have a glut of summer vegetables, make a large batch and freeze portions for later use"
        ],
        commonMistakes: [
          "Overcooking the vegetables until they become mushy - they should be tender but still hold their shape",
          "Adding all vegetables at once, which creates a more homogeneous texture and less defined flavors",
          "Not taking the time to properly sweat the onions, which provide the aromatic base for the dish",
          "Using too little oil - this is a dish that celebrates olive oil as an ingredient, not just a cooking medium"
        ],
        nutritionInfo: {
          calories: 165,
          protein: "3g",
          carbs: "16g",
          fats: "11g",
          fiber: "6g",
          sugar: "8g",
          sodium: "290mg",
          vitamins: [
            "Vitamin A",
            "Vitamin C",
            "Vitamin K",
            "Potassium",
            "Folate"
          ],
          dietaryRestrictions: [
            "Vegetarian",
            "Vegan",
            "Gluten-free",
            "Dairy-free",
            "Nut-free"
          ],
          safetyTips: [
            "Store leftovers in the refrigerator within 2 hours of cooking",
            "Ratatouille will keep in the refrigerator for up to 4 days",
            "Reheat thoroughly before serving leftovers"
          ]
        },
        culturalContext: {
          origin: "Ratatouille originated in Nice, a city in the Provence-Alpes-Côte d'Azur region of southern France, during the 18th century. The name comes from the Occitan word 'ratatolha' and the French 'touiller,' meaning to stir or toss food.",
          history: "This peasant dish evolved as a summer harvest recipe when farmers needed to use their abundant vegetables. Originally, each vegetable was cooked separately to maintain its distinct flavor before being combined, though modern versions often simplify this. During the post-war tourism boom of the 1950s-60s, ratatouille gained international recognition as part of the Mediterranean diet movement.",
          traditionalServing: "In Provence, ratatouille is typically served at room temperature as a side dish with bread for soaking up the flavorful juices. It's often served alongside grilled fish or meat in summer, or as part of an antipasti platter. The dish improves with age and is commonly prepared a day ahead to allow flavors to develop.",
          significance: "Ratatouille represents the essence of Provençal cooking: simple preparation of fresh, seasonal ingredients with olive oil and herbs. It embodies the Mediterranean approach to vegetables as central to the meal rather than mere accompaniments. The dish symbolizes the frugal yet flavorful spirit of southern French cuisine.",
          festiveRelevance: [
            "Featured prominently during summer harvest festivals throughout Provence",
            "Traditional component of Bastille Day (July 14) outdoor celebrations",
            "Served during local saints' day festivals in southern French villages",
            "Common at family gatherings during August vacations when French families reunite"
          ],
          regionalVariations: [
            {
              region: "Marseille Style",
              description: "Includes fennel and sometimes seafood influence with anchovy paste",
              uniqueIngredients: ["Fennel bulb", "Anchovy paste"]
            },
            {
              region: "Toulon Variation",
              description: "Incorporates olives and capers for a more pungent, briny flavor",
              uniqueIngredients: ["Niçoise olives", "Capers"]
            }
          ]
        },
        sensoryGuidance: {
          aromaIndicators: [
            "Rich, sweet vegetal aroma with distinct notes of tomato and herbs",
            "Fruity olive oil notes should be detectable",
            "Roasted bell pepper scent adds depth",
            "Garlic and herbs provide an aromatic backdrop without dominating"
          ],
          textureDescriptors: [
            "Vegetables should be tender but still distinct and recognizable",
            "Slight firmness to the vegetables indicates proper cooking",
            "The dish should have a moist but not watery consistency",
            "A silky texture from the olive oil should coat the vegetables"
          ],
          tasteProgression: [
            "Initial brightness from the tomato acidity",
            "Followed by the natural sweetness of the vegetables",
            "Mild earthiness from eggplant in the middle notes",
            "Herbaceous flavors and olive oil richness on the finish"
          ],
          visualCues: [
            "Vibrant colors with distinct red, green, purple, and yellow elements",
            "A glossy sheen from the olive oil should be visible",
            "Some natural juices in the dish, but not swimming in liquid",
            "Herbs should be visible throughout the dish"
          ]
        },
        techniqueDetail: {
          name: "Cooking Vegetables Separately",
          description: "Traditional ratatouille preparation involves cooking each vegetable separately before combining. This technique preserves the integrity and flavor of each component while ensuring they're all properly cooked.",
          steps: [
            "Start by sautéing onions and garlic to create a flavorful base",
            "Cook each vegetable in a separate batch, allowing them to caramelize slightly for enhanced flavor",
            "Eggplant requires more oil than other vegetables, so cook it separately to control oil absorption",
            "Zucchini should be cooked until just tender to prevent it from becoming mushy in the final dish",
            "Combine all components at the end for a gentle simmer together, allowing flavors to meld while maintaining distinct textures"
          ],
          expertTips: [
            "Cut vegetables into similar sizes for even cooking, but not too small or they'll lose their identity in the dish",
            "Don't rush the cooking process - the slow development of flavors is essential",
            "Use a wide, shallow pan when cooking individual vegetables to promote evaporation and caramelization",
            "A cast iron Dutch oven is ideal for the final simmering stage"
          ]
        },
        cookingScience: {
          principle: "Flavor Development Through Controlled Browning",
          explanation: "Ratatouille's complex flavor profile comes from the Maillard reaction (controlled browning) of each vegetable component, followed by the slow extraction of water-soluble flavors during simmering. This two-stage process creates depth while preserving the character of each ingredient.",
          keyPoints: [
            "Sautéing vegetables individually allows control over their individual browning reactions, which produce different flavor compounds",
            "The high pectin content in eggplant and tomatoes helps create the dish's characteristic silky texture when cooked slowly",
            "Olive oil serves as both a cooking medium and a flavor carrier, dissolving fat-soluble flavor compounds from herbs and vegetables",
            "The slow simmer allows for flavor migration between components without homogenizing textures"
          ],
          applicationTips: [
            "Let the finished ratatouille rest at least 30 minutes before serving to allow flavors to develop",
            "The ideal cooking temperature is medium-low heat to allow caramelization without burning",
            "Salting eggplant before cooking draws out moisture and bitter compounds, resulting in better flavor and texture",
            "Covering the pot during final simmering helps retain aromatic compounds that would otherwise escape with steam"
          ]
        },
        presentationGuidance: {
          platingTechniques: [
            "For casual service, present in a rustic ceramic dish that showcases the colorful vegetables",
            "For elegant service, use a ring mold to create a neat stack, then remove the mold at the table",
            "Alternatively, arrange on a platter with a slight depression in the center to hold any juices"
          ],
          garnishIdeas: [
            "Fresh basil leaves or small sprigs of thyme add color and aroma",
            "A light drizzle of high-quality extra virgin olive oil adds shine and fresh flavor",
            "For visual contrast, add a few sprinkles of black olive tapenade",
            "A twisted lemon peel can add a bright visual note for special presentations"
          ],
          serviceDetails: [
            "Serve with crusty bread or as a side dish to grilled meat or fish",
            "For a complete vegetarian meal, pair with polenta, quinoa, or crusty bread and a soft cheese",
            "Provide small serving spoons that won't break up the vegetable pieces",
            "For summer service, a chilled ratatouille makes an excellent starter on a hot day"
          ]
        }
      }
    ],
    thumbnail: "https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg",
    imageUrl: "https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg"
  }
];
