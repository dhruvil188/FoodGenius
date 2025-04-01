import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import { foodComRecipes } from "@/data/foodComRecipes";
import { foodComRecipes2 } from "@/data/foodComRecipes2";
import { foodComRecipes3 } from "@/data/foodComRecipes3";
import RecipeLibraryResults from "@/components/RecipeLibraryResults";
import { AnalyzeImageResponse } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { findRecipeBySlug, slugify } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function RecipePage() {
  const [location, setLocation] = useLocation();
  const params = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<AnalyzeImageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Placeholder image URLs for each recipe
  const placeholderImages: Record<string, string> = {
    "Pasta Carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Neapolitan Pizza Margherita": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Butter Chicken (Murgh Makhani)": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Guacamole": "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Sushi": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Chinese Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Pad Thai": "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Korean Bibimbap": "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Paella": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Beef Wellington": "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Chicken Tandoori": "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Tarte Tatin": "https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Irish Stew": "https://images.unsplash.com/photo-1583608354155-90fc9c84ae58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Ratatouille": "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
  };

  // Generic food category images to use as fallbacks
  const fallbackImages = {
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    meat: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    vegetarian: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
  };

  // Get an appropriate image for a recipe based on name or tags
  const getRecipeImage = (recipe: AnalyzeImageResponse): string => {
    console.log("Recipe object:", recipe);
    
    // First check if the recipe has an imageUrl property (Food.com recipes have these)
    // Use a type assertion to access the non-standard property
    const recipeAny = recipe as any;
    if (recipeAny.imageUrl && typeof recipeAny.imageUrl === 'string' && recipeAny.imageUrl.trim() !== '') {
      console.log("Using direct imageUrl:", recipeAny.imageUrl);
      return recipeAny.imageUrl;
    }
    
    // First recipe in the array might have an imageUrl
    if (recipe.recipes && 
        recipe.recipes.length > 0 && 
        (recipe.recipes[0] as any).imageUrl && 
        typeof (recipe.recipes[0] as any).imageUrl === 'string' && 
        (recipe.recipes[0] as any).imageUrl.trim() !== '') {
      console.log("Using recipe[0] imageUrl:", (recipe.recipes[0] as any).imageUrl);
      return (recipe.recipes[0] as any).imageUrl;
    }
    
    // Then try to use YouTube thumbnail if available (TheMealDB recipes have these)
    if (recipe.youtubeVideos && 
        recipe.youtubeVideos.length > 0 && 
        recipe.youtubeVideos[0].thumbnailUrl && 
        recipe.youtubeVideos[0].thumbnailUrl.trim() !== '') {
      console.log("Using YouTube thumbnail:", recipe.youtubeVideos[0].thumbnailUrl);
      return recipe.youtubeVideos[0].thumbnailUrl;
    }
    
    // Direct check for TheMealDB recipes via their URL pattern in other videos
    if (recipe.youtubeVideos) {
      for (const video of recipe.youtubeVideos) {
        if (video.thumbnailUrl && 
            video.thumbnailUrl.trim() !== '') {
          console.log("Using YouTube video thumbnail:", video.thumbnailUrl);
          return video.thumbnailUrl;
        }
      }
    }
    
    // Then try exact match by name
    if (placeholderImages[recipe.foodName]) {
      console.log("Using named placeholder:", placeholderImages[recipe.foodName]);
      return placeholderImages[recipe.foodName];
    }
    
    // Then look for category matches in tags
    const lowerTags = recipe.tags.map(tag => tag.toLowerCase());
    if (lowerTags.some(tag => tag.includes('soup'))) {
      console.log("Using soup fallback");
      return fallbackImages.soup;
    } else if (lowerTags.some(tag => tag.includes('dessert') || tag.includes('sweet'))) {
      console.log("Using dessert fallback");
      return fallbackImages.dessert;
    } else if (lowerTags.some(tag => tag.includes('vegetarian') || tag.includes('vegan'))) {
      console.log("Using vegetarian fallback");
      return fallbackImages.vegetarian;
    } else if (lowerTags.some(tag => tag.includes('meat') || tag.includes('chicken') || tag.includes('beef'))) {
      console.log("Using meat fallback");
      return fallbackImages.meat;
    }
    
    // Default fallback
    console.log("Using default fallback");
    return fallbackImages.default;
  };

  useEffect(() => {
    if (params?.slug) {
      setLoading(true);
      
      // Search in all recipe collections
      const allRecipeCollections = [
        expandedRecipes,
        foodComRecipes,
        foodComRecipes2,
        foodComRecipes3
      ];
      
      let foundRecipe = null;
      
      // Look through all collections for the recipe by slug
      for (const collection of allRecipeCollections) {
        const found = findRecipeBySlug(collection, params.slug);
        if (found) {
          foundRecipe = found;
          break;
        }
      }
      
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setImageUrl(getRecipeImage(foundRecipe));
      } else {
        // If no recipe found, redirect to library
        setLocation('/library');
      }
      setLoading(false);
    }
  }, [params?.slug, setLocation]);

  const handleBackToLibrary = () => {
    setLocation('/library');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-green-500" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
        <Button 
          onClick={handleBackToLibrary}
          className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
        >
          Return to Recipe Library
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={handleBackToLibrary}
        className="mb-6"
        variant="outline"
      >
        ← Back to Recipe Library
      </Button>
      <RecipeLibraryResults 
        result={recipe} 
        imageUrl={imageUrl} 
        onTryAnother={handleBackToLibrary}
      />
    </div>
  );
}