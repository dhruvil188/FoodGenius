import React, { useState, useEffect } from 'react';
import { 
  useStripe, 
  useElements, 
  PaymentElement, 
  Elements 
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Initialize Stripe with the public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// The form inside of the Elements context
const CheckoutForm = ({ planName, planPrice }: { planName: string, planPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/subscription/success`,
      },
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred during payment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for subscribing!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-1">Order Summary</h3>
        <div className="flex justify-between text-sm mb-3">
          <span>Recipe Snap {planName} Plan</span>
          <span>${(planPrice / 100).toFixed(2)}/month</span>
        </div>
        <div className="h-px bg-border my-3"></div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${(planPrice / 100).toFixed(2)}</span>
        </div>
      </div>

      <PaymentElement />

      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${(planPrice / 100).toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

// Plan selection and subscription management
type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxAnalyses: number;
};

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 800, // $8.00
    features: [
      '50 recipe analyses per month',
      'Full access to recipe library',
      'Save favorite recipes',
      'Email support'
    ],
    maxAnalyses: 50
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1200, // $12.00
    features: [
      '100 recipe analyses per month',
      'All Basic features',
      'Priority support',
      'Health benefits analysis'
    ],
    maxAnalyses: 100
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 2500, // $25.00
    features: [
      'Unlimited recipe analyses',
      'All Premium features',
      'Cost estimation for recipes',
      'Advanced recipe variations',
      'Premium support'
    ],
    maxAnalyses: Number.MAX_SAFE_INTEGER
  }
];

interface SubscriptionDetailsProps {
  currentPlan?: string;
  remainingAnalyses?: number;
  maxAnalyses?: number;
  analysisCount?: number;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ 
  currentPlan = 'free', 
  remainingAnalyses = 1,
  maxAnalyses = 1,
  analysisCount = 0
}) => {
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
        <CardDescription>
          {currentPlan === 'free' 
            ? 'You are on the free plan with limited recipe analyses' 
            : `You are subscribed to the ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Remaining Analyses</span>
            <span className="font-medium">{remainingAnalyses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Analyses</span>
            <span className="font-medium">{maxAnalyses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Used</span>
            <span className="font-medium">{analysisCount}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${Math.min(100, (analysisCount / maxAnalyses) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-muted-foreground">
            <span>0</span>
            <span>{maxAnalyses}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetailsProps | null>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch the current subscription details
    const fetchSubscriptionDetails = async () => {
      try {
        const res = await apiRequest("GET", "/api/subscription/remaining");
        if (res.ok) {
          const data = await res.json();
          setSubscriptionDetails({
            currentPlan: data.planType,
            remainingAnalyses: data.remainingAnalyses,
            maxAnalyses: data.maxAnalyses,
            analysisCount: data.analysisCount
          });
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };
    
    if (currentUser) {
      fetchSubscriptionDetails();
    }
  }, [currentUser]);

  const initializeCheckout = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/subscription", {
        planId: selectedPlan.id
      });
      
      if (!res.ok) {
        throw new Error("Failed to initialize checkout");
      }
      
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Checkout Error",
        description: "Unable to initiate checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      
      {subscriptionDetails && (
        <SubscriptionDetails {...subscriptionDetails} />
      )}
      
      {!clientSecret ? (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${selectedPlan.id === plan.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-xl font-bold">${(plan.price / 100).toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={selectedPlan.id === plan.id ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {selectedPlan.id === plan.id ? 'Selected' : 'Select'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={initializeCheckout} 
              size="lg" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing checkout...
                </>
              ) : (
                `Proceed with ${selectedPlan.name} Plan`
              )}
            </Button>
          </div>
        </>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>Subscribe to the {selectedPlan.name} plan</CardDescription>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm planName={selectedPlan.name} planPrice={selectedPlan.price} />
            </Elements>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setClientSecret('')}>
              Back to Plans
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPage;