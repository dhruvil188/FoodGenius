import { useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  dietPlanRequestSchema,
  type DietPlanRequest, 
  type DietPlanResponse,
  type SavedDietPlan
} from "@shared/schema";
import DietPlanForm from "@/components/DietPlanner/DietPlanForm";
import DietPlanDisplay from "@/components/DietPlanner/DietPlanDisplay";
import SavedDietPlans from "@/components/DietPlanner/SavedDietPlans";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChefHat, List, PlusCircle, Loader2 } from "lucide-react";
import ProtectedFeature from "@/components/ProtectedFeature";

export default function DietPlannerPage() {
  const { currentUser } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/diet-planner/:id");
  const [matchCreate] = useRoute("/diet-planner/create");
  const [generatedPlan, setGeneratedPlan] = useState<DietPlanResponse | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Query specific diet plan if ID is provided
  const { 
    data: dietPlan, 
    isLoading: isLoadingPlan, 
    error: planError 
  } = useQuery({
    queryKey: ["/api/diet-plans", params?.id],
    queryFn: async () => {
      if (!params?.id) return null;
      const res = await apiRequest("GET", `/api/diet-plans/${params.id}`);
      // First cast to SavedDietPlan to make TypeScript happy
      const data = await res.json() as SavedDietPlan;
      
      // The API returns planData as a JSON string when using PostgreSQL jsonb
      // So we need to manually convert it to a strongly-typed DietPlanResponse object
      if (typeof data.planData === 'string') {
        data.planData = JSON.parse(data.planData) as DietPlanResponse;
      }
      
      return data;
    },
    enabled: !!match && !!params?.id && params.id !== "create"
  });
  
  // Generate diet plan mutation
  const generateMutation = useMutation({
    mutationFn: async (data: DietPlanRequest) => {
      const res = await apiRequest("POST", "/api/diet-plans/generate", data);
      return await res.json() as DietPlanResponse;
    },
    onSuccess: (data) => {
      setGeneratedPlan(data);
      toast({
        title: "Diet Plan Generated",
        description: "Your personalized diet plan has been created!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to generate diet plan",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Save diet plan mutation
  const saveMutation = useMutation({
    mutationFn: async ({ name, plan, mealsPerDay }: { name: string, plan: DietPlanResponse, mealsPerDay: number }) => {
      const res = await apiRequest("POST", "/api/diet-plans", { 
        planName: name,
        dietPlan: plan,
        mealsPerDay 
      });
      return await res.json() as SavedDietPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/diet-plans"] });
      toast({
        title: "Diet Plan Saved",
        description: "Your diet plan has been saved successfully.",
      });
      setLocation(`/diet-planner/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to save diet plan",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  const handleSubmit = (data: DietPlanRequest) => {
    generateMutation.mutate(data);
  };
  
  // Handle saving a generated plan
  const handleSavePlan = (name: string, plan: DietPlanResponse, mealsPerDay: number) => {
    saveMutation.mutate({ name, plan, mealsPerDay });
  };
  
  // Handle back button
  const handleBack = () => {
    if (generatedPlan) {
      setGeneratedPlan(null);
    } else {
      setLocation("/diet-planner");
    }
  };
  
  // Render the main content based on route and state
  const renderContent = () => {
    // If viewing a specific saved plan
    if (match && params?.id && params.id !== "create") {
      if (isLoadingPlan) {
        return (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        );
      }
      
      if (planError || !dietPlan) {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Error Loading Diet Plan</CardTitle>
              <CardDescription>The requested diet plan could not be found</CardDescription>
            </CardHeader>
            <CardContent>
              <p>There was an error loading the diet plan. It may have been deleted or the ID is invalid.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setLocation("/diet-planner")}>
                Back to Diet Plans
              </Button>
            </CardFooter>
          </Card>
        );
      }
      
      return (
        <div className="space-y-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => setLocation("/diet-planner")} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
            <h1 className="text-2xl font-bold">{dietPlan.planName}</h1>
          </div>
          <DietPlanDisplay 
            dietPlan={dietPlan.planData as DietPlanResponse} 
            onSave={handleSavePlan}
            isSaving={saveMutation.isPending}
          />
        </div>
      );
    }
    
    // If creating a new plan
    if (matchCreate) {
      // If a plan has been generated
      if (generatedPlan) {
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Form
              </Button>
              <h1 className="text-2xl font-bold">Your Generated Diet Plan</h1>
            </div>
            <DietPlanDisplay 
              dietPlan={generatedPlan} 
              onSave={handleSavePlan}
              isSaving={saveMutation.isPending}
            />
          </div>
        );
      }
      
      // Diet plan creation form
      return (
        <div className="space-y-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
            <h1 className="text-2xl font-bold">Create Diet Plan</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Personalized Diet Plan Generator</CardTitle>
              <CardDescription>
                Create a customized 7-day meal plan based on your preferences and dietary needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProtectedFeature
                feature="diet_planning"
                fallbackMessage="You need credits to generate diet plans. Please upgrade your subscription."
              >
                <DietPlanForm 
                  onSubmit={handleSubmit} 
                  isLoading={generateMutation.isPending} 
                />
              </ProtectedFeature>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    // Default view - list of saved plans
    return <SavedDietPlans />;
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Only show tabs on the main page */}
      {!match && !matchCreate && (
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Diet Planner</h1>
          <Link href="/diet-planner/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Plan
            </Button>
          </Link>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
}