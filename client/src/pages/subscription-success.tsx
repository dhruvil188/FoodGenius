import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Confetti } from '@/components/ui/confetti';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { queryClient } from '@/lib/queryClient';

export default function SubscriptionSuccessPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Invalidate the user query to refresh subscription status
    queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
  }, []);

  // If user is not logged in, redirect to auth page
  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container max-w-lg py-16">
      <Confetti />
      
      <Card className="border-primary shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Subscription Successful!</CardTitle>
          <CardDescription className="text-lg">Thank you for subscribing to Recipe Snap</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2 pb-6">
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Your subscription details:</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium">{(user.subscriptionTier || 'free').charAt(0).toUpperCase() + (user.subscriptionTier || 'free').slice(1)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{user.subscriptionStatus}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Credits Available:</span>
                <span className="font-medium">{user.analysisCredits} analyses</span>
              </li>
            </ul>
          </div>
          
          <p className="text-center text-muted-foreground">
            You now have full access to all the features included in your subscription plan. 
            Start analyzing recipes and discover amazing dishes!
          </p>
        </CardContent>
        
        <CardFooter className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/')} className="w-full">
            Start Analyzing Recipes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}