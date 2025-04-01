import { AnalyzeImageResponse } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

/**
 * Recipes from Pinch of Yum website (Part 1 of 3)
 * These recipes provide variety to the recipe library
 */
export const pinchOfYumRecipes1: AnalyzeImageResponse[] = [
  {
    foodName: "Chicken Wild Rice Soup",
    description: "A hearty, creamy soup featuring tender chicken, nutty wild rice, and vegetables in a rich broth. This comforting dish combines the earthy flavor of wild rice with savory chicken and aromatic herbs, creating a nourishing meal perfect for colder days. The velvety texture and robust flavor profile make it a classic comfort food with Midwestern roots.",
    tags: ["Soup", "Chicken", "Comfort Food", "Midwestern", "Creamy", "One Pot", "Winter", "Lunch", "Dinner"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Creamy Chicken Wild Rice Soup",
        description: "This soul-warming chicken wild rice soup features a silky, creamy broth loaded with shredded chicken, nutty wild rice, tender vegetables, and aromatic herbs. Each spoonful delivers the perfect balance of hearty and comforting flavors in a dish that's both elegant enough for guests and simple enough for weeknight dinners.",
        prepTime: "15 minutes",
        cookTime: "45 minutes",
        totalTime: "1 hour",
        servings: 6,
        servingSize: "1.5 cups",
        difficulty: "Medium",
        tags: ["Soup", "Chicken", "Rice", "Comfort Food", "Make Ahead"],
        ingredients: [
          "6 tablespoons butter, divided",
          "1 onion, diced",
          "3 carrots, diced",
          "3 celery stalks, diced",
          "1 teaspoon dried thyme",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "3/4 cup all-purpose flour",
          "8 cups chicken broth",
          "2.5 cups cooked wild rice (about 3/4 cup uncooked)",
          "3 cups shredded cooked chicken (rotisserie works well)",
          "1 cup half-and-half or heavy cream",
          "2 tablespoons fresh parsley, chopped",
          "1 tablespoon lemon juice (optional)",
          "Additional salt and pepper to taste"
        ],
        instructions: [
          "Melt 2 tablespoons of butter in a large Dutch oven or soup pot over medium heat.",
          "Add onion, carrots, and celery. Cook for 8-10 minutes until vegetables are softened.",
          "Add thyme, salt, and pepper, and cook for another minute until fragrant.",
          "Remove vegetables from the pot and set aside.",
          "In the same pot, melt the remaining 4 tablespoons of butter over medium heat.",
          "Add flour and cook, whisking constantly, for 1-2 minutes to create a roux (do not let it brown).",
          "Gradually whisk in the chicken broth, about 1 cup at a time, stirring well after each addition to avoid lumps.",
          "Bring to a simmer and cook for 5 minutes, stirring frequently, until slightly thickened.",
          "Add the cooked vegetables back to the pot, along with the cooked wild rice and shredded chicken.",
          "Simmer for 15-20 minutes to allow flavors to meld.",
          "Stir in the half-and-half or heavy cream and cook for another 5 minutes. Do not boil after adding cream.",
          "Remove from heat and stir in parsley and lemon juice (if using).",
          "Taste and adjust seasonings as needed.",
          "Let the soup rest for about 10 minutes before serving, as it will continue to thicken."
        ],
        nutritionInfo: {
          calories: 425,
          protein: "25g",
          carbs: "32g",
          fats: "22g",
          fiber: "3g",
          sugar: "4g",
          sodium: "950mg"
        }
      }
    ]
  },
  {
    foodName: "Instant Pot Mac and Cheese",
    description: "A quick and creamy version of the classic comfort food, made in the Instant Pot for convenience. This dish features tender macaroni pasta coated in a rich, velvety cheese sauce made with sharp cheddar and creamy American cheese. The pressure cooker method ensures perfectly cooked pasta and a smooth sauce in a fraction of the traditional time.",
    tags: ["Pasta", "Comfort Food", "Instant Pot", "Quick", "Kid-friendly", "Vegetarian", "Dinner", "Lunch"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Creamy Instant Pot Mac and Cheese",
        description: "This ultra-creamy mac and cheese made in the Instant Pot delivers all the comfort of the classic dish in a fraction of the time. The one-pot pressure cooking method ensures perfectly tender pasta and a silky-smooth cheese sauce without the need for a separate roux or sauce pot. It's the ultimate no-fuss comfort food that both kids and adults will love.",
        prepTime: "5 minutes",
        cookTime: "15 minutes",
        totalTime: "20 minutes",
        servings: 6,
        servingSize: "1 cup",
        difficulty: "Easy",
        tags: ["Pasta", "Instant Pot", "Vegetarian", "Kid-friendly"],
        ingredients: [
          "1 pound (16 oz) elbow macaroni",
          "4 cups water",
          "2 tablespoons butter",
          "1 tablespoon mustard powder",
          "1 teaspoon garlic powder",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "1 cup whole milk",
          "2 cups sharp cheddar cheese, freshly grated",
          "1 cup American cheese (like Velveeta), cubed",
          "1/4 cup Parmesan cheese, grated",
          "2 tablespoons cream cheese (optional, for extra creaminess)",
          "2 tablespoons fresh chives, chopped (for garnish)"
        ],
        instructions: [
          "Add the macaroni, water, butter, mustard powder, garlic powder, salt, and pepper to the Instant Pot. Stir to combine and make sure all pasta is submerged in the water.",
          "Secure the lid and set the valve to sealing position. Cook on Manual/Pressure Cook (high pressure) for 4 minutes.",
          "Once the cooking cycle is complete, perform a quick release of the pressure by carefully turning the valve to venting.",
          "Open the lid and check that the pasta is tender. There should be some liquid remaining in the pot, which will form the base for the cheese sauce.",
          "With the Instant Pot on 'Keep Warm' mode, add the milk and stir.",
          "Gradually add the cheddar, American cheese, Parmesan, and cream cheese (if using), stirring constantly until all the cheese is melted and the sauce is smooth.",
          "The sauce will continue to thicken as it sits. If it becomes too thick, add a splash more milk to achieve your desired consistency.",
          "Taste and adjust seasonings if needed.",
          "Serve immediately, garnished with fresh chives."
        ],
        nutritionInfo: {
          calories: 490,
          protein: "22g",
          carbs: "48g",
          fats: "24g",
          fiber: "2g",
          sugar: "3g",
          sodium: "750mg"
        }
      }
    ]
  },
  {
    foodName: "Lemon Blueberry Pancakes",
    description: "Light and fluffy pancakes dotted with juicy blueberries and brightened with fresh lemon zest. These golden-brown breakfast treats combine the sweet pop of berries with a subtle citrus tang, creating a perfect balance of flavors. Ideal for lazy weekend mornings, these pancakes offer a refreshing twist on a breakfast classic.",
    tags: ["Breakfast", "Brunch", "Pancakes", "Sweet", "Fruit", "Vegetarian", "Kid-friendly", "Weekend"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Fluffy Lemon Blueberry Pancakes",
        description: "These light and airy pancakes feature the perfect balance of sweet blueberries and bright lemon for a breakfast treat that tastes like sunshine on a plate. The buttermilk batter creates an exceptionally tender texture, while the fresh fruit adds bursts of juicy flavor in every bite. Top with maple syrup for a delicious weekend breakfast or brunch centerpiece.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        servingSize: "3 pancakes",
        difficulty: "Easy",
        tags: ["Breakfast", "Brunch", "Vegetarian", "Fruit"],
        ingredients: [
          "2 cups all-purpose flour",
          "2 tablespoons granulated sugar",
          "1 teaspoon baking powder",
          "1/2 teaspoon baking soda",
          "1/4 teaspoon salt",
          "2 cups buttermilk",
          "2 large eggs",
          "3 tablespoons unsalted butter, melted and cooled",
          "2 tablespoons fresh lemon juice",
          "2 teaspoons lemon zest",
          "1 teaspoon vanilla extract",
          "1 1/2 cups fresh blueberries, plus more for serving",
          "Butter or oil for cooking",
          "Maple syrup, for serving",
          "Powdered sugar, for dusting (optional)",
          "Additional lemon zest, for garnish (optional)"
        ],
        instructions: [
          "In a large bowl, whisk together the flour, sugar, baking powder, baking soda, and salt.",
          "In a separate bowl, whisk together the buttermilk, eggs, melted butter, lemon juice, lemon zest, and vanilla extract.",
          "Pour the wet ingredients into the dry ingredients and stir just until combined. Some lumps are okay – do not overmix.",
          "Gently fold in the blueberries.",
          "Let the batter rest for 5 minutes to allow the gluten to relax and the leavening agents to activate.",
          "Heat a large non-stick skillet or griddle over medium heat. Lightly coat with butter or oil.",
          "For each pancake, pour about 1/4 cup of batter onto the hot griddle.",
          "Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.",
          "Flip and cook until the second side is golden brown, about 1-2 minutes more.",
          "Transfer cooked pancakes to a warm oven (about 200°F) to keep warm while you cook the remaining batter.",
          "Serve the pancakes stacked, topped with additional fresh blueberries, a drizzle of maple syrup, and a light dusting of powdered sugar if desired.",
          "Garnish with additional lemon zest for an extra pop of color and flavor."
        ],
        nutritionInfo: {
          calories: 420,
          protein: "12g",
          carbs: "64g",
          fats: "14g",
          fiber: "3g",
          sugar: "20g",
          sodium: "450mg"
        }
      }
    ]
  },
  {
    foodName: "Sweet Potato Black Bean Enchiladas",
    description: "A vegetarian twist on classic enchiladas featuring a hearty filling of sweet potatoes and black beans wrapped in soft tortillas and smothered in zesty enchilada sauce and melted cheese. This Mexican-inspired dish balances sweet, savory, and spicy flavors while offering a nutritious, protein-rich meal that's both satisfying and colorful.",
    tags: ["Mexican", "Vegetarian", "Dinner", "Baked", "Sweet Potato", "Beans", "Healthy", "Cheese", "Spicy"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Roasted Sweet Potato and Black Bean Enchiladas",
        description: "These vibrant vegetarian enchiladas combine tender roasted sweet potatoes, hearty black beans, and smoky spices wrapped in soft tortillas and baked under a blanket of zesty enchilada sauce and melted cheese. The contrast between the sweet potatoes and savory fillings creates a perfectly balanced, nutrient-dense meal that will satisfy both vegetarians and meat-eaters alike.",
        prepTime: "20 minutes",
        cookTime: "40 minutes",
        totalTime: "1 hour",
        servings: 6,
        servingSize: "2 enchiladas",
        difficulty: "Medium",
        tags: ["Mexican", "Vegetarian", "Dinner", "Baked", "Healthy"],
        ingredients: [
          "2 large sweet potatoes (about 1.5 pounds), peeled and diced into 1/2-inch cubes",
          "2 tablespoons olive oil",
          "1 teaspoon ground cumin",
          "1 teaspoon chili powder",
          "1/2 teaspoon garlic powder",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "1 medium onion, diced",
          "1 red bell pepper, diced",
          "3 cloves garlic, minced",
          "1 (15 oz) can black beans, drained and rinsed",
          "1 cup corn kernels (fresh, frozen, or canned)",
          "1/4 cup chopped fresh cilantro, plus more for garnish",
          "1 tablespoon lime juice",
          "2 cups (16 oz) red enchilada sauce, divided",
          "12 (8-inch) flour tortillas (can substitute corn tortillas)",
          "2 1/2 cups shredded Mexican blend cheese, divided",
          "1 avocado, sliced, for serving",
          "Sour cream, for serving",
          "Lime wedges, for serving"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C).",
          "Toss diced sweet potatoes with 1 tablespoon olive oil, cumin, chili powder, garlic powder, salt, and pepper. Spread on a baking sheet in a single layer.",
          "Roast sweet potatoes for 20-25 minutes until tender and lightly browned, stirring halfway through. Reduce oven temperature to 375°F (190°C) after removing the sweet potatoes.",
          "While the sweet potatoes are roasting, heat the remaining tablespoon of olive oil in a large skillet over medium heat.",
          "Add onion and bell pepper, cooking until softened, about 5 minutes.",
          "Add minced garlic and cook for another 30 seconds until fragrant.",
          "In a large bowl, combine the roasted sweet potatoes, sautéed vegetables, black beans, corn, cilantro, and lime juice. Stir gently to mix.",
          "Spread 1/2 cup of enchilada sauce on the bottom of a 9x13 inch baking dish.",
          "Warm tortillas briefly in the microwave or oven to make them more pliable.",
          "Fill each tortilla with about 1/3 cup of the sweet potato-black bean mixture and 1 tablespoon of cheese. Roll up and place seam-side down in the baking dish.",
          "Pour the remaining enchilada sauce over the top of the filled tortillas, then sprinkle with the remaining cheese.",
          "Cover with foil and bake for 20 minutes. Remove foil and bake for an additional 5-10 minutes until the cheese is bubbly and beginning to brown.",
          "Let stand for 5 minutes before serving.",
          "Serve topped with sliced avocado, a dollop of sour cream, fresh cilantro, and lime wedges."
        ],
        nutritionInfo: {
          calories: 480,
          protein: "15g",
          carbs: "65g",
          fats: "19g",
          fiber: "9g",
          sugar: "8g",
          sodium: "820mg"
        }
      }
    ]
  },
  {
    foodName: "Cashew Crunch Salad",
    description: "A vibrant and crunchy Asian-inspired salad featuring colorful vegetables, edamame, and cashews tossed in a sweet and tangy sesame dressing. This refreshing dish combines multiple textures and flavors - from the crisp cabbage and carrots to the nutty cashews and protein-rich edamame - creating a satisfying meal that's both nutritious and full of delightful crunch in every bite.",
    tags: ["Salad", "Asian-inspired", "Vegetarian", "Healthy", "Lunch", "No-cook", "Quick", "Crunchy", "Make ahead"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Crunchy Asian Cashew Salad",
        description: "This vibrant Asian-inspired salad delivers an irresistible combination of crisp vegetables, protein-rich edamame, and toasted cashews dressed in a sweet-tangy sesame vinaigrette. The rainbow of textures and flavors creates a satisfying, nutrient-packed meal that's easy to prepare and perfect for meal prep, potlucks, or a refreshing lunch on warm days.",
        prepTime: "15 minutes",
        cookTime: "0 minutes",
        totalTime: "15 minutes",
        servings: 4,
        servingSize: "2 cups",
        difficulty: "Easy",
        tags: ["Salad", "Asian-inspired", "Vegetarian", "No-cook", "Lunch"],
        ingredients: [
          "For the salad:",
          "4 cups thinly sliced red or green cabbage (or a mix)",
          "2 cups shredded carrots",
          "1 red bell pepper, thinly sliced",
          "1 cup shelled edamame, thawed if frozen",
          "4 green onions, thinly sliced",
          "1 cup roasted cashews, roughly chopped",
          "1/2 cup fresh cilantro leaves, chopped",
          "1/4 cup fresh mint leaves, chopped (optional)",
          "1 cup crispy wonton strips or chow mein noodles (optional)",
          "For the dressing:",
          "3 tablespoons rice vinegar",
          "2 tablespoons soy sauce or tamari",
          "2 tablespoons honey or maple syrup",
          "1 tablespoon sesame oil",
          "2 tablespoons neutral oil like avocado or canola",
          "1 tablespoon freshly grated ginger",
          "1 clove garlic, minced",
          "1 teaspoon sriracha or chili garlic sauce (optional, for heat)",
          "1 tablespoon toasted sesame seeds, plus more for garnish"
        ],
        instructions: [
          "In a large bowl, combine cabbage, carrots, bell pepper, edamame, and green onions.",
          "In a small bowl or jar, whisk together all dressing ingredients until well combined.",
          "Pour the dressing over the vegetables and toss well to coat everything evenly.",
          "Add the cashews, cilantro, and mint (if using) to the salad and toss again lightly.",
          "If using wonton strips or chow mein noodles, add them just before serving to maintain their crunch.",
          "Garnish with additional sesame seeds and serve immediately, or refrigerate for up to 30 minutes to allow flavors to meld.",
          "If making ahead, store the dressing separately and combine with the salad just before serving. The undressed salad can be refrigerated for up to 2 days."
        ],
        nutritionInfo: {
          calories: 350,
          protein: "10g",
          carbs: "30g",
          fats: "22g",
          fiber: "6g",
          sugar: "15g",
          sodium: "450mg"
        }
      }
    ]
  },
  {
    foodName: "Cauliflower Gnocchi",
    description: "A lighter, gluten-free version of traditional Italian gnocchi made with cauliflower instead of potatoes. These soft, pillowy dumplings maintain the classic texture of gnocchi while offering a lower-carb, vegetable-based alternative. Perfect for tossing with various sauces or simply sautéed with herbs and olive oil, this innovative dish provides a delicious way to incorporate more vegetables into familiar comfort food.",
    tags: ["Italian-inspired", "Vegetarian", "Gluten-free", "Low-carb", "Dinner", "Cauliflower", "Healthy", "Comfort food"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Homemade Cauliflower Gnocchi",
        description: "These pillowy soft cauliflower gnocchi offer all the comfort of traditional Italian dumplings with a lighter, vegetable-forward twist. Made with just a few simple ingredients, they're gluten-free, lower in carbs, and packed with nutrients while still delivering that satisfying, chewy texture. Perfect for a wholesome dinner tossed with your favorite sauce or simply browned in butter with herbs.",
        prepTime: "30 minutes",
        cookTime: "15 minutes",
        totalTime: "45 minutes (plus 30 minutes chilling time)",
        servings: 4,
        servingSize: "1 cup cooked gnocchi",
        difficulty: "Medium",
        tags: ["Italian-inspired", "Vegetarian", "Gluten-free", "Healthy", "Dinner"],
        ingredients: [
          "1 medium head cauliflower (about 1.5 pounds), cut into florets",
          "1 1/2 cups cassava flour, plus more for dusting (can substitute tapioca flour)",
          "1 teaspoon salt",
          "1/2 teaspoon garlic powder",
          "1 tablespoon olive oil",
          "1 large egg, lightly beaten",
          "For serving (optional):",
          "2 tablespoons butter or olive oil",
          "2 cloves garlic, minced",
          "1 tablespoon fresh sage or rosemary, chopped",
          "1/4 cup grated Parmesan cheese",
          "Salt and pepper to taste",
          "Red pepper flakes (optional)"
        ],
        instructions: [
          "Steam the cauliflower florets until very tender, about 10 minutes. Alternatively, microwave with 2 tablespoons of water in a covered dish for 5-7 minutes.",
          "Transfer the steamed cauliflower to a clean kitchen towel and let cool slightly.",
          "Squeeze out as much moisture as possible from the cauliflower using the towel. This step is crucial for the right consistency.",
          "Place the drained cauliflower in a food processor and pulse until smooth and paste-like.",
          "Transfer the cauliflower puree to a large bowl and add the egg, olive oil, salt, and garlic powder. Mix well.",
          "Gradually add the cassava flour, stirring until a soft, slightly sticky dough forms. The dough should be pliable but not too wet.",
          "Transfer the dough to a floured surface and divide into 4 equal portions.",
          "Roll each portion into a long rope about 3/4-inch thick, adding more flour as needed to prevent sticking.",
          "Cut each rope into 1-inch pieces. Optional: roll each piece against the tines of a fork to create the traditional gnocchi ridges.",
          "Place the formed gnocchi on a parchment-lined baking sheet, making sure they don't touch. Refrigerate for 30 minutes to firm up.",
          "To cook the gnocchi, bring a large pot of salted water to a gentle boil.",
          "Add the gnocchi in batches and cook until they float to the surface, about 2-3 minutes.",
          "Remove with a slotted spoon and drain well.",
          "For serving with the butter and herb sauce: In a large skillet, heat butter or olive oil over medium heat. Add the cooked gnocchi and brown for 2-3 minutes without stirring too much.",
          "Add minced garlic and herbs, cooking for another minute until fragrant.",
          "Remove from heat, add Parmesan cheese, salt, and pepper to taste.",
          "Serve immediately, garnished with extra herbs and red pepper flakes if desired."
        ],
        nutritionInfo: {
          calories: 280,
          protein: "6g",
          carbs: "48g",
          fats: "9g",
          fiber: "7g",
          sugar: "2g",
          sodium: "430mg"
        }
      }
    ]
  },
  {
    foodName: "Broccoli Cheddar Soup",
    description: "A rich, velvety soup featuring tender broccoli florets and sharp cheddar cheese in a creamy base. This classic comfort food balances the earthy flavor of broccoli with the savory depth of cheese, creating a warming bowl that's both indulgent and wholesome. Perfect for cool weather, this soup offers a satisfying way to incorporate vegetables into a hearty meal.",
    tags: ["Soup", "Vegetarian", "Comfort Food", "Cheese", "Broccoli", "Lunch", "Dinner", "Creamy", "One Pot"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Creamy Broccoli Cheddar Soup",
        description: "This velvety broccoli cheddar soup delivers restaurant-quality comfort in a homemade bowl. Fresh broccoli florets swim in a rich, cheesy broth that's perfectly seasoned and indulgently creamy. Enjoy this cozy classic on its own or with crusty bread for a satisfying lunch or dinner that transforms simple ingredients into something truly special.",
        prepTime: "15 minutes",
        cookTime: "30 minutes",
        totalTime: "45 minutes",
        servings: 6,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Soup", "Vegetarian", "Comfort Food", "Lunch", "Dinner"],
        ingredients: [
          "4 tablespoons butter",
          "1 medium onion, finely diced",
          "1 cup carrots, diced",
          "3 cloves garlic, minced",
          "1/3 cup all-purpose flour",
          "4 cups low-sodium vegetable or chicken broth",
          "2 cups half-and-half or whole milk",
          "4 cups broccoli florets, cut into small pieces",
          "2 bay leaves",
          "1/2 teaspoon dried thyme",
          "1/4 teaspoon nutmeg",
          "1 teaspoon salt, or to taste",
          "1/2 teaspoon freshly ground black pepper",
          "3 cups sharp cheddar cheese, freshly grated (about 12 oz)",
          "1 tablespoon Dijon mustard (optional)",
          "Crusty bread or croutons for serving"
        ],
        instructions: [
          "In a large Dutch oven or heavy-bottomed pot, melt butter over medium heat.",
          "Add onions and carrots, cooking until softened, about 5 minutes.",
          "Add garlic and cook for another 30 seconds until fragrant.",
          "Sprinkle in the flour and cook, stirring constantly, for 1-2 minutes to create a roux.",
          "Gradually whisk in the broth, stirring continuously to prevent lumps from forming.",
          "Add the half-and-half or milk, broccoli florets, bay leaves, thyme, nutmeg, salt, and pepper.",
          "Bring to a simmer, then reduce heat to medium-low and cook, partially covered, until the broccoli is tender, about 15-20 minutes.",
          "Remove bay leaves and discard.",
          "For a smoother soup, use an immersion blender to partially blend the soup, leaving some chunks for texture. Alternatively, transfer about half the soup to a blender, blend until smooth, then return to the pot. (Be careful blending hot liquids!)",
          "Reduce heat to low and stir in the grated cheddar cheese a handful at a time, allowing each addition to melt before adding more.",
          "Stir in Dijon mustard if using.",
          "Taste and adjust seasoning if needed.",
          "Serve hot, garnished with extra cheese and accompanied by crusty bread or croutons."
        ],
        nutritionInfo: {
          calories: 390,
          protein: "17g",
          carbs: "18g",
          fats: "28g",
          fiber: "4g",
          sugar: "6g",
          sodium: "760mg"
        }
      }
    ]
  },
  {
    foodName: "Teriyaki Chicken Stir Fry",
    description: "A vibrant and flavorful stir fry featuring tender chicken pieces and colorful vegetables coated in a glossy, sweet-savory teriyaki sauce. This Japanese-inspired dish combines protein, vegetables, and aromatic flavors in a quick, one-pan meal that's perfect for weeknight dinners. Served over rice or noodles, it offers a balanced combination of textures and tastes in every bite.",
    tags: ["Asian", "Japanese-inspired", "Chicken", "Stir Fry", "Quick", "Dinner", "Healthy", "One Pan"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Easy Teriyaki Chicken Stir Fry",
        description: "This quick teriyaki chicken stir fry combines juicy chicken, crisp-tender vegetables, and a homemade teriyaki sauce that's the perfect balance of sweet and savory. Ready in under 30 minutes, it's a flavorful weeknight dinner solution that delivers restaurant-quality taste with simple ingredients. Serve over steamed rice or noodles for a complete meal that's healthier than takeout.",
        prepTime: "15 minutes",
        cookTime: "15 minutes",
        totalTime: "30 minutes",
        servings: 4,
        servingSize: "1.5 cups stir fry",
        difficulty: "Easy",
        tags: ["Asian", "Japanese-inspired", "Chicken", "Quick", "Dinner"],
        ingredients: [
          "For the stir fry:",
          "1.5 pounds boneless, skinless chicken thighs, cut into 1-inch pieces",
          "2 tablespoons vegetable oil, divided",
          "1 medium onion, sliced",
          "2 bell peppers (any color), sliced into strips",
          "2 cups broccoli florets",
          "1 cup sliced carrots (about 2 medium)",
          "1 cup snap peas, trimmed",
          "2 cloves garlic, minced",
          "1 tablespoon grated fresh ginger",
          "2 green onions, sliced, for garnish",
          "1 tablespoon sesame seeds, for garnish",
          "For the teriyaki sauce:",
          "1/2 cup low-sodium soy sauce",
          "1/4 cup water",
          "3 tablespoons brown sugar",
          "1 tablespoon honey",
          "1 tablespoon rice vinegar",
          "1 tablespoon sesame oil",
          "2 teaspoons cornstarch mixed with 1 tablespoon water",
          "For serving:",
          "Steamed white rice or cooked noodles"
        ],
        instructions: [
          "Make the teriyaki sauce: In a small saucepan, combine soy sauce, water, brown sugar, honey, rice vinegar, and sesame oil. Bring to a simmer over medium heat. Once sugar is dissolved, add the cornstarch slurry and whisk until sauce thickens, about 1-2 minutes. Remove from heat and set aside.",
          "Heat 1 tablespoon oil in a large wok or skillet over medium-high heat.",
          "Add chicken pieces and cook, stirring occasionally, until browned and cooked through, about 6-8 minutes. Remove chicken to a plate and set aside.",
          "Add remaining tablespoon of oil to the same pan. Add onions and cook for 1 minute.",
          "Add bell peppers, broccoli, and carrots. Stir fry for 3-4 minutes until vegetables begin to soften but are still crisp.",
          "Add snap peas, garlic, and ginger. Stir fry for another minute until fragrant.",
          "Return chicken to the pan and add about 3/4 of the teriyaki sauce. Toss to coat everything well and heat through, about 2 minutes.",
          "Taste and add more sauce if desired. Reserve any remaining sauce for serving.",
          "Serve over steamed rice or noodles, garnished with sliced green onions and sesame seeds."
        ],
        nutritionInfo: {
          calories: 410,
          protein: "35g",
          carbs: "25g",
          fats: "19g",
          fiber: "5g",
          sugar: "18g",
          sodium: "980mg"
        }
      }
    ]
  },
  {
    foodName: "Garlic Butter Shrimp Pasta",
    description: "A luxurious pasta dish featuring succulent shrimp sautéed in a rich garlic butter sauce, tossed with al dente pasta and fresh herbs. This elegant yet simple meal combines the sweet flavors of shrimp with the aromatic essence of garlic and the richness of butter, creating a restaurant-quality dish that's quick enough for weeknights but impressive enough for special occasions.",
    tags: ["Pasta", "Seafood", "Shrimp", "Italian-inspired", "Quick", "Dinner", "Garlic", "Comfort Food"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Garlic Butter Shrimp Linguine",
        description: "This elegant garlic butter shrimp pasta combines tender linguine with plump shrimp sautéed in a luxurious sauce of fragrant garlic, rich butter, bright lemon, and fresh herbs. Quick to prepare yet impressive in presentation and flavor, it's a restaurant-worthy dish you can enjoy at home in just 20 minutes. Perfect for date nights or a special weeknight dinner upgrade.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Pasta", "Seafood", "Italian-inspired", "Quick", "Dinner"],
        ingredients: [
          "12 oz linguine or spaghetti pasta",
          "1 1/2 pounds large shrimp, peeled and deveined",
          "Salt and freshly ground black pepper, to taste",
          "1/4 teaspoon red pepper flakes (optional)",
          "6 tablespoons unsalted butter, divided",
          "6 cloves garlic, minced",
          "1/2 cup dry white wine (can substitute chicken broth)",
          "2 tablespoons fresh lemon juice",
          "Zest of one lemon",
          "1/4 cup fresh parsley, chopped",
          "1/4 cup freshly grated Parmesan cheese, plus more for serving",
          "2 tablespoons olive oil",
          "Additional lemon wedges, for serving"
        ],
        instructions: [
          "Bring a large pot of salted water to a boil. Cook pasta according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
          "While pasta is cooking, prep the shrimp and sauce.",
          "Pat shrimp dry with paper towels and season with salt, pepper, and red pepper flakes (if using).",
          "In a large skillet, heat 2 tablespoons butter and olive oil over medium-high heat.",
          "Add shrimp in a single layer and cook until pink and just cooked through, about 1-2 minutes per side. Work in batches if needed to avoid overcrowding. Transfer cooked shrimp to a plate.",
          "Reduce heat to medium and add remaining 4 tablespoons butter to the same skillet.",
          "Add minced garlic and sauté until fragrant, about 30 seconds (be careful not to burn it).",
          "Pour in white wine (or broth) and lemon juice, scraping up any browned bits from the bottom of the pan. Simmer until liquid is reduced by half, about 2-3 minutes.",
          "Add drained pasta to the skillet along with the cooked shrimp, lemon zest, parsley, and Parmesan cheese. Toss to coat, adding reserved pasta water a little at a time to create a silky sauce that coats the pasta.",
          "Taste and adjust seasoning with additional salt and pepper if needed.",
          "Serve immediately, garnished with additional Parmesan cheese, parsley, and lemon wedges."
        ],
        nutritionInfo: {
          calories: 560,
          protein: "38g",
          carbs: "52g",
          fats: "22g",
          fiber: "3g",
          sugar: "2g",
          sodium: "720mg"
        }
      }
    ]
  },
  {
    foodName: "Healthy Banana Bread",
    description: "A nutritious twist on classic banana bread made with wholesome ingredients like whole wheat flour, natural sweeteners, and ripe bananas. This moist, fragrant quick bread offers the comfort and sweetness of traditional banana bread with added nutrients and less refined sugar. Perfect for breakfast, snacks, or a healthier dessert option, it's a delicious way to use up overripe bananas.",
    tags: ["Baking", "Breakfast", "Snack", "Healthy", "Banana", "Quick Bread", "Whole Grain", "Make Ahead"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Wholesome Honey Banana Bread",
        description: "This better-for-you banana bread keeps all the moisture and flavor you love while incorporating nutritious ingredients like whole wheat flour, Greek yogurt, and honey instead of refined sugar. The ripe bananas provide natural sweetness and create an irresistibly tender loaf that's perfect for breakfast, snacking, or a healthier dessert option. It's so good, no one will guess it's made with more wholesome ingredients!",
        prepTime: "15 minutes",
        cookTime: "55 minutes",
        totalTime: "1 hour 10 minutes",
        servings: 12,
        servingSize: "1 slice",
        difficulty: "Easy",
        tags: ["Baking", "Breakfast", "Healthy", "Snack", "Make Ahead"],
        ingredients: [
          "3 very ripe bananas, mashed (about 1 1/2 cups)",
          "2 large eggs",
          "1/3 cup plain Greek yogurt",
          "1/3 cup honey or pure maple syrup",
          "1/4 cup coconut oil, melted (or unsalted butter)",
          "1 teaspoon vanilla extract",
          "1 cup whole wheat flour",
          "3/4 cup all-purpose flour",
          "1 teaspoon baking soda",
          "1/2 teaspoon ground cinnamon",
          "1/4 teaspoon salt",
          "1/2 cup chopped walnuts or pecans (optional)",
          "1/3 cup dark chocolate chips (optional)",
          "1 tablespoon turbinado sugar for topping (optional)"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan or line with parchment paper.",
          "In a large bowl, mash the bananas with a fork until smooth.",
          "Whisk in the eggs, Greek yogurt, honey or maple syrup, melted coconut oil, and vanilla extract until well combined.",
          "In a separate bowl, whisk together the whole wheat flour, all-purpose flour, baking soda, cinnamon, and salt.",
          "Gently fold the dry ingredients into the wet ingredients until just combined. Do not overmix.",
          "If using, fold in nuts and/or chocolate chips, reserving a few for topping if desired.",
          "Pour the batter into the prepared loaf pan. Sprinkle with the reserved nuts/chocolate chips and turbinado sugar if using.",
          "Bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean. If the top is browning too quickly, cover loosely with aluminum foil.",
          "Allow the bread to cool in the pan for 10 minutes, then transfer to a wire rack to cool completely.",
          "Store in an airtight container at room temperature for up to 3 days, or refrigerate for up to a week. Can also be frozen for up to 3 months."
        ],
        nutritionInfo: {
          calories: 210,
          protein: "5g",
          carbs: "35g",
          fats: "7g",
          fiber: "3g",
          sugar: "15g",
          sodium: "170mg"
        }
      }
    ]
  },
  {
    foodName: "Miso Glazed Salmon",
    description: "A sophisticated dish featuring salmon fillets glazed with a sweet and savory miso marinade and broiled to perfection. This Japanese-inspired preparation balances the rich flavor of salmon with the complex umami notes of miso paste, sweetened with mirin and brown sugar. The caramelized glaze creates a beautiful lacquered finish on the tender, flaky fish, offering an elegant yet easy preparation method.",
    tags: ["Japanese", "Seafood", "Salmon", "Healthy", "Dinner", "Asian-inspired", "Quick", "High protein", "Gluten-free option"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Miso-Glazed Salmon with Sesame Greens",
        description: "This elegant miso-glazed salmon features a perfect balance of savory, sweet, and umami flavors that caramelize beautifully under the broiler. The velvety glaze enhances the salmon's natural richness while keeping it moist and tender. Paired with sesame-scented greens, this restaurant-worthy dish comes together in less than 30 minutes for an impressive weeknight dinner that's both nutritious and sophisticated.",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes (plus optional marinating time)",
        servings: 4,
        servingSize: "1 salmon fillet with greens",
        difficulty: "Easy",
        tags: ["Japanese", "Seafood", "Healthy", "Dinner", "Quick", "High protein"],
        ingredients: [
          "For the salmon:",
          "4 salmon fillets (about 6 oz each), skin-on",
          "3 tablespoons white miso paste",
          "2 tablespoons mirin (Japanese sweet rice wine)",
          "1 tablespoon soy sauce (or tamari for gluten-free)",
          "1 tablespoon brown sugar or honey",
          "1 tablespoon rice vinegar",
          "2 teaspoons grated fresh ginger",
          "1 clove garlic, minced",
          "1 teaspoon sesame oil",
          "For the sesame greens:",
          "1 tablespoon vegetable oil",
          "1 pound baby bok choy, halved lengthwise, or 8 cups baby spinach",
          "2 cloves garlic, thinly sliced",
          "1 tablespoon soy sauce or tamari",
          "1 teaspoon sesame oil",
          "1 tablespoon toasted sesame seeds",
          "For serving:",
          "Steamed rice",
          "Sliced green onions",
          "Lime wedges"
        ],
        instructions: [
          "In a small bowl, whisk together miso paste, mirin, soy sauce, brown sugar, rice vinegar, ginger, garlic, and sesame oil until smooth.",
          "Pat salmon fillets dry with paper towels and place skin-side down in a shallow dish. Pour the miso mixture over the salmon, turning to coat. For best results, refrigerate and marinate for 30 minutes to 2 hours, but you can cook immediately if pressed for time.",
          "When ready to cook, preheat broiler with rack positioned 6 inches from heat source.",
          "Line a baking sheet with foil and lightly oil or spray with cooking spray. Place salmon fillets skin-side down on the prepared baking sheet, reserving any excess marinade.",
          "Broil salmon for 6-8 minutes, basting once with the reserved marinade halfway through cooking time, until the top is caramelized and the salmon is just cooked through but still moist inside.",
          "While salmon cooks, prepare the sesame greens: Heat vegetable oil in a large skillet over medium-high heat. Add bok choy cut-side down (or add spinach) and cook for 2-3 minutes until beginning to wilt.",
          "Add sliced garlic and continue cooking, stirring occasionally, until greens are tender-crisp, about 1-2 minutes more.",
          "Drizzle with soy sauce and sesame oil, then sprinkle with sesame seeds. Toss to coat evenly.",
          "Serve salmon over steamed rice with sesame greens alongside. Garnish with sliced green onions and lime wedges."
        ],
        nutritionInfo: {
          calories: 390,
          protein: "36g",
          carbs: "12g",
          fats: "22g",
          fiber: "2g",
          sugar: "8g",
          sodium: "850mg"
        }
      }
    ]
  },
  {
    foodName: "Peanut Butter Energy Balls",
    description: "No-bake, bite-sized snacks made with nutritious ingredients like oats, peanut butter, honey, and add-ins such as chocolate chips, dried fruit, or seeds. These portable energy balls offer a perfect balance of protein, healthy fats, and complex carbohydrates in a convenient, grab-and-go format. Ideal for pre-workout fuel, afternoon snacks, or a quick breakfast, they provide sustained energy with natural ingredients.",
    tags: ["Snack", "No-bake", "Healthy", "Vegetarian", "Peanut Butter", "Energy", "Make ahead", "Kid-friendly", "Meal prep"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "5-Ingredient Peanut Butter Energy Bites",
        description: "These no-bake energy balls combine the perfect balance of protein, healthy fats, and complex carbs in an easy, grab-and-go package. Made with simple pantry ingredients, they're perfect for meal prep and will satisfy sweet cravings while providing sustained energy throughout the day. Customize with your favorite mix-ins for a snack that's both nutritious and feels like a treat.",
        prepTime: "15 minutes",
        cookTime: "0 minutes",
        totalTime: "15 minutes (plus 30 minutes chilling)",
        servings: 20,
        servingSize: "2 balls",
        difficulty: "Easy",
        tags: ["Snack", "No-bake", "Healthy", "Vegetarian", "Make ahead", "Kid-friendly"],
        ingredients: [
          "1 cup old-fashioned rolled oats",
          "1/2 cup natural peanut butter (or almond butter)",
          "1/3 cup honey or maple syrup",
          "1/2 cup ground flaxseed (or additional oats)",
          "1/2 cup mini chocolate chips",
          "1 teaspoon vanilla extract",
          "1/4 teaspoon salt",
          "Optional add-ins (choose 1/4 cup total):",
          "Chopped dried cherries or cranberries",
          "Chopped nuts or seeds (chia, hemp, sunflower)",
          "Shredded coconut",
          "Cacao nibs",
          "Protein powder"
        ],
        instructions: [
          "In a large bowl, stir together the oats, ground flaxseed, chocolate chips, salt, and any optional dry add-ins you're using.",
          "Add the peanut butter, honey, and vanilla extract. Mix until well combined. The mixture should be slightly sticky and hold together when pressed.",
          "If the mixture is too dry, add a little more peanut butter or honey. If too wet, add more oats or flaxseed.",
          "Cover and refrigerate for 30 minutes to make the mixture easier to work with.",
          "Using a tablespoon or small cookie scoop, portion the mixture and roll into 1-inch balls with your hands.",
          "Store in an airtight container in the refrigerator for up to 1 week, or freeze for up to 3 months.",
          "For frozen energy balls, let thaw at room temperature for 10 minutes before enjoying."
        ],
        nutritionInfo: {
          calories: 110,
          protein: "3g",
          carbs: "12g",
          fats: "6g",
          fiber: "2g",
          sugar: "7g",
          sodium: "45mg"
        }
      }
    ]
  },
  {
    foodName: "Quinoa Bowl with Roasted Vegetables",
    description: "A nutritious and customizable grain bowl featuring protein-rich quinoa topped with a colorful array of roasted vegetables and finished with a flavorful sauce or dressing. This wholesome dish combines multiple textures and flavors in one bowl, from the nutty quinoa to the caramelized roasted vegetables, creating a satisfying meal that's both visually appealing and packed with nutrients.",
    tags: ["Bowl", "Vegetarian", "Vegan option", "Healthy", "Quinoa", "Roasted vegetables", "Meal prep", "Lunch", "Dinner", "Gluten-free"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Mediterranean Quinoa Bowl with Lemon Tahini Dressing",
        description: "This vibrant Mediterranean-inspired quinoa bowl features fluffy, protein-packed quinoa topped with a rainbow of caramelized roasted vegetables, creamy chickpeas, and a bright lemon tahini dressing. Perfect for meal prep or a nourishing dinner, this colorful bowl delivers incredible flavor, satisfying textures, and plenty of plant-based nutrition in every bite.",
        prepTime: "15 minutes",
        cookTime: "30 minutes",
        totalTime: "45 minutes",
        servings: 4,
        servingSize: "1 bowl",
        difficulty: "Easy",
        tags: ["Bowl", "Vegetarian", "Vegan option", "Healthy", "Mediterranean", "Lunch", "Dinner"],
        ingredients: [
          "For the bowls:",
          "1 cup uncooked quinoa, rinsed",
          "2 cups vegetable or chicken broth",
          "1 medium sweet potato, diced into 1/2-inch cubes",
          "1 red bell pepper, chopped into 1-inch pieces",
          "1 zucchini, chopped into 1/2-inch half-moons",
          "1 red onion, cut into 1-inch chunks",
          "1 can (15 oz) chickpeas, drained and rinsed",
          "3 tablespoons olive oil",
          "1 teaspoon dried oregano",
          "1/2 teaspoon ground cumin",
          "1/2 teaspoon paprika",
          "Salt and pepper to taste",
          "1 cup cherry tomatoes, halved",
          "1/2 cup kalamata olives, pitted and halved",
          "1/2 cup crumbled feta cheese (omit for vegan)",
          "1/4 cup fresh parsley, chopped",
          "For the lemon tahini dressing:",
          "1/4 cup tahini",
          "3 tablespoons fresh lemon juice",
          "1 clove garlic, minced",
          "2-3 tablespoons water, to thin",
          "1 tablespoon olive oil",
          "1/2 teaspoon honey or maple syrup",
          "1/4 teaspoon salt",
          "Pinch of cayenne pepper (optional)"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C) and line a large baking sheet with parchment paper.",
          "Cook quinoa: In a medium saucepan, combine quinoa and broth. Bring to a boil, then reduce heat to low, cover, and simmer for about 15 minutes until liquid is absorbed. Remove from heat, fluff with a fork, and let stand covered for 5 minutes.",
          "While quinoa cooks, prepare vegetables: In a large bowl, toss sweet potato, bell pepper, zucchini, red onion, and chickpeas with olive oil, oregano, cumin, paprika, salt, and pepper.",
          "Spread vegetable mixture evenly on the prepared baking sheet. Roast for 25-30 minutes, stirring halfway through, until vegetables are tender and beginning to caramelize.",
          "Make the dressing: In a small bowl, whisk together tahini, lemon juice, garlic, olive oil, honey or maple syrup, and salt. Add water, 1 tablespoon at a time, until the dressing reaches a pourable consistency. Add cayenne if using.",
          "Assemble the bowls: Divide quinoa among four bowls. Top each with a portion of the roasted vegetable mixture, then add cherry tomatoes, olives, and feta cheese. Drizzle with tahini dressing and sprinkle with fresh parsley.",
          "Serve immediately, or store components separately in the refrigerator for meal prep (will keep for 3-4 days)."
        ],
        nutritionInfo: {
          calories: 480,
          protein: "15g",
          carbs: "58g",
          fats: "22g",
          fiber: "11g",
          sugar: "8g",
          sodium: "650mg"
        }
      }
    ]
  },
  {
    foodName: "Thai Red Curry",
    description: "A fragrant and aromatic Thai dish featuring a rich, coconut milk-based curry sauce infused with red curry paste, lemongrass, and other traditional spices. This vibrant, slightly spicy curry typically includes protein like chicken, shrimp, or tofu along with colorful vegetables, creating a harmonious balance of sweet, savory, and spicy flavors that's characteristic of Thai cuisine.",
    tags: ["Thai", "Curry", "Asian", "Spicy", "Coconut milk", "Dinner", "One pot", "Gluten-free option"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Thai Red Curry with Chicken and Vegetables",
        description: "This aromatic Thai red curry combines tender chicken and colorful vegetables in a rich, coconut-based sauce fragrant with lemongrass, galangal, and lime. The vibrant curry strikes the perfect balance between spicy, sweet, and savory flavors for an authentic Thai experience at home. Served over jasmine rice, it's a comforting yet exotic meal that's surprisingly simple to prepare.",
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        totalTime: "40 minutes",
        servings: 4,
        servingSize: "1.5 cups curry with rice",
        difficulty: "Medium",
        tags: ["Thai", "Curry", "Asian", "Spicy", "Dinner", "One pot"],
        ingredients: [
          "For the curry:",
          "2 tablespoons coconut oil or vegetable oil",
          "3 tablespoons Thai red curry paste (adjust to taste)",
          "1 medium onion, sliced",
          "2 cloves garlic, minced",
          "1 tablespoon fresh ginger, grated",
          "1 red bell pepper, sliced",
          "1 yellow bell pepper, sliced",
          "1 medium zucchini, sliced into half-moons",
          "1.5 pounds boneless, skinless chicken thighs, cut into 1-inch pieces",
          "2 cans (13.5 oz each) full-fat coconut milk",
          "2 tablespoons fish sauce (or soy sauce for vegetarian)",
          "1 tablespoon brown sugar or palm sugar",
          "2-3 kaffir lime leaves, torn (optional)",
          "1 stalk lemongrass, bruised and cut into 3-inch pieces (optional)",
          "1 cup snap peas or green beans",
          "1 tablespoon lime juice",
          "1/4 cup Thai basil leaves (or regular basil)",
          "Red chili slices, for garnish (optional)",
          "For serving:",
          "Jasmine rice, cooked according to package directions",
          "Lime wedges",
          "Fresh cilantro, chopped"
        ],
        instructions: [
          "Heat oil in a large pot or Dutch oven over medium heat. Add the red curry paste and stir for 1-2 minutes until fragrant.",
          "Add onion, garlic, and ginger. Cook for 2-3 minutes until softened.",
          "Add chicken pieces and cook, stirring occasionally, until no longer pink on the outside, about 5 minutes.",
          "Pour in the coconut milk. Add fish sauce, brown sugar, kaffir lime leaves, and lemongrass if using. Stir well to combine.",
          "Bring to a gentle simmer and cook, uncovered, for 10 minutes.",
          "Add bell peppers and zucchini. Simmer for another 5-7 minutes until vegetables are tender-crisp and chicken is cooked through.",
          "Add snap peas and cook for 2 more minutes, just until bright green and crisp-tender.",
          "Remove from heat and stir in lime juice and Thai basil leaves. Remove lemongrass pieces and kaffir lime leaves before serving.",
          "Taste and adjust seasoning with more fish sauce for saltiness or brown sugar for sweetness if needed.",
          "Serve over jasmine rice, garnished with additional Thai basil, fresh cilantro, lime wedges, and chili slices if desired."
        ],
        nutritionInfo: {
          calories: 580,
          protein: "32g",
          carbs: "32g",
          fats: "38g",
          fiber: "4g",
          sugar: "7g",
          sodium: "820mg"
        }
      }
    ]
  },
  {
    foodName: "Baked Falafel",
    description: "A healthier version of the traditional Middle Eastern chickpea fritters, baked instead of fried for a lighter yet still flavorful result. These herb-infused patties combine ground chickpeas with fresh herbs, garlic, and warm spices like cumin and coriander, creating a protein-rich vegetarian dish with a crisp exterior and tender interior. Perfect in pita sandwiches, salads, or as part of a Mediterranean mezze spread.",
    tags: ["Middle Eastern", "Vegetarian", "Vegan", "Baked", "Chickpeas", "Healthy", "Mediterranean", "Lunch", "Dinner", "High protein"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Crispy Baked Herb Falafel",
        description: "These oven-baked falafel deliver all the authentic flavor and texture of the traditional version with less oil and mess. Packed with fresh herbs, garlic, and warm spices, these protein-rich chickpea patties develop a satisfyingly crisp exterior while staying moist and fluffy inside. Serve them in pita with tahini sauce for a delicious Mediterranean-inspired meal that's both nutritious and full of flavor.",
        prepTime: "20 minutes (plus 30 minutes resting)",
        cookTime: "25 minutes",
        totalTime: "1 hour 15 minutes",
        servings: 4,
        servingSize: "4 falafel (about 12-16 total)",
        difficulty: "Medium",
        tags: ["Middle Eastern", "Vegetarian", "Vegan", "Baked", "Healthy", "Mediterranean", "Dinner"],
        ingredients: [
          "For the falafel:",
          "2 (15 oz) cans chickpeas, drained, rinsed and thoroughly dried",
          "1/2 cup fresh parsley, packed",
          "1/2 cup fresh cilantro, packed",
          "1/2 small red onion, roughly chopped",
          "4 cloves garlic",
          "2 tablespoons olive oil, plus more for brushing",
          "2 tablespoons all-purpose flour or chickpea flour",
          "1 tablespoon lemon juice",
          "1 1/2 teaspoons ground cumin",
          "1 teaspoon ground coriander",
          "1/2 teaspoon baking powder",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "Pinch of cayenne pepper (optional)",
          "For serving:",
          "Whole wheat pita bread",
          "Tahini sauce (2 tablespoons tahini, 1 tablespoon lemon juice, 1-2 tablespoons water, 1 minced garlic clove)",
          "Chopped tomatoes",
          "Sliced cucumber",
          "Thinly sliced red onion",
          "Shredded lettuce",
          "Pickled turnips or pickles (optional)"
        ],
        instructions: [
          "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper and drizzle with olive oil or spray with cooking spray.",
          "In a food processor, combine chickpeas, parsley, cilantro, red onion, and garlic. Pulse until coarsely chopped but not puréed – you want texture.",
          "Add olive oil, flour, lemon juice, cumin, coriander, baking powder, salt, pepper, and cayenne (if using). Pulse just until combined and the mixture holds together when pressed.",
          "Transfer mixture to a bowl and refrigerate for 30 minutes to firm up.",
          "Using a 2-tablespoon cookie scoop or your hands, form the mixture into 12-16 patties, each about 2 inches in diameter and 1/2 inch thick. Place on the prepared baking sheet.",
          "Brush or spray the tops of the falafel with a little more olive oil.",
          "Bake for 25-30 minutes, carefully flipping halfway through, until golden brown and crispy on the outside.",
          "While the falafel bake, prepare the tahini sauce by whisking together tahini, lemon juice, water, and garlic until smooth. Season with salt to taste.",
          "To serve, warm pita bread, split open, and fill with falafel. Add tomatoes, cucumber, red onion, lettuce, and pickles if using. Drizzle with tahini sauce.",
          "Alternatively, serve falafel over a salad with the tahini sauce as dressing."
        ],
        nutritionInfo: {
          calories: 320,
          protein: "13g",
          carbs: "42g",
          fats: "12g",
          fiber: "11g",
          sugar: "8g",
          sodium: "540mg"
        }
      }
    ]
  },
  {
    foodName: "Zucchini Noodles with Pesto",
    description: "A light, low-carb alternative to traditional pasta featuring spiralized zucchini 'noodles' tossed with fresh basil pesto. This vibrant dish combines the subtle sweetness of zucchini with the aromatic, herbaceous flavors of pesto, creating a nutritious meal that's packed with vegetables while still delivering satisfying flavor. Popular among those seeking healthier pasta alternatives, it offers a quick, refreshing option for warm-weather dining.",
    tags: ["Vegetarian", "Low-carb", "Healthy", "Zucchini", "Pesto", "Quick", "Summer", "Gluten-free", "Italian-inspired", "Dinner"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Garlic Parmesan Zucchini Noodles with Fresh Pesto",
        description: "These light and fresh zucchini noodles are tossed with vibrant homemade basil pesto for a nutritious, low-carb alternative to traditional pasta. The spiralized zucchini retains a pleasant crunch while the robust pesto adds bold flavor without weighing down the dish. Ready in just 15 minutes, it's a perfect quick dinner for warm evenings or a nutritious lunch that won't leave you feeling sluggish.",
        prepTime: "10 minutes",
        cookTime: "5 minutes",
        totalTime: "15 minutes",
        servings: 4,
        servingSize: "1.5 cups",
        difficulty: "Easy",
        tags: ["Vegetarian", "Low-carb", "Healthy", "Quick", "Gluten-free", "Italian-inspired", "Dinner"],
        ingredients: [
          "For the zucchini noodles:",
          "4 medium zucchini, spiralized (about 6 cups spiralized)",
          "2 tablespoons olive oil",
          "3 cloves garlic, minced",
          "1/4 teaspoon red pepper flakes (optional)",
          "Salt and freshly ground black pepper, to taste",
          "1/3 cup grated Parmesan cheese, plus more for serving",
          "For the pesto:",
          "2 cups fresh basil leaves, packed",
          "1/3 cup pine nuts or walnuts",
          "2 cloves garlic",
          "1/2 cup extra virgin olive oil",
          "1/2 cup grated Parmesan cheese",
          "1 tablespoon lemon juice",
          "1/4 teaspoon salt",
          "1/8 teaspoon freshly ground black pepper",
          "For serving:",
          "Cherry tomatoes, halved",
          "Additional pine nuts, toasted",
          "Fresh basil leaves"
        ],
        instructions: [
          "Make the pesto: In a food processor, combine basil, pine nuts, and garlic. Pulse until coarsely chopped. With the processor running, slowly add olive oil in a steady stream. Add Parmesan cheese, lemon juice, salt, and pepper. Process until smooth, scraping down sides as needed. Set aside.",
          "Prepare the zucchini noodles: If your spiralized zucchini seems very wet, place it on paper towels and gently press to remove excess moisture.",
          "Heat 2 tablespoons olive oil in a large skillet over medium heat. Add minced garlic and red pepper flakes (if using) and cook until fragrant, about 30 seconds.",
          "Add zucchini noodles to the skillet. Cook, tossing gently with tongs, for 2-3 minutes until just tender but still slightly crisp. Be careful not to overcook, or they will become mushy.",
          "Remove skillet from heat. Add about 1/3 to 1/2 cup of the prepared pesto (adjust to taste) and toss until evenly coated. Reserve any remaining pesto for another use (it keeps well refrigerated for up to a week or can be frozen).",
          "Sprinkle with Parmesan cheese and toss once more.",
          "Season with salt and pepper to taste.",
          "Transfer to serving plates and top with halved cherry tomatoes, toasted pine nuts, additional Parmesan cheese, and fresh basil leaves."
        ],
        nutritionInfo: {
          calories: 310,
          protein: "11g",
          carbs: "8g",
          fats: "28g",
          fiber: "3g",
          sugar: "4g",
          sodium: "390mg"
        }
      }
    ]
  },
  {
    foodName: "Crispy Baked Chicken Thighs",
    description: "Flavorful, budget-friendly chicken thighs baked until the skin is irresistibly crispy while the meat remains juicy and tender. This simple yet satisfying dish relies on proper seasoning and cooking technique rather than complicated ingredients, making it perfect for weeknight dinners. The natural fat in chicken thighs renders during baking, creating self-basting meat that's more forgiving to cook than leaner cuts.",
    tags: ["Chicken", "Baked", "Main dish", "Budget-friendly", "Easy", "Dinner", "High protein", "Gluten-free", "Low-carb", "Keto-friendly"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Crispy Herb-Garlic Baked Chicken Thighs",
        description: "These perfectly baked chicken thighs feature golden, crackling skin and incredibly juicy, flavorful meat. A simple blend of herbs and spices creates a delicious crust during baking, while the natural fat in the thighs renders for self-basting meat that's nearly impossible to overcook. This economical, hands-off main dish pairs beautifully with almost any side for an easy weeknight dinner that tastes like a special occasion meal.",
        prepTime: "10 minutes",
        cookTime: "40 minutes",
        totalTime: "50 minutes",
        servings: 4,
        servingSize: "2 thighs",
        difficulty: "Easy",
        tags: ["Chicken", "Baked", "Main dish", "Dinner", "High protein", "Gluten-free"],
        ingredients: [
          "8 bone-in, skin-on chicken thighs (about 3 pounds)",
          "2 tablespoons olive oil",
          "1 tablespoon brown sugar (optional, helps with browning)",
          "2 teaspoons garlic powder",
          "2 teaspoons onion powder",
          "1 1/2 teaspoons dried thyme",
          "1 teaspoon paprika (or smoked paprika)",
          "1 teaspoon kosher salt",
          "1/2 teaspoon freshly ground black pepper",
          "1/4 teaspoon cayenne pepper (optional)",
          "3 cloves garlic, minced",
          "Fresh herbs for garnish (thyme, rosemary, or parsley)",
          "Lemon wedges for serving"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C). Line a rimmed baking sheet with foil and set a wire rack on top (if you don't have a rack, you can place the chicken directly on the foil).",
          "Pat chicken thighs very dry with paper towels. Getting the skin as dry as possible is key for crispy results.",
          "In a small bowl, combine olive oil, brown sugar (if using), garlic powder, onion powder, dried thyme, paprika, salt, pepper, cayenne (if using), and minced garlic. Mix to form a paste.",
          "Rub the spice mixture all over the chicken thighs, lifting the skin slightly to get some of the mixture underneath for maximum flavor.",
          "Arrange the chicken thighs skin-side up on the wire rack, making sure they're not touching.",
          "Bake in the preheated oven for 35-40 minutes, until the skin is golden brown and crispy, and the internal temperature reaches 165°F (74°C) when tested with a meat thermometer.",
          "For extra crispy skin, broil on high for 2-3 minutes at the end of cooking time, watching carefully to prevent burning.",
          "Remove from oven and let rest for 5 minutes before serving.",
          "Garnish with fresh herbs and serve with lemon wedges."
        ],
        nutritionInfo: {
          calories: 420,
          protein: "38g",
          carbs: "5g",
          fats: "28g",
          fiber: "1g",
          sugar: "2g",
          sodium: "490mg"
        }
      }
    ]
  },
  {
    foodName: "Spinach Artichoke Dip",
    description: "A rich, creamy hot dip featuring a blend of spinach, artichoke hearts, and cheeses, typically served with bread, crackers, or vegetables for dipping. This popular appetizer balances the earthy flavor of spinach with the subtle tanginess of artichokes, all bound in a luxurious mixture of cheeses and creamy ingredients. Baked until bubbly and golden, it's a crowd-pleasing favorite at gatherings and restaurants alike.",
    tags: ["Appetizer", "Dip", "Vegetarian", "Cheese", "Party food", "Make ahead", "Baked", "Comfort food", "Spinach", "Artichoke"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Creamy Baked Spinach Artichoke Dip",
        description: "This irresistible spinach artichoke dip combines tender spinach and artichoke hearts with a rich, cheesy blend of cream cheese, mozzarella, and Parmesan for the ultimate crowd-pleasing appetizer. Baked until golden and bubbly, it strikes the perfect balance between creamy and savory with just the right amount of tang. Serve with crusty bread, crackers, or vegetables for a guaranteed hit at any gathering.",
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        totalTime: "40 minutes",
        servings: 8,
        servingSize: "1/3 cup",
        difficulty: "Easy",
        tags: ["Appetizer", "Dip", "Vegetarian", "Cheese", "Party food", "Baked"],
        ingredients: [
          "10 oz frozen chopped spinach, thawed and squeezed dry",
          "1 (14 oz) can artichoke hearts, drained and roughly chopped",
          "8 oz cream cheese, softened",
          "1/2 cup sour cream",
          "1/4 cup mayonnaise",
          "1 cup shredded mozzarella cheese, divided",
          "1/2 cup grated Parmesan cheese, divided",
          "3 cloves garlic, minced",
          "1/2 teaspoon red pepper flakes (optional)",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "1 tablespoon fresh lemon juice",
          "For serving:",
          "Toasted baguette slices",
          "Crackers",
          "Tortilla chips",
          "Fresh vegetables (bell peppers, carrots, cucumber)"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C).",
          "In a large mixing bowl, combine the cream cheese, sour cream, and mayonnaise. Mix until smooth and well combined.",
          "Add the garlic, lemon juice, salt, pepper, and red pepper flakes (if using). Stir to combine.",
          "Add the drained and chopped spinach and artichoke hearts to the mixture. Stir well.",
          "Fold in 3/4 cup of the mozzarella cheese and 1/4 cup of the Parmesan cheese.",
          "Transfer the mixture to a 1-quart baking dish or 9-inch pie plate.",
          "Sprinkle the remaining mozzarella and Parmesan cheese over the top.",
          "Bake for 25-30 minutes until the dip is bubbly and the cheese on top is melted and lightly golden.",
          "Optional: For an extra golden top, broil for 2-3 minutes at the end, watching carefully to prevent burning.",
          "Remove from oven and let cool for 5 minutes before serving.",
          "Serve warm with toasted baguette slices, crackers, tortilla chips, or fresh vegetables for dipping."
        ],
        nutritionInfo: {
          calories: 290,
          protein: "11g",
          carbs: "8g",
          fats: "24g",
          fiber: "3g",
          sugar: "2g",
          sodium: "640mg"
        }
      }
    ]
  },
  {
    foodName: "Sheet Pan Chicken and Vegetables",
    description: "A convenient, one-pan meal featuring chicken pieces and assorted vegetables, all roasted together on a sheet pan for easy preparation and cleanup. This versatile dish allows for endless vegetable and seasoning combinations, making it adaptable to any season or preference. The high-heat roasting method caramelizes the vegetables and creates juicy chicken with crispy skin, while the ingredients meld together for maximum flavor development.",
    tags: ["Sheet pan", "Chicken", "Roasted", "One pan", "Easy", "Dinner", "Vegetables", "Quick", "Healthy", "Meal prep"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Lemon Herb Sheet Pan Chicken and Rainbow Vegetables",
        description: "This easy sheet pan dinner combines juicy roasted chicken with a colorful medley of vegetables, all infused with bright lemon and herb flavors. The beauty of this dish lies in its simplicity: everything cooks together on one pan, allowing the chicken juices to flavor the vegetables as they caramelize to perfection. It's an effortless weeknight solution that delivers a complete, satisfying meal with minimal cleanup.",
        prepTime: "15 minutes",
        cookTime: "35 minutes",
        totalTime: "50 minutes",
        servings: 4,
        servingSize: "1 chicken piece + 1.5 cups vegetables",
        difficulty: "Easy",
        tags: ["Sheet pan", "Chicken", "Roasted", "One pan", "Dinner", "Vegetables", "Healthy"],
        ingredients: [
          "4 bone-in, skin-on chicken thighs (or a mix of thighs and drumsticks)",
          "1 pound baby potatoes, halved (or quartered if large)",
          "2 medium carrots, cut into 1-inch chunks",
          "1 red bell pepper, cut into 1-inch pieces",
          "1 yellow bell pepper, cut into 1-inch pieces",
          "1 medium red onion, cut into wedges",
          "1 medium zucchini, cut into 1-inch half-moons",
          "3 tablespoons olive oil, divided",
          "4 cloves garlic, minced",
          "2 tablespoons fresh lemon juice",
          "1 tablespoon lemon zest",
          "2 teaspoons dried oregano",
          "1 teaspoon dried thyme",
          "1 teaspoon paprika",
          "1 teaspoon salt, divided",
          "1/2 teaspoon black pepper, divided",
          "Fresh parsley, chopped, for garnish",
          "Lemon wedges, for serving"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C). Line a large rimmed baking sheet with parchment paper or foil for easier cleanup.",
          "In a small bowl, mix 2 tablespoons olive oil with minced garlic, lemon juice, lemon zest, oregano, thyme, paprika, 1/2 teaspoon salt, and 1/4 teaspoon pepper.",
          "Pat the chicken pieces dry with paper towels. Place them in a large bowl and pour half of the olive oil mixture over them. Toss to coat thoroughly.",
          "In another large bowl, combine potatoes, carrots, bell peppers, red onion, and zucchini. Add the remaining olive oil mixture plus the additional 1 tablespoon olive oil, 1/2 teaspoon salt, and 1/4 teaspoon pepper. Toss until vegetables are evenly coated.",
          "Spread the vegetables in an even layer on the prepared baking sheet. Place the chicken pieces on top of the vegetables, skin-side up, spacing them evenly apart.",
          "Roast in the preheated oven for 35-40 minutes, or until the chicken reaches an internal temperature of 165°F (74°C) and the vegetables are tender and beginning to caramelize. If needed, turn the vegetables halfway through cooking for even browning.",
          "If you want crispier chicken skin, broil for 2-3 minutes at the end of cooking time, watching carefully to prevent burning.",
          "Remove from oven and let rest for 5 minutes.",
          "Garnish with fresh chopped parsley and serve with lemon wedges."
        ],
        nutritionInfo: {
          calories: 420,
          protein: "28g",
          carbs: "30g",
          fats: "22g",
          fiber: "6g",
          sugar: "8g",
          sodium: "680mg"
        }
      }
    ]
  },
  {
    foodName: "Avocado Toast",
    description: "A simple yet popular breakfast or snack featuring mashed ripe avocado spread over toasted bread, typically topped with various ingredients like eggs, microgreens, or seasonings. This nutritious, satisfying dish offers a perfect balance of creamy texture from the avocado with the crunch of toast, while providing healthy fats and fiber. Easily customizable to personal preference, it has become an iconic staple of contemporary casual dining.",
    tags: ["Breakfast", "Brunch", "Vegetarian", "Vegan option", "Avocado", "Toast", "Quick", "Healthy", "Simple", "Customizable"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Perfect Avocado Toast with Variations",
        description: "This elevated avocado toast starts with perfectly ripe avocado mashed onto crusty, artisanal bread and can be customized with your choice of delicious toppings. The creamy avocado provides heart-healthy fats and creates a luxurious base for bright, contrasting flavors and textures. While simple to prepare, this versatile dish is equally suitable for a quick breakfast, satisfying lunch, or light dinner.",
        prepTime: "10 minutes",
        cookTime: "5 minutes",
        totalTime: "15 minutes",
        servings: 2,
        servingSize: "1 toast",
        difficulty: "Easy",
        tags: ["Breakfast", "Brunch", "Vegetarian", "Avocado", "Toast", "Quick", "Healthy"],
        ingredients: [
          "For the base:",
          "2 slices good quality bread (sourdough, whole grain, or artisan bread)",
          "1 large ripe avocado",
          "1 tablespoon fresh lime or lemon juice",
          "1/4 teaspoon salt",
          "1/4 teaspoon freshly ground black pepper",
          "1/4 teaspoon red pepper flakes (optional)",
          "For the classic topping (choose one variation or mix and match):",
          "2 eggs, fried or poached",
          "Microgreens or sprouts",
          "Cherry tomatoes, halved",
          "For the Mediterranean topping:",
          "1/4 cup crumbled feta cheese",
          "1/2 cup cherry tomatoes, halved",
          "1 tablespoon chopped fresh basil",
          "Balsamic glaze for drizzling",
          "For the Southwest topping:",
          "1/4 cup black beans, rinsed and drained",
          "2 tablespoons corn kernels",
          "2 tablespoons diced red onion",
          "Fresh cilantro leaves",
          "1 tablespoon lime juice",
          "Dash of cumin"
        ],
        instructions: [
          "Toast the bread slices until golden brown and crisp.",
          "Cut the avocado in half, remove the pit, and scoop the flesh into a medium bowl.",
          "Add lime or lemon juice, salt, pepper, and red pepper flakes (if using) to the avocado. Mash with a fork to your desired consistency – some prefer it chunky, others smooth.",
          "Spread the mashed avocado mixture evenly over the toasted bread slices.",
          "For the classic topping: Top each slice with a fried or poached egg. Garnish with microgreens and cherry tomatoes.",
          "For the Mediterranean topping: Sprinkle with crumbled feta cheese, cherry tomatoes, and chopped basil. Drizzle with balsamic glaze.",
          "For the Southwest topping: Mix black beans, corn, red onion, cilantro, lime juice, and cumin in a small bowl. Spoon over the avocado toast.",
          "Serve immediately."
        ],
        nutritionInfo: {
          calories: 280,
          protein: "8g",
          carbs: "25g",
          fats: "18g",
          fiber: "9g",
          sugar: "3g",
          sodium: "390mg"
        }
      }
    ]
  },
  {
    foodName: "Greek Yogurt Breakfast Bowl",
    description: "A nutritious and protein-rich breakfast featuring creamy Greek yogurt topped with various fruits, nuts, seeds, and other toppings like honey or granola. This versatile dish combines the tangy flavor and smooth texture of Greek yogurt with the sweetness of fresh fruits and the crunch of granola or nuts, creating a balanced morning meal that can be customized to suit different tastes and dietary preferences.",
    tags: ["Breakfast", "Greek yogurt", "Healthy", "High protein", "Quick", "No-cook", "Fruit", "Vegetarian", "Gluten-free option", "Customizable"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Power Protein Greek Yogurt Breakfast Bowl",
        description: "This nutrient-dense breakfast bowl starts with creamy protein-packed Greek yogurt and is topped with a colorful array of fresh fruits, crunchy granola, and nourishing seeds. Drizzled with honey and customizable to your taste preferences, this satisfying morning meal provides sustained energy without requiring any cooking. Perfect for busy mornings, it offers a balanced combination of protein, complex carbs, and healthy fats to fuel your day.",
        prepTime: "10 minutes",
        cookTime: "0 minutes",
        totalTime: "10 minutes",
        servings: 1,
        servingSize: "1 bowl",
        difficulty: "Easy",
        tags: ["Breakfast", "Greek yogurt", "Healthy", "High protein", "Quick", "No-cook", "Vegetarian"],
        ingredients: [
          "For the base:",
          "1 cup plain Greek yogurt (2% or full-fat recommended for creaminess)",
          "1 teaspoon vanilla extract (optional)",
          "1 teaspoon honey or maple syrup, plus more for drizzling",
          "For the toppings (choose your favorites):",
          "1/2 cup fresh berries (strawberries, blueberries, raspberries)",
          "1/2 banana, sliced",
          "1 tablespoon chia seeds",
          "1 tablespoon ground flaxseed",
          "2 tablespoons granola",
          "1 tablespoon nut butter (almond, peanut, or cashew)",
          "1 tablespoon chopped nuts (walnuts, almonds, or pecans)",
          "1 tablespoon pumpkin seeds or sunflower seeds",
          "1/2 teaspoon ground cinnamon",
          "Additional options:",
          "Chopped apple or pear",
          "Sliced kiwi",
          "Pomegranate seeds",
          "Coconut flakes",
          "Dark chocolate chips (1-2 teaspoons)",
          "Fresh mint leaves"
        ],
        instructions: [
          "In a serving bowl, combine the Greek yogurt with vanilla extract and honey or maple syrup (if using). Stir until smooth.",
          "Arrange your chosen fruits on top of the yogurt.",
          "Sprinkle with granola, nuts, and seeds.",
          "If using, add a dollop of nut butter in the center.",
          "Dust with cinnamon and drizzle with additional honey or maple syrup.",
          "Add any additional toppings you desire.",
          "Enjoy immediately.",
          "For meal prep: Keep the yogurt base separate from the toppings until ready to eat to maintain the best texture."
        ],
        nutritionInfo: {
          calories: 340,
          protein: "24g",
          carbs: "35g",
          fats: "14g",
          fiber: "7g",
          sugar: "18g",
          sodium: "70mg"
        }
      }
    ]
  },
  {
    foodName: "Vegetable Frittata",
    description: "An Italian-inspired egg dish similar to a crustless quiche, featuring beaten eggs baked with a colorful array of vegetables, herbs, and often cheese. This versatile, protein-rich dish can be served hot or at room temperature, making it ideal for breakfast, brunch, or light dinners. The open-faced nature allows for beautiful presentation of vibrant vegetables suspended in a fluffy egg base.",
    tags: ["Eggs", "Vegetarian", "Breakfast", "Brunch", "Italian-inspired", "Gluten-free", "High protein", "Make ahead", "Lunch", "Dinner"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Mediterranean Vegetable Frittata",
        description: "This colorful vegetable frittata combines farm-fresh eggs with a variety of Mediterranean-inspired vegetables and herbs for a versatile dish that works for any meal of the day. The edges are delicately crisp while the center remains tender and custardy, studded with sweet bell peppers, spinach, and tangy feta cheese. Easy to make ahead and reheat, it's perfect for meal prep, brunch gatherings, or a simple dinner with a side salad.",
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        totalTime: "40 minutes",
        servings: 6,
        servingSize: "1 slice",
        difficulty: "Medium",
        tags: ["Eggs", "Vegetarian", "Breakfast", "Brunch", "Italian-inspired", "Gluten-free", "High protein"],
        ingredients: [
          "10 large eggs",
          "1/4 cup whole milk or half-and-half",
          "1/2 teaspoon salt",
          "1/4 teaspoon freshly ground black pepper",
          "2 tablespoons olive oil",
          "1 small onion, diced",
          "1 red bell pepper, diced",
          "1 zucchini, diced",
          "2 cloves garlic, minced",
          "2 cups fresh spinach, roughly chopped",
          "1 cup cherry tomatoes, halved",
          "1/4 cup fresh basil leaves, chopped, plus more for garnish",
          "2 tablespoons fresh parsley, chopped",
          "1 teaspoon dried oregano",
          "3/4 cup crumbled feta cheese, divided",
          "1/4 cup grated Parmesan cheese",
          "Red pepper flakes, for serving (optional)"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C).",
          "In a large bowl, whisk together eggs, milk, salt, and pepper until well combined. Set aside.",
          "Heat olive oil in a 10-inch oven-safe skillet (cast iron works well) over medium heat.",
          "Add onion and cook until softened, about 3-4 minutes.",
          "Add bell pepper and zucchini, cooking for another 4-5 minutes until vegetables begin to soften.",
          "Add garlic and cook for 30 seconds until fragrant.",
          "Stir in spinach and cook just until wilted, about 1 minute.",
          "Add cherry tomatoes, basil, parsley, and oregano, stirring to combine.",
          "Pour the egg mixture over the vegetables in the skillet.",
          "Sprinkle 1/2 cup of the feta cheese and all of the Parmesan cheese evenly over the top.",
          "Cook on the stovetop for 3-4 minutes, until the edges begin to set.",
          "Transfer the skillet to the preheated oven and bake for 20-25 minutes, until the frittata is set in the center and lightly golden on top.",
          "Remove from oven and let cool for 5 minutes.",
          "Sprinkle with remaining 1/4 cup feta cheese and additional fresh basil.",
          "Cut into wedges and serve warm or at room temperature, with red pepper flakes if desired."
        ],
        nutritionInfo: {
          calories: 240,
          protein: "16g",
          carbs: "8g",
          fats: "17g",
          fiber: "2g",
          sugar: "4g",
          sodium: "460mg"
        }
      }
    ]
  },
  {
    foodName: "Slow Cooker Pulled Pork",
    description: "A succulent, tender meat dish made by slow-cooking pork shoulder or butt in a flavorful sauce until it becomes so tender it can be easily shredded or 'pulled' apart. This set-it-and-forget-it method results in incredibly juicy meat infused with whatever seasonings or sauce is used, typically barbecue or other rich, savory flavors. Perfect for feeding a crowd, this versatile dish can be served in sandwiches, tacos, or over rice.",
    tags: ["Slow cooker", "Pork", "BBQ", "Main dish", "Make ahead", "Meal prep", "Sandwiches", "Comfort food", "Dinner", "American"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Slow Cooker BBQ Pulled Pork",
        description: "This melt-in-your-mouth pulled pork develops incredible flavor and fall-apart tenderness as it slowly cooks in a blend of spices and tangy barbecue sauce. The long, gentle cooking process allows the pork to absorb all the delicious flavors while breaking down into succulent, shreddable meat. Perfect for feeding a crowd or meal prepping, this versatile dish can be served in sandwiches, tacos, over rice, or alongside your favorite sides.",
        prepTime: "15 minutes",
        cookTime: "8 hours",
        totalTime: "8 hours 15 minutes",
        servings: 8,
        servingSize: "1/2 cup pulled pork",
        difficulty: "Easy",
        tags: ["Slow cooker", "Pork", "BBQ", "Main dish", "Make ahead", "Meal prep", "Dinner", "American"],
        ingredients: [
          "4 pounds pork shoulder (Boston butt), excess fat trimmed",
          "2 tablespoons brown sugar",
          "1 tablespoon paprika",
          "1 tablespoon chili powder",
          "2 teaspoons garlic powder",
          "2 teaspoons onion powder",
          "1 teaspoon dried oregano",
          "1 teaspoon ground cumin",
          "1 teaspoon salt",
          "1/2 teaspoon black pepper",
          "1/2 teaspoon cayenne pepper (optional, for heat)",
          "1 large onion, sliced",
          "4 cloves garlic, minced",
          "3/4 cup chicken broth or apple juice",
          "1/4 cup apple cider vinegar",
          "1 1/2 cups barbecue sauce, divided (plus more for serving)",
          "For serving:",
          "Hamburger buns",
          "Coleslaw",
          "Pickles",
          "Sliced jalapeños (optional)"
        ],
        instructions: [
          "In a small bowl, combine brown sugar, paprika, chili powder, garlic powder, onion powder, oregano, cumin, salt, black pepper, and cayenne pepper (if using) to create a spice rub.",
          "Pat the pork shoulder dry with paper towels, then rub the spice mixture all over the meat, massaging it into all the crevices.",
          "Place sliced onion and minced garlic in the bottom of the slow cooker.",
          "Set the seasoned pork on top of the onions and garlic.",
          "Pour chicken broth (or apple juice) and apple cider vinegar around the sides of the pork (not over it, to keep the rub intact).",
          "Cover and cook on low for 8-10 hours, or on high for 5-6 hours, until the pork is very tender and easily shreds with a fork.",
          "Remove the pork from the slow cooker and place it on a large cutting board or in a large bowl. Let it rest for 10 minutes.",
          "While the meat is resting, skim excess fat from the liquid in the slow cooker.",
          "Using two forks, shred the pork, removing any large pieces of fat as you go.",
          "Return the shredded pork to the slow cooker. Add 1 cup of barbecue sauce and stir to combine with the cooking liquid and meat.",
          "Cover and cook on low for an additional 30-60 minutes to allow the pork to absorb the sauce.",
          "Serve on hamburger buns with additional barbecue sauce, topped with coleslaw, pickles, and jalapeños if desired."
        ],
        nutritionInfo: {
          calories: 380,
          protein: "35g",
          carbs: "15g",
          fats: "20g",
          fiber: "1g",
          sugar: "12g",
          sodium: "720mg"
        }
      }
    ]
  },
  {
    foodName: "Roasted Brussels Sprouts with Bacon",
    description: "A savory side dish featuring Brussels sprouts roasted until caramelized and crispy, enhanced with the rich, smoky flavor of bacon. This preparation method transforms the sometimes-maligned vegetable into a crave-worthy dish, as the high-heat roasting brings out the natural sweetness of the sprouts while the bacon adds a salty, savory element. The contrast of textures and flavors makes this a popular choice even among former Brussels sprout skeptics.",
    tags: ["Side dish", "Vegetables", "Brussels sprouts", "Bacon", "Roasted", "Easy", "Gluten-free", "Low-carb", "Holiday", "Dinner"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Crispy Maple Bacon Brussels Sprouts",
        description: "These irresistible Brussels sprouts are roasted until caramelized and crispy, then tossed with crisp bacon pieces and a touch of maple syrup for the perfect balance of savory, sweet, and smoky flavors. The high-heat roasting method transforms them into nutty, tender-crisp morsels that even Brussels sprout skeptics can't resist. Simple enough for weeknights but special enough for holiday tables, this versatile side dish pairs beautifully with almost any main course.",
        prepTime: "10 minutes",
        cookTime: "25 minutes",
        totalTime: "35 minutes",
        servings: 4,
        servingSize: "3/4 cup",
        difficulty: "Easy",
        tags: ["Side dish", "Vegetables", "Brussels sprouts", "Bacon", "Roasted", "Gluten-free", "Low-carb"],
        ingredients: [
          "1 1/2 pounds Brussels sprouts, trimmed and halved (or quartered if large)",
          "6 slices bacon, cut into 1/2-inch pieces",
          "2 tablespoons olive oil",
          "1/2 teaspoon salt",
          "1/4 teaspoon freshly ground black pepper",
          "1/4 teaspoon garlic powder",
          "1 tablespoon balsamic vinegar",
          "1 tablespoon maple syrup (real, not pancake syrup)",
          "1/4 cup chopped pecans or walnuts (optional)",
          "2 tablespoons grated Parmesan cheese (optional)",
          "Red pepper flakes, to taste (optional)"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C). Line a large rimmed baking sheet with parchment paper or aluminum foil for easier cleanup.",
          "In a large bowl, toss Brussels sprouts with olive oil, salt, pepper, and garlic powder until evenly coated.",
          "Spread the Brussels sprouts in a single layer on the prepared baking sheet, placing them cut-side down for maximum caramelization.",
          "Sprinkle the bacon pieces around and on top of the Brussels sprouts.",
          "Roast in the preheated oven for 20-25 minutes, stirring halfway through, until the Brussels sprouts are tender and caramelized and the bacon is crispy.",
          "While the sprouts are roasting, mix together the balsamic vinegar and maple syrup in a small bowl.",
          "When the Brussels sprouts are done, remove from the oven and immediately drizzle with the balsamic-maple mixture. Toss to coat evenly.",
          "If using, add the chopped nuts and sprinkle with Parmesan cheese and red pepper flakes.",
          "Return to the oven for 3-5 more minutes, until the nuts are toasted and everything is well combined.",
          "Serve hot or warm."
        ],
        nutritionInfo: {
          calories: 240,
          protein: "10g",
          carbs: "18g",
          fats: "15g",
          fiber: "7g",
          sugar: "6g",
          sodium: "480mg"
        }
      }
    ]
  },
  {
    foodName: "Chocolate Chip Cookies",
    description: "Classic baked treats featuring a buttery, sweet dough studded with morsels of chocolate. These beloved cookies balance crisp edges with soft, chewy centers and the rich contrast of chocolate chips against the vanilla-scented dough. An iconic American dessert enjoyed by all ages, chocolate chip cookies offer the perfect blend of sweetness, butter, and chocolate in a convenient handheld format that's synonymous with comfort and home baking.",
    tags: ["Dessert", "Baking", "Cookies", "Chocolate", "Sweet", "Kid-friendly", "Comfort food", "American", "Snack", "Make ahead"],
    youtubeVideos: genericYoutubeVideos,
    recipes: [
      {
        title: "Perfect Chocolate Chip Cookies",
        description: "These classic chocolate chip cookies boast crispy edges and soft, chewy centers filled with melty chocolate chips. The dough is enhanced with brown sugar for caramel notes and a touch of sea salt to perfectly balance the sweetness. This reliable recipe delivers consistently delicious cookies that taste like they came from a bakery—whether you enjoy them warm from the oven or stored for later, they're the ultimate crowd-pleasing dessert.",
        prepTime: "15 minutes",
        cookTime: "12 minutes",
        totalTime: "1 hour (including chilling)",
        servings: 24,
        servingSize: "1 cookie",
        difficulty: "Easy",
        tags: ["Dessert", "Baking", "Cookies", "Chocolate", "Sweet", "Kid-friendly", "American"],
        ingredients: [
          "1 cup (2 sticks) unsalted butter, softened but still cool",
          "3/4 cup granulated sugar",
          "3/4 cup packed brown sugar",
          "2 large eggs, at room temperature",
          "2 teaspoons vanilla extract",
          "2 1/4 cups all-purpose flour",
          "1 teaspoon baking soda",
          "1/2 teaspoon salt",
          "2 cups semi-sweet chocolate chips, divided",
          "1 cup chopped walnuts or pecans (optional)",
          "Flaky sea salt, for sprinkling (optional)"
        ],
        instructions: [
          "In a large bowl, cream together the butter, granulated sugar, and brown sugar until light and fluffy, about 3-4 minutes.",
          "Beat in the eggs one at a time, then stir in the vanilla extract.",
          "In a separate bowl, whisk together the flour, baking soda, and salt.",
          "Gradually add the dry ingredients to the wet ingredients, mixing just until incorporated. Do not overmix.",
          "Fold in 1 3/4 cups of chocolate chips and nuts (if using), reserving the remaining 1/4 cup of chocolate chips for topping.",
          "Cover the dough and refrigerate for at least 30 minutes, or up to 24 hours for deeper flavor development.",
          "When ready to bake, preheat oven to 350°F (175°C). Line baking sheets with parchment paper.",
          "Scoop rounded tablespoons of dough and place on the prepared baking sheets, spacing them about 2 inches apart.",
          "Press a few of the reserved chocolate chips onto the top of each cookie dough ball.",
          "Bake for 10-12 minutes, until edges are golden but centers are still soft. The cookies may look slightly underbaked in the center, but they will firm up as they cool.",
          "If using, sprinkle hot cookies with a small amount of flaky sea salt.",
          "Allow cookies to cool on the baking sheet for 5 minutes, then transfer to a wire rack to cool completely.",
          "Store in an airtight container at room temperature for up to 5 days, or freeze for up to 3 months."
        ],
        nutritionInfo: {
          calories: 210,
          protein: "2g",
          carbs: "26g",
          fats: "12g",
          fiber: "1g",
          sugar: "18g",
          sodium: "115mg"
        }
      }
    ]
  }
];