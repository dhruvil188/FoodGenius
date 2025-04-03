/**
 * Utility functions for recipe-related operations
 */

/**
 * Calculates the cost classification of a recipe based on its ingredients
 */
export function calculateRecipeCost(ingredients: string[]): {
  costCategory: string;
  fillWidth: string;
  fillColor: string;
  costLabel: string;
} {
  const hasExpensiveIngredients = ingredients.some(i => 
    i.toLowerCase().includes("steak") || 
    i.toLowerCase().includes("salmon") || 
    i.toLowerCase().includes("shrimp") || 
    i.toLowerCase().includes("prawn") ||
    i.toLowerCase().includes("saffron") ||
    i.toLowerCase().includes("truffle") ||
    i.toLowerCase().includes("crab") ||
    i.toLowerCase().includes("lobster")
  );
  
  const hasMediumIngredients = ingredients.some(i => 
    i.toLowerCase().includes("chicken") || 
    i.toLowerCase().includes("pork") || 
    i.toLowerCase().includes("cheese") || 
    i.toLowerCase().includes("wine") ||
    i.toLowerCase().includes("nuts")
  );
  
  if (hasExpensiveIngredients) {
    return {
      costCategory: "Premium",
      fillWidth: "w-full",
      fillColor: "bg-red-500",
      costLabel: "High-cost recipe with premium ingredients"
    };
  } else if (hasMediumIngredients) {
    return {
      costCategory: "Moderate",
      fillWidth: "w-2/3",
      fillColor: "bg-amber-500",
      costLabel: "Medium-cost recipe with standard ingredients"
    };
  } else {
    return {
      costCategory: "Budget-friendly",
      fillWidth: "w-1/3",
      fillColor: "bg-green-500",
      costLabel: "Low-cost recipe with economical ingredients"
    };
  }
}

/**
 * Calculates the approximate cost per serving based on ingredients
 */
export function calculateCostPerServing(ingredients: string[]): number {
  const hasExpensiveIngredients = ingredients.some(i => 
    i.toLowerCase().includes("steak") || 
    i.toLowerCase().includes("salmon") || 
    i.toLowerCase().includes("shrimp")
  );
  
  const hasMediumIngredients = ingredients.some(i => 
    i.toLowerCase().includes("chicken") || 
    i.toLowerCase().includes("pork")
  );
  
  // Create a stable cost calculation based on ingredient types
  let baseCost = 0;
  
  if (hasExpensiveIngredients) {
    baseCost = 15; // Base cost for premium ingredients
    
    // Add additional cost based on specific expensive ingredients
    ingredients.forEach(ingredient => {
      if (ingredient.toLowerCase().includes("steak")) baseCost += 5;
      if (ingredient.toLowerCase().includes("salmon")) baseCost += 4;
      if (ingredient.toLowerCase().includes("shrimp")) baseCost += 3;
      if (ingredient.toLowerCase().includes("truffle")) baseCost += 10;
      if (ingredient.toLowerCase().includes("saffron")) baseCost += 8;
    });
  } else if (hasMediumIngredients) {
    baseCost = 8; // Base cost for medium-tier ingredients
    
    // Add additional cost based on specific medium-tier ingredients
    ingredients.forEach(ingredient => {
      if (ingredient.toLowerCase().includes("chicken")) baseCost += 1.5;
      if (ingredient.toLowerCase().includes("pork")) baseCost += 2;
      if (ingredient.toLowerCase().includes("cheese") && 
          ingredient.toLowerCase().includes("specialty")) baseCost += 3;
    });
  } else {
    baseCost = 3; // Base cost for budget ingredients
    
    // Add small costs for specific budget ingredients
    ingredients.forEach(ingredient => {
      if (ingredient.toLowerCase().includes("vegetable")) baseCost += 0.5;
      if (ingredient.toLowerCase().includes("grain")) baseCost += 0.3;
      if (ingredient.toLowerCase().includes("egg")) baseCost += 0.2;
    });
  }
  
  // Add some minor variation to make costs look more natural
  // Use a deterministic approach based on ingredient count
  const variation = (ingredients.length % 5) * 0.1;
  
  return parseFloat((baseCost + variation).toFixed(2));
}

/**
 * Gets money-saving tips based on the ingredients in a recipe
 */
export function getMoneySavingTip(ingredients: string[]): {
  title: string;
  savings: number;
  description: string;
} {
  if (ingredients.some(i => i.toLowerCase().includes("rice") || 
                          i.toLowerCase().includes("pasta") || 
                          i.toLowerCase().includes("grain"))) {
    return {
      title: "Buy rice/pasta in bulk instead of small packages",
      savings: parseFloat((Math.floor(Math.random() * 2) + 2).toFixed(2)),
      description: "Buying staples in bulk can save up to 50% on per-serving costs."
    };
  } else if (ingredients.some(i => i.toLowerCase().includes("spice"))) {
    return {
      title: "Use whole spices instead of pre-ground spices",
      savings: parseFloat((Math.floor(Math.random() * 1.5) + 1).toFixed(2)),
      description: "Whole spices last longer and provide better flavor when freshly ground."
    };
  } else {
    return {
      title: "Use store brand ingredients instead of premium brands",
      savings: parseFloat((Math.floor(Math.random() * 2) + 1.5).toFixed(2)),
      description: "Store brands often contain identical ingredients at lower prices."
    };
  }
}

/**
 * Formats a string to capitalize the first letter of each word
 */
export function formatTitle(title: string): string {
  return title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Parses ingredient strings that might be JSON objects
 */
export function parseIngredient(ingredient: string): string {
  if (typeof ingredient === 'string' && ingredient.startsWith('{')) {
    try {
      const parsed = JSON.parse(ingredient);
      return parsed.item || ingredient;
    } catch (e) {
      return ingredient;
    }
  }
  return ingredient;
}