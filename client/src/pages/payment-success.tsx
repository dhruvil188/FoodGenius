import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { appUser } = useAuth();
  
  // Helper function to navigate
  const navigate = (path: string) => setLocation(path);

  useEffect(() => {
    // Set a random payment token to prevent reuse
    const paymentToken = `payment_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    console.log('Created payment token:', paymentToken);
    localStorage.setItem('payment_token', paymentToken);
    
    // Check if payment data was stored before redirect to Stripe
    const hasPaymentData = localStorage.getItem('payment_data');
    const isPending = localStorage.getItem('payment_pending');
    
    if (!hasPaymentData || !isPending) {
      console.warn('Missing payment data or not in pending state');
      toast({
        title: 'Payment Processing Issue',
        description: 'Could not verify payment information. Please contact support.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
    
    // Process payment - check if user is logged in
    if (appUser) {
      // User is logged in, proceed to payment processor
      console.log('User is logged in, redirecting to payment processor');
      navigate('/payment-processor');
    } else {
      // User is not logged in, redirect to auth page
      console.log('User is not logged in, redirecting to auth page');
      // Set flag to indicate pending payment process
      localStorage.setItem('pending_payment_process', 'true');
      
      toast({
        title: 'Sign in Required',
        description: 'Please sign in to complete your payment processing.',
      });
      
      // Redirect to auth page
      navigate('/auth');
    }
  }, [setLocation, toast, appUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
        <h1 className="text-2xl font-bold mt-6">Processing Your Payment</h1>
        <p className="text-gray-600 mt-2">Please wait while we verify your payment...</p>
      </div>
    </div>
  );
}