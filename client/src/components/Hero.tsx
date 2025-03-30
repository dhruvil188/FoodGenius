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
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-5 tracking-wide">
              AI-POWERED FOOD RECOGNITION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
              From Food Photo to Delicious Recipe in Seconds
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 mb-10 max-w-2xl mx-auto">
              Dish Detective analyzes your food photos using AI to instantly generate detailed recipes, nutritional information, and cooking instructions tailored just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-10 shadow-md hover:shadow-lg transition-all py-6"
                onClick={() => navigate('#upload-section')}
              >
                <i className="fas fa-camera mr-2.5"></i> 
                Try it Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-10 border-2 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all py-6"
                onClick={() => navigate('/library')}
              >
                <i className="fas fa-book mr-2.5"></i> 
                Browse Recipe Library
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
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-emerald-400/10 rounded-xl flex items-center justify-center text-primary mb-5 mx-auto">
                  <i className={`fas ${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <div className="relative z-10 my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-slate-50 px-8 py-2 text-sm font-medium text-slate-500 rounded-full border border-slate-100 shadow-sm">
            <i className="fas fa-arrow-down mr-2 text-primary"></i>
            Start by uploading a food image
          </span>
        </div>
      </div>
    </>
  );
}