import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { type SavedRecipe, type AnalyzeImageResponse } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { triggerConfetti } from '@/lib/confetti';
import { motion } from 'framer-motion';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("instructions");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  // Fetch the recipe data
  const { 
    data: recipe, 
    isLoading, 
    error 
  } = useQuery<SavedRecipe>({
    queryKey: ["/api/recipes", parseInt(id)],
    enabled: !!user && !!id,
  });
  
  // Parse the recipe data from the JSON field
  const recipeData: AnalyzeImageResponse | null = recipe?.recipeData as any;
  
  // Handle delete recipe mutation
  const deleteRecipeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", `/api/recipes/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Recipe Deleted",
        description: "The recipe has been removed from your library",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      navigate('/recipes');
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete recipe",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle favorite toggle mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PATCH", `/api/recipes/${id}/favorite`);
      return response.json();
    },
    onSuccess: (updatedRecipe: SavedRecipe) => {
      toast({
        title: updatedRecipe.favorite ? "Added to Favorites" : "Removed from Favorites",
        description: `${recipe?.foodName} has been ${updatedRecipe.favorite ? 'added to' : 'removed from'} your favorites`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes", parseInt(id)] });
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      
      if (updatedRecipe.favorite) {
        triggerConfetti();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating favorites",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Toggle step completion
  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps(prev => {
      const updated = new Set(prev);
      if (updated.has(stepIndex)) {
        updated.delete(stepIndex);
      } else {
        updated.add(stepIndex);
        
        // Check if all steps are completed
        const selectedRecipe = recipeData?.recipes[0];
        if (selectedRecipe && updated.size === selectedRecipe.instructions.length) {
          setTimeout(() => {
            triggerConfetti();
            toast({
              title: "Recipe Complete! 🎉",
              description: "Great job! You've completed all the cooking steps.",
              duration: 5000,
            });
          }, 300);
        }
      }
      return updated;
    });
  };
  
  // Handle delete confirmation
  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe? This action cannot be undone.")) {
      deleteRecipeMutation.mutate();
    }
  };
  
  // Not logged in state
  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-slate-600 mb-6">Please sign in to view this recipe.</p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <Skeleton className="w-full md:w-1/3 h-64 rounded-lg" />
            <div className="w-full md:w-2/3">
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !recipe || !recipeData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4 text-red-500">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Recipe Not Found</h2>
            <p className="text-slate-600 mb-6">
              Sorry, we couldn't find this recipe. It may have been deleted or doesn't exist.
            </p>
            <Button onClick={() => navigate('/recipes')}>Go to Recipe Library</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Success state - display the recipe
  const selectedRecipe = recipeData.recipes[0]; // Use the first recipe
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/recipes')}
            className="text-slate-600"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Library
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant={recipe.favorite ? "default" : "outline"}
              onClick={() => toggleFavoriteMutation.mutate()}
              disabled={toggleFavoriteMutation.isPending}
            >
              {toggleFavoriteMutation.isPending ? (
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <i className={`${recipe.favorite ? 'fas' : 'far'} fa-heart mr-2`}></i>
              )}
              {recipe.favorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
            
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={confirmDelete}
              disabled={deleteRecipeMutation.isPending}
            >
              {deleteRecipeMutation.isPending ? (
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-red-600 border-t-transparent rounded-full"></div>
              ) : (
                <i className="fas fa-trash-alt mr-2"></i>
              )}
              Delete
            </Button>
          </div>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-lg mb-8">
          <CardContent className="p-6">
            <motion.div 
              className="flex flex-col md:flex-row items-start gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full md:w-1/3">
                {recipe.imageUrl ? (
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.foodName} 
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 md:h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-utensils text-4xl text-slate-300"></i>
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <Badge variant="outline" className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
                  Saved Recipe
                </Badge>
                
                <h2 className="text-2xl font-bold font-heading mb-2 food-gradient-text">{recipe.foodName}</h2>
                <p className="text-slate-600 mb-4">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags && recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center space-x-4 text-sm text-slate-500">
                  {selectedRecipe.prepTime && (
                    <div>
                      <i className="fas fa-clock mr-1"></i> {selectedRecipe.prepTime}
                    </div>
                  )}
                  {selectedRecipe.difficulty && (
                    <div>
                      <i className="fas fa-fire mr-1"></i> {selectedRecipe.difficulty}
                    </div>
                  )}
                  {selectedRecipe.servings && (
                    <div>
                      <i className="fas fa-user-friends mr-1"></i> Serves {selectedRecipe.servings}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Tabs for Recipe Details */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
              <TabsList className="flex overflow-x-auto mb-6 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 no-scrollbar">
                <TabsTrigger 
                  value="instructions" 
                  className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1"
                >
                  <i className="fas fa-list-ol mr-2"></i> Instructions
                </TabsTrigger>
                <TabsTrigger 
                  value="ingredients" 
                  className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1"
                >
                  <i className="fas fa-shopping-basket mr-2"></i> Ingredients
                </TabsTrigger>
                {selectedRecipe.variations && selectedRecipe.variations.length > 0 && (
                  <TabsTrigger 
                    value="variations" 
                    className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1"
                  >
                    <i className="fas fa-random mr-2"></i> Variations
                  </TabsTrigger>
                )}
                {selectedRecipe.sideDishSuggestions && selectedRecipe.sideDishSuggestions.length > 0 && (
                  <TabsTrigger 
                    value="sides" 
                    className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> Side Dishes
                  </TabsTrigger>
                )}
                {recipeData.youtubeVideos && recipeData.youtubeVideos.length > 0 && (
                  <TabsTrigger 
                    value="videos" 
                    className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1"
                  >
                    <i className="fas fa-video mr-2"></i> Videos
                  </TabsTrigger>
                )}
              </TabsList>
              
              {/* Tab Content: Instructions */}
              <TabsContent value="instructions" className="space-y-4">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 food-gradient-text">Cooking Instructions</h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div 
                          className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium mt-0.5
                            ${completedSteps.has(i) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-slate-100 text-slate-700'}`}
                          onClick={() => toggleStepCompletion(i)}
                        >
                          {completedSteps.has(i) ? (
                            <i className="fas fa-check"></i>
                          ) : (
                            i + 1
                          )}
                        </div>
                        <div 
                          className={`flex-1 ${completedSteps.has(i) ? 'line-through text-slate-400' : ''}`}
                          onClick={() => toggleStepCompletion(i)}
                        >
                          {instruction}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                
                {selectedRecipe.chefTips && selectedRecipe.chefTips.length > 0 && (
                  <div className="bg-amber-50 rounded-lg border border-amber-100 p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      <i className="fas fa-lightbulb mr-2"></i> Chef's Tips
                    </h4>
                    <ul className="space-y-2 text-amber-800">
                      {selectedRecipe.chefTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <i className="fas fa-check-circle mt-1 text-amber-500"></i>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              {/* Tab Content: Ingredients */}
              <TabsContent value="ingredients" className="space-y-4">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 food-gradient-text">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          id={`ingredient-${i}`} 
                          className="mt-1 rounded text-primary focus:ring-primary"
                        />
                        <label htmlFor={`ingredient-${i}`} className="cursor-pointer">
                          {typeof ingredient === 'string' && ingredient.startsWith('{') 
                            ? JSON.parse(ingredient).item || ingredient
                            : ingredient
                          }
                        </label>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Shopping Options</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        onClick={() => window.open('https://www.instacart.com', '_blank')}
                      >
                        <i className="fas fa-shopping-cart mr-2"></i> Instacart
                      </Button>
                      <Button 
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        onClick={() => window.open('https://www.amazon.com/fresh', '_blank')}
                      >
                        <i className="fab fa-amazon mr-2"></i> Amazon Fresh
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab Content: Variations */}
              <TabsContent value="variations" className="space-y-4">
                {selectedRecipe.variations && selectedRecipe.variations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRecipe.variations.map((variation, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">
                            {variation.type.charAt(0).toUpperCase() + variation.type.slice(1)} Variation
                          </h4>
                          <p className="text-sm text-slate-600 mb-3">{variation.description}</p>
                          
                          <h5 className="text-sm font-medium mb-1">Adjustments:</h5>
                          <ul className="text-sm space-y-1 list-disc pl-5">
                            {variation.adjustments.map((adjustment, j) => (
                              <li key={j}>{adjustment}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <i className="fas fa-info-circle text-2xl mb-2"></i>
                    <p>No variations available for this recipe.</p>
                  </div>
                )}
              </TabsContent>
              
              {/* Tab Content: Side Dishes */}
              <TabsContent value="sides" className="space-y-4">
                {selectedRecipe.sideDishSuggestions && selectedRecipe.sideDishSuggestions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRecipe.sideDishSuggestions.map((side, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{side.name}</h4>
                          {side.description && (
                            <p className="text-sm text-slate-600 mb-2">{side.description}</p>
                          )}
                          
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                            {side.preparationTime && (
                              <div><i className="fas fa-clock mr-1"></i> {side.preparationTime}</div>
                            )}
                            {side.pairingReason && (
                              <div><i className="fas fa-info-circle mr-1"></i> {side.pairingReason}</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <i className="fas fa-info-circle text-2xl mb-2"></i>
                    <p>No side dish suggestions available for this recipe.</p>
                  </div>
                )}
              </TabsContent>
              
              {/* Tab Content: Videos */}
              <TabsContent value="videos" className="space-y-4">
                {recipeData.youtubeVideos && recipeData.youtubeVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recipeData.youtubeVideos.map((video, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="aspect-video relative">
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                              <i className="fas fa-video text-4xl text-slate-400"></i>
                            </div>
                          )}
                          
                          <Button 
                            className="absolute inset-0 w-full h-full bg-black/30 hover:bg-black/50 text-white"
                            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                          >
                            <div className="flex flex-col items-center">
                              <i className="fab fa-youtube text-4xl mb-2"></i>
                              <span>Watch on YouTube</span>
                            </div>
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-1">{video.title}</h4>
                          {video.channelTitle && (
                            <p className="text-sm text-slate-500">{video.channelTitle}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <i className="fas fa-info-circle text-2xl mb-2"></i>
                    <p>No videos available for this recipe.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}