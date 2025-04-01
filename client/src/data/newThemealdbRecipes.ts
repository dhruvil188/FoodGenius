import { AnalyzeImageResponse } from "@shared/schema";
import { genericYoutubeVideos } from "./recipeLibrary";

// Additional recipes from TheMealDB API with verified images
// Each recipe contains complete details including matching images
export const newThemealdbRecipes: AnalyzeImageResponse[] = [
  {
    "foodName": "Teriyaki Chicken Casserole",
    "description": "A delicious Japanese-inspired dish combining tender chicken, colorful vegetables, and fluffy rice, all coated in a sweet and savory teriyaki sauce. This comforting casserole is perfect for family dinners and meal prep.",
    "tags": [
      "Chicken",
      "Japanese",
      "Casserole",
      "Family Meal",
      "Rice"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Teriyaki Chicken Casserole",
        "description": "This family-friendly teriyaki chicken casserole combines tender chicken pieces with colorful vegetables and rice, all coated in a sweet and savory homemade teriyaki sauce. It's a complete meal in one dish that's perfect for busy weeknights.",
        "prepTime": "15 minutes",
        "cookTime": "50 minutes",
        "totalTime": "1 hour 5 minutes",
        "servings": 6,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Japanese-inspired", "Casserole", "Chicken", "Rice", "Family Meal"],
        "ingredients": [
          "3/4 cup soy sauce",
          "1/2 cup water",
          "1/4 cup brown sugar",
          "1/2 teaspoon ground ginger",
          "1/2 teaspoon minced garlic",
          "2 tablespoons cornstarch",
          "2 tablespoons cold water",
          "4 boneless skinless chicken breasts",
          "1 cup uncooked rice",
          "1 cup frozen mixed vegetables (carrots, peas, corn)",
          "1 cup broccoli florets",
          "2 cups water"
        ],
        "instructions": [
          "Preheat oven to 350°F (175°C).",
          "In a small saucepan over low heat, combine soy sauce, 1/2 cup water, brown sugar, ginger and garlic. Simmer for about 5 minutes.",
          "In a small bowl, combine cornstarch with 2 tablespoons cold water and whisk until dissolved. Add to the saucepan and stir until sauce thickens. Remove from heat.",
          "Place chicken breasts in a 9x13 inch baking dish and pour half of the sauce over the chicken. Cover with foil and bake for 30 minutes.",
          "Meanwhile, prepare rice according to package directions.",
          "Remove chicken from oven and shred with two forks. Add rice, mixed vegetables, and broccoli to the baking dish. Pour remaining sauce over everything and mix well.",
          "Cover again with foil and bake for an additional 15-20 minutes, until vegetables are tender.",
          "Let stand for 5 minutes before serving."
        ],
        "nutritionInfo": {
          "calories": 320,
          "protein": "25g",
          "carbs": "42g",
          "fats": "5g",
          "fiber": "3g",
          "sugar": "9g",
          "sodium": "980mg"
        }
      }
    ]
  },
  {
    "foodName": "Chocolate Gateau",
    "description": "A rich, moist chocolate cake from French cuisine that's both elegant and decadent. This classic dessert features intense chocolate flavor, often complemented by a silky ganache or glaze, making it perfect for special occasions and celebrations.",
    "tags": [
      "Cake",
      "Chocolate",
      "French",
      "Dessert",
      "Baking"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Decadent Chocolate Gateau",
        "description": "This indulgent chocolate gateau features multiple layers of rich chocolate sponge filled with silky chocolate ganache and topped with a glossy chocolate glaze. Perfect for special occasions or anytime you want to impress with a spectacular dessert.",
        "prepTime": "30 minutes",
        "cookTime": "25 minutes",
        "totalTime": "2 hours (including cooling and setting time)",
        "servings": 10,
        "servingSize": "1 slice",
        "difficulty": "Intermediate",
        "tags": ["Dessert", "Chocolate", "French", "Cake", "Special Occasion"],
        "ingredients": [
          "200g dark chocolate (70% cocoa), chopped",
          "200g unsalted butter, softened",
          "200g granulated sugar",
          "6 eggs",
          "2 tbsp all-purpose flour",
          "200g ground almonds",
          "1 tsp vanilla extract",
          "Pinch of salt",
          "For ganache: 200g dark chocolate",
          "For ganache: 200ml heavy cream",
          "For glaze: 100g dark chocolate",
          "For glaze: 100ml heavy cream",
          "For glaze: 2 tbsp honey"
        ],
        "instructions": [
          "Preheat oven to 350°F (175°C). Grease and line a 9-inch round cake pan.",
          "Melt the chocolate in a heatproof bowl over a pan of simmering water. Set aside to cool slightly.",
          "In a large bowl, cream together the butter and sugar until light and fluffy.",
          "Separate the eggs. Add the yolks one at a time to the butter mixture, beating well after each addition.",
          "Fold in the melted chocolate, flour, ground almonds, vanilla, and salt.",
          "In a clean bowl, whisk the egg whites until stiff peaks form. Fold gently into the chocolate mixture.",
          "Pour the batter into the prepared pan and bake for 25-30 minutes, until a toothpick inserted comes out with moist crumbs.",
          "Let cool in the pan for 10 minutes, then turn out onto a wire rack to cool completely.",
          "For the ganache, heat the cream until just simmering. Pour over the chopped chocolate and let sit for 2 minutes, then stir until smooth.",
          "When cool, slice the cake horizontally into two layers. Spread half the ganache on the bottom layer, top with the second layer, and spread the remaining ganache on top and sides.",
          "For the glaze, heat the cream and honey until just simmering. Pour over the chopped chocolate and stir until smooth. Let cool slightly before pouring over the cake.",
          "Refrigerate until set, about 1 hour. Bring to room temperature before serving."
        ],
        "nutritionInfo": {
          "calories": 580,
          "protein": "8g",
          "carbs": "36g",
          "fats": "47g",
          "fiber": "4g",
          "sugar": "30g",
          "sodium": "80mg"
        }
      }
    ]
  },
  {
    "foodName": "Fish Pie",
    "description": "Fish Pie is a classic British comfort food featuring a delicious mixture of fish in a creamy sauce, topped with mashed potatoes and baked until golden. This hearty dish has been a staple in British households for generations, particularly popular during colder months.",
    "tags": [
      "British",
      "Seafood",
      "Comfort Food",
      "Potato",
      "Baked"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Classic British Fish Pie",
        "description": "This traditional British fish pie combines flaky white fish, smoked fish, and shrimp in a creamy sauce flavored with herbs, all topped with fluffy mashed potatoes and baked until golden and bubbling. It's the ultimate comfort food for fish lovers.",
        "prepTime": "30 minutes",
        "cookTime": "40 minutes",
        "totalTime": "1 hour 10 minutes",
        "servings": 6,
        "servingSize": "1.5 cups",
        "difficulty": "Intermediate",
        "tags": ["British", "Seafood", "Comfort Food", "Baked", "Dinner"],
        "ingredients": [
          "500g white fish fillets (cod, haddock, or pollock)",
          "250g smoked fish (haddock or salmon)",
          "200g raw peeled shrimp",
          "500ml whole milk",
          "1 bay leaf",
          "1 onion, studded with 3 cloves",
          "3 tbsp butter",
          "3 tbsp all-purpose flour",
          "3 tbsp chopped fresh parsley",
          "1 tbsp chopped fresh dill",
          "1 kg potatoes, peeled and cut into chunks",
          "50g butter, for mashed potatoes",
          "100ml warm milk, for mashed potatoes",
          "100g grated cheddar cheese",
          "Salt and freshly ground pepper to taste"
        ],
        "instructions": [
          "Preheat oven to 375°F (190°C).",
          "Place the fish fillets and shrimp in a large pan, pour over the milk, and add the bay leaf and studded onion. Bring to a gentle simmer, then remove from heat and let stand for 5 minutes.",
          "Remove the fish and shrimp with a slotted spoon, breaking fish into large chunks. Strain and reserve the milk.",
          "In a clean saucepan, melt the butter, add the flour, and cook for 1-2 minutes, stirring constantly.",
          "Gradually whisk in the reserved milk and cook, stirring, until the sauce thickens and is smooth.",
          "Stir in the parsley and dill, then gently fold in the fish chunks and shrimp. Season with salt and pepper.",
          "For the topping, boil the potatoes until tender, then drain and mash with the butter and warm milk until smooth. Season to taste.",
          "Pour the fish mixture into a 2-quart baking dish. Spoon the mashed potatoes over the fish mixture, spreading to the edges with a fork to create peaks.",
          "Sprinkle with grated cheddar cheese and bake for 35-40 minutes, until golden and bubbling.",
          "Let stand for 5 minutes before serving."
        ],
        "nutritionInfo": {
          "calories": 430,
          "protein": "32g",
          "carbs": "35g",
          "fats": "18g",
          "fiber": "3g",
          "sugar": "4g",
          "sodium": "650mg"
        }
      }
    ]
  },
  {
    "foodName": "Pancakes",
    "description": "Pancakes are a beloved breakfast dish enjoyed worldwide, with variations appearing in nearly every culture. These soft, flat cakes are made from a simple batter and cooked on a hot surface until golden brown. They can be sweet or savory and are often topped with syrups, fruits, or other toppings.",
    "tags": [
      "Breakfast",
      "American",
      "Sweet",
      "Quick",
      "Vegetarian"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Fluffy American Pancakes",
        "description": "These light and fluffy pancakes are a breakfast classic that everyone should know how to make. With their golden, crisp edges and soft, pillowy centers, they're perfect for soaking up maple syrup or topped with fresh fruit and whipped cream.",
        "prepTime": "10 minutes",
        "cookTime": "15 minutes",
        "totalTime": "25 minutes",
        "servings": 4,
        "servingSize": "3 pancakes",
        "difficulty": "Easy",
        "tags": ["Breakfast", "American", "Sweet", "Vegetarian", "Quick"],
        "ingredients": [
          "1 1/2 cups all-purpose flour",
          "3 1/2 teaspoons baking powder",
          "1 teaspoon salt",
          "1 tablespoon white sugar",
          "1 1/4 cups milk",
          "1 egg",
          "3 tablespoons butter, melted",
          "1 teaspoon vanilla extract",
          "Butter for cooking",
          "Maple syrup for serving",
          "Fresh berries for serving (optional)"
        ],
        "instructions": [
          "In a large bowl, sift together the flour, baking powder, salt, and sugar.",
          "In a separate bowl, whisk together the milk, egg, melted butter, and vanilla extract.",
          "Pour the wet ingredients into the dry ingredients and stir until just combined. Some small lumps are fine - do not overmix.",
          "Let the batter rest for 5 minutes (this allows the baking powder to activate).",
          "Heat a non-stick griddle or frying pan over medium heat. Add a small pat of butter to coat the surface.",
          "For each pancake, pour about 1/4 cup of batter onto the griddle.",
          "Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.",
          "Flip and cook the other side until golden brown, about 1-2 minutes more.",
          "Transfer to a warm plate and repeat with remaining batter, adding more butter to the pan as needed.",
          "Serve warm with maple syrup and fresh berries if desired."
        ],
        "nutritionInfo": {
          "calories": 310,
          "protein": "8g",
          "carbs": "46g",
          "fats": "10g",
          "fiber": "1g",
          "sugar": "8g",
          "sodium": "350mg"
        }
      }
    ]
  },
  {
    "foodName": "Flamiche",
    "description": "Flamiche is a traditional French tart from the Picardy region, similar to a quiche but typically featuring leeks as the main filling ingredient. Dating back to medieval times, this savory pie combines buttery pastry with a creamy leek filling for a rustic yet refined dish that showcases the delicate flavor of leeks.",
    "tags": [
      "French",
      "Tart",
      "Vegetarian",
      "Leeks",
      "Baking"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional Flamiche (French Leek Tart)",
        "description": "This classic French leek tart features a buttery shortcrust pastry filled with tender sautéed leeks in a rich, creamy custard. The delicate flavor of the leeks is complemented by a hint of nutmeg and Gruyère cheese for an elegant savory dish that's perfect for brunch or a light dinner alongside a simple salad.",
        "prepTime": "30 minutes",
        "cookTime": "45 minutes",
        "totalTime": "1 hour 15 minutes (plus chilling time)",
        "servings": 6,
        "servingSize": "1 slice",
        "difficulty": "Intermediate",
        "tags": ["French", "Tart", "Vegetarian", "Leeks", "Baking"],
        "ingredients": [
          "For the pastry:",
          "1 1/2 cups all-purpose flour",
          "1/2 teaspoon salt",
          "9 tablespoons cold unsalted butter, cubed",
          "3-4 tablespoons ice water",
          "For the filling:",
          "3 large leeks (white and light green parts only), cleaned and thinly sliced",
          "2 tablespoons unsalted butter",
          "1 tablespoon olive oil",
          "1/2 teaspoon salt",
          "1/4 teaspoon freshly ground black pepper",
          "Pinch of nutmeg",
          "3 large eggs",
          "1 cup heavy cream",
          "1/2 cup whole milk",
          "1 cup grated Gruyère cheese",
          "2 tablespoons fresh chives, chopped"
        ],
        "instructions": [
          "For the pastry, combine flour and salt in a large bowl. Add butter and work it into the flour using a pastry cutter until the mixture resembles coarse crumbs.",
          "Gradually add ice water, stirring until the dough holds together when pinched. Form into a disk, wrap in plastic, and refrigerate for at least 1 hour.",
          "Preheat oven to 375°F (190°C).",
          "Roll out the dough on a floured surface and line a 9-inch tart pan. Prick the bottom with a fork, line with parchment paper, fill with pie weights, and blind bake for 15 minutes. Remove weights and paper and bake for 5 minutes more. Remove from oven and reduce temperature to 350°F (175°C).",
          "For the filling, heat butter and oil in a large skillet over medium heat. Add leeks, salt, and pepper. Cook, stirring occasionally, until leeks are soft but not browned, about 10-12 minutes. Add nutmeg and let cool slightly.",
          "In a bowl, whisk together eggs, cream, and milk. Stir in 3/4 cup of the cheese and the chives.",
          "Spread the leeks evenly in the tart shell. Pour the egg mixture over the leeks and sprinkle with the remaining cheese.",
          "Bake until the filling is set and golden on top, about 30-35 minutes.",
          "Let cool for 10 minutes before removing from the tart pan. Serve warm or at room temperature."
        ],
        "nutritionInfo": {
          "calories": 480,
          "protein": "12g",
          "carbs": "28g",
          "fats": "36g",
          "fiber": "2g",
          "sugar": "3g",
          "sodium": "440mg"
        }
      }
    ]
  },
  {
    "foodName": "Corba",
    "description": "Corba is a traditional Turkish soup that forms an essential part of Turkish cuisine. This hearty, comforting soup varies widely in ingredients but typically includes vegetables, meat, or legumes in a flavorful broth seasoned with distinctive Middle Eastern spices. It's often served as a starter but can also be a meal in itself.",
    "tags": [
      "Turkish",
      "Soup",
      "Comfort Food",
      "Middle Eastern",
      "Spicy"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Turkish Red Lentil Corba",
        "description": "This vibrant, warming Turkish lentil soup features red lentils simmered with vegetables and aromatic spices, finished with a traditional mixture of butter, paprika, and mint. The soup has a velvety texture and rich flavor that makes it both comforting and satisfying, perfect for cool weather or as a starter to a Turkish feast.",
        "prepTime": "15 minutes",
        "cookTime": "40 minutes",
        "totalTime": "55 minutes",
        "servings": 6,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Turkish", "Soup", "Vegetarian", "Lentils", "Healthy"],
        "ingredients": [
          "2 cups red lentils, rinsed and drained",
          "1 large onion, finely chopped",
          "2 carrots, diced",
          "2 tablespoons tomato paste",
          "1/4 cup fine bulgur wheat",
          "2 teaspoons ground cumin",
          "1 teaspoon paprika (plus more for garnish)",
          "1/2 teaspoon cayenne pepper (adjust to taste)",
          "8 cups vegetable broth",
          "2 tablespoons unsalted butter",
          "2 tablespoons dried mint",
          "Juice of 1 lemon",
          "Salt and freshly ground black pepper to taste",
          "Fresh mint leaves and lemon wedges for serving"
        ],
        "instructions": [
          "In a large pot or Dutch oven, heat 2 tablespoons of olive oil over medium heat.",
          "Add the onion and carrots, and sauté until softened, about 5 minutes.",
          "Stir in the tomato paste and cook for another minute.",
          "Add the lentils, bulgur, cumin, paprika, and cayenne pepper. Stir to coat everything with the spices.",
          "Pour in the vegetable broth and bring to a boil. Reduce heat to low, cover, and simmer for about 30 minutes, or until the lentils are completely soft and falling apart.",
          "Using an immersion blender, puree the soup until smooth (or transfer in batches to a regular blender).",
          "In a small saucepan, melt the butter over medium heat. Add the dried mint and cook for 30 seconds until fragrant.",
          "Stir the mint butter into the soup along with the lemon juice. Season with salt and pepper to taste.",
          "Serve hot, garnished with a sprinkle of paprika, fresh mint leaves, and lemon wedges on the side."
        ],
        "nutritionInfo": {
          "calories": 290,
          "protein": "16g",
          "carbs": "45g",
          "fats": "6g",
          "fiber": "8g",
          "sugar": "5g",
          "sodium": "480mg"
        }
      }
    ]
  },
  {
    "foodName": "Kumpir",
    "description": "Kumpir is a popular Turkish street food consisting of a large baked potato that's split open and filled with a variety of toppings. This hearty dish originated in the Balkan region but became a staple in Turkish cuisine, especially in Istanbul. The potato is typically mixed with butter and cheese, then customized with an assortment of toppings to create a complete meal.",
    "tags": [
      "Turkish",
      "Street Food",
      "Potato",
      "Vegetarian",
      "Customizable"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Turkish Kumpir (Loaded Baked Potato)",
        "description": "This Turkish street food favorite features extra-large baked potatoes that are fluffed with butter and cheese, then topped with an assortment of colorful ingredients. Kumpir is endlessly customizable and makes for a satisfying meal that can be adjusted to suit any preference.",
        "prepTime": "15 minutes",
        "cookTime": "1 hour 15 minutes",
        "totalTime": "1 hour 30 minutes",
        "servings": 4,
        "servingSize": "1 loaded potato",
        "difficulty": "Easy",
        "tags": ["Turkish", "Street Food", "Potato", "Customizable", "Dinner"],
        "ingredients": [
          "4 large baking potatoes (russet or Idaho, about 10-12 oz each)",
          "4 tablespoons butter, softened",
          "1 cup kaşar cheese or mozzarella, shredded",
          "Salt and pepper to taste",
          "Suggested toppings:",
          "1 cup sweet corn kernels",
          "1 cup sliced black olives",
          "1 cup Russian salad (peas, carrots, potatoes in mayonnaise)",
          "1 cup pickled red cabbage",
          "1/2 cup sliced pickles",
          "1 cup cooked bulgur pilaf",
          "1/2 cup sliced hot dog sausages",
          "1/2 cup crumbled feta cheese",
          "Ketchup and mayonnaise for drizzling"
        ],
        "instructions": [
          "Preheat oven to 400°F (200°C).",
          "Wash potatoes thoroughly and prick several times with a fork. Rub with olive oil and sprinkle with salt.",
          "Place potatoes directly on the oven rack and bake for 60-75 minutes, until the skin is crisp and potatoes are tender when pierced with a knife.",
          "Remove from oven. Let cool for 5 minutes until you can handle them.",
          "Cut each potato in half lengthwise but not all the way through, leaving the bottom intact.",
          "Carefully scoop out some of the flesh without breaking the skin, leaving about 1/2 inch around the edges.",
          "In a bowl, mash the scooped potato with butter and shredded cheese. Season with salt and pepper.",
          "Spoon the mashed mixture back into the potatoes and gently fluff with a fork to create texture.",
          "Set up a toppings bar with all the prepared ingredients.",
          "Let everyone customize their kumpir with their desired toppings, finishing with a drizzle of ketchup and mayonnaise."
        ],
        "nutritionInfo": {
          "calories": 520,
          "protein": "18g",
          "carbs": "68g",
          "fats": "22g",
          "fiber": "7g",
          "sugar": "8g",
          "sodium": "780mg"
        }
      }
    ]
  },
  {
    "foodName": "Shakshuka",
    "description": "Shakshuka is a vibrant North African and Middle Eastern dish featuring eggs poached in a sauce of tomatoes, peppers, onions, and spices. With origins in Tunisia, this hearty one-pan meal has become popular throughout the Mediterranean region and beyond. It's traditionally served straight from the pan with bread for dipping, making it perfect for a communal breakfast or brunch.",
    "tags": [
      "Middle Eastern",
      "Breakfast",
      "Vegetarian",
      "One-pan",
      "Eggs"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional Shakshuka",
        "description": "This colorful, aromatic dish features eggs gently poached in a spiced tomato and bell pepper sauce. The rich, slightly spicy sauce combined with runny egg yolks creates a delicious combination that's perfect for scooping up with warm bread. Shakshuka is ideal for breakfast, brunch, or even dinner.",
        "prepTime": "15 minutes",
        "cookTime": "25 minutes",
        "totalTime": "40 minutes",
        "servings": 4,
        "servingSize": "2 eggs with sauce",
        "difficulty": "Easy",
        "tags": ["Middle Eastern", "Breakfast", "Vegetarian", "Eggs", "Spicy"],
        "ingredients": [
          "2 tablespoons olive oil",
          "1 large onion, diced",
          "1 red bell pepper, seeded and diced",
          "1 green bell pepper, seeded and diced",
          "4 cloves garlic, minced",
          "2 teaspoons paprika",
          "1 teaspoon ground cumin",
          "1/2 teaspoon ground coriander",
          "1/4 teaspoon red pepper flakes (adjust to taste)",
          "1 28-oz can crushed tomatoes",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "8 large eggs",
          "1/2 cup crumbled feta cheese",
          "2 tablespoons chopped fresh parsley",
          "2 tablespoons chopped fresh cilantro",
          "Warm pita or crusty bread for serving"
        ],
        "instructions": [
          "Heat olive oil in a large, deep skillet over medium heat.",
          "Add onion and bell peppers and cook until softened, about 5-7 minutes.",
          "Add garlic and cook until fragrant, about 1 minute more.",
          "Stir in paprika, cumin, coriander, and red pepper flakes. Cook for 1 minute to bloom the spices.",
          "Pour in the crushed tomatoes. Season with salt and pepper. Simmer for 10-15 minutes, until the sauce has thickened slightly.",
          "Using a spoon, make 8 wells in the sauce. Carefully crack an egg into each well.",
          "Cover the skillet and cook for 5-8 minutes, or until the egg whites are set but the yolks are still runny (cook longer if you prefer firmer yolks).",
          "Sprinkle with crumbled feta cheese, parsley, and cilantro.",
          "Serve immediately from the pan with warm bread for dipping."
        ],
        "nutritionInfo": {
          "calories": 340,
          "protein": "19g",
          "carbs": "18g",
          "fats": "22g",
          "fiber": "5g",
          "sugar": "11g",
          "sodium": "750mg"
        }
      }
    ]
  },
  {
    "foodName": "Moussaka",
    "description": "Moussaka is a classic Greek casserole featuring layers of eggplant, spiced ground meat, and rich béchamel sauce. This hearty, comforting dish has ancient origins and regional variations throughout the Mediterranean and Middle East. The Greek version, with its creamy topping and cinnamon-spiced meat, has become internationally renowned as a quintessential example of Greek cuisine.",
    "tags": [
      "Greek",
      "Casserole",
      "Eggplant",
      "Mediterranean",
      "Comfort Food"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional Greek Moussaka",
        "description": "This authentic Greek moussaka features layers of tender eggplant, richly seasoned ground lamb, and a creamy béchamel sauce, all baked to golden perfection. The combination of warm spices, tender vegetables, and the luscious topping creates a comforting dish that's perfect for special occasions or Sunday dinners.",
        "prepTime": "45 minutes",
        "cookTime": "1 hour",
        "totalTime": "1 hour 45 minutes",
        "servings": 8,
        "servingSize": "1 large piece (approx. 4x4 inches)",
        "difficulty": "Intermediate",
        "tags": ["Greek", "Casserole", "Lamb", "Eggplant", "Baked"],
        "ingredients": [
          "3 large eggplants, sliced into 1/2-inch rounds",
          "Salt for drawing out eggplant moisture",
          "Olive oil for brushing eggplants",
          "1 large potato, peeled and sliced 1/4-inch thick",
          "2 tablespoons olive oil",
          "1 large onion, finely chopped",
          "3 cloves garlic, minced",
          "1.5 lbs ground lamb (or beef)",
          "1/2 cup red wine",
          "2 tablespoons tomato paste",
          "1 14-oz can crushed tomatoes",
          "2 teaspoons ground cinnamon",
          "1 teaspoon dried oregano",
          "1/2 teaspoon ground allspice",
          "1/4 teaspoon ground cloves",
          "1/2 cup chopped fresh parsley",
          "Salt and pepper to taste",
          "For the béchamel sauce:",
          "4 tablespoons butter",
          "4 tablespoons all-purpose flour",
          "3 cups warm milk",
          "1/4 teaspoon ground nutmeg",
          "2 egg yolks",
          "1/2 cup grated Parmesan cheese"
        ],
        "instructions": [
          "Salt the eggplant slices and place in a colander for 30 minutes to draw out moisture. Rinse and pat dry.",
          "Preheat oven to 400°F (200°C). Brush eggplant slices with olive oil and place on baking sheets. Bake for 20-25 minutes until soft and lightly browned.",
          "Reduce oven temperature to 350°F (175°C).",
          "In a large skillet, heat 2 tablespoons olive oil over medium heat. Add onion and sauté until soft, about 5 minutes. Add garlic and cook for 1 minute more.",
          "Add ground lamb and cook until browned, breaking up the meat as it cooks.",
          "Add wine and simmer until reduced by half, about 5 minutes.",
          "Stir in tomato paste, crushed tomatoes, cinnamon, oregano, allspice, and cloves. Simmer for 15-20 minutes until thickened. Add parsley and season with salt and pepper.",
          "For the béchamel, melt butter in a saucepan over medium heat. Add flour and cook, stirring constantly, for 1-2 minutes.",
          "Gradually whisk in warm milk and continue stirring until the sauce thickens, about 5-7 minutes.",
          "Remove from heat and stir in nutmeg. Let cool slightly, then whisk in egg yolks and half the Parmesan.",
          "In a 9x13 inch baking dish, arrange potato slices in a single layer. Top with a layer of eggplant slices, overlapping slightly.",
          "Spread the meat sauce evenly over the eggplant, then add another layer of eggplant on top.",
          "Pour the béchamel sauce over the top layer, spreading to cover completely. Sprinkle with remaining Parmesan.",
          "Bake for 45-50 minutes until the top is golden brown and bubbly.",
          "Let stand for at least 15 minutes before cutting and serving."
        ],
        "nutritionInfo": {
          "calories": 480,
          "protein": "28g",
          "carbs": "26g",
          "fats": "30g",
          "fiber": "7g",
          "sugar": "12g",
          "sodium": "620mg"
        }
      }
    ]
  },
  {
    "foodName": "Poutine",
    "description": "Poutine is an iconic Canadian dish that originated in Quebec in the 1950s. This indulgent comfort food consists of french fries topped with cheese curds and smothered in hot gravy, creating a delicious melty, savory combination. Once a local diner staple, poutine has now gained international popularity and is considered Canada's national dish by many.",
    "tags": [
      "Canadian",
      "Comfort Food",
      "Cheese",
      "Potatoes",
      "Street Food"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Classic Canadian Poutine",
        "description": "This authentic Canadian poutine features crispy french fries topped with squeaky cheese curds and rich brown gravy. The heat from the gravy slightly melts the cheese, creating the perfect combination of textures and flavors that has made this dish a Canadian icon.",
        "prepTime": "20 minutes",
        "cookTime": "30 minutes",
        "totalTime": "50 minutes",
        "servings": 4,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Canadian", "Comfort Food", "Cheese", "Potatoes", "Gravy"],
        "ingredients": [
          "4 large russet potatoes, washed and cut into 1/4-inch thick fries",
          "2 tablespoons white vinegar",
          "Vegetable oil for frying",
          "2 cups fresh cheese curds (ideally at room temperature)",
          "For the gravy:",
          "4 tablespoons unsalted butter",
          "1/4 cup all-purpose flour",
          "1 shallot, minced",
          "2 cloves garlic, minced",
          "4 cups beef stock",
          "2 tablespoons ketchup",
          "1 tablespoon Worcestershire sauce",
          "1 teaspoon black pepper",
          "Salt to taste"
        ],
        "instructions": [
          "Place cut potatoes in a large bowl of cold water with vinegar for 30 minutes. Drain and pat completely dry.",
          "For the gravy, melt butter in a saucepan over medium heat. Add shallots and garlic, sauté until soft (about 2-3 minutes).",
          "Sprinkle flour over the butter mixture and cook for 2-3 minutes, stirring constantly.",
          "Gradually whisk in beef stock, ketchup, and Worcestershire sauce. Bring to a simmer.",
          "Reduce heat to low and simmer for about 20 minutes, until the gravy is thick enough to coat the back of a spoon. Season with pepper and salt.",
          "While the gravy simmers, heat oil in a deep fryer or large pot to 325°F (165°C).",
          "Fry the potatoes in batches for 4-5 minutes until soft but not browned. Remove and drain on paper towels.",
          "Increase oil temperature to 375°F (190°C).",
          "Return the fries to the hot oil in batches and fry until crisp and golden brown, about 3-4 minutes.",
          "Drain on fresh paper towels and season immediately with salt.",
          "To serve, place hot fries in serving dishes, scatter cheese curds over the top, and immediately ladle hot gravy over everything.",
          "Serve immediately while the gravy is hot and the fries are crispy."
        ],
        "nutritionInfo": {
          "calories": 620,
          "protein": "20g",
          "carbs": "65g",
          "fats": "32g",
          "fiber": "4g",
          "sugar": "5g",
          "sodium": "880mg"
        }
      }
    ]
  },
  {
    "foodName": "Kedgeree",
    "description": "Kedgeree is a traditional British breakfast dish with roots in colonial India, combining flaked fish, rice, boiled eggs, and aromatic spices. Originally adapted from the Indian dish khichdi, it became popular in Victorian Britain as a breakfast for upper-class households. This hearty dish represents the culinary influence of the British Raj and remains a beloved part of British cuisine.",
    "tags": [
      "British",
      "Breakfast",
      "Fish",
      "Rice",
      "Anglo-Indian"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional British Kedgeree",
        "description": "This classic Anglo-Indian dish combines fragrant basmati rice, flaked smoked haddock, boiled eggs, and aromatic spices for a hearty breakfast or brunch option. The gentle curry flavor and rich, smoky fish make this a comforting yet sophisticated dish with a fascinating colonial history.",
        "prepTime": "15 minutes",
        "cookTime": "30 minutes",
        "totalTime": "45 minutes",
        "servings": 4,
        "servingSize": "1.5 cups",
        "difficulty": "Intermediate",
        "tags": ["British", "Breakfast", "Fish", "Rice", "Anglo-Indian"],
        "ingredients": [
          "1 lb smoked haddock fillets (undyed if possible)",
          "2 bay leaves",
          "2 cups whole milk",
          "2 cups basmati rice, rinsed",
          "4 tablespoons unsalted butter",
          "1 large onion, finely chopped",
          "1 tablespoon mild curry powder",
          "1 teaspoon ground turmeric",
          "1/2 teaspoon ground coriander",
          "4 hard-boiled eggs, peeled and quartered",
          "3 tablespoons chopped fresh parsley",
          "2 tablespoons chopped fresh chives",
          "1 lemon, cut into wedges",
          "Salt and freshly ground black pepper to taste"
        ],
        "instructions": [
          "Place the smoked haddock in a large shallow pan with the bay leaves. Pour over the milk, adding a little water if the fish isn't fully covered.",
          "Bring to a gentle simmer and poach for about 8-10 minutes, until the fish flakes easily.",
          "Remove the fish, reserving 1 cup of the poaching liquid. When cool enough to handle, flake the fish into large chunks, discarding any skin and bones.",
          "Cook the rice according to package instructions, drain and set aside.",
          "In a large pan, melt the butter over medium heat. Add the onion and cook until softened but not colored, about 5 minutes.",
          "Add the curry powder, turmeric, and coriander. Cook for 1-2 minutes until fragrant.",
          "Add the cooked rice to the pan and stir well to coat with the spiced butter. Pour in the reserved poaching liquid and stir gently.",
          "Fold in the flaked fish and heat through for 2-3 minutes.",
          "Gently fold in half the quartered eggs, being careful not to break them up too much.",
          "Season with salt and pepper to taste.",
          "Transfer to a serving dish and garnish with the remaining eggs, chopped parsley, and chives.",
          "Serve with lemon wedges on the side."
        ],
        "nutritionInfo": {
          "calories": 480,
          "protein": "32g",
          "carbs": "58g",
          "fats": "13g",
          "fiber": "2g",
          "sugar": "6g",
          "sodium": "650mg"
        }
      }
    ]
  },
  {
    "foodName": "Timbits",
    "description": "Timbits are bite-sized donut holes that have become an iconic Canadian treat, introduced by the popular coffee chain Tim Hortons in 1976. These sweet, pop-able morsels come in various flavors and are perfect for sharing. They've become so embedded in Canadian culture that 'Timbit' is sometimes used to describe small children in youth sports.",
    "tags": [
      "Canadian",
      "Dessert",
      "Breakfast",
      "Sweet",
      "Donuts"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Homemade Timbits (Donut Holes)",
        "description": "These homemade Timbits are a Canadian-inspired treat featuring bite-sized fried donut holes in several classic flavors. Make a variety batch with chocolate glazed, cinnamon sugar, and powdered sugar coatings for an authentic experience that rivals the famous coffee shop version.",
        "prepTime": "30 minutes",
        "cookTime": "20 minutes",
        "totalTime": "50 minutes (plus 1 hour rising time)",
        "servings": 36,
        "servingSize": "3 timbits",
        "difficulty": "Intermediate",
        "tags": ["Canadian", "Dessert", "Breakfast", "Donuts", "Sweet"],
        "ingredients": [
          "For the dough:",
          "3 1/4 cups all-purpose flour",
          "1/4 cup granulated sugar",
          "2 1/4 teaspoons instant yeast (1 packet)",
          "1/2 teaspoon salt",
          "1 cup whole milk, warmed to 110°F",
          "1/4 cup unsalted butter, melted",
          "1 large egg",
          "1 teaspoon vanilla extract",
          "Vegetable oil for frying",
          "For chocolate glaze:",
          "1 cup powdered sugar",
          "3 tablespoons cocoa powder",
          "3-4 tablespoons milk",
          "1/2 teaspoon vanilla extract",
          "For cinnamon sugar coating:",
          "1 cup granulated sugar",
          "2 tablespoons ground cinnamon",
          "For powdered sugar coating:",
          "1 cup powdered sugar"
        ],
        "instructions": [
          "In a large bowl, whisk together flour, sugar, yeast, and salt.",
          "In a separate bowl, combine warm milk, melted butter, egg, and vanilla extract.",
          "Add the wet ingredients to the dry ingredients and mix until a soft dough forms.",
          "Knead the dough on a floured surface for about 5 minutes until smooth and elastic.",
          "Place the dough in a greased bowl, cover with plastic wrap, and let rise in a warm place for about 1 hour, until doubled in size.",
          "Punch down the dough and roll it out on a floured surface to about 1/2-inch thickness.",
          "Using a 1-inch round cutter (or the rim of a shot glass), cut out rounds from the dough.",
          "Place the rounds on a parchment-lined baking sheet, cover lightly with a clean kitchen towel, and let rest for 30 minutes.",
          "Meanwhile, prepare the coatings: Mix cinnamon and sugar in one bowl, place powdered sugar in another bowl, and prepare the chocolate glaze by whisking all glaze ingredients until smooth.",
          "Heat oil in a deep fryer or heavy pot to 350°F (175°C).",
          "Fry the dough rounds in batches, 5-6 at a time, for about 1-2 minutes per side until golden brown.",
          "Remove with a slotted spoon and drain on paper towels.",
          "While still warm, roll one-third of the Timbits in cinnamon sugar, one-third in powdered sugar, and dip the remaining third in chocolate glaze.",
          "Let the chocolate-glazed Timbits set for about 10 minutes before serving.",
          "Serve warm or at room temperature."
        ],
        "nutritionInfo": {
          "calories": 260,
          "protein": "3g",
          "carbs": "35g",
          "fats": "12g",
          "fiber": "1g",
          "sugar": "18g",
          "sodium": "70mg"
        }
      }
    ]
  },
  {
    "foodName": "Ribollita",
    "description": "Ribollita is a hearty Tuscan soup that exemplifies Italian cucina povera (peasant cooking), dating back to the Middle Ages. The name means 're-boiled,' as it was traditionally made by reheating leftover minestrone with bread. This rustic dish transforms humble ingredients - beans, vegetables, and stale bread - into a thick, comforting soup that's even more flavorful the next day.",
    "tags": [
      "Italian",
      "Soup",
      "Vegetarian",
      "Tuscan",
      "Comfort Food"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional Tuscan Ribollita",
        "description": "This rustic Tuscan soup transforms simple ingredients into a hearty, flavorful meal. Featuring seasonal vegetables, creamy cannellini beans, and crusty bread that thickens the broth, ribollita embodies the soul of Italian peasant cooking. The soup develops deeper flavors as it sits, making it perfect for preparing ahead.",
        "prepTime": "20 minutes",
        "cookTime": "1 hour",
        "totalTime": "1 hour 20 minutes",
        "servings": 6,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Italian", "Soup", "Vegetarian", "Tuscan", "Beans"],
        "ingredients": [
          "1/4 cup extra virgin olive oil, plus more for drizzling",
          "1 large onion, chopped",
          "2 carrots, diced",
          "2 celery stalks, diced",
          "4 cloves garlic, minced",
          "1/2 teaspoon crushed red pepper flakes (optional)",
          "1 teaspoon dried thyme",
          "1 bay leaf",
          "1 bunch Tuscan kale (cavolo nero), stems removed, leaves chopped",
          "1/2 head savoy cabbage, chopped",
          "1 14-oz can diced tomatoes",
          "2 15-oz cans cannellini beans, drained and rinsed (or 3 cups cooked)",
          "6 cups vegetable broth",
          "1 Parmesan rind (optional)",
          "Salt and freshly ground black pepper to taste",
          "1/2 loaf day-old crusty Italian bread, torn into chunks",
          "Freshly grated Parmesan cheese for serving"
        ],
        "instructions": [
          "Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery, and cook until softened, about 10 minutes.",
          "Add garlic, red pepper flakes, thyme, and bay leaf. Cook for 1-2 minutes until fragrant.",
          "Stir in kale and cabbage, and cook until they begin to wilt, about 5 minutes.",
          "Add diced tomatoes, cannellini beans, vegetable broth, and Parmesan rind if using. Season with salt and pepper.",
          "Bring to a boil, then reduce heat and simmer, covered, for about 30 minutes, until vegetables are tender.",
          "Remove half of the soup and blend until smooth (either using an immersion blender or regular blender), then return to the pot. This step is optional but gives the soup a creamier texture.",
          "Add torn bread pieces to the soup and simmer for another 10 minutes, until the bread has softened and broken down slightly.",
          "Remove bay leaf and Parmesan rind before serving.",
          "Ladle into bowls, drizzle with extra virgin olive oil, and top with freshly grated Parmesan cheese."
        ],
        "nutritionInfo": {
          "calories": 380,
          "protein": "15g",
          "carbs": "52g",
          "fats": "14g",
          "fiber": "12g",
          "sugar": "8g",
          "sodium": "620mg"
        }
      }
    ]
  },
  {
    "foodName": "Kung Pao Chicken",
    "description": "Kung Pao Chicken (Gong Bao Ji Ding) is a famous spicy stir-fry dish from China's Sichuan province. Dating back to the Qing Dynasty, it features diced chicken, peanuts, vegetables, and dried chilis in a tangy sauce. The dish was named after Ding Baozhen, a Qing Dynasty official whose title was 'Gongbao.' Its perfect balance of spicy, sweet, sour, and savory flavors has made it one of the most popular Chinese dishes worldwide.",
    "tags": [
      "Chinese",
      "Sichuan",
      "Spicy",
      "Chicken",
      "Stir-fry"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Authentic Sichuan Kung Pao Chicken",
        "description": "This traditional Sichuan Kung Pao Chicken delivers the authentic flavors of one of China's most famous dishes. The combination of tender chicken, crunchy peanuts, numbing Sichuan peppercorns, and fiery dried chilies creates the distinctive hot, sour, sweet, and savory taste that has made this dish a global favorite.",
        "prepTime": "20 minutes",
        "cookTime": "10 minutes",
        "totalTime": "30 minutes",
        "servings": 4,
        "servingSize": "1 cup",
        "difficulty": "Intermediate",
        "tags": ["Chinese", "Sichuan", "Spicy", "Chicken", "Stir-fry"],
        "ingredients": [
          "1.5 lbs boneless skinless chicken thighs, cut into 3/4-inch cubes",
          "2 tablespoons Shaoxing wine (or dry sherry)",
          "1 tablespoon light soy sauce",
          "1 tablespoon cornstarch",
          "1/2 teaspoon salt",
          "3 tablespoons peanut oil (or vegetable oil)",
          "10-15 dried red chilies, cut in half and seeds removed",
          "1 tablespoon Sichuan peppercorns",
          "4 cloves garlic, minced",
          "1-inch piece ginger, minced",
          "4 scallions, white parts only, cut into 1/2-inch pieces",
          "1/2 cup unsalted roasted peanuts",
          "For the sauce:",
          "1 tablespoon dark soy sauce",
          "1 tablespoon light soy sauce",
          "1 tablespoon black vinegar (or rice vinegar)",
          "1 tablespoon Chinese Shaoxing wine",
          "2 teaspoons sugar",
          "1/2 teaspoon cornstarch",
          "2 tablespoons water"
        ],
        "instructions": [
          "In a bowl, combine chicken with Shaoxing wine, light soy sauce, cornstarch, and salt. Mix well and marinate for at least 15 minutes.",
          "Prepare the sauce by mixing all sauce ingredients in a small bowl. Set aside.",
          "Heat a wok or large skillet over high heat until smoking. Add 2 tablespoons of oil.",
          "Add the marinated chicken and stir-fry until the chicken is nearly cooked through, about 3-4 minutes. Remove chicken and set aside.",
          "In the same wok, add the remaining 1 tablespoon of oil. Add dried chilies and Sichuan peppercorns and stir-fry for about 30 seconds until fragrant and the chilies begin to darken (be careful not to burn them).",
          "Add garlic, ginger, and scallion whites. Stir-fry for another 30 seconds until aromatic.",
          "Return the chicken to the wok and stir to combine with the spices.",
          "Pour in the sauce and stir quickly to coat the chicken. The sauce should thicken almost immediately.",
          "Add the peanuts and toss everything together for another 30 seconds.",
          "Transfer to a serving dish and serve immediately with steamed rice."
        ],
        "nutritionInfo": {
          "calories": 420,
          "protein": "38g",
          "carbs": "12g",
          "fats": "25g",
          "fiber": "3g",
          "sugar": "3g",
          "sodium": "850mg"
        }
      }
    ]
  },
  {
    "foodName": "Vegetable Soup",
    "description": "Vegetable soup is a nourishing, versatile dish found in cuisines worldwide, featuring a medley of seasonal vegetables simmered in flavorful broth. This wholesome comfort food has been prepared for centuries as a practical way to use available produce. Modern versions range from light, clear broths to hearty, chunky stews, all showcasing the natural flavors and nutrients of fresh vegetables.",
    "tags": [
      "Soup",
      "Vegetarian",
      "Healthy",
      "Comfort Food",
      "Vegetables"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Hearty Homemade Vegetable Soup",
        "description": "This colorful, nutrient-rich vegetable soup combines a variety of fresh vegetables in a flavorful tomato-based broth for a satisfying and healthy meal. Easily customizable with seasonal produce and pantry staples, it's perfect for meal prep and freezes beautifully for convenient future meals.",
        "prepTime": "20 minutes",
        "cookTime": "40 minutes",
        "totalTime": "1 hour",
        "servings": 6,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Soup", "Vegetarian", "Healthy", "Comfort Food", "Vegetables"],
        "ingredients": [
          "2 tablespoons olive oil",
          "1 large onion, diced",
          "3 carrots, peeled and diced",
          "3 celery stalks, diced",
          "3 cloves garlic, minced",
          "2 tablespoons tomato paste",
          "1 teaspoon dried thyme",
          "1 teaspoon dried oregano",
          "1/2 teaspoon dried rosemary",
          "1 bay leaf",
          "1 can (14.5 oz) diced tomatoes",
          "2 medium potatoes, peeled and diced",
          "1 cup green beans, trimmed and cut into 1-inch pieces",
          "1 medium zucchini, diced",
          "1 cup corn kernels (fresh or frozen)",
          "1 cup peas (fresh or frozen)",
          "6 cups vegetable broth",
          "1 tablespoon fresh lemon juice",
          "1/4 cup fresh parsley, chopped",
          "Salt and freshly ground black pepper to taste",
          "Parmesan cheese, grated (optional, for serving)"
        ],
        "instructions": [
          "Heat olive oil in a large pot or Dutch oven over medium heat.",
          "Add onion, carrots, and celery (the mirepoix). Cook for 5-7 minutes until vegetables begin to soften.",
          "Add garlic and cook for another minute until fragrant.",
          "Stir in tomato paste and dried herbs (thyme, oregano, rosemary). Cook for 1-2 minutes to bloom the spices.",
          "Add diced tomatoes, potatoes, bay leaf, and vegetable broth. Bring to a boil, then reduce heat and simmer for 15 minutes, or until potatoes are just fork-tender.",
          "Add green beans, zucchini, corn, and peas. Simmer for an additional 10-15 minutes, until all vegetables are tender but not mushy.",
          "Remove the bay leaf and stir in fresh lemon juice and chopped parsley.",
          "Season with salt and pepper to taste.",
          "Serve hot, with a sprinkle of grated Parmesan cheese if desired.",
          "Can be stored in the refrigerator for 4-5 days or frozen for up to 3 months."
        ],
        "nutritionInfo": {
          "calories": 220,
          "protein": "6g",
          "carbs": "38g",
          "fats": "6g",
          "fiber": "8g",
          "sugar": "10g",
          "sodium": "580mg"
        }
      }
    ]
  },
  {
    "foodName": "Pasta Carbonara",
    "description": "Pasta Carbonara is a classic Roman dish featuring pasta tossed with a creamy sauce of eggs, hard cheese, cured pork, and black pepper. Despite its rich taste, it's remarkably simple, requiring just a handful of ingredients. While its origins are debated, many believe it emerged after World War II when American soldiers brought bacon and powdered eggs to Italy, though Italians maintain it predates this period.",
    "tags": [
      "Italian",
      "Pasta",
      "Bacon",
      "Quick",
      "Roman"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Authentic Pasta Carbonara",
        "description": "This traditional Roman pasta carbonara features the perfect balance of silky egg sauce, salty guanciale, sharp Pecorino Romano, and freshly cracked black pepper. With no cream in sight, this simple yet sophisticated pasta dish relies on proper technique to create a luxuriously smooth sauce that coats each strand of pasta.",
        "prepTime": "10 minutes",
        "cookTime": "15 minutes",
        "totalTime": "25 minutes",
        "servings": 4,
        "servingSize": "1.5 cups",
        "difficulty": "Intermediate",
        "tags": ["Italian", "Pasta", "Roman", "Eggs", "Pork"],
        "ingredients": [
          "1 lb (450g) spaghetti or bucatini",
          "5 oz (150g) guanciale or pancetta, diced (can substitute with bacon)",
          "4 large egg yolks, at room temperature",
          "2 large whole eggs, at room temperature",
          "1 cup (100g) Pecorino Romano cheese, freshly grated, plus more for serving",
          "Freshly ground black pepper (about 2 teaspoons)",
          "Salt for pasta water"
        ],
        "instructions": [
          "Bring a large pot of generously salted water to a boil for the pasta.",
          "In a large skillet, cook the diced guanciale over medium heat until the fat has rendered and the meat is crispy but not burnt, about 8-10 minutes. Remove from heat but keep the rendered fat and guanciale in the pan.",
          "In a medium bowl, whisk together the egg yolks, whole eggs, grated Pecorino Romano, and plenty of freshly ground black pepper until well combined.",
          "Cook the pasta according to package instructions until al dente. Before draining, reserve about 1 cup of the starchy pasta water.",
          "Drain the pasta and immediately add it to the skillet with the guanciale and rendered fat. Toss quickly to coat the pasta.",
          "Working quickly (off the heat), add a splash (about 1/4 cup) of the reserved pasta water to the skillet and toss.",
          "Pour the egg and cheese mixture over the hot pasta and toss vigorously to create a creamy sauce. The residual heat will cook the eggs without scrambling them.",
          "If the sauce is too thick, add a bit more of the reserved pasta water, a tablespoon at a time, until you reach the desired consistency. The sauce should be silky and coat the pasta without being too runny or too dry.",
          "Serve immediately in warmed bowls, topped with extra grated Pecorino Romano and freshly ground black pepper."
        ],
        "nutritionInfo": {
          "calories": 680,
          "protein": "30g",
          "carbs": "75g",
          "fats": "28g",
          "fiber": "3g",
          "sugar": "3g",
          "sodium": "750mg"
        }
      }
    ]
  },
  {
    "foodName": "Chicken Congee",
    "description": "Chicken Congee (rice porridge) is a comforting, easily digestible dish popular throughout Asia, especially in China where it dates back over 2,000 years. This nourishing meal features rice slowly simmered with chicken and aromatics until it breaks down into a soothing, porridge-like consistency. Often served for breakfast or to those feeling unwell, congee's gentle flavors and texture make it the quintessential Asian comfort food.",
    "tags": [
      "Chinese",
      "Rice",
      "Comfort Food",
      "Soup",
      "Chicken"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Soothing Chicken Congee",
        "description": "This gentle, comforting chicken congee combines tender rice cooked until soft and porridge-like with fragrant ginger, tender chicken, and savory seasonings. The dish is garnished with traditional toppings like green onions, crispy fried shallots, and fresh herbs for a nourishing meal that's especially perfect for cold days or when you're feeling under the weather.",
        "prepTime": "15 minutes",
        "cookTime": "1 hour 30 minutes",
        "totalTime": "1 hour 45 minutes",
        "servings": 4,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Chinese", "Porridge", "Comfort Food", "Rice", "Chicken"],
        "ingredients": [
          "1 cup jasmine rice, rinsed",
          "8 cups chicken broth (homemade preferred)",
          "1 lb boneless, skinless chicken thighs",
          "2-inch piece fresh ginger, peeled and sliced",
          "3 cloves garlic, smashed",
          "2 green onions, white parts only (reserve greens for garnish)",
          "1 tablespoon vegetable oil",
          "2 tablespoons soy sauce",
          "1 teaspoon salt, or to taste",
          "1/2 teaspoon white pepper",
          "Garnishes:",
          "Green onion tops, thinly sliced",
          "Cilantro leaves",
          "Fried shallots",
          "Century egg, diced (optional)",
          "Thinly sliced fresh ginger",
          "Sesame oil",
          "Soy sauce"
        ],
        "instructions": [
          "In a large pot, heat vegetable oil over medium heat. Add the sliced ginger, smashed garlic, and white parts of green onions. Sauté for 2-3 minutes until fragrant.",
          "Add the rinsed rice and stir for about 1 minute to coat with oil.",
          "Pour in the chicken broth and bring to a boil. Reduce heat to a gentle simmer.",
          "Add the chicken thighs, soy sauce, salt, and white pepper.",
          "Simmer, partially covered, for about 1 hour, stirring occasionally to prevent sticking. The rice will break down and the mixture will become porridge-like. Add more broth or water if it becomes too thick.",
          "Remove the chicken thighs and shred the meat. Return the shredded chicken to the pot.",
          "Continue to simmer for another 15-20 minutes until the congee reaches your desired consistency. Traditional congee is quite smooth and soupy.",
          "Taste and adjust seasoning with more salt, white pepper, or soy sauce as needed.",
          "Serve hot in bowls with your choice of garnishes. Traditionally, each person adds their preferred toppings at the table."
        ],
        "nutritionInfo": {
          "calories": 380,
          "protein": "28g",
          "carbs": "40g",
          "fats": "12g",
          "fiber": "1g",
          "sugar": "2g",
          "sodium": "1120mg"
        }
      }
    ]
  },
  {
    "foodName": "Beef Lo Mein",
    "description": "Beef Lo Mein is a popular Chinese noodle dish featuring tender slices of beef and vegetables stir-fried with soft egg noodles in a savory sauce. This Cantonese classic, whose name translates to 'stirred noodles,' has become a staple in Chinese restaurants worldwide. Unlike chow mein which has crispy noodles, lo mein features soft, chewy noodles that absorb the rich flavors of the sauce.",
    "tags": [
      "Chinese",
      "Noodles",
      "Beef",
      "Stir-fry",
      "Quick"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Classic Beef Lo Mein",
        "description": "This restaurant-style beef lo mein features tender marinated beef strips stir-fried with colorful vegetables and chewy egg noodles in a savory sauce. Quick to prepare and full of authentic flavor, this satisfying dish delivers the perfect balance of protein, vegetables, and noodles in every bite.",
        "prepTime": "20 minutes",
        "cookTime": "10 minutes",
        "totalTime": "30 minutes",
        "servings": 4,
        "servingSize": "1.5 cups",
        "difficulty": "Easy",
        "tags": ["Chinese", "Noodles", "Beef", "Stir-fry", "Dinner"],
        "ingredients": [
          "8 oz (225g) flank steak or sirloin, thinly sliced against the grain",
          "8 oz (225g) lo mein egg noodles",
          "2 tablespoons vegetable oil",
          "2 cloves garlic, minced",
          "1-inch piece ginger, minced",
          "1 medium onion, thinly sliced",
          "1 red bell pepper, julienned",
          "2 cups bok choy or napa cabbage, chopped",
          "1 large carrot, julienned",
          "4 green onions, cut into 2-inch pieces",
          "For the beef marinade:",
          "1 tablespoon soy sauce",
          "1 teaspoon cornstarch",
          "1 teaspoon Shaoxing wine (or dry sherry)",
          "For the sauce:",
          "3 tablespoons oyster sauce",
          "2 tablespoons dark soy sauce",
          "1 tablespoon light soy sauce",
          "1 tablespoon sesame oil",
          "1 teaspoon sugar",
          "1/2 teaspoon ground white pepper"
        ],
        "instructions": [
          "In a bowl, combine the sliced beef with the marinade ingredients (soy sauce, cornstarch, and Shaoxing wine). Mix well and let marinate for at least 15 minutes.",
          "Cook the lo mein noodles according to package instructions until al dente. Drain, rinse under cold water to stop cooking, and toss with a drizzle of oil to prevent sticking. Set aside.",
          "In a small bowl, mix all the sauce ingredients together and set aside.",
          "Heat 1 tablespoon of oil in a large wok or skillet over high heat until smoking. Add the marinated beef and spread it out in a single layer. Let it sear for 30 seconds without stirring, then stir-fry for another 1-2 minutes until just cooked through. Remove from the wok and set aside.",
          "In the same wok, add the remaining 1 tablespoon of oil. Add garlic and ginger and stir-fry for 30 seconds until fragrant.",
          "Add onions and stir-fry for 1 minute, then add bell peppers and carrots. Stir-fry for 2 minutes.",
          "Add bok choy and green onions, stir-fry for another minute until vegetables are crisp-tender.",
          "Return the cooked beef to the wok, then add the cooked noodles and prepared sauce.",
          "Using tongs or chopsticks, toss everything together until the noodles are evenly coated with sauce and everything is well combined, about 2 minutes.",
          "Serve immediately, garnished with additional green onions if desired."
        ],
        "nutritionInfo": {
          "calories": 420,
          "protein": "24g",
          "carbs": "48g",
          "fats": "15g",
          "fiber": "4g",
          "sugar": "6g",
          "sodium": "950mg"
        }
      }
    ]
  },
  {
    "foodName": "Peach Crisp",
    "description": "Peach Crisp is a beloved American dessert featuring sweet, juicy peaches topped with a crumbly mixture of butter, flour, sugar, and oats, then baked until golden and bubbling. This rustic, homestyle dessert originated as a simpler alternative to pie-making. Popular throughout the summer when peaches are in season, it's often served warm with a scoop of vanilla ice cream for the perfect balance of flavors and textures.",
    "tags": [
      "American",
      "Dessert",
      "Fruit",
      "Baking",
      "Summer"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Homestyle Peach Crisp",
        "description": "This classic peach crisp features juicy, fresh peaches with hints of vanilla and cinnamon, topped with a golden, buttery oat crumble. The contrast between the warm, tender fruit and the crisp, sweet topping creates a comforting dessert that's even better with a scoop of vanilla ice cream melting on top.",
        "prepTime": "20 minutes",
        "cookTime": "40 minutes",
        "totalTime": "1 hour",
        "servings": 8,
        "servingSize": "1 cup",
        "difficulty": "Easy",
        "tags": ["American", "Dessert", "Fruit", "Baking", "Summer"],
        "ingredients": [
          "For the peach filling:",
          "8 ripe peaches (about 3 pounds), peeled, pitted, and sliced",
          "1/3 cup granulated sugar",
          "2 tablespoons cornstarch",
          "1 tablespoon lemon juice",
          "1 teaspoon vanilla extract",
          "1/2 teaspoon ground cinnamon",
          "1/4 teaspoon salt",
          "For the crisp topping:",
          "1 cup old-fashioned rolled oats",
          "3/4 cup all-purpose flour",
          "2/3 cup packed brown sugar",
          "1/2 cup cold unsalted butter, cubed",
          "1/2 teaspoon ground cinnamon",
          "1/4 teaspoon salt",
          "1/2 cup chopped pecans or walnuts (optional)",
          "Vanilla ice cream, for serving (optional)"
        ],
        "instructions": [
          "Preheat the oven to 375°F (190°C) and grease a 9×9-inch baking dish.",
          "In a large bowl, combine the sliced peaches, granulated sugar, cornstarch, lemon juice, vanilla extract, cinnamon, and salt. Toss gently until the peaches are evenly coated.",
          "Pour the peach mixture into the prepared baking dish and spread into an even layer.",
          "In another bowl, combine the oats, flour, brown sugar, cinnamon, and salt.",
          "Add the cold cubed butter and use a pastry cutter or your fingers to work the butter into the dry ingredients until the mixture resembles coarse crumbs with some pea-sized pieces of butter remaining.",
          "Stir in the chopped nuts if using.",
          "Sprinkle the crisp topping evenly over the peach filling.",
          "Bake for 35-40 minutes, until the filling is bubbling around the edges and the topping is golden brown.",
          "Remove from the oven and let cool for at least 15 minutes before serving (the filling will thicken as it cools).",
          "Serve warm with a scoop of vanilla ice cream, if desired."
        ],
        "nutritionInfo": {
          "calories": 360,
          "protein": "4g",
          "carbs": "56g",
          "fats": "15g",
          "fiber": "4g",
          "sugar": "38g",
          "sodium": "120mg"
        }
      }
    ]
  },
  {
    "foodName": "Chocolate Souffle",
    "description": "Chocolate Souffle is an elegant French dessert known for its impressive rise and delicate texture, featuring a light, airy baked confection with a rich chocolate flavor. Created in the early 18th century by French chef Antoine Beauvilliers, this sophisticated dessert remains a symbol of fine dining and culinary skill. The name 'souffle' comes from the French word 'souffler,' meaning 'to blow up' or 'puff up,' referring to its dramatic rise in the oven.",
    "tags": [
      "French",
      "Dessert",
      "Chocolate",
      "Elegant",
      "Baking"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Classic French Chocolate Souffle",
        "description": "This elegant chocolate souffle features a light, airy texture with a decadently rich chocolate flavor and a slightly molten center. Despite its reputation for being difficult to make, this recipe breaks down the steps to help you create a restaurant-quality dessert that will impress any guest with its dramatic rise and indulgent taste.",
        "prepTime": "25 minutes",
        "cookTime": "14 minutes",
        "totalTime": "39 minutes",
        "servings": 6,
        "servingSize": "1 individual souffle",
        "difficulty": "Advanced",
        "tags": ["French", "Dessert", "Chocolate", "Elegant", "Baking"],
        "ingredients": [
          "Butter, softened, for coating ramekins",
          "1/4 cup granulated sugar, plus extra for dusting ramekins",
          "8 oz (225g) dark chocolate (70% cocoa), chopped",
          "1 tablespoon vanilla extract",
          "1/4 teaspoon salt",
          "4 large egg yolks, at room temperature",
          "6 large egg whites, at room temperature",
          "1/4 teaspoon cream of tartar",
          "2 tablespoons unsalted butter",
          "Confectioners' sugar for dusting",
          "Vanilla ice cream or crème anglaise for serving (optional)"
        ],
        "instructions": [
          "Preheat oven to 375°F (190°C) with a rack in the lower third of the oven.",
          "Generously butter six 6-oz ramekins. Coat each with granulated sugar, tapping out excess.",
          "Place the prepared ramekins on a baking sheet and refrigerate until needed.",
          "In a heatproof bowl set over a pan of simmering water (don't let the bowl touch the water), melt the chocolate and butter together, stirring occasionally until smooth.",
          "Remove from heat and stir in vanilla extract and salt. Let cool for 5 minutes.",
          "Whisk the egg yolks into the chocolate mixture one at a time, fully incorporating each before adding the next. Set aside.",
          "In a clean, dry bowl of a stand mixer fitted with the whisk attachment, beat egg whites on medium speed until foamy.",
          "Add cream of tartar and continue beating, gradually increasing speed to high.",
          "Gradually add the 1/4 cup sugar, a tablespoon at a time, while beating. Continue until stiff, glossy peaks form, about 3-4 minutes.",
          "Fold about 1/4 of the egg whites into the chocolate mixture to lighten it, using a large rubber spatula.",
          "Gently fold in the remaining egg whites in two additions, being careful not to deflate the mixture. A few white streaks are okay.",
          "Divide the batter among the prepared ramekins, filling them about 3/4 full. Run your thumb around the edge of each ramekin to create a small channel (this helps the souffles rise straight up).",
          "Bake immediately for 12-14 minutes, until souffles have risen about 1-2 inches above the rims and are set on the edges but still slightly jiggly in the center.",
          "Dust with confectioners' sugar and serve immediately with vanilla ice cream or crème anglaise if desired."
        ],
        "nutritionInfo": {
          "calories": 320,
          "protein": "8g",
          "carbs": "28g",
          "fats": "20g",
          "fiber": "3g",
          "sugar": "22g",
          "sodium": "180mg"
        }
      }
    ]
  },
  {
    "foodName": "Spanakopita",
    "description": "Spanakopita is a traditional Greek savory pastry featuring layers of crispy phyllo dough filled with a mixture of spinach, feta cheese, onions, and herbs. This iconic dish, whose name means 'spinach pie' in Greek, has been a staple of Greek cuisine for centuries. It can be made as individual triangular pastries or as a large pie cut into portions, and is commonly enjoyed as an appetizer, snack, or light meal throughout Greece and beyond.",
    "tags": [
      "Greek",
      "Pastry",
      "Vegetarian",
      "Spinach",
      "Mediterranean"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Traditional Greek Spanakopita",
        "description": "This authentic Greek spinach and feta pie features layers of flaky, buttery phyllo dough surrounding a filling of fresh spinach, tangy feta, herbs, and aromatics. The contrast between the crispy golden exterior and the savory, herb-packed filling makes this a crowd-pleasing dish that's perfect for entertaining or as part of a Mediterranean feast.",
        "prepTime": "45 minutes",
        "cookTime": "45 minutes",
        "totalTime": "1 hour 30 minutes",
        "servings": 12,
        "servingSize": "1 piece (approx. 3x3 inches)",
        "difficulty": "Intermediate",
        "tags": ["Greek", "Pastry", "Vegetarian", "Spinach", "Mediterranean"],
        "ingredients": [
          "2 lbs (900g) fresh spinach, washed and stemmed (or 2 10-oz packages frozen spinach, thawed and drained)",
          "1/4 cup olive oil, plus more for brushing",
          "1 large onion, finely chopped",
          "4 green onions, chopped",
          "3 cloves garlic, minced",
          "1/4 cup fresh dill, chopped",
          "1/4 cup fresh parsley, chopped",
          "2 tablespoons fresh mint, chopped (or 2 teaspoons dried)",
          "1 lb (450g) feta cheese, crumbled",
          "4 large eggs, lightly beaten",
          "1/2 teaspoon freshly grated nutmeg",
          "1/2 teaspoon black pepper",
          "1 lb (450g) phyllo dough (about 18 sheets), thawed if frozen",
          "1/2 cup (115g) unsalted butter, melted",
          "2 tablespoons sesame seeds (optional)"
        ],
        "instructions": [
          "If using fresh spinach, blanch it in boiling water for 30 seconds, then immediately plunge into ice water. Drain well and squeeze out excess moisture. Chop roughly.",
          "If using frozen spinach, make sure it's completely thawed and squeeze out as much moisture as possible using a kitchen towel or cheesecloth.",
          "Heat 1/4 cup olive oil in a large skillet over medium heat. Add onion and sauté until soft, about 5 minutes.",
          "Add green onions and garlic, cook for another 2 minutes until fragrant.",
          "Turn off heat and stir in the drained spinach, dill, parsley, and mint. Allow mixture to cool for about 10 minutes.",
          "In a large bowl, combine the cooled spinach mixture with crumbled feta, beaten eggs, nutmeg, and black pepper. Mix well.",
          "Preheat oven to 350°F (175°C). Brush a 9×13-inch baking dish with olive oil or melted butter.",
          "Unroll the phyllo dough and cover with a damp kitchen towel to prevent it from drying out. Work quickly when using the phyllo.",
          "Place one sheet of phyllo in the baking dish, letting it overhang the edges. Brush lightly with melted butter. Repeat with 8 more sheets, brushing each with butter.",
          "Spread the spinach and feta filling evenly over the phyllo layers.",
          "Top with the remaining phyllo sheets, brushing each with butter as before. Fold any overhanging dough over the top and brush with butter.",
          "Using a sharp knife, score the top layers of phyllo into 12 squares (cutting just through the top layers, not all the way to the filling).",
          "Sprinkle with sesame seeds if using.",
          "Bake for 45-50 minutes, until the phyllo is golden brown and crisp.",
          "Let cool for 10-15 minutes before cutting along the scored lines and serving."
        ],
        "nutritionInfo": {
          "calories": 310,
          "protein": "12g",
          "carbs": "24g",
          "fats": "20g",
          "fiber": "3g",
          "sugar": "2g",
          "sodium": "520mg"
        }
      }
    ]
  },
  {
    "foodName": "Lamb Biryani",
    "description": "Lamb Biryani is a majestic rice dish from the Indian subcontinent, featuring tender pieces of lamb layered with fragrant, spiced basmati rice, then slow-cooked to perfection. With origins in Persian cuisine and developed during the Mughal Empire, biryani has become a celebratory dish across South Asia. The complex blend of spices, the aromatic rice, and the melt-in-your-mouth meat make it a centerpiece for special occasions and festive gatherings.",
    "tags": [
      "Indian",
      "Rice",
      "Lamb",
      "Spicy",
      "Festive"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Royal Lamb Biryani",
        "description": "This magnificent lamb biryani features tender, spice-marinated lamb pieces layered with fragrant basmati rice, then slow-cooked with saffron, rose water, and warm spices. The result is a complex, aromatic dish where each grain of rice is separate and infused with flavor, while the lamb becomes meltingly tender. This special-occasion dish is perfect for celebrations and gatherings.",
        "prepTime": "45 minutes",
        "cookTime": "1 hour 30 minutes",
        "totalTime": "2 hours 15 minutes (plus 2 hours marinating)",
        "servings": 8,
        "servingSize": "1.5 cups",
        "difficulty": "Advanced",
        "tags": ["Indian", "Rice", "Lamb", "Spicy", "Festive"],
        "ingredients": [
          "For the lamb marinade:",
          "2 lbs (900g) lamb shoulder, trimmed and cut into 1.5-inch cubes",
          "1 cup plain yogurt",
          "4 cloves garlic, minced",
          "2-inch piece ginger, grated",
          "1 tablespoon garam masala",
          "1 teaspoon ground turmeric",
          "1 teaspoon red chili powder (adjust to taste)",
          "1 teaspoon ground coriander",
          "1 teaspoon ground cumin",
          "Juice of 1 lemon",
          "1 teaspoon salt",
          "For the rice:",
          "3 cups basmati rice, soaked for 30 minutes and drained",
          "6 cups water",
          "3 bay leaves",
          "5 green cardamom pods, lightly crushed",
          "1-inch cinnamon stick",
          "4 cloves",
          "1 teaspoon salt",
          "For the biryani:",
          "4 tablespoons ghee or clarified butter",
          "2 large onions, thinly sliced",
          "2 green chilies, slit lengthwise",
          "1/4 cup chopped fresh cilantro",
          "1/4 cup chopped fresh mint",
          "1/2 teaspoon saffron threads, soaked in 1/4 cup warm milk",
          "2 tablespoons rose water (optional)",
          "1/4 cup fried onions (store-bought or homemade)",
          "1/4 cup cashews, lightly toasted",
          "1/4 cup raisins"
        ],
        "instructions": [
          "In a large bowl, combine all the lamb marinade ingredients and mix well to coat the meat evenly. Cover and refrigerate for at least 2 hours, preferably overnight.",
          "When ready to cook, preheat oven to 350°F (175°C).",
          "Heat 2 tablespoons of ghee in a large heavy-bottomed pot or Dutch oven over medium heat. Add the sliced onions and cook until golden brown, about 15 minutes. Remove half the onions and set aside.",
          "Add the marinated lamb to the pot with the remaining onions. Cook for 5 minutes, stirring occasionally.",
          "Reduce heat to low, cover, and simmer for 45 minutes, or until the lamb is tender and the sauce has thickened. Stir occasionally to prevent sticking.",
          "Meanwhile, in a large pot, bring 6 cups of water to a boil with bay leaves, cardamom, cinnamon, cloves, and salt.",
          "Add the soaked and drained rice. Cook until the rice is 70% done (still slightly firm in the center), about 5-6 minutes. Drain well.",
          "In a large, heavy-bottomed casserole or Dutch oven with a tight-fitting lid, layer half the par-cooked rice.",
          "Top with the cooked lamb mixture, green chilies, half the fresh herbs, and half the reserved browned onions.",
          "Add the remaining rice, creating a mound. Drizzle with the saffron milk, rose water (if using), and the remaining 2 tablespoons of ghee.",
          "Sprinkle with the remaining fresh herbs, reserved browned onions, fried onions, cashews, and raisins.",
          "Cover the pot with aluminum foil, then place the lid on top to create a tight seal.",
          "Bake in the preheated oven for 30-35 minutes, or until the rice is fully cooked and fragrant.",
          "Let stand, covered, for 10 minutes before opening. Gently mix the layers before serving."
        ],
        "nutritionInfo": {
          "calories": 560,
          "protein": "32g",
          "carbs": "58g",
          "fats": "22g",
          "fiber": "3g",
          "sugar": "8g",
          "sodium": "570mg"
        }
      }
    ]
  },
  {
    "foodName": "Tuna Nicoise",
    "description": "Salade Niçoise is an elegant French composed salad originating from the city of Nice on the French Riviera. This Mediterranean dish traditionally features tuna, hard-boiled eggs, tomatoes, olives, and anchovies arranged on a bed of crisp lettuce, dressed with olive oil. While variations exist, the classic combination of fresh, vibrant ingredients makes it a refreshing summer meal that embodies the sunny, coastal flavors of southern France.",
    "tags": [
      "French",
      "Salad",
      "Seafood",
      "Mediterranean",
      "Healthy"
    ],
    "youtubeVideos": genericYoutubeVideos,
    "recipes": [
      {
        "title": "Classic Salade Niçoise with Seared Tuna",
        "description": "This elegant French composed salad features seared fresh tuna steak, crisp vegetables, briny olives, tender potatoes, and green beans, all dressed in a classic Dijon vinaigrette. The careful arrangement of ingredients showcases Mediterranean flavors in a beautiful presentation that's perfect for a sophisticated lunch or light dinner.",
        "prepTime": "30 minutes",
        "cookTime": "20 minutes",
        "totalTime": "50 minutes",
        "servings": 4,
        "servingSize": "1 salad plate",
        "difficulty": "Intermediate",
        "tags": ["French", "Salad", "Tuna", "Mediterranean", "Healthy"],
        "ingredients": [
          "For the salad:",
          "1 lb (450g) fresh tuna steak, about 1-inch thick",
          "1 tablespoon olive oil",
          "Salt and freshly ground black pepper",
          "8 cups mixed salad greens or butter lettuce",
          "1/2 lb (225g) small new potatoes, boiled until tender",
          "1/4 lb (115g) green beans, blanched and shocked in ice water",
          "4 eggs, hard-boiled and halved",
          "1 cup cherry tomatoes, halved",
          "1/2 cup Niçoise olives (or Kalamata olives)",
          "2 tablespoons capers, rinsed and drained",
          "4 anchovy fillets, rinsed and patted dry (optional)",
          "1/4 cup fresh basil leaves, torn",
          "For the vinaigrette:",
          "1/4 cup extra virgin olive oil",
          "2 tablespoons red wine vinegar",
          "1 tablespoon Dijon mustard",
          "1 small shallot, finely minced",
          "1 clove garlic, minced",
          "1 teaspoon fresh thyme leaves",
          "1/2 teaspoon salt",
          "1/4 teaspoon freshly ground black pepper"
        ],
        "instructions": [
          "Start by making the vinaigrette: In a small bowl, whisk together all vinaigrette ingredients until emulsified. Set aside.",
          "Season the tuna steak on both sides with salt and pepper.",
          "Heat 1 tablespoon olive oil in a skillet over high heat until almost smoking. Sear the tuna for about 1-2 minutes per side for rare (or longer if preferred). Remove from heat and let rest for 5 minutes before slicing thinly against the grain.",
          "Arrange the salad greens on a large serving platter or divide among individual plates.",
          "Cut the cooked potatoes in half if larger than bite-size.",
          "Artfully arrange the sliced tuna, potatoes, green beans, eggs, cherry tomatoes, olives, and capers over the salad greens.",
          "If using, lay anchovy fillets across the top of the salad.",
          "Drizzle the vinaigrette over the entire salad or serve on the side.",
          "Scatter torn basil leaves over the top and finish with a bit of extra freshly ground black pepper.",
          "Serve immediately with crusty French bread on the side if desired."
        ],
        "nutritionInfo": {
          "calories": 410,
          "protein": "30g",
          "carbs": "20g",
          "fats": "24g",
          "fiber": "5g",
          "sugar": "4g",
          "sodium": "580mg"
        }
      }
    ]
  }
]