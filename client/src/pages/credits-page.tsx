import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Sparkles, CheckCircle, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Skeleton } from '@/components/ui/skeleton';

export default function CreditsPage() {
  const { appUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  if (!appUser) {
    navigate('/auth');
    return null;
  }
  
  // Detect if user has premium status
  const isPremium = appUser.subscriptionStatus === 'active' && appUser.subscriptionTier === 'premium';
  
  // Function to handle purchase of premium plan
  const handlePurchasePremium = async () => {
    try {
      setLoading(true);
      
      // Call the API to create a checkout session
      const response = await apiRequest('POST', '/api/stripe/create-checkout-session');
      const data = await response.json();
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageLayout
      title="Credits"
      subtitle="Manage your Recipe Snap credits and subscription"
    >
      <div className="container max-w-5xl mx-auto py-8">
        {/* Current Credits Status */}
        <div className="flex items-center justify-center mb-8">
          <Card className="w-full max-w-md border-primary/10">
            <CardHeader>
              <CardTitle className="text-center">Your Balance</CardTitle>
              <CardDescription className="text-center">
                {isPremium 
                  ? "You have unlimited access with Premium" 
                  : "Credits are used for image analysis and recipe generation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              {isPremium ? (
                <div className="flex flex-col items-center">
                  <div className="bg-amber-50 p-4 rounded-full mb-4">
                    <Crown className="h-12 w-12 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-700">Premium Subscription</h3>
                  <p className="text-slate-600 mt-2">Unlimited recipe analysis</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <Coins className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">{appUser.credits || 0} Credits</h3>
                  <p className="text-slate-600 mt-2">1 credit = 1 recipe analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Pricing Plans */}
        <h2 className="text-2xl font-bold text-center mb-6">Choose a Plan</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className={`border-primary/10 ${!isPremium && (appUser.credits || 0) <= 0 ? 'bg-slate-50' : ''}`}>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>Try Recipe Snap with limited credits</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">Free</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>2 credits upon sign-up</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Basic recipe analysis</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Access to recipe library</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                disabled
              >
                Current Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className={`${isPremium ? 'bg-amber-50 border-amber-200' : 'border-primary/10'}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Premium Plan</CardTitle>
                {isPremium && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
              <CardDescription>Unlimited recipe analysis</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">$5.99</span>
                <span className="text-sm ml-1">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start">
                <Sparkles className="mr-2 h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Unlimited</strong> recipe analysis</span>
              </div>
              <div className="flex items-start">
                <Sparkles className="mr-2 h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Advanced recipe details</span>
              </div>
              <div className="flex items-start">
                <Sparkles className="mr-2 h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={isPremium ? "outline" : "default"}
                className={`w-full ${!isPremium ? 'bg-gradient-to-r from-primary to-emerald-600' : ''}`}
                onClick={handlePurchasePremium}
                disabled={isPremium || loading}
              >
                {loading ? (
                  <>
                    <Skeleton className="h-5 w-5 mr-2 rounded-full animate-spin" />
                    Processing...
                  </>
                ) : isPremium ? (
                  'Current Plan'
                ) : (
                  'Get Premium'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Explainer section */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="text-lg font-semibold mb-2">How credits work</h3>
          <p className="text-slate-600 mb-4">
            Each credit allows you to analyze one food image and generate a detailed recipe. 
            Free users get 2 credits upon signup. Premium users get unlimited recipe analysis forever.
          </p>
          <p className="text-slate-600">
            All payments are processed securely through Stripe.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}