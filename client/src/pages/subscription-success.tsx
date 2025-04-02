import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/queryClient';

interface SubscriptionInfo {
  remainingAnalyses: number;
  maxAnalyses: number;
  planType: string;
}

const SubscriptionSuccess: React.FC = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        if (!currentUser) {
          setLoading(false);
          return;
        }

        const res = await apiRequest('GET', '/api/subscription/remaining');
        if (res.ok) {
          const data = await res.json();
          setSubscriptionInfo({
            remainingAnalyses: data.remainingAnalyses,
            maxAnalyses: data.maxAnalyses,
            planType: data.planType
          });
        }
      } catch (error) {
        console.error("Error fetching subscription info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionInfo();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Subscription Successful!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for subscribing to Recipe Snap
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Your subscription details:</h3>
            {subscriptionInfo ? (
              <div className="space-y-2 text-lg">
                <p>
                  <span className="font-semibold">Plan:</span>{' '}
                  {subscriptionInfo.planType.charAt(0).toUpperCase() + subscriptionInfo.planType.slice(1)}
                </p>
                <p>
                  <span className="font-semibold">Recipe analyses:</span>{' '}
                  {subscriptionInfo.remainingAnalyses} / {subscriptionInfo.maxAnalyses}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Could not retrieve subscription details. Please check your account page.
              </p>
            )}
          </div>
          <p className="mt-6 text-muted-foreground">
            Your subscription will automatically renew each month. You can manage your subscription
            from your account page at any time.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/upload">Analyze a Recipe</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;