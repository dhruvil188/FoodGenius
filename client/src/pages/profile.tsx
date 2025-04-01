import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, updateUserProfile } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useLocation } from 'wouter';

export default function Profile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [location, navigate] = useLocation();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Load user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        setDisplayName(user.displayName || profile?.displayName || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your profile. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user, toast]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      // Update user profile in Firestore
      await updateUserProfile(user.uid, {
        displayName: displayName,
        // Add other fields as needed
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'There was a problem updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    } else if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (!user) {
    return null; // Handled by the redirect in useEffect
  }

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
        Your Profile
      </h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information and how others see you on the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL || undefined} alt={displayName || user.email || 'User'} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{displayName || user.email}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="Your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                />
                <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your recipe preferences and dietary restrictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="vegetarian">Vegetarian</Label>
                <p className="text-sm text-muted-foreground">Show only vegetarian recipes</p>
              </div>
              <Switch id="vegetarian" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="vegan">Vegan</Label>
                <p className="text-sm text-muted-foreground">Show only vegan recipes</p>
              </div>
              <Switch id="vegan" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gluten-free">Gluten Free</Label>
                <p className="text-sm text-muted-foreground">Show only gluten-free recipes</p>
              </div>
              <Switch id="gluten-free" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/saved-recipes')} className="w-full">
              View Saved Recipes
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}