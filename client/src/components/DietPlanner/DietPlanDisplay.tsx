import { useState, useEffect } from "react";
import { DietPlanResponse, SavedDietPlan } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CalendarDays, 
  Info, 
  Check, 
  Flame, 
  Clock, 
  DollarSign, 
  Utensils, 
  Coffee, 
  Salad,
  Drumstick,
  Cookie,
  Timer,
  ChefHat,
  ShoppingCart,
  Thermometer,
  Sparkles,
  Bookmark,
  Star,
  CheckCircle2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DietPlanDisplayProps {
  dietPlan: DietPlanResponse;
  onSave: (name: string, dietPlan: DietPlanResponse, mealsPerDay: number) => void;
  isSaving: boolean;
}

// Helper function to get meal icon based on time of day
const getMealIcon = (timeOfDay: string) => {
  const time = timeOfDay.toLowerCase();
  if (time.includes("breakfast")) return <Coffee className="h-5 w-5 mr-2" />;
  if (time.includes("lunch")) return <Salad className="h-5 w-5 mr-2" />;
  if (time.includes("dinner")) return <Drumstick className="h-5 w-5 mr-2" />;
  if (time.includes("snack")) return <Cookie className="h-5 w-5 mr-2" />;
  return <Utensils className="h-5 w-5 mr-2" />;
};

// Get day number (for tab ordering)
const getDayNumber = (day: string): number => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return days.indexOf(day.toLowerCase());
};

