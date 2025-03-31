import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  
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
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all"
            onClick={() => navigate('/account')}
          >
            <i className={`fas ${user ? 'fa-user' : 'fa-sign-in-alt'} mr-2`}></i>
            {user ? 'My Account' : 'Sign In'}
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-6 shadow-md"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-camera mr-2"></i>
            <span className="hidden md:inline">Analyze Dish</span>
            <span className="inline md:hidden">Analyze</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}