import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LockIcon } from 'lucide-react';
import LoginButton from './LoginButton';
import { useLocation } from 'wouter';

interface ProtectedFeatureProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
}

export default function ProtectedFeature({
  children,
  featureName = "Feature",
  description = "Sign in to unlock this feature"
}: ProtectedFeatureProps) {
  const { currentUser, userMetadata } = useAuth();
  const [_, navigate] = useLocation();
  
  // If the user is logged in
  if (currentUser) {
    // Check if they have a subscription or remaining analyses
    if (userMetadata && userMetadata.remainingAnalyses > 0) {
      // If they do, show the children (the protected feature)
      return <>{children}</>;
    }
    
    // If they're logged in but have no remaining analyses, prompt them to subscribe
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <LockIcon className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Remaining Analyses</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          You've used all your recipe analyses for this month. Subscribe to a plan to continue using this feature.
        </p>
        <div className="space-y-3">
          <Button onClick={() => navigate('/subscription')} className="w-full">
            Subscribe Now
          </Button>
          <Button variant="outline" onClick={() => navigate('/library')} className="w-full">
            Browse Recipe Library
          </Button>
        </div>
      </Card>
    );
  }
  
  // Not logged in, show login prompt
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center">
      <LockIcon className="h-12 w-12 text-yellow-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{featureName} Requires Sign In</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      <div className="space-y-3">
        <LoginButton fullWidth variant="default" />
        <Button variant="outline" onClick={() => navigate('/library')} className="w-full">
          Browse Recipe Library
        </Button>
      </div>
    </Card>
  );
}