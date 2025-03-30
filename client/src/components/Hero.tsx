import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold font-heading mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Discover Any Recipe With a Photo
      </motion.h2>
      
      <motion.p 
        className="text-slate-600 max-w-2xl mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Take a photo or upload an image of any dish, and we'll identify it and provide you with delicious recipes to recreate it at home.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button 
          onClick={scrollToUpload}
          className="bg-primary hover:bg-[#16a34a] text-white font-medium rounded-full"
          size="lg"
        >
          Try It Now
        </Button>
        
        <Button 
          variant="outline"
          className="text-primary hover:text-[#16a34a] border-primary hover:border-[#16a34a] rounded-full"
          size="lg"
        >
          Learn More
        </Button>
      </motion.div>
    </motion.section>
  );
}
