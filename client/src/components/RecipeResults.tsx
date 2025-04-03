import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  type AnalyzeImageResponse, 
  type NutritionInfo, 
  type RecipeVariation, 
  type SideDish, 
  type YoutubeVideo, 
  type EquipmentItem,
  type TechniqueDetail,
  type CulturalContext,
  type PresentationGuidance,
  type CookingScience,
  type SensoryGuidance,
  type IngredientGroup,
  type SavedRecipe
} from '@shared/schema';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { fireConfettiFromElement, celebrateRecipeCompletion, triggerConfetti } from '@/lib/confetti';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface RecipeResultsProps {
  result: AnalyzeImageResponse;
  imageUrl: string;
  onTryAnother: () => void;
}

export default function RecipeResults({ result, imageUrl, onTryAnother }: RecipeResultsProps) {
  // Always use the first (original) recipe
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("instructions");
  const [completedSteps, setCompletedSteps] = useState<Record<number, Set<number>>>({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<AnalyzeImageResponse[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  
  // Initialize completed steps for each recipe
  useEffect(() => {
    const initialCompletedSteps: Record<number, Set<number>> = {};
    result.recipes.forEach((_, index) => {
      initialCompletedSteps[index] = new Set();
    });
    setCompletedSteps(initialCompletedSteps);
    
    // Load saved recipes from localStorage
    const savedRecipesJson = localStorage.getItem('dishDetectiveSavedRecipes');
    if (savedRecipesJson) {
      try {
        const savedRecipes = JSON.parse(savedRecipesJson);
        setSavedRecipes(savedRecipes);
      } catch (error) {
        console.error('Error loading saved recipes:', error);
      }
    }
    
    // Add current recipe to history
    saveToHistory(result);
  }, [result]);
  
  const saveToHistory = (recipeData: AnalyzeImageResponse) => {
    // Check if recipe already exists to avoid duplicates
    const exists = savedRecipes.some(recipe => recipe.foodName === recipeData.foodName);
    if (!exists) {
      const updatedHistory = [...savedRecipes, recipeData].slice(-10); // Keep last 10 recipes
      setSavedRecipes(updatedHistory);
      localStorage.setItem('dishDetectiveSavedRecipes', JSON.stringify(updatedHistory));
    }
  };
  
  // Reference to the checkbox elements for confetti
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  
  const toggleStepCompletion = (recipeIndex: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const newCompletedSteps = { ...prev };
      const isCompleting = !newCompletedSteps[recipeIndex].has(stepIndex);
      
      if (isCompleting) {
        // Adding a completed step
        newCompletedSteps[recipeIndex].add(stepIndex);
        
        // Trigger confetti from the checkbox element if available
        const stepElement = stepRefs.current[stepIndex];
        if (stepElement) {
          fireConfettiFromElement(stepElement);
        }
        
        // If this completes the recipe, celebrate
        const totalSteps = selectedRecipe.instructions.length;
        if (newCompletedSteps[recipeIndex].size === totalSteps) {
          setTimeout(() => {
            celebrateRecipeCompletion();
            toast({
              title: "Recipe Complete! 🎉",
              description: "Great job! You've completed all the cooking steps.",
              duration: 5000,
            });
          }, 300);
        }
      } else {
        // Removing a completed step
        newCompletedSteps[recipeIndex].delete(stepIndex);
      }
      
      return newCompletedSteps;
    });
  };
  
  const calculateProgress = (recipeIndex: number, totalSteps: number) => {
    if (!completedSteps[recipeIndex]) return 0;
    return (completedSteps[recipeIndex].size / totalSteps) * 100;
  };
  
  const selectedRecipe = result.recipes[selectedRecipeIndex];
  const totalInstructions = selectedRecipe.instructions.length;
  const currentProgress = calculateProgress(selectedRecipeIndex, totalInstructions);
  
  const getVariationStyles = (variation: string) => {
    if (variation === selectedVariation) {
      return "bg-primary text-white";
    }
    switch (variation) {
      case 'spicy': return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'buttery': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case 'non-spicy': return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  const renderNutritionBadge = (label: string, value: string | number | undefined, type: 'high' | 'medium' | 'low' = 'medium') => {
    if (!value) return null;
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    
    return (
      <div className={`${colors[type]} px-3 py-1 rounded-full text-xs font-medium`}>
        {label}: {value}
      </div>
    );
  };
  
  // Mutation to save a recipe to the user's library
  const saveRecipeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/recipes", { recipe: result });
      return response.json();
    },
    onSuccess: (savedRecipe: SavedRecipe) => {
      setIsSaved(true);
      toast({
        title: "Recipe Saved",
        description: `${result.foodName} has been saved to your library`,
      });
      // Invalidate recipes query to refresh the library
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      
      // Trigger confetti celebration
      triggerConfetti();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save recipe",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to delete a recipe from the user's library
  const deleteRecipeMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      const response = await apiRequest("DELETE", `/api/recipes/${recipeId}`);
      return response.json();
    },
    onSuccess: () => {
      setIsSaved(false);
      toast({
        title: "Recipe Removed",
        description: `${result.foodName} has been removed from your library`,
      });
      // Invalidate recipes query to refresh the library
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove recipe",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSaveRecipe = () => {
    if (!isSaved) {
      saveRecipeMutation.mutate();
    }
  };

  const handleLoadSavedRecipe = (savedRecipe: AnalyzeImageResponse) => {
    toast({
      title: "Recipe Loaded",
      description: `Loaded recipe for ${savedRecipe.foodName}`,
    });
    
    // In a real app, this would replace the current result with the saved one
    // For now, we'll just switch to the first tab
    setSelectedTab("instructions");
  };
  
  return (
    <motion.section 
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-2xl shadow-lg mb-8">
        <CardContent className="p-6">
          <motion.div 
            className="flex flex-col md:flex-row items-start gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-1/3">
              <img 
                src={imageUrl} 
                alt={result.foodName} 
                className="w-full h-48 md:h-64 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <Badge variant="outline" className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
                Identified Dish
              </Badge>
              
              <h3 className="text-2xl font-bold font-heading mb-2 food-gradient-text">{result.foodName}</h3>
              <p className="text-slate-600 mb-4">{result.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {result.tags.map((tag, index) => (
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
          
          {/* Recipe Selection - Only keep the first (original) recipe */}
          {false && result.recipes.length > 1 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Choose a Recipe:</h4>
              <div className="flex flex-wrap gap-2">
                {/* Only show the first recipe (index 0) */}
                <Button
                  key={0}
                  variant="default"
                  className="rounded-full"
                >
                  {result.recipes[0].title}
                </Button>
              </div>
            </div>
          )}
          
          {/* Recipe Variations */}
          {selectedRecipe.variations && selectedRecipe.variations.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Recipe Variations:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.variations.map((variation, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className={`cursor-pointer ${getVariationStyles(variation.type)}`}
                    onClick={() => setSelectedVariation(
                      selectedVariation === variation.type ? null : variation.type
                    )}
                  >
                    {variation.type === 'spicy' && <i className="fas fa-pepper-hot mr-1"></i>}
                    {variation.type === 'buttery' && <i className="fas fa-cheese mr-1"></i>}
                    {variation.type === 'non-spicy' && <i className="fas fa-snowflake mr-1"></i>}
                    {variation.type.charAt(0).toUpperCase() + variation.type.slice(1)}
                  </Badge>
                ))}
              </div>
              
              {/* Show selected variation details */}
              {selectedVariation && selectedRecipe.variations && (
                <motion.div 
                  className="mt-3 p-3 bg-slate-50 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedRecipe.variations.filter(v => v.type === selectedVariation).map((variation, index) => (
                    <div key={index}>
                      <p className="font-medium mb-2">{variation.description}</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {variation.adjustments.map((adjustment, i) => (
                          <li key={i}>{adjustment}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
          
          {/* Tabbed Interface */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
            <TabsList className="flex overflow-x-auto mb-6 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 no-scrollbar">
              <TabsTrigger 
                value="instructions" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-list-ol mr-2"></i> Instructions
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-apple-alt mr-2"></i> Nutrition
              </TabsTrigger>
              <TabsTrigger 
                value="techniques" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-utensils mr-2"></i> Techniques
              </TabsTrigger>
              <TabsTrigger 
                value="cultural" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-globe-americas mr-2"></i> Guide
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-video mr-2"></i> Videos
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-history mr-2"></i> History
              </TabsTrigger>
              <TabsTrigger 
                value="health" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-heartbeat mr-2"></i> Health
              </TabsTrigger>
              <TabsTrigger 
                value="cost" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-tag mr-2"></i> Cost
              </TabsTrigger>
            </TabsList>
            
            {/* Tab 1: Step-by-Step Instructions */}
            <TabsContent value="instructions" className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold">Recipe Progress</h5>
                  <span className="text-sm text-slate-600">{completedSteps[selectedRecipeIndex]?.size || 0}/{totalInstructions} steps</span>
                </div>
                <Progress value={currentProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Ingredients */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                    <h5 className="text-lg font-semibold mb-4 food-gradient-text">Ingredients</h5>
                    
                    {/* Standard list of ingredients */}
                    <ul className="space-y-2">
                      {selectedRecipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Checkbox 
                            id={`ingredient-${selectedRecipeIndex}-${i}`}
                            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label 
                            htmlFor={`ingredient-${selectedRecipeIndex}-${i}`}
                            className="text-sm cursor-pointer flex items-start gap-1"
                          >
                            <span className="font-medium text-slate-600 min-w-5">
                              {i + 1}.
                            </span>
                            <span>
                              {/* Parse JSON if ingredient looks like a stringified object */}
                              {(() => {
                                // Check if it starts with { character (for potentially stringified JSON objects)
                                if (typeof ingredient === 'string' && ingredient.startsWith('{') && ingredient.endsWith('}')) {
                                  try {
                                    const parsedIngredient = JSON.parse(ingredient);
                                    
                                    // Handle ingredient objects with specific fields (common format from Gemini API)
                                    if (parsedIngredient.item && parsedIngredient.quantity) {
                                      let formattedIngredient = `${parsedIngredient.quantity} ${parsedIngredient.item}`;
                                      
                                      // Add preparation note if available
                                      if (parsedIngredient.prep && parsedIngredient.prep !== "null") {
                                        formattedIngredient += `, ${parsedIngredient.prep}`;
                                      }
                                      
                                      return formattedIngredient;
                                    }
                                    
                                    // For other formats, try to extract the most meaningful data
                                    return parsedIngredient.name || parsedIngredient.text || 
                                          parsedIngredient.description || parsedIngredient.ingredient || 
                                          JSON.stringify(parsedIngredient);
                                  } catch (e) {
                                    // If parsing fails, just return the original string
                                    return ingredient;
                                  }
                                } else {
                                  return ingredient;
                                }
                              })()}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Grocery Buttons */}
                    <div className="mt-5 flex flex-col space-y-2">
                      <h6 className="text-sm font-semibold mb-1">Get Groceries:</h6>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="w-full bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                          onClick={() => window.open('https://www.ubereats.com', '_blank')}
                        >
                          <i className="fas fa-shopping-basket mr-2"></i>
                          Uber Eats
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                          onClick={() => window.open('https://www.amazon.com/fresh', '_blank')}
                        >
                          <i className="fas fa-shopping-cart mr-2"></i>
                          Amazon Fresh
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column - Instructions */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h5 className="text-lg font-semibold mb-3 food-gradient-text">Cooking Instructions</h5>
                    <ol className="space-y-4">
                      {selectedRecipe.instructions.map((step, i) => (
                        <motion.li 
                          key={i}
                          className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                            completedSteps[selectedRecipeIndex]?.has(i) 
                              ? 'bg-green-50 text-green-900' 
                              : 'bg-white'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <div 
                            className="mt-0.5"
                            ref={(el) => {
                              // Store reference to the checkbox container
                              stepRefs.current[i] = el;
                            }}
                          >
                            <Checkbox 
                              checked={completedSteps[selectedRecipeIndex]?.has(i)}
                              onCheckedChange={() => toggleStepCompletion(selectedRecipeIndex, i)}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </div>
                          <div>
                            <p className={completedSteps[selectedRecipeIndex]?.has(i) ? 'line-through opacity-70' : ''}>
                              {/* Parse JSON if step looks like a stringified object */}
                              {(() => {
                                if (typeof step === 'string' && step.startsWith('{') && step.endsWith('}')) {
                                  try {
                                    const parsedStep = JSON.parse(step);
                                    
                                    // For instruction objects with number and instruction fields
                                    if (parsedStep.number && parsedStep.instruction) {
                                      return parsedStep.instruction;
                                    }
                                    
                                    // For step objects with specific fields
                                    if (parsedStep.action && parsedStep.ingredients) {
                                      let formattedStep = parsedStep.action;
                                      
                                      // Include ingredients if available
                                      if (Array.isArray(parsedStep.ingredients) && parsedStep.ingredients.length > 0) {
                                        formattedStep += ` ${parsedStep.ingredients.join(', ')}`;
                                      } else if (typeof parsedStep.ingredients === 'string') {
                                        formattedStep += ` ${parsedStep.ingredients}`;
                                      }
                                      
                                      // Add any additional details
                                      if (parsedStep.duration) {
                                        formattedStep += ` for ${parsedStep.duration}`;
                                      }
                                      
                                      return formattedStep;
                                    }
                                    
                                    // For other formats, try to extract the most meaningful data
                                    return parsedStep.text || parsedStep.description || 
                                          parsedStep.instruction || parsedStep.step || 
                                          JSON.stringify(parsedStep);
                                  } catch (e) {
                                    // If parsing fails, just return the original string
                                    return step;
                                  }
                                } else {
                                  return step;
                                }
                              })()}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Chef Tips Section if available */}
                  {selectedRecipe.chefTips && selectedRecipe.chefTips.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="fas fa-lightbulb text-amber-500"></i>
                        <h5 className="text-lg font-semibold food-gradient-text">Chef's Pro Tips</h5>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <ul className="space-y-2">
                          {selectedRecipe.chefTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">
                                <i className="fas fa-star"></i>
                              </span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Common Mistakes to Avoid */}
                  {selectedRecipe.commonMistakes && selectedRecipe.commonMistakes.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="fas fa-exclamation-triangle text-orange-500"></i>
                        <h5 className="text-lg font-semibold food-gradient-text">Common Mistakes to Avoid</h5>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <ul className="space-y-2">
                          {selectedRecipe.commonMistakes.map((mistake, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">
                                <i className="fas fa-times-circle"></i>
                              </span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Storage & Reheating */}
                  {(selectedRecipe.storageInstructions || selectedRecipe.reheatingMethods) && (
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedRecipe.storageInstructions && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-archive text-blue-600"></i>
                            <h5 className="font-semibold">Storage Instructions</h5>
                          </div>
                          <p className="text-slate-700">{selectedRecipe.storageInstructions}</p>
                        </div>
                      )}
                      
                      {selectedRecipe.reheatingMethods && (
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                          <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-temperature-high text-orange-600"></i>
                            <h5 className="font-semibold">Reheating Methods</h5>
                          </div>
                          <p className="text-slate-700">{selectedRecipe.reheatingMethods}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Beverage Pairings */}
                  {selectedRecipe.beveragePairings && selectedRecipe.beveragePairings.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="fas fa-wine-glass-alt text-purple-600"></i>
                        <h5 className="text-lg font-semibold food-gradient-text">Beverage Pairings</h5>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="flex flex-wrap gap-2">
                          {selectedRecipe.beveragePairings.map((beverage, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="bg-white border border-purple-200 text-purple-800 py-1.5 px-3"
                            >
                              <i className="fas fa-glass-cheers mr-1"></i> {beverage}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Side Dish Suggestions */}
                  {selectedRecipe.sideDishSuggestions && selectedRecipe.sideDishSuggestions.length > 0 && (
                    <div className="mt-8">
                      <h5 className="text-lg font-semibold mb-3 food-gradient-text">Recommended Side Dishes</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedRecipe.sideDishSuggestions.map((sideDish, i) => (
                          <Card key={i} className="bg-slate-50 hover:bg-slate-100 transition-colors">
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-md font-medium">{sideDish.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              {sideDish.description && (
                                <p className="text-sm text-slate-600 mb-2">{sideDish.description}</p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {sideDish.preparationTime && (
                                  <Badge variant="outline" className="text-xs">
                                    <i className="fas fa-clock mr-1"></i> {sideDish.preparationTime}
                                  </Badge>
                                )}
                                {sideDish.pairingReason && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                    <i className="fas fa-check-circle mr-1"></i> {sideDish.pairingReason}
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 2: Nutritional Information */}
            <TabsContent value="nutrition">
              {selectedRecipe.nutritionInfo ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Calories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold food-gradient-text">
                          {selectedRecipe.nutritionInfo.calories || 'N/A'}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">per serving</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Protein</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold food-gradient-text">
                          {selectedRecipe.nutritionInfo.protein || 'N/A'}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">per serving</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Carbohydrates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold food-gradient-text">
                          {selectedRecipe.nutritionInfo.carbohydrates || 'N/A'}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">per serving</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="food-gradient-text">Macronutrients</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Fat</span>
                              <span className="text-sm text-slate-500">{selectedRecipe.nutritionInfo.fat || 'N/A'}</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Saturated Fat</span>
                              <span className="text-sm text-slate-500">{selectedRecipe.nutritionInfo.saturatedFat || 'N/A'}</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Fiber</span>
                              <span className="text-sm text-slate-500">{selectedRecipe.nutritionInfo.fiber || 'N/A'}</span>
                            </div>
                            <Progress value={25} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Sugar</span>
                              <span className="text-sm text-slate-500">{selectedRecipe.nutritionInfo.sugar || 'N/A'}</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="food-gradient-text">Vitamins & Minerals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedRecipe.nutritionInfo.vitamins && selectedRecipe.nutritionInfo.vitamins.map((vitamin, index) => (
                            <Badge key={index} variant="outline" className="justify-center py-1.5 bg-slate-50">
                              {vitamin}
                            </Badge>
                          ))}
                          
                          {selectedRecipe.nutritionInfo.minerals && selectedRecipe.nutritionInfo.minerals.map((mineral, index) => (
                            <Badge key={index} variant="outline" className="justify-center py-1.5 bg-slate-50">
                              {mineral}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Dietary Information */}
                  {selectedRecipe.nutritionInfo.dietaryInfo && selectedRecipe.nutritionInfo.dietaryInfo.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-3 food-gradient-text">Dietary Information</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipe.nutritionInfo.dietaryInfo.map((info, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="py-1.5 px-3"
                          >
                            {info === 'Vegetarian' && <i className="fas fa-leaf text-green-600 mr-1"></i>}
                            {info === 'Vegan' && <i className="fas fa-seedling text-green-600 mr-1"></i>}
                            {info === 'Gluten-Free' && <i className="fas fa-ban text-red-600 mr-1"></i>}
                            {info === 'Dairy-Free' && <i className="fas fa-cheese text-yellow-600 mr-1"></i>}
                            {info === 'Low Carb' && <i className="fas fa-bread-slice text-orange-600 mr-1"></i>}
                            {info === 'Keto' && <i className="fas fa-bacon text-red-600 mr-1"></i>}
                            {info}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <i className="fas fa-info-circle text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No nutritional information available for this recipe.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 3: Techniques */}
            <TabsContent value="techniques">
              <div className="space-y-8">
                {/* No Techniques Available Message */}
                {(!selectedRecipe.equipment || selectedRecipe.equipment.length === 0) && 
                 (!selectedRecipe.techniqueDetails || selectedRecipe.techniqueDetails.length === 0) && 
                 (!selectedRecipe.cookingScience) && 
                 (!selectedRecipe.equipmentNeeded || selectedRecipe.equipmentNeeded.length === 0) &&
                 (!selectedRecipe.techniques || selectedRecipe.techniques.length === 0) && (
                  <div className="p-8 text-center">
                    <div className="mb-4 text-slate-400">
                      <i className="fas fa-utensils text-6xl"></i>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 food-gradient-text">Techniques Not Available</h4>
                    <p className="text-slate-600 max-w-lg mx-auto">
                      Detailed cooking techniques and equipment information are not available for this recipe.
                      You can still follow the step-by-step instructions to prepare this delicious dish!
                    </p>
                  </div>
                )}
                
                {/* Equipment and Tools */}
                {selectedRecipe.equipmentNeeded && selectedRecipe.equipmentNeeded.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4 food-gradient-text">Equipment & Tools</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRecipe.equipmentNeeded.map((equipment, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <span className="text-green-600 mt-0.5">
                            <i className="fas fa-utensil-spoon"></i>
                          </span>
                          <div>
                            <h5 className="text-md font-medium">{equipment.name}</h5>
                            {equipment.purpose && (
                              <p className="text-sm text-slate-600 mt-1">{equipment.purpose}</p>
                            )}
                            {equipment.alternatives && (
                              <div className="mt-2">
                                <span className="text-xs text-slate-500">Alternatives: </span>
                                <span className="text-xs font-medium">{equipment.alternatives}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Cooking Techniques */}
                {selectedRecipe.techniques && selectedRecipe.techniques.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 food-gradient-text">Key Cooking Techniques</h4>
                    <div className="space-y-4">
                      {selectedRecipe.techniques.map((technique, i) => (
                        <Card key={i} className="overflow-hidden">
                          <CardHeader className="p-4 pb-2 bg-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <i className="fas fa-fire-alt text-amber-500"></i>
                              {technique.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-3">
                            <p className="text-slate-700 mb-3">{technique.description}</p>
                            
                            {technique.tips && technique.tips.length > 0 && (
                              <div className="mt-3">
                                <h6 className="text-sm font-medium mb-2">Tips for Success:</h6>
                                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                  {technique.tips.map((tip, tipIndex) => (
                                    <li key={tipIndex}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Kitchen Science */}
                {selectedRecipe.cookingScience && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 food-gradient-text">Kitchen Science</h4>
                    <Card className="bg-blue-50 border border-blue-100">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-blue-600 text-xl mt-1">
                            <i className="fas fa-flask"></i>
                          </span>
                          <div>
                            <h5 className="text-lg font-medium text-blue-800 mb-2">Key Reactions</h5>
                            {selectedRecipe.cookingScience.keyReactions && selectedRecipe.cookingScience.keyReactions.length > 0 && (
                              <div className="mb-4">
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                  {selectedRecipe.cookingScience.keyReactions.map((reaction, index) => (
                                    <li key={index}>{reaction}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {selectedRecipe.cookingScience.techniquePurpose && selectedRecipe.cookingScience.techniquePurpose.length > 0 && (
                              <div className="mb-4">
                                <h6 className="text-sm font-medium mb-2">Technique Purpose:</h6>
                                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                  {selectedRecipe.cookingScience.techniquePurpose.map((purpose, index) => (
                                    <li key={index}>{purpose}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {selectedRecipe.cookingScience.safetyTips && selectedRecipe.cookingScience.safetyTips.length > 0 && (
                              <div className="mt-4 bg-white p-3 rounded-lg">
                                <h6 className="text-sm font-medium mb-2">Safety Tips:</h6>
                                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                  {selectedRecipe.cookingScience.safetyTips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Sensory Guidance */}
                {selectedRecipe.sensoryGuidance && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4 food-gradient-text">Sensory Cooking Guide</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Visual Cues */}
                      {selectedRecipe.sensoryGuidance.visualCues && (
                        <Card className="border-l-4 border-l-yellow-400">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center gap-2">
                              <i className="fas fa-eye text-yellow-500"></i> Visual Cues
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-700">{selectedRecipe.sensoryGuidance.visualCues}</p>
                          </CardContent>
                        </Card>
                      )}
                      
                      {/* Aroma Indicators */}
                      {selectedRecipe.sensoryGuidance.aromaIndicators && (
                        <Card className="border-l-4 border-l-purple-400">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center gap-2">
                              <i className="fas fa-nose text-purple-500"></i> Aroma Indicators
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-700">{selectedRecipe.sensoryGuidance.aromaIndicators}</p>
                          </CardContent>
                        </Card>
                      )}
                      
                      {/* Texture Indicators */}
                      {selectedRecipe.sensoryGuidance.textureIndicators && (
                        <Card className="border-l-4 border-l-blue-400">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center gap-2">
                              <i className="fas fa-hand-paper text-blue-500"></i> Texture Indicators
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-700">{selectedRecipe.sensoryGuidance.textureIndicators}</p>
                          </CardContent>
                        </Card>
                      )}
                      
                      {/* Sound Cues */}
                      {selectedRecipe.sensoryGuidance.soundCues && (
                        <Card className="border-l-4 border-l-green-400">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center gap-2">
                              <i className="fas fa-volume-up text-green-500"></i> Sound Cues
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-700">{selectedRecipe.sensoryGuidance.soundCues}</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Tab 4: Cultural Context */}
            <TabsContent value="cultural">
              {selectedRecipe.culturalContext ? (
                <div className="space-y-6">
                  {/* Origin and History */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="food-gradient-text flex items-center gap-2">
                        <i className="fas fa-map-marker-alt"></i> Origin & History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedRecipe.culturalContext.origin && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Origin</h5>
                          <p className="text-slate-700">{selectedRecipe.culturalContext.origin}</p>
                        </div>
                      )}
                      
                      {selectedRecipe.culturalContext.history && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Historical Background</h5>
                          <p className="text-slate-700">{selectedRecipe.culturalContext.history}</p>
                        </div>
                      )}
                      
                      {selectedRecipe.culturalContext.significance && (
                        <div>
                          <h5 className="font-medium mb-2">Cultural Significance</h5>
                          <p className="text-slate-700">{selectedRecipe.culturalContext.significance}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Traditional Serving Context */}
                  {selectedRecipe.culturalContext.traditionalServing && (
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="food-gradient-text flex items-center gap-2">
                          <i className="fas fa-utensils"></i> Traditional Serving
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700 mb-4">{selectedRecipe.culturalContext.traditionalServing}</p>
                        
                        {selectedRecipe.culturalContext.occasions && (
                          <div className="mt-4">
                            <h5 className="font-medium mb-3">Occasions & Celebrations</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedRecipe.culturalContext.occasions.map((occasion, i) => (
                                <Badge key={i} variant="outline" className="py-1 px-3 bg-slate-50">
                                  {occasion}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Presentation Guidance */}
                  {selectedRecipe.presentationGuidance && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-4 food-gradient-text">Presentation Guidance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Plating Suggestions */}
                        {selectedRecipe.presentationGuidance.platingSuggestions && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-md flex items-center gap-2">
                                <i className="fas fa-palette text-purple-500"></i> Plating Suggestions
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-700">{selectedRecipe.presentationGuidance.platingSuggestions}</p>
                            </CardContent>
                          </Card>
                        )}
                        
                        {/* Garnishing */}
                        {selectedRecipe.presentationGuidance.garnishIdeas && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-md flex items-center gap-2">
                                <i className="fas fa-leaf text-green-500"></i> Garnish Ideas
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-700">{selectedRecipe.presentationGuidance.garnishIdeas}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Regional Variations */}
                  {selectedRecipe.culturalContext.regionalVariations && selectedRecipe.culturalContext.regionalVariations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-4 food-gradient-text">Regional Variations</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedRecipe.culturalContext.regionalVariations.map((variation, i) => (
                          <Card key={i} className="bg-slate-50 hover:bg-slate-100 transition-colors">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{variation.region}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-700">{variation.description}</p>
                              
                              {variation.uniqueIngredients && (
                                <div className="mt-3">
                                  <h6 className="text-sm font-medium mb-2">Unique Ingredients:</h6>
                                  <div className="flex flex-wrap gap-1.5">
                                    {variation.uniqueIngredients.map((ingredient, index) => (
                                      <Badge key={index} variant="outline" className="bg-white">
                                        {ingredient}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <i className="fas fa-globe text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No cultural context available for this recipe.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 5: YouTube Videos */}
            <TabsContent value="videos">
              {result.youtubeVideos && result.youtubeVideos.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {result.youtubeVideos.map((video, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                          <a 
                            href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                                <i className="fas fa-play text-white text-xl"></i>
                              </div>
                            </div>
                          </a>
                        </div>
                        <CardContent className="p-4">
                          <a 
                            href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            <h4 className="font-medium text-lg line-clamp-2 mb-1">{video.title}</h4>
                          </a>
                          <div className="flex items-center text-sm text-slate-500 mb-2">
                            <span>{video.channelTitle}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <i className="fas fa-video text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No video tutorials available for this recipe.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 6: Recipe History */}
            <TabsContent value="history">
              {savedRecipes.length > 0 ? (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold mb-4">Your Recently Viewed Recipes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {savedRecipes.map((savedRecipe, index) => (
                      <Card 
                        key={index}
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleLoadSavedRecipe(savedRecipe)}
                      >
                        <div className="aspect-square bg-slate-100 relative">
                          {/* We don't have the actual image URL from history, so using a placeholder */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center text-white">
                            <i className="fas fa-utensils text-4xl"></i>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h5 className="font-medium line-clamp-1">{savedRecipe.foodName}</h5>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{savedRecipe.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {savedRecipe.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs py-0 px-1">
                                {tag}
                              </Badge>
                            ))}
                            {savedRecipe.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs py-0 px-1">
                                +{savedRecipe.tags.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <i className="fas fa-history text-4xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No recipe history available yet. Analyze more dishes to build your history!</p>
                </div>
              )}
            </TabsContent>
            
            {/* Health Benefits Tab */}
            <TabsContent value="health">
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 food-gradient-text">Health Benefits</h4>
                <Card className="bg-white rounded-lg shadow-sm">
                  <CardContent className="p-6">
                    {/* Key Nutrients Section */}
                    <div className="mb-6">
                      <h5 className="text-lg font-medium mb-3">Key Health Benefits</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Generate 6 health benefit cards based on recipe ingredients */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-green-100 p-2 rounded-full">
                              <i className="fas fa-heart text-green-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Heart Health</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("salmon") || 
                             result.foodName.toLowerCase().includes("fish") || 
                             result.foodName.toLowerCase().includes("avocado") || 
                             result.foodName.toLowerCase().includes("olive") ?
                              "Rich in omega-3 fatty acids and healthy unsaturated fats that may help reduce inflammation and lower risk of heart disease." :
                              "Contains nutrients that support cardiovascular function and may help maintain healthy cholesterol levels."}
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-blue-100 p-2 rounded-full">
                              <i className="fas fa-brain text-blue-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Brain Function</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("fish") || 
                             result.foodName.toLowerCase().includes("berry") || 
                             result.foodName.toLowerCase().includes("nut") || 
                             result.foodName.toLowerCase().includes("green") ?
                              "Contains antioxidants and essential fatty acids that support cognitive health and may improve memory and brain function." :
                              "Provides nutrients that support overall brain health and proper nervous system function."}
                          </p>
                        </div>
                        
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                              <i className="fas fa-dumbbell text-indigo-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Muscle Recovery</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("chicken") || 
                             result.foodName.toLowerCase().includes("beef") || 
                             result.foodName.toLowerCase().includes("protein") || 
                             result.foodName.toLowerCase().includes("fish") ?
                              "High-quality protein helps repair and build muscle tissue, supporting recovery after exercise and maintaining muscle mass." :
                              "Contains nutrients that aid in muscle function and recovery after physical activity."}
                          </p>
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-amber-100 p-2 rounded-full">
                              <i className="fas fa-shield-alt text-amber-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Immune Support</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("garlic") || 
                             result.foodName.toLowerCase().includes("citrus") || 
                             result.foodName.toLowerCase().includes("ginger") || 
                             result.foodName.toLowerCase().includes("vegetable") ?
                              "Contains compounds with antimicrobial and immune-boosting properties that help the body defend against infections." :
                              "Provides nutrients that support immune system function and help protect against seasonal illness."}
                          </p>
                        </div>
                        
                        <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-pink-100 p-2 rounded-full">
                              <i className="fas fa-seedling text-pink-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Digestive Health</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("fiber") || 
                             result.foodName.toLowerCase().includes("vegetable") || 
                             result.foodName.toLowerCase().includes("whole grain") || 
                             result.foodName.toLowerCase().includes("yogurt") ?
                              "High in dietary fiber and beneficial compounds that promote healthy digestion and support gut microbiome balance." :
                              "Contains elements that aid digestion and support a healthy digestive system."}
                          </p>
                        </div>
                        
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 bg-teal-100 p-2 rounded-full">
                              <i className="fas fa-eye text-teal-600 text-lg"></i>
                            </div>
                            <h6 className="font-semibold">Antioxidant Protection</h6>
                          </div>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("berry") || 
                             result.foodName.toLowerCase().includes("vegetable") || 
                             result.foodName.toLowerCase().includes("spice") || 
                             result.foodName.toLowerCase().includes("herb") ?
                              "Rich in antioxidants that help neutralize harmful free radicals and may reduce cellular damage and inflammation." :
                              "Contains compounds that provide antioxidant protection and support overall cellular health."}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dietary Info Section */}
                    <div className="mb-6">
                      <h5 className="text-lg font-medium mb-3">Dietary Considerations</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {/* Dynamic generation based on ingredients */}
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <div className="text-2xl mb-1 text-green-600">
                            <i className={`fas ${result.foodName.toLowerCase().includes("vegetable") || 
                                               result.foodName.toLowerCase().includes("salad") || 
                                               result.foodName.toLowerCase().includes("vegan") ? 
                                               'fa-check-circle' : 'fa-info-circle'}`}></i>
                          </div>
                          <h6 className="font-medium text-sm">Vegetarian</h6>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.foodName.toLowerCase().includes("meat") || 
                              result.foodName.toLowerCase().includes("chicken") || 
                              result.foodName.toLowerCase().includes("beef") || 
                              result.foodName.toLowerCase().includes("pork") || 
                              result.foodName.toLowerCase().includes("fish") || 
                              result.foodName.toLowerCase().includes("salmon") ? 
                              "Contains animal products" : "Plant-based ingredients"}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <div className="text-2xl mb-1 text-amber-600">
                            <i className={`fas ${result.foodName.toLowerCase().includes("wheat") || 
                                              result.foodName.toLowerCase().includes("bread") || 
                                              result.foodName.toLowerCase().includes("pasta") || 
                                              result.foodName.toLowerCase().includes("flour") ? 
                                              'fa-times-circle' : 'fa-check-circle'}`}></i>
                          </div>
                          <h6 className="font-medium text-sm">Gluten-Free</h6>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.foodName.toLowerCase().includes("wheat") || 
                              result.foodName.toLowerCase().includes("bread") || 
                              result.foodName.toLowerCase().includes("pasta") || 
                              result.foodName.toLowerCase().includes("flour") ? 
                              "Contains gluten ingredients" : "No obvious gluten sources"}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <div className="text-2xl mb-1 text-blue-600">
                            <i className={`fas ${result.foodName.toLowerCase().includes("milk") || 
                                             result.foodName.toLowerCase().includes("cheese") || 
                                             result.foodName.toLowerCase().includes("cream") || 
                                             result.foodName.toLowerCase().includes("butter") || 
                                             result.foodName.toLowerCase().includes("yogurt") ? 
                                             'fa-times-circle' : 'fa-check-circle'}`}></i>
                          </div>
                          <h6 className="font-medium text-sm">Dairy-Free</h6>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.foodName.toLowerCase().includes("milk") || 
                              result.foodName.toLowerCase().includes("cheese") || 
                              result.foodName.toLowerCase().includes("cream") || 
                              result.foodName.toLowerCase().includes("butter") || 
                              result.foodName.toLowerCase().includes("yogurt") ? 
                              "Contains dairy products" : "No obvious dairy ingredients"}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <div className="text-2xl mb-1 text-rose-600">
                            <i className={`fas ${result.foodName.toLowerCase().includes("nut") || 
                                              result.foodName.toLowerCase().includes("peanut") || 
                                              result.foodName.toLowerCase().includes("almond") || 
                                              result.foodName.toLowerCase().includes("cashew") ? 
                                              'fa-exclamation-triangle' : 'fa-check-circle'}`}></i>
                          </div>
                          <h6 className="font-medium text-sm">Nut Allergens</h6>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.foodName.toLowerCase().includes("nut") || 
                              result.foodName.toLowerCase().includes("peanut") || 
                              result.foodName.toLowerCase().includes("almond") || 
                              result.foodName.toLowerCase().includes("cashew") ? 
                              "Contains nuts or traces" : "No obvious nut ingredients"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recommended For Section */}
                    <div>
                      <h5 className="text-lg font-medium mb-3">Ideal For</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-green-500">
                          <h6 className="font-medium mb-1">Fitness Enthusiasts</h6>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("protein") || 
                             result.foodName.toLowerCase().includes("chicken") || 
                             result.foodName.toLowerCase().includes("fish") || 
                             result.foodName.toLowerCase().includes("lean") ?
                             "High protein content supports muscle recovery and growth after training sessions." :
                             "Balanced macronutrients help fuel fitness activities and support recovery."}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500">
                          <h6 className="font-medium mb-1">Weight Management</h6>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("salad") || 
                             result.foodName.toLowerCase().includes("vegetable") || 
                             result.foodName.toLowerCase().includes("lean") || 
                             result.foodName.toLowerCase().includes("grilled") ?
                             "Lower in calories while being nutrient-dense and satisfying to support healthy weight goals." : 
                             "Can be incorporated into a balanced diet with portion control for weight management."}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-purple-500">
                          <h6 className="font-medium mb-1">Active Families</h6>
                          <p className="text-sm text-slate-600">
                            {result.foodName.toLowerCase().includes("comfort") || 
                             result.foodName.toLowerCase().includes("pasta") || 
                             result.foodName.toLowerCase().includes("rice") || 
                             result.foodName.toLowerCase().includes("bowl") ?
                             "Provides essential nutrients and energy for active family members of all ages." :
                             "Contains balanced nutrients that support energy levels and overall health for busy families."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Cost Estimation Tab */}
            <TabsContent value="cost">
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 food-gradient-text">Cost Estimation</h4>
                <Card className="bg-white rounded-lg shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h5 className="text-lg font-medium mb-2">Budget Classification</h5>
                      
                      <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                        {/* Dynamic cost indicator */}
                        {(() => {
                          // Classify recipes based on ingredients and complexity
                          const hasExpensiveIngredients = selectedRecipe.ingredients.some(i => 
                            i.toLowerCase().includes("steak") || 
                            i.toLowerCase().includes("salmon") || 
                            i.toLowerCase().includes("shrimp") || 
                            i.toLowerCase().includes("prawn") ||
                            i.toLowerCase().includes("saffron") ||
                            i.toLowerCase().includes("truffle") ||
                            i.toLowerCase().includes("crab") ||
                            i.toLowerCase().includes("lobster")
                          );
                          
                          const hasMediumIngredients = selectedRecipe.ingredients.some(i => 
                            i.toLowerCase().includes("chicken") || 
                            i.toLowerCase().includes("cheese") || 
                            i.toLowerCase().includes("nuts") ||
                            i.toLowerCase().includes("wine") ||
                            i.toLowerCase().includes("beef")
                          );
                          
                          let costCategory;
                          let fillWidth;
                          let fillColor;
                          let costLabel;

                          if (hasExpensiveIngredients) {
                            costCategory = "Premium";
                            fillWidth = "w-full";
                            fillColor = "bg-red-500";
                            costLabel = "High-cost recipe with premium ingredients";
                          } else if (hasMediumIngredients) {
                            costCategory = "Moderate";
                            fillWidth = "w-2/3";
                            fillColor = "bg-amber-500";
                            costLabel = "Medium-cost recipe with standard ingredients";
                          } else {
                            costCategory = "Budget-friendly";
                            fillWidth = "w-1/3";
                            fillColor = "bg-green-500";
                            costLabel = "Low-cost recipe with economical ingredients";
                          }
                          
                          return (
                            <>
                              <div className={`absolute top-0 left-0 h-full ${fillWidth} ${fillColor}`}></div>
                              <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-3">
                                <span className="text-xs font-medium text-white">Budget</span>
                                <span className="text-xs font-medium text-white">Moderate</span>
                                <span className="text-xs font-medium text-white">Premium</span>
                              </div>
                              <div className="mt-2 flex items-center">
                                <div className="flex items-center">
                                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${fillColor}`}></span>
                                  <span className="font-medium">{costCategory}</span>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="text-md font-medium mb-3 border-b pb-2">Cost-Saving Tips</h5>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h6 className="font-medium text-green-800 mb-2">Shopping Strategy</h6>
                          <ul className="list-disc pl-5 space-y-2 text-slate-700">
                            <li>Buy seasonal ingredients for better value</li>
                            <li>Check discount supermarkets for basic ingredients</li>
                            <li>Look for "reduced to clear" items for perishables</li>
                            <li>Consider frozen alternatives for out-of-season produce</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h6 className="font-medium text-blue-800 mb-2">Main Cost Contributors</h6>
                          <div className="space-y-1">
                            {selectedRecipe.ingredients.slice(0, 5).map((ingredient, index) => (
                              <div key={index} className="flex items-center py-1">
                                {index < 3 ? 
                                  <span className="text-red-500 mr-2"><i className="fas fa-exclamation-circle"></i></span> :
                                  <span className="text-amber-500 mr-2"><i className="fas fa-exclamation-triangle"></i></span>
                                }
                                <span className="text-slate-700">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            <i className="fas fa-info-circle mr-1"></i> 
                            Red items typically contribute most to overall cost. Consider substitutes below for savings.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-md font-medium mb-3 border-b pb-2">Cheaper Alternatives</h5>
                      <div className="space-y-4">
                        {/* Generate 3 random cheaper alternatives */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium">
                              <span className="mr-2">
                                <i className="fas fa-exchange-alt text-blue-600"></i>
                              </span>
                              Replace {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("beef"))
                                ? "beef"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("chicken")) 
                                  ? "chicken breast"
                                  : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("cheese"))
                                    ? "specialty cheese"
                                    : "fresh herbs"
                              } with {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("beef"))
                                ? "turkey mince"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("chicken")) 
                                  ? "chicken thighs"
                                  : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("cheese"))
                                    ? "regular cheddar"
                                    : "dried herbs"
                              }
                            </h6>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Save £{(Math.random() * 2.5 + 2).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {
                              selectedRecipe.ingredients.some(i => i.toLowerCase().includes("beef"))
                              ? "Turkey mince is leaner and cheaper while still providing protein."
                              : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("chicken")) 
                                ? "Chicken thighs are more flavorful and often significantly cheaper."
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("cheese"))
                                  ? "Regular cheddar works well in most recipes at a fraction of the cost."
                                  : "Dried herbs last longer and are more economical for everyday cooking."
                            }
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium">
                              <span className="mr-2">
                                <i className="fas fa-exchange-alt text-blue-600"></i>
                              </span>
                              Use {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("shrimp") || i.toLowerCase().includes("prawn"))
                                ? "frozen prawns"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("berr")) 
                                  ? "frozen berries"
                                  : "seasonal vegetables"
                              } instead of {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("shrimp") || i.toLowerCase().includes("prawn"))
                                ? "fresh prawns"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("berr")) 
                                  ? "fresh berries"
                                  : "out-of-season produce"
                              }
                            </h6>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Save £{(Math.random() * 2 + 2).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {
                              selectedRecipe.ingredients.some(i => i.toLowerCase().includes("shrimp") || i.toLowerCase().includes("prawn"))
                              ? "Frozen prawns are just as nutritious and much more affordable."
                              : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("berr")) 
                                ? "Frozen berries are picked at peak ripeness and often cheaper."
                                : "Seasonal vegetables are both cheaper and more flavorful."
                            }
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium">
                              <span className="mr-2">
                                <i className="fas fa-exchange-alt text-blue-600"></i>
                              </span>
                              Buy {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("rice") || i.toLowerCase().includes("pasta") || i.toLowerCase().includes("grain"))
                                ? "rice/pasta in bulk"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("spice")) 
                                  ? "whole spices"
                                  : "store brand ingredients"
                              } instead of {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("rice") || i.toLowerCase().includes("pasta") || i.toLowerCase().includes("grain"))
                                ? "small packages"
                                : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("spice")) 
                                  ? "pre-ground spices"
                                  : "premium brands"
                              }
                            </h6>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Save £{(Math.random() * 2 + 1.5).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {
                              selectedRecipe.ingredients.some(i => i.toLowerCase().includes("rice") || i.toLowerCase().includes("pasta") || i.toLowerCase().includes("grain"))
                              ? "Buying staples in bulk can save up to 50% on per-serving cost."
                              : selectedRecipe.ingredients.some(i => i.toLowerCase().includes("spice")) 
                                ? "Whole spices last longer and provide better flavor when freshly ground."
                                : "Store brands often contain identical ingredients at lower prices."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              onClick={handleSaveRecipe} 
              className="rounded-full bg-green-600 hover:bg-green-700 text-white" 
              disabled={isSaved || saveRecipeMutation.isPending}
            >
              {saveRecipeMutation.isPending ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-heart mr-2"></i> Save Recipe
                </>
              )}
            </Button>
            <Button onClick={onTryAnother} className="rounded-full">
              <i className="fas fa-camera mr-2"></i> Try Another Dish
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}