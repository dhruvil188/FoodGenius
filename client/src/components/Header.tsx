import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoginButton from './LoginButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, User, LogOut, Settings } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { currentUser, userMetadata, logout } = useAuth();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          onClick={() => navigate('/')}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo size={isMobile ? 'small' : 'medium'} />
        </motion.div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all"
            onClick={() => navigate('/library')}
          >
            <i className="fas fa-book mr-2"></i>
            Recipe Library
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-6 shadow-md"
            onClick={() => {
              if (location === '/') {
                // If already on home page, scroll to the upload section
                document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                // If on another page, navigate to home with the upload section anchor
                navigate('/#upload-section');
              }
            }}
          >
            <i className="fas fa-camera mr-2"></i>
            <span className="hidden md:inline">Analyze Dish</span>
            <span className="inline md:hidden">Analyze</span>
          </Button>
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || 'User'} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-primary text-white text-xs">
                      {currentUser.displayName ? currentUser.displayName.substring(0, 2).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMetadata && (
                  <>
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium text-foreground capitalize">{userMetadata.planType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Analyses:</span>
                        <span className="font-medium text-foreground">{userMetadata.remainingAnalyses}/{userMetadata.maxAnalyses}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => navigate('/subscription')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginButton 
              variant="outline" 
              size="sm" 
              className="rounded-full ml-1 hidden md:flex"
            />
          )}
        </div>
      </div>
    </motion.header>
  );
}