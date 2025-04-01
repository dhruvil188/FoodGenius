import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, ChevronRight } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { useLocation } from 'wouter';
import { SubscriptionPlan } from '@shared/schema';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  // Get subscription plans
  const { data: plans, isLoading: isLoadingPlans } = useQuery({
    queryKey: ['/api/subscription/plans'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/subscription/plans');
      return await res.json();
    },
  });

  // Create subscription
  const createSubscription = useMutation({
    mutationFn: async (planId: string) => {
      const res = await apiRequest('POST', '/api/subscription/create', { planId });
      return await res.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      // Update user data in cache
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: (error: Error) => {
      // Check if the error is due to missing Stripe configuration
      if (error.message && error.message.includes('STRIPE_SECRET_KEY is not configured')) {
        toast({
          title: 'Subscription Service Unavailable',
          description: 'The subscription service is currently unavailable. Please try again later.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  // Cancel subscription
  const cancelSubscription = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/subscription/cancel');
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription has been successfully cancelled.',
      });
      // Update user data in cache
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: (error: Error) => {
      // Check if the error is due to missing Stripe configuration
      if (error.message && error.message.includes('STRIPE_SECRET_KEY is not configured')) {
        toast({
          title: 'Subscription Service Unavailable',
          description: 'The subscription service is currently unavailable. Please try again later.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    createSubscription.mutate(planId);
  };

  // Handle subscription cancellation
  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      cancelSubscription.mutate();
    }
  };

  if (!user) {
    setLocation('/auth');
    return null;
  }

  if (isLoadingPlans) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of Recipe Snap with our subscription plans. Get more recipe analyses and exclusive features.
        </p>
      </div>

      {clientSecret ? (
        <div className="max-w-md mx-auto mb-8 p-8 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Complete Your Subscription</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      ) : (
        <>
          {/* Current Subscription Status */}
          <div className="mb-12 p-6 border rounded-lg shadow-sm max-w-3xl mx-auto bg-muted/30">
            <h2 className="text-xl font-semibold mb-2">Current Subscription</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">
                  <span className="font-medium">Plan:</span>{' '}
                  <Badge variant={user.subscriptionTier === 'free' ? 'outline' : 'default'}>
                    {user.subscriptionTier === 'free' ? 'Free Trial' : (user.subscriptionTier || 'free').charAt(0).toUpperCase() + (user.subscriptionTier || 'free').slice(1)}
                  </Badge>
                </p>
                <p className="text-lg mt-1">
                  <span className="font-medium">Credits Remaining:</span> {user.analysisCredits} analyses
                </p>
                <p className="text-lg mt-1">
                  <span className="font-medium">Status:</span>{' '}
                  <Badge variant={user.subscriptionStatus === 'active' ? 'default' : 'secondary'}>
                    {user.subscriptionStatus === 'none' ? 'No Subscription' : user.subscriptionStatus}
                  </Badge>
                </p>
              </div>
              {user.subscriptionStatus === 'active' && (
                <Button variant="destructive" onClick={handleCancelSubscription} disabled={cancelSubscription.isPending}>
                  {cancelSubscription.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Cancel Subscription'
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans?.map((plan: SubscriptionPlan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden ${plan.mostPopular ? 'border-primary shadow-md' : ''}`}
              >
                {plan.mostPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-4 text-sm font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.mostPopular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={createSubscription.isPending || user?.subscriptionTier === plan.name.toLowerCase()}
                  >
                    {createSubscription.isPending && selectedPlan === plan.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : user?.subscriptionTier === plan.name.toLowerCase() ? (
                      'Current Plan'
                    ) : (
                      <>
                        Select Plan
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* FAQs */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">How does the free trial work?</h3>
            <p className="text-muted-foreground">You get 1 free recipe analysis when you sign up. After that, you'll need to subscribe to one of our plans to continue analyzing recipes.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
            <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How does billing work?</h3>
            <p className="text-muted-foreground">We bill monthly and you can cancel anytime. Your subscription will remain active until the end of the current billing period.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards including Visa, Mastercard, American Express, and Discover through our secure payment processor, Stripe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}