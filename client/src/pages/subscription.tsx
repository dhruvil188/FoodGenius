import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month';
  features: string[];
  badge?: string;
  analysisCount: number | 'unlimited';
  mostPopular?: boolean;
}

// Subscription plans
const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 8,
    interval: "month",
    features: [
      "50 recipe analyses per month",
      "Full recipe details",
      "Save unlimited recipes",
      "Email support"
    ],
    analysisCount: 50
  },
  {
    id: "premium",
    name: "Premium",
    price: 12,
    interval: "month",
    features: [
      "100 recipe analyses per month",
      "Full recipe details",
      "Save unlimited recipes",
      "Priority email support",
      "Enhanced nutritional insights"
    ],
    analysisCount: 100,
    mostPopular: true
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 25,
    interval: "month",
    features: [
      "Unlimited recipe analyses",
      "Full recipe details",
      "Save unlimited recipes",
      "Priority email support",
      "Enhanced nutritional insights",
      "Meal planning assistant",
    ],
    analysisCount: "unlimited",
    badge: "Best Value"
  }
];

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]); // Default to Premium
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Please log in first",
        description: "You must be logged in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest<{clientSecret: string}>(
        "POST", 
        "/api/create-subscription", 
        { 
          planId: selectedPlan.id,
          interval: isYearly ? "year" : "month"
        }
      );

      const stripe = await stripePromise;
      if (!stripe || !response.clientSecret) {
        throw new Error("Something went wrong with the payment setup.");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        clientSecret: response.clientSecret
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      console.error("Error starting subscription:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error setting up your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const payPerUse = async () => {
    if (!user) {
      toast({
        title: "Please log in first",
        description: "You must be logged in to purchase an analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest<{clientSecret: string}>(
        "POST", 
        "/api/pay-per-use",
        { amount: 0.50 }
      );

      const stripe = await stripePromise;
      if (!stripe || !response.clientSecret) {
        throw new Error("Something went wrong with the payment setup.");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        clientSecret: response.clientSecret
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate yearly prices (20% discount)
  const getPrice = (plan: Plan) => {
    return isYearly
      ? Math.floor(plan.price * 12 * 0.8)
      : plan.price;
  };

  return (
    <div className="container max-w-6xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Recipe Analysis Plan
        </motion.h1>
        <motion.p 
          className="text-slate-600 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get instant, AI-powered recipe analysis with all the details you need to cook like a pro.
          Choose the plan that fits your cooking style.
        </motion.p>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs 
            defaultValue="monthly" 
            className="w-full max-w-xs"
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge className="ml-1 bg-primary/20 text-primary">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card 
                className={`h-full flex flex-col relative ${
                  plan.mostPopular 
                    ? 'border-primary/50 shadow-lg shadow-primary/10' 
                    : 'border-slate-200'
                }`}
              >
                {plan.badge && (
                  <span className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
                    {plan.badge}
                  </span>
                )}
                {plan.mostPopular && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
                    Most Popular
                  </span>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {typeof plan.analysisCount === 'number' 
                      ? `${plan.analysisCount} analyses per month`
                      : 'Unlimited analyses'}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${getPrice(plan)}</span>
                    <span className="text-slate-500 ml-1">/{isYearly ? 'year' : 'month'}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.mostPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    onClick={() => {
                      setSelectedPlan(plan);
                      handleSubscribe();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Choose Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border-t pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Just want to try it once?</h2>
            <p className="text-slate-600 mb-6">
              If you're not ready for a subscription yet, you can pay per recipe analysis.
            </p>
            <Card className="bg-slate-50">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Single Recipe Analysis</h3>
                    <p className="text-slate-600 mb-4">One-time payment, no subscription required</p>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">$0.50</span>
                      <span className="text-slate-500 ml-1">/recipe</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={payPerUse}
                    disabled={isLoading}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {isLoading ? 'Processing...' : 'Purchase One Analysis'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}