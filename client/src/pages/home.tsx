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
import Hero from "@/components/Hero"; // Import the Hero component
import ProtectedFeature from "@/components/ProtectedFeature"; // Import the ProtectedFeature component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Testimonials for the new design

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
    description: "Take a photo of any dish or upload an existing food image",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    animation: "photo-snap" // Custom animation
  },
  {
    icon: "fa-microchip",
    title: "AI Analysis",
    description: "Our AI analyzes the image to identify ingredients and preparation",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    animation: "ai-processing" // Custom animation
  },
  {
    icon: "fa-book-open",
    title: "Get Your Recipe",
    description: "Receive a complete recipe with ingredients, instructions, and nutrition facts",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    animation: "recipe-reveal" // Custom animation
  },
  {
    icon: "fa-utensils",
    title: "Cook & Enjoy",
    description: "Follow the interactive recipe steps and enjoy your homemade dish",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    animation: "cooking-enjoyment" // Custom animation
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
    <div className="bg-white min-h-screen">
      <main>
        {/* Hero Section */}
        <Hero onGetStarted={scrollToUpload} />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-slate-50">
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
                  {/* Advanced animated icon with fancy effects */}
                  <motion.div 
                    className={`relative overflow-hidden rounded-xl shadow-lg ${step.bgColor} h-36 w-36 mx-auto mb-6 flex items-center justify-center`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      duration: 0.8,
                      delay: index * 0.2
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Animated background elements */}
                    <motion.div 
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "linear", 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 10%)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* Main icon animation differs based on the step */}
                    {step.animation === "photo-snap" && (
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotateZ: [0, -5, 0, 5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <i className={`fas ${step.icon} text-4xl ${step.iconColor}`}></i>
                        </motion.div>
                        <motion.div 
                          className="absolute -top-3 -right-3 text-white text-xs"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.1, 0.2]
                          }}
                        >
                          <i className="fas fa-circle text-white text-sm"></i>
                        </motion.div>
                      </div>
                    )}
                    
                    {step.animation === "ai-processing" && (
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <i className={`fas ${step.icon} text-4xl ${step.iconColor}`}></i>
                        <motion.div
                          className="absolute inset-0 mix-blend-screen"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(30,144,255,0.4) 0%, transparent 50%)',
                              'radial-gradient(circle, rgba(30,144,255,0.6) 50%, transparent 100%)',
                              'radial-gradient(circle, rgba(30,144,255,0.4) 0%, transparent 50%)',
                            ],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity
                          }}
                        />
                      </motion.div>
                    )}
                    
                    {step.animation === "recipe-reveal" && (
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            rotateZ: [0, -3, 0, 3, 0],
                            y: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity
                          }}
                        >
                          <i className={`fas ${step.icon} text-4xl ${step.iconColor}`}></i>
                        </motion.div>
                        <motion.div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.2, 0.5]
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.5, 1]
                          }}
                        >
                          <i className="fas fa-utensils text-4xl text-purple-300 opacity-40"></i>
                        </motion.div>
                      </div>
                    )}
                    
                    {step.animation === "cooking-enjoyment" && (
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <i className={`fas ${step.icon} text-4xl ${step.iconColor}`}></i>
                        </motion.div>
                        <motion.div 
                          className="absolute -bottom-3 left-0 right-0 text-center"
                          animate={{ 
                            y: [10, 0, 10],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity
                          }}
                        >
                          <i className="fas fa-heart text-red-400 text-sm"></i>
                          <i className="fas fa-star text-yellow-400 text-sm ml-1"></i>
                          <i className="fas fa-heart text-red-400 text-sm ml-1"></i>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-slate-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recipe Magic in Action Section */}
        <section id="recipe-magic" className="py-12 sm:py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-none py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm">
                AI-POWERED RECIPES
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Recipe <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Magic</span> In Action
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Take a look at the incredible recipe insights our AI generates from a single food photo.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <div className="bg-black text-white p-2 flex items-center">
                  <div className="flex space-x-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-green-400 text-sm">dishdetective.app</div>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4"><i className="fas fa-wifi text-xs"></i></div>
                    <div className="w-4 h-4"><i className="fas fa-battery-full text-xs"></i></div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  {/* Left panel - food image */}
                  <div className="relative w-full md:w-2/5 bg-gray-800">
                    <img 
                      src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Butter Chicken" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-1 shadow-sm">
                      <div className="flex items-center">
                        <i className="fas fa-utensils text-slate-700 mr-2"></i>
                        <span className="font-medium">Food Detector</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-3 py-1 text-sm shadow-sm flex items-center">
                      <i className="fas fa-check-circle mr-1"></i>
                      <span>Analyzed</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                      <div className="text-xs text-green-400 mb-1">ANALYZED WITH 91% CONFIDENCE</div>
                      <h3 className="text-xl font-bold mb-1">Butter Chicken</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-800 bg-opacity-70 px-2 py-1 rounded">Indian</span>
                        <span className="text-xs bg-gray-800 bg-opacity-70 px-2 py-1 rounded">Curry</span>
                        <span className="text-xs bg-gray-800 bg-opacity-70 px-2 py-1 rounded">Spicy</span>
                        <span className="text-xs bg-gray-800 bg-opacity-70 px-2 py-1 rounded">Popular</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right panel - recipe info */}
                  <div className="w-full md:w-3/5 bg-gray-50">
                    <Tabs defaultValue="ingredients" className="w-full">
                      <TabsList className="p-0 bg-gray-100 border-b rounded-none h-auto w-full">
                        <TabsTrigger className="text-sm py-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary" value="ingredients">Ingredients</TabsTrigger>
                        <TabsTrigger className="text-sm py-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary" value="steps">Steps</TabsTrigger>
                        <TabsTrigger className="text-sm py-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary" value="nutrition">Nutrition</TabsTrigger>
                        <TabsTrigger className="text-sm py-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary" value="tips">Pro Tips</TabsTrigger>
                        <TabsTrigger className="text-sm py-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary" value="videos">Videos</TabsTrigger>
                      </TabsList>
                    
                      <TabsContent value="ingredients" className="p-4 m-0 border-none">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-bold text-lg">Butter Chicken Ingredients</h3>
                          <div className="flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1 flex items-center">
                              <i className="fas fa-robot mr-1"></i>
                              AI Generated
                            </span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2">
                          {[
                            "800g boneless chicken thighs",
                            "1 cup plain yogurt",
                            "2 tbsp lemon juice",
                            "2 tsp garam masala",
                            "2 tsp ground cumin",
                            "2 tsp ground turmeric",
                            "4 tbsp butter",
                            "1 large onion, finely chopped",
                            "4 cloves garlic, minced",
                            "2 tbsp ginger, grated"
                          ].map((ingredient, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="mr-2 text-green-500"><i className="fas fa-check"></i></div>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button className="mt-4 w-full text-sm bg-white border border-green-500 text-green-600 py-1 px-3 rounded flex items-center justify-center">
                          <i className="fas fa-shopping-cart mr-2"></i>
                          Add to Shopping List
                        </button>
                      </TabsContent>
                      
                      <TabsContent value="steps" className="p-4 m-0 border-none">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-bold text-lg">Cooking Instructions</h3>
                          <div className="flex items-center">
                            <span className="bg-amber-100 text-amber-800 text-xs rounded-full px-2 py-1 flex items-center">
                              <i className="fas fa-clock mr-1"></i>
                              40 min cook time
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-4 top-5 bottom-0 w-0.5 bg-green-100"></div>
                          <div className="space-y-4">
                            {[
                              "In a bowl, mix yogurt, lemon juice, and spices for the marinade.",
                              "Add chicken pieces and marinate for at least 2 hours or overnight.",
                              "Heat 2 tbsp butter in a large pan. Cook chicken until browned and set aside.",
                              "In the same pan, add remaining butter, onions, garlic, ginger, and chilies. Sauté until golden.",
                              "Add tomato puree and simmer for 15 minutes until sauce thickens.",
                              "Return chicken to the pan, add heavy cream, and simmer for 10-15 minutes."
                            ].map((step, idx) => (
                              <div key={idx} className="flex">
                                <div className="flex-shrink-0 mr-4">
                                  <div className="bg-white h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center text-sm font-semibold text-green-600 z-10 relative">
                                    {idx + 1}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100 flex-grow text-sm">
                                  {step}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="nutrition" className="p-4 m-0 border-none">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-bold text-lg">Nutritional Information</h3>
                          <div className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1 flex items-center">
                              <i className="fas fa-calculator mr-1"></i>
                              Per Serving
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-blue-800 text-sm font-semibold">Calories</p>
                            <p className="text-2xl font-bold">580</p>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-red-800 text-sm font-semibold">Protein</p>
                            <p className="text-2xl font-bold">42g</p>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-yellow-800 text-sm font-semibold">Carbs</p>
                            <p className="text-2xl font-bold">18g</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-green-800 text-sm font-semibold">Fats</p>
                            <p className="text-2xl font-bold">38g</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">High Protein</span>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">Low Carb</span>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">Gluten Free</span>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tips" className="p-4 m-0 border-none">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-bold text-lg">Pro Cooking Tips</h3>
                          <div className="flex items-center">
                            <span className="bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-1 flex items-center">
                              <i className="fas fa-lightbulb mr-1"></i>
                              Chef Advice
                            </span>
                          </div>
                        </div>
                        
                        <ul className="space-y-3">
                          {[
                            "For more depth of flavor, toast your whole spices and then grind them fresh.",
                            "The longer you marinate the chicken, the more tender and flavorful it will be.",
                            "If using chicken breast instead of thighs, reduce the cooking time to avoid drying out the meat.",
                            "Kasuri methi (dried fenugreek leaves) is essential for authentic flavor - don't skip it!",
                            "For a richer texture, use heavy cream; for a lighter version, substitute with yogurt."
                          ].map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="text-purple-500 mr-2 mt-0.5"><i className="fas fa-star"></i></div>
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm">
                          <h4 className="font-medium text-amber-800 mb-1">Perfect Pairing</h4>
                          <p className="text-amber-700">Serve with garlic naan bread and basmati rice to complete this authentic Indian meal.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="videos" className="p-4 m-0 border-none">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-bold text-lg">Tutorial Videos</h3>
                          <div className="flex items-center">
                            <span className="bg-red-100 text-red-800 text-xs rounded-full px-2 py-1 flex items-center">
                              <i className="fas fa-play-circle mr-1"></i>
                              Watch & Learn
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {/* Tutorial Video */}
                          <a 
                            href="https://www.youtube.com/watch?v=a03U45jFxOI" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block"
                          >
                            <div className="bg-slate-50 rounded-lg overflow-hidden">
                              <div className="aspect-video bg-slate-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                  <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                    <i className="fas fa-play text-white text-2xl"></i>
                                  </div>
                                </div>
                                <img 
                                  src="https://i.ytimg.com/vi/a03U45jFxOI/maxresdefault.jpg" 
                                  alt="Butter Chicken Recipe"
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h4 className="font-semibold text-lg mb-1">Butter Chicken Recipe | Restaurant Style</h4>
                                <div className="flex justify-between text-sm text-slate-500">
                                  <span>Chef Ranveer Brar</span>
                                  <span>10:28</span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                <div className="bg-gray-800 text-white p-2 flex justify-between items-center text-xs">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <i className="fas fa-robot text-white text-xs"></i>
                    </div>
                    <span>AI-Powered Recipe Detection</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <i className="fas fa-book mr-1"></i>
                      <span>5,280+ recipes</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-globe-americas mr-1"></i>
                      <span>120+ cuisines</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Recipe Fusion Power Section */}
        <section id="recipe-fusion" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-none py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm">
                FUSION RECIPES
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Recipe <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Fusion</span> Power
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Combine any dishes to create unique fusion recipes with our AI-powered recipe chat.
                Ask for Thai-Italian fusion or Mexican-Japanese mashups - the possibilities are endless!
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-8">
              <motion.div 
                className="md:col-span-5 lg:col-span-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-primary to-emerald-600 text-white p-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <i className="fas fa-robot text-primary text-lg"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">Recipe Fusion AI</h3>
                      <p className="text-xs text-white/80">Powered by advanced culinary intelligence</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold text-slate-700 mb-2">What would you like to create?</h4>
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2">
                        <div className="bg-primary/10 rounded-lg px-3 py-2 text-sm flex-1">
                          <p className="font-medium text-primary">Fusion Examples:</p>
                          <ul className="mt-1 space-y-1 text-slate-700">
                            <li className="flex items-center text-xs"><i className="fas fa-utensils text-primary/70 mr-1.5"></i> Italian + Thai</li>
                            <li className="flex items-center text-xs"><i className="fas fa-utensils text-primary/70 mr-1.5"></i> Mexican + Korean</li>
                            <li className="flex items-center text-xs"><i className="fas fa-utensils text-primary/70 mr-1.5"></i> Indian + Mediterranean</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg py-2 px-3 text-xs text-slate-700">
                          Pasta + Curry
                        </button>
                        <button className="bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg py-2 px-3 text-xs text-slate-700">
                          Tacos + Sushi
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Describe dishes to combine..." 
                        className="w-full p-2.5 pr-10 rounded-lg border-2 border-primary/20 focus:border-primary/50 text-sm"
                      />
                      <button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-primary bg-primary/10 rounded-full w-7 h-7 flex items-center justify-center">
                        <i className="fas fa-paper-plane text-xs"></i>
                      </button>
                    </div>
                    
                    <div className="mt-4 bg-yellow-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <i className="fas fa-lightbulb text-yellow-600 mr-2"></i>
                        <h5 className="font-semibold text-sm text-yellow-800">How It Works</h5>
                      </div>
                      <p className="text-xs text-yellow-700 leading-snug">
                        Our AI analyzes thousands of recipes to create perfect fusion dishes that blend flavors, techniques, and ingredients from different cuisines.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:col-span-7 lg:col-span-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <div className="bg-black text-white p-2 flex items-center">
                    <div className="flex space-x-2 mr-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-green-400 text-sm">recipefusion.chat</div>
                    <div className="flex space-x-2">
                      <div className="w-4 h-4"><i className="fas fa-wifi text-xs"></i></div>
                      <div className="w-4 h-4"><i className="fas fa-battery-full text-xs"></i></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    {/* Left panel - Chat interface */}
                    <div className="w-full md:w-2/5 p-3 sm:p-4 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                          <i className="fas fa-comments text-primary text-sm"></i>
                        </div>
                        <h3 className="font-bold">Recipe Chat</h3>
                      </div>
                      
                      <div className="space-y-3 p-2.5 sm:p-3 bg-white rounded-lg shadow-sm mb-3 border border-slate-100">
                        <div className="flex">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                            <i className="fas fa-user text-white text-xs"></i>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-2 sm:p-2.5 text-xs sm:text-sm max-w-[85%]">
                            Can you create a fusion dish combining tacos and sushi?
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-primary rounded-lg p-2 sm:p-2.5 text-xs sm:text-sm text-white max-w-[85%]">
                            I'll create a Sushi Taco fusion recipe for you! This will combine the best elements of both dishes.
                          </div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center ml-2 flex-shrink-0">
                            <i className="fas fa-robot text-green-600 text-xs"></i>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                            <i className="fas fa-user text-white text-xs"></i>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-2 sm:p-2.5 text-xs sm:text-sm max-w-[85%]">
                            Great! Can you include avocado and spicy mayo too?
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Type a message..." 
                          className="w-full p-2 sm:p-2.5 pr-9 sm:pr-10 rounded-lg border border-slate-200 text-xs sm:text-sm focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
                        />
                        <button className="absolute right-2 sm:right-2.5 top-1/2 transform -translate-y-1/2 text-primary bg-primary/10 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-primary/20 transition-colors">
                          <i className="fas fa-paper-plane text-xs"></i>
                        </button>
                      </div>
                    </div>
                    
                    {/* Right panel - Recipe result */}
                    <div className="w-full md:w-3/5 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <div>
                          <h3 className="font-bold text-lg sm:text-xl">Sushi Tacos</h3>
                          <div className="flex items-center text-xs sm:text-sm text-slate-500">
                            <span className="flex items-center mr-3"><i className="fas fa-clock mr-1"></i> 30 mins</span>
                            <span className="flex items-center"><i className="fas fa-utensils mr-1"></i> Medium</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 text-xs">Fusion</span>
                          <span className="px-3 py-1 rounded-full bg-red-50 flex items-center justify-center text-red-800 text-xs">Japanese</span>
                          <span className="px-3 py-1 rounded-full bg-green-50 flex items-center justify-center text-green-800 text-xs">Mexican</span>
                        </div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-lg overflow-hidden shadow-md border border-slate-200 mb-4"
                      >
                        <div className="relative bg-gradient-to-r from-amber-400 to-red-500 h-32 sm:h-40">
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium border border-white/30">
                              <i className="fas fa-camera mr-1.5 sm:mr-2"></i>
                              AI-Generated Recipe Image
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                            AI-Generated Fusion
                          </div>
                        </div>
                        <div className="p-3 bg-white">
                          <p className="text-xs sm:text-sm text-slate-700">
                            These fusion Sushi Tacos feature crispy nori shells filled with sushi rice, fresh sashimi-grade 
                            fish, avocado, and cucumber, topped with spicy mayo, sesame seeds, and lime.
                          </p>
                        </div>
                      </motion.div>
                      
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="flex border-b">
                          <button className="flex-1 p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-primary border-b-2 border-primary bg-primary/5">
                            Ingredients
                          </button>
                          <button className="flex-1 p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors">
                            Instructions
                          </button>
                          <button className="flex-1 p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors">
                            Tips
                          </button>
                        </div>
                        
                        <div className="p-3 sm:p-4">
                          <ul className="space-y-2 text-xs sm:text-sm">
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 sm:mr-2.5 rounded border-slate-300 text-primary focus:ring-primary/30" />
                              <span>8 small crispy nori sheets</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 sm:mr-2.5 rounded border-slate-300 text-primary focus:ring-primary/30" />
                              <span>2 cups sushi rice, cooked and seasoned</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 sm:mr-2.5 rounded border-slate-300 text-primary focus:ring-primary/30" />
                              <span>200g sashimi-grade salmon or tuna, sliced</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 sm:mr-2.5 rounded border-slate-300 text-primary focus:ring-primary/30" />
                              <span>1 ripe avocado, sliced</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 sm:mr-2.5 rounded border-slate-300 text-primary focus:ring-primary/30" />
                              <span>Spicy mayo (Japanese mayo + sriracha)</span>
                            </li>
                          </ul>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                            <button className="text-xs sm:text-sm bg-primary/10 text-primary py-2 px-3 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center">
                              <i className="fas fa-list-check mr-1.5"></i>
                              Complete Recipe
                            </button>
                            <button className="text-xs sm:text-sm bg-slate-100 text-slate-700 py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                              <i className="fas fa-print mr-1.5"></i>
                              Print Recipe
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 text-white p-2 sm:p-2.5 flex justify-between items-center text-xs">
                    <div className="flex items-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                        <i className="fas fa-robot text-white text-xs"></i>
                      </div>
                      <span>AI Recipe Fusion</span>
                    </div>
                    <a 
                      href="/chat" 
                      className="flex items-center bg-green-600 hover:bg-green-700 transition-colors rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-white text-xs"
                    >
                      <span>Try Recipe Chat</span>
                      <i className="fas fa-arrow-right ml-1 sm:ml-1.5"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 text-xs">Thai-Italian</span>
                <span className="px-4 py-1.5 rounded-full bg-red-50 flex items-center justify-center text-red-800 text-xs">Korean-Mexican</span>
                <span className="px-4 py-1.5 rounded-full bg-green-50 flex items-center justify-center text-green-800 text-xs">Indian-Mediterranean</span>
                <span className="px-4 py-1.5 rounded-full bg-purple-50 flex items-center justify-center text-purple-800 text-xs">Japanese-Peruvian</span>
                <span className="px-4 py-1.5 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 text-xs">French-Vietnamese</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-4 max-w-xl mx-auto px-4">
                Our AI has studied thousands of recipes across 120+ cuisines to create perfect fusion dishes that respect culinary traditions.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-10 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-none py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm">
                POWERFUL FEATURES
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Every <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Tool</span> You Need
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Discover why our platform is the ultimate solution for recreating any dish you see.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-camera text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Image Recognition</h3>
                <p className="text-slate-600">
                  Our advanced AI can identify thousands of dishes with just a photo, even detecting cooking techniques and ingredient variations.
                </p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-utensils text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Complete Recipes</h3>
                <p className="text-slate-600">
                  Get detailed, step-by-step instructions, ingredient lists, nutritional information, and cooking tips for any dish.
                </p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-globe-americas text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Cultural Context</h3>
                <p className="text-slate-600">
                  Learn about the cultural origins and history of your dishes, understanding the techniques that make them authentic.
                </p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-chart-pie text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Nutrition Analysis</h3>
                <p className="text-slate-600">
                  Track calories, macros, and dietary information for every recipe to maintain your health and fitness goals.
                </p>
              </motion.div>
              
              {/* Feature 5 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-red-100 text-red-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Recipe Variations</h3>
                <p className="text-slate-600">
                  Discover dietary alternatives, ingredient substitutions, and cooking method variations to personalize any recipe.
                </p>
              </motion.div>
              
              {/* Feature 6 */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-teal-100 text-teal-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-desktop text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Video Tutorials</h3>
                <p className="text-slate-600">
                  Watch related recipe videos that demonstrate techniques and preparation methods for visual learning.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        

        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 sm:py-16 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50 to-white"></div>
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-10 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-none py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm">
                USER FEEDBACK
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                What Our <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Users</span> Say
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Don't just take our word for it - hear from our community of food enthusiasts.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Upload Section */}
        <section ref={uploadSectionRef} id="upload-section" className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 to-emerald-600/5 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSI0OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjQ4IiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iMSIvPjwvZz48L3N2Zz4=')]" style={{ opacity: 0.3, color: '#10b981' }}></div>
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-none py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm">
                START COOKING
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Discover Your <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Recipe</span> Now
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Upload a food image to instantly get a complete recipe with ingredients, instructions, and nutritional information.
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {stage === "upload" && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-slate-100">
                      <ProtectedFeature
                        feature="AI Image Analysis"
                        fallbackMessage="Upload a food image to get a detailed recipe. Sign in to unlock this feature."
                      >
                        <ImageUploader onAnalyzeImage={handleAnalyzeImage} />
                      </ProtectedFeature>
                    </div>
                  </motion.div>
                )}
                
                {stage === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-slate-100"
                  >
                    <LoadingAnimation />
                  </motion.div>
                )}
                
                {stage === "results" && analysisResult && selectedImage && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="py-4 sm:py-8 px-2 sm:px-4"
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
          </div>
        </section>
        
      </main>
    </div>
  );
}