import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AdminCreditUpdate() {
  const [userId, setUserId] = useState('');
  const [credits, setCredits] = useState('15');
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();
  const { toast } = useToast();

  const handleAddCredits = async () => {
    if (!userId || !credits) {
      toast({
        title: 'Error',
        description: 'Please enter both a user ID and credits amount',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const response = await apiRequest('POST', '/api/stripe/update-credits', {
        userId: parseInt(userId, 10),
        credits: parseInt(credits, 10),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: `Successfully added ${credits} credits to user ${userId}`,
        });
        
        // Refresh user data if it's the current user
        await refreshUser();
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update credits',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error updating credits:', err);
      toast({
        title: 'Error',
        description: 'Failed to update credits. See console for details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-yellow-800">Admin: Add Credits</CardTitle>
        <CardDescription>Manually add credits to a user account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="credits">Credits to Add</Label>
          <Input
            id="credits"
            placeholder="Enter credits amount"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddCredits} 
          disabled={loading} 
          className="w-full bg-yellow-600 hover:bg-yellow-700"
        >
          {loading ? 'Processing...' : 'Add Credits'}
        </Button>
      </CardFooter>
    </Card>
  );
}