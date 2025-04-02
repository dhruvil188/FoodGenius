import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface BuyCreditsButtonProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  className?: string;
  showCredits?: boolean;
}

export default function BuyCreditsButton({ 
  variant = "default", 
  size = "default", 
  fullWidth = false,
  className = "",
  showCredits = false
}: BuyCreditsButtonProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  // Hard-coded payment link from Stripe
  const PAYMENT_LINK = "https://buy.stripe.com/00gbMD6RBeASeoE9AB";

  const handleBuyCredits = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please sign in to purchase credits",
        variant: "destructive"
      });
      return;
    }
    
    // Open Stripe payment page in a new tab
    window.open(PAYMENT_LINK, '_blank');
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleBuyCredits}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <i className="fas fa-coins mr-2"></i>
      {showCredits ? "Buy More Credits" : "Buy Credits"}
    </Button>
  );
}