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
  type IngredientGroup
} from '@shared/schema';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { fireConfettiFromElement, celebrateRecipeCompletion, triggerConfetti } from '@/lib/confetti';

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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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
            <TabsList className="grid grid-cols-6 mb-6 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="instructions" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-list-ol mr-2"></i> Instructions
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-apple-alt mr-2"></i> Nutrition
              </TabsTrigger>
              <TabsTrigger value="techniques" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-utensils mr-2"></i> Techniques
              </TabsTrigger>
              <TabsTrigger value="cultural" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-globe-americas mr-2"></i> Culture
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-video mr-2"></i> Videos
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-history mr-2"></i> History
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
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-lg font-semibold mb-3 food-gradient-text">Ingredients</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="min-w-4 pt-0.5">
                          <i className="fas fa-check-circle text-primary"></i>
                        </div>
                        <span>
                          {/* Parse JSON if ingredient looks like a stringified object */}
                          {(() => {
                            // Check if it starts with { character (for potentially stringified JSON objects)
                            if (ingredient.startsWith('{') && ingredient.endsWith('}')) {
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
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
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
                              if (step.startsWith('{') && step.endsWith('}')) {
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
            </TabsContent>
            
            {/* Tab 2: Nutritional Information */}
            <TabsContent value="nutrition">
              {selectedRecipe.nutritionInfo ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-50">
                      <CardHeader className="py-3 px-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-chart-pie text-primary"></i>
                          <CardTitle className="text-md font-medium">Nutrition Facts</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4 px-4">
                        {/* Calories with visual indicator */}
                        {selectedRecipe.nutritionInfo.calories && (
                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold text-slate-800">Calories</span>
                              <span className="font-bold text-primary">{selectedRecipe.nutritionInfo.calories}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full">
                              <div 
                                className="h-2 bg-primary rounded-full" 
                                style={{ 
                                  width: `${Math.min(100, (selectedRecipe.nutritionInfo.calories / 2000) * 100)}%` 
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-slate-500">0</span>
                              <span className="text-xs text-slate-500">% of 2000 cal daily value</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Macronutrients with styled bars */}
                        <div className="space-y-3">
                          {selectedRecipe.nutritionInfo.protein && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-slate-700">
                                  <i className="fas fa-dumbbell text-xs mr-1 text-blue-500"></i> Protein
                                </span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.protein}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                          )}
                          
                          {selectedRecipe.nutritionInfo.carbs && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-slate-700">
                                  <i className="fas fa-bread-slice text-xs mr-1 text-amber-500"></i> Carbs
                                </span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.carbs}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                              </div>
                            </div>
                          )}
                          
                          {selectedRecipe.nutritionInfo.fats && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-slate-700">
                                  <i className="fas fa-oil-can text-xs mr-1 text-yellow-500"></i> Fats
                                </span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.fats}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                <div className="h-1.5 bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Additional nutrients */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="grid grid-cols-2 gap-3">
                            {selectedRecipe.nutritionInfo.fiber && (
                              <div className="flex flex-col">
                                <span className="text-xs text-slate-500">Fiber</span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.fiber}</span>
                              </div>
                            )}
                            
                            {selectedRecipe.nutritionInfo.sugar && (
                              <div className="flex flex-col">
                                <span className="text-xs text-slate-500">Sugar</span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.sugar}</span>
                              </div>
                            )}
                            
                            {selectedRecipe.nutritionInfo.sodium && (
                              <div className="flex flex-col">
                                <span className="text-xs text-slate-500">Sodium</span>
                                <span className="font-medium">{selectedRecipe.nutritionInfo.sodium}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Vitamins and Minerals */}
                        {selectedRecipe.nutritionInfo.vitamins && selectedRecipe.nutritionInfo.vitamins.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-slate-200">
                            <span className="text-xs font-medium text-slate-500 block mb-2">Vitamins & Minerals</span>
                            <div className="flex flex-wrap gap-1">
                              {selectedRecipe.nutritionInfo.vitamins.map((vitamin, i) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">
                                  {vitamin}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="py-3 px-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-leaf text-green-600"></i>
                          <CardTitle className="text-md font-medium">Dietary Benefits</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4 px-4">
                        {selectedRecipe.nutritionInfo.dietaryNotes && selectedRecipe.nutritionInfo.dietaryNotes.length > 0 ? (
                          <div className="space-y-3">
                            {selectedRecipe.nutritionInfo.dietaryNotes.map((note, i) => (
                              <div key={i} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                                <span className="text-green-600 mt-0.5">
                                  <i className="fas fa-check-circle"></i>
                                </span>
                                <span className="text-slate-700 text-sm">{note}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-40 text-center">
                            <i className="fas fa-seedling text-slate-300 text-3xl mb-2"></i>
                            <p className="text-sm text-slate-500">No dietary notes available</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="py-3 px-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-exchange-alt text-teal-600"></i>
                          <CardTitle className="text-md font-medium">Healthier Alternatives</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4 px-4">
                        {selectedRecipe.nutritionInfo.healthyAlternatives && selectedRecipe.nutritionInfo.healthyAlternatives.length > 0 ? (
                          <div className="space-y-3">
                            {selectedRecipe.nutritionInfo.healthyAlternatives.map((alternative, i) => {
                              // Check if alternative contains "→" or "to" to identify substitution pattern
                              const isSubstitution = alternative.includes('→') || alternative.includes(' to ') || alternative.includes('instead of');
                              
                              if (isSubstitution) {
                                // Parse substitution format
                                let original, replacement;
                                if (alternative.includes('→')) {
                                  [original, replacement] = alternative.split('→').map(s => s.trim());
                                } else if (alternative.includes(' to ')) {
                                  [original, replacement] = alternative.split(' to ').map(s => s.trim());
                                } else if (alternative.includes('instead of')) {
                                  const parts = alternative.split('instead of');
                                  replacement = parts[0].trim();
                                  original = parts[1].trim();
                                } else {
                                  original = alternative;
                                  replacement = '';
                                }
                                
                                return (
                                  <div key={i} className="flex items-center p-2 bg-teal-50 rounded-lg">
                                    <div className="flex-1 truncate text-sm text-slate-700">
                                      {original}
                                    </div>
                                    <div className="mx-2 text-teal-600">
                                      <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="flex-1 truncate text-sm font-medium text-teal-700">
                                      {replacement}
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={i} className="p-2 bg-teal-50 rounded-lg">
                                    <span className="text-sm text-slate-700">{alternative}</span>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-40 text-center">
                            <i className="fas fa-carrot text-slate-300 text-3xl mb-2"></i>
                            <p className="text-sm text-slate-500">No alternatives available</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedRecipe.nutritionInfo.protein && 
                      renderNutritionBadge("Protein", selectedRecipe.nutritionInfo.protein, "medium")}
                    
                    {selectedRecipe.nutritionInfo.carbs && 
                      renderNutritionBadge("Carbs", selectedRecipe.nutritionInfo.carbs, "medium")}
                      
                    {selectedRecipe.nutritionInfo.fats && 
                      renderNutritionBadge("Fats", selectedRecipe.nutritionInfo.fats, "medium")}
                    
                    {selectedRecipe.nutritionInfo.fiber && 
                      renderNutritionBadge("Fiber", selectedRecipe.nutritionInfo.fiber, "low")}
                      
                    {selectedRecipe.nutritionInfo.sugar && 
                      renderNutritionBadge("Sugar", selectedRecipe.nutritionInfo.sugar, "high")}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-info-circle text-3xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">Nutritional information not available for this recipe.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 3: Cooking Techniques */}
            <TabsContent value="techniques" className="space-y-6">
              {/* Equipment Section */}
              {selectedRecipe.equipment && selectedRecipe.equipment.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Required Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRecipe.equipment.map((item, i) => (
                      <Card key={i} className="bg-slate-50 hover:bg-slate-100 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-white p-3 rounded-full text-primary">
                              <i className="fas fa-utensils"></i>
                            </div>
                            <div>
                              <h5 className="font-medium">{item.name}</h5>
                              {item.description && <p className="text-sm text-slate-600 mt-1">{item.description}</p>}
                              
                              {item.alternatives && item.alternatives.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-xs font-medium text-slate-500">Alternatives:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.alternatives.map((alt, j) => (
                                      <Badge key={j} variant="outline" className="text-xs bg-white">
                                        {alt}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {item.difficultyToUse && (
                                <Badge 
                                  variant="outline" 
                                  className={`mt-2 text-xs ${
                                    item.difficultyToUse.toLowerCase().includes('easy') ? 'bg-green-50 text-green-700' : 
                                    item.difficultyToUse.toLowerCase().includes('medium') ? 'bg-yellow-50 text-yellow-700' : 
                                    'bg-red-50 text-red-700'
                                  }`}
                                >
                                  {item.difficultyToUse}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredient Groups */}
              {selectedRecipe.ingredientGroups && selectedRecipe.ingredientGroups.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Ingredient Groups</h4>
                  <div className="space-y-4">
                    {selectedRecipe.ingredientGroups.map((group, i) => (
                      <div key={i} className="p-4 bg-white rounded-lg border border-slate-200">
                        <h5 className="font-medium text-lg mb-2">{group.groupName}</h5>
                        {group.preparationNotes && (
                          <p className="text-sm text-slate-600 mb-3 italic">{group.preparationNotes}</p>
                        )}
                        <ul className="space-y-1">
                          {group.ingredients.map((ingredient, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="text-primary mt-1">
                                <i className="fas fa-check-circle"></i>
                              </span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technique Details */}
              {selectedRecipe.techniqueDetails && selectedRecipe.techniqueDetails.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Professional Techniques</h4>
                  <div className="space-y-4">
                    {selectedRecipe.techniqueDetails.map((technique, i) => (
                      <div key={i} className="p-4 bg-white rounded-lg border border-slate-200">
                        <h5 className="font-medium text-lg text-primary mb-2">{technique.name}</h5>
                        <p className="text-slate-700 mb-3">{technique.description}</p>
                        
                        {technique.visualCues && technique.visualCues.length > 0 && (
                          <div className="mb-3">
                            <h6 className="text-sm font-medium text-slate-700 mb-1">Visual Cues</h6>
                            <ul className="space-y-1">
                              {technique.visualCues.map((cue, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm">
                                  <span className="text-green-500 mt-0.5">
                                    <i className="fas fa-eye"></i>
                                  </span>
                                  <span>{cue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {technique.commonErrors && technique.commonErrors.length > 0 && (
                          <div>
                            <h6 className="text-sm font-medium text-slate-700 mb-1">Common Errors</h6>
                            <ul className="space-y-1">
                              {technique.commonErrors.map((error, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm">
                                  <span className="text-red-500 mt-0.5">
                                    <i className="fas fa-exclamation-triangle"></i>
                                  </span>
                                  <span>{error}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cooking Science */}
              {selectedRecipe.cookingScience && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Science Behind the Recipe</h4>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {selectedRecipe.cookingScience.keyReactions && selectedRecipe.cookingScience.keyReactions.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Key Reactions</h5>
                        <ul className="space-y-2">
                          {selectedRecipe.cookingScience.keyReactions.map((reaction, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">
                                <i className="fas fa-flask"></i>
                              </span>
                              <span>{reaction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.cookingScience.techniquePurpose && selectedRecipe.cookingScience.techniquePurpose.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Why These Techniques Work</h5>
                        <ul className="space-y-2">
                          {selectedRecipe.cookingScience.techniquePurpose.map((purpose, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-500 mt-1">
                                <i className="fas fa-magic"></i>
                              </span>
                              <span>{purpose}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.cookingScience.safetyTips && selectedRecipe.cookingScience.safetyTips.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">Safety Considerations</h5>
                        <ul className="space-y-2">
                          {selectedRecipe.cookingScience.safetyTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">
                                <i className="fas fa-shield-alt"></i>
                              </span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sensory Guidance */}
              {selectedRecipe.sensoryGuidance && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Sensory Guide</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedRecipe.sensoryGuidance.tasteProgression && selectedRecipe.sensoryGuidance.tasteProgression.length > 0 && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-utensils text-yellow-500"></i>
                          <h5 className="font-medium">Taste Progression</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.sensoryGuidance.tasteProgression.map((taste, i) => (
                            <li key={i} className="text-sm">{taste}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.sensoryGuidance.aromaIndicators && selectedRecipe.sensoryGuidance.aromaIndicators.length > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-wind text-green-500"></i>
                          <h5 className="font-medium">Aroma Indicators</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.sensoryGuidance.aromaIndicators.map((aroma, i) => (
                            <li key={i} className="text-sm">{aroma}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.sensoryGuidance.textureDescriptors && selectedRecipe.sensoryGuidance.textureDescriptors.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-hand-paper text-blue-500"></i>
                          <h5 className="font-medium">Texture Profile</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.sensoryGuidance.textureDescriptors.map((texture, i) => (
                            <li key={i} className="text-sm">{texture}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Success Indicators */}
              {selectedRecipe.successIndicators && selectedRecipe.successIndicators.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Success Indicators</h4>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <ul className="space-y-2">
                      {selectedRecipe.successIndicators.map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">
                            <i className="fas fa-check-circle"></i>
                          </span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Tab 4: Cultural Context */}
            <TabsContent value="cultural" className="space-y-6">
              {/* Cultural Context */}
              {selectedRecipe.culturalContext && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Cultural Context</h4>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {selectedRecipe.culturalContext.origin && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2 flex items-center">
                          <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                          Geographic Origin
                        </h5>
                        <p className="text-slate-700">{selectedRecipe.culturalContext.origin}</p>
                      </div>
                    )}
                    
                    {selectedRecipe.culturalContext.history && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2 flex items-center">
                          <i className="fas fa-book-open text-amber-500 mr-2"></i>
                          Historical Background
                        </h5>
                        <p className="text-slate-700">{selectedRecipe.culturalContext.history}</p>
                      </div>
                    )}
                    
                    {selectedRecipe.culturalContext.traditionalServing && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2 flex items-center">
                          <i className="fas fa-concierge-bell text-green-500 mr-2"></i>
                          Traditional Serving
                        </h5>
                        <p className="text-slate-700">{selectedRecipe.culturalContext.traditionalServing}</p>
                      </div>
                    )}
                    
                    {selectedRecipe.culturalContext.festiveRelevance && selectedRecipe.culturalContext.festiveRelevance.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2 flex items-center">
                          <i className="fas fa-calendar-day text-purple-500 mr-2"></i>
                          Festive Significance
                        </h5>
                        <ul className="space-y-1">
                          {selectedRecipe.culturalContext.festiveRelevance.map((occasion, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-1">
                                <i className="fas fa-star"></i>
                              </span>
                              <span>{occasion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Presentation Guidance */}
              {selectedRecipe.presentationGuidance && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Presentation Guide</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedRecipe.presentationGuidance.platingSuggestions && selectedRecipe.presentationGuidance.platingSuggestions.length > 0 && (
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-utensils text-slate-500"></i>
                          <h5 className="font-medium">Plating Ideas</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.presentationGuidance.platingSuggestions.map((suggestion, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-slate-400 mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.presentationGuidance.garnishingTips && selectedRecipe.presentationGuidance.garnishingTips.length > 0 && (
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-leaf text-orange-500"></i>
                          <h5 className="font-medium">Garnishing Tips</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.presentationGuidance.garnishingTips.map((tip, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.presentationGuidance.photoTips && selectedRecipe.presentationGuidance.photoTips.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <i className="fas fa-camera text-blue-500"></i>
                          <h5 className="font-medium">Photography Tips</h5>
                        </div>
                        <ul className="space-y-2">
                          {selectedRecipe.presentationGuidance.photoTips.map((tip, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Meal Planning Notes */}
              {selectedRecipe.mealPlanningNotes && selectedRecipe.mealPlanningNotes.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Meal Planning Suggestions</h4>
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <ul className="space-y-2">
                      {selectedRecipe.mealPlanningNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-500 mt-1">
                            <i className="fas fa-calendar-check"></i>
                          </span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 5: YouTube Videos */}
            <TabsContent value="videos">
              {result.youtubeVideos && result.youtubeVideos.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fas fa-video text-red-600"></i>
                    <h5 className="text-lg font-semibold food-gradient-text">Recipe Tutorial Videos</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.youtubeVideos.map((video, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative cursor-pointer group">
                          <a 
                            href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <img 
                              src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                                <i className="fas fa-play text-white text-2xl"></i>
                              </div>
                            </div>
                          </a>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1 line-clamp-2 hover:text-primary">
                            <a 
                              href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {video.title}
                            </a>
                          </h4>
                          <div className="flex items-center text-sm text-slate-500 mb-2">
                            <i className="fas fa-user-circle mr-1"></i>
                            <span>{video.channelTitle || "YouTube Channel"}</span>
                          </div>
                          {video.description && (
                            <p className="text-sm text-slate-600 line-clamp-2">{video.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-video-slash text-3xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No tutorial videos available for this recipe.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 4: Cooking History */}
            <TabsContent value="history">
              {savedRecipes.length > 0 ? (
                <div className="space-y-4">
                  <h5 className="text-lg font-semibold mb-3 gradient-text">Your Cooking History</h5>
                  <div className="grid grid-cols-1 gap-4">
                    {savedRecipes.map((savedRecipe, index) => (
                      <Card key={index} className="bg-white">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h6 className="font-semibold">{savedRecipe.foodName}</h6>
                              <p className="text-sm text-slate-500 line-clamp-1">{savedRecipe.description}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              className="text-primary"
                              onClick={() => handleLoadSavedRecipe(savedRecipe)}
                            >
                              <i className="fas fa-utensils mr-1"></i> Cook Again
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-history text-3xl text-slate-300 mb-3"></i>
                  <p className="text-slate-500">No cooking history available yet. Recipes you analyze will appear here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            className="bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 rounded-full px-6 py-3"
            onClick={() => {
              // Trigger a small confetti burst when changing images
              triggerConfetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 }
              });
              onTryAnother();
            }}
          >
            <i className="fas fa-redo mr-2"></i> Try Another Image
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
