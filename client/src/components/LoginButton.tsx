import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
  const { currentUser, login, logout } = useAuth();

  const handleAuth = async () => {
    if (currentUser) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleAuth}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {currentUser ? "Sign Out" : "Sign In with Google"}
    </Button>
  );
}