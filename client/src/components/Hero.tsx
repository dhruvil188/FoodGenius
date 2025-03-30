import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';
import AOS from 'aos';
import 'aos/dist/aos.css';

// SVG Components
const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0 opacity-80">
    <svg
      viewBox="0 0 1000 1000"
      className="absolute w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b98140" />
          <stop offset="100%" stopColor="#0d9e7b10" />
        </linearGradient>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          <feColorMatrix values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10
          " />
        </filter>
      </defs>
      <g filter="url(#gooey)">
        <circle cx="200" cy="300" r="150" fill="url(#blobGradient)">
          <animate
            attributeName="cy"
            values="300;250;300"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="800" cy="700" r="180" fill="url(#blobGradient)">
          <animate
            attributeName="cx"
            values="800;750;800"
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="600" cy="200" r="120" fill="url(#blobGradient)">
          <animate
            attributeName="r"
            values="120;140;120"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="300" cy="600" r="160" fill="url(#blobGradient)">
          <animate
            attributeName="cy"
            values="600;550;600"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  </div>
);

// Animated ingredient component
const AnimatedIngredient = ({ ingredient, index }: { ingredient: string; index: number }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-center gap-3 py-2 border-b border-slate-100 group"
    whileHover={{ backgroundColor: 'rgba(240, 253, 244, 0.5)' }}
  >
    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">
      <i className="fas fa-check text-xs"></i>
    </div>
    <span className="text-slate-700 text-sm">{ingredient}</span>
  </motion.li>
);

// Radial progress component
const RadialProgress = ({ percentage, size = 120, stroke = 8, color = "#10b981", label, value }: 
  { percentage: number; size?: number; stroke?: number; color?: string; label: string; value: string }) => {
  const radius = size / 2 - stroke;
  const circumference = radius * 2 * Math.PI;
  const progress = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="none"
          dy=".3em"
          className="text-xl font-bold"
          fill="#374151"
          transform="rotate(90 50 50)"
        >
          {value}
        </text>
      </svg>
      <span className="mt-2 text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
};

// Menu card component 
const MenuCard = ({ title, category, image, onClick }: 
  { title: string; category: string; image: string; onClick: () => void }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group" onClick={onClick}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 opacity-60 group-hover:opacity-70 z-10" />
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <span className="inline-block px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white mb-2">{category}</span>
      <h3 className="text-white font-bold">{title}</h3>
    </div>
  </div>
);

