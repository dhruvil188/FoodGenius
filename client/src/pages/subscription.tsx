import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import LoginButton from '@/components/LoginButton';
import { useSubscription } from '@/hooks/use-subscription';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
        'client-reference-id'?: string;
        'customer-email'?: string;
      }
    }
  }
}

// Component for authenticated users showing Stripe pricing table
function AuthenticatedContent() {
  const auth = useAuth();
  const subscription = useSubscription();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const stripePricingTableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load the Stripe Pricing Table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Add function to open Stripe Customer Portal
  const openCustomerPortal = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/stripe/create-portal-session', {
        userId: auth?.currentUser?.uid
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to open customer portal');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Customer Portal
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to open customer portal',
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      ref={stripePricingTableRef}
    >
      {/* Show Manage Subscription button for existing subscribers */}
      {subscription?.hasActiveSubscription && (
        <div className="mb-10 text-center">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Manage Your Subscription</CardTitle>
              <CardDescription>
                You currently have an active {subscription.subscriptionTier} subscription with {subscription.credits} credits remaining.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button 
                onClick={openCustomerPortal} 
                disabled={isLoading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : 'Manage Subscription'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Show pricing table for new subscribers or upgrades */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1R9IbVRp4HZDUL91mFDGhAlx"
        publishable-key="pk_live_51R9AjYRp4HZDUL91ckxYco82qgJQ9Sm6BMiwc4n6rPPWEGXcqM1kcOSG7WyUQ0v6DXDVObTe4CCfYy2vxJJGDsSb00e0wVjj8D"
        client-reference-id={auth?.currentUser?.uid}
        customer-email={auth?.currentUser?.email || undefined}
      />
    </motion.div>
  );
}

// Login component for unauthenticated users
function UnauthenticatedContent() {
  return (
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sign in to Subscribe</CardTitle>
          <CardDescription>You need to be logged in to subscribe to Recipe Snap</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <LoginButton 
            variant="default" 
            size="lg" 
            fullWidth={false} 
            className="px-8"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SubscriptionPage() {
  const auth = useAuth();
  const currentUser = auth?.currentUser || null;

  return (
    <motion.div 
      className="container max-w-5xl py-12 px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
            Recipe Snap Subscription
          </span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Get unlimited access to AI-powered recipe analysis and unlock the full potential of your cooking experience.
        </p>
      </motion.div>

      {currentUser ? <AuthenticatedContent /> : <UnauthenticatedContent />}

      {/* FAQs - shown to both authenticated and unauthenticated users */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">How does the credit system work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Each recipe analysis costs 1 credit. Credits are refreshed monthly when your subscription renews. 
                Any unused credits do not roll over to the next month.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Can I cancel my subscription at any time?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">What happens if I run out of credits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                If you run out of credits, you'll need to wait until your next billing cycle for your credits to refresh. 
                You can still browse your saved recipes and the recipe library without using credits.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Is there a free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                New users receive one free recipe analysis after signing up. This allows you to experience the full functionality
                before committing to a subscription.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}