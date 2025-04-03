import { storage } from "../storage";
import { NotFoundError, ValidationError, AuthorizationError } from "../middleware/errorHandler";
import type { AnalyzeImageResponse, SavedRecipe, InsertSavedRecipe } from "@shared/schema";
import { searchYouTubeVideos } from "./youtubeService";

/**
 * Save a recipe to a user's library
 */
export async function saveRecipe(userId: number, recipeData: AnalyzeImageResponse): Promise<SavedRecipe> {
  if (!recipeData || !recipeData.foodName) {
    throw new ValidationError("Invalid recipe data");
  }
  
  // Get the image URL from the request if it exists, otherwise try to get it from the recipe data
  const imageUrl = recipeData.imageUrl || (recipeData.recipes && recipeData.recipes[0] && recipeData.recipes[0].imageUrl) || "";
  
  const savedRecipe: InsertSavedRecipe = {
    userId,
    recipeData,
    foodName: recipeData.foodName,
    description: recipeData.description,
    imageUrl: imageUrl,
    tags: recipeData.tags || [],
    favorite: false
  };
  
  return storage.createSavedRecipe(savedRecipe);
}

/**
 * Get all recipes for a user
 */
export async function getUserRecipes(userId: number): Promise<SavedRecipe[]> {
  return storage.getSavedRecipes(userId);
}

/**
 * Get a specific recipe by ID with ownership validation
 */
export async function getRecipeById(recipeId: number, userId?: number): Promise<SavedRecipe> {
  const recipe = await storage.getSavedRecipeById(recipeId);
  
  if (!recipe) {
    throw new NotFoundError(`Recipe with ID ${recipeId} not found`);
  }
  
  // If userId is provided, check ownership
  if (userId && recipe.userId !== userId) {
    throw new AuthorizationError("You don't have permission to access this recipe");
  }
  
  return recipe;
}

/**
 * Delete a recipe with ownership validation
 */
export async function deleteRecipe(recipeId: number, userId: number): Promise<boolean> {
  const recipe = await getRecipeById(recipeId, userId);
  return storage.deleteSavedRecipe(recipe.id);
}

/**
 * Toggle favorite status for a recipe
 */
export async function toggleFavorite(recipeId: number, userId: number): Promise<SavedRecipe> {
  const recipe = await getRecipeById(recipeId, userId);
  
  const updatedRecipe = await storage.updateSavedRecipe(recipe.id, {
    favorite: !recipe.favorite
  });
  
  if (!updatedRecipe) {
    throw new Error("Failed to update recipe favorite status");
  }
  
  return updatedRecipe;
}

/**
 * Enhance recipe with YouTube videos
 */
export async function enhanceRecipeWithVideos(recipe: AnalyzeImageResponse): Promise<AnalyzeImageResponse> {
  if (!recipe.youtubeVideos || recipe.youtubeVideos.length === 0) {
    try {
      const searchQuery = `${recipe.foodName} recipe how to cook`;
      const videos = await searchYouTubeVideos(searchQuery);
      
      return {
        ...recipe,
        youtubeVideos: videos
      };
    } catch (error) {
      console.error("Failed to fetch YouTube videos:", error);
      // Return original recipe without videos rather than failing
      return recipe;
    }
  }
  
  return recipe;
}