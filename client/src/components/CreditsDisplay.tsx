import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Coins, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CreditsDisplayProps {
  className?: string;
}

const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ className }) => {
  const { appUser } = useAuth();
  
  if (!appUser) return null;
  
  // Check if the user has an active premium subscription
  const isPremium = appUser.subscriptionStatus === 'active' && appUser.subscriptionTier === 'premium';
  
  // Get the credits amount
  const creditsAmount = appUser.credits || 0;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge 
            variant="outline" 
            className={cn(
              "h-7 bg-white border-slate-200 font-normal text-xs flex items-center gap-1.5 px-2 py-1", 
              isPremium && "border-amber-300 bg-amber-50", 
              className
            )}
          >
            {isPremium ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Coins className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className={cn("font-medium", isPremium ? "text-amber-700" : "text-slate-700")}>
              {isPremium ? "Premium" : `${creditsAmount} Credits`}
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {isPremium
            ? "You have unlimited access to all features"
            : creditsAmount > 0
              ? `You have ${creditsAmount} credits remaining`
              : "Purchase credits to analyze more recipes"
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreditsDisplay;