import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dietPlanRequestSchema, type DietPlanRequest } from "@shared/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DietPlanFormProps {
  onSubmit: (data: DietPlanRequest) => void;
  isLoading: boolean;
}

// Diet types
const dietTypes = [
  { value: "balanced", label: "Balanced" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "keto", label: "Keto" },
  { value: "low-carb", label: "Low Carb" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "paleo", label: "Paleo" },
  { value: "gluten-free", label: "Gluten Free" },
  { value: "dairy-free", label: "Dairy Free" }
];

// Health goals
const healthGoals = [
  { id: "weight-loss", label: "Weight Loss" },
  { id: "muscle-gain", label: "Muscle Gain" },
  { id: "maintenance", label: "Maintenance" },
  { id: "energy-boost", label: "Energy Boost" },
  { id: "heart-health", label: "Heart Health" },
  { id: "immune-support", label: "Immune Support" },
  { id: "gut-health", label: "Gut Health" },
  { id: "anti-inflammatory", label: "Anti-Inflammatory" },
  { id: "blood-sugar", label: "Blood Sugar Control" }
];

// Common medical conditions
const medicalConditions = [
  { id: "none", label: "None" },
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "celiac", label: "Celiac Disease" },
  { id: "lactose-intolerance", label: "Lactose Intolerance" },
  { id: "ibs", label: "IBS" },
  { id: "gout", label: "Gout" },
  { id: "arthritis", label: "Arthritis" }
];

// Cuisines
const cuisines = [
  { id: "italian", label: "Italian" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "asian", label: "Asian" },
  { id: "mexican", label: "Mexican" },
  { id: "indian", label: "Indian" },
  { id: "american", label: "American" },
  { id: "french", label: "French" },
  { id: "greek", label: "Greek" },
  { id: "middle-eastern", label: "Middle Eastern" },
  { id: "japanese", label: "Japanese" },
  { id: "thai", label: "Thai" }
];

