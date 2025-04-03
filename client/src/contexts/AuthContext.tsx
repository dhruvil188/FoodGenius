import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { 
  auth, 
  setupAuthListener, 
  signInWithGoogle, 
  logoutUser, 
  syncUserWithBackend 
} from "@/services/firebase";
import { useToast } from "@/hooks/use-toast";
import { AppUser, AuthResponse } from "@shared/schema";
import { handleApiError, ErrorType, safeAsync } from "@/services/error";

interface AuthContextType {
  currentUser: User | null;
  appUser: AppUser | null;
  isLoading: boolean;
  login: () => Promise<AuthResponse | void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = setupAuthListener(async (user) => {
      setCurrentUser(user);
      
      // If a user is signed in, sync with our backend
      if (user) {
        try {
          const [error, result] = await safeAsync<AuthResponse>(
            syncUserWithBackend(user),
            "Failed to synchronize your account"
          );
          
          if (result && !error) {
            setAppUser(result.user);
          }
        } catch (error) {
          handleApiError(error, "Failed to synchronize your account");
        }
      } else {
        // User is logged out
        setAppUser(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, [toast]);

  const login = async () => {
    try {
      setIsLoading(true);
      const response = await signInWithGoogle();
      setAppUser(response.user);
      return response;
    } catch (error) {
      // Check if it's an unauthorized domain error
      if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'auth/unauthorized-domain') {
        // Don't show the toast for unauthorized domain errors
        console.warn("Firebase authentication domain error. Make sure image2recipe.com is added as an authorized domain in Firebase console.");
        
        // Try to continue with the app anyway if possible
        // Don't display error message to the user
      } else {
        // For other errors, show a toast
        handleApiError(error, "Failed to sign in with Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setAppUser(null);
    } catch (error) {
      handleApiError(error, "Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    appUser,
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