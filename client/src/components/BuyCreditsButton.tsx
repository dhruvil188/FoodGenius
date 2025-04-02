import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";

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
  const { currentUser, fetchUserCredits } = useAuth();
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
    
    // Inform user about email matching
    toast({
      title: "Payment Process",
      description: "Please use the same email as your account email for payment. Refresh the page after completing payment to see updated credits.",
    });
  };
  
  // For testing only - adds credits directly to the current user
  const handleAddTestCredits = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please sign in to test credits",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Use email for direct lookup in backend
      const response = await apiRequest('POST', '/api/stripe/update-credits', {
        email: currentUser.email,
        creditsToAdd: 12
      });
      
      console.log('Credits update response:', response);
      
      // Always fetch updated credits regardless of response
      try {
        // Wait a moment to ensure DB is updated
        setTimeout(async () => {
          const updatedCredits = await fetchUserCredits();
          console.log('Updated credits:', updatedCredits);
          
          toast({
            title: "Credits Added",
            description: `12 test credits were added. Current total: ${updatedCredits}`,
          });
        }, 1000);
      } catch (refreshError) {
        console.error("Error refreshing credits:", refreshError);
      }
    } catch (error) {
      console.error("Error adding test credits:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      
      // Try to refresh credits anyway
      fetchUserCredits().catch(e => console.error("Failed to refresh credits:", e));
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant={variant} 
        size={size} 
        onClick={handleBuyCredits}
        className={`${fullWidth ? 'w-full' : ''} ${className}`}
      >
        <i className="fas fa-coins mr-2"></i>
        {showCredits ? "Buy More Credits" : "Buy Credits"}
      </Button>
      
      {/* Only show in development for testing */}
      {import.meta.env.DEV && (
        <Button 
          variant="outline" 
          size={size} 
          onClick={handleAddTestCredits}
          className={fullWidth ? 'w-full' : ''}
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Test Add Credits
        </Button>
      )}
    </div>
  );
}