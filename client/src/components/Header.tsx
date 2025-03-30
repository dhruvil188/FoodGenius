import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-utensils text-2xl text-primary"></i>
          <h1 className="text-2xl font-semibold font-heading">
            <span className="gradient-text">Dish</span>
            <span className="text-slate-700">Detective</span>
          </h1>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-600"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </Button>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm">
            <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">How it works</a></li>
            <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Recipe Collection</a></li>
            <li>
              <Button className="bg-primary hover:bg-primary-dark rounded-full">
                Sign Up
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <ul className="space-y-3">
            <li><a href="#" className="block text-slate-600 hover:text-primary transition-colors py-2">How it works</a></li>
            <li><a href="#" className="block text-slate-600 hover:text-primary transition-colors py-2">Recipe Collection</a></li>
            <li className="pt-2">
              <Button className="bg-primary hover:bg-primary-dark rounded-full w-full">
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
