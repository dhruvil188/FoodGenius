import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dietPlanRequestSchema, type DietPlanRequest } from "@shared/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface DietPlanFormProps {
  onSubmit: (data: DietPlanRequest) => void;
  isLoading: boolean;
}

// Diet types
const dietTypes = [
  { value: "balanced", label: "Balanced" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "keto", label: "Keto" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" }
];

// Health goals
const healthGoalOptions = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "maintenance", label: "Maintenance" }
];

export default function DietPlanForm({ onSubmit, isLoading }: DietPlanFormProps) {
  // Form setup
  const form = useForm<DietPlanRequest>({
    resolver: zodResolver(dietPlanRequestSchema),
    defaultValues: {
      dietType: "balanced",
      healthGoal: "maintenance",
      mealsPerDay: 3,
      allergies: "",
      extraNotes: ""
    }
  });
  
  // Form submission
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-5">
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
              
              {/* Health Goal */}
              <FormField
                control={form.control}
                name="healthGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Goal</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {healthGoalOptions.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      What is your primary health goal?
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
              
              {/* Allergies */}
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies or Excluded Foods</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any food allergies or foods you want to avoid (e.g., peanuts, shellfish, dairy)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any foods that should be excluded from your plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Extra Notes */}
              <FormField
                control={form.control}
                name="extraNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extra Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional preferences or requirements for your diet plan"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional information to customize your plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Diet Plan...
            </>
          ) : (
            "Generate Diet Plan"
          )}
        </Button>
      </form>
    </Form>
  );
}