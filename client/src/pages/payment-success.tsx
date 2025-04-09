import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
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
    
    // Process payment - redirect to payment processor
    console.log('Payment success confirmed, redirecting to processor');
    navigate('/payment-processor');
  }, [setLocation, toast]);

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