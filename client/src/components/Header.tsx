import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
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
          
          {user && (
            <Button 
              variant="outline"
              className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all"
              onClick={() => navigate('/history')}
            >
              <i className="fas fa-history mr-2"></i>
              View History
            </Button>
          )}
          
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
          
          {/* Authentication UI */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-90 transition-opacity border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.username?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline"
              className="rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary"
              onClick={() => navigate('/auth')}
            >
              Login / Register
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}