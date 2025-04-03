import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signOutUser } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: () => Promise<User | void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Function to sync Firebase user with our backend
const syncFirebaseUser = async (user: User) => {
  try {
    const response = await fetch('/api/auth/firebase-sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync user with database');
    }
    
    const result = await response.json();
    
    // Save the auth token in localStorage
    if (result.token) {
      localStorage.setItem("recipe_snap_token", result.token);
      console.log("Token saved to localStorage");
    }
    
    return result;
  } catch (error) {
    console.error('Error syncing user with database:', error);
    throw error;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // If a user is signed in, sync with our backend
      if (user) {
        try {
          console.log("Attempting to sync Firebase user with backend...");
          const result = await syncFirebaseUser(user);
          console.log("User sync successful:", result);
        } catch (error) {
          console.error("Error syncing user with backend:", error);
          toast({
            title: "Authentication Error",
            description: "Failed to synchronize your account. Please try again.",
            variant: "destructive",
          });
        }
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, [toast]);

  const login = async () => {
    try {
      return await signInWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      // Remove the token from localStorage
      localStorage.removeItem("recipe_snap_token");
      
      // Call the backend to end the session
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("recipe_snap_token")}`,
          },
        });
      } catch (e) {
        console.error("Error logging out from backend:", e);
      }
      
      // Sign out from Firebase
      await signOutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};