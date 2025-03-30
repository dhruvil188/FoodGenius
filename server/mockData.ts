import { AnalyzeImageResponse, YoutubeVideo } from "@shared/schema";

/**
 * Provides mock data for development when the API quota is exceeded
 */
export const getMockAnalysisResponse = (): AnalyzeImageResponse => {
  const mockYoutubeVideos: YoutubeVideo[] = [
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
    },
    {
      videoId: "q8kTWNwUD88",
      title: "Gordon Ramsay's Simple Spaghetti Carbonara",
      channelTitle: "Gordon Ramsay",
      description: "Gordon Ramsay shows how to make a simple carbonara in under 10 minutes.",
      publishedAt: "2021-02-11T18:00:00Z",
      thumbnailUrl: "https://i.ytimg.com/vi/q8kTWNwUD88/mqdefault.jpg"
    }
  ];

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
          macronutrientRatio: {
            protein: 20,
            carbs: 55,
            fats: 25
          },
          allergens: [
            "Eggs",
            "Dairy (Cheese)",
            "Wheat (Pasta)",
            "May contain traces of tree nuts from processing"
          ],
          dietaryCompliance: [
            "Nut-free",
            "Soy-free",
            "No artificial ingredients",
            "No added preservatives"
          ],
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
        ],
        equipment: [
          {
            name: "Large Pasta Pot",
            description: "A wide pot with high sides, at least 6-quart capacity, for properly boiling pasta with plenty of water",
            alternatives: ["Stock pot", "Dutch oven"],
            difficultyToUse: "Easy"
          },
          {
            name: "Wide Skillet",
            description: "A 12-inch skillet with high sides provides ample room to toss the pasta with the sauce",
            alternatives: ["Sauté pan", "Wok (in a pinch)"],
            difficultyToUse: "Easy"
          },
          {
            name: "Microplane or Fine Grater",
            description: "For finely grating the hard cheeses to ensure they melt smoothly into the sauce",
            alternatives: ["Box grater (small holes)", "Food processor with grating attachment"],
            difficultyToUse: "Easy"
          },
          {
            name: "Spider Strainer or Tongs",
            description: "For transferring the pasta directly from the water to the sauce without losing all the starchy pasta water",
            alternatives: ["Pasta server", "Large slotted spoon"],
            difficultyToUse: "Medium"
          }
        ],
        ingredientGroups: [
          {
            groupName: "Pasta Base",
            ingredients: [
              "400g (14oz) spaghetti or bucatini pasta",
              "Salt, for pasta water (at least 1 tablespoon)"
            ],
            preparationNotes: "Use high-quality pasta for authentic results; bronze-die extruded if available"
          },
          {
            groupName: "Carbonara Sauce",
            ingredients: [
              "3 large eggs",
              "1 large egg yolk",
              "75g (2.5oz) Pecorino Romano cheese, finely grated",
              "50g (1.75oz) Parmigiano Reggiano, finely grated",
              "Freshly ground black pepper, to taste"
            ],
            preparationNotes: "Eggs should be at room temperature; cheese should be freshly grated (not pre-packaged)"
          },
          {
            groupName: "Savory Base",
            ingredients: [
              "150g (5oz) pancetta or guanciale, diced",
              "2-3 cloves garlic, minced (optional)",
              "Extra virgin olive oil, 1 tablespoon"
            ],
            preparationNotes: "Cut pancetta or guanciale into small dice (about 1/4 inch cubes) for even cooking"
          }
        ],
        techniqueDetails: [
          {
            name: "Tempered Egg Incorporation",
            description: "The critical technique in carbonara is adding and cooking the egg mixture without scrambling it. This requires removing the pan from heat and quickly tossing to use residual heat rather than direct heat.",
            visualCues: [
              "The sauce should coat the pasta in a glossy, smooth layer",
              "No visible egg curds or scrambled bits should be present",
              "The consistency should be flowing but not watery or overly thick"
            ],
            commonErrors: [
              "Adding eggs while the pan is still on heat will create scrambled eggs",
              "Not working quickly enough can result in a cold, uncooked sauce",
              "Inadequate tossing can create uneven sauce distribution"
            ]
          },
          {
            name: "Al Dente Pasta Cooking",
            description: "Cooking pasta until it's tender but still firm to the bite (al dente) is essential for carbonara as it will continue to cook slightly when tossed with the hot ingredients.",
            visualCues: [
              "Pasta should be flexible but retain a slight resistance when bitten",
              "The center should not have a hard, chalky core, but still have some firmness",
              "It should not be soft, mushy, or falling apart"
            ],
            commonErrors: [
              "Overcooking pasta results in a mushy final dish with poor texture",
              "Undercooking leaves pasta too hard in the final dish",
              "Testing only by time rather than actual texture can lead to inconsistent results"
            ]
          },
          {
            name: "Pasta Water Management",
            description: "The starchy pasta cooking water is an essential ingredient that helps emulsify the sauce and achieve the right consistency.",
            visualCues: [
              "Reserved pasta water should look cloudy from starch",
              "When added to the sauce, it should help create a silky, cohesive texture",
              "The final sauce should cling to pasta without pooling at the bottom"
            ],
            commonErrors: [
              "Forgetting to reserve pasta water before draining",
              "Adding too much water, making the sauce thin and watery",
              "Adding too little, resulting in a thick, clumpy sauce"
            ]
          }
        ],
        cookingScience: {
          keyReactions: [
            "Proteins in the eggs coagulate with heat to thicken the sauce, while continuous motion prevents them from fully solidifying",
            "Starch from the pasta water acts as a natural emulsifier, helping the water and fat components mix into a homogeneous sauce",
            "Salt in the cheese triggers enhanced flavor perception in other ingredients, particularly intensifying the savory notes of the pork"
          ],
          techniquePurpose: [
            "Removing the pan from heat before adding eggs prevents them from reaching the temperature (around 160°F/70°C) at which they would scramble",
            "Adding hot pasta directly to the sauce provides just enough heat to partially cook the eggs without solidifying them",
            "Using starchy pasta water adds both liquid and natural thickeners that help the sauce achieve the ideal consistency"
          ],
          safetyTips: [
            "Traditional carbonara contains raw eggs that are only partially cooked by residual heat. Use fresh, high-quality eggs from a reliable source",
            "Immunocompromised individuals, pregnant women, young children, and the elderly should consider using pasteurized eggs",
            "Serve carbonara immediately after preparing to minimize time in the temperature danger zone (40°F-140°F/4°C-60°C)"
          ]
        },
        sensoryGuidance: {
          tasteProgression: [
            "Initial savory hit from the cured pork fat",
            "Rich, creamy mouthfeel from the egg-based sauce",
            "Sharp, salty notes from the aged cheeses",
            "Lingering warmth from freshly ground black pepper",
            "Subtle wheat notes from the pasta foundation"
          ],
          aromaIndicators: [
            "Pronounced pork aroma with nutty undertones indicates properly rendered fat",
            "Fresh-cracked black pepper should provide a spicy, woody scent",
            "A balanced aroma without any sulfurous smell indicates properly cooked (not overcooked) eggs",
            "The finished dish should have a harmonious blend of savory, dairy, and cereal notes"
          ],
          textureDescriptors: [
            "The sauce should have a silky, smooth consistency that coats each strand of pasta",
            "Pasta should maintain some resistance when bitten (al dente)",
            "Pieces of pancetta/guanciale should be tender but with a slight chew",
            "The overall mouthfeel should be creamy without being heavy or greasy"
          ]
        },
        culturalContext: {
          origin: "Rome, Italy - specifically associated with the working-class neighborhoods of Rome in the mid-20th century",
          history: "While the exact origins of carbonara are debated, the dish gained popularity after World War II. One theory suggests American soldiers stationed in Italy introduced bacon and eggs to local cuisine, which evolved into carbonara. Another theory connects it to Italian charcoal workers (carbonai) who needed a hearty, easy-to-prepare meal.",
          traditionalServing: "In Italy, carbonara is traditionally served as a primo piatto (first course) rather than a main dish, in moderate portions preceding a meat or fish course. It is never paired with chicken or served with cream in authentic Italian cuisine.",
          festiveRelevance: [
            "Not associated with specific holidays or celebrations, but enjoyed year-round in Italian households",
            "Considered everyday comfort food rather than feast day cuisine",
            "Often prepared for informal gatherings and family meals rather than formal occasions"
          ]
        },
        presentationGuidance: {
          platingSuggestions: [
            "Serve immediately on warmed plates to maintain the sauce's texture",
            "Arrange pasta in a twirled mound rather than spread flat across the plate",
            "Garnish with a light dusting of additional grated cheese and freshly ground pepper",
            "A small piece of crispy guanciale can be reserved as a garnish on top"
          ],
          garnishingTips: [
            "Keep garnishes minimal and related to the ingredients already in the dish",
            "A small sprinkle of finely chopped parsley can add color contrast, though not traditional",
            "Avoid non-traditional garnishes like basil or tomatoes that would confuse the dish's identity"
          ],
          photoTips: [
            "Capture the glossy texture of the sauce with angled lighting",
            "Use a fork to slightly twist some strands of pasta upward for dimension",
            "Photograph immediately after plating while the sauce is still glossy",
            "Include some of the black pepper specks in close-up shots to highlight the dish's signature appearance"
          ]
        },
        mealPlanningNotes: [
          "Carbonara is best prepared just before serving as it doesn't hold or reheat well",
          "Prep all ingredients in advance so the final cooking process can happen quickly without interruption",
          "As a rich dish, balance it with a light, acidic starter like a simple green salad with lemon dressing",
          "Consider a light fruit-based dessert to follow this rich pasta course"
        ],
        successIndicators: [
          "Sauce clings to pasta without pooling at the bottom of the plate",
          "Eggs are transformed into a creamy sauce without any scrambled bits",
          "Pasta maintains some bite rather than being completely soft",
          "Flavors are balanced between salty (cheese/pork), rich (eggs), and sharp (pepper)"
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
    ],
    youtubeVideos: mockYoutubeVideos
  };
};