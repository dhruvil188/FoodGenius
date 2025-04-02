import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProtectedFeatureProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
}

export default function ProtectedFeature({
  children,
  featureName = "this feature",
  description = "Please sign in to access this feature."
}: ProtectedFeatureProps) {
  const { currentUser, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Card className="w-full max-w-md mx-auto border border-slate-200 shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold food-gradient-text">Sign In Required</CardTitle>
          <CardDescription>
            You need to be signed in to use {featureName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4 text-center">
            {description}
          </p>
          <div className="flex items-center justify-center">
            <Button onClick={login} className="px-6">
              Sign In with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-slate-500 pt-0">
          We only use your information to personalize your experience.
        </CardFooter>
      </Card>
    );
  }

  return <>{children}</>;
}