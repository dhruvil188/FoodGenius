import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentCancel() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Helper function to navigate
  const navigate = (path: string) => setLocation(path);

  useEffect(() => {
    // Clean up any pending payment data
    localStorage.removeItem('payment_data');
    localStorage.removeItem('payment_pending');
    localStorage.removeItem('payment_token');
    
    toast({
      title: 'Payment Cancelled',
      description: 'Your payment was not completed.',
    });
  }, [toast, setLocation]);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-slate-500" />
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold">
              Payment Cancelled
            </CardTitle>
            
            <CardDescription>
              Your payment was not completed. No charges were made.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center pb-2">
            <p className="text-slate-600">
              If you experienced any issues or have questions about our payment process, please contact our support team.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              className="border-slate-200 hover:bg-slate-100 text-slate-800"
              onClick={handleReturnHome}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}