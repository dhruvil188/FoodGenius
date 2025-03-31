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

// Floating Food Image Component
interface FoodImageProps {
  src: string;
  alt: string;
  top: string;
  right?: string;
  left?: string;
  width: string;
  delay?: number;
  rotate?: number;
  zIndex?: number;
}

const FloatingFoodImage = ({ 
  src, 
  alt, 
  top, 
  right, 
  left, 
  width, 
  delay = 0, 
  rotate = 0,
  zIndex = 10
}: FoodImageProps) => (
  <motion.div
    className="absolute rounded-2xl shadow-xl overflow-hidden"
    style={{ 
      top, 
      right, 
      left, 
      width, 
      zIndex
    }}
    initial={{ opacity: 0, y: 20, rotate: rotate - 5 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{ 
      delay, 
      duration: 0.8,
      type: "spring",
      bounce: 0.4
    }}
  >
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
  </motion.div>
);

// Floating Ingredient Component
interface FloatingIngredientProps {
  icon: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  rotate?: number;
  delay?: number;
  color?: string;
  opacity?: number;
  zIndex?: number;
  animationDuration?: number;
}

const FloatingIngredient = ({
  icon,
  size,
  top,
  left,
  right,
  rotate = 0,
  delay = 0,
  color = 'text-green-500',
  opacity = 0.8,
  zIndex = 0,
  animationDuration = 20
}: FloatingIngredientProps) => {
  // Random movement animation values
  const floatY = Math.random() * 30 + 15; // Increased vertical float distance
  const floatX = Math.random() * 25 + 10; // Horizontal float distance
  const rotateAmount = Math.random() * 12 + 8; // Increased rotation amount
  const duration = 8 + Math.random() * 7; // Shorter animation duration for more noticeable movement
  
  return (
    <motion.div
      className={`absolute ${color}`}
      style={{
        top,
        left,
        right,
        fontSize: `${size}px`,
        opacity,
        zIndex,
      }}
      initial={{ y: 0, x: 0, rotate, opacity: 0 }}
      animate={{ 
        y: [0, -floatY, -floatY/2, -floatY, 0], 
        x: [0, floatX/2, floatX, floatX/2, 0],
        rotate: [rotate, rotate + rotateAmount, rotate, rotate - rotateAmount, rotate],
        opacity
      }}
      transition={{
        y: { 
          duration, 
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay
        },
        x: { 
          duration: duration * 1.2, 
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: delay + 0.5
        },
        rotate: {
          duration: duration * 0.8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: delay + 1
        },
        opacity: { duration: 1, delay }
      }}
    >
      <i className={`fas ${icon}`}></i>
    </motion.div>
  );
};

// Recipe Step Component
interface RecipeStepProps {
  number: number;
  text: string;
  delay?: number;
}

const RecipeStep = ({ number, text, delay = 0 }: RecipeStepProps) => (
  <motion.div 
    className="flex items-start gap-4 mb-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
      {number}
    </div>
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex-1">
      <p className="text-gray-700 text-sm">{text}</p>
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

interface FloatingIngredient {
  icon: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  delay: number;
  color: string;
  opacity: number;
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
  
  // Floating ingredients in the background
  const floatingIngredients: FloatingIngredient[] = [
    { icon: 'fa-apple-alt', size: 40, top: '15%', right: '15%', rotate: -10, delay: 0.2, color: 'text-red-600', opacity: 0.45 },
    { icon: 'fa-carrot', size: 46, top: '25%', left: '10%', rotate: 15, delay: 1.2, color: 'text-orange-600', opacity: 0.5 },
    { icon: 'fa-lemon', size: 40, top: '45%', right: '8%', rotate: 0, delay: 0.6, color: 'text-yellow-500', opacity: 0.4 },
    { icon: 'fa-pepper-hot', size: 38, top: '60%', left: '20%', rotate: -5, delay: 1.8, color: 'text-green-600', opacity: 0.45 },
    { icon: 'fa-egg', size: 42, top: '75%', right: '25%', rotate: 10, delay: 0.9, color: 'text-gray-500', opacity: 0.4 },
    { icon: 'fa-cheese', size: 44, top: '85%', left: '30%', rotate: -8, delay: 1.5, color: 'text-yellow-500', opacity: 0.5 },
    { icon: 'fa-fish', size: 46, top: '10%', left: '25%', rotate: 8, delay: 0.4, color: 'text-blue-500', opacity: 0.45 },
    { icon: 'fa-drumstick-bite', size: 42, top: '35%', left: '5%', rotate: -15, delay: 1.0, color: 'text-amber-700', opacity: 0.45 },
    { icon: 'fa-bread-slice', size: 44, top: '50%', right: '15%', rotate: 5, delay: 0.7, color: 'text-amber-600', opacity: 0.5 },
    { icon: 'fa-pizza-slice', size: 46, top: '70%', right: '5%', rotate: -10, delay: 1.3, color: 'text-red-600', opacity: 0.45 },
    { icon: 'fa-leaf', size: 36, top: '15%', left: '15%', rotate: 10, delay: 0.8, color: 'text-green-600', opacity: 0.45 },
    { icon: 'fa-seedling', size: 34, top: '55%', left: '40%', rotate: 0, delay: 1.6, color: 'text-green-500', opacity: 0.4 },
    { icon: 'fa-bacon', size: 44, top: '80%', right: '35%', rotate: 12, delay: 0.3, color: 'text-red-500', opacity: 0.5 },
    { icon: 'fa-cookie', size: 38, top: '30%', right: '30%', rotate: -5, delay: 1.1, color: 'text-amber-700', opacity: 0.45 },
  ];
  
  return (
    <section className="relative overflow-hidden pt-16 pb-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-green-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-[10%] w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Floating food ingredients */}
      {floatingIngredients.map((ingredient, index) => (
        <FloatingIngredient
          key={index}
          icon={ingredient.icon}
          size={ingredient.size}
          top={ingredient.top}
          left={ingredient.left}
          right={ingredient.right}
          rotate={ingredient.rotate}
          delay={ingredient.delay}
          color={ingredient.color}
          opacity={ingredient.opacity}
          zIndex={5}
          animationDuration={8 + Math.random() * 4}
        />
      ))}
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 px-3 py-1">
                <i className="fas fa-bolt mr-1.5"></i>
                AI-POWERED FOOD RECOGNITION
              </Badge>
            </motion.div>
            
            <motion.h1
              className="text-5xl font-bold leading-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span>Transform </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                food photos
              </span>
              <span> into detailed recipes</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI technology instantly identifies dishes, provides ingredients, step-by-step instructions, and nutritional information from a single photo.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                Browse Recipes
              </Button>
            </motion.div>
            
            <motion.div
              className="flex items-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex -space-x-2 mr-3">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/17.jpg" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
              </div>
              <p>Trusted by <span className="font-medium text-gray-700">14,000+</span> home cooks</p>
            </motion.div>
          </div>
          
          {/* Right column - Visual content */}
          <div className="relative h-[500px]">
            {/* Main dish image */}
            <FloatingFoodImage 
              src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Delicious pasta dish"
              top="5%"
              left="5%"
              width="70%"
              delay={0.1}
              zIndex={30}
            />
            
            {/* Secondary food images */}
            <FloatingFoodImage 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80" 
              alt="Pizza"
              top="40%"
              right="0%"
              width="50%"
              delay={0.3}
              rotate={-5}
              zIndex={20}
            />
            
            <FloatingFoodImage 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Colorful food plate"
              top="60%"
              left="15%"
              width="45%"
              delay={0.5}
              rotate={5}
              zIndex={25}
            />
            
            {/* Recipe steps card */}
            <motion.div
              className="absolute right-5 top-[35%] bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 w-[220px] z-40"
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
        
        {/* Enhanced transition element between stats and featured dishes */}
        <div className="py-6 flex flex-col items-center">
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-500/10 via-green-500 to-green-500/10 rounded-full mb-2"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500/10 via-green-500/60 to-green-500/10 rounded-full"></div>
          <div className="mt-4 bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-gray-500 inline-flex items-center">
            <i className="fas fa-arrow-down mr-1.5 text-green-500"></i>
            Continue exploring
          </div>
        </div>
      </div>
    </section>
  );
}