import { useState } from "react";
import { Link } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SavedDietPlan } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Calendar, Clock, Tag, CalendarClock, Trash2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function SavedDietPlans() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingPlanId, setDeletingPlanId] = useState<number | null>(null);
  
  // Query saved diet plans
  const { 
    data: dietPlans, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["/api/diet-plans"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/diet-plans");
      return await res.json() as SavedDietPlan[];
    }
  });
  
  // Delete plan mutation
  const deleteMutation = useMutation({
    mutationFn: async (planId: number) => {
      await apiRequest("DELETE", `/api/diet-plans/${planId}`);
      return planId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diet-plans"] });
      toast({
        title: "Diet plan deleted",
        description: "Your diet plan has been removed.",
      });
      setDeletingPlanId(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete plan",
        description: error.message,
        variant: "destructive",
      });
      setDeletingPlanId(null);
    }
  });
  
  // Handle delete confirmation
  const confirmDelete = (planId: number) => {
    deleteMutation.mutate(planId);
  };
  
  // Format date for display
  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };
  
  // If loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // If error
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Diet Plans</CardTitle>
          <CardDescription>Failed to load your saved diet plans</CardDescription>
        </CardHeader>
        <CardContent>
          <p>An error occurred while loading your diet plans. Please try again later.</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/diet-plans"] })}
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // If no diet plans
  if (!dietPlans || dietPlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Saved Diet Plans</CardTitle>
          <CardDescription>You haven't saved any diet plans yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Create your first personalized diet plan to get started!</p>
        </CardContent>
        <CardFooter>
          <Link href="/diet-planner/create">
            <Button>Create Diet Plan</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Saved Diet Plans</h2>
        <Link href="/diet-planner/create">
          <Button>Create New Plan</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dietPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{plan.planName}</CardTitle>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete diet plan?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this diet plan. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => confirmDelete(plan.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDate(plan.createdAt)}</span>
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-1 mb-3">
                {plan.tags && plan.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{plan.mealsPerDay} meals/day</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>7-day plan</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-1">
              <Link href={`/diet-planner/${plan.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Plan
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}