export default function Hero() {
  const [location, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState('ingredients');
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100
    });
    
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
    { id: 'ingredients', label: 'Ingredients', icon: 'fa-list' },
    { id: 'steps', label: 'Steps', icon: 'fa-tasks' },
    { id: 'nutrition', label: 'Nutrition', icon: 'fa-chart-pie' }
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
  
  const nutritionData = [
    { label: 'Calories', value: 385, suffix: 'kcal', color: '#10b981', percentage: 19 },
    { label: 'Protein', value: 6, suffix: 'g', color: '#3b82f6', percentage: 12 },
    { label: 'Carbs', value: 48, suffix: 'g', color: '#f59e0b', percentage: 16 },
    { label: 'Fats', value: 18, suffix: 'g', color: '#8b5cf6', percentage: 28 }
  ];
  
  const stats = [
    { label: 'Recipes', value: 5280, suffix: '+' },
    { label: 'Users', value: 14000, suffix: '+' },
    { label: 'Cuisines', value: 120, suffix: '+' }
  ];
  
  const recommendedDishes = [
    { 
      title: 'Tiramisu', 
      category: 'Italian Dessert', 
      image: 'https://images.pexels.com/photos/6601811/pexels-photo-6601811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      title: 'Chocolate Soufflé', 
      category: 'French Dessert', 
      image: 'https://images.pexels.com/photos/8382602/pexels-photo-8382602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      title: 'Crème Brûlée', 
      category: 'French Dessert', 
      image: 'https://images.pexels.com/photos/8360529/pexels-photo-8360529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    }
  ];
  
  return (
    <section className="relative overflow-hidden pt-8 pb-16" ref={heroRef}>
      {/* Animated background blobs */}
      <BlobBackground />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left column: Text and CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div data-aos="fade-right">
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mb-6">
                <svg className="mr-1 h-1.5 w-1.5 fill-green-500 animate-pulse" viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx="3" cy="3" r="3" />
                </svg>
                AI-POWERED FOOD RECOGNITION
              </span>
              
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <span className="block mb-1">Snap,</span> 
                <span className="block mb-1 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Analyze,</span> 
                <span className="block">Cook</span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                Turn any food photo into a detailed recipe with ingredients, step-by-step instructions, and nutritional information using our advanced AI technology.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all py-6 group"
                  onClick={() => navigate('#upload-section')}
                >
                  <i className="fas fa-camera mr-2.5 group-hover:animate-pulse"></i> 
                  Try It Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2 border-gray-200 hover:border-green-500 text-gray-700 hover:text-green-600 transition-all py-6"
                  onClick={() => navigate('/library')}
                >
                  <i className="fas fa-book mr-2.5"></i> 
                  Learn More
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-3 bg-white/80 backdrop-blur-sm py-3 px-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex -space-x-2 overflow-hidden">
                  {[1, 2, 3].map((index) => (
                    <motion.div 
                      key={index} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden"
                      initial={{ scale: 0, x: -10, opacity: 0 }}
                      animate={{ scale: 1, x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + (index * 0.2) }}
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${40 + index}.jpg`}
                        alt={`User avatar ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm text-gray-700">
                  Trusted by <span className="font-semibold text-gray-900">14,000+</span> home cooks
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Interactive recipe card */}
          <div className="mt-16 lg:mt-0 lg:col-span-6" data-aos="fade-left">
            <div className="relative mx-auto w-full lg:max-w-lg">
              {/* Recipe card with floating elements and glass morphism */}
              <div className="relative">
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-30 animate-pulse" />
                
                {/* Main card */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  {/* Recipe Card Header with Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <img 
                        src="https://images.pexels.com/photos/3992131/pexels-photo-3992131.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Chocolate Lava Cake" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Scanning overlay animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
                      initial={{ top: '-100%' }}
                      animate={{ top: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                      }}
                    />
                    
                    {/* Floating Label */}
                    <motion.div 
                      className="absolute right-4 top-4 bg-green-500 text-white px-2 py-1 rounded-full shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      <span className="flex items-center text-xs font-medium">
                        <i className="fas fa-check-circle mr-1"></i>
                        Identified
                      </span>
                    </motion.div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <h2 className="text-white text-2xl font-bold mb-2">Chocolate Lava Cake</h2>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-0">Dessert</Badge>
                          <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-0">Chocolate</Badge>
                          <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-0">Baking</Badge>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Recipe Content Tabs */}
                  <div className="p-5">
                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Recipe analysis complete</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 mb-5">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          className={`flex-1 py-2.5 px-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            activeTab === tab.id
                              ? "text-green-600 border-b-2 border-green-500"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          <i className={`fas ${tab.icon}`}></i>
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
                            className="px-2"
                          >
                            <ul className="space-y-1">
                              {ingredients.map((ingredient, idx) => (
                                <AnimatedIngredient key={idx} ingredient={ingredient} index={idx} />
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
                            <div className="relative border-l-2 border-green-200 pl-5 ml-2 py-1">
                              {steps.map((step, idx) => (
                                <motion.div 
                                  key={idx}
                                  className="mb-5 relative"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-green-600">
                                    {idx + 1}
                                  </div>
                                  <div className="text-sm text-gray-700">{step}</div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        {activeTab === 'nutrition' && (
                          <motion.div
                            key="nutrition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-wrap justify-center gap-2"
                          >
                            {nutritionData.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 }}
                              >
                                <RadialProgress 
                                  percentage={item.percentage}
                                  color={item.color}
                                  label={item.label}
                                  value={`${item.value}${item.suffix}`}
                                  size={80}
                                  stroke={6}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-5 -right-5 bg-white rounded-full shadow-lg p-2 z-10"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-12 w-12 flex items-center justify-center text-white">
                    <i className="fas fa-camera text-lg"></i>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-3 -left-3 bg-white rounded-full shadow-lg p-1.5 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <div className="bg-amber-100 text-amber-700 rounded-full h-9 w-9 flex items-center justify-center">
                    <i className="fas fa-star"></i>
                  </div>
                </motion.div>
                
                {/* Time indicator */}
                <motion.div
                  className="absolute -bottom-3 right-10 bg-white rounded-full shadow-lg py-1 px-3 z-10 flex items-center gap-1.5"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 1.2, type: "spring" }}
                >
                  <i className="fas fa-clock text-green-600"></i>
                  <span className="text-xs font-medium text-gray-700">15 min prep</span>
                </motion.div>
              </div>
              
              {/* Recommendation section */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-500 mb-3">You might also like:</h3>
                <div className="grid grid-cols-3 gap-3">
                  {recommendedDishes.map((dish, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + (idx * 0.2) }}
                    >
                      <MenuCard
                        title={dish.title}
                        category={dish.category}
                        image={dish.image}
                        onClick={() => navigate('/library')}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Counter Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-center py-8 border-t border-gray-100"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {isVisible && (
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    duration={2.5} 
                    delay={0.2}
                  />
                )}
              </div>
              <div className="text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom divider */}
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <motion.span 
            className="bg-white px-6 py-2 text-sm font-medium text-gray-500 rounded-full border border-gray-100 shadow-sm flex items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <i className="fas fa-arrow-down mr-2 text-green-500"></i>
            Explore Features Below
          </motion.span>
        </div>
      </div>
    </section>
  );
}