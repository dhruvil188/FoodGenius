import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { X, ArrowLeft, CreditCard } from 'lucide-react';

export default function PaymentCancel() {
  const [, navigate] = useLocation();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold">
              Payment Cancelled
            </CardTitle>
            
            <CardDescription>
              Your payment process was cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center pb-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
              <p className="text-sm text-gray-700">
                If you encountered any issues during the payment process or have any questions, 
                please contact our support team.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={handleGoBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
            
            <Button
              className="bg-gradient-to-r from-emerald-600 to-primary hover:from-emerald-700 hover:to-primary/90 text-white"
              onClick={handleTryAgain}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}