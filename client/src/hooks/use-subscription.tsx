import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { checkSubscriptionStatus, updateCredits, createSubscription, SubscriptionStatus } from '@/lib/subscription';
import { queryClient } from '@/lib/queryClient';
import { useToast } from './use-toast';

export function useSubscription() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  // Get the firebase UID or fallback to a stringified number if using the internal auth system
  // This allows compatibility with both Firebase and our internal auth
  const userId = currentUser?.uid || undefined;

  const { 
    data: subscriptionData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['/api/stripe/check-subscription', userId],
    queryFn: async () => {
      if (!userId) return null;
      return await checkSubscriptionStatus(userId);
    },
    enabled: !!userId
  });

  const updateCreditsMutation = useMutation({
    mutationFn: async (newCredits: number) => {
      if (!userId) throw new Error('User not logged in');
      return await updateCredits(userId, newCredits);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/stripe/check-subscription', userId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update credits',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: async (priceId: string) => {
      if (!userId) throw new Error('User not logged in');
      return await createSubscription(userId, priceId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/stripe/check-subscription', userId] });
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create subscription',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const decrementCredits = async () => {
    if (!userId || !subscriptionData) return false;
    
    const currentCredits = subscriptionData.credits;
    
    if (currentCredits <= 0) {
      toast({
        title: 'No credits remaining',
        description: 'Please purchase a subscription to get more credits',
        variant: 'destructive'
      });
      return false;
    }
    
    try {
      await updateCreditsMutation.mutateAsync(currentCredits - 1);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    credits: subscriptionData?.credits || 0,
    hasActiveSubscription: !!subscriptionData?.active,
    subscriptionTier: subscriptionData?.subscriptionTier || 'free',
    subscriptionStatus: subscriptionData?.subscriptionStatus || 'free',
    subscriptionData: subscriptionData as SubscriptionStatus | null,
    isLoading,
    error,
    decrementCredits,
    updateCredits: updateCreditsMutation.mutate,
    createSubscription: createSubscriptionMutation.mutateAsync
  };
}