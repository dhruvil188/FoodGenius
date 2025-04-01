import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  onAuthChange, 
  getUserProfile,
  signInWithGoogle
} from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

// Define the context type
type AuthContextType = {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

// Create the context with an empty default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  loginWithGoogle: async () => {},
});

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      // If user is logged in, fetch their profile
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Set a basic profile if we couldn't fetch the full one
          setUserProfile({
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            createdAt: new Date().toISOString(),
            recipeCount: 0
          });
          
          // Only show an error toast if it's not an "unavailable" error
          if ((error as any)?.code !== 'unavailable') {
            toast({
              title: "Connection Issue",
              description: "Unable to load your complete profile. Some features may be limited.",
              variant: "destructive"
            });
          }
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Log in with email and password
  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      toast({
        title: "Success!",
        description: "You are now logged in.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to log in";
      
      // Parse Firebase error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw error;
    }
  };

  // Register a new user
  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to create account";
      
      // Parse Firebase error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw error;
    }
  };

  // Log out
  const logout = async () => {
    try {
      await logoutUser();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Login with Google
  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You are now logged in with Google.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to log in with Google";
      
      // Parse Firebase error messages
      if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup was blocked by your browser. Please allow popups for this site.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Login process was cancelled.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw error;
    }
  };

  // The value passed to the provider includes the current user state and auth methods
  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};