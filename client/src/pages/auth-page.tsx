import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ChefHat, Image, Salad, ShieldCheck, UtensilsCrossed } from "lucide-react";
import { signInWithGoogle } from "@/services/firebase";

const AuthPage = () => {
  const [, navigate] = useLocation();
  const { currentUser: user, isLoading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if we have a pending payment process to resume
      const hasPendingPayment = localStorage.getItem('pending_payment_process') === 'true';
      
      if (hasPendingPayment) {
        console.log('Detected pending payment process, redirecting to payment processor');
        // Clear the pending flag
        localStorage.removeItem('pending_payment_process');
        // Redirect to payment processor
        navigate("/payment-processor");
      } else {
        // Normal login flow - redirect to home
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await signInWithGoogle();
      
      // Check if we need to redirect to payment processor
      if (localStorage.getItem('pending_payment_process') === 'true') {
        localStorage.removeItem('pending_payment_process');
        navigate('/payment-processor');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // No additional helper functions needed - we're using the Google login directly

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Auth Form Section */}
        <div>
          <div className="max-w-md mx-auto flex flex-col items-center">
            <Logo size="large" animated={true} />

            <h1 className="text-3xl font-bold mt-8 text-center mb-2">
              Welcome to Recipe Snap
            </h1>
            <p className="text-slate-500 text-center mb-8">
              Sign in to your account or create a new one to save your favorite recipes.
            </p>
            
            {localStorage.getItem('pending_payment_process') === 'true' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-amber-800 text-sm">
                <h3 className="font-medium text-amber-900 mb-1">Payment Authentication Required</h3>
                <p>Please sign in to complete your payment processing and receive your premium credits.</p>
              </div>
            )}

            {/* Google Sign-in Button */}
            <Button 
              onClick={handleGoogleLogin} 
              variant="outline" 
              className="w-full mb-4 py-6 flex items-center justify-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
                  <span>Signing in with Google...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="ml-2">Sign in with Google</span>
                </>
              )}
            </Button>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                Sign in with Google to access all features including recipe saving, analysis, and personalized recommendations. We'll give you 2 free credits to get started!
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4">
                <ShieldCheck size={24} className="text-emerald-600" />
                <p className="text-xs text-gray-500">
                  Your data is securely stored and we never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits/Hero Section */}
        <div className="lg:block hidden">
          <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-sm border border-emerald-100">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Unlock All Recipe Snap Features
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Salad size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Save Favorite Recipes</h3>
                  <p className="text-slate-500">Create a personal collection of your favorite dishes for easy access.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
                  <p className="text-slate-500">Get recipe suggestions based on your preferences and previous choices.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Track Cooking History</h3>
                  <p className="text-slate-500">Keep a record of recipes you've tried and your notes for future reference.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Image size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Unlimited Image Analysis</h3>
                  <p className="text-slate-500">Analyze as many food images as you want to discover new recipes.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Data Storage</h3>
                  <p className="text-slate-500">Your recipes and preferences are securely stored and always available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;