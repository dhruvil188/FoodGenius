import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserRecipes } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { AnalyzeImageResponse } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { triggerConfetti } from '@/lib/confetti';

export default function SavedRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usingLocalStorage, setUsingLocalStorage] = useState(false);
  const { toast } = useToast();
  const [location, navigate] = useLocation();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Function to load recipes from local storage
  const loadFromLocalStorage = () => {
    try {
      const localRecipes = JSON.parse(localStorage.getItem('recipeSnapSavedRecipes') || '[]');
      setRecipes(localRecipes);
      setUsingLocalStorage(true);
      return localRecipes.length > 0;
    } catch (err) {
      console.error("Error loading from local storage:", err);
      return false;
    }
  };

  // Load user recipes
  useEffect(() => {
    const loadUserRecipes = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const userRecipes = await getUserRecipes(user.uid);
        setRecipes(userRecipes);
        setUsingLocalStorage(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        
        // Try loading from local storage as fallback
        const localRecipesLoaded = loadFromLocalStorage();
        
        if (!localRecipesLoaded) {
          toast({
            title: 'Error',
            description: 'Failed to load your saved recipes and no local backups found.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Using Local Recipes',
            description: 'Firebase unavailable. Loaded recipes from your browser storage.',
            variant: 'default',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserRecipes();
  }, [user, toast]);

  const handleViewRecipe = (recipeData: any) => {
    // Store the selected recipe in localStorage to display it
    localStorage.setItem('selectedRecipe', JSON.stringify(recipeData.recipe));
    localStorage.setItem('selectedRecipeImage', recipeData.imageUrl);
    // Navigate to home page to display the recipe in RecipeResults
    navigate('/#view-recipe');
    // The RecipeResults component will need to be updated to check for this localStorage item
  };

  if (!user) {
    return null; // Handled by the redirect in useEffect
  }

  const sortedRecipes = [...recipes].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
        Your Saved Recipes
      </h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-slate-200">
                <Skeleton className="w-full h-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : sortedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map((recipeData, index) => {
            const recipe: AnalyzeImageResponse = recipeData.recipe;
            return (
              <motion.div
                key={recipeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${recipeData.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{recipe.foodName}</CardTitle>
                    <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="bg-primary/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="fas fa-clock text-primary/70"></i>
                        <span>Prep: {recipe.recipes[0]?.prepTime || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-utensils text-primary/70"></i>
                        <span>Cook: {recipe.recipes[0]?.cookTime || 'N/A'}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleViewRecipe(recipeData)}
                      className="w-full"
                    >
                      View Recipe
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🍳</div>
          <h3 className="text-xl font-semibold mb-2">No saved recipes yet</h3>
          <p className="text-muted-foreground mb-6">
            Start analyzing dishes and save your favorite recipes to build your personal collection.
          </p>
          <Button
            className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-camera mr-2"></i>
            Analyze a Dish
          </Button>
        </div>
      )}
    </div>
  );
}