export default function DietPlanForm({ onSubmit, isLoading }: DietPlanFormProps) {
  // Form setup
  const form = useForm<DietPlanRequest>({
    resolver: zodResolver(dietPlanRequestSchema),
    defaultValues: {
      dietType: "balanced",
      healthGoals: ["maintenance"],
      calorieTarget: 2000,
      mealsPerDay: 3,
      excludedFoods: [],
      medicalConditions: [],
      cookingSkill: "intermediate",
      timeConstraint: 30,
      budgetLevel: "moderate",
      preferredCuisines: ["mediterranean"],
      seasonalPreference: "any",
      proteinPreference: "balanced",
      extraNotes: ""
    }
  });
  
  // State for excluded foods (input + list)
  const [excludedFood, setExcludedFood] = useState("");
  
  // Add excluded food
  const addExcludedFood = () => {
    if (!excludedFood.trim()) return;
    const currentExcluded = form.getValues("excludedFoods");
    if (!currentExcluded.includes(excludedFood.trim())) {
      form.setValue("excludedFoods", [...currentExcluded, excludedFood.trim()]);
    }
    setExcludedFood("");
  };
  
  // Remove excluded food
  const removeExcludedFood = (food: string) => {
    const currentExcluded = form.getValues("excludedFoods");
    form.setValue(
      "excludedFoods",
      currentExcluded.filter(f => f !== food)
    );
  };
  
  // Form submission
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          {/* Basic Settings Tab */}
          <TabsContent value="basics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diet Type */}
              <FormField
                control={form.control}
                name="dietType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a diet type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dietTypes.map((diet) => (
                          <SelectItem key={diet.value} value={diet.value}>
                            {diet.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the primary dietary approach
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Calorie Target */}
              <FormField
                control={form.control}
                name="calorieTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Calorie Target: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1200}
                        max={3500}
                        step={50}
                        defaultValue={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Set your daily calorie target
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Meals Per Day */}
              <FormField
                control={form.control}
                name="mealsPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meals Per Day</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of meals" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2 meals</SelectItem>
                        <SelectItem value="3">3 meals</SelectItem>
                        <SelectItem value="4">4 meals</SelectItem>
                        <SelectItem value="5">5 meals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How many meals to include in your daily plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Health Goals */}
              <FormField
                control={form.control}
                name="healthGoals"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Health Goals</FormLabel>
                      <FormDescription>
                        Select one or more health goals
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {healthGoals.map((goal) => (
                        <FormField
                          key={goal.id}
                          control={form.control}
                          name="healthGoals"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={goal.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(goal.id)}
                                    onCheckedChange={(checked) => {
                                      const currentGoals = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentGoals, goal.id]);
                                      } else {
                                        field.onChange(
                                          currentGoals.filter((value) => value !== goal.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  {goal.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cooking Skill */}
              <FormField
                control={form.control}
                name="cookingSkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooking Skill Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your cooking experience level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Time Constraint */}
              <FormField
                control={form.control}
                name="timeConstraint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Per Meal: {field.value} minutes</FormLabel>
                    <FormControl>
                      <Slider
                        min={15}
                        max={90}
                        step={5}
                        defaultValue={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum time you want to spend preparing each meal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Budget Level */}
              <FormField
                control={form.control}
                name="budgetLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="budget">Budget-Friendly</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your preferred budget level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Seasonal Preference */}
              <FormField
                control={form.control}
                name="seasonalPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seasonal Preference</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seasonal preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any Season</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="fall">Fall</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose seasonal ingredients preference
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Protein Preference */}
              <FormField
                control={form.control}
                name="proteinPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein Preference</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select protein preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced Mix</SelectItem>
                        <SelectItem value="high-protein">High Protein</SelectItem>
                        <SelectItem value="plant-based">Plant-Based</SelectItem>
                        <SelectItem value="seafood">Seafood Focus</SelectItem>
                        <SelectItem value="poultry">Poultry Focus</SelectItem>
                        <SelectItem value="red-meat">Red Meat Focus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your preferred protein sources
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Preferred Cuisines */}
              <FormField
                control={form.control}
                name="preferredCuisines"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Preferred Cuisines</FormLabel>
                      <FormDescription>
                        Select one or more cuisine types you enjoy
                      </FormDescription>
                    </div>
                    <ScrollArea className="h-40 rounded-md border p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {cuisines.map((cuisine) => (
                          <FormField
                            key={cuisine.id}
                            control={form.control}
                            name="preferredCuisines"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={cuisine.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(cuisine.id)}
                                      onCheckedChange={(checked) => {
                                        const currentCuisines = field.value || [];
                                        if (checked) {
                                          field.onChange([...currentCuisines, cuisine.id]);
                                        } else {
                                          field.onChange(
                                            currentCuisines.filter((value) => value !== cuisine.id)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm">
                                    {cuisine.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          {/* Restrictions Tab */}
          <TabsContent value="restrictions" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Excluded Foods */}
              <FormField
                control={form.control}
                name="excludedFoods"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Excluded Foods</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={excludedFood}
                        onChange={(e) => setExcludedFood(e.target.value)}
                        placeholder="Enter a food to exclude"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addExcludedFood();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addExcludedFood}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((food) => (
                        <Badge 
                          key={food} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {food}
                          <button
                            type="button"
                            className="ml-1 rounded-full text-xs"
                            onClick={() => removeExcludedFood(food)}
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Add any foods you want to exclude from your meal plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Medical Conditions */}
              <FormField
                control={form.control}
                name="medicalConditions"
                render={() => (
                  <FormItem className="col-span-2">
                    <div className="mb-4">
                      <FormLabel>Medical Conditions</FormLabel>
                      <FormDescription>
                        Select any medical conditions to consider in your plan
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {medicalConditions.map((condition) => (
                        <FormField
                          key={condition.id}
                          control={form.control}
                          name="medicalConditions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={condition.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(condition.id)}
                                    onCheckedChange={(checked) => {
                                      const currentConditions = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentConditions, condition.id]);
                                      } else {
                                        field.onChange(
                                          currentConditions.filter((value) => value !== condition.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {condition.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-6">
              {/* Extra Notes */}
              <FormField
                control={form.control}
                name="extraNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional details or preferences..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add any other preferences or requirements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Diet Plan...
              </>
            ) : (
              "Generate Diet Plan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}