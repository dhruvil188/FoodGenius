import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut } from './supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session on component mount
    const setupAuth = async () => {
      try {
        // Check for an active session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        
        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user || null);
            setLoading(false);
          }
        );
        
        // Clean up the subscription when the component unmounts
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up authentication:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to load authentication configuration',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    // Start the setup process and store the cleanup function
    const cleanup = setupAuth();
    
    // Return a cleanup function
    return () => {
      // When cleanup is a promise that resolves to a function
      if (cleanup instanceof Promise) {
        cleanup.then(cleanupFn => {
          if (typeof cleanupFn === 'function') {
            cleanupFn();
          }
        }).catch(err => console.error('Cleanup error:', err));
      }
    };
  }, [toast]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error, data } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      
      setUser(data.user);
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error, data } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Account created',
        description: 'Welcome to Recipe Snap! Your account has been created successfully.',
      });
      
      setUser(data.user);
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: 'Sign up failed',
        description: error.message || 'There was a problem creating your account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      await signOut();
      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: 'Sign out failed',
        description: error.message || 'There was a problem signing out.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}