import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadStripe } from '@stripe/stripe-js';
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export default function SubscriptionPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('monthly');

  // Define plans for both intervals
  const plans = {
    monthly: [
      {
        id: "basic",
        name: "Basic",
        price: "$8",
        description: "Perfect for occasional users who need recipe analysis",
        features: [
          "50 recipe analyses per month",
          "Full culinary AI features",
          "Save unlimited favorite recipes",
          "Access to recipe library"
        ],
        notIncluded: [
          "API access",
          "Priority support"
        ],
        analysisCount: 50,
        popular: false
      },
      {
        id: "premium",
        name: "Premium",
        price: "$12",
        description: "Best value for regular cooking enthusiasts",
        features: [
          "100 recipe analyses per month",
          "All Basic features",
          "Detailed nutritional information",
          "Health benefit analysis",
          "Priority customer support"
        ],
        notIncluded: [
          "API access"
        ],
        analysisCount: 100,
        popular: true
      },
      {
        id: "unlimited",
        name: "Unlimited",
        price: "$25",
        description: "For professional chefs and food bloggers",
        features: [
          "Unlimited recipe analyses",
          "All Premium features",
          "Cost estimation analysis",
          "API access for integration",
          "24/7 priority support"
        ],
        notIncluded: [],
        analysisCount: -1,
        popular: false
      }
    ],
    yearly: [
      {
        id: "basic",
        name: "Basic Annual",
        price: "$76.80",
        originalPrice: "$96",
        description: "Save 20% with annual billing",
        features: [
          "50 recipe analyses per month",
          "Full culinary AI features",
          "Save unlimited favorite recipes",
          "Access to recipe library"
        ],
        notIncluded: [
          "API access",
          "Priority support"
        ],
        analysisCount: 50,
        popular: false
      },
      {
        id: "premium",
        name: "Premium Annual",
        price: "$115.20",
        originalPrice: "$144",
        description: "Save 20% with annual billing",
        features: [
          "100 recipe analyses per month",
          "All Basic features",
          "Detailed nutritional information",
          "Health benefit analysis",
          "Priority customer support"
        ],
        notIncluded: [
          "API access"
        ],
        analysisCount: 100,
        popular: true
      },
      {
        id: "unlimited",
        name: "Unlimited Annual",
        price: "$240",
        originalPrice: "$300",
        description: "Save 20% with annual billing",
        features: [
          "Unlimited recipe analyses",
          "All Premium features",
          "Cost estimation analysis",
          "API access for integration",
          "24/7 priority support"
        ],
        notIncluded: [],
        analysisCount: -1,
        popular: false
      }
    ]
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(true);
      
      if (!currentUser) {
        toast({
          title: "Login Required",
          description: "Please login to subscribe to a plan",
          variant: "destructive",
        });
        return;
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      // Create checkout session
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          planId,
          interval: selectedTab,
        }),
      }).then(res => res.json());

      if (response.error) {
        throw new Error(response.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = `/subscription-success?session_id=${response.clientSecret}`;
      
    } catch (error: any) {
      console.error('Error subscribing:', error);
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPerUse = async () => {
    try {
      setIsLoading(true);
      
      if (!currentUser) {
        toast({
          title: "Login Required",
          description: "Please login to purchase a single analysis",
          variant: "destructive",
        });
        return;
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      // Create checkout session for one-time payment
      const response = await fetch('/api/pay-per-use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          amount: 0.50, // $0.50 per use
        }),
      }).then(res => res.json());

      if (response.error) {
        throw new Error(response.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = `/subscription-success?session_id=${response.clientSecret}`;
      
    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
              Choose Your Recipe Analysis Plan
            </h1>
            <p className="text-muted-foreground mb-10 text-lg">
              Unlock AI-powered recipe analysis with our flexible subscription options. Get started with one free analysis, then choose the plan that fits your culinary journey.
            </p>
            
            <Tabs defaultValue="monthly" className="w-full max-w-xl mx-auto" onValueChange={(value) => setSelectedTab(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {plans.monthly.map((plan) => (
                    <Card key={plan.id} className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <CardDescription className="min-h-[60px]">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="h-4 w-4 text-primary mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-center text-muted-foreground">
                              <X className="h-4 w-4 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={plan.popular ? "default" : "outline"}
                          disabled={isLoading}
                          onClick={() => handleSubscribe(plan.id)}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                          Subscribe
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="yearly" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {plans.yearly.map((plan) => (
                    <Card key={plan.id} className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/year</span>
                          {plan.originalPrice && (
                            <div className="text-muted-foreground text-sm mt-1">
                              <s>{plan.originalPrice}</s> (20% savings)
                            </div>
                          )}
                        </div>
                        <CardDescription className="min-h-[60px]">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="h-4 w-4 text-primary mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-center text-muted-foreground">
                              <X className="h-4 w-4 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={plan.popular ? "default" : "outline"}
                          disabled={isLoading}
                          onClick={() => handleSubscribe(plan.id)}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                          Subscribe
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Just want to try it out?</h2>
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Pay Per Analysis</CardTitle>
                    <CardDescription>For occasional use without a subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-2xl font-bold">$0.50 <span className="text-sm font-normal text-muted-foreground">per analysis</span></p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={isLoading}
                      onClick={handlePayPerUse}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Purchase Single Analysis
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}