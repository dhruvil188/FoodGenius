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
  Cookie
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
                  <h3 className="text-xl font-semibold capitalize">{day.day}</h3>
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
                                  <Info className="h-4 w-4 mr-2" />
                                  Nutritional Information
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-4 gap-2 p-2 bg-muted/30 rounded-md">
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground">Calories</div>
                                    <div className="font-medium">{meal.nutritionalInfo.calories}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground">Protein</div>
                                    <div className="font-medium">{meal.nutritionalInfo.protein}g</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground">Carbs</div>
                                    <div className="font-medium">{meal.nutritionalInfo.carbs}g</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground">Fat</div>
                                    <div className="font-medium">{meal.nutritionalInfo.fat}g</div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="ingredients">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center text-sm font-medium">
                                  <Utensils className="h-4 w-4 mr-2" />
                                  Ingredients
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-6 space-y-1">
                                  {meal.ingredients.map((ingredient, i) => (
                                    <li key={i} className="text-sm">{ingredient}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="instructions">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center text-sm font-medium">
                                  <CalendarDays className="h-4 w-4 mr-2" />
                                  Cooking Instructions
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ol className="list-decimal pl-6 space-y-2">
                                  {meal.instructions.map((step, i) => (
                                    <li key={i} className="text-sm">{step}</li>
                                  ))}
                                </ol>
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