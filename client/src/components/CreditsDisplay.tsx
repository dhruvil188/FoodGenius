import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BuyCreditsButton from './BuyCreditsButton';

interface CreditsDisplayProps {
  variant?: 'simple' | 'detailed';
  className?: string;
}

export default function CreditsDisplay({ 
  variant = 'simple',
  className = ''
}: CreditsDisplayProps) {
  const { currentUser, userCredits, isLoadingCredits, fetchUserCredits } = useAuth();
  
  // Refresh credits every 10 seconds if user is logged in
  useEffect(() => {
    if (currentUser) {
      // Initial fetch
      fetchUserCredits();
      
      // Set up interval for periodic refresh
      const intervalId = setInterval(() => {
        console.log('Auto-refreshing user credits...');
        fetchUserCredits();
      }, 10000); // 10 seconds
      
      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [currentUser, fetchUserCredits]);

  if (!currentUser) {
    return null;
  }

  if (isLoadingCredits) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
        <span className="text-sm text-muted-foreground">Loading credits...</span>
      </div>
    );
  }

  const displayCredits = userCredits !== null ? userCredits : 0;
  
  if (variant === 'simple') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center mr-3">
          <i className="fas fa-coins text-amber-500 mr-1.5"></i>
          <span className="font-medium">{displayCredits} credits</span>
        </div>
        <BuyCreditsButton 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
        />
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg bg-card ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-medium mb-1">Your Credits</h3>
          <div className="flex items-center">
            <i className="fas fa-coins text-amber-500 text-xl mr-2"></i>
            <span className="text-2xl font-bold">{displayCredits}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Credits are used for recipe analysis
          </p>
        </div>
        <BuyCreditsButton 
          variant="default"
          showCredits
        />
      </div>
    </div>
  );
}