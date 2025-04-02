import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth, signInWithGoogle, signOutUser } from "@/lib/firebase";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  userCredits: number | null;
  isLoadingCredits: boolean;
  login: () => Promise<User | void>;
  logout: () => Promise<void>;
  fetchUserCredits: () => Promise<number>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const { toast } = useToast();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // User is signed in, get their ID token
        try {
          const token = await getIdToken(user);
          localStorage.setItem("recipe_snap_token", token);
          
          // Fetch initial user credits
          fetchUserCredits();
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        // User is signed out, clear token
        localStorage.removeItem("recipe_snap_token");
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserCredits = async (): Promise<number> => {
    if (!currentUser) {
      setUserCredits(null);
      return 0;
    }
    
    setIsLoadingCredits(true);
    
    try {
      const response = await apiRequest('GET', '/api/auth/me');
      const data = await response.json();
      
      if (data.success && data.user) {
        const credits = data.user.credits || 0;
        setUserCredits(credits);
        return credits;
      } else {
        setUserCredits(0);
        return 0;
      }
    } catch (error) {
      console.error('Error fetching user credits:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch your credits. Please try again.',
        variant: 'destructive'
      });
      setUserCredits(0);
      return 0;
    } finally {
      setIsLoadingCredits(false);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithGoogle();
      
      if (user) {
        // Get user token and save it
        const token = await getIdToken(user);
        localStorage.setItem("recipe_snap_token", token);
        
        // Register or sync the user with our database
        try {
          // Send the user's Firebase information to our server to ensure they exist in our database
          const registerResponse = await apiRequest('POST', '/api/auth/register', {
            username: user.displayName || user.email?.split('@')[0] || 'user_' + Math.floor(Math.random() * 1000),
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            profileImage: user.photoURL
          });
          
          console.log('User registered or synced with database:', await registerResponse.json());
        } catch (error) {
          console.error('Error registering user with database:', error);
        }
        
        // Fetch user credits after login
        fetchUserCredits();
      }
      
      return user;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive"
      });
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("recipe_snap_token");
      setUserCredits(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const value = {
    currentUser,
    isLoading,
    userCredits,
    isLoadingCredits,
    login,
    logout,
    fetchUserCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export as named function to avoid Fast Refresh issues
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}