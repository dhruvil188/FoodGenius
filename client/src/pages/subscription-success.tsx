import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ChefHat } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/api";
import ConfettiEffect from "@/components/ConfettiEffect";

interface PaymentStatus {
  success: boolean;
  planName?: string;
  analysisCount?: number | "unlimited";
  error?: string;
}

export default function SubscriptionSuccess() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Extract session_id from URL
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get("session_id");
    
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setStatus({
            success: false,
            error: "No session ID provided. Unable to verify payment."
          });
          setLoading(false);
          return;
        }
        
        // In a real implementation, we would verify the payment with our backend
        // For now, we'll just simulate a successful payment
        // const response = await apiRequest("GET", `/api/verify-payment?session_id=${sessionId}`);
        
        // Simulate a successful response
        setTimeout(() => {
          setStatus({
            success: true,
            planName: "Premium Plan",
            analysisCount: 100
          });
          setLoading(false);
          setShowConfetti(true);
        }, 1000);
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus({
          success: false,
          error: "Failed to verify payment status. Please contact support."
        });
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold mb-2">Verifying Your Payment</h2>
        <p className="text-slate-600">Please wait while we confirm your subscription...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {showConfetti && <ConfettiEffect duration={5000} />}
      
      <motion.div
        className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-lg border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status?.success ? (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle size={40} className="text-green-600" />
              </motion.div>
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <p className="text-slate-600 mt-2">
                Thank you for subscribing to Recipe Snap{status.planName && ` - ${status.planName}`}
              </p>
              
              <div className="bg-slate-50 p-4 w-full rounded-lg mt-6">
                <h3 className="font-medium mb-2">Subscription Details:</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Recipe Analyses:</span>
                  <span className="font-medium">{status.analysisCount === "unlimited" ? "Unlimited" : status.analysisCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/")} 
                className="w-full"
              >
                <ChefHat className="mr-2 h-4 w-4" />
                Start Analyzing Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-6">
              An email receipt has been sent to your email address.
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Verification Failed</h2>
              <p className="text-slate-600 mb-6">{status?.error || "There was an issue verifying your payment."}</p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/subscription")} 
                className="w-full"
              >
                Return to Subscription Page
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")} 
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}