import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import LoginButton from '@/components/LoginButton';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Component for authenticated users
function AuthenticatedContent() {
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const redirectToCheckout = async () => {
    setIsLoading(true);
    
    try {
      window.location.href = 'https://buy.stripe.com/test_28o3eN75Lbx619CeUU';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redirect to checkout",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Basic Plan */}
      <Card className="flex flex-col border-emerald-100 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Basic Plan</CardTitle>
          <CardDescription>For casual cooks and beginners</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">£7</span>
            <span className="text-slate-500">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>20 recipe analyses per month</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>Full access to Recipe Library</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>Save favorite recipes</span>
            </li>
          </ul>
        </CardContent>
        <div className="p-6 pt-0 mt-auto">
          <Button 
            onClick={redirectToCheckout} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Subscribe with Stripe'}
          </Button>
        </div>
      </Card>

      {/* Premium Plan */}
      <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-md">
          POPULAR
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Premium Plan</CardTitle>
          <CardDescription>For enthusiastic home chefs</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">£12</span>
            <span className="text-slate-500">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>50 recipe analyses per month</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Full access to Recipe Library</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Save favorite recipes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Priority support</span>
            </li>
          </ul>
        </CardContent>
        <div className="p-6 pt-0 mt-auto">
          <Button 
            onClick={redirectToCheckout} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
          >
            {isLoading ? 'Processing...' : 'Subscribe with Stripe'}
          </Button>
        </div>
      </Card>
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
      transition={{ duration: 0.5 }}
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

export default function SimpleSubscriptionPage() {
  const auth = useAuth();
  const currentUser = auth?.currentUser || null;

  return (
    <motion.div 
      className="container py-12 px-4"
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

      {/* FAQs */}
      <motion.div 
        className="w-full mt-20"
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