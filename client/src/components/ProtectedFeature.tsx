import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/api';
import { useLocation } from 'wouter';

export interface ProtectedFeatureProps {
  children: React.ReactNode;
  feature: string;
  fallbackMessage: string;
  costCredits?: number;
}

/**
 * Component that renders premium features only for users with credits or paid subscriptions
 * and shows a fallback message for free users
 */
const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({ 
  children, 
  feature,
  fallbackMessage,
  costCredits = 1
}) => {
  const { appUser, currentUser, login } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Check if user has access based on credits or subscription status
  const hasAccess = React.useMemo(() => {
    if (!appUser) return false;
    
    // Allow access if user has premium subscription
    if (appUser.subscriptionStatus === 'active' && appUser.subscriptionTier === 'premium') {
      return true;
    }
    
    // Allow access if user has enough credits
    return (appUser.credits || 0) >= costCredits;
  }, [appUser, costCredits]);

  // New users now get 2 free credits directly from the server when signing up
  // This effect is no longer needed
  React.useEffect(() => {
    // Credits are now set on initial signup
  }, [appUser]);
  
  const handlePurchaseCredits = () => {
    if (!currentUser) {
      login();
      return;
    }
    
    // Simply redirect to the credits page
    navigate('/credits');
    
    // Show a toast to inform the user
    toast({
      title: "Premium Credits",
      description: "You'll be redirected to our credits page where you can purchase premium credits.",
    });
  };
  
  // If user has access, render the children
  if (hasAccess) {
    return <>{children}</>;
  }
  
  // If user is not logged in, show login prompt
  if (!currentUser) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-amber-800 flex items-center justify-center">
            <Lock className="h-4 w-4 mr-2" />
            Sign In Required
          </CardTitle>
          <CardDescription className="text-center text-amber-700">
            {fallbackMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0 pb-2 space-y-2">
          <p className="text-sm text-amber-800">
            Sign in to get 2 free credits for trying this feature.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-0">
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-primary hover:from-emerald-700 hover:to-primary/90 text-white"
            onClick={login}
          >
            <i className="fab fa-google mr-2"></i>
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // If user is logged in but has no credits, show purchase prompt
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-primary-800 flex items-center justify-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Premium Feature
          </CardTitle>
          <CardDescription className="text-center text-gray-700">
            {fallbackMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0 pb-2 space-y-2">
          <p className="text-sm text-gray-700">
            {appUser?.credits 
              ? `You have ${appUser.credits} credits but need ${costCredits} for this feature.` 
              : `You need ${costCredits} credits to use this feature.`}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center pt-0">
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-primary hover:from-emerald-700 hover:to-primary/90 text-white w-full"
            onClick={handlePurchaseCredits}
            disabled={isLoading}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {isLoading ? 'Processing...' : 'Get Premium Package ($5.99)'}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Premium package includes 20 credits. One-time payment, not a subscription.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProtectedFeature;