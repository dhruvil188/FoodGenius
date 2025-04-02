import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if we're in development mode
const isDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname.includes('replit.') || 
  window.location.hostname.includes('repl.co');

if (isDevelopment) {
  console.log('Development mode detected - configuring Firebase for development environment');
  // Note: for production, you need to add this domain to Firebase Console
  // under Authentication > Settings > Authorized Domains
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Auth provider
const googleProvider = new GoogleAuthProvider();

// Add custom parameters for Google provider
googleProvider.setCustomParameters({
  // Force account selection even if one account is available
  prompt: 'select_account'
});

// Define the type for our context
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  userMetadata: UserMetadata | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface UserMetadata {
  planType: string;
  remainingAnalyses: number;
  maxAnalyses: number;
  analysisCount: number;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to fetch user subscription info
  const fetchUserSubscriptionInfo = async (user: User) => {
    try {
      const idToken = await user.getIdToken();
      
      const res = await fetch('/api/subscription/remaining', {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUserMetadata({
          planType: data.planType || 'free',
          remainingAnalyses: data.remainingAnalyses || 0,
          maxAnalyses: data.maxAnalyses || 1,
          analysisCount: data.analysisCount || 0
        });
      }
    } catch (error) {
      console.error("Error fetching subscription info:", error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // User is signed in, authenticate with our backend
        try {
          const idToken = await user.getIdToken();
          
          // Send the token to the backend
          const res = await apiRequest("POST", "/api/auth/login", {
            idToken
          });
          
          if (res.ok) {
            // Fetch user subscription info
            await fetchUserSubscriptionInfo(user);
            
            toast({
              title: "Welcome!",
              description: `Signed in as ${user.displayName || user.email}`,
            });
          } else {
            console.error("Backend authentication failed");
            setError("Failed to authenticate with server");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          setError("Authentication error");
        }
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      
      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("No credential returned from Firebase");
      }
      
      // Send the token to your backend
      const idToken = await result.user.getIdToken();
      await apiRequest("POST", "/api/auth/login", { idToken });
      
      // After successful login, fetch subscription info
      await fetchUserSubscriptionInfo(result.user);
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError(error.message || "Failed to sign in with Google");
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    }
  };

  // Sign out
  const logout = async () => {
    try {
      // First, logout from your backend
      await apiRequest("POST", "/api/auth/logout");
      
      // Then, logout from Firebase
      await signOut(auth);
      
      setUserMetadata(null);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      setError(error.message || "Failed to sign out");
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    userMetadata,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};