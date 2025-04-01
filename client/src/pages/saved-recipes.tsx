import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { SavedRecipe, AnalyzeImageResponse } from '@shared/schema';
import { apiRequest, queryClient } from '../lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronLeft, Heart, Trash2, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import RecipeResults from '@/components/RecipeResults';

export default function SavedRecipes() {
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null);
  
  // Define the type for the API response
  type RecipesResponse = {
    success: boolean;
    recipes: SavedRecipe[];
  };

  // Fetch saved recipes
  const { data, isLoading, isError, error } = useQuery<RecipesResponse>({
    queryKey: ['/api/recipes'],
    enabled: !!user
  });

  // Log data for debugging
  useEffect(() => {
    if (data) {
      console.log("Saved recipes API response:", data);
      console.log("Data type:", typeof data);
      if (data?.recipes) {
        console.log("Recipes count:", data.recipes.length);
        console.log("Recipe IDs:", data.recipes.map(recipe => recipe.id));
      } else {
        console.log("No recipes found in response");
      }
    }
    
    if (isError) {
      console.error("Error fetching saved recipes:", error);
    }
  }, [data, isError, error]);
  
  // Toggle favorite status mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ recipeId, favorite }: { recipeId: number, favorite: boolean }) => {
      const res = await apiRequest('PATCH', `/api/recipes/${recipeId}/favorite`, { favorite });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recipes'] });
      toast({
        title: 'Success',
        description: 'Recipe favorite status updated',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update favorite status: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  // Delete recipe mutation
  const deleteRecipeMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      const res = await apiRequest('DELETE', `/api/recipes/${recipeId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recipes'] });
      toast({
        title: 'Success',
        description: 'Recipe deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete recipe: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Handle favorite toggle
  const handleToggleFavorite = (recipe: SavedRecipe) => {
    toggleFavoriteMutation.mutate({
      recipeId: recipe.id,
      favorite: !recipe.favorite,
    });
  };

  // Handle delete
  const handleDelete = (recipe: SavedRecipe) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipeMutation.mutate(recipe.id);
    }
  };

  // Handle view
  const handleView = (recipe: SavedRecipe) => {
    setSelectedRecipe(recipe);
  };

  // If a recipe is selected, show the recipe details
  if (selectedRecipe) {
    return (
      <div className="container mx-auto py-6">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Saved Recipes
        </Button>
        <RecipeResults
          result={selectedRecipe.recipeData as AnalyzeImageResponse}
          imageUrl={selectedRecipe.imageUrl || ''}
          onTryAnother={() => setSelectedRecipe(null)}
        />
      </div>
    );
  }

  // Show empty state if no recipes
  if (!isLoading && (!data?.recipes || data.recipes.length === 0)) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>No Saved Recipes</CardTitle>
            <CardDescription>
              You haven't saved any recipes yet. Start by analyzing food images to discover new recipes!
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/')}>Discover Recipes</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          Your Saved Recipes
        </h1>
        <Button onClick={() => navigate('/')}>Discover More Recipes</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <Card className="my-4">
          <CardContent className="py-6">
            <p className="text-center text-red-500">Error loading recipes: {error?.message}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.recipes && data.recipes.length > 0 && data.recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.foodName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
                    recipe.favorite && "text-red-500"
                  )}
                  onClick={() => handleToggleFavorite(recipe)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      recipe.favorite && "fill-current"
                    )}
                  />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{recipe.foodName}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-20">
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags && recipe.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(recipe)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleView(recipe)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Recipe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}