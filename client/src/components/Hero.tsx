import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Hero() {
  const [location, navigate] = useLocation();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const featureItems = [
    {
      icon: "fa-camera-retro",
      title: "Instant Analysis",
      description: "Upload a photo of any dish and get instant identification and detailed information"
    },
    {
      icon: "fa-utensils",
      title: "Complete Recipes",
      description: "Step-by-step instructions with progress tracking and ingredient lists"
    },
    {
      icon: "fa-apple-alt",
      title: "Nutrition Facts",
      description: "Detailed nutritional information and healthier ingredient alternatives"
    },
    {
      icon: "fa-carrot",
      title: "Recipe Variations",
      description: "Customize recipes to your taste preferences (spicy, buttery, non-spicy)"
    },
    {
      icon: "fa-fire",
      title: "Cooking Tips",
      description: "Expert cooking suggestions and complementary side dish recommendations"
    },
    {
      icon: "fa-history",
      title: "Save & Share",
      description: "Save your cooking history and share your favorite recipes with friends"
    }
  ];
  
  return (
    <>
      <motion.section 
        className="relative overflow-hidden pt-16 pb-16 md:pt-20 md:pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSI0OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjQ4IiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iMSIvPjwvZz48L3N2Zz4=')]"
            style={{ color: 'currentColor' }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              AI-Powered Food Recognition
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              From Food Photo to Delicious Recipe in Seconds
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Dish Detective analyzes your food photos using AI to instantly generate detailed recipes, nutritional information, and cooking instructions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                onClick={() => navigate('#upload-section')}
              >
                <i className="fas fa-camera mr-2"></i> 
                Try it Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <i className="fas fa-play-circle mr-2"></i> 
                Watch Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          >
            {featureItems.map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 mx-auto">
                  <i className={`fas ${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <div className="relative z-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-slate-50 dark:bg-slate-900 px-6 text-sm text-slate-500 dark:text-slate-400">
            Start by uploading a food image
          </span>
        </div>
      </div>
    </>
  );
}