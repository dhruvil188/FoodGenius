import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/api';
import BuyCreditsButton from './BuyCreditsButton';
import { toast } from '@/hooks/use-toast';

interface CreditsDisplayProps {
  variant?: 'simple' | 'detailed';
  className?: string;
}

export default function CreditsDisplay({ 
  variant = 'simple',
  className = ''
}: CreditsDisplayProps) {
  const { currentUser } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchUserCredits();
    }
  }, [currentUser]);

  const fetchUserCredits = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const response = await apiRequest('GET', '/api/auth/me');
      const data = await response.json();
      
      if (data.success && data.user) {
        setCredits(data.user.credits);
      }
    } catch (error) {
      console.error('Error fetching user credits:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch your credits. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
        <span className="text-sm text-muted-foreground">Loading credits...</span>
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center mr-3">
          <i className="fas fa-coins text-amber-500 mr-1.5"></i>
          <span className="font-medium">{credits !== null ? credits : '...'} credits</span>
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
            <span className="text-2xl font-bold">{credits !== null ? credits : '...'}</span>
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