import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: ReactNode;
  featureName?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  featureName = "this feature" 
}) => {
  const { currentUser, login } = useAuth();
  const [, navigate] = useLocation();

  if (!currentUser) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <i className="fas fa-lock text-primary text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3">Sign in Required</h2>
          <p className="text-slate-600 mb-6">
            You need to sign in to access {featureName}. It only takes a few seconds with your Google account.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full"
              onClick={login}
            >
              <i className="fab fa-google mr-2"></i>
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;