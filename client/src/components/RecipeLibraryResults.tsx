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

interface RecipeLibraryResultsProps {
  result: AnalyzeImageResponse;
  imageUrl: string;
  onTryAnother: () => void;
}

export default function RecipeLibraryResults({ result, imageUrl, onTryAnother }: RecipeLibraryResultsProps) {
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
  }, [result.recipes]);
  
  const selectedRecipe = selectedVariation 
    ? { 
        ...result.recipes[selectedRecipeIndex], 
        title: `${result.recipes[selectedRecipeIndex].title} (${selectedVariation} Variation)`,
        instructions: result.recipes[selectedRecipeIndex].variations?.find(v => v.type === selectedVariation)?.adjustments || result.recipes[selectedRecipeIndex].instructions 
      } 
    : result.recipes[selectedRecipeIndex];
  
  const totalInstructions = selectedRecipe.instructions.length;
  
  const currentProgress = totalInstructions > 0
    ? (completedSteps[selectedRecipeIndex]?.size / totalInstructions) * 100
    : 0;
    
  // Toggle completion status of a step
  const toggleStepCompletion = (stepIndex: number) => {
    const newCompletedSteps = { ...completedSteps };
    if (newCompletedSteps[selectedRecipeIndex].has(stepIndex)) {
      newCompletedSteps[selectedRecipeIndex].delete(stepIndex);
    } else {
      newCompletedSteps[selectedRecipeIndex].add(stepIndex);
      
      // Fire confetti from the clicked step
      const stepElement = document.getElementById(`step-${stepIndex}`);
      if (stepElement) {
        fireConfettiFromElement(stepElement);
      }
      
      // If all steps are complete, celebrate!
      if (newCompletedSteps[selectedRecipeIndex].size === totalInstructions) {
        setTimeout(() => {
          celebrateRecipeCompletion();
          toast({
            title: "Recipe Complete!",
            description: `You've completed the ${selectedRecipe.title} recipe!`,
          });
        }, 500);
      }
    }
    setCompletedSteps(newCompletedSteps);
  };
  
  // Toggle completion status of an ingredient
  const toggleIngredientCompletion = (groupIndex: number, ingredientIndex: number) => {
    // This doesn't affect the progress bar, just visual indicator
    const ingredientElement = document.getElementById(`ingredient-${groupIndex}-${ingredientIndex}`);
    if (ingredientElement) {
      // Add a subtle animation when checked
      triggerConfetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6, x: 0.5 },
      });
    }
  };
  
  const saveToHistory = (recipeData: AnalyzeImageResponse) => {
    // In a real app with auth, this would save to a user's history
    // For the demo, we'll just show a toast
    toast({
      title: "Recipe Saved",
      description: `Saved ${recipeData.foodName} to your collection`,
    });
    
    // Add to local state for demo purposes
    setSavedRecipes(prev => [...prev, recipeData]);
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
                Recipe Library
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
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => saveToHistory(result)}
                  className="flex items-center gap-2"
                >
                  <i className="fas fa-heart text-red-500"></i>
                  Save Recipe
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onTryAnother}
                  className="flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Back to Library
                </Button>
              </div>
            </div>
          </motion.div>
          
          <Tabs defaultValue="instructions" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full mb-6 bg-slate-100 p-1 overflow-x-auto no-scrollbar flex flex-nowrap">
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
                value="health" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-heartbeat mr-2"></i> Health Benefits
              </TabsTrigger>
              <TabsTrigger 
                value="cost" 
                className="flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 flex-shrink-0 mr-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <i className="fas fa-pound-sign mr-2"></i> Cost Estimation
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
                    {!selectedRecipe.ingredientGroups && (
                      <ul className="space-y-2">
                        {selectedRecipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex h-6 items-center">
                              <Checkbox 
                                id={`ingredient-0-${i}`}
                                onCheckedChange={() => toggleIngredientCompletion(0, i)}
                              />
                            </div>
                            <label
                              htmlFor={`ingredient-0-${i}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {ingredient}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Grouped ingredients */}
                    {selectedRecipe.ingredientGroups && (
                      <div className="space-y-6">
                        {selectedRecipe.ingredientGroups.map((group, groupIndex) => (
                          <div key={groupIndex}>
                            {group.groupName && (
                              <h6 className="font-medium text-sm mb-2 text-slate-700 border-b pb-1">
                                {group.groupName}
                              </h6>
                            )}
                            <ul className="space-y-2">
                              {group.ingredients.map((ingredient, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="flex h-6 items-center">
                                    <Checkbox 
                                      id={`ingredient-${groupIndex}-${i}`}
                                      onCheckedChange={() => toggleIngredientCompletion(groupIndex, i)}
                                    />
                                  </div>
                                  <label
                                    htmlFor={`ingredient-${groupIndex}-${i}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {ingredient}
                                  </label>
                                </li>
                              ))}
                            </ul>
                            {group.preparationNotes && (
                              <p className="mt-2 text-xs text-slate-500 italic">{group.preparationNotes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Show variations if available */}
                    {result.recipes[selectedRecipeIndex].variations && result.recipes[selectedRecipeIndex].variations.length > 0 && (
                      <div className="mt-6">
                        <h6 className="font-medium text-sm mb-3">Recipe Variations</h6>
                        <div className="space-y-2">
                          <div 
                            className={`p-2 rounded-md cursor-pointer ${!selectedVariation ? 'bg-green-50 border border-green-200' : 'bg-slate-50 hover:bg-slate-100'}`}
                            onClick={() => setSelectedVariation(null)}
                          >
                            <p className="text-sm font-medium">Original Recipe</p>
                          </div>
                          {result.recipes[selectedRecipeIndex].variations.map((variation, i) => (
                            <div 
                              key={i}
                              className={`p-2 rounded-md cursor-pointer ${selectedVariation === variation.type ? 'bg-green-50 border border-green-200' : 'bg-slate-50 hover:bg-slate-100'}`}
                              onClick={() => setSelectedVariation(variation.type)}
                            >
                              <p className="text-sm font-medium">{variation.type}</p>
                              <p className="text-xs text-slate-600">{variation.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right column - Step by Step Instructions */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                    <h5 className="text-lg font-semibold mb-4 food-gradient-text">Step by Step Instructions</h5>
                    <ol className="space-y-6">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li 
                          key={index} 
                          id={`step-${index}`}
                          className={`relative pl-8 ${completedSteps[selectedRecipeIndex]?.has(index) ? 'text-slate-400' : 'text-slate-800'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-6 items-center absolute left-0 top-0">
                              <Checkbox 
                                id={`step-${index}-checkbox`}
                                checked={completedSteps[selectedRecipeIndex]?.has(index)}
                                onCheckedChange={() => toggleStepCompletion(index)}
                              />
                            </div>
                            <div>
                              <h6 className={`font-semibold text-base mb-1 ${completedSteps[selectedRecipeIndex]?.has(index) ? 'line-through opacity-70' : ''}`}>
                                Step {index + 1}
                              </h6>
                              <p className={completedSteps[selectedRecipeIndex]?.has(index) ? 'line-through opacity-70' : ''}>
                                {instruction}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              
              {/* Additional information sections */}
              <div className="mt-8">
                {/* Prep time details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-slate-50">
                    <CardContent className="p-4 text-center">
                      <i className="fas fa-clock text-xl text-green-600 mb-2"></i>
                      <h6 className="font-medium text-sm mb-1">Prep Time</h6>
                      <p className="text-slate-700">{selectedRecipe.prepTime}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardContent className="p-4 text-center">
                      <i className="fas fa-fire-alt text-xl text-orange-500 mb-2"></i>
                      <h6 className="font-medium text-sm mb-1">Cook Time</h6>
                      <p className="text-slate-700">{selectedRecipe.cookTime}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardContent className="p-4 text-center">
                      <i className="fas fa-utensils text-xl text-purple-600 mb-2"></i>
                      <h6 className="font-medium text-sm mb-1">Servings</h6>
                      <p className="text-slate-700">{selectedRecipe.servings} servings</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardContent className="p-4 text-center">
                      <i className="fas fa-chart-line text-xl text-blue-600 mb-2"></i>
                      <h6 className="font-medium text-sm mb-1">Difficulty</h6>
                      <p className="text-slate-700">{selectedRecipe.difficulty}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chef's Tips */}
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
                            <i className="fas fa-fire text-orange-600"></i>
                            <h5 className="font-semibold">Reheating Methods</h5>
                          </div>
                          <p className="text-slate-700">{selectedRecipe.reheatingMethods}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Beverage Pairings */}
                {selectedRecipe.beveragePairings && selectedRecipe.beveragePairings.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-wine-glass-alt text-purple-600"></i>
                      <h5 className="text-lg font-semibold food-gradient-text">Beverage Pairings</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.beveragePairings.map((beverage, i) => (
                        <Badge key={i} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 py-1.5 px-3">
                          {beverage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Side Dish Suggestions */}
                {selectedRecipe.sideDishSuggestions && selectedRecipe.sideDishSuggestions.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-concierge-bell text-teal-600"></i>
                      <h5 className="text-lg font-semibold food-gradient-text">Side Dish Suggestions</h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRecipe.sideDishSuggestions.map((dish, i) => (
                        <Card key={i} className="bg-teal-50 border border-teal-100">
                          <CardContent className="p-4">
                            <h6 className="font-medium mb-1 text-teal-800">{dish.name}</h6>
                            <p className="text-sm text-slate-600 mb-2">{dish.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              {dish.preparationTime && (
                                <span className="flex items-center gap-1">
                                  <i className="fas fa-clock"></i> {dish.preparationTime}
                                </span>
                              )}
                              {dish.pairingReason && (
                                <span className="mt-1 text-xs italic text-teal-600">
                                  Why it works: {dish.pairingReason}
                                </span>
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
            
            {/* Tab 2: Nutrition Information */}
            <TabsContent value="nutrition" className="space-y-6">
              {selectedRecipe.nutritionInfo && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-slate-50">
                      <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-semibold text-primary mb-1">
                          {selectedRecipe.nutritionInfo.calories}
                        </span>
                        <span className="text-sm text-slate-600">Calories per serving</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-semibold text-blue-600 mb-1">
                          {selectedRecipe.nutritionInfo.protein}
                        </span>
                        <span className="text-sm text-slate-600">Protein</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-semibold text-amber-600 mb-1">
                          {selectedRecipe.nutritionInfo.carbs}
                        </span>
                        <span className="text-sm text-slate-600">Carbohydrates</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-50">
                      <CardContent className="p-4 text-center">
                        <span className="block text-2xl font-semibold text-purple-600 mb-1">
                          {selectedRecipe.nutritionInfo.fats}
                        </span>
                        <span className="text-sm text-slate-600">Fat</span>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 food-gradient-text">Detailed Nutrients</h4>
                      <ul className="space-y-2 bg-white p-4 rounded-lg border border-slate-200">
                        <li className="flex justify-between">
                          <span className="text-slate-600">Fiber:</span>
                          <span className="font-medium">{selectedRecipe.nutritionInfo.fiber}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-600">Sugar:</span>
                          <span className="font-medium">{selectedRecipe.nutritionInfo.sugar}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-slate-600">Sodium:</span>
                          <span className="font-medium">{selectedRecipe.nutritionInfo.sodium}</span>
                        </li>
                        <Separator className="my-2" />
                        {selectedRecipe.nutritionInfo.vitamins && (
                          <li>
                            <span className="text-slate-600 block mb-2">Vitamins & Minerals:</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedRecipe.nutritionInfo.vitamins.map((vitamin, i) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-700">
                                  {vitamin}
                                </Badge>
                              ))}
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4 food-gradient-text">Dietary Information</h4>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 h-full">
                        {selectedRecipe.nutritionInfo.dietaryNotes && (
                          <div className="mb-4">
                            <h5 className="font-medium text-base mb-2">Key Notes</h5>
                            <ul className="list-disc pl-5 space-y-1 text-slate-700">
                              {selectedRecipe.nutritionInfo.dietaryNotes.map((note, i) => (
                                <li key={i}>{note}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedRecipe.nutritionInfo.healthyAlternatives && (
                          <div>
                            <h5 className="font-medium text-base mb-2">Healthy Alternatives</h5>
                            <ul className="list-disc pl-5 space-y-1 text-slate-700">
                              {selectedRecipe.nutritionInfo.healthyAlternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Nutrition Info */}
                  {selectedRecipe.nutritionInfo.macronutrientRatio && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 food-gradient-text">Macronutrient Ratio</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <span className="block text-xl font-semibold text-green-700">
                            {selectedRecipe.nutritionInfo.macronutrientRatio.protein}%
                          </span>
                          <span className="text-sm text-slate-600">Protein</span>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                          <span className="block text-xl font-semibold text-amber-700">
                            {selectedRecipe.nutritionInfo.macronutrientRatio.carbs}%
                          </span>
                          <span className="text-sm text-slate-600">Carbs</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <span className="block text-xl font-semibold text-purple-700">
                            {selectedRecipe.nutritionInfo.macronutrientRatio.fats}%
                          </span>
                          <span className="text-sm text-slate-600">Fats</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            {/* Tab 3: Techniques */}
            <TabsContent value="techniques" className="space-y-6">
              {/* Kitchen Tools and Equipment */}
              {selectedRecipe.equipment && selectedRecipe.equipment.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Kitchen Tools & Equipment</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedRecipe.equipment.map((tool, index) => (
                      <Card key={index} className="bg-slate-50 border border-slate-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-1">{tool.name}</h5>
                          {tool.description && <p className="text-sm text-slate-600 mb-2">{tool.description}</p>}
                          
                          {tool.alternatives && tool.alternatives.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-xs uppercase text-slate-500 mb-1">Alternatives</h6>
                              <p className="text-xs text-slate-700">{tool.alternatives.join(", ")}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Detailed Techniques */}
              {selectedRecipe.techniqueDetails && selectedRecipe.techniqueDetails.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Key Techniques</h4>
                  <div className="space-y-4">
                    {selectedRecipe.techniqueDetails.map((technique, index) => (
                      <Card key={index} className="border border-slate-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{technique.name}</CardTitle>
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
                          <CardTitle className="text-base flex items-center gap-2">
                            <i className="fas fa-eye text-yellow-500"></i> Visual Cues
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                            {selectedRecipe.sensoryGuidance.visualCues.map((cue, index) => (
                              <li key={index}>{cue}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Aroma Indicators */}
                    {selectedRecipe.sensoryGuidance.aromaIndicators && (
                      <Card className="border-l-4 border-l-green-400">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <i className="fas fa-wind text-green-500"></i> Aroma Indicators
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                            {selectedRecipe.sensoryGuidance.aromaIndicators.map((aroma, index) => (
                              <li key={index}>{aroma}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Texture Expectations */}
                    {selectedRecipe.sensoryGuidance.textureExpectations && (
                      <Card className="border-l-4 border-l-orange-400">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <i className="fas fa-mitten text-orange-500"></i> Texture Expectations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                            {selectedRecipe.sensoryGuidance.textureExpectations.map((texture, index) => (
                              <li key={index}>{texture}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Sound Cues */}
                    {selectedRecipe.sensoryGuidance.soundCues && (
                      <Card className="border-l-4 border-l-purple-400">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <i className="fas fa-volume-up text-purple-500"></i> Sound Cues
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                            {selectedRecipe.sensoryGuidance.soundCues.map((cue, index) => (
                              <li key={index}>{cue}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
              
              {/* Presentation Guidance */}
              {selectedRecipe.presentationGuidance && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Presentation Tips</h4>
                  <div className="bg-slate-50 p-5 rounded-lg">
                    {selectedRecipe.presentationGuidance.platingSuggestions && (
                      <div className="mb-4">
                        <h5 className="font-medium text-base mb-2 flex items-center gap-2">
                          <i className="fas fa-concierge-bell text-indigo-500"></i> Plating Suggestions
                        </h5>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          {selectedRecipe.presentationGuidance.platingSuggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.presentationGuidance.garnishingTips && (
                      <div className="mb-4">
                        <h5 className="font-medium text-base mb-2 flex items-center gap-2">
                          <i className="fas fa-leaf text-green-500"></i> Garnishing Tips
                        </h5>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          {selectedRecipe.presentationGuidance.garnishingTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedRecipe.presentationGuidance.photoTips && (
                      <div>
                        <h5 className="font-medium text-base mb-2 flex items-center gap-2">
                          <i className="fas fa-camera text-rose-500"></i> Photography Tips
                        </h5>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                          {selectedRecipe.presentationGuidance.photoTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Tab 4: Cultural Context & Guide */}
            <TabsContent value="cultural" className="space-y-6">
              {selectedRecipe.culturalContext && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Cultural Heritage</h4>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="food-gradient-text flex items-center gap-2">
                        <i className="fas fa-globe-americas"></i> Origin & Background
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
                          <h5 className="font-medium mb-2">Historical Context</h5>
                          <p className="text-slate-700">{selectedRecipe.culturalContext.history}</p>
                        </div>
                      )}
                      
                      {selectedRecipe.culturalContext.significance && (
                        <div className="mb-4">
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
                  
                  {/* Regional Variations */}
                  {selectedRecipe.culturalContext.regionalVariations && (
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="food-gradient-text flex items-center gap-2">
                          <i className="fas fa-map-marked-alt"></i> Regional Variations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedRecipe.culturalContext.regionalVariations.map((variation, i) => (
                            <li key={i} className="bg-slate-50 p-3 rounded-lg">
                              <h6 className="font-medium mb-1">{variation.region}</h6>
                              <p className="text-sm text-slate-700">{variation.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Culinary Tips */}
                  {selectedRecipe.culturalContext.culinaryTips && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="food-gradient-text flex items-center gap-2">
                          <i className="fas fa-mortar-pestle"></i> Authentic Preparation Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {selectedRecipe.culturalContext.culinaryTips.map((tip, i) => (
                            <li key={i} className="text-slate-700">{tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              
              {/* Serving guidance */}
              {selectedRecipe.servingGuidance && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 food-gradient-text">Serving Suggestion</h4>
                  <Card className="bg-slate-50 border border-slate-200">
                    <CardContent className="p-4">
                      <p className="mb-3">{selectedRecipe.servingGuidance}</p>
                      {selectedRecipe.servingTemperature && (
                        <div className="flex items-center mt-2 text-sm text-slate-700">
                          <i className="fas fa-thermometer-half mr-2 text-slate-400"></i> 
                          Ideal Serving Temperature: {selectedRecipe.servingTemperature}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Tab: Health Benefits */}
            <TabsContent value="health" className="space-y-6">
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 food-gradient-text">Health Benefits</h4>
                <Card className="bg-white rounded-lg shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h5 className="text-lg font-medium mb-3 text-green-600">Key Health Benefits</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Dynamically generate 6 health benefits based on the recipe's ingredients */}
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Heart Health</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.title.includes("Fish") || selectedRecipe.title.includes("Salmon") 
                                  ? "Rich in omega-3 fatty acids that reduce inflammation and lower blood pressure." 
                                  : "Contains nutrients that support cardiovascular function and healthy circulation."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Immune Support</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.ingredients.some(i => i.toLowerCase().includes("garlic") || i.toLowerCase().includes("ginger"))
                                  ? "Contains natural antibacterial and antiviral compounds from garlic and ginger."
                                  : "Provides essential vitamins and minerals that strengthen immune response."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Gut Health</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.ingredients.some(i => i.toLowerCase().includes("yogurt") || i.toLowerCase().includes("kefir"))
                                  ? "Contains probiotics that improve digestion and support healthy gut microbiome."
                                  : "Fiber-rich ingredients promote digestive health and regular bowel movements."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Brain Function</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.ingredients.some(i => i.toLowerCase().includes("fish") || i.toLowerCase().includes("egg"))
                                  ? "Rich in omega-3 fatty acids and choline that support cognitive function."
                                  : "Contains antioxidants that protect brain cells from oxidative damage."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Anti-Inflammatory</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.ingredients.some(i => i.toLowerCase().includes("turmeric") || i.toLowerCase().includes("ginger"))
                                  ? "Contains powerful anti-inflammatory compounds like curcumin from turmeric."
                                  : "Natural ingredients help reduce inflammation throughout the body."}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-green-600">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                              <h6 className="font-medium text-sm mb-1">Energy Boost</h6>
                              <p className="text-sm text-slate-700">
                                {selectedRecipe.ingredients.some(i => i.toLowerCase().includes("oat") || i.toLowerCase().includes("quinoa"))
                                  ? "Complex carbohydrates provide sustained energy throughout the day."
                                  : "Balanced macronutrients support optimal energy levels and metabolism."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="text-lg font-medium mb-3 text-green-600">Key Nutrients</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                          <div className="text-blue-600 mb-1">
                            <i className="fas fa-fish"></i>
                          </div>
                          <h6 className="font-medium text-sm mb-1">Omega-3</h6>
                          <p className="text-xs text-slate-600">Supports heart and brain health</p>
                        </div>
                        
                        <div className="bg-amber-50 p-3 rounded-lg text-center border border-amber-100">
                          <div className="text-amber-600 mb-1">
                            <i className="fas fa-dumbbell"></i>
                          </div>
                          <h6 className="font-medium text-sm mb-1">Protein</h6>
                          <p className="text-xs text-slate-600">Supports muscle growth and repair</p>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                          <div className="text-green-600 mb-1">
                            <i className="fas fa-carrot"></i>
                          </div>
                          <h6 className="font-medium text-sm mb-1">Fiber</h6>
                          <p className="text-xs text-slate-600">Promotes digestive health</p>
                        </div>
                        
                        <div className="bg-red-50 p-3 rounded-lg text-center border border-red-100">
                          <div className="text-red-600 mb-1">
                            <i className="fas fa-apple-alt"></i>
                          </div>
                          <h6 className="font-medium text-sm mb-1">Vitamins</h6>
                          <p className="text-xs text-slate-600">Essential for immune function</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-medium mb-3 text-green-600">Especially Beneficial For</h5>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">
                              <i className="fas fa-heart"></i>
                            </span>
                            <span className="text-slate-700">
                              <strong>Heart Health:</strong> {
                                selectedRecipe.tags && selectedRecipe.tags.some(tag => tag.toLowerCase().includes("fish") || tag.toLowerCase().includes("vegan"))
                                ? "Low in saturated fat and rich in heart-healthy nutrients."
                                : "Balanced ingredients support cardiovascular health when consumed in moderation."
                              }
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">
                              <i className="fas fa-brain"></i>
                            </span>
                            <span className="text-slate-700">
                              <strong>Cognitive Function:</strong> {
                                selectedRecipe.ingredients.some(i => i.toLowerCase().includes("nut") || i.toLowerCase().includes("fish") || i.toLowerCase().includes("berry"))
                                ? "Contains nutrients that support memory and brain health."
                                : "Wholesome ingredients provide nutrition for overall cognitive wellbeing."
                              }
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">
                              <i className="fas fa-weight"></i>
                            </span>
                            <span className="text-slate-700">
                              <strong>Weight Management:</strong> {
                                selectedRecipe.tags && selectedRecipe.tags.some(tag => tag.toLowerCase().includes("healthy") || tag.toLowerCase().includes("light"))
                                ? "Nutrient-dense with balanced macros to support healthy weight."
                                : "Can be incorporated into a balanced diet with portion control."
                              }
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Tab: Cost Estimation */}
            <TabsContent value="cost" className="space-y-6">
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
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${fillColor}`}></span>
                                  <span className="font-medium">{costCategory}</span>
                                </div>
                                <span className="text-sm text-slate-600">{costLabel}</span>
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
        </CardContent>
      </Card>
    </motion.section>
  );
}