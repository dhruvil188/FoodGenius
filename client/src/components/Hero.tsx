import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => (
  <motion.div 
    className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.15)" 
    }}
  >
    {/* Background pattern */}
    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-green-300/20 to-emerald-400/20 opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
    
    {/* Feature icon with animated gradient background */}
    <div className="relative w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white overflow-hidden group-hover:scale-110 transition-transform duration-300">
      <motion.div 
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'linear-gradient(0deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.4) 100%)',
            'linear-gradient(120deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.4) 100%)',
            'linear-gradient(240deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.4) 100%)',
            'linear-gradient(360deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.4) 100%)',
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    
    {/* Feature content with animated underline */}
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">{title}</h3>
      <div className="w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded mb-3 group-hover:w-16 transition-all duration-300"></div>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

// Define interfaces for our data structures
interface RecipeStep {
  text: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const [location, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const recipeSteps: RecipeStep[] = [
    { text: 'Preheat oven to 375°F (190°C)' },
    { text: 'Dice vegetables and prepare ingredients' },
    { text: 'Sauté onions and garlic until translucent' },
    { text: 'Add herbs and spices, cook for 1 minute' }
  ];
  
  const stats: Stat[] = [
    { label: 'Recipes', value: 5280, suffix: '+' },
    { label: 'Users', value: 14000, suffix: '+' },
    { label: 'Cuisines', value: 120, suffix: '+' }
  ];
  
  const features: Feature[] = [
    { icon: 'fa-calculator', title: 'Precise Measurements', description: 'Get accurate ingredient measurements in both metric and imperial units', delay: 0.1 },
    { icon: 'fa-clock', title: 'Cooking Times', description: 'Detailed prep, cooking, and total time estimates for better planning', delay: 0.2 },
    { icon: 'fa-list-alt', title: 'Step-by-Step Instructions', description: 'Clear and detailed cooking steps with timing indicators', delay: 0.3 },
    { icon: 'fa-apple-alt', title: 'Nutritional Information', description: 'Complete breakdown of calories, macros, vitamins, and minerals', delay: 0.4 },
    { icon: 'fa-history', title: 'Save Your History', description: 'Access all your previous recipes and favorite discoveries', delay: 0.5 },
    { icon: 'fa-share-alt', title: 'Share Easily', description: 'Share your culinary creations with friends and family', delay: 0.6 }
  ];
  
  return (
    <section className="relative overflow-hidden pt-20 pb-24 bg-white">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} />
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-green-400/10 to-emerald-300/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-emerald-400/10 to-green-300/5 rounded-full blur-3xl"></div>
        
        <div className="absolute bottom-[10%] right-[15%] w-32 h-32 bg-green-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-[20%] left-[10%] w-40 h-40 bg-emerald-300/15 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:bg-gradient-to-r hover:from-green-200 hover:to-emerald-200 hover:text-green-900 px-4 py-1.5 rounded-full font-medium">
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mr-2 text-green-600"
                >
                  <i className="fas fa-bolt"></i>
                </motion.span>
                AI-POWERED FOOD RECOGNITION
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-5xl sm:text-6xl font-bold leading-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-block">
                <span>Transform </span>
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    food photos
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-3 bg-green-200/50 -z-10 rounded"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </span>
              </div>
              <div>into detailed recipes</div>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-medium">Our cutting-edge AI instantly analyzes your food photos</span> to create complete recipes with precise ingredients, step-by-step instructions, and full nutritional details.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full px-8 shadow-xl hover:shadow-2xl transition-all py-7 group border-2 border-green-400"
                onClick={onGetStarted || (() => navigate('#upload-section'))}
              >
                <motion.span 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 0.3 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mr-2 text-white text-lg"
                >
                  <i className="fas fa-camera"></i>
                </motion.div>
                <span className="text-lg font-medium">Try It Now</span>
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2 border-gray-200 hover:border-green-500 text-gray-700 hover:text-green-600 transition-all py-6 relative overflow-hidden group"
                  onClick={() => navigate('/library')}
                >
                  <i className="fas fa-book mr-2.5"></i> 
                  Browse Recipes
                  <span className="absolute inset-0 w-0 bg-green-100 transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Recipe Library Banner */}
            <motion.div
              className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-2xl shadow-md border border-green-100 flex items-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              {/* Notification dot */}
              <motion.div 
                className="absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <div className="relative mr-5 text-emerald-600 text-2xl">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.2, 1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <i className="fas fa-book-open"></i>
                </motion.div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-emerald-800">Discover Our Recipe Collection</h3>
                <p className="text-sm text-emerald-700 mt-1">
                  Browse hundreds of professionally crafted recipes with detailed instructions
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/80 rounded-lg group"
                onClick={() => navigate('/library')}
              >
                <span>Explore</span>
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <i className="fas fa-arrow-right"></i>
                </motion.span>
              </Button>
            </motion.div>
            
            {/* Enhanced social proof section */}
            <motion.div
              className="flex items-center text-sm text-gray-500 mt-8 bg-white/70 backdrop-blur-sm p-3 rounded-lg border border-gray-100 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex -space-x-3 mr-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/17.jpg" alt="" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.9, type: "spring" }}
                >
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-green-100 text-green-700 ring-2 ring-white text-xs font-medium"
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.1, type: "spring" }}
                >
                  +5k
                </motion.div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <p>Trusted by <span className="font-semibold text-gray-900">14,000+</span> home cooks</p>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                      >
                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-green-600">
                  <i className="fas fa-shield-alt mr-1"></i> Secure AI Processing · 100% Private
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Visual content */}
          <div className="relative hidden md:block h-[500px]">
            {/* Main dish image */}
            <motion.div
              className="absolute top-[5%] left-[5%] w-[70%] rounded-2xl shadow-xl overflow-hidden z-30"
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ 
                delay: 0.1,
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Delicious pasta dish"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
            
            {/* Secondary dish image */}
            <motion.div
              className="absolute top-[40%] right-[0%] w-[50%] rounded-2xl shadow-xl overflow-hidden z-20"
              initial={{ opacity: 0, x: 20, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80" 
                alt="Pizza"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
            
            {/* Recipe card */}
            <motion.div
              className="absolute right-5 top-[25%] bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 w-[220px] z-40"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                  <i className="fas fa-list-ol text-xs"></i>
                </div>
                <h3 className="font-medium text-gray-900">Recipe Steps</h3>
              </div>
              
              <div className="space-y-2">
                {recipeSteps.map((step, index) => (
                  <div key={index} className="flex items-start text-xs gap-2">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Nutrition badge */}
            <motion.div
              className="absolute left-0 top-[20%] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-100 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
            >
              <div className="flex items-center text-xs font-medium text-gray-500 mb-1">
                <i className="fas fa-fire-alt text-orange-500 mr-1.5"></i>
                NUTRITION INFO
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">320</div>
                  <div className="text-xs text-gray-500">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">24g</div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Features section */}
        <div className="mt-20 mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Every Recipe is Packed with <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI doesn't just identify the dish - it provides everything you need to recreate it at home with confidence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
        
        {/* Stats section */}
        <div className="py-12 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  <CountUp end={stat.value} duration={2.5} separator="," />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}