import { AnalyzeImageResponse } from "@shared/schema";

/**
 * Collection of recipes sourced from Food.com
 * Used to provide a rich browsing experience in the recipe library
 */
export const foodComRecipes: AnalyzeImageResponse[] = [
  {
    foodName: "Chocolate Chip Cookies",
    description: "The perfect chocolate chip cookies are crisp on the outside yet soft and chewy in the middle, with gooey chocolate chips throughout. This classic American dessert is beloved for its simplicity and comforting flavor profile.",
    tags: ["Dessert", "Baking", "American", "Cookies", "Chocolate", "Sweet", "Snack", "Vegetarian"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/51/78/46/UxrpGSGRSVGgtcjrBSvk_20141219_chocolate%20chip%20cookies_193.jpg",
    recipes: [
      {
        title: "Award-Winning Soft Chocolate Chip Cookies",
        description: "These soft and chewy chocolate chip cookies are a family favorite, perfectly balanced with chocolate chips in every bite.",
        ingredients: [
          "1 cup (2 sticks) unsalted butter, softened",
          "3/4 cup granulated sugar",
          "3/4 cup packed brown sugar",
          "2 large eggs",
          "2 teaspoons vanilla extract",
          "2 1/4 cups all-purpose flour",
          "1 teaspoon baking soda",
          "1/2 teaspoon salt",
          "2 cups semi-sweet chocolate chips",
          "1 cup chopped nuts (optional)"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C).",
          "In a large bowl, cream together the butter, granulated sugar, and brown sugar until light and fluffy.",
          "Beat in eggs one at a time, then stir in vanilla.",
          "In a separate bowl, combine flour, baking soda, and salt. Gradually add to the creamed mixture.",
          "Fold in chocolate chips and nuts if using.",
          "Drop by rounded tablespoons onto ungreased baking sheets.",
          "Bake for 9 to 11 minutes or until golden brown around the edges.",
          "Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely."
        ],
        prepTime: "15 minutes",
        cookTime: "10 minutes",
        totalTime: "25 minutes",
        servings: "36 cookies",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 150,
          protein: "2g",
          carbs: "19g",
          fats: "8g",
          fiber: "1g",
          sugar: "12g",
          sodium: "70mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Vanilla Ice Cream",
        description: "A scoop of vanilla ice cream pairs perfectly with warm cookies for a classic dessert combination."
      },
      {
        name: "Cold Milk",
        description: "The quintessential pairing with chocolate chip cookies - a cold glass of milk."
      }
    ],
    variations: [
      {
        name: "Double Chocolate Chip Cookies",
        description: "Add 1/4 cup cocoa powder to the flour mixture for a rich chocolate cookie base.",
        keyIngredients: ["Cocoa powder", "Semi-sweet chocolate chips", "White chocolate chips"]
      },
      {
        name: "Oatmeal Chocolate Chip Cookies",
        description: "Replace 1 cup of flour with 1 1/2 cups of rolled oats for a heartier texture.",
        keyIngredients: ["Rolled oats", "Chocolate chips", "Cinnamon"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Melted butter makes chewier cookies while softened butter makes them cakier.",
        "Brown sugar adds moisture and a deeper flavor compared to white sugar.",
        "Chilling the dough before baking prevents spreading and intensifies flavors."
      ],
      commonIssues: [
        "Overmixing the dough can develop too much gluten, making cookies tough.",
        "Using too much flour will result in dry, crumbly cookies.",
        "Overbaking makes cookies hard - they should look slightly underdone in center when removed."
      ]
    },
    culturalContext: {
      origin: "United States, late 1930s",
      history: "Chocolate chip cookies were invented in 1938 by Ruth Wakefield at the Toll House Inn in Massachusetts. She added chopped chocolate to cookie dough expecting it to melt and create chocolate cookies, but instead, the chips maintained their shape, creating the now-famous dessert.",
      significance: "One of America's most iconic desserts, symbolizing home baking and comfort food.",
      traditionalServing: "Typically served as a snack, dessert, or with milk as an after-school treat.",
      occasions: ["Bake sales", "Holiday cookie exchanges", "After-school snacks", "Casual gatherings"],
      festiveRelevance: ["Christmas cookie platters", "School functions", "Bake sales"]
    },
    successIndicators: [
      "Edges should be golden brown while centers remain soft",
      "Cookies should have a slightly crisp exterior with a soft, chewy center",
      "Chocolate chips should be melted but maintain their shape",
      "The finished cookie should have a slightly cracked top surface"
    ]
  },
  {
    foodName: "Buffalo Chicken Wings",
    description: "Crispy chicken wings tossed in a spicy buffalo sauce, creating a perfect balance of heat and flavor. This iconic American appetizer is a staple at sports bars and gatherings, especially during game days.",
    tags: ["Appetizer", "American", "Spicy", "Chicken", "Game Day", "Deep-fried", "Party Food"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/19/61/0/IuhbTfTBRlCrX5b8FoVg_wings-2.jpg",
    recipes: [
      {
        title: "Classic Buffalo Chicken Wings",
        description: "The perfect buffalo wings with a crispy exterior and juicy interior, coated in a tangy, spicy sauce.",
        ingredients: [
          "2 lbs chicken wings, separated at joints, tips discarded",
          "1/2 cup all-purpose flour",
          "1/2 teaspoon salt",
          "1/2 teaspoon garlic powder",
          "1/4 teaspoon black pepper",
          "Oil for deep frying",
          "1/3 cup hot sauce (Frank's RedHot recommended)",
          "1/4 cup unsalted butter",
          "1 tablespoon white vinegar",
          "1/4 teaspoon Worcestershire sauce",
          "1/4 teaspoon cayenne pepper (optional for extra heat)"
        ],
        instructions: [
          "Pat chicken wings dry with paper towels.",
          "In a large bowl, mix flour, salt, garlic powder, and black pepper.",
          "Toss wings in the flour mixture until evenly coated.",
          "Heat oil in a deep fryer or large pot to 375°F (190°C).",
          "Fry wings in batches for 10-12 minutes, until golden brown and crispy.",
          "Meanwhile, in a small saucepan, combine hot sauce, butter, vinegar, Worcestershire sauce, and cayenne pepper.",
          "Heat sauce mixture over medium heat until butter is melted and ingredients are well combined.",
          "Place fried wings in a large bowl, pour sauce over them, and toss until evenly coated.",
          "Serve immediately with celery sticks and blue cheese or ranch dressing."
        ],
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        totalTime: "40 minutes",
        servings: "4-6 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 320,
          protein: "18g",
          carbs: "4g",
          fats: "26g",
          fiber: "0g",
          sugar: "0g",
          sodium: "510mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Celery and Carrot Sticks",
        description: "Fresh, crisp vegetables provide a cooling contrast to the spicy wings."
      },
      {
        name: "Blue Cheese Dressing",
        description: "A tangy, creamy dip that helps balance the heat of the buffalo sauce."
      },
      {
        name: "Ranch Dressing",
        description: "A milder alternative to blue cheese that pairs well with spicy wings."
      }
    ],
    variations: [
      {
        name: "Baked Buffalo Wings",
        description: "A healthier alternative that bakes the wings until crispy instead of frying.",
        keyIngredients: ["Baking powder", "Chicken wings", "Buffalo sauce"]
      },
      {
        name: "BBQ Buffalo Wings",
        description: "A sweeter variation that mixes buffalo sauce with barbecue sauce.",
        keyIngredients: ["Buffalo sauce", "BBQ sauce", "Honey"]
      },
      {
        name: "Garlic Parmesan Wings",
        description: "Wings tossed in a garlic butter sauce and sprinkled with parmesan cheese.",
        keyIngredients: ["Butter", "Garlic", "Parmesan cheese"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Double frying creates extra crispy wings - first at a lower temperature to cook through, then at a higher temperature to crisp the skin.",
        "Adding baking powder to wings before baking helps achieve a crispy texture without frying.",
        "The balance of fat (butter) in the sauce helps to mellow the heat and helps the sauce adhere to the wings."
      ],
      commonIssues: [
        "Overcrowding the fryer lowers oil temperature, resulting in greasy wings.",
        "Not drying wings thoroughly before cooking can prevent them from getting crispy.",
        "Adding sauce too soon before serving can make wings soggy."
      ]
    },
    culturalContext: {
      origin: "Buffalo, New York, 1964",
      history: "Buffalo wings were invented at the Anchor Bar in Buffalo, New York, by Teressa Bellissimo. According to the story, she created them by tossing leftover wings in hot sauce as a late-night snack for her son and his friends.",
      significance: "A quintessential American bar food that has become synonymous with sports viewing parties.",
      traditionalServing: "Typically served as an appetizer or snack with celery sticks and blue cheese dressing.",
      occasions: ["Super Bowl parties", "Sports gatherings", "Casual dining", "Bar food"],
      festiveRelevance: ["Super Bowl Sunday", "Major sporting events", "Casual celebrations"]
    },
    successIndicators: [
      "Wings should be crispy on the outside and juicy on the inside",
      "Sauce should completely coat the wings but not make them soggy",
      "The flavor should have a good balance of heat, acidity, and butteriness",
      "Wings should have a vibrant red-orange color from the buffalo sauce"
    ]
  },
  {
    foodName: "Mac and Cheese",
    description: "A comforting dish of pasta coated in a rich, creamy cheese sauce, often baked with a crispy topping. This beloved comfort food is a staple in American cuisine, enjoyed by both children and adults alike.",
    tags: ["Comfort Food", "American", "Pasta", "Cheese", "Baked", "Side Dish", "Main Course", "Vegetarian"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/22/78/34/wCT1cVgdRqK7CZJVYUaR_untitled-2342.jpg",
    recipes: [
      {
        title: "Creamy Baked Mac and Cheese",
        description: "The ultimate mac and cheese with a velvety cheese sauce and crunchy breadcrumb topping.",
        ingredients: [
          "1 pound elbow macaroni",
          "1/2 cup unsalted butter",
          "1/2 cup all-purpose flour",
          "4 cups whole milk, warmed",
          "2 teaspoons salt",
          "1/4 teaspoon ground nutmeg",
          "1/4 teaspoon black pepper",
          "1/4 teaspoon cayenne pepper (optional)",
          "4 cups shredded sharp cheddar cheese",
          "2 cups shredded Gruyère cheese",
          "1 cup Panko breadcrumbs",
          "2 tablespoons melted butter",
          "1/4 cup grated Parmesan cheese"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C) and butter a 9x13 inch baking dish.",
          "Cook macaroni according to package directions, but 2 minutes less than recommended. Drain and set aside.",
          "In a large saucepan, melt 1/2 cup butter over medium heat. Add flour and whisk constantly for 1-2 minutes to create a roux.",
          "Gradually whisk in warm milk, continuing to stir until the mixture is smooth and begins to thicken, about 5-7 minutes.",
          "Remove from heat and stir in salt, nutmeg, black pepper, and cayenne (if using).",
          "Add the cheddar and Gruyère cheeses in handfuls, stirring until completely melted and smooth.",
          "Add the cooked macaroni to the cheese sauce and stir until well combined.",
          "Pour the mixture into the prepared baking dish.",
          "In a small bowl, combine Panko breadcrumbs, melted butter, and Parmesan cheese. Sprinkle evenly over the mac and cheese.",
          "Bake for 25-30 minutes until bubbly and golden brown on top.",
          "Let stand for 5 minutes before serving."
        ],
        prepTime: "25 minutes",
        cookTime: "30 minutes",
        totalTime: "55 minutes",
        servings: "8 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 550,
          protein: "24g",
          carbs: "46g",
          fats: "30g",
          fiber: "1g",
          sugar: "6g",
          sodium: "780mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Garden Salad",
        description: "A crisp green salad provides a fresh contrast to the rich, creamy mac and cheese."
      },
      {
        name: "Roasted Broccoli",
        description: "Oven-roasted broccoli adds a nutritious element and complements the cheesy flavor."
      },
      {
        name: "Garlic Bread",
        description: "Buttery garlic bread is perfect for soaking up any extra cheese sauce."
      }
    ],
    variations: [
      {
        name: "Lobster Mac and Cheese",
        description: "A luxurious version with chunks of lobster meat folded into the cheese sauce.",
        keyIngredients: ["Lobster meat", "Gruyère cheese", "White wine"]
      },
      {
        name: "Buffalo Chicken Mac and Cheese",
        description: "Incorporates shredded chicken and buffalo sauce for a spicy twist.",
        keyIngredients: ["Shredded chicken", "Buffalo sauce", "Blue cheese"]
      },
      {
        name: "Truffle Mac and Cheese",
        description: "An elegant variation with truffle oil or fresh truffles for an earthy flavor.",
        keyIngredients: ["Truffle oil", "Mushrooms", "Fontina cheese"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Starting with a roux (butter and flour mixture) creates a stable base for the cheese sauce.",
        "Using pre-shredded cheese should be avoided as it contains anti-caking agents that can make the sauce grainy.",
        "Undercooking the pasta before baking prevents it from becoming mushy in the final dish."
      ],
      commonIssues: [
        "If the sauce is too hot when adding cheese, it can cause the proteins to separate, resulting in a grainy texture.",
        "Not whisking the roux and milk mixture continuously can lead to lumps in the sauce.",
        "Overbaking can dry out the dish - it should still be slightly creamy when removed from the oven."
      ]
    },
    culturalContext: {
      origin: "United States, with roots in European cheese dishes",
      history: "Macaroni and cheese has been a staple in American cuisine since the late 18th century. Thomas Jefferson is said to have encountered the dish in France and brought the recipe back to America. Kraft introduced the boxed version in 1937, which became hugely popular during the Great Depression and World War II.",
      significance: "A quintessential American comfort food that crosses socioeconomic boundaries.",
      traditionalServing: "Served as a main course or hearty side dish, often at family meals and gatherings.",
      occasions: ["Family dinners", "Potlucks", "Holiday meals (especially Thanksgiving)", "Comfort food occasions"],
      festiveRelevance: ["Southern holiday tables", "Thanksgiving", "Casual gatherings"]
    },
    successIndicators: [
      "The sauce should be smooth and creamy, not grainy or separated",
      "Pasta should be tender but not mushy",
      "The top should be golden brown and slightly crispy",
      "When served, the mac and cheese should be creamy but hold its shape on the plate"
    ]
  },
  {
    foodName: "Classic Meatloaf",
    description: "A hearty dish of seasoned ground meat mixed with other ingredients and formed into a loaf shape, then baked. This American comfort food staple is known for its satisfying flavor and homey appeal.",
    tags: ["Comfort Food", "American", "Beef", "Dinner", "Family Meal", "Baked", "Main Course"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/30/32/45/lYJnFuoSQFO0sAftHXQw_meatloaf5.jpg",
    recipes: [
      {
        title: "Mom's Classic Meatloaf",
        description: "A traditional meatloaf with a tangy glaze that will remind you of home-cooked family dinners.",
        ingredients: [
          "2 pounds ground beef (80/20 mix)",
          "1 cup dried breadcrumbs",
          "1/2 cup diced onion",
          "1/2 cup diced bell pepper",
          "2 eggs, beaten",
          "1/4 cup ketchup",
          "2 tablespoons Worcestershire sauce",
          "1 teaspoon garlic powder",
          "1 teaspoon dried oregano",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "For the glaze:",
          "1/2 cup ketchup",
          "2 tablespoons brown sugar",
          "1 tablespoon Worcestershire sauce",
          "1 teaspoon mustard powder"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C). Line a baking sheet with foil or parchment paper.",
          "In a large bowl, combine ground beef, breadcrumbs, onion, bell pepper, eggs, ketchup, Worcestershire sauce, and seasonings.",
          "Mix gently with your hands until just combined, being careful not to overmix.",
          "Shape the mixture into a loaf (about 9x5 inches) on the prepared baking sheet.",
          "In a small bowl, mix together the glaze ingredients until well combined.",
          "Spread half of the glaze over the top of the meatloaf.",
          "Bake for 40 minutes, then spread the remaining glaze over the top.",
          "Continue baking for an additional 15-20 minutes, or until the internal temperature reaches 160°F (71°C).",
          "Let the meatloaf rest for 10 minutes before slicing and serving."
        ],
        prepTime: "20 minutes",
        cookTime: "1 hour",
        totalTime: "1 hour 20 minutes",
        servings: "8 servings",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 370,
          protein: "25g",
          carbs: "13g",
          fats: "24g",
          fiber: "1g",
          sugar: "6g",
          sodium: "570mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Mashed Potatoes",
        description: "Creamy mashed potatoes are the classic companion to meatloaf."
      },
      {
        name: "Green Beans",
        description: "Simply seasoned green beans add color and a fresh element to the meal."
      },
      {
        name: "Dinner Rolls",
        description: "Soft dinner rolls are perfect for sopping up the meatloaf's juices and glaze."
      }
    ],
    variations: [
      {
        name: "Turkey Meatloaf",
        description: "A lighter version using ground turkey instead of beef.",
        keyIngredients: ["Ground turkey", "Poultry seasoning", "Dried cranberries"]
      },
      {
        name: "Italian Meatloaf",
        description: "Infused with Italian flavors and topped with marinara and cheese.",
        keyIngredients: ["Italian herbs", "Parmesan cheese", "Marinara sauce"]
      },
      {
        name: "Bacon-Wrapped Meatloaf",
        description: "The classic meatloaf wrapped in bacon for extra flavor and moisture.",
        keyIngredients: ["Bacon strips", "Ground beef", "BBQ sauce"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Adding breadcrumbs and eggs helps bind the meat together and retain moisture.",
        "Sautéing vegetables before adding them to the meat mixture enhances their flavor and removes excess moisture.",
        "Letting the meatloaf rest after cooking allows the juices to redistribute, making for easier slicing."
      ],
      commonIssues: [
        "Overmixing the meat mixture can result in a tough, dense meatloaf.",
        "Not using enough binders (eggs and breadcrumbs) can cause the meatloaf to fall apart.",
        "Using meat that's too lean can make the meatloaf dry and crumbly."
      ]
    },
    culturalContext: {
      origin: "United States, with European roots",
      history: "Meatloaf has its origins in scrap meat dishes from medieval Europe. The American version gained popularity during the Great Depression as a way to stretch meat with inexpensive fillers. It became a staple of home cooking in the mid-20th century and remains a nostalgic comfort food.",
      significance: "Represents American home cooking and resourcefulness during tough economic times.",
      traditionalServing: "Served as a main course for family dinners, typically with starchy sides and vegetables.",
      occasions: ["Family weeknight dinners", "Sunday suppers", "Comfort food meals"],
      festiveRelevance: ["Not typically associated with holidays, but common as a everyday family meal"]
    },
    successIndicators: [
      "Meatloaf should hold its shape when sliced but remain moist and tender",
      "The glaze should be caramelized and slightly sticky",
      "The interior should be fully cooked (160°F) but not dry",
      "The flavors should be well-balanced, not too salty or bland"
    ]
  },
  {
    foodName: "Southern Fried Chicken",
    description: "Crispy, golden-brown chicken with a seasoned coating, fried to perfection. This iconic Southern dish is beloved for its crunchy exterior and juicy, flavorful meat.",
    tags: ["Southern", "American", "Chicken", "Fried", "Comfort Food", "Main Course", "Soul Food"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/13/53/93/3pyZnlB1SIqrtmUg9qqb_oven-fried-chicken-5820.jpg",
    recipes: [
      {
        title: "Classic Southern Fried Chicken",
        description: "Crispy, juicy fried chicken with a perfectly seasoned coating, just like grandma used to make.",
        ingredients: [
          "1 whole chicken (about 4 pounds), cut into 8 pieces",
          "2 cups buttermilk",
          "1 tablespoon hot sauce",
          "2 cups all-purpose flour",
          "1 tablespoon salt",
          "1 tablespoon paprika",
          "2 teaspoons garlic powder",
          "2 teaspoons onion powder",
          "1 teaspoon black pepper",
          "1 teaspoon cayenne pepper",
          "1 teaspoon dried thyme",
          "Vegetable oil for frying (about 3-4 cups)"
        ],
        instructions: [
          "In a large bowl, combine buttermilk and hot sauce. Add chicken pieces, making sure they're fully submerged. Cover and refrigerate for at least 4 hours, preferably overnight.",
          "When ready to cook, in a large bowl, combine flour, salt, paprika, garlic powder, onion powder, black pepper, cayenne pepper, and thyme.",
          "Remove chicken from buttermilk, allowing excess to drip off. Dredge each piece thoroughly in the seasoned flour mixture.",
          "In a large, deep skillet or Dutch oven, heat oil to 350°F (175°C). The oil should be about 1-inch deep.",
          "Carefully place a few pieces of chicken in the hot oil, skin side down. Don't overcrowd the pan.",
          "Fry for 10-12 minutes per side, until golden brown and the internal temperature reaches 165°F (74°C).",
          "Transfer fried chicken to a wire rack set over a baking sheet or to a paper towel-lined plate to drain excess oil.",
          "Allow to rest for 5-10 minutes before serving. This helps the coating set and the juices redistribute."
        ],
        prepTime: "20 minutes (plus marinating time)",
        cookTime: "45 minutes",
        totalTime: "1 hour 5 minutes (plus marinating time)",
        servings: "4-6 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 410,
          protein: "28g",
          carbs: "16g",
          fats: "26g",
          fiber: "1g",
          sugar: "1g",
          sodium: "650mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Buttermilk Biscuits",
        description: "Fluffy, tender biscuits are the perfect accompaniment to sop up the juices."
      },
      {
        name: "Collard Greens",
        description: "Slow-cooked collard greens provide a traditional Southern side with a hint of smokiness."
      },
      {
        name: "Macaroni and Cheese",
        description: "Creamy mac and cheese is a classic pairing with fried chicken in Southern cuisine."
      },
      {
        name: "Cole Slaw",
        description: "A tangy, crisp slaw offers a refreshing contrast to the rich fried chicken."
      }
    ],
    variations: [
      {
        name: "Nashville Hot Chicken",
        description: "A spicy variation where the fried chicken is coated in a cayenne-laden oil mixture.",
        keyIngredients: ["Cayenne pepper", "Brown sugar", "Paprika"]
      },
      {
        name: "Buttermilk Oven-Fried Chicken",
        description: "A healthier alternative that achieves crispiness through baking rather than frying.",
        keyIngredients: ["Buttermilk", "Panko breadcrumbs", "Butter"]
      },
      {
        name: "Honey-Dipped Fried Chicken",
        description: "Fried chicken dipped in honey for a sweet and savory flavor combination.",
        keyIngredients: ["Honey", "Black pepper", "Red pepper flakes"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Buttermilk tenderizes the chicken through its acidity while adding flavor.",
        "Double dipping (flour-buttermilk-flour) creates an extra crispy crust.",
        "Maintaining oil temperature is crucial - too hot burns the coating before cooking the chicken, too cool makes greasy chicken."
      ],
      commonIssues: [
        "Crowding the pan lowers oil temperature, resulting in greasy, undercooked chicken.",
        "Frying at too high a temperature makes the outside too dark before the inside is cooked.",
        "Not letting the chicken rest after frying can result in a soggy coating as steam escapes."
      ]
    },
    culturalContext: {
      origin: "Southern United States, with roots in Scottish cooking traditions and West African cuisine",
      history: "Southern fried chicken has its roots in the culinary techniques of West African slaves combined with the frying traditions of Scottish immigrants. It became a staple in Southern cuisine and was popularized nationwide after the Civil War. During the Great Migration, the dish spread northward and eventually became an American classic.",
      significance: "A cornerstone of Southern cuisine and soul food that represents cultural heritage and family traditions.",
      traditionalServing: "Traditionally served as a special Sunday dinner or for gatherings and celebrations.",
      occasions: ["Sunday dinners", "Church gatherings", "Family reunions", "Picnics"],
      festiveRelevance: ["Juneteenth celebrations", "Southern family gatherings", "Summer picnics"]
    },
    successIndicators: [
      "Skin should be crispy and golden brown, not burnt or pale",
      "Meat should be juicy and tender, not dry or bloody",
      "Coating should adhere well to the chicken, not falling off when cut",
      "Flavor should be well-seasoned with a balance of salt and spices"
    ]
  },
  {
    foodName: "Classic Cheesecake",
    description: "A rich, creamy dessert consisting of a smooth cream cheese filling on a graham cracker crust. This elegant dessert is known for its velvety texture and versatility with various toppings and flavors.",
    tags: ["Dessert", "American", "Baking", "Cream Cheese", "Sweet", "Celebratory", "Cheesecake"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/30/01/7/WrpGNJPYSquyFWvcbR8o_CHEESECAKE-4.jpg",
    recipes: [
      {
        title: "New York Style Cheesecake",
        description: "A classic, dense and creamy cheesecake with a crisp graham cracker crust.",
        ingredients: [
          "For the crust:",
          "1 1/2 cups graham cracker crumbs (about 15 full sheets)",
          "5 tablespoons unsalted butter, melted",
          "1/4 cup granulated sugar",
          "1/4 teaspoon salt",
          "For the filling:",
          "4 (8-ounce) packages cream cheese, room temperature",
          "1 1/2 cups granulated sugar",
          "5 large eggs, room temperature",
          "2 teaspoons vanilla extract",
          "1/4 cup heavy cream",
          "1/4 cup sour cream",
          "1 tablespoon fresh lemon juice",
          "1 tablespoon cornstarch"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C). Wrap the outside of a 9-inch springform pan with aluminum foil (to prevent water from seeping in during the water bath).",
          "For the crust: In a medium bowl, combine graham cracker crumbs, melted butter, sugar, and salt. Press the mixture firmly into the bottom and about 1 inch up the sides of the springform pan.",
          "Bake the crust for 10 minutes, then set aside to cool. Reduce oven temperature to 325°F (160°C).",
          "For the filling: In a large bowl, beat the cream cheese and sugar with an electric mixer on medium speed until smooth and fluffy, about 4 minutes.",
          "Add eggs one at a time, beating well after each addition. Scrape down the sides of the bowl as needed.",
          "Beat in vanilla extract, heavy cream, sour cream, lemon juice, and cornstarch until just combined. The mixture should be smooth but not over-beaten.",
          "Pour the filling onto the cooled crust and smooth the top.",
          "Place the springform pan in a larger roasting pan. Fill the roasting pan with hot water until it reaches halfway up the sides of the springform pan.",
          "Bake for 1 hour and 15-30 minutes, or until the edges are set but the center still has a slight jiggle.",
          "Turn off the oven, crack the door open, and let the cheesecake cool in the oven for 1 hour.",
          "Remove from the oven, run a knife around the edges, and let cool completely at room temperature.",
          "Refrigerate for at least 4 hours, preferably overnight, before serving."
        ],
        prepTime: "30 minutes",
        cookTime: "1 hour 30 minutes",
        totalTime: "2 hours (plus cooling and chilling time)",
        servings: "12 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 450,
          protein: "7g",
          carbs: "34g",
          fats: "32g",
          fiber: "0g",
          sugar: "27g",
          sodium: "300mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Fresh Berry Compote",
        description: "A vibrant mixture of fresh berries in a light syrup that complements the rich cheesecake."
      },
      {
        name: "Whipped Cream",
        description: "A dollop of freshly whipped cream adds lightness to the dense cheesecake."
      },
      {
        name: "Chocolate Sauce",
        description: "A drizzle of warm chocolate sauce creates a delightful flavor contrast."
      }
    ],
    variations: [
      {
        name: "Strawberry Swirl Cheesecake",
        description: "Classic cheesecake with a vibrant strawberry puree swirled throughout the filling.",
        keyIngredients: ["Strawberry puree", "Cream cheese", "Graham cracker crust"]
      },
      {
        name: "Chocolate Cheesecake",
        description: "A rich variation with cocoa powder and chocolate chips incorporated into the filling.",
        keyIngredients: ["Cocoa powder", "Chocolate chips", "Chocolate cookie crust"]
      },
      {
        name: "Caramel Pecan Cheesecake",
        description: "Topped with a luscious caramel sauce and candied pecans for a decadent dessert.",
        keyIngredients: ["Caramel sauce", "Pecans", "Brown sugar"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Room temperature ingredients are essential for a smooth, lump-free filling.",
        "A water bath (bain-marie) helps regulate temperature and prevent cracks by creating a humid environment.",
        "Gradual cooling prevents the cheesecake from sinking or cracking due to sudden temperature changes."
      ],
      commonIssues: [
        "Overmixing incorporates too much air, causing the cheesecake to rise and then crack as it cools.",
        "Baking at too high a temperature can cause uneven cooking and cracks.",
        "Opening the oven door during baking can cause dramatic temperature fluctuations and collapse."
      ]
    },
    culturalContext: {
      origin: "Ancient Greece, with modern adaptations in New York",
      history: "Cheesecake dates back to ancient Greece, where it was served to athletes during the first Olympic Games. The modern cream cheese version was developed in New York in the 1900s when cream cheese was invented. The New York style cheesecake became famous at Junior's restaurant in Brooklyn, established in the 1950s.",
      significance: "A symbol of indulgence and celebration in American dessert culture.",
      traditionalServing: "Served chilled as a dessert, often at special occasions or in upscale restaurants.",
      occasions: ["Special celebrations", "Holiday desserts", "Restaurant dining", "Dinner parties"],
      festiveRelevance: ["Holidays", "Birthdays", "Anniversaries", "Special dinners"]
    },
    successIndicators: [
      "The cheesecake should have a slight jiggle in the center when done, but not be liquid",
      "The top should be smooth and even in color, without significant cracks",
      "The texture should be creamy and dense, not grainy or rubbery",
      "The crust should be firm and hold together when sliced"
    ]
  },
  {
    foodName: "Beef Stew",
    description: "A hearty dish of beef slow-cooked with vegetables in a rich, savory broth until tender. This warming comfort food is perfect for cold weather and has variations across many cultures.",
    tags: ["Comfort Food", "American", "Beef", "Stew", "Winter", "One-pot", "Slow-cooked", "Main Course"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/20/66/59/yG5OFalfTiyg13bTSSJf_beef-stew-2.jpg",
    recipes: [
      {
        title: "Classic Beef Stew",
        description: "A rich, savory beef stew with tender meat, hearty vegetables, and a flavorful broth.",
        ingredients: [
          "2 pounds beef chuck, cut into 1-inch cubes",
          "1/4 cup all-purpose flour",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "3 tablespoons vegetable oil",
          "2 onions, chopped",
          "3 cloves garlic, minced",
          "1 tablespoon tomato paste",
          "4 cups beef broth",
          "1 cup red wine (optional)",
          "1 bay leaf",
          "1 teaspoon dried thyme",
          "4 carrots, peeled and cut into chunks",
          "3 celery stalks, cut into chunks",
          "1 pound potatoes, peeled and cut into chunks",
          "2 tablespoons fresh parsley, chopped"
        ],
        instructions: [
          "In a large bowl, toss beef cubes with flour, salt, and pepper until evenly coated.",
          "In a large heavy pot or Dutch oven, heat oil over medium-high heat. Working in batches, brown the beef on all sides, about 3-4 minutes per batch. Transfer to a plate.",
          "In the same pot, add onions and cook until softened, about 5 minutes. Add garlic and cook for 30 seconds more.",
          "Stir in tomato paste and cook for 1 minute.",
          "Pour in beef broth and wine (if using), scraping up any browned bits from the bottom of the pot.",
          "Return beef to the pot along with any accumulated juices. Add bay leaf and thyme.",
          "Bring to a boil, then reduce heat to low. Cover and simmer for 1.5 hours, or until meat is starting to become tender.",
          "Add carrots, celery, and potatoes to the pot. Continue to simmer, covered, for another 45 minutes, or until vegetables and meat are very tender.",
          "If the stew is too thin, simmer uncovered for the last 15 minutes to thicken.",
          "Remove bay leaf, adjust seasoning with salt and pepper if needed.",
          "Garnish with fresh parsley before serving."
        ],
        prepTime: "30 minutes",
        cookTime: "2 hours 30 minutes",
        totalTime: "3 hours",
        servings: "6 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 410,
          protein: "35g",
          carbs: "26g",
          fats: "16g",
          fiber: "4g",
          sugar: "5g",
          sodium: "680mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Crusty Bread",
        description: "A loaf of crusty bread is perfect for sopping up the flavorful stew broth."
      },
      {
        name: "Green Salad",
        description: "A simple green salad with a light vinaigrette provides a fresh contrast to the hearty stew."
      },
      {
        name: "Mashed Potatoes",
        description: "Creamy mashed potatoes make a comforting bed for serving the stew."
      }
    ],
    variations: [
      {
        name: "Guinness Beef Stew",
        description: "Uses Guinness stout instead of wine for a deep, malty flavor.",
        keyIngredients: ["Guinness stout", "Beef chuck", "Root vegetables"]
      },
      {
        name: "Provençal Beef Stew (Daube)",
        description: "A French variation with herbes de Provence, olives, and orange zest.",
        keyIngredients: ["Herbes de Provence", "Orange zest", "Black olives"]
      },
      {
        name: "Beef Bourguignon",
        description: "An elegant French stew with bacon, mushrooms, and pearl onions in a red wine sauce.",
        keyIngredients: ["Bacon", "Mushrooms", "Pearl onions", "Burgundy wine"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Browning the meat creates a Maillard reaction, developing deep flavors in the stew.",
        "Slow cooking breaks down tough connective tissues in cheaper cuts of meat, making them tender.",
        "Vegetables are added later in the cooking process to prevent them from becoming mushy."
      ],
      commonIssues: [
        "Not browning meat properly results in less flavor development.",
        "Cooking at too high a temperature can make the meat tough and dry.",
        "Adding flour directly to hot liquid can create lumps; coat the meat or create a roux instead."
      ]
    },
    culturalContext: {
      origin: "Universal dish with variations across many cultures",
      history: "Stewing meat with vegetables is one of the oldest cooking methods, dating back to prehistoric times. Beef stew as we know it today became popular in America and Europe during the 19th century when cast iron stoves made long, slow cooking more accessible to ordinary households.",
      significance: "Represents resourcefulness and the ability to transform humble ingredients into satisfying meals.",
      traditionalServing: "Served as a main course, especially during colder months, often with bread or over starches.",
      occasions: ["Family dinners", "Cold weather meals", "Comfort food occasions"],
      festiveRelevance: ["Winter gatherings", "Casual family meals"]
    },
    successIndicators: [
      "Beef should be fork-tender, easily breaking apart",
      "Vegetables should be soft but still hold their shape",
      "Broth should be rich and flavorful, not watery or bland",
      "The stew should have a balanced thickness - not too thin or too thick"
    ]
  },
  {
    foodName: "Chicken Pot Pie",
    description: "A savory pie filled with chunks of chicken, vegetables, and a creamy sauce, all encased in a flaky pastry crust. This classic comfort food is the epitome of home cooking and heartiness.",
    tags: ["Comfort Food", "American", "Chicken", "Pie", "Baked", "Main Course", "Family Meal"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/37/81/42/HHq2XBRFiulw4jFVFgQ3_chicken%20pot%20pie-1.jpg",
    recipes: [
      {
        title: "Homemade Chicken Pot Pie",
        description: "A comforting chicken pot pie with a buttery, flaky crust and creamy chicken and vegetable filling.",
        ingredients: [
          "For the crust:",
          "2 1/2 cups all-purpose flour",
          "1 teaspoon salt",
          "1 cup cold unsalted butter, cubed",
          "1/2 cup ice water",
          "For the filling:",
          "4 tablespoons unsalted butter",
          "1 large onion, diced",
          "3 carrots, diced",
          "2 celery stalks, diced",
          "3 cloves garlic, minced",
          "1/3 cup all-purpose flour",
          "3 cups chicken broth",
          "1/2 cup heavy cream",
          "3 cups cooked chicken, shredded or cubed",
          "1 cup frozen peas",
          "1 tablespoon fresh thyme leaves (or 1 teaspoon dried)",
          "1 tablespoon fresh parsley, chopped",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "1 egg beaten with 1 tablespoon water (for egg wash)"
        ],
        instructions: [
          "For the crust: In a food processor, pulse flour and salt. Add butter and pulse until mixture resembles coarse meal with some pea-size pieces. Add ice water 1 tablespoon at a time, pulsing until dough just holds together. Divide dough in half, shape into disks, wrap in plastic and refrigerate for at least 1 hour.",
          "Preheat oven to 400°F (200°C).",
          "For the filling: In a large saucepan, melt butter over medium heat. Add onion, carrots, and celery, and cook until softened, about 8-10 minutes. Add garlic and cook for 30 seconds more.",
          "Sprinkle flour over vegetables and stir constantly for 1-2 minutes.",
          "Gradually stir in chicken broth and cream. Bring to a simmer and cook until thickened, about 5 minutes.",
          "Stir in chicken, peas, thyme, parsley, salt, and pepper. Remove from heat and let cool slightly.",
          "Roll out one disk of dough on a floured surface to a 12-inch round. Transfer to a 9-inch pie dish.",
          "Pour the filling into the crust.",
          "Roll out the second disk of dough and place over the filling. Trim edges, leaving a slight overhang. Fold and crimp edges to seal.",
          "Cut several slits in the top crust to allow steam to escape. Brush with egg wash.",
          "Bake for 30-35 minutes, or until crust is golden brown and filling is bubbling. If edges brown too quickly, cover with foil.",
          "Let cool for 15 minutes before serving."
        ],
        prepTime: "45 minutes (plus chilling time)",
        cookTime: "35 minutes",
        totalTime: "1 hour 20 minutes (plus chilling time)",
        servings: "6-8 servings",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 520,
          protein: "25g",
          carbs: "43g",
          fats: "28g",
          fiber: "3g",
          sugar: "4g",
          sodium: "750mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Green Salad",
        description: "A simple green salad with a light vinaigrette complements the rich pot pie."
      },
      {
        name: "Cranberry Sauce",
        description: "A tangy cranberry sauce provides a bright contrast to the savory pie."
      },
      {
        name: "Roasted Brussels Sprouts",
        description: "Crispy roasted Brussels sprouts add a nutritious element to the meal."
      }
    ],
    variations: [
      {
        name: "Turkey Pot Pie",
        description: "Uses leftover turkey instead of chicken, perfect for after Thanksgiving.",
        keyIngredients: ["Turkey", "Sage", "Cranberries"]
      },
      {
        name: "Vegetable Pot Pie",
        description: "A vegetarian version packed with seasonal vegetables and herbs.",
        keyIngredients: ["Mushrooms", "Root vegetables", "Vegetable broth"]
      },
      {
        name: "Seafood Pot Pie",
        description: "A coastal variation with shrimp, scallops, and fish in a creamy sauce.",
        keyIngredients: ["Mixed seafood", "Dill", "White wine"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Cold ingredients and minimal handling are key to a flaky pie crust.",
        "Creating a roux with butter and flour thickens the filling properly.",
        "Venting the top crust allows steam to escape, preventing a soggy bottom crust."
      ],
      commonIssues: [
        "Overhandling the dough creates tough crust due to gluten development.",
        "Filling that's too hot when added to the crust can make the bottom soggy.",
        "Not allowing the pie to rest after baking can result in a filling that's too runny when served."
      ]
    },
    culturalContext: {
      origin: "Europe and North America",
      history: "Pot pies have been around since the Roman Empire, but the modern chicken pot pie gained popularity in America after World War II when home cooking saw a resurgence. It became a staple of American comfort food in the mid-20th century.",
      significance: "Represents home cooking, comfort, and resourcefulness in using leftovers.",
      traditionalServing: "Served as a complete main course for family dinners, especially in fall and winter.",
      occasions: ["Family dinners", "Comfort food meals", "Cold weather dining"],
      festiveRelevance: ["Post-holiday meals using leftover turkey or chicken", "Winter gatherings"]
    },
    successIndicators: [
      "Crust should be golden brown and flaky",
      "Filling should be creamy and thick, not runny",
      "Vegetables should be tender but not mushy",
      "The bottom crust should be baked through, not doughy or soggy"
    ]
  },
  {
    foodName: "Buttermilk Pancakes",
    description: "Light, fluffy pancakes made with buttermilk for a slight tang, typically served as a breakfast dish topped with butter and maple syrup. A staple of American breakfast culture, these versatile pancakes can be customized with various add-ins and toppings.",
    tags: ["Breakfast", "American", "Brunch", "Sweet", "Griddle", "Quick", "Family Favorite"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/51/84/99/8iL07n7OSQqhIVULNqze_0S9A3254.jpg",
    recipes: [
      {
        title: "Classic Buttermilk Pancakes",
        description: "Fluffy, tender pancakes with that classic buttermilk flavor, perfect for weekend mornings.",
        ingredients: [
          "2 cups all-purpose flour",
          "2 tablespoons granulated sugar",
          "1 teaspoon baking powder",
          "1/2 teaspoon baking soda",
          "1/2 teaspoon salt",
          "2 cups buttermilk",
          "2 large eggs",
          "1/4 cup unsalted butter, melted and cooled",
          "1 teaspoon vanilla extract",
          "Butter or oil for griddle"
        ],
        instructions: [
          "In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.",
          "In a separate bowl, whisk together buttermilk, eggs, melted butter, and vanilla extract.",
          "Pour the wet ingredients into the dry ingredients and stir just until combined. Some small lumps are fine - do not overmix.",
          "Let the batter rest for 5-10 minutes while you heat a griddle or large non-stick skillet over medium heat.",
          "Lightly grease the griddle with butter or oil.",
          "For each pancake, pour about 1/4 cup of batter onto the griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.",
          "Flip and cook until the second side is golden brown, about 1-2 minutes more.",
          "Transfer to a warm plate or keep warm in a 200°F oven while you cook the remaining pancakes.",
          "Serve with butter and maple syrup, or your choice of toppings."
        ],
        prepTime: "15 minutes",
        cookTime: "20 minutes",
        totalTime: "35 minutes",
        servings: "4-6 servings (12-16 pancakes)",
        skillLevel: "Easy",
        nutritionInfo: {
          calories: 280,
          protein: "8g",
          carbs: "36g",
          fats: "11g",
          fiber: "1g",
          sugar: "8g",
          sodium: "360mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Bacon",
        description: "Crispy bacon provides a savory contrast to the sweet pancakes."
      },
      {
        name: "Scrambled Eggs",
        description: "Fluffy scrambled eggs add protein to complete the breakfast."
      },
      {
        name: "Fresh Fruit",
        description: "A bowl of fresh berries or sliced fruits adds color and freshness to the meal."
      }
    ],
    variations: [
      {
        name: "Blueberry Pancakes",
        description: "Fresh or frozen blueberries folded into the batter or sprinkled onto the pancakes while cooking.",
        keyIngredients: ["Blueberries", "Lemon zest", "Buttermilk"]
      },
      {
        name: "Banana Pancakes",
        description: "Mashed ripe bananas incorporated into the batter for natural sweetness.",
        keyIngredients: ["Ripe bananas", "Cinnamon", "Chopped walnuts"]
      },
      {
        name: "Chocolate Chip Pancakes",
        description: "A kid-friendly version with chocolate chips throughout the pancakes.",
        keyIngredients: ["Chocolate chips", "Vanilla extract", "Whipped cream"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "Buttermilk's acidity reacts with the baking soda, creating carbon dioxide that helps pancakes rise.",
        "Resting the batter allows the flour to hydrate and the leavening agents to activate.",
        "Cooking at the right temperature ensures pancakes cook through without burning - bubbles forming and popping is a key indicator of readiness to flip."
      ],
      commonIssues: [
        "Overmixing the batter develops gluten, resulting in tough, chewy pancakes instead of fluffy ones.",
        "Too high heat burns the outside before the inside cooks through.",
        "Flipping too early or too late can result in undercooked centers or overly browned exteriors."
      ]
    },
    culturalContext: {
      origin: "United States, with roots in European griddle cakes",
      history: "Pancakes have ancient origins, with variations found in cultures worldwide. The American buttermilk pancake evolved from European recipes brought by settlers, with the distinctive use of buttermilk developing in the 19th century when it was a common byproduct of butter-making on farms.",
      significance: "Symbolizes weekend family breakfasts and leisurely mornings in American culture.",
      traditionalServing: "Typically served for breakfast or brunch, stacked high with butter and maple syrup.",
      occasions: ["Weekend breakfasts", "Brunch gatherings", "Shrove Tuesday/Pancake Day", "Breakfast-for-dinner nights"],
      festiveRelevance: ["Shrove Tuesday", "National Pancake Day", "Weekend family breakfasts"]
    },
    successIndicators: [
      "Pancakes should rise to about 1/2 inch thick",
      "The exterior should be golden brown with a slightly crisp edge",
      "The interior should be light, fluffy, and fully cooked, not doughy",
      "Pancakes should have a slight tanginess from the buttermilk"
    ]
  },
  {
    foodName: "Homemade Pizza",
    description: "A versatile dish consisting of a round, flattened dough topped with tomato sauce, cheese, and various toppings, then baked at a high temperature. This beloved food allows for endless creativity with toppings and crust styles.",
    tags: ["Italian-American", "Main Course", "Baking", "Cheese", "Versatile", "Family Favorite", "Dinner"],
    imageUrl: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/22/78/42/3U4JVEsYSNO5XlWkzxgR_0S9A4153.jpg",
    recipes: [
      {
        title: "Homemade Pizza from Scratch",
        description: "A classic homemade pizza with a chewy, flavorful crust, tangy tomato sauce, and melty cheese.",
        ingredients: [
          "For the dough:",
          "3 1/2 cups all-purpose flour",
          "1 teaspoon sugar",
          "2 1/4 teaspoons (1 packet) active dry yeast",
          "2 teaspoons salt",
          "1 1/2 cups warm water (110°F)",
          "2 tablespoons olive oil, plus more for the bowl",
          "For the sauce:",
          "1 (28-ounce) can crushed tomatoes",
          "2 tablespoons olive oil",
          "2 cloves garlic, minced",
          "1 teaspoon dried oregano",
          "1 teaspoon dried basil",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "1 teaspoon sugar",
          "For the toppings:",
          "16 ounces mozzarella cheese, shredded",
          "1/4 cup grated Parmesan cheese",
          "Optional toppings: pepperoni, sausage, mushrooms, bell peppers, onions, olives, etc."
        ],
        instructions: [
          "For the dough: In a large bowl, combine 1 cup of flour, sugar, yeast, and salt.",
          "Add warm water and 2 tablespoons olive oil. Beat until well combined.",
          "Gradually add remaining flour, mixing until a soft dough forms.",
          "Knead on a floured surface for about 5-7 minutes, until smooth and elastic.",
          "Place in an oiled bowl, turning to coat. Cover and let rise in a warm place for 1 hour, or until doubled in size.",
          "For the sauce: In a saucepan, heat olive oil over medium heat. Add garlic and cook for 30 seconds.",
          "Add crushed tomatoes, oregano, basil, salt, pepper, and sugar. Simmer for 15-20 minutes, stirring occasionally. Set aside to cool.",
          "Preheat oven to 475°F (245°C). If using a pizza stone, place it in the oven while preheating.",
          "Punch down dough and divide in half (for two 12-inch pizzas). Let rest for 5 minutes.",
          "On a floured surface, roll or stretch each piece into a 12-inch circle. If not using a pizza stone, place on baking sheets sprinkled with cornmeal.",
          "Spread sauce over dough, leaving a 1/2-inch border. Top with cheeses and desired toppings.",
          "Bake for 12-15 minutes, until crust is golden and cheese is bubbly and slightly browned.",
          "Let cool for a few minutes before slicing and serving."
        ],
        prepTime: "30 minutes (plus 1 hour rising time)",
        cookTime: "15 minutes",
        totalTime: "1 hour 45 minutes",
        servings: "2 12-inch pizzas (8 slices each)",
        skillLevel: "Intermediate",
        nutritionInfo: {
          calories: 280,
          protein: "12g",
          carbs: "35g",
          fats: "10g",
          fiber: "2g",
          sugar: "3g",
          sodium: "550mg"
        }
      }
    ],
    sideDishes: [
      {
        name: "Garden Salad",
        description: "A fresh green salad balances the richness of the pizza."
      },
      {
        name: "Garlic Knots",
        description: "Small knots of pizza dough brushed with garlic butter and baked until golden."
      },
      {
        name: "Antipasto Platter",
        description: "An array of Italian meats, cheeses, olives, and marinated vegetables."
      }
    ],
    variations: [
      {
        name: "Thin Crust Pizza",
        description: "A crispier version with a thin, cracker-like crust.",
        keyIngredients: ["Less yeast", "High-gluten flour", "Minimal toppings"]
      },
      {
        name: "Deep Dish Pizza",
        description: "Chicago-style pizza with a thick crust and layers of toppings in a deep pan.",
        keyIngredients: ["Butter in dough", "Chunky tomato sauce", "Layered toppings"]
      },
      {
        name: "White Pizza",
        description: "No tomato sauce, just olive oil, garlic, and various cheeses.",
        keyIngredients: ["Ricotta cheese", "Garlic-infused olive oil", "Fresh herbs"]
      }
    ],
    cookingScience: {
      keyPrinciples: [
        "High oven temperature is crucial for proper crust development and char.",
        "The protein content in flour affects chewiness - bread flour makes a chewier crust than all-purpose.",
        "Allowing dough to rise slowly (even overnight in the refrigerator) develops more complex flavors."
      ],
      commonIssues: [
        "Overloading with toppings can make the center soggy and prevent proper cooking.",
        "Not preheating the oven sufficiently results in a pale, undercooked crust.",
        "Rolling dough too thin in the center can cause it to tear or burn before toppings are cooked."
      ]
    },
    culturalContext: {
      origin: "Italy, with American adaptations",
      history: "Pizza originated in Naples, Italy, as a simple flatbread with toppings. Italian immigrants brought it to America in the early 20th century, where it evolved with more abundant toppings and variations. The first pizzeria in America, Lombardi's, opened in New York City in 1905.",
      significance: "Represents cultural fusion and the adaptation of immigrant foods into mainstream American cuisine.",
      traditionalServing: "Served as a main course, either whole or sliced into triangular pieces.",
      occasions: ["Casual dinners", "Game nights", "Parties", "Movie nights", "Family gatherings"],
      festiveRelevance: ["Casual celebrations", "Sports viewing parties", "Friday night traditions"]
    },
    successIndicators: [
      "Crust should be golden brown with some darker spots, crisp on the outside and chewy inside",
      "Cheese should be fully melted and slightly browned in spots",
      "Toppings should be cooked through but not burnt",
      "The bottom of the crust should be firm and slightly charred, not soggy"
    ]
  }
];