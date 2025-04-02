import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'wouter';
import SubscriptionPage from '@/components/SubscriptionCheckout';

const SubscriptionPageWrapper = () => {
  const { currentUser } = useAuth();

  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="container mx-auto py-10">
      <SubscriptionPage />
    </div>
  );
};

export default SubscriptionPageWrapper;