// Meal Plan Recipe Library
// This file contains a comprehensive library of meal options that can be used
// to generate personalized meal plans based on user preferences

export interface MealOption {
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image: string;
  calories: number;
  prepTime: number; // in minutes
  recipe: string;
  ingredients: string[];
  nutrients: {
    protein: string;
    carbs: string;
    fats: string;
  };
  cuisines: string[];
  dietTypes: ('vegetarian' | 'non-vegetarian' | 'vegan')[];
  spiciness: 'spicy' | 'mild';
  healthGoal: 'fit' | 'indulgent';
  restrictions: string[];
}

// Breakfast options
const breakfastOptions: MealOption[] = [
  {
    name: 'Greek Yogurt with Berries and Granola',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 320,
    prepTime: 5,
    recipe: "1. Layer yogurt in a bowl.\n2. Top with fresh berries and granola.\n3. Drizzle with honey if desired.",
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'],
    nutrients: {
      protein: '15g',
      carbs: '40g',
      fats: '8g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: [],
  },
  {
    name: 'Avocado Toast with Poached Eggs',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 400,
    prepTime: 15,
    recipe: "1. Toast whole grain bread.\n2. Mash avocado and spread on toast.\n3. Top with poached eggs and season with salt, pepper, and red pepper flakes.",
    ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Salt', 'Pepper', 'Red pepper flakes'],
    nutrients: {
      protein: '18g',
      carbs: '30g',
      fats: '22g',
    },
    cuisines: ['American', 'Mediterranean'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy'],
  },
  {
    name: 'Masala Omelette with Whole Wheat Toast',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 380,
    prepTime: 12,
    recipe: "1. Whisk eggs with chopped onions, tomatoes, green chilies, and spices.\n2. Cook in a non-stick pan until set.\n3. Serve with whole wheat toast.",
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Green chilies', 'Turmeric', 'Coriander', 'Whole wheat bread'],
    nutrients: {
      protein: '20g',
      carbs: '25g',
      fats: '18g',
    },
    cuisines: ['Indian'],
    dietTypes: ['vegetarian', 'non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: ['No Dairy'],
  },
  {
    name: 'Overnight Chia Pudding with Mango',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 300,
    prepTime: 5,
    recipe: "1. Mix chia seeds with almond milk and a touch of maple syrup.\n2. Refrigerate overnight.\n3. Top with fresh mango chunks and coconut flakes.",
    ingredients: ['Chia seeds', 'Almond milk', 'Maple syrup', 'Mango', 'Coconut flakes'],
    nutrients: {
      protein: '10g',
      carbs: '35g',
      fats: '15g',
    },
    cuisines: ['American', 'Mediterranean'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Japanese-Style Breakfast Bowl',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 430,
    prepTime: 25,
    recipe: "1. Cook short-grain rice.\n2. Prepare miso soup with tofu and seaweed.\n3. Serve with a small grilled salmon fillet, pickled vegetables, and a soft-boiled egg.",
    ingredients: ['Short-grain rice', 'Miso paste', 'Tofu', 'Seaweed', 'Salmon', 'Eggs', 'Pickled vegetables'],
    nutrients: {
      protein: '25g',
      carbs: '50g',
      fats: '12g',
    },
    cuisines: ['Japanese'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: [],
  },
  {
    name: 'Breakfast Burrito',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 520,
    prepTime: 20,
    recipe: "1. Scramble eggs with black beans, onions, and bell peppers.\n2. Warm a tortilla and fill with the scramble.\n3. Top with avocado, salsa, and a sprinkle of cheese.",
    ingredients: ['Eggs', 'Black beans', 'Onion', 'Bell pepper', 'Tortilla', 'Avocado', 'Salsa', 'Cheese'],
    nutrients: {
      protein: '22g',
      carbs: '45g',
      fats: '28g',
    },
    cuisines: ['Mexican'],
    dietTypes: ['vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Vegan Blueberry Pancakes',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 420,
    prepTime: 20,
    recipe: "1. Mix flour, plant milk, baking powder, and a ripe banana.\n2. Fold in blueberries.\n3. Cook on a non-stick pan and serve with maple syrup.",
    ingredients: ['Flour', 'Plant milk', 'Baking powder', 'Banana', 'Blueberries', 'Maple syrup'],
    nutrients: {
      protein: '8g',
      carbs: '70g',
      fats: '12g',
    },
    cuisines: ['American'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: ['No Dairy', 'No Nuts'],
  },
  {
    name: 'Protein-Packed Smoothie Bowl',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 350,
    prepTime: 10,
    recipe: "1. Blend frozen banana, berries, protein powder, and almond milk.\n2. Pour into a bowl.\n3. Top with granola, sliced banana, and chia seeds.",
    ingredients: ['Banana', 'Mixed berries', 'Protein powder', 'Almond milk', 'Granola', 'Chia seeds'],
    nutrients: {
      protein: '25g',
      carbs: '45g',
      fats: '8g',
    },
    cuisines: ['American'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Italian Frittata with Vegetables',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 380,
    prepTime: 25,
    recipe: "1. Sauté zucchini, bell peppers, and onions.\n2. Pour beaten eggs over the vegetables in the pan.\n3. Top with a sprinkle of Parmesan and finish in the oven.",
    ingredients: ['Eggs', 'Zucchini', 'Bell peppers', 'Onion', 'Parmesan cheese', 'Herbs'],
    nutrients: {
      protein: '22g',
      carbs: '15g',
      fats: '24g',
    },
    cuisines: ['Italian'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Gluten'],
  },
  {
    name: 'Chocolate Chip Waffles with Whipped Cream',
    type: 'breakfast',
    image: 'https://placehold.co/120x80',
    calories: 580,
    prepTime: 20,
    recipe: "1. Prepare waffle batter with flour, eggs, milk, and fold in chocolate chips.\n2. Cook in a waffle iron until golden.\n3. Top with whipped cream and maple syrup.",
    ingredients: ['Flour', 'Eggs', 'Milk', 'Chocolate chips', 'Butter', 'Whipped cream', 'Maple syrup'],
    nutrients: {
      protein: '12g',
      carbs: '70g',
      fats: '28g',
    },
    cuisines: ['American'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: [],
  },
];

// Lunch options
const lunchOptions: MealOption[] = [
  {
    name: 'Mediterranean Chickpea Salad',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 420,
    prepTime: 15,
    recipe: "1. Combine chickpeas, cucumber, tomatoes, and feta.\n2. Dress with olive oil and lemon juice.\n3. Season with herbs and serve.",
    ingredients: ['Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Red onion', 'Olive oil', 'Lemon juice', 'Fresh herbs'],
    nutrients: {
      protein: '15g',
      carbs: '45g',
      fats: '20g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Gluten'],
  },
  {
    name: 'Spicy Tuna Poke Bowl',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 450,
    prepTime: 20,
    recipe: "1. Dice sushi-grade tuna and marinate in soy sauce and sesame oil.\n2. Serve over rice with avocado, cucumber, and edamame.\n3. Drizzle with spicy mayo and sprinkle with sesame seeds.",
    ingredients: ['Tuna', 'Rice', 'Avocado', 'Cucumber', 'Edamame', 'Soy sauce', 'Sesame oil', 'Spicy mayo'],
    nutrients: {
      protein: '30g',
      carbs: '40g',
      fats: '18g',
    },
    cuisines: ['Japanese'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: [],
  },
  {
    name: 'Grilled Vegetable Panini',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 480,
    prepTime: 25,
    recipe: "1. Grill zucchini, eggplant, and bell peppers.\n2. Layer on ciabatta bread with pesto and mozzarella.\n3. Press in a panini maker until cheese melts.",
    ingredients: ['Zucchini', 'Eggplant', 'Bell peppers', 'Ciabatta bread', 'Pesto', 'Mozzarella'],
    nutrients: {
      protein: '18g',
      carbs: '50g',
      fats: '22g',
    },
    cuisines: ['Italian'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Chicken Tikka Wrap',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 520,
    prepTime: 30,
    recipe: "1. Marinate chicken in yogurt and spices, then grill.\n2. Warm a whole wheat wrap.\n3. Fill with chicken, cucumbers, tomatoes, and mint yogurt sauce.",
    ingredients: ['Chicken breast', 'Yogurt', 'Spices', 'Whole wheat wrap', 'Cucumber', 'Tomato', 'Mint'],
    nutrients: {
      protein: '35g',
      carbs: '45g',
      fats: '18g',
    },
    cuisines: ['Indian'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: [],
  },
  {
    name: 'Vegetable Enchiladas',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 550,
    prepTime: 35,
    recipe: "1. Sauté bell peppers, onions, corn, and black beans.\n2. Wrap in tortillas and place in a baking dish.\n3. Top with enchilada sauce and cheese, then bake until bubbly.",
    ingredients: ['Bell peppers', 'Onions', 'Corn', 'Black beans', 'Tortillas', 'Enchilada sauce', 'Cheese'],
    nutrients: {
      protein: '18g',
      carbs: '65g',
      fats: '22g',
    },
    cuisines: ['Mexican'],
    dietTypes: ['vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Quinoa Buddha Bowl',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 420,
    prepTime: 25,
    recipe: "1. Cook quinoa and set aside to cool slightly.\n2. Arrange in a bowl with roasted sweet potatoes, chickpeas, and avocado.\n3. Drizzle with tahini dressing and top with pumpkin seeds.",
    ingredients: ['Quinoa', 'Sweet potatoes', 'Chickpeas', 'Avocado', 'Tahini', 'Lemon juice', 'Pumpkin seeds'],
    nutrients: {
      protein: '15g',
      carbs: '50g',
      fats: '20g',
    },
    cuisines: ['Mediterranean', 'American'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Teriyaki Salmon Rice Bowl',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 520,
    prepTime: 25,
    recipe: "1. Marinate salmon in teriyaki sauce, then bake.\n2. Serve over steamed rice with stir-fried vegetables.\n3. Garnish with green onions and sesame seeds.",
    ingredients: ['Salmon', 'Teriyaki sauce', 'Rice', 'Broccoli', 'Carrots', 'Bell peppers', 'Green onions', 'Sesame seeds'],
    nutrients: {
      protein: '30g',
      carbs: '55g',
      fats: '18g',
    },
    cuisines: ['Japanese'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy'],
  },
  {
    name: 'Caprese Sandwich',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 480,
    prepTime: 10,
    recipe: "1. Slice fresh mozzarella and tomatoes.\n2. Layer on ciabatta bread with basil leaves.\n3. Drizzle with balsamic glaze and olive oil.",
    ingredients: ['Ciabatta bread', 'Fresh mozzarella', 'Tomatoes', 'Basil', 'Balsamic glaze', 'Olive oil'],
    nutrients: {
      protein: '20g',
      carbs: '45g',
      fats: '25g',
    },
    cuisines: ['Italian'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Chana Masala with Brown Rice',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 450,
    prepTime: 30,
    recipe: "1. Sauté onions, garlic, and spices.\n2. Add chickpeas and tomatoes, simmer until flavors meld.\n3. Serve over brown rice with fresh cilantro.",
    ingredients: ['Chickpeas', 'Onions', 'Garlic', 'Ginger', 'Tomatoes', 'Spices', 'Brown rice', 'Cilantro'],
    nutrients: {
      protein: '15g',
      carbs: '65g',
      fats: '12g',
    },
    cuisines: ['Indian'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Loaded Taco Salad',
    type: 'lunch',
    image: 'https://placehold.co/120x80',
    calories: 550,
    prepTime: 20,
    recipe: "1. Brown ground beef or turkey with taco seasoning.\n2. Serve over crisp lettuce with tomatoes, cheese, and avocado.\n3. Top with crushed tortilla chips and salsa.",
    ingredients: ['Ground beef/turkey', 'Taco seasoning', 'Lettuce', 'Tomatoes', 'Cheese', 'Avocado', 'Tortilla chips', 'Salsa'],
    nutrients: {
      protein: '30g',
      carbs: '35g',
      fats: '30g',
    },
    cuisines: ['Mexican'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
];

// Dinner options
const dinnerOptions: MealOption[] = [
  {
    name: 'Herb-Crusted Salmon with Roasted Vegetables',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 550,
    prepTime: 30,
    recipe: "1. Season salmon with herbs and spices.\n2. Roast in oven at 180°C for 15 minutes.\n3. Serve with seasonal roasted vegetables.",
    ingredients: ['Salmon fillet', 'Fresh herbs', 'Lemon', 'Garlic', 'Olive oil', 'Broccoli', 'Carrots', 'Sweet potatoes'],
    nutrients: {
      protein: '35g',
      carbs: '30g',
      fats: '25g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Butter Chicken with Naan',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 720,
    prepTime: 45,
    recipe: "1. Marinate chicken in yogurt and spices.\n2. Cook in a tomato-based sauce with butter and cream.\n3. Serve with warm naan bread.",
    ingredients: ['Chicken thighs', 'Yogurt', 'Tomatoes', 'Butter', 'Cream', 'Garam masala', 'Ginger', 'Garlic', 'Naan bread'],
    nutrients: {
      protein: '40g',
      carbs: '55g',
      fats: '38g',
    },
    cuisines: ['Indian'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Spaghetti Aglio e Olio',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 480,
    prepTime: 20,
    recipe: "1. Cook spaghetti until al dente.\n2. Sauté garlic and red pepper flakes in olive oil.\n3. Toss pasta in the garlic oil and garnish with parsley and Parmesan.",
    ingredients: ['Spaghetti', 'Garlic', 'Red pepper flakes', 'Olive oil', 'Parsley', 'Parmesan cheese'],
    nutrients: {
      protein: '15g',
      carbs: '70g',
      fats: '18g',
    },
    cuisines: ['Italian'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Vegetable Curry with Brown Rice',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 520,
    prepTime: 35,
    recipe: "1. Sauté onions, garlic, and curry spices.\n2. Add mixed vegetables and coconut milk, simmer until tender.\n3. Serve over brown rice.",
    ingredients: ['Onions', 'Garlic', 'Curry powder', 'Mixed vegetables', 'Coconut milk', 'Brown rice'],
    nutrients: {
      protein: '12g',
      carbs: '65g',
      fats: '20g',
    },
    cuisines: ['Indian'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Beef Tacos with Fresh Salsa',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 580,
    prepTime: 30,
    recipe: "1. Brown ground beef with taco seasoning.\n2. Warm corn tortillas.\n3. Serve with homemade salsa, shredded lettuce, and cheese.",
    ingredients: ['Ground beef', 'Taco seasoning', 'Corn tortillas', 'Tomatoes', 'Onion', 'Cilantro', 'Lime', 'Lettuce', 'Cheese'],
    nutrients: {
      protein: '30g',
      carbs: '45g',
      fats: '28g',
    },
    cuisines: ['Mexican'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Miso Glazed Tofu with Stir-Fried Vegetables',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 450,
    prepTime: 25,
    recipe: "1. Press and cube firm tofu, then glaze with miso mixture.\n2. Bake until golden and crispy.\n3. Serve with stir-fried vegetables over brown rice.",
    ingredients: ['Firm tofu', 'Miso paste', 'Maple syrup', 'Soy sauce', 'Broccoli', 'Bell peppers', 'Carrots', 'Brown rice'],
    nutrients: {
      protein: '25g',
      carbs: '55g',
      fats: '15g',
    },
    cuisines: ['Japanese'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Margherita Pizza',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 650,
    prepTime: 40,
    recipe: "1. Roll out pizza dough and spread with tomato sauce.\n2. Top with fresh mozzarella and basil leaves.\n3. Bake until crust is golden and cheese is bubbly.",
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Basil', 'Olive oil'],
    nutrients: {
      protein: '22g',
      carbs: '80g',
      fats: '25g',
    },
    cuisines: ['Italian'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Grilled Lemon Herb Chicken with Quinoa',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 520,
    prepTime: 35,
    recipe: "1. Marinate chicken in lemon juice, olive oil, and herbs.\n2. Grill until fully cooked.\n3. Serve with fluffy quinoa and grilled vegetables.",
    ingredients: ['Chicken breast', 'Lemon', 'Olive oil', 'Fresh herbs', 'Quinoa', 'Zucchini', 'Bell peppers'],
    nutrients: {
      protein: '40g',
      carbs: '35g',
      fats: '20g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Shrimp Pad Thai',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 580,
    prepTime: 30,
    recipe: "1. Stir-fry shrimp until pink and opaque.\n2. Cook rice noodles according to package.\n3. Mix with pad Thai sauce, bean sprouts, and top with crushed peanuts and lime.",
    ingredients: ['Shrimp', 'Rice noodles', 'Eggs', 'Bean sprouts', 'Green onions', 'Pad Thai sauce', 'Peanuts', 'Lime'],
    nutrients: {
      protein: '25g',
      carbs: '65g',
      fats: '20g',
    },
    cuisines: ['Thai'],
    dietTypes: ['non-vegetarian'],
    spiciness: 'spicy',
    healthGoal: 'indulgent',
    restrictions: [],
  },
  {
    name: 'Stuffed Bell Peppers',
    type: 'dinner',
    image: 'https://placehold.co/120x80',
    calories: 480,
    prepTime: 45,
    recipe: "1. Hollow out bell peppers.\n2. Mix rice, black beans, corn, and spices for filling.\n3. Stuff peppers, top with cheese, and bake until tender.",
    ingredients: ['Bell peppers', 'Rice', 'Black beans', 'Corn', 'Onion', 'Spices', 'Cheese'],
    nutrients: {
      protein: '18g',
      carbs: '55g',
      fats: '18g',
    },
    cuisines: ['Mexican', 'American'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Gluten'],
  },
];

// Snack options
const snackOptions: MealOption[] = [
  {
    name: 'Apple Slices with Almond Butter',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 200,
    prepTime: 5,
    recipe: "1. Slice apple into wedges.\n2. Serve with a side of almond butter for dipping.",
    ingredients: ['Apple', 'Almond butter'],
    nutrients: {
      protein: '6g',
      carbs: '25g',
      fats: '10g',
    },
    cuisines: ['American'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Hummus with Vegetable Sticks',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 180,
    prepTime: 10,
    recipe: "1. Prepare hummus by blending chickpeas, tahini, lemon juice, and olive oil.\n2. Serve with carrots, cucumber, and bell pepper sticks.",
    ingredients: ['Chickpeas', 'Tahini', 'Lemon juice', 'Olive oil', 'Carrots', 'Cucumber', 'Bell peppers'],
    nutrients: {
      protein: '5g',
      carbs: '20g',
      fats: '8g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Greek Yogurt with Honey and Walnuts',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 220,
    prepTime: 5,
    recipe: "1. Spoon Greek yogurt into a bowl.\n2. Drizzle with honey and top with crushed walnuts.",
    ingredients: ['Greek yogurt', 'Honey', 'Walnuts'],
    nutrients: {
      protein: '15g',
      carbs: '20g',
      fats: '8g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Gluten'],
  },
  {
    name: 'Spicy Roasted Chickpeas',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 150,
    prepTime: 35,
    recipe: "1. Drain and dry chickpeas.\n2. Toss with olive oil and spices (cumin, paprika, cayenne).\n3. Roast until crispy.",
    ingredients: ['Chickpeas', 'Olive oil', 'Cumin', 'Paprika', 'Cayenne'],
    nutrients: {
      protein: '7g',
      carbs: '18g',
      fats: '6g',
    },
    cuisines: ['Indian', 'Mediterranean'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'spicy',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Dark Chocolate Covered Strawberries',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 180,
    prepTime: 20,
    recipe: "1. Melt dark chocolate in a double boiler.\n2. Dip strawberries halfway in chocolate.\n3. Place on parchment paper and refrigerate until set.",
    ingredients: ['Strawberries', 'Dark chocolate'],
    nutrients: {
      protein: '2g',
      carbs: '25g',
      fats: '8g',
    },
    cuisines: ['American', 'French'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Avocado Toast Points',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 220,
    prepTime: 10,
    recipe: "1. Toast small bread slices.\n2. Mash avocado with lime juice and salt.\n3. Spread on toast and top with red pepper flakes.",
    ingredients: ['Whole grain bread', 'Avocado', 'Lime', 'Sea salt', 'Red pepper flakes'],
    nutrients: {
      protein: '5g',
      carbs: '20g',
      fats: '15g',
    },
    cuisines: ['American', 'Mediterranean'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy'],
  },
  {
    name: 'Cheese and Whole Grain Crackers',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 250,
    prepTime: 5,
    recipe: "1. Arrange whole grain crackers on a plate.\n2. Add slices of cheese and a small bunch of grapes.",
    ingredients: ['Whole grain crackers', 'Cheese (cheddar or gouda)', 'Grapes'],
    nutrients: {
      protein: '10g',
      carbs: '20g',
      fats: '14g',
    },
    cuisines: ['American', 'European'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'indulgent',
    restrictions: ['No Gluten'],
  },
  {
    name: 'Spinach and Artichoke Greek Yogurt Dip',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 160,
    prepTime: 15,
    recipe: "1. Mix Greek yogurt with chopped spinach, artichoke hearts, and garlic.\n2. Season with salt, pepper, and a pinch of red pepper flakes.\n3. Serve with whole grain pita chips.",
    ingredients: ['Greek yogurt', 'Spinach', 'Artichoke hearts', 'Garlic', 'Spices', 'Whole grain pita chips'],
    nutrients: {
      protein: '12g',
      carbs: '15g',
      fats: '5g',
    },
    cuisines: ['Mediterranean'],
    dietTypes: ['vegetarian'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: [],
  },
  {
    name: 'Trail Mix',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 230,
    prepTime: 5,
    recipe: "1. Combine almonds, walnuts, pumpkin seeds, dried cranberries, and dark chocolate chips.\n2. Store in an airtight container.",
    ingredients: ['Almonds', 'Walnuts', 'Pumpkin seeds', 'Dried cranberries', 'Dark chocolate chips'],
    nutrients: {
      protein: '7g',
      carbs: '18g',
      fats: '16g',
    },
    cuisines: ['American'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
  {
    name: 'Miso Soup',
    type: 'snack',
    image: 'https://placehold.co/120x80',
    calories: 100,
    prepTime: 10,
    recipe: "1. Dissolve miso paste in hot water.\n2. Add tofu cubes, seaweed, and green onions.\n3. Simmer for a few minutes and serve hot.",
    ingredients: ['Miso paste', 'Tofu', 'Seaweed', 'Green onions'],
    nutrients: {
      protein: '8g',
      carbs: '10g',
      fats: '3g',
    },
    cuisines: ['Japanese'],
    dietTypes: ['vegetarian', 'vegan'],
    spiciness: 'mild',
    healthGoal: 'fit',
    restrictions: ['No Dairy', 'No Gluten'],
  },
];

// Combine all meal options into one array
export const allMealOptions: MealOption[] = [
  ...breakfastOptions,
  ...lunchOptions,
  ...dinnerOptions,
  ...snackOptions,
];

// Function to get a random selection of meals based on constraints
export function getRandomMeals(count: number, constraints: Partial<MealOption>): MealOption[] {
  // Filter meals based on constraints
  const filteredMeals = allMealOptions.filter(meal => {
    // Check meal type constraint
    if (constraints.type && meal.type !== constraints.type) {
      return false;
    }
    
    // Check diet type constraint
    if (constraints.dietTypes && constraints.dietTypes.length > 0) {
      const dietMatch = constraints.dietTypes.some(diet => 
        meal.dietTypes.includes(diet as any)
      );
      if (!dietMatch) return false;
    }
    
    // Check cuisine constraint
    if (constraints.cuisines && constraints.cuisines.length > 0) {
      const cuisineMatch = constraints.cuisines.some(cuisine => 
        meal.cuisines.includes(cuisine)
      );
      if (!cuisineMatch) return false;
    }
    
    // Check spiciness constraint
    if (constraints.spiciness && meal.spiciness !== constraints.spiciness) {
      return false;
    }
    
    // Check health goal constraint
    if (constraints.healthGoal && meal.healthGoal !== constraints.healthGoal) {
      return false;
    }
    
    // Check prep time constraint
    if (constraints.prepTime) {
      // Simple check - we could implement more sophisticated logic here
      if (meal.prepTime > 15 && constraints.prepTime === 'quick') return false;
      if (meal.prepTime > 30 && constraints.prepTime === 'moderate') return false;
      if (meal.prepTime <= 30 && constraints.prepTime === 'slow') return false;
    }
    
    // Check dietary restrictions
    if (constraints.restrictions && constraints.restrictions.length > 0) {
      for (const restriction of constraints.restrictions) {
        if (!meal.restrictions.includes(restriction)) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  // Shuffle and select random meals
  const shuffled = [...filteredMeals].sort(() => 0.5 - Math.random());
  
  // If we don't have enough meals, return what we have
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Function to generate meal plans for a given number of days
export function generateMealPlan(preferences: {
  mealsPerDay: '2' | '4';
  spiciness: 'spicy' | 'mild';
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
  healthGoal: 'fit' | 'indulgent';
  cuisinePreferences: string[];
  prepTime: 'quick' | 'moderate' | 'slow';
  duration: '1-week' | '2-weeks' | '1-month';
  restrictions: string[];
}) {
  const days = preferences.duration === '1-week' ? 7 : 
               preferences.duration === '2-weeks' ? 14 : 30;
  
  const mealPlanDays = [];
  
  // Create a day-by-day meal plan
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const dayMeals = [];
    let dailyCalories = 0;
    let dailyProtein = 0;
    let dailyCarbs = 0;
    let dailyFats = 0;
    
    // Generate appropriate meals based on meals per day
    if (preferences.mealsPerDay === '2') {
      // Lunch
      const lunch = getRandomMeals(1, {
        type: 'lunch',
        dietTypes: [preferences.dietType],
        cuisines: preferences.cuisinePreferences,
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        prepTime: preferences.prepTime,
        restrictions: preferences.restrictions
      })[0];
      
      if (lunch) {
        dayMeals.push(lunch);
        dailyCalories += lunch.calories;
        dailyProtein += parseInt(lunch.nutrients.protein);
        dailyCarbs += parseInt(lunch.nutrients.carbs);
        dailyFats += parseInt(lunch.nutrients.fats);
      }
      
      // Dinner
      const dinner = getRandomMeals(1, {
        type: 'dinner',
        dietTypes: [preferences.dietType],
        cuisines: preferences.cuisinePreferences,
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        prepTime: preferences.prepTime,
        restrictions: preferences.restrictions
      })[0];
      
      if (dinner) {
        dayMeals.push(dinner);
        dailyCalories += dinner.calories;
        dailyProtein += parseInt(dinner.nutrients.protein);
        dailyCarbs += parseInt(dinner.nutrients.carbs);
        dailyFats += parseInt(dinner.nutrients.fats);
      }
    } else {
      // Breakfast
      const breakfast = getRandomMeals(1, {
        type: 'breakfast',
        dietTypes: [preferences.dietType],
        cuisines: preferences.cuisinePreferences,
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        prepTime: preferences.prepTime,
        restrictions: preferences.restrictions
      })[0];
      
      if (breakfast) {
        dayMeals.push(breakfast);
        dailyCalories += breakfast.calories;
        dailyProtein += parseInt(breakfast.nutrients.protein);
        dailyCarbs += parseInt(breakfast.nutrients.carbs);
        dailyFats += parseInt(breakfast.nutrients.fats);
      }
      
      // Lunch
      const lunch = getRandomMeals(1, {
        type: 'lunch',
        dietTypes: [preferences.dietType],
        cuisines: preferences.cuisinePreferences,
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        prepTime: preferences.prepTime,
        restrictions: preferences.restrictions
      })[0];
      
      if (lunch) {
        dayMeals.push(lunch);
        dailyCalories += lunch.calories;
        dailyProtein += parseInt(lunch.nutrients.protein);
        dailyCarbs += parseInt(lunch.nutrients.carbs);
        dailyFats += parseInt(lunch.nutrients.fats);
      }
      
      // Snack
      const snack = getRandomMeals(1, {
        type: 'snack',
        dietTypes: [preferences.dietType],
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        restrictions: preferences.restrictions
      })[0];
      
      if (snack) {
        dayMeals.push(snack);
        dailyCalories += snack.calories;
        dailyProtein += parseInt(snack.nutrients.protein);
        dailyCarbs += parseInt(snack.nutrients.carbs);
        dailyFats += parseInt(snack.nutrients.fats);
      }
      
      // Dinner
      const dinner = getRandomMeals(1, {
        type: 'dinner',
        dietTypes: [preferences.dietType],
        cuisines: preferences.cuisinePreferences,
        spiciness: preferences.spiciness,
        healthGoal: preferences.healthGoal,
        prepTime: preferences.prepTime,
        restrictions: preferences.restrictions
      })[0];
      
      if (dinner) {
        dayMeals.push(dinner);
        dailyCalories += dinner.calories;
        dailyProtein += parseInt(dinner.nutrients.protein);
        dailyCarbs += parseInt(dinner.nutrients.carbs);
        dailyFats += parseInt(dinner.nutrients.fats);
      }
    }
    
    mealPlanDays.push({
      date,
      meals: dayMeals.map(meal => ({
        type: meal.type === 'breakfast' ? 'Breakfast' : 
              meal.type === 'lunch' ? 'Lunch' : 
              meal.type === 'dinner' ? 'Dinner' : 'Snack',
        name: meal.name,
        image: meal.image,
        calories: meal.calories,
        recipe: meal.recipe,
        ingredients: meal.ingredients,
        nutrients: meal.nutrients
      })),
      dailyNutrition: {
        totalCalories: dailyCalories,
        totalProtein: `${dailyProtein}g`,
        totalCarbs: `${dailyCarbs}g`,
        totalFats: `${dailyFats}g`
      }
    });
  }
  
  // Generate a comprehensive grocery list
  const allIngredients: string[] = [];
  mealPlanDays.forEach(day => {
    day.meals.forEach(meal => {
      allIngredients.push(...meal.ingredients);
    });
  });
  
  // Count occurrences of each ingredient
  const ingredientCounts: Record<string, number> = {};
  allIngredients.forEach(ingredient => {
    ingredientCounts[ingredient] = (ingredientCounts[ingredient] || 0) + 1;
  });
  
  // Group ingredients by category (simplified)
  const groceryCategories = {
    'Proteins': ['Chicken', 'Beef', 'Turkey', 'Tofu', 'Tempeh', 'Eggs', 'Salmon', 'Tuna', 'Shrimp', 'Greek yogurt'],
    'Grains': ['Rice', 'Quinoa', 'Pasta', 'Bread', 'Tortillas', 'Oats', 'Granola', 'Crackers'],
    'Vegetables': ['Broccoli', 'Spinach', 'Kale', 'Carrots', 'Zucchini', 'Bell peppers', 'Tomatoes', 'Cucumber', 'Onion', 'Garlic'],
    'Fruits': ['Apple', 'Banana', 'Berries', 'Lemon', 'Lime', 'Avocado', 'Mango'],
    'Dairy & Alternatives': ['Milk', 'Cheese', 'Butter', 'Yogurt', 'Almond milk', 'Coconut milk', 'Soy milk'],
    'Nuts & Seeds': ['Almonds', 'Walnuts', 'Cashews', 'Chia seeds', 'Flax seeds', 'Pumpkin seeds', 'Sesame seeds'],
    'Herbs & Spices': ['Basil', 'Cilantro', 'Parsley', 'Thyme', 'Rosemary', 'Cumin', 'Paprika', 'Turmeric', 'Cinnamon'],
    'Oils & Sauces': ['Olive oil', 'Coconut oil', 'Sesame oil', 'Soy sauce', 'Hot sauce', 'Vinegar', 'Salsa'],
    'Other': []
  };
  
  const groceryList = [];
  
  // Process each ingredient
  Object.entries(ingredientCounts).forEach(([ingredient, count]) => {
    // Determine category
    let category = 'Other';
    for (const [cat, items] of Object.entries(groceryCategories)) {
      if (items.some(item => ingredient.toLowerCase().includes(item.toLowerCase()))) {
        category = cat;
        break;
      }
    }
    
    // Add to grocery list with quantity
    const existingCategory = groceryList.find(item => item.category === category);
    if (existingCategory) {
      existingCategory.items.push(`${ingredient} (${count > 1 ? `${count}x` : '1'})`);
    } else {
      groceryList.push({
        category,
        items: [`${ingredient} (${count > 1 ? `${count}x` : '1'})`]
      });
    }
  });
  
  // Calculate nutrition summary
  const totalDays = mealPlanDays.length;
  const avgCalories = Math.round(mealPlanDays.reduce((sum, day) => sum + day.dailyNutrition.totalCalories, 0) / totalDays);
  const avgProtein = `${Math.round(mealPlanDays.reduce((sum, day) => sum + parseInt(day.dailyNutrition.totalProtein), 0) / totalDays)}g`;
  const avgCarbs = `${Math.round(mealPlanDays.reduce((sum, day) => sum + parseInt(day.dailyNutrition.totalCarbs), 0) / totalDays)}g`;
  const avgFats = `${Math.round(mealPlanDays.reduce((sum, day) => sum + parseInt(day.dailyNutrition.totalFats), 0) / totalDays)}g`;
  
  // Generate recommendations based on the meal plan
  const recommendations = [];
  
  if (preferences.healthGoal === 'fit') {
    recommendations.push('Aim to drink at least 2L of water daily to stay hydrated');
    
    if (parseInt(avgProtein) < 70) {
      recommendations.push('Consider increasing protein intake through additional lean protein sources');
    }
    
    recommendations.push('Add more fiber-rich foods for better digestive health');
    recommendations.push('Vary your vegetable intake for broader nutrient profile');
  } else {
    recommendations.push('Balance indulgent meals with lighter options on other days');
    recommendations.push('Consider adding more vegetables to your comfort food dishes');
    recommendations.push('Stay hydrated with at least 2L of water daily, especially with higher-calorie meals');
    recommendations.push('Try including a daily walk or light activity to balance your indulgent meal choices');
  }
  
  return {
    days: mealPlanDays,
    groceryList,
    nutritionSummary: {
      averageCalories: avgCalories,
      averageProtein: avgProtein,
      averageCarbs: avgCarbs,
      averageFats: avgFats,
      recommendations
    }
  };
}