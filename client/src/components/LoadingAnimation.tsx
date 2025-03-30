import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Food-related cooking tips to display during loading
const cookingTips = [
  "For crispy restaurant-quality french fries, soak cut potatoes in cold water before frying.",
  "Add a splash of vinegar when poaching eggs to help them hold their shape.",
  "Let meat rest for about 5 minutes after cooking to allow juices to redistribute.",
  "Toast spices in a dry pan before using them to release more flavor.",
  "The ideal temperature for cooking fish is 145°F (63°C) for perfect flakiness.",
  "Add salt to pasta water after it's boiling - not before - for properly seasoned pasta.",
  "For fluffier rice, rinse it before cooking to remove excess starch.",
  "Frozen vegetables often have more nutrients than 'fresh' ones that have been sitting for days.",
  "A dull knife is more dangerous than a sharp one - keep your knives properly sharpened.",
  "Taste as you go! Seasoning throughout the cooking process builds better flavor.",
  "Marinate proteins in yogurt to tenderize them naturally.",
  "When making sauces, add acid (lemon, vinegar) to brighten flavors."
];

// Loading states with descriptions
const loadingStates = [
  { stage: "Identifying food", description: "Our AI is scanning your dish..." },
  { stage: "Finding recipes", description: "Searching for the perfect cooking methods..." },
  { stage: "Gathering ingredients", description: "Collecting all the essential components..." },
  { stage: "Compiling instructions", description: "Creating step-by-step cooking guidance..." },
  { stage: "Calculating nutrition", description: "Analyzing nutritional content and dietary info..." },
  { stage: "Generating variations", description: "Creating customized recipe variations..." },
  { stage: "Finalizing results", description: "Putting everything together for you..." }
];

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * cookingTips.length));
  
  useEffect(() => {
    // Animate progress and cycle through stages
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Increment progress
        const newProgress = prev + 1;
        
        // Update current stage based on progress
        const stageIndex = Math.min(
          Math.floor((newProgress / 100) * loadingStates.length),
          loadingStates.length - 1
        );
        
        if (stageIndex !== currentStage) {
          setCurrentStage(stageIndex);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Rotate cooking tips
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % cookingTips.length);
    }, 5000);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, [currentStage]);
  
  // Ingredient animation
  const ingredients = [
    { icon: "🍅", delay: 0 },
    { icon: "🥕", delay: 0.5 },
    { icon: "🧄", delay: 1.0 },
    { icon: "🌶️", delay: 1.5 },
    { icon: "🧂", delay: 2.0 },
    { icon: "🌿", delay: 2.5 }
  ];
  
  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Animated cooking pot */}
            <div className="relative w-32 h-32 mb-6">
              {/* Pot */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-slate-700 dark:bg-slate-600 rounded-b-full z-10"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Lid */}
              <motion.div 
                className="absolute bottom-[70px] left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-800 dark:bg-slate-900 rounded-full z-20"
                animate={{ y: [0, -1, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              
              {/* Steam */}
              <div className="absolute bottom-[85px] left-1/2 transform -translate-x-1/2 z-0">
                <div className="relative">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-0 w-2 h-2 bg-slate-200 dark:bg-slate-400 rounded-full opacity-80"
                      style={{ left: `${(i - 1) * 15}px` }}
                      animate={{ 
                        y: [-40, -60, -80],
                        opacity: [0.8, 0.4, 0],
                        scale: [1, 1.5, 2] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        delay: i * 0.3,
                        ease: "easeOut" 
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Animated ingredients falling into pot */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-0"
                    style={{ left: `${index * 15 + 20}%` }}
                    animate={{ 
                      y: [-20, 70],
                      rotate: [0, 180],
                      opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      delay: ingredient.delay,
                      repeatDelay: 3,
                      ease: "easeIn" 
                    }}
                  >
                    <span className="text-2xl">{ingredient.icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">
                {loadingStates[currentStage].stage}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
                {loadingStates[currentStage].description}
              </p>
              
              <div className="mb-8">
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Analyzing image</span>
                  <span>{progress}% complete</span>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={tipIndex}
                  className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm font-medium mb-1 text-primary dark:text-primary-foreground">Cooking Tip</p>
                  <p className="text-sm italic text-slate-600 dark:text-slate-300">{cookingTips[tipIndex]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
