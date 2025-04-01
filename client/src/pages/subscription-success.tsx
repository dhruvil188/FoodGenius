import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ConfettiEffect from '@/components/ConfettiEffect';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccess() {
  const [location, setLocation] = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Parse the session_id from URL if needed
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    // In a real app, you would verify the payment status with the backend
    console.log('Session ID:', sessionId);
    
    // Countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Redirect after 5 seconds
    const redirect = setTimeout(() => {
      setLocation('/');
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [setLocation]);

  return (
    <div className="flex flex-col min-h-screen">
      {showConfetti && <ConfettiEffect duration={5000} />}
      
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-primary/10 p-8 rounded-lg border border-primary/20">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-20 w-20 text-primary" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
              Payment Successful!
            </h1>
            
            <p className="text-xl mb-8">
              Thank you for your purchase! Your subscription has been activated and you now have access to all the features.
            </p>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
              <ul className="space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
                  <span>Start uploading food photos for AI recipe analysis</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
                  <span>Save your favorite recipes to your personal library</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
                  <span>Explore our recipe library for culinary inspiration</span>
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setLocation('/')}
              size="lg"
              className="min-w-[200px]"
            >
              Go to Homepage {countdown > 0 ? `(${countdown})` : ''}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}