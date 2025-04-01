import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, CreditCard } from "lucide-react";

interface CheckoutFormProps {
  returnUrl: string;
}

const CheckoutForm = ({ returnUrl }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }
    
    setProcessing(true);
    
    // Use confirm method on the Payment Element to submit the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });
    
    setProcessing(false);
    
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Set error message for display
      setErrorMessage(error.message ?? "An unexpected error occurred.");
    } else {
      // Payment processing is being handled by Stripe redirect
    }
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
        <p className="text-slate-600">
          Enter your payment details to complete your subscription.
        </p>
      </div>
      
      <PaymentElement className="mb-8" />
      
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || processing} 
        className="w-full relative py-6"
      >
        {processing ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Complete Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        )}
      </Button>
      
      <p className="text-center text-slate-500 text-sm mt-6">
        Your payment is processed securely by Stripe. We don't store your card details.
      </p>
    </motion.form>
  );
};

export default CheckoutForm;