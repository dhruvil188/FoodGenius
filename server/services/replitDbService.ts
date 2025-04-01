import Database from '@replit/database';
import { AnalyzeImageResponse } from '@shared/schema';

// Initialize the Replit Database client
const db = new Database();

// Helper function to safely handle database response types
function safeParse(data: any): any {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}

// User recipes collection
const USER_RECIPES_PREFIX = 'user_recipes:';
const USER_PROFILES_PREFIX = 'user_profiles:';

/**
 * Save a recipe to a user's collection in Replit Database
 */
export async function saveUserRecipe(userId: string, recipe: AnalyzeImageResponse, imageUrl: string) {
  try {
    // Create a unique ID for the recipe
    const recipeId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create the recipe object
    const recipeData = {
      id: recipeId,
      userId,
      recipe,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Get the user's recipes key
    const userRecipesKey = `${USER_RECIPES_PREFIX}${userId}`;
    
    // Get existing recipes or initialize empty array
    const existingRecipesJson = await db.get(userRecipesKey);
    const existingRecipes = existingRecipesJson ? safeParse(existingRecipesJson) : [];
    
    // Add the new recipe
    const updatedRecipes = [...existingRecipes, recipeData];
    
    // Save the updated recipes
    await db.set(userRecipesKey, JSON.stringify(updatedRecipes));
    
    // Update user profile recipe count
    await updateUserRecipeCount(userId, 1);
    
    return {
      success: true,
      recipeId,
      message: 'Recipe saved successfully'
    };
  } catch (error) {
    console.error('Error saving recipe to Replit DB:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error saving recipe',
      message: 'Failed to save recipe'
    };
  }
}

/**
 * Get all recipes for a user
 */
export async function getUserRecipes(userId: string) {
  try {
    const userRecipesKey = `${USER_RECIPES_PREFIX}${userId}`;
    
    // Get recipes from DB
    const recipesJson = await db.get(userRecipesKey);
    
    if (!recipesJson) {
      return [];
    }
    
    // Parse and return recipes
    return safeParse(recipesJson);
  } catch (error) {
    console.error('Error fetching recipes from Replit DB:', error);
    return [];
  }
}

/**
 * Delete a recipe from a user's collection
 */
export async function deleteUserRecipe(userId: string, recipeId: string) {
  try {
    const userRecipesKey = `${USER_RECIPES_PREFIX}${userId}`;
    
    // Get existing recipes
    const recipesJson = await db.get(userRecipesKey);
    
    if (!recipesJson) {
      return {
        success: false,
        message: 'No recipes found for user'
      };
    }
    
    // Parse recipes
    const recipes = safeParse(recipesJson);
    
    // Find and remove the recipe
    const filteredRecipes = recipes.filter((recipe: any) => recipe.id !== recipeId);
    
    // If no recipes were removed, return error
    if (filteredRecipes.length === recipes.length) {
      return {
        success: false,
        message: 'Recipe not found'
      };
    }
    
    // Save the updated recipes
    await db.set(userRecipesKey, JSON.stringify(filteredRecipes));
    
    // Update user profile recipe count
    await updateUserRecipeCount(userId, -1);
    
    return {
      success: true,
      message: 'Recipe deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting recipe from Replit DB:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error deleting recipe',
      message: 'Failed to delete recipe'
    };
  }
}

/**
 * Get or create a user profile
 */
export async function getUserProfile(userId: string, email?: string) {
  try {
    const userProfileKey = `${USER_PROFILES_PREFIX}${userId}`;
    
    // Try to get existing profile
    const profileJson = await db.get(userProfileKey);
    
    if (profileJson) {
      return {
        success: true,
        profile: safeParse(profileJson)
      };
    }
    
    // Profile doesn't exist, create a new one if email is provided
    if (email) {
      const newProfile = {
        userId,
        email,
        displayName: null,
        photoURL: null,
        recipeCount: 0,
        preferences: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await db.set(userProfileKey, JSON.stringify(newProfile));
      
      return {
        success: true,
        profile: newProfile,
        isNew: true
      };
    }
    
    // No profile found and no email to create one
    return {
      success: false,
      message: 'User profile not found'
    };
  } catch (error) {
    console.error('Error getting user profile from Replit DB:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error getting profile',
      message: 'Failed to get user profile'
    };
  }
}

/**
 * Update a user profile
 */
export async function updateUserProfile(userId: string, profileData: Partial<any>) {
  try {
    const userProfileKey = `${USER_PROFILES_PREFIX}${userId}`;
    
    // Get existing profile
    const profileJson = await db.get(userProfileKey);
    
    if (!profileJson) {
      return {
        success: false,
        message: 'User profile not found'
      };
    }
    
    // Parse profile
    const profile = safeParse(profileJson);
    
    // Update profile
    const updatedProfile = {
      ...profile,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    
    // Save updated profile
    await db.set(userProfileKey, JSON.stringify(updatedProfile));
    
    return {
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating user profile in Replit DB:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error updating profile',
      message: 'Failed to update user profile'
    };
  }
}

/**
 * Update a user's recipe count
 */
async function updateUserRecipeCount(userId: string, change: number) {
  try {
    const userProfileKey = `${USER_PROFILES_PREFIX}${userId}`;
    
    // Get existing profile
    const profileJson = await db.get(userProfileKey);
    
    if (!profileJson) {
      // Profile doesn't exist, create minimal one with just the recipe count
      const newProfile = {
        userId,
        recipeCount: Math.max(0, change), // Ensure count isn't negative
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await db.set(userProfileKey, JSON.stringify(newProfile));
      return;
    }
    
    // Parse profile
    const profile = safeParse(profileJson);
    
    // Update recipe count, ensuring it doesn't go below 0
    const updatedProfile = {
      ...profile,
      recipeCount: Math.max(0, (profile.recipeCount || 0) + change),
      updatedAt: new Date().toISOString()
    };
    
    // Save updated profile
    await db.set(userProfileKey, JSON.stringify(updatedProfile));
  } catch (error) {
    console.error('Error updating recipe count in Replit DB:', error);
  }
}

/**
 * List all database keys (for debugging)
 */
export async function listAllKeys() {
  try {
    const result = await db.list();
    // Handle the response - Replit database may return different types
    if (result && typeof result === 'object' && 'ok' in result && result.ok) {
      return result.value || [];
    } else if (Array.isArray(result)) {
      return result;
    }
    return [];
  } catch (error) {
    console.error('Error listing Replit DB keys:', error);
    return [];
  }
}

/**
 * Clear all user data (for testing/debugging)
 */
export async function clearAllUserData() {
  try {
    const keys = await listAllKeys();
    
    // Delete all user-related keys
    for (const key of keys) {
      if (typeof key === 'string' && (key.startsWith(USER_RECIPES_PREFIX) || key.startsWith(USER_PROFILES_PREFIX))) {
        await db.delete(key);
      }
    }
    
    return {
      success: true,
      message: 'All user data cleared'
    };
  } catch (error) {
    console.error('Error clearing Replit DB:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error clearing data',
      message: 'Failed to clear user data'
    };
  }
}