import { apiRequest } from './queryClient';

export interface SubscriptionStatus {
  active: boolean;
  credits: number;
  subscriptionStatus: string;
  subscriptionTier: string;
  subscription?: {
    id: string;
    status: string;
    currentPeriodEnd: Date;
  }
}

export async function checkSubscriptionStatus(userId: number): Promise<SubscriptionStatus> {
  const response = await apiRequest('POST', '/api/stripe/check-subscription', { userId });
  return await response.json();
}

export async function createStripeCustomer(userId: number) {
  const response = await apiRequest('POST', '/api/stripe/create-customer', { userId });
  return await response.json();
}

export async function createSubscription(userId: number, priceId: string) {
  const response = await apiRequest('POST', '/api/stripe/create-subscription', { userId, priceId });
  return await response.json();
}

export async function updateCredits(userId: number, credits: number) {
  const response = await apiRequest('POST', '/api/stripe/update-credits', { userId, credits });
  return await response.json();
}