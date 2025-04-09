import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/api';
import { CircleCheckBig, ChefHat, ArrowRight } from 'lucide-react';
// Use confetti conditionally to avoid build errors
let Confetti: any = null;
try {
  Confetti = require('react-confetti').default;
} catch (error) {
  console.warn('Confetti component could not be loaded');
}

export default function PaymentSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const { appUser } = useAuth();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      setError('Invalid payment session');
      setIsLoading(false);
      return;
    }

    // Verify payment with the server
    const verifyPayment = async () => {
      try {
        const response = await apiRequest('GET', `/api/stripe/session-status/${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setVerificationComplete(true);
        } else {
          setError(data.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Failed to verify your payment. Please contact support.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      {verificationComplete && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-emerald-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isLoading ? (
                <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
              ) : verificationComplete ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <CircleCheckBig className="w-16 h-16 text-emerald-600" />
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-2xl">!</span>
                </div>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {isLoading ? 'Verifying Your Payment...' : 
               verificationComplete ? 'Payment Successful!' : 'Payment Verification Failed'}
            </CardTitle>
            
            <CardDescription>
              {isLoading ? 'Please wait while we confirm your payment...' : 
               verificationComplete ? 'Thank you for upgrading to Premium!' : error}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center pb-2">
            {verificationComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-4"
              >
                <h3 className="font-medium text-emerald-800 mb-2 flex items-center justify-center">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Your Account Has Been Upgraded
                </h3>
                <p className="text-sm text-emerald-700">
                  You now have 10 credits to use for recipe analysis and premium features!
                </p>
                <p className="text-sm text-emerald-700 mt-2">
                  Credits: {appUser?.credits || '10'} 🎉
                </p>
              </motion.div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-primary hover:from-emerald-700 hover:to-primary/90 text-white px-8"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {verificationComplete ? 'Continue to Recipe Snap' : 'Return to Home'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}