export default function DietPlanDisplay({ dietPlan, onSave, isSaving }: DietPlanDisplayProps) {
  const [planName, setPlanName] = useState("My Diet Plan");
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Sort the weekly plan by day of week
  const sortedWeeklyPlan = [...dietPlan.weeklyPlan].sort(
    (a, b) => getDayNumber(a.day) - getDayNumber(b.day)
  );
  
  // Calculate the meals per day from the first day
  const mealsPerDay = sortedWeeklyPlan[0]?.meals.length || 3;
  
  const handleSave = () => {
    onSave(planName, dietPlan, mealsPerDay);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Personalized Diet Plan</CardTitle>
          <CardDescription>{dietPlan.planSummary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center">
              <Flame className="h-5 w-5 mr-2 text-orange-500" />
              <span className="font-medium">
                {dietPlan.weeklyNutritionAverage.calories} calories/day
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="font-medium mr-6">
                  <Badge variant="outline" className="mr-1">P</Badge>
                  {dietPlan.weeklyNutritionAverage.protein}g
                </span>
                <span className="font-medium mr-6">
                  <Badge variant="outline" className="mr-1">C</Badge>
                  {dietPlan.weeklyNutritionAverage.carbs}g
                </span>
                <span className="font-medium">
                  <Badge variant="outline" className="mr-1">F</Badge>
                  {dietPlan.weeklyNutritionAverage.fat}g
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="plan-name">Save this plan as:</Label>
              <div className="flex gap-2">
                <Input 
                  id="plan-name" 
                  value={planName} 
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Plan"}
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid grid-cols-7 mb-4">
              {sortedWeeklyPlan.map((day, index) => (
                <TabsTrigger key={day.day} value={index.toString()} className="text-xs sm:text-sm">
                  {isMobile ? day.day.substring(0, 3) : day.day.charAt(0).toUpperCase() + day.day.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sortedWeeklyPlan.map((day, dayIndex) => (
              <TabsContent key={day.day} value={dayIndex.toString()} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold capitalize">{day.day}</h3>
                    {day.meals.some(meal => meal.name === `${day.day} Breakfast` || meal.name === `${day.day} Lunch` || meal.name === `${day.day} Dinner`) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Suggested Meals
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">These are suggested meals. Generate a new plan for detailed recipes for all days.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1.5">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{day.totalDailyCalories} calories</span>
                  </Badge>
                </div>
                
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pb-10">
                    {day.meals.map((meal, mealIndex) => (
                      <Card key={mealIndex} className="overflow-hidden">
                        <CardHeader className="bg-muted/40 pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {getMealIcon(meal.timeOfDay)}
                              <CardTitle className="text-lg">{meal.name}</CardTitle>
                            </div>
                            <Badge variant="secondary">{meal.timeOfDay}</Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-4">
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="nutritional-info">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center text-sm font-medium">
                                  <Info className="h-4 w-4 mr-2 text-blue-500" />
                                  Nutritional Information
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-md">
                                  <div className="text-center p-2 bg-background rounded shadow-sm">
                                    <div className="text-sm text-muted-foreground">Calories</div>
                                    <div className="font-medium text-orange-500 text-lg">{meal.nutritionalInfo.calories}</div>
                                  </div>
                                  <div className="text-center p-2 bg-background rounded shadow-sm">
                                    <div className="text-sm text-muted-foreground">Protein</div>
                                    <div className="font-medium text-primary text-lg">{meal.nutritionalInfo.protein}g</div>
                                  </div>
                                  <div className="text-center p-2 bg-background rounded shadow-sm">
                                    <div className="text-sm text-muted-foreground">Carbs</div>
                                    <div className="font-medium text-amber-500 text-lg">{meal.nutritionalInfo.carbs}g</div>
                                  </div>
                                  <div className="text-center p-2 bg-background rounded shadow-sm">
                                    <div className="text-sm text-muted-foreground">Fat</div>
                                    <div className="font-medium text-yellow-600 text-lg">{meal.nutritionalInfo.fat}g</div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="ingredients">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center text-sm font-medium">
                                  <ShoppingCart className="h-4 w-4 mr-2 text-emerald-500" />
                                  Ingredients
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="bg-muted/20 p-3 rounded-md">
                                  <TooltipProvider>
                                    <ul className="space-y-3">
                                      {meal.ingredients.map((ingredient, i) => {
                                        // Extract quantity and name for styling
                                        const matches = ingredient.match(/^([\d\/.]+\s*[a-zA-Z]*|\d+)\s+(.+)$/);
                                        let quantity = "";
                                        let ingredientName = ingredient;
                                        let healthBenefit = "";
                                        
                                        if (matches && matches.length >= 3) {
                                          quantity = matches[1];
                                          ingredientName = matches[2];
                                        }
                                        
                                        // Extract health benefits if present in parentheses
                                        const benefitMatch = ingredientName.match(/\((.*?)\)/);
                                        if (benefitMatch && benefitMatch.length >= 2) {
                                          healthBenefit = benefitMatch[1];
                                          ingredientName = ingredientName.replace(/\s*\(.*?\)\s*/, '');
                                        }
                                        
                                        return (
                                          <li key={i} className="flex items-start py-1 border-b border-muted last:border-0">
                                            <CheckCircle2 className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                            <div>
                                              <span className="font-semibold text-sm">{quantity}</span>
                                              <span className="text-sm ml-1">{ingredientName}</span>
                                              {healthBenefit && (
                                                <TooltipProvider>
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <span className="ml-1 inline-flex text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5 cursor-help">
                                                        <Star className="h-3 w-3 mr-1" /> info
                                                      </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                      <p>{healthBenefit}</p>
                                                    </TooltipContent>
                                                  </Tooltip>
                                                </TooltipProvider>
                                              )}
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </TooltipProvider>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="instructions">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center text-sm font-medium">
                                  <ChefHat className="h-4 w-4 mr-2 text-amber-600" />
                                  Cooking Instructions
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="bg-muted/20 rounded-md p-3">
                                  <ol className="space-y-4">
                                    {meal.instructions.map((step, i) => {
                                      // Detect time information in the step
                                      const hasTime = /\b\d+\s*(minute|min|hour|hr|second|sec)s?\b/i.test(step);
                                      // Detect temperature information in the step
                                      const hasTemp = /\b\d+\s*°[FC]\b|\b\d+\s*degrees\b/i.test(step);
                                      
                                      return (
                                        <li key={i} className="relative pl-8 pb-4 border-b border-muted last:border-0 last:pb-1">
                                          <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                            {i+1}
                                          </span>
                                          <p className="text-sm">{step}</p>
                                          <div className="flex gap-2 mt-2">
                                            {hasTime && (
                                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                                                <Timer className="h-3 w-3" /> Time
                                              </Badge>
                                            )}
                                            {hasTemp && (
                                              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                                                <Thermometer className="h-3 w-3" /> Temp
                                              </Badge>
                                            )}
                                            {step.toLowerCase().includes("serve") && (
                                              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
                                                <Sparkles className="h-3 w-3" /> Plating
                                              </Badge>
                                            )}
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </ol>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}