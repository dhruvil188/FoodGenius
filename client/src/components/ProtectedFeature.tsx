import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, CreditCard } from 'lucide-react';
import { useLocation } from 'wouter';

export interface ProtectedFeatureProps {
  children: React.ReactNode;
  feature: string;
  fallbackMessage: string;
}

/**
 * Component that renders premium features only for users with credits or paid subscriptions
 * and shows a fallback message for free users
 */
const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({ 
  children, 
  feature,
  fallbackMessage
}) => {
  const { currentUser } = useAuth();
  const [, setLocation] = useLocation();
  
  // For now, always grant access if the user is logged in
  // In a production app, we would check for subscription status from custom claims or database
  const hasAccess = !!currentUser;
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-amber-800 flex items-center justify-center">
          <Lock className="h-4 w-4 mr-2" />
          Premium Feature
        </CardTitle>
        <CardDescription className="text-center text-amber-700">
          {fallbackMessage}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-0 pb-2 space-y-2">
        <p className="text-sm text-amber-800">
          This feature requires credits or a subscription to use.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        <Button 
          className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white"
          onClick={() => {
            // Redirect to auth page for login
            setLocation('/auth');
          }}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Upgrade Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProtectedFeature;