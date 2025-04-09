import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CircleCheckBig, ChefHat, XCircle, ArrowRight } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Use confetti conditionally to avoid build errors
let Confetti: any = null;
try {
  Confetti = require('react-confetti').default;
} catch (error) {
  console.warn('Confetti component could not be loaded');
}

export default function PaymentProcessor() {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const { appUser, refreshUser } = useAuth();
  const [userCredits, setUserCredits] = useState<number>(0);
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
    if (!appUser) {
      // If no user is logged in, redirect to auth page with a return destination
      const paymentToken = localStorage.getItem('payment_token');
      if (paymentToken) {
        // Store a flag indicating we need to process payment after login
        localStorage.setItem('pending_payment_process', 'true');
        
        // Don't use alert anymore as it causes browser notification popup
        // Instead we'll rely on the UI feedback on the auth page
      }
      
      navigate('/auth');
      return;
    }

    // Check for payment data and token
    const isPending = localStorage.getItem('payment_pending') === 'true';
    const paymentDataStr = localStorage.getItem('payment_data');
    const paymentToken = localStorage.getItem('payment_token');
    
    // Process the payment automatically when the page loads
    const processPayment = async () => {
      try {
        // Safety check 1: Check for payment data
        if (!isPending || !paymentDataStr) {
          setError('No pending payment information found');
          setIsLoading(false);
          return;
        }
        
        // Safety check 2: Check for valid payment token (prevents reuse of success page)
        if (!paymentToken || !paymentToken.startsWith('payment_')) {
          console.log('No valid payment token found - generating one for testing');
          
          // Token generation for testing only - comment out in production
          /*
          const testToken = `payment_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
          localStorage.setItem('payment_token', testToken);
          console.log('Generated test payment token:', testToken);
          */
          
          // In production, just show error that token is missing
          setError('Invalid payment token. Please try your purchase again.');
          setIsLoading(false);
          return;
        }
        
        console.log('Processing payment for user:', appUser.id);
        console.log('Payment token:', paymentToken);
        
        // Add 15 credits to the user's account
        const currentCredits = appUser.credits || 0;
        const newCredits = currentCredits + 15;
        
        console.log(`Updating credits for user ${appUser.id}: ${currentCredits} → ${newCredits}`);
        
        console.log('Sending credits update request:', {
          userId: appUser.id, 
          credits: newCredits,
          currentCredits
        });

        // Ensure we have the correct user ID and new credits amount
        if (!appUser || !appUser.id) {
          throw new Error('User information is not available. Please try again.');
        }
        
        // Convert both values to numbers and log detailed information
        const userId = Number(appUser.id);
        const creditsAmount = Number(newCredits);
        
        console.log('Payment request details:', {
          rawUserId: appUser.id,
          userId,
          rawCredits: newCredits,
          creditsAmount,
          userIdType: typeof userId,
          creditsType: typeof creditsAmount
        });
        
        if (isNaN(userId) || isNaN(creditsAmount)) {
          throw new Error('Invalid user ID or credits amount. Please try again.');
        }
        
        // Make sure we're sending both params correctly
        const requestData = {
          userId,
          credits: creditsAmount
        };
        
        console.log('Sending update credits request with data:', requestData);
        
        const response = await apiRequest('POST', '/api/stripe/update-credits', requestData);
        
        // Check if response is ok
        if (!response.ok) {
          let errorText = '';
          try {
            // Try to parse as JSON
            const errorJson = await response.json();
            errorText = errorJson.message || JSON.stringify(errorJson);
          } catch (e) {
            // If not JSON, try as text
            errorText = await response.text();
          }
          
          console.error('API Error Response:', response.status, errorText);
          throw new Error(`API error ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Payment processing response:', data);

        if (data.success) {
          // Set updated credits in state for display
          setUserCredits(newCredits);
          // Refresh the user data to show updated credits
          await refreshUser();
          setVerificationComplete(true);
          
          // Clear ALL payment data from localStorage to prevent reuse
          localStorage.removeItem('payment_data');
          localStorage.removeItem('payment_pending');
          localStorage.removeItem('payment_token');
        } else {
          setError(data.message || 'Failed to update credits');
        }
      } catch (err) {
        console.error('Payment processing error:', err);
        setError('Failed to process your payment. Please contact support.');
      } finally {
        setIsLoading(false);
      }
    };

    // Short delay to ensure UI renders first
    const timer = setTimeout(() => {
      processPayment();
    }, 1000);

    return () => clearTimeout(timer);
  }, [appUser, navigate, refreshUser]);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      {verificationComplete && Confetti && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={500} 
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={`border-${error ? 'red' : 'emerald'}-200 shadow-lg`}>
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
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {isLoading ? 'Processing Your Payment...' : 
               verificationComplete ? 'Payment Successful!' : 'Payment Processing Failed'}
            </CardTitle>
            
            <CardDescription>
              {isLoading ? 'Please wait while we process your payment...' : 
               verificationComplete ? 'Thank you for your purchase!' : error}
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
                  You now have <span className="font-semibold">{appUser?.credits || userCredits}</span> credits to use for recipe analysis and premium features!
                </p>
              </motion.div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button
              className={`bg-gradient-to-r ${verificationComplete ? 'from-emerald-600 to-primary hover:from-emerald-700 hover:to-primary/90' : 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'} text-white px-8`}
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