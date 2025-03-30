import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';

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

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => (
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

// Process Icon Component
interface ProcessIconProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const ProcessIcon = ({ number, title, description, icon, delay = 0 }: ProcessIconProps) => (
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

// Enhanced animated scanner effect
const ScannerVisualization = () => (
  <div className="relative h-[380px] w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transform perspective-800">
    {/* Advanced glow effects */}
    <div className="absolute -inset-3 bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-2xl rounded-3xl"></div>
    <div className="absolute -inset-1 bg-gradient-to-tr from-green-300 to-emerald-400 opacity-10 blur-xl rounded-3xl"></div>
    
    {/* Scanner content */}
    <div className="absolute inset-0 flex flex-col">
      <div className="h-3/5 bg-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.3) 25%, rgba(16, 185, 129, 0.3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.3) 75%, rgba(16, 185, 129, 0.3) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.3) 25%, rgba(16, 185, 129, 0.3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.3) 75%, rgba(16, 185, 129, 0.3) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '40px 40px',
          }} 
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Particles floating */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1.5 h-1.5 rounded-full bg-green-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4 + (Math.random() * 0.4),
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + (Math.random() * 2),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Corner markers with animated pulses */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2"
        ].map((position, index) => (
          <div key={index} className={`absolute ${position} border-green-500 w-6 h-6`}>
            <motion.div
              className="absolute inset-0 border-green-500 opacity-60"
              animate={{ opacity: [0.6, 0.2, 0.6] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
              style={{ borderWidth: '2px', borderStyle: position.includes('top') ? (position.includes('left') ? 'solid none none solid' : 'solid solid none none') : (position.includes('left') ? 'none none solid solid' : 'none solid solid none') }}
            />
          </div>
        ))}
        
        {/* Multiple scan line animations */}
        <motion.div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0"
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute left-0 right-0 h-[40%] bg-gradient-to-b from-green-400/0 via-green-400/5 to-green-400/0"
          initial={{ top: 0 }}
          animate={{ top: '80%' }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
        
        {/* Recognition pulse */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-24 h-24 rounded-full border-2 border-green-400/30"></div>
        </motion.div>
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="inline-block px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span 
                className="text-green-600 font-medium flex items-center"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <i className="fas fa-search mr-2"></i>
                Analyzing Food Image
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Enhanced results panel */}
      <div className="h-2/5 bg-gradient-to-b from-gray-50 to-white p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <motion.div 
              className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h3 className="text-sm font-semibold text-gray-900">AI Recognition Results</h3>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none">Ready</Badge>
        </div>
        
        {/* Result data with animations */}
        <div className="space-y-3">
          {[
            { width: "w-3/4", delay: 0.1 },
            { width: "w-full", delay: 0.2 },
            { width: "w-5/6", delay: 0.3 },
            { width: "w-2/3", delay: 0.4 }
          ].map((item, index) => (
            <div key={index} className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: item.width }}
                transition={{ 
                  duration: 1, 
                  delay: item.delay,
                  ease: "easeOut" 
                }}
              />
            </div>
          ))}
          
          {/* Recognition tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: "Dessert", color: "bg-pink-100 text-pink-800" },
              { label: "Chocolate", color: "bg-amber-100 text-amber-800" },
              { label: "Baking", color: "bg-blue-100 text-blue-800" }
            ].map((tag, index) => (
              <motion.div
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${tag.color} inline-flex items-center`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <i className="fas fa-tag text-xs mr-1 opacity-70"></i>
                {tag.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Interactive Food Icon Component
interface FoodIconProps {
  x: number;
  y: number;
  icon: string;
  title: string;
  delay?: number;
}

const FoodIcon = ({ x, y, icon, title, delay = 0 }: FoodIconProps) => (
  <motion.div 
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
  >
    <motion.div 
      className="bg-white rounded-full shadow-lg p-2 cursor-pointer relative group z-10"
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white">
        <i className={`fas ${icon} text-sm`}></i>
      </div>
      
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {title}
      </div>
    </motion.div>
  </motion.div>
);

// Define interfaces for our data structures
interface FoodIcon {
  x: number;
  y: number;
  title: string;
  icon: string;
  delay: number;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
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

export default function Hero() {
  const [location, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const foodIcons: FoodIcon[] = [
    { x: 20, y: 20, title: 'Italian Cuisine', icon: 'fa-pizza-slice', delay: 0.2 },
    { x: 35, y: 10, title: 'Japanese Cuisine', icon: 'fa-fish', delay: 0.4 },
    { x: 50, y: 25, title: 'American Cuisine', icon: 'fa-hamburger', delay: 0.6 },
    { x: 65, y: 15, title: 'Vegetarian Options', icon: 'fa-carrot', delay: 0.8 },
    { x: 80, y: 30, title: 'Beverage Pairings', icon: 'fa-wine-glass-alt', delay: 1.0 }
  ];
  
  const process: ProcessStep[] = [
    { number: 1, title: 'Snap', description: 'Take a photo of any food dish', icon: 'fa-camera' },
    { number: 2, title: 'Upload', description: 'Upload the image to our platform', icon: 'fa-cloud-upload-alt' },
    { number: 3, title: 'Analyze', description: 'AI identifies ingredients and composition', icon: 'fa-search' },
    { number: 4, title: 'Receive', description: 'Get your complete recipe details', icon: 'fa-receipt' }
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
    <section className="relative overflow-hidden pb-16">
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
            <div className="relative inline-flex items-center rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-1.5 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-500/30 mb-5 overflow-hidden shadow-sm">
              {/* Animated pulse effect in background */}
              <motion.div 
                className="absolute w-12 h-12 bg-green-300/20 rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <div className="relative flex items-center">
                <svg className="mr-2 h-2 w-2 fill-green-500 animate-pulse" viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span className="mr-1 uppercase font-semibold tracking-wider">AI-Powered</span>
                <span className="uppercase text-emerald-700 font-semibold tracking-wider">Food Recognition</span>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            {/* Decorative elements */}
            <motion.div 
              className="absolute -left-10 -top-8 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-300/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -right-5 top-10 w-32 h-32 bg-gradient-to-tr from-amber-300/10 to-yellow-200/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          
            <motion.h1
              className="relative mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span 
                className="relative inline-block mb-2 px-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span className="relative z-10">Snap</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 rounded-lg -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.span>
              <span className="mx-2 text-gray-300">•</span>
              
              <motion.span 
                className="relative inline-block mb-2 px-2 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span>Analyze</span>
              </motion.span>
              <span className="mx-2 text-gray-300">•</span>
              
              <motion.span 
                className="relative inline-block mb-2 px-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span className="relative z-10">Cook</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.span>
            </motion.h1>
          </div>
          
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600"
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
          {foodIcons.map((icon, index) => (
            <FoodIcon
              key={index}
              x={icon.x}
              y={icon.y}
              title={icon.title}
              icon={icon.icon}
              delay={icon.delay}
            />
          ))}
          
          {/* Central scanner visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <ScannerVisualization />
          </motion.div>
        </div>
        
        {/* Stats section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-4xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      duration: 0.8, 
                      delay: 0.5 + (0.1 * index) 
                    }}
                  >
                    <CountUp end={stat.value} duration={2} separator="," />
                    <span className="text-green-600">{stat.suffix}</span>
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-center py-8 border-t border-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
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
            </div>
          ))}
        </div>
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