import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { type SavedRecipe } from '@shared/schema';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { apiRequest, queryClient } from '@/lib/queryClient';
import SEO from '@/components/SEO';

export default function SavedRecipesPage() {
  const { currentUser: user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [, navigate] = useLocation();
  
  // Delete recipe mutation
  const deleteMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      await apiRequest("DELETE", `/api/recipes/${recipeId}`);
    },
    onSuccess: () => {
      toast({
        title: "Recipe Deleted",
        description: "Recipe has been removed from your library",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete recipe",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Function to delete a recipe
  const deleteRecipe = (recipeId: number) => {
    deleteMutation.mutate(recipeId);
  };
  
  // Fetch saved recipes
  const recipesQuery = useQuery<SavedRecipe[]>({
    queryKey: ["/api/recipes"],
    enabled: !!user,
  });
  
  const { data: recipes, isLoading, error } = recipesQuery;
  
  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">Please sign in to view your saved recipes.</p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 food-gradient-text">My Recipe Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-slate-200 animate-pulse" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">Failed to load saved recipes. Please try again later.</p>
            <Button onClick={() => recipesQuery.refetch()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Handle empty state
  if (!recipes || recipes.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 food-gradient-text">My Recipe Library</h1>
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">
              <i className="fas fa-book-open text-primary opacity-70"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Saved Recipes</h2>
            <p className="text-slate-600 mb-6">
              You haven't saved any recipes yet. Analyze some dishes and save them to your library!
            </p>
            <Button onClick={() => navigate('/')}>
              <i className="fas fa-camera mr-2"></i> Analyze a Dish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Filter recipes based on active tab
  const filteredRecipes = activeTab === 'all' 
    ? recipes || [] 
    : activeTab === 'favorites'
      ? (recipes || []).filter((recipe: SavedRecipe) => recipe.favorite)
      : recipes || [];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <SEO 
        title="My Recipe Library | Recipe Snap"
        description="Access your saved recipes, manage your personal collection, and find your favorite dishes in one place."
        canonical="/recipes"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Recipe Library - Recipe Snap",
          "description": "Your personal collection of saved recipes on Recipe Snap",
          "url": `/recipes`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": (recipes || []).slice(0, 10).map((recipe: SavedRecipe, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `/recipes/${recipe.id}`,
              "name": recipe.foodName
            })) || []
          }
        }}
      />
      <h1 className="text-3xl font-bold mb-8 food-gradient-text">My Recipe Library</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg">
            <i className="fas fa-book-open mr-2"></i> All Recipes
          </TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-lg">
            <i className="fas fa-heart mr-2"></i> Favorites
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(renderRecipeCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(renderRecipeCard)
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">
                    <i className="fas fa-heart text-slate-300"></i>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No Favorite Recipes</h2>
                  <p className="text-slate-600 mb-6">
                    You haven't marked any recipes as favorites yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderRecipeCard(recipe: SavedRecipe) {
    const recipeData = recipe.recipeData as any;
    
    return (
      <motion.div
        key={recipe.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col">
          {recipe.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.foodName} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
          
          <CardContent className="p-5 flex-grow flex flex-col">
            <div className="mb-2 flex gap-2 flex-wrap">
              {recipe.tags && recipe.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-slate-100 text-slate-700">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-2 food-gradient-text">{recipe.foodName}</h3>
            <p className="text-slate-600 mb-4 text-sm line-clamp-3 flex-grow">
              {recipe.description}
            </p>
            
            <div className="flex justify-between items-center mt-auto">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  <i className="fas fa-book-open mr-2"></i> View
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-slate-400 hover:text-red-500 hover:bg-transparent"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${recipe.foodName}"? This action cannot be undone.`)) {
                    deleteRecipe(recipe.id);
                  }
                }}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
}