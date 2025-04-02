import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

export default function SubscriptionPage() {
  let auth = null;
  let subscription = null;
  let error = false;
  
  try {
    auth = useAuth();
  } catch (e) {
    console.error("Auth context error:", e);
    error = true;
  }
  
  try {
    if (!error && auth?.currentUser) {
      subscription = useSubscription();
    }
  } catch (e) {
    console.error("Subscription context error:", e);
  }
  
  const currentUser = auth?.currentUser || null;
  const credits = subscription?.credits || 0;
  const hasActiveSubscription = subscription?.hasActiveSubscription || false;
  const subscriptionTier = subscription?.subscriptionTier || 'free';
  const subscriptionData = subscription?.subscriptionData || null;
  const createSubscriptionFn = subscription?.createSubscription;
  
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();

  const handleSubscribe = async (priceId: string) => {
    if (!currentUser) {
      toast({
        title: 'Authentication required',
        description: 'Please login to subscribe',
        variant: 'destructive'
      });
      return;
    }

    if (!createSubscriptionFn) {
      toast({
        title: 'Subscription service unavailable',
        description: 'Please try again later',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await createSubscriptionFn(priceId);
      
      if (result?.clientSecret) {
        // Redirect to a checkout page with Stripe Elements
        // This is just a placeholder - in a real app, you would use the client secret
        // to render Stripe Elements
        toast({
          title: 'Subscription started',
          description: 'Your subscription has been initiated.',
        });
      }
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Credit Status */}
      {currentUser && (
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white shadow-md border border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your Credit Status</CardTitle>
              <CardDescription>Current subscription and available credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-500">Available Credits</span>
                      <span className="text-sm font-bold">{credits} credits</span>
                    </div>
                    <Progress value={credits} max={subscriptionTier === 'premium' ? 50 : 20} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Subscription Status</span>
                      <Badge variant={hasActiveSubscription ? "default" : "outline"} className={hasActiveSubscription ? "bg-green-500 hover:bg-green-600" : ""}>
                        {hasActiveSubscription ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Plan</span>
                      <span className="text-sm font-medium capitalize">{subscriptionTier}</span>
                    </div>
                    {subscriptionData?.subscription && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Renewal Date</span>
                        <span className="text-sm font-medium">
                          {new Date(subscriptionData.subscription.currentPeriodEnd).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Pricing Section */}
      <motion.div 
        className="w-full mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex justify-center items-center mb-8">
          <span className={`text-sm font-medium mr-2 ${!isAnnual ? 'text-primary' : 'text-slate-500'}`}>Monthly</span>
          <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm font-medium ml-2 ${isAnnual ? 'text-primary' : 'text-slate-500'}`}>
            Annual <Badge variant="outline" className="ml-1.5 bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Save 20%</Badge>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <Card className="border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-br from-slate-50 to-slate-100 pb-8">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold">Basic Plan</span>
                <Badge variant="outline" className="ml-2">Most Popular</Badge>
              </CardTitle>
              <div className="mt-4">
                <div className="flex items-baseline text-left">
                  <span className="text-4xl font-extrabold">£{isAnnual ? '5.60' : '7'}</span>
                  <span className="ml-1 text-xl text-slate-500 font-medium">/month</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-slate-500 mt-1">£67.20 billed annually</div>
                )}
                <div className="flex items-center text-sm text-emerald-600 font-medium mt-2">
                  <span className="bg-emerald-100 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span>20 recipe analyses per month</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-2">
              <ul className="space-y-3">
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Complete recipe instructions</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Nutritional information</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Recipe variations</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Health benefits analysis</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Side dish recommendations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button 
                onClick={() => handleSubscribe('price_basic')} 
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : 'Subscribe Now'}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border border-primary/30 shadow-xl overflow-hidden relative hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              BEST VALUE
            </div>
            <CardHeader className="bg-gradient-to-br from-emerald-50 to-green-100 pb-8">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold">Premium Plan</span>
              </CardTitle>
              <div className="mt-4">
                <div className="flex items-baseline text-left">
                  <span className="text-4xl font-extrabold">£{isAnnual ? '9.60' : '12'}</span>
                  <span className="ml-1 text-xl text-slate-500 font-medium">/month</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-slate-500 mt-1">£115.20 billed annually</div>
                )}
                <div className="flex items-center text-sm text-emerald-600 font-medium mt-2">
                  <span className="bg-emerald-100 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span>50 recipe analyses per month</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-2">
              <ul className="space-y-3">
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Everything in Basic plan</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Cost estimation & alternatives</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Cooking science explanations</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Cultural context & history</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Advanced cooking techniques</span>
                </li>
                <li className="flex">
                  <i className="fas fa-check text-primary mr-3 mt-1"></i>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button 
                onClick={() => handleSubscribe('price_premium')} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : 'Subscribe Now'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>

      {/* FAQs */}
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