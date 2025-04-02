import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/use-subscription';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useState } from 'react';

export default function SubscriptionDebugPage() {
  const auth = useAuth();
  const subscription = useSubscription();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  const updateCredits = async (amount: number) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/stripe/update-credits', {
        userId: auth?.currentUser?.uid,
        credits: amount
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update credits');
      }
      
      const data = await response.json();
      setCredits(data.credits);
      
      toast({
        title: "Credits Updated",
        description: `Your credits have been updated to ${data.credits}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update credits',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="container max-w-3xl py-12 px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
            Subscription Debug Page
          </span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Use this page to check your current subscription status and manually update your credits.
        </p>
      </motion.div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription Status</CardTitle>
            <CardDescription>This shows your current subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-medium text-slate-700">User ID:</div>
              <div>{auth?.currentUser?.uid || 'Not logged in'}</div>
              
              <div className="font-medium text-slate-700">Email:</div>
              <div>{auth?.currentUser?.email || 'Not available'}</div>
              
              <div className="font-medium text-slate-700">Credits:</div>
              <div>{credits !== null ? credits : subscription?.credits || 0}</div>
              
              <div className="font-medium text-slate-700">Subscription Status:</div>
              <div>{subscription?.hasActiveSubscription ? 'Active' : 'Inactive'}</div>
              
              <div className="font-medium text-slate-700">Subscription Tier:</div>
              <div>{subscription?.subscriptionTier || 'None'}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Credits</CardTitle>
            <CardDescription>Manually update your available credits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => updateCredits(1)} 
                disabled={isLoading}
                variant="outline"
              >
                Set to 1 Credit
              </Button>
              
              <Button 
                onClick={() => updateCredits(20)} 
                disabled={isLoading}
                variant="outline"
              >
                Set to 20 Credits (Basic Plan)
              </Button>
              
              <Button 
                onClick={() => updateCredits(50)} 
                disabled={isLoading}
                variant="outline"
              >
                Set to 50 Credits (Premium Plan)
              </Button>
              
              <Button 
                onClick={() => updateCredits(100)} 
                disabled={isLoading}
              >
                Set to 100 Credits
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <Button 
            onClick={() => window.location.href = '/subscription'} 
            variant="link"
          >
            Back to Subscription Page
          </Button>
        </div>
      </div>
    </motion.div>
  );
}