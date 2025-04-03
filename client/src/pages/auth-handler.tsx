import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Auth handler component to process Firebase authentication redirects.
 * Redirects users to the homepage after successful authentication.
 */
const AuthHandler = () => {
  const [, navigate] = useLocation();
  const { currentUser, isLoading } = useAuth();
  const [processingAuth, setProcessingAuth] = useState(true);

  useEffect(() => {
    // If the user is authenticated, redirect to home
    if (currentUser && !isLoading) {
      navigate("/");
    } 
    // If authentication is done but no user, redirect to auth page
    else if (!isLoading && !currentUser) {
      navigate("/auth");
    }
    
    // Set a timeout to redirect to auth page if loading takes too long
    const timeout = setTimeout(() => {
      if (processingAuth) {
        console.log("Auth redirect timeout - redirecting to auth page");
        setProcessingAuth(false);
        navigate("/auth");
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [currentUser, isLoading, navigate, processingAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
      <h1 className="text-2xl font-bold mb-2">Processing Authentication</h1>
      <p className="text-muted-foreground">Please wait while we sign you in...</p>
    </div>
  );
};

export default AuthHandler;