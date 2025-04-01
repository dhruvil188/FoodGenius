import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { generateMealPlan } from '@/data/mealPlanLibrary';

// Types for meal plan preferences
interface MealPlanPreferences {
  mealsPerDay: '2' | '4';
  spiciness: 'spicy' | 'mild';
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
  healthGoal: 'fit' | 'indulgent';
  cuisinePreferences: string[];
  prepTime: 'quick' | 'moderate' | 'slow';
  duration: '1-week' | '2-weeks' | '1-month';
  restrictions: string[];
}

// Types for meal plan response
interface MealPlanDay {
  date: Date;
  meals: {
    type: string;
    name: string;
    image: string;
    calories: number;
    recipe: string;
    ingredients: string[];
    nutrients: {
      protein: string;
      carbs: string;
      fats: string;
    };
  }[];
  dailyNutrition: {
    totalCalories: number;
    totalProtein: string;
    totalCarbs: string;
    totalFats: string;
  };
}

interface MealPlan {
  days: MealPlanDay[];
  groceryList: {
    category: string;
    items: string[];
  }[];
  nutritionSummary: {
    averageCalories: number;
    averageProtein: string;
    averageCarbs: string;
    averageFats: string;
    recommendations: string[];
  };
}

export default function MealPrep() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('preferences');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  // Form state
  const [preferences, setPreferences] = useState<MealPlanPreferences>({
    mealsPerDay: '2',
    spiciness: 'mild',
    dietType: 'non-vegetarian',
    healthGoal: 'fit',
    cuisinePreferences: ['Indian'],
    prepTime: 'moderate',
    duration: '1-week',
    restrictions: [],
  });

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    try {
      // Generate a meal plan based on user preferences using our comprehensive library
      const generatedMealPlan = generateMealPlan(preferences);
      
      setMealPlan(generatedMealPlan);
      // Set first day as selected - handle undefined dates
      if (generatedMealPlan.days.length > 0) {
        const firstDay = new Date(generatedMealPlan.days[0].date);
        setSelectedDay(firstDay);
      }
      setActiveTab('calendar');
      
      toast({
        title: "Meal Plan Generated",
        description: "Your personalized meal plan is ready to explore!",
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Generation Failed",
        description: "We couldn't generate your meal plan. Please try different preferences.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdatePreference = (field: keyof MealPlanPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleCuisine = (cuisine: string) => {
    setPreferences(prev => {
      const updatedCuisines = prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter(c => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine];
      
      return {
        ...prev,
        cuisinePreferences: updatedCuisines
      };
    });
  };

  const handleToggleRestriction = (restriction: string) => {
    setPreferences(prev => {
      const updatedRestrictions = prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction];
      
      return {
        ...prev,
        restrictions: updatedRestrictions
      };
    });
  };

  const downloadMealPlan = () => {
    // This would normally generate a PDF
    toast({
      title: "Download Started",
      description: "Your meal plan will be downloaded momentarily.",
    });
  };

  const handleSharePlan = () => {
    // This would normally open share options
    toast({
      title: "Share Feature",
      description: "This feature would allow sharing to social media platforms.",
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 text-transparent bg-clip-text">
          Personalized Meal Prep Planner
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Create custom meal plans tailored to your preferences and dietary needs. Get a complete calendar, grocery list, and nutrition breakdown.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="calendar" disabled={!mealPlan}>Calendar</TabsTrigger>
          <TabsTrigger value="grocery" disabled={!mealPlan}>Grocery List</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meals Per Day */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-utensils text-primary"></i> Meals Per Day
                  </CardTitle>
                  <CardDescription>Choose how many meals you want in your daily plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.mealsPerDay}
                    onValueChange={(value) => handleUpdatePreference('mealsPerDay', value)}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="meals-2" />
                      <Label htmlFor="meals-2" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍽️</span> 2 Meals (Lunch + Dinner)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="meals-4" />
                      <Label htmlFor="meals-4" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍽️</span> 4 Meals (Breakfast, Lunch, Snacks, Dinner)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Spiciness Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-pepper-hot text-primary"></i> Spiciness Level
                  </CardTitle>
                  <CardDescription>Select your preferred spice level</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.spiciness}
                    onValueChange={(value) => handleUpdatePreference('spiciness', value as 'spicy' | 'mild')}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="spicy" id="spicy" />
                      <Label htmlFor="spicy" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🌶️</span> Spicy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="mild" />
                      <Label htmlFor="mild" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🌿</span> Mild (Non-Spicy)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Diet Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-carrot text-primary"></i> Diet Type
                  </CardTitle>
                  <CardDescription>Select your dietary preference</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.dietType}
                    onValueChange={(value) => handleUpdatePreference('dietType', value as 'vegetarian' | 'non-vegetarian' | 'vegan')}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetarian" id="vegetarian" />
                      <Label htmlFor="vegetarian" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🥦</span> Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
                      <Label htmlFor="non-vegetarian" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍗</span> Non-Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegan" id="vegan" />
                      <Label htmlFor="vegan" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🥛</span> Vegan
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Health Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-dumbbell text-primary"></i> Health Goals
                  </CardTitle>
                  <CardDescription>Choose your primary health goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.healthGoal}
                    onValueChange={(value) => handleUpdatePreference('healthGoal', value as 'fit' | 'indulgent')}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fit" id="fit" />
                      <Label htmlFor="fit" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🏋️</span> Fit (Low-Calorie, High Protein, Balanced)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="indulgent" id="indulgent" />
                      <Label htmlFor="indulgent" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍔</span> Indulgent (Cheat Meals, Comfort Food)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Cuisine Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-globe-americas text-primary"></i> Cuisine Preferences
                  </CardTitle>
                  <CardDescription>Select one or more cuisine styles (multiple selection allowed)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="indian" 
                        checked={preferences.cuisinePreferences.includes('Indian')}
                        onCheckedChange={() => handleToggleCuisine('Indian')}
                      />
                      <Label htmlFor="indian" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍛</span> Indian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="italian" 
                        checked={preferences.cuisinePreferences.includes('Italian')}
                        onCheckedChange={() => handleToggleCuisine('Italian')}
                      />
                      <Label htmlFor="italian" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍕</span> Italian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="japanese" 
                        checked={preferences.cuisinePreferences.includes('Japanese')}
                        onCheckedChange={() => handleToggleCuisine('Japanese')}
                      />
                      <Label htmlFor="japanese" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍣</span> Japanese
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mexican" 
                        checked={preferences.cuisinePreferences.includes('Mexican')}
                        onCheckedChange={() => handleToggleCuisine('Mexican')}
                      />
                      <Label htmlFor="mexican" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🌮</span> Mexican
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-clock text-primary"></i> Preparation Time
                  </CardTitle>
                  <CardDescription>Select how much time you want to spend cooking</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.prepTime}
                    onValueChange={(value) => handleUpdatePreference('prepTime', value as 'quick' | 'moderate' | 'slow')}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quick" id="quick" />
                      <Label htmlFor="quick" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">⏳</span> Quick (Under 15 mins)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🕒</span> Moderate (15-30 mins)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="slow" id="slow" />
                      <Label htmlFor="slow" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍲</span> Slow Cook (30+ mins)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Meal Plan Duration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-primary"></i> Meal Plan Duration
                  </CardTitle>
                  <CardDescription>Choose how long your meal plan should last</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={preferences.duration}
                    onValueChange={(value) => handleUpdatePreference('duration', value as '1-week' | '2-weeks' | '1-month')}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-week" id="1-week" />
                      <Label htmlFor="1-week" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">📅</span> 1 Week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-weeks" id="2-weeks" />
                      <Label htmlFor="2-weeks" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">📅</span> 2 Weeks
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-month" id="1-month" />
                      <Label htmlFor="1-month" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">📅</span> 1 Month
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Dietary Restrictions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-exclamation-circle text-primary"></i> Dietary Restrictions
                  </CardTitle>
                  <CardDescription>Select any allergies or restrictions (optional)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="no-nuts" 
                        checked={preferences.restrictions.includes('No Nuts')}
                        onCheckedChange={() => handleToggleRestriction('No Nuts')}
                      />
                      <Label htmlFor="no-nuts" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🥜</span> No Nuts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="no-gluten" 
                        checked={preferences.restrictions.includes('No Gluten')}
                        onCheckedChange={() => handleToggleRestriction('No Gluten')}
                      />
                      <Label htmlFor="no-gluten" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🌾</span> No Gluten
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="no-dairy" 
                        checked={preferences.restrictions.includes('No Dairy')}
                        onCheckedChange={() => handleToggleRestriction('No Dairy')}
                      />
                      <Label htmlFor="no-dairy" className="flex items-center cursor-pointer">
                        <span className="text-lg mr-2">🍞</span> No Dairy
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSubmit} 
                disabled={isGenerating || preferences.cuisinePreferences.length === 0}
                className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white px-8 py-2 rounded-full shadow-md"
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating Your Meal Plan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic mr-2"></i>
                    Generate Meal Plan
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          {mealPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-primary"></i> Meal Calendar
                  </CardTitle>
                  <CardDescription>Select a day to view your meals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDay || undefined}
                    onSelect={(day) => day && setSelectedDay(day)}
                    className="rounded-md border"
                    initialFocus
                    // Only show dates that are part of the meal plan
                    disabled={(date) => {
                      if (!mealPlan) return true;
                      // Convert all dates to strings for comparison
                      const mealPlanDateStrings = mealPlan.days.map(day => 
                        day.date.toDateString()
                      );
                      // Only enable dates that are in the meal plan
                      return !mealPlanDateStrings.includes(date.toDateString());
                    }}
                  />
                  
                  <div className="mt-4">
                    <h3 className="font-medium text-sm text-slate-500 mb-2">Nutrition Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Avg. Calories:</span>
                        <span className="font-semibold">{mealPlan.nutritionSummary.averageCalories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Protein:</span>
                        <span className="font-semibold">{mealPlan.nutritionSummary.averageProtein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Carbs:</span>
                        <span className="font-semibold">{mealPlan.nutritionSummary.averageCarbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Fats:</span>
                        <span className="font-semibold">{mealPlan.nutritionSummary.averageFats}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button onClick={downloadMealPlan} variant="outline" className="w-full">
                      <i className="fas fa-download mr-2"></i> Download Plan
                    </Button>
                    <Button onClick={handleSharePlan} variant="outline" className="w-full">
                      <i className="fas fa-share-alt mr-2"></i> Share Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-utensils text-primary"></i> {selectedDay ? (
                      `Meals for ${selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`
                    ) : 'Select a day to view meals'}
                  </CardTitle>
                  {selectedDay && mealPlan && (
                    <CardDescription>
                      {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString()) ? (
                        <>
                          Daily total: {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString())?.dailyNutrition.totalCalories} calories | {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString())?.dailyNutrition.totalProtein} protein | {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString())?.dailyNutrition.totalCarbs} carbs | {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString())?.dailyNutrition.totalFats} fats
                        </>
                      ) : (
                        "No meal data available for this day"
                      )}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedDay && mealPlan ? (
                    <div className="space-y-6">
                      {/* Find the day matching the selected date */}
                      {mealPlan.days.find(day => day.date.toDateString() === selectedDay.toDateString())?.meals.map((meal, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-24 h-20 bg-slate-200 rounded-md flex-shrink-0 overflow-hidden">
                              <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-600">
                                <i className="fas fa-image text-2xl"></i>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                    {meal.type}
                                  </span>
                                  <h3 className="font-semibold mt-1">{meal.name}</h3>
                                </div>
                                <span className="text-sm font-medium text-slate-700">{meal.calories} cal</span>
                              </div>
                              
                              <Tabs defaultValue="recipe" className="mt-3">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="recipe">Recipe</TabsTrigger>
                                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                </TabsList>
                                <TabsContent value="recipe" className="pt-4">
                                  <div className="mb-2">
                                    <h4 className="text-sm font-medium text-slate-700 mb-1">Ingredients:</h4>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                      {meal.ingredients.map((ingredient, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                          <i className="fas fa-check text-xs text-primary"></i>
                                          {ingredient}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-1">Instructions:</h4>
                                    <p className="text-sm text-slate-600 whitespace-pre-line">{meal.recipe}</p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="nutrition" className="pt-4">
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="p-2 bg-primary/5 rounded-md text-center">
                                      <div className="text-xs text-slate-500">Protein</div>
                                      <div className="font-semibold text-slate-700">{meal.nutrients.protein}</div>
                                    </div>
                                    <div className="p-2 bg-primary/5 rounded-md text-center">
                                      <div className="text-xs text-slate-500">Carbs</div>
                                      <div className="font-semibold text-slate-700">{meal.nutrients.carbs}</div>
                                    </div>
                                    <div className="p-2 bg-primary/5 rounded-md text-center">
                                      <div className="text-xs text-slate-500">Fats</div>
                                      <div className="font-semibold text-slate-700">{meal.nutrients.fats}</div>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                              
                              <div className="mt-3 flex justify-end">
                                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary">
                                  <i className="fas fa-random mr-1"></i> Swap Meal
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-calendar-day text-4xl text-slate-300 mb-2"></i>
                      <p className="text-slate-500">Please select a day from the calendar to view your meal plan</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="grocery" className="mt-4">
          {mealPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-shopping-basket text-primary"></i> Grocery Shopping List
                  </CardTitle>
                  <CardDescription>Everything you need for your meal plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mealPlan.groceryList.map((category, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2 text-primary">{category.category}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Checkbox id={`item-${index}-${i}`} />
                              <Label htmlFor={`item-${index}-${i}`} className="flex-1 cursor-pointer">
                                {item}
                              </Label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Nutrition Recommendations</h3>
                    <div className="space-y-2">
                      {mealPlan.nutritionSummary.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <i className="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button onClick={downloadMealPlan} className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white px-6 rounded-full shadow-md">
                      <i className="fas fa-download mr-2"></i>
                      Download Shopping List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}