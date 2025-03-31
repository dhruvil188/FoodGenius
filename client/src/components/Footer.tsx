import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="bg-slate-50 py-8 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Logo size="small" animated={false} />
            <p className="text-slate-500 mt-2 text-sm max-w-xs">
              Your AI-powered cooking assistant. Upload food photos and get instant recipe suggestions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm mb-3 text-slate-800">Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <a href="#" className="flex items-center gap-1">
                    <i className="fas fa-camera-retro"></i> Image Analysis
                  </a>
                </li>
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <a href="#" className="flex items-center gap-1">
                    <i className="fas fa-list-check"></i> Recipe Steps
                  </a>
                </li>
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <a href="#" className="flex items-center gap-1">
                    <i className="fas fa-apple-alt"></i> Nutrition Info
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm mb-3 text-slate-800">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <Link href="/library" className="flex items-center gap-1">
                    <i className="fas fa-book"></i> Recipe Library
                  </Link>
                </li>
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <Link href="/contact" className="flex items-center gap-1">
                    <i className="fas fa-envelope"></i> Contact Us
                  </Link>
                </li>
                <li className="text-slate-500 hover:text-primary transition-colors">
                  <a href="#" className="flex items-center gap-1">
                    <i className="fas fa-lightbulb"></i> Tips & Tricks
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col col-span-2 md:col-span-1">
              <h4 className="font-semibold text-sm mb-3 text-slate-800">Join Our Community</h4>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <p className="text-xs text-slate-500">
                Share your culinary creations with us and join our cooking community!
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {currentYear} Recipe Snap. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}