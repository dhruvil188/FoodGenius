import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import { cn, slugify } from "@/lib/utils";
import { AnalyzeImageResponse } from "@shared/schema";
import SEO from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type ParamTypes = {
  slug: string;
};

export default function RecipePage() {
  const { slug } = useParams<ParamTypes>();
  const [recipe, setRecipe] = useState<AnalyzeImageResponse | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [noRecipe, setNoRecipe] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Find recipe by matching slugified name
    const foundRecipe = expandedRecipes.find(
      (r) => slugify(r.foodName) === slug
    );

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      setNoRecipe(true);
    }

    setIsLoadingAuth(false);
  }, [slug]);

  const toggleStepComplete = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((step) => step !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const saveRecipe = async () => {
    if (!currentUser) {
      setLoginDialogOpen(true);
      return;
    }

    if (!recipe) return;

    try {
      setSaveLoading(true);
      const response = await apiRequest("POST", "/api/recipes", {
        recipe: recipe,
      });
      const result = await response.json();

      toast({
        title: "Recipe Saved!",
        description: "You can find it in your saved recipes collection.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Failed to save recipe",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  if (noRecipe) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-slate-600 mb-8">
            We couldn't find the recipe you're looking for.
          </p>
          <Button onClick={() => setLocation("/library")}>
            Return to Library
          </Button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <SEO
        title={`${recipe.foodName} Recipe | Recipe Snap`}
        description={recipe.description || `Detailed recipe for ${recipe.foodName} with ingredients, instructions, and cooking tips.`}
        canonical={`/recipe/${slug}`}
      />

      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Image and Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg border border-slate-200">
                  {recipe.youtubeVideos && recipe.youtubeVideos.length > 0 && recipe.youtubeVideos[0].thumbnailUrl ? (
                    <img
                      src={recipe.youtubeVideos[0].thumbnailUrl}
                      alt={recipe.foodName}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                      <i className="fas fa-utensils text-6xl text-emerald-500"></i>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 space-y-2">
                    {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].difficulty && (
                      <Badge className={cn(
                        "px-3 py-1.5 text-sm font-medium shadow-md",
                        recipe.recipes[0].difficulty === 'easy' ? "bg-green-100 text-green-800 hover:bg-green-200" :
                        recipe.recipes[0].difficulty === 'medium' ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                        "bg-red-100 text-red-800 hover:bg-red-200"
                      )}>
                        {recipe.recipes[0].difficulty === 'easy' ? (
                          <><i className="fas fa-leaf mr-1.5"></i>Easy</>
                        ) : recipe.recipes[0].difficulty === 'medium' ? (
                          <><i className="fas fa-fire-alt mr-1.5"></i>Medium</>
                        ) : (
                          <><i className="fas fa-pepper-hot mr-1.5"></i>Hard</>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 mb-6 shadow-md">
                  <h1 className="text-3xl font-bold mb-3">{recipe.foodName}</h1>
                  
                  <p className="text-slate-600 mb-4">{recipe.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags && recipe.tags.map((tag, i) => (
                      <Badge 
                        key={i}
                        variant="outline" 
                        className="bg-white hover:bg-slate-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].prepTime && (
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-primary mb-1">
                          <i className="fas fa-clock text-lg"></i>
                        </div>
                        <div className="text-xs text-slate-500 uppercase font-medium">Prep Time</div>
                        <div className="font-medium">{recipe.recipes[0].prepTime}</div>
                      </div>
                    )}
                    
                    {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].cookTime && (
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-orange-500 mb-1">
                          <i className="fas fa-fire text-lg"></i>
                        </div>
                        <div className="text-xs text-slate-500 uppercase font-medium">Cook Time</div>
                        <div className="font-medium">{recipe.recipes[0].cookTime}</div>
                      </div>
                    )}
                    
                    {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].servings && (
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-emerald-500 mb-1">
                          <i className="fas fa-utensils text-lg"></i>
                        </div>
                        <div className="text-xs text-slate-500 uppercase font-medium">Servings</div>
                        <div className="font-medium">{recipe.recipes[0].servings}</div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={saveRecipe}
                    className="w-full mb-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                    disabled={saveLoading || isLoadingAuth}
                  >
                    {saveLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-bookmark mr-2"></i>
                        Save to My Recipes
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setLocation("/library")}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Library
                  </Button>
                </div>
                
                {recipe.youtubeVideos && recipe.youtubeVideos.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <i className="fab fa-youtube text-red-600 mr-2"></i>
                      Related Videos
                    </h3>
                    <div className="space-y-3">
                      {recipe.youtubeVideos.slice(0, 3).map((video, idx) => (
                        <a
                          key={idx}
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <div className="w-16 h-12 flex-shrink-0 bg-slate-200 rounded overflow-hidden mr-3">
                            {video.thumbnailUrl ? (
                              <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <i className="fas fa-play text-slate-400"></i>
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Recipe Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="ingredients" className="w-full">
                <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5 h-auto mb-6">
                  <TabsTrigger value="ingredients" className="py-3">
                    <i className="fas fa-carrot mr-2"></i>
                    <span className="hidden sm:inline">Ingredients</span>
                  </TabsTrigger>
                  <TabsTrigger value="instructions" className="py-3">
                    <i className="fas fa-list-ol mr-2"></i>
                    <span className="hidden sm:inline">Instructions</span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="py-3">
                    <i className="fas fa-lightbulb mr-2"></i>
                    <span className="hidden sm:inline">Notes</span>
                  </TabsTrigger>
                  <TabsTrigger value="variations" className="py-3">
                    <i className="fas fa-random mr-2"></i>
                    <span className="hidden sm:inline">Variations</span>
                  </TabsTrigger>
                  <TabsTrigger value="sides" className="py-3">
                    <i className="fas fa-plus-circle mr-2"></i>
                    <span className="hidden sm:inline">Side Dishes</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Ingredients Tab */}
                <TabsContent value="ingredients" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Ingredients</h2>
                        <Badge variant="outline" className="bg-green-50">
                          <i className="fas fa-users mr-1.5"></i> {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].servings ? recipe.recipes[0].servings : "4"} servings
                        </Badge>
                      </div>
                      
                      {recipe.ingredientGroups && recipe.ingredientGroups.length > 0 ? (
                        <div className="space-y-6">
                          {recipe.ingredientGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                              {group.groupName && (
                                <h3 className="font-semibold text-lg mb-2 text-slate-800 border-b pb-1">
                                  {group.groupName}
                                </h3>
                              )}
                              <ul className="space-y-2">
                                {group.ingredients.map((ingredient, idx) => (
                                  <li 
                                    key={idx} 
                                    className="flex items-start py-1.5 border-b border-dashed border-slate-100 last:border-0"
                                  >
                                    <div className="mr-3 mt-1 text-green-500">
                                      <i className="fas fa-check-circle"></i>
                                    </div>
                                    <span>{ingredient}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500">No ingredients available for this recipe.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Instructions Tab */}
                <TabsContent value="instructions" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Instructions</h2>
                      
                      {recipe.recipes && recipe.recipes.length > 0 && recipe.recipes[0].instructions ? (
                        <div className="relative">
                          <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-green-100 rounded-full"></div>
                          <div className="space-y-8">
                            {recipe.recipes[0].instructions.map((instruction, idx) => (
                              <div key={idx} className="flex group">
                                <button
                                  className={`flex-shrink-0 relative z-10 w-10 h-10 rounded-full mr-5 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                    completedSteps.includes(idx)
                                      ? "bg-green-100 text-green-600 ring-2 ring-green-400"
                                      : "bg-white text-slate-500 ring-1 ring-slate-200 group-hover:ring-green-200"
                                  }`}
                                  onClick={() => toggleStepComplete(idx)}
                                >
                                  {completedSteps.includes(idx) ? (
                                    <i className="fas fa-check"></i>
                                  ) : (
                                    <span className="font-semibold">{idx + 1}</span>
                                  )}
                                </button>
                                <div className={cn(
                                  "bg-white rounded-xl p-4 shadow-sm flex-grow border transition-colors",
                                  completedSteps.includes(idx)
                                    ? "border-green-200 bg-green-50/30"
                                    : "border-slate-100"
                                )}>
                                  <p className={cn(
                                    completedSteps.includes(idx) ? "text-slate-500 line-through decoration-green-500/50" : ""
                                  )}>
                                    {instruction}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-500">No instructions available for this recipe.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Notes Tab */}
                <TabsContent value="notes" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Chef's Notes</h2>
                      
                      {/* Cooking Science */}
                      {recipe.cookingScience && recipe.cookingScience.details && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <i className="fas fa-flask text-purple-500 mr-2"></i>
                            Cooking Science
                          </h3>
                          <Card className="bg-purple-50/50 border-purple-100">
                            <CardContent className="p-4">
                              <p className="text-slate-700">{recipe.cookingScience.details}</p>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      
                      {/* Equipment */}
                      {recipe.equipment && recipe.equipment.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <i className="fas fa-utensils text-slate-500 mr-2"></i>
                            Equipment
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recipe.equipment.map((item, idx) => (
                              <div key={idx} className="bg-white p-3 rounded-lg border flex items-center">
                                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                                  <i className={`fas fa-${
                                    item.name.includes("knife") ? "knife" :
                                    item.name.includes("pot") ? "cooking-pot" :
                                    item.name.includes("pan") ? "frying-pan" :
                                    item.name.includes("bowl") ? "bowl" :
                                    item.name.includes("oven") ? "oven" :
                                    item.name.includes("blender") ? "blender" :
                                    "utensils"
                                  } text-slate-500`}></i>
                                </div>
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  {item.purpose && (
                                    <div className="text-xs text-slate-500">{item.purpose}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Techniques */}
                      {recipe.techniques && recipe.techniques.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <i className="fas fa-hat-chef text-amber-500 mr-2"></i>
                            Key Techniques
                          </h3>
                          <div className="space-y-3">
                            {recipe.techniques.map((technique, idx) => (
                              <Card key={idx} className="bg-amber-50/50 border-amber-100">
                                <CardContent className="p-4">
                                  <h4 className="font-medium mb-1">{technique.name}</h4>
                                  <p className="text-slate-600 text-sm">{technique.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Cultural Context */}
                      {recipe.culturalContext && recipe.culturalContext.origins && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <i className="fas fa-globe-americas text-blue-500 mr-2"></i>
                            Cultural Context
                          </h3>
                          <Card className="bg-blue-50/50 border-blue-100">
                            <CardContent className="p-4">
                              <p className="text-slate-700 mb-2">{recipe.culturalContext.origins}</p>
                              {recipe.culturalContext.significance && (
                                <p className="text-slate-600 text-sm">{recipe.culturalContext.significance}</p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      
                      {/* Sensory Guidance */}
                      {recipe.sensoryGuidance && recipe.sensoryGuidance.visual && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <i className="fas fa-eye text-teal-500 mr-2"></i>
                            Sensory Guidance
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {recipe.sensoryGuidance.visual && (
                              <Card className="bg-teal-50/50 border-teal-100">
                                <CardContent className="p-4">
                                  <h4 className="font-medium mb-1 flex items-center">
                                    <i className="fas fa-eye mr-1.5 text-teal-600"></i>
                                    Visual Cues
                                  </h4>
                                  <p className="text-slate-600 text-sm">{recipe.sensoryGuidance.visual}</p>
                                </CardContent>
                              </Card>
                            )}
                            
                            {recipe.sensoryGuidance.texture && (
                              <Card className="bg-orange-50/50 border-orange-100">
                                <CardContent className="p-4">
                                  <h4 className="font-medium mb-1 flex items-center">
                                    <i className="fas fa-hand-paper mr-1.5 text-orange-600"></i>
                                    Texture Cues
                                  </h4>
                                  <p className="text-slate-600 text-sm">{recipe.sensoryGuidance.texture}</p>
                                </CardContent>
                              </Card>
                            )}
                            
                            {recipe.sensoryGuidance.aroma && (
                              <Card className="bg-purple-50/50 border-purple-100">
                                <CardContent className="p-4">
                                  <h4 className="font-medium mb-1 flex items-center">
                                    <i className="fas fa-wind mr-1.5 text-purple-600"></i>
                                    Aroma Cues
                                  </h4>
                                  <p className="text-slate-600 text-sm">{recipe.sensoryGuidance.aroma}</p>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Variations Tab */}
                <TabsContent value="variations" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Recipe Variations</h2>
                      
                      {recipe.variations && recipe.variations.length > 0 ? (
                        <div className="space-y-6">
                          {recipe.variations.map((variation, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                              <h3 className="text-lg font-semibold mb-2">{variation.name}</h3>
                              <p className="text-slate-600 mb-4">{variation.description}</p>
                              
                              {variation.keyChanges && variation.keyChanges.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm uppercase tracking-wider text-slate-500 mb-2">Key Changes:</h4>
                                  <ul className="space-y-1.5">
                                    {variation.keyChanges.map((change, changeIdx) => (
                                      <li key={changeIdx} className="flex items-start">
                                        <div className="mr-2 text-amber-500">
                                          <i className="fas fa-arrow-right"></i>
                                        </div>
                                        <span className="text-slate-700">{change}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500">No variations available for this recipe.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Side Dishes Tab */}
                <TabsContent value="sides" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Recommended Side Dishes</h2>
                      
                      {recipe.sideDishes && recipe.sideDishes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {recipe.sideDishes.map((side, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                              <h3 className="text-lg font-semibold mb-2">{side.name}</h3>
                              <p className="text-slate-600 mb-3">{side.description}</p>
                              
                              <div className="flex items-center gap-3 text-sm">
                                {side.pairingReason && (
                                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                                    <i className="fas fa-check-circle mr-1.5"></i>
                                    {side.pairingReason}
                                  </span>
                                )}
                                
                                {side.prepTime && (
                                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                                    <i className="fas fa-clock mr-1.5"></i>
                                    {side.prepTime}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500">No side dishes recommended for this recipe.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to log in to save recipes to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => setLocation("/auth")}>
              Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}