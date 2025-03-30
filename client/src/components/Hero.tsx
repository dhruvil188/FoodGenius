import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  const [location, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState('ingredients');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [controls]);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const tabs = [
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'steps', label: 'Steps' },
    { id: 'nutrition', label: 'Nutrition' }
  ];
  
  const ingredients = [
    '200g dark chocolate',
    '100g butter',
    '3 large eggs',
    '80g granulated sugar',
    '50g all-purpose flour',
    '1 tsp vanilla extract',
    'Pinch of salt'
  ];
  
  const steps = [
    'Preheat oven to 425°F (220°C)',
    'Melt chocolate and butter together',
    'Whisk eggs, sugar, and vanilla until fluffy',
    'Fold in the chocolate mixture',
    'Add flour and salt, mix until just combined',
    'Pour into ramekins and bake for 12-14 minutes'
  ];
  
  const stats = [
    { label: 'Recipes', value: 5280, suffix: '+' },
    { label: 'Users', value: 14000, suffix: '+' },
    { label: 'Cuisines', value: 120, suffix: '+' }
  ];
  
  return (
    <>
      <motion.section 
        className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12 bg-gradient-to-b from-white to-slate-50"
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-5 tracking-wide">
                AI-POWERED FOOD RECOGNITION
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Snap, <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Analyze,</span> Cook
              </h1>
              <p className="text-xl leading-relaxed text-slate-600 mb-8">
                Turn any food photo into a detailed recipe with ingredients, step-by-step instructions, and nutritional information using our advanced AI technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all py-6"
                  onClick={() => navigate('#upload-section')}
                >
                  <i className="fas fa-camera mr-2.5"></i> 
                  Try It Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all py-6"
                  onClick={() => navigate('/library')}
                >
                  <i className="fas fa-book mr-2.5"></i> 
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden">
                      <img
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${40 + index}.jpg`}
                        alt={`User avatar ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600">
                  Trusted by <span className="font-semibold">14,000+</span> home cooks
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Interactive Recipe Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                {/* Recipe Card Header with Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3992131/pexels-photo-3992131.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Chocolate Lava Cake" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Label */}
                  <div className="absolute right-4 top-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    <span className="flex items-center">
                      <i className="fas fa-check-circle mr-1"></i>
                      Identified
                    </span>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-white text-2xl font-bold mb-2">Chocolate Lava Cake</h2>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-white/10 text-white border-0">Dessert</Badge>
                      <Badge variant="outline" className="bg-white/10 text-white border-0">Chocolate</Badge>
                      <Badge variant="outline" className="bg-white/10 text-white border-0">Baking</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Recipe Content Tabs */}
                <div className="p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Recipe analysis complete</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="flex border-b border-slate-200 mb-4">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        className={`flex-1 py-2 px-4 text-sm font-medium ${
                          activeTab === tab.id
                            ? "text-primary border-b-2 border-primary"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Tab Content */}
                  <div className="min-h-[200px]">
                    <AnimatePresence mode="wait">
                      {activeTab === 'ingredients' && (
                        <motion.div
                          key="ingredients"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ul className="space-y-2">
                            {ingredients.map((ingredient, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3 py-1.5 border-b border-slate-100"
                              >
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <i className="fas fa-check text-xs"></i>
                                </div>
                                <span className="text-slate-700 text-sm">{ingredient}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      
                      {activeTab === 'steps' && (
                        <motion.div
                          key="steps"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ol className="space-y-3">
                            {steps.map((step, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-3"
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                                  {idx + 1}
                                </div>
                                <div className="text-sm text-slate-700">{step}</div>
                              </motion.li>
                            ))}
                          </ol>
                        </motion.div>
                      )}
                      
                      {activeTab === 'nutrition' && (
                        <motion.div
                          key="nutrition"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 gap-3"
                        >
                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                            <p className="text-xs uppercase font-semibold text-green-700">Calories</p>
                            <p className="text-xl font-bold text-green-800">385</p>
                            <p className="text-xs text-green-600">per serving</p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                            <p className="text-xs uppercase font-semibold text-blue-700">Protein</p>
                            <p className="text-xl font-bold text-blue-800">6g</p>
                            <p className="text-xs text-blue-600">per serving</p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
                            <p className="text-xs uppercase font-semibold text-amber-700">Carbs</p>
                            <p className="text-xl font-bold text-amber-800">48g</p>
                            <p className="text-xs text-amber-600">per serving</p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                            <p className="text-xs uppercase font-semibold text-purple-700">Fats</p>
                            <p className="text-xl font-bold text-purple-800">18g</p>
                            <p className="text-xs text-purple-600">per serving</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-full shadow-lg p-3 z-10"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-full h-14 w-14 flex items-center justify-center text-white">
                  <i className="fas fa-camera text-xl"></i>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-full shadow-lg p-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="bg-amber-100 text-amber-800 rounded-full h-10 w-10 flex items-center justify-center">
                  <i className="fas fa-star"></i>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Stats Counter Section */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-center"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-4"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {isVisible && (
                    <CountUp 
                      end={stat.value} 
                      suffix={stat.suffix} 
                      duration={2.5} 
                      delay={0.2}
                    />
                  )}
                </div>
                <div className="text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <div className="relative z-10 my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-8 py-2 text-sm font-medium text-slate-500 rounded-full border border-slate-100 shadow-sm">
            <i className="fas fa-arrow-down mr-2 text-primary"></i>
            Explore Features Below
          </span>
        </div>
      </div>
    </>
  );
}