import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { Link } from 'wouter';

export function UserAccountNav() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  
  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };
  
  const handleOpenRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Generate user's initial for the avatar fallback
  const getUserInitials = () => {
    if (!user || !user.email) return '?';
    
    const email = user.email;
    const nameParts = email.split('@')[0].split('.');
    
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 1).toUpperCase();
    } else {
      return (nameParts[0].substring(0, 1) + nameParts[1].substring(0, 1)).toUpperCase();
    }
  };
  
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-0.5 leading-none">
                <p className="text-sm font-medium">{user.displayName || user.email}</p>
                {user.displayName && (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <span className="flex items-center">
                  <i className="fas fa-user mr-2 text-slate-500"></i>
                  Profile
                </span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/saved-recipes">
                <span className="flex items-center">
                  <i className="fas fa-bookmark mr-2 text-slate-500"></i>
                  Saved Recipes
                </span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              <i className="fas fa-sign-out-alt mr-2"></i>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleOpenLogin}>Log in</Button>
          <Button onClick={handleOpenRegister}>Sign up</Button>
        </div>
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalTab}
      />
    </>
  );
}