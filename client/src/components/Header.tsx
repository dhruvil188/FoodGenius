import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import LoginButton from './LoginButton';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { currentUser } = useAuth();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-2 md:px-4 py-3 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container max-w-7xl mx-auto px-0 flex items-center justify-between">
        <motion.div 
          onClick={() => navigate('/')}
          className="cursor-pointer ml-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo size={isMobile ? 'small' : 'medium'} />
        </motion.div>
        
        <div className="flex items-center gap-2 relative mr-1">
          {/* Desktop Menu */}
          <Button 
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all mr-2"
            onClick={() => navigate('/library')}
          >
            <i className="fas fa-book mr-2"></i>
            Recipe Library
          </Button>
          
          <Button 
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all mr-2"
            onClick={() => {
              if (currentUser) {
                navigate('/chat');
              } else {
                navigate('/auth');
              }
            }}
          >
            <i className="fas fa-comments mr-2"></i>
            Recipe Chat
          </Button>
          
          <Button 
            variant="outline"
            className="hidden md:flex rounded-full px-4 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all mr-2"
            onClick={() => {
              if (currentUser) {
                navigate('/recipes');
              } else {
                navigate('/auth');
              }
            }}
          >
            <i className="fas fa-bookmark mr-2"></i>
            My Recipes
          </Button>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-56 z-50 overflow-hidden"
              >
                <div className="py-2 border-b border-slate-100">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-slate-50"
                    onClick={() => {
                      navigate('/library');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <i className="fas fa-book w-6 text-primary"></i>
                    Recipe Library
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-slate-50"
                    onClick={() => {
                      if (currentUser) {
                        navigate('/chat');
                      } else {
                        navigate('/auth');
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    <i className="fas fa-comments w-6 text-primary"></i>
                    Recipe Chat
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-slate-50"
                    onClick={() => {
                      if (currentUser) {
                        navigate('/recipes');
                      } else {
                        navigate('/auth');
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    <i className="fas fa-bookmark w-6 text-primary"></i>
                    My Recipes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-5 shadow-md"
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
            <i className="fas fa-camera mr-1.5"></i>
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
              className="rounded-full ml-1 flex"
            />
          )}
        </div>
      </div>
    </motion.header>
  );
}