import { useState, useEffect, useRef } from "react";
import ImageUploader from "@/components/ImageUploader";
import LoadingAnimation from "@/components/LoadingAnimation";
import RecipeResults from "@/components/RecipeResults";
import { type AnalyzeImageResponse } from "@shared/schema";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/Logo";

// Featured food cards used in the new design
const featuredFoods = [
  {
    name: "Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    tags: ["Italian", "Dinner", "Creamy"]
  },
  {
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137378783-f23d106a4d76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    tags: ["Breakfast", "Healthy", "Quick"]
  },
  {
    name: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    tags: ["Indian", "Spicy", "Dinner"]
  },
  {
    name: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Breakfast", "Healthy", "Vegan"]
  }
];

// Testimonials for the new design
const testimonials = [
  {
    quote: "This app has transformed how I cook! I just snap a photo of a dish I like and immediately get the recipe. Genius!",
    author: "Jamie Chen",
    role: "Home Cook",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "As a food blogger, Dish Detective is my secret weapon. The AI recognizes even complex dishes and gives me accurate recipes every time.",
    author: "Michael Torres",
    role: "Food Blogger",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "I love how it breaks down nutrition info! Now I can recreate restaurant dishes at home while keeping track of my macros.",
    author: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

// How it works steps
const howItWorksSteps = [
  {
    icon: "fa-camera",
    title: "Snap or Upload",
    description: "Take a photo of any dish or upload an existing food image"
  },
  {
    icon: "fa-magic",
    title: "AI Analysis",
    description: "Our AI analyzes the image to identify ingredients and preparation"
  },
  {
    icon: "fa-utensils",
    title: "Get Your Recipe",
    description: "Receive a complete recipe with ingredients, instructions, and nutrition facts"
  },
  {
    icon: "fa-check-circle",
    title: "Cook & Enjoy",
    description: "Follow the interactive recipe steps and enjoy your homemade dish"
  }
];

export default function Home() {
  const [stage, setStage] = useState<"upload" | "loading" | "results">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeImageResponse | null>(null);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the upload section if a deep link is used
  useEffect(() => {
    if (location.includes('#upload-section')) {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Handle analyzing an image
  const handleAnalyzeImage = (imageData: string) => {
    setSelectedImage(imageData);
    setStage("loading");
    
    // Show toast for better user feedback
    toast({
      title: "Analysis Started",
      description: "We're analyzing your food image. This may take a moment...",
    });
    
    // Directly use apiRequest from lib/api
    apiRequest<AnalyzeImageResponse>('POST', '/api/analyze-image', { imageData })
      .then((response) => {
        // Validate that we have a proper response with required fields
        if (!response || !response.foodName || !response.recipes || response.recipes.length === 0) {
          console.error('Invalid response from API:', response);
          throw new Error("The AI couldn't identify the food in your image properly.");
        }
        
        console.log('Analysis successful:', response);
        setAnalysisResult(response);
        setStage("results");
        
        // Trigger confetti effect when recipe is found
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
        
        toast({
          title: `Found: ${response.foodName}`,
          description: "Your recipe is ready! We've analyzed your dish successfully.",
          variant: "default",
        });
      })
      .catch((error: any) => {
        console.error('Error in image analysis:', error);
        setStage("upload");
        
        // Check if it's a quota exceeded error
        if (error.status === 429) {
          toast({
            title: "API Quota Exceeded",
            description: "Our AI service has reached its quota limit. Please try again later.",
            variant: "destructive",
          });
        } 
        // Check if it's a file size issue
        else if (error.status === 413) {
          toast({
            title: "Image Too Large",
            description: "The image you uploaded is too large. Please use an image under 5MB.",
            variant: "destructive",
          });
        }
        // Handle API validation errors
        else if (error.status === 500 && error.details) {
          toast({
            title: "Analysis Failed",
            description: error.details || "The AI service encountered a problem. Please try again with a different image.",
            variant: "destructive",
          });
        }
        // Generic error for other cases
        else {
          toast({
            title: "Analysis Failed",
            description: "We couldn't analyze your image. Please try again with a clearer photo of a food dish.",
            variant: "destructive",
          });
        }
      });
  };
  
  // Handle trying another image
  const handleTryAnother = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setStage("upload");
    
    // Smooth scroll back to upload section
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to upload section
  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <AnimatePresence mode="wait">
        {stage === "upload" && (
          <motion.div
            key="upload-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Navigation */}
            <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
              <div className="container max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Logo size="small" animated={false} />
                    <span className="font-bold text-xl text-slate-800">Dish<span className="text-primary">Detective</span></span>
                  </div>
                  <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-slate-600 hover:text-primary font-medium transition-colors">Features</a>
                    <a href="#how-it-works" className="text-slate-600 hover:text-primary font-medium transition-colors">How It Works</a>
                    <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium transition-colors">Testimonials</a>
                  </nav>
                  <Button 
                    onClick={scrollToUpload} 
                    className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-6 shadow-md"
                  >
                    Try It Now
                  </Button>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="pt-16 lg:pt-24 pb-16 overflow-hidden relative">
              <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSI0OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjQ4IiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iMSIvPjwvZz48L3N2Zz4=')]"
                  style={{ color: 'currentColor' }}
                />
              </div>
              
              <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <motion.div 
                    className="lg:w-1/2 text-center lg:text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="mb-5 bg-primary/10 text-primary border-none py-1.5 px-4 text-sm">
                      AI-POWERED FOOD RECOGNITION
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                      <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
                        Snap, Analyze, Cook
                      </span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-xl">
                      Turn any food photo into a detailed recipe with ingredients, 
                      step-by-step instructions, and nutritional information using our 
                      advanced AI technology.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button 
                        size="lg"
                        onClick={scrollToUpload}
                        className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full px-8 shadow-md py-6 text-lg"
                      >
                        <i className="fas fa-camera mr-2"></i> 
                        Try It Now
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 border-2 border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary transition-all py-6 text-lg"
                      >
                        <i className="fas fa-info-circle mr-2"></i> 
                        Learn More
                      </Button>
                    </div>
                    
                    <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start text-sm text-slate-500">
                      <div className="flex -space-x-2">
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/17.jpg" alt="" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
                      </div>
                      <p>Trusted by <span className="font-medium text-slate-700">14,000+</span> home cooks</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="lg:w-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-br from-primary/10 to-emerald-600/10 rounded-[2.5rem] p-4 sm:p-8 shadow-xl">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=722&q=80" 
                            alt="Food dish being analyzed"
                            className="w-full h-72 sm:h-96 object-cover"
                          />
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-slate-800">Chocolate Lava Cake</h3>
                              <Badge variant="outline" className="bg-primary/10 text-primary border-none">
                                Identified
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">Dessert</Badge>
                              <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">Chocolate</Badge>
                              <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">Baking</Badge>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-1">
                              <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                            </div>
                            <p className="text-sm text-slate-500">Recipe analysis complete (85%)</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full opacity-70 blur-2xl"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-primary to-emerald-400 rounded-full opacity-70 blur-2xl"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Featured Foods Section */}
            <section className="py-20 bg-white">
              <div className="container max-w-7xl mx-auto px-4">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-4 bg-amber-100 text-amber-700 border-none py-1.5 px-4">
                    FEATURED DISHES
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Explore Popular <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Dishes</span>
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Try analyzing these popular dishes or use them as inspiration for your next cooking adventure.
                    Our AI can recognize thousands of different foods from around the world.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredFoods.map((food, index) => (
                    <motion.div 
                      key={index}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-md h-64">
                        <img 
                          src={food.image} 
                          alt={food.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-xl mb-2">{food.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {food.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-black/30 text-white border-none backdrop-blur-sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-slate-50">
              <div className="container max-w-7xl mx-auto px-4">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                    SIMPLE PROCESS
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    How <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">It Works</span>
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Our AI-powered platform makes it incredibly easy to go from a food photo to a complete recipe in just seconds.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {howItWorksSteps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          >
                            <i className={`fas ${step.icon} text-2xl text-primary`}></i>
                          </motion.div>
                        </div>
                        {index < howItWorksSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-emerald-400/20 transform -translate-x-10"></div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                      <p className="text-slate-600">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50 to-white"></div>
              <div className="relative z-10 container max-w-7xl mx-auto px-4">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-none py-1.5 px-4">
                    TESTIMONIALS
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What Our <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Users Say</span>
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Join thousands of satisfied users who are transforming how they cook with Dish Detective.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 border border-slate-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-primary mb-4">
                        <i className="fas fa-quote-left text-3xl opacity-20"></i>
                      </div>
                      <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-800">{testimonial.author}</h4>
                          <p className="text-sm text-slate-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gradient-to-b from-white to-slate-50">
              <div className="container max-w-7xl mx-auto px-4">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                    KEY FEATURES
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Everything You <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Need</span>
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Our platform offers everything you need to transform food photos into delicious home-cooked meals.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      icon: "fa-camera-retro",
                      title: "Instant Image Analysis",
                      description: "Our AI can recognize thousands of dishes from a single photo, giving you accurate results in seconds"
                    },
                    {
                      icon: "fa-utensils",
                      title: "Complete Recipes",
                      description: "Get detailed ingredients, step-by-step instructions, and cooking times for any dish"
                    },
                    {
                      icon: "fa-chart-pie",
                      title: "Nutrition Facts",
                      description: "Understand the nutritional profile of your meals with detailed macro and micronutrient information"
                    },
                    {
                      icon: "fa-sliders-h",
                      title: "Recipe Variations",
                      description: "Customize recipes to your taste with spicy, mild, or dietary-specific variations"
                    },
                    {
                      icon: "fa-lightbulb",
                      title: "Cooking Tips",
                      description: "Learn professional techniques and avoid common mistakes with expert cooking advice"
                    },
                    {
                      icon: "fa-mobile-alt",
                      title: "Use Anywhere",
                      description: "Take photos directly or upload existing images from your gallery, works on any device"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-emerald-400/10 rounded-xl flex items-center justify-center mb-5">
                        <i className={`fas ${feature.icon} text-xl text-primary`}></i>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Upload Section */}
            <section ref={uploadSectionRef} id="upload-section" className="py-16 bg-gradient-to-br from-primary/5 to-emerald-600/5 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSI0OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjQ4IiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iMSIvPjwvZz48L3N2Zz4=')]"
                style={{ color: 'currentColor', opacity: 0.05 }}
              ></div>
              <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-4 bg-primary/15 text-primary border-none py-1.5 px-4">
                    TRY IT NOW
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Analyze</span> Your Dish?
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                    Upload a photo of any food and our AI will identify it and provide you with a detailed recipe.
                  </p>
                </motion.div>
                
                <ImageUploader onAnalyzeImage={handleAnalyzeImage} />
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
              <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-8 md:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Logo size="small" animated={false} />
                      <span className="font-bold text-xl">Dish<span className="text-primary">Detective</span></span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-xs">
                      AI-powered food recognition application that turns photos into detailed recipes instantly.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Features</h4>
                      <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Image Analysis</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Recipe Library</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Nutritional Info</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">About</h4>
                      <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Testimonials</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Contact</h4>
                      <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-800 mt-10 pt-10 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-slate-500 text-sm mb-4 md:mb-0">
                    © {new Date().getFullYear()} Dish Detective. All rights reserved.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                      <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                      <i className="fab fa-facebook text-lg"></i>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                      <i className="fab fa-pinterest text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
        
        {stage === "loading" && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-16 min-h-screen flex items-center justify-center"
          >
            <LoadingAnimation />
          </motion.div>
        )}
        
        {stage === "results" && analysisResult && selectedImage && (
          <motion.div
            key="results-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <div className="container max-w-7xl mx-auto">
              <RecipeResults 
                result={analysisResult}
                imageUrl={selectedImage}
                onTryAnother={handleTryAnother}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
