import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">Dish Detective</h4>
            <p className="text-sm mb-4">Discover any recipe with just a photo. Powered by AI to help you recreate your favorite dishes at home.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-md font-semibold text-white mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recipe Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-md font-semibold text-white mb-4">Resources</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cooking Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingredient Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-md font-semibold text-white mb-4">Subscribe</h4>
            <p className="text-sm mb-4">Get weekly recipes and cooking tips delivered to your inbox.</p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-lg px-4 py-2 w-full text-slate-800 text-sm focus:ring-2 focus:ring-primary rounded-r-none" 
              />
              <Button type="submit" className="bg-primary hover:bg-[#16a34a] text-white rounded-l-none rounded-r-lg px-4">
                <i className="fas fa-paper-plane"></i>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Dish Detective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
