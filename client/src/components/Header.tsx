import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoginButton from './LoginButton';
import { useSubscription } from '@/hooks/use-subscription';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { currentUser } = useAuth();
  const subscription = useSubscription();
  
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
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all mr-2"
            onClick={() => navigate('/library')}
          >
            <i className="fas fa-book mr-2"></i>
            Recipe Library
          </Button>
          
          {subscription && currentUser && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="hidden md:flex px-3 py-1 border border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary cursor-pointer rounded-md text-sm font-medium"
                    onClick={() => navigate('/subscription')}
                  >
                    <i className="fas fa-coins mr-2 text-amber-500"></i>
                    {subscription.credits} credits
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Available recipe analyses</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <Button 
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all"
            onClick={() => navigate('/subscription')}
          >
            <i className="fas fa-crown mr-2"></i>
            {subscription?.hasActiveSubscription ? 'Manage Plan' : 'Upgrade'}
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
            <div className="flex items-center ml-2">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-primary text-white text-xs">
                  {currentUser.displayName ? currentUser.displayName.substring(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <LoginButton 
                variant="link" 
                size="sm" 
                className="h-auto p-0 ml-2 text-xs"
              />
            </div>
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