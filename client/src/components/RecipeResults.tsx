import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type AnalyzeImageResponse, type NutritionInfo, type RecipeVariation, type SideDish } from '@shared/schema';
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
          
          {/* Recipe Selection */}
          {result.recipes.length > 1 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Choose a Recipe:</h4>
              <div className="flex flex-wrap gap-2">
                {result.recipes.map((recipe, index) => (
                  <Button
                    key={index}
                    variant={selectedRecipeIndex === index ? "default" : "outline"}
                    onClick={() => setSelectedRecipeIndex(index)}
                    className="rounded-full"
                  >
                    {recipe.title}
                  </Button>
                ))}
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
            <TabsList className="grid grid-cols-3 mb-6 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="instructions" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-list-ol mr-2"></i> Instructions
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="flex items-center rounded-full data-[state=active]:shadow-md">
                <i className="fas fa-apple-alt mr-2"></i> Nutrition
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
                
                {/* Side Dish Suggestions */}
                {selectedRecipe.sideDishSuggestions && selectedRecipe.sideDishSuggestions.length > 0 && (
                  <div className="mt-8">
                    <h5 className="text-lg font-semibold mb-3 food-gradient-text">Recommended Side Dishes</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedRecipe.sideDishSuggestions.map((sideDish, i) => (
                        <Card key={i} className="bg-slate-50">
                          <CardHeader className="py-3 px-4">
                            <CardTitle className="text-md font-medium">{sideDish.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="py-2 px-4">
                            {sideDish.description && (
                              <p className="text-sm text-slate-600 mb-2">{sideDish.description}</p>
                            )}
                            {sideDish.preparationTime && (
                              <Badge variant="outline" className="text-xs">
                                <i className="fas fa-clock mr-1"></i> {sideDish.preparationTime}
                              </Badge>
                            )}
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
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-md font-medium">Nutrition Facts</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <ul className="space-y-2">
                          {selectedRecipe.nutritionInfo.calories && (
                            <li className="flex justify-between">
                              <span className="font-medium">Calories:</span>
                              <span>{selectedRecipe.nutritionInfo.calories}</span>
                            </li>
                          )}
                          {selectedRecipe.nutritionInfo.protein && (
                            <li className="flex justify-between">
                              <span>Protein:</span>
                              <span>{selectedRecipe.nutritionInfo.protein}</span>
                            </li>
                          )}
                          {selectedRecipe.nutritionInfo.carbs && (
                            <li className="flex justify-between">
                              <span>Carbs:</span>
                              <span>{selectedRecipe.nutritionInfo.carbs}</span>
                            </li>
                          )}
                          {selectedRecipe.nutritionInfo.fats && (
                            <li className="flex justify-between">
                              <span>Fats:</span>
                              <span>{selectedRecipe.nutritionInfo.fats}</span>
                            </li>
                          )}
                          {selectedRecipe.nutritionInfo.fiber && (
                            <li className="flex justify-between">
                              <span>Fiber:</span>
                              <span>{selectedRecipe.nutritionInfo.fiber}</span>
                            </li>
                          )}
                          {selectedRecipe.nutritionInfo.sugar && (
                            <li className="flex justify-between">
                              <span>Sugar:</span>
                              <span>{selectedRecipe.nutritionInfo.sugar}</span>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-md font-medium">Dietary Notes</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        {selectedRecipe.nutritionInfo.dietaryNotes && selectedRecipe.nutritionInfo.dietaryNotes.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedRecipe.nutritionInfo.dietaryNotes.map((note, i) => (
                              <li key={i} className="text-sm">{note}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500">No dietary notes available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50">
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-md font-medium">Healthier Alternatives</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        {selectedRecipe.nutritionInfo.healthyAlternatives && selectedRecipe.nutritionInfo.healthyAlternatives.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedRecipe.nutritionInfo.healthyAlternatives.map((alternative, i) => (
                              <li key={i} className="text-sm">{alternative}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500">No alternatives available</p>
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
            
            {/* Tab 3: Cooking History */}
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
