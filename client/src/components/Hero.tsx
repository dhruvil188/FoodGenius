import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Interactive Food Icon SVG Component
const InteractiveFoodIcon = ({ id, x, y, title, icon, delay = 0 }: 
  { id: string; x: number; y: number; title: string; icon: string; delay?: number }) => (
  <motion.div 
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
  >
    <motion.div 
      className="bg-white rounded-full shadow-lg p-3 cursor-pointer relative group z-10"
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white">
        <i className={`fas ${icon} text-lg`}></i>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-max whitespace-nowrap">
        {title}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute top-full left-1/2 transform -translate-x-1/2 -z-10" width="2" height="50" viewBox="0 0 2 50">
        <motion.path 
          d="M1 0 L1 50" 
          stroke="#10b981" 
          strokeWidth="2" 
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

// Animated scanner component
const Scanner = () => (
  <div className="relative w-full h-full overflow-hidden rounded-t-2xl">
    <svg 
      className="absolute top-0 left-0 w-full h-full" 
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
          <stop offset="50%" stopColor="rgba(16, 185, 129, 0.2)" />
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
        </linearGradient>
        <mask id="scanMask">
          <rect x="0" y="0" width="400" height="300" fill="white" />
        </mask>
      </defs>
      
      <motion.rect
        x="0"
        y="0"
        width="400"
        height="40"
        fill="url(#scanGradient)"
        mask="url(#scanMask)"
        initial={{ y: -40 }}
        animate={{ y: 300 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />
      
      {/* Scanning grid lines */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.5" />
      </pattern>
      <rect x="0" y="0" width="400" height="300" fill="url(#grid)" mask="url(#scanMask)" opacity="0.3" />
      
      {/* Corner markers */}
      <path d="M 0 20 L 0 0 L 20 0" stroke="#10b981" strokeWidth="2" fill="none" />
      <path d="M 380 0 L 400 0 L 400 20" stroke="#10b981" strokeWidth="2" fill="none" />
      <path d="M 0 280 L 0 300 L 20 300" stroke="#10b981" strokeWidth="2" fill="none" />
      <path d="M 380 300 L 400 300 L 400 280" stroke="#10b981" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

// Process Icon Component
const ProcessIcon = ({ number, title, description, icon, delay = 0 }: 
  { number: number; title: string; description: string; icon: string; delay?: number }) => (
  <motion.div 
    className="relative" 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-tr from-green-600 to-green-400 text-white">
          <i className={`fas ${icon} text-lg`}></i>
        </div>
      </div>
      <div className="ml-4">
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 font-medium text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
            {number}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }: 
  { icon: string; title: string; description: string; delay?: number }) => (
  <motion.div 
    className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
  >
    <div className="w-12 h-12 mb-4 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

// Animated Wave Background
const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <svg 
      className="absolute w-full min-w-[1000px]" 
      style={{ bottom: '-10%', left: 0, height: '60%' }}
      viewBox="0 0 1200 200" 
      preserveAspectRatio="none"
    >
      <path 
        fill="rgba(16, 185, 129, 0.05)" 
        d="M0,160 C300,200 400,100 600,160 C800,200 1000,120 1200,160 L1200,200 L0,200 Z" 
      >
        <animate 
          attributeName="d" 
          values="
            M0,160 C300,200 400,100 600,160 C800,200 1000,120 1200,160 L1200,200 L0,200 Z;
            M0,150 C200,120 500,190 700,130 C900,80 1000,150 1200,140 L1200,200 L0,200 Z;
            M0,160 C300,200 400,100 600,160 C800,200 1000,120 1200,160 L1200,200 L0,200 Z
          " 
          dur="20s" 
          repeatCount="indefinite"
        />
      </path>
      <path 
        fill="rgba(16, 185, 129, 0.1)" 
        d="M0,170 C200,120 400,180 600,150 C800,120 1000,170 1200,160 L1200,200 L0,200 Z"
      >
        <animate 
          attributeName="d" 
          values="
            M0,170 C200,120 400,180 600,150 C800,120 1000,170 1200,160 L1200,200 L0,200 Z;
            M0,180 C300,150 500,160 700,180 C900,170 1050,130 1200,170 L1200,200 L0,200 Z;
            M0,170 C200,120 400,180 600,150 C800,120 1000,170 1200,160 L1200,200 L0,200 Z
          " 
          dur="15s" 
          repeatCount="indefinite"
        />
      </path>
    </svg>
    
    {/* Dots pattern */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }} />
    </div>
  </div>
);

export default function Hero() {
  const [location, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const [selectedFeature, setSelectedFeature] = useState('recipes');
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
  
  const features = [
    { id: 'recipes', title: 'AI Recipe Generation', icon: 'fa-utensils', description: 'Instantly receive detailed recipes with step-by-step instructions, precise measurements, and cooking techniques' },
    { id: 'nutrition', title: 'Nutritional Analysis', icon: 'fa-chart-pie', description: 'Get complete nutritional breakdown including calories, macronutrients, vitamins, and minerals' },
    { id: 'techniques', title: 'Advanced Techniques', icon: 'fa-mortar-pestle', description: 'Learn professional cooking skills, special techniques, and proper equipment usage' },
    { id: 'variations', title: 'Recipe Variations', icon: 'fa-random', description: 'Discover dietary alternatives, regional variations, and ingredient substitutions' }
  ];
  
  const foodIcons = [
    { id: 'pizza', x: 15, y: 20, title: 'Italian Cuisine', icon: 'fa-pizza-slice', delay: 0.2 },
    { id: 'sushi', x: 30, y: 10, title: 'Japanese Cuisine', icon: 'fa-fish', delay: 0.4 },
    { id: 'burger', x: 50, y: 25, title: 'American Cuisine', icon: 'fa-hamburger', delay: 0.6 },
    { id: 'carrot', x: 70, y: 15, title: 'Vegetarian Options', icon: 'fa-carrot', delay: 0.8 },
    { id: 'wine', x: 85, y: 30, title: 'Beverage Pairings', icon: 'fa-wine-glass-alt', delay: 1.0 }
  ];
  
  const process = [
    { number: 1, title: 'Snap', description: 'Take a photo of any food dish', icon: 'fa-camera' },
    { number: 2, title: 'Upload', description: 'Upload the image to our platform', icon: 'fa-cloud-upload-alt' },
    { number: 3, title: 'Analyze', description: 'AI identifies ingredients and composition', icon: 'fa-search' },
    { number: 4, title: 'Receive', description: 'Get your complete recipe details', icon: 'fa-receipt' }
  ];
  
  const stats = [
    { label: 'Recipes', value: 5280, suffix: '+' },
    { label: 'Users', value: 14000, suffix: '+' },
    { label: 'Cuisines', value: 120, suffix: '+' }
  ];
  
  return (
    <section className="relative overflow-hidden pb-16" ref={heroRef}>
      {/* Animated background */}
      <WaveBackground />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mb-4">
              <svg className="mr-1 h-1.5 w-1.5 fill-green-500 animate-pulse" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
              AI-POWERED FOOD RECOGNITION
            </div>
          </motion.div>
          
          <motion.h1
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block mb-1">Snap,</span> 
            <span className="block mb-1 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Analyze,</span> 
            <span className="block">Cook</span>
          </motion.h1>
          
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Turn any food photo into a detailed recipe with ingredients, step-by-step instructions, and nutritional information using our advanced AI technology.
          </motion.p>
          
          <motion.div
            className="mt-8 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
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
          </motion.div>
        </div>
        
        {/* Interactive visualization area */}
        <div className="relative mb-24">
          {/* Food icons positioned around the center */}
          {foodIcons.map((icon) => (
            <InteractiveFoodIcon 
              key={icon.id}
              id={icon.id}
              x={icon.x}
              y={icon.y}
              title={icon.title}
              icon={icon.icon}
              delay={icon.delay}
            />
          ))}
          
          {/* Central scanning device */}
          <div className="max-w-3xl mx-auto relative z-10">
            <div data-aos="zoom-in" data-aos-delay="100">
              {/* Scanner platform with glow effect */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 opacity-30 blur-xl rounded-3xl"></div>
                
                {/* Device border */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Top scanner area with grid */}
                  <div className="h-44 relative overflow-hidden">
                    <Scanner />
                    
                    {/* Scanning text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div 
                          className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                        >
                          <span className="text-green-600 font-medium flex items-center">
                            <i className="fas fa-search mr-2"></i>
                            Analyzing Food Image
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Result panel */}
                  <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Detection Results</h3>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <span className="flex items-center">
                          <i className="fas fa-check-circle mr-1"></i>
                          Ready
                        </span>
                      </Badge>
                    </div>
                    
                    {/* Feature tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-5">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                            selectedFeature === feature.id
                              ? "bg-white shadow-sm text-green-700"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                          onClick={() => setSelectedFeature(feature.id)}
                        >
                          <i className={`fas ${feature.icon} mr-1.5`}></i>
                          {feature.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Feature content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedFeature}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-lg border border-gray-100 p-4"
                      >
                        <h4 className="text-base font-medium text-gray-900 mb-2">
                          {features.find(f => f.id === selectedFeature)?.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {features.find(f => f.id === selectedFeature)?.description}
                        </p>
                        
                        {/* Example visualization based on selected feature */}
                        <div className="mt-4">
                          {selectedFeature === 'recipes' && (
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-lg overflow-hidden flex items-center justify-center">
                                <i className="fas fa-book-open text-green-600 text-xl"></i>
                              </div>
                              <div className="flex-1">
                                <div className="h-3 bg-gray-200 rounded-full mb-2 w-2/3"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2 w-5/6"></div>
                                <div className="h-2 bg-gray-200 rounded-full w-4/6"></div>
                              </div>
                            </div>
                          )}
                          
                          {selectedFeature === 'nutrition' && (
                            <div className="grid grid-cols-4 gap-2">
                              {['Calories', 'Protein', 'Carbs', 'Fats'].map((nutrient, i) => (
                                <div key={i} className="text-center">
                                  <div className="w-full h-16 bg-gradient-to-t from-green-500 to-green-300 rounded-lg opacity-80"></div>
                                  <span className="text-xs font-medium text-gray-600 mt-1 block">{nutrient}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {selectedFeature === 'techniques' && (
                            <div className="grid grid-cols-2 gap-2">
                              {['Chopping', 'Simmering', 'Sautéing', 'Baking'].map((technique, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span className="text-xs text-gray-700">{technique}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {selectedFeature === 'variations' && (
                            <div className="flex space-x-2">
                              {['Vegan', 'Gluten-Free', 'Low-Carb'].map((variation, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                  {variation}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Action buttons */}
                    <div className="mt-5 flex justify-between">
                      <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <i className="fas fa-history mr-1.5"></i>
                        View History
                      </button>
                      <button className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                        <i className="fas fa-arrow-right ml-1.5"></i>
                        Get Full Recipe
                      </button>
                    </div>
                  </div>
                  
                  {/* Control panel */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div className="text-xs text-gray-500">AI Dish Detective v1.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How it works section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform transforms your food photos into detailed recipes in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <ProcessIcon 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={0.2 * index}
              />
            ))}
          </div>
        </div>
        
        {/* Features grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Every recipe is loaded with information to help you cook with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon="fa-calculator" 
              title="Precise Measurements" 
              description="Get accurate ingredient measurements in both metric and imperial units" 
              delay={0.1}
            />
            <FeatureCard 
              icon="fa-clock" 
              title="Cooking Times" 
              description="Detailed prep, cooking, and total time estimates for better planning" 
              delay={0.2}
            />
            <FeatureCard 
              icon="fa-list-alt" 
              title="Step-by-Step Instructions" 
              description="Clear and detailed cooking steps with timing indicators" 
              delay={0.3}
            />
            <FeatureCard 
              icon="fa-apple-alt" 
              title="Nutritional Information" 
              description="Complete breakdown of calories, macros, vitamins, and minerals" 
              delay={0.4}
            />
            <FeatureCard 
              icon="fa-history" 
              title="Save Your History" 
              description="Access all your previous recipes and favorite discoveries" 
              delay={0.5}
            />
            <FeatureCard 
              icon="fa-share-alt" 
              title="Share Easily" 
              description="Share your culinary creations with friends and family" 
              delay={0.6}
            />
          </div>
        </div>
        
        {/* Community trust section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by a Global Community</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of home cooks who have discovered the joy of cooking with AI-powered recipes
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Badge variant="outline" className="px-4 py-2 border-green-200 text-green-700 bg-green-50">
                  <i className="fas fa-check-circle mr-2"></i>
                  Verified Accuracy
                </Badge>
                <Badge variant="outline" className="px-4 py-2 border-amber-200 text-amber-700 bg-amber-50">
                  <i className="fas fa-star mr-2"></i>
                  4.8/5 User Rating
                </Badge>
                <Badge variant="outline" className="px-4 py-2 border-blue-200 text-blue-700 bg-blue-50">
                  <i className="fas fa-users mr-2"></i>
                  Active Community
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex -space-x-4 mr-6">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${40 + index}.jpg`}
                      alt={`User avatar ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">14,000+</div>
                <div className="text-sm text-gray-600">Happy home cooks</div>
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