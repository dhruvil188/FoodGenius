import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          onClick={() => navigate('/')}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo size={isMobile ? 'small' : 'medium'} />
        </motion.div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 font-medium"
            onClick={() => navigate('/history')}
          >
            <i className="fas fa-history"></i>
            <span>View History</span>
          </Button>
          
          <Button 
            size="sm"
            className="flex items-center gap-2 font-medium bg-primary text-white hover:bg-primary/90"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-camera"></i>
            <span className="hidden md:inline">Analyze Dish</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}