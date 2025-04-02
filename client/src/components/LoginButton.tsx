import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/use-auth";
import { useLocation } from "wouter";

interface LoginButtonProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  className?: string;
}

export default function LoginButton({ 
  variant = "default", 
  size = "default", 
  fullWidth = false,
  className = ""
}: LoginButtonProps) {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  const handleAuth = async () => {
    if (user) {
      logoutMutation.mutate();
    } else {
      navigate("/auth");
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleAuth}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          Signing out...
        </span>
      ) : (
        user ? "Sign Out" : "Sign In"
      )}
    </Button>
  );
}