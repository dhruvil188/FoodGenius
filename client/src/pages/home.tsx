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

// Featured food cards with recipe data
const featuredFoods = [
  {
    name: "Avocado Toast",
    image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Breakfast", "Healthy", "Quick"],
    recipe: {
      foodName: "Avocado Toast",
      description: "Avocado toast is a simple open-faced sandwich consisting of toasted bread topped with mashed avocado and various seasonings. It has become a popular breakfast dish in contemporary cafe culture and health-conscious eating.",
      tags: ["Breakfast", "Brunch", "Healthy", "Vegetarian", "Quick", "Vegan-Optional"],
      recipes: [
        {
          title: "Classic Avocado Toast",
          description: "A simple yet delicious breakfast or snack featuring creamy avocado on toasted bread with minimal ingredients that let the avocado shine.",
          prepTime: "5 minutes",
          cookTime: "5 minutes",
          totalTime: "10 minutes",
          servings: 2,
          ingredients: [
            "2 slices of sourdough bread",
            "1 ripe avocado",
            "1 tbsp lemon or lime juice",
            "1/4 tsp salt",
            "1/4 tsp red pepper flakes (optional)",
            "1 tbsp extra virgin olive oil",
            "Freshly ground black pepper",
            "Microgreens or sprouts for garnish (optional)"
          ],
          instructions: [
            "Toast the bread until golden and crisp.",
            "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
            "Add lemon juice, salt, and mash with a fork to desired consistency (chunky or smooth).",
            "Spread the mashed avocado onto the toast.",
            "Drizzle with olive oil and sprinkle with red pepper flakes and black pepper.",
            "Top with microgreens if desired and serve immediately."
          ],
          nutritionInfo: {
            calories: 320,
            protein: "5g",
            carbs: "30g",
            fats: "22g"
          }
        }
      ]
    }
  },
  {
    name: "Berry Smoothie Bowl",
    image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Breakfast", "Healthy", "Vegan"],
    recipe: {
      foodName: "Berry Smoothie Bowl",
      description: "A smoothie bowl is a thick blend of fruits, vegetables, and other nutritious ingredients served in a bowl and topped with granola, fruits, nuts, seeds, or other toppings. It's essentially a smoothie that's thick enough to eat with a spoon.",
      tags: ["Breakfast", "Healthy", "Vegan", "Dairy-Free", "Gluten-Free", "No-Cook"],
      recipes: [
        {
          title: "Mixed Berry Smoothie Bowl",
          description: "A vibrant, antioxidant-rich breakfast bowl featuring a blend of mixed berries topped with crunchy, nutritious ingredients for a satisfying start to your day.",
          prepTime: "10 minutes",
          cookTime: "0 minutes",
          totalTime: "10 minutes",
          servings: 1,
          ingredients: [
            "1 cup frozen mixed berries (strawberries, blueberries, raspberries)",
            "1 frozen banana",
            "1/4 cup plant-based milk (almond, oat, or coconut)",
            "1 tbsp chia seeds",
            "1 tbsp almond or peanut butter (optional)",
            "For toppings: sliced fresh fruits, granola, coconut flakes, more chia seeds, hemp seeds, honey or maple syrup (optional)"
          ],
          instructions: [
            "Add frozen berries, banana, plant milk, chia seeds, and nut butter to a blender.",
            "Blend until smooth and thick. If too thick, add a splash more milk.",
            "The mixture should be thicker than a regular smoothie - you should be able to eat it with a spoon.",
            "Pour into a bowl and arrange toppings artfully on top.",
            "Serve immediately before it melts."
          ],
          nutritionInfo: {
            calories: 350,
            protein: "8g",
            carbs: "65g",
            fats: "10g"
          }
        }
      ]
    }
  },
  {
    name: "Butter Chicken",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Indian", "Spicy", "Dinner"],
    recipe: {
      foodName: "Butter Chicken",
      description: "Butter Chicken (Murgh Makhani) is a popular North Indian dish of chicken in a mildly spiced tomato sauce. It was developed in the 1950s by Kundan Lal Gujral, who created the recipe by mixing leftover tandoori chicken in a tomato gravy rich with butter and cream.",
      tags: ["Indian", "Curry", "Spicy", "Creamy", "Dinner", "Chicken"],
      recipes: [
        {
          title: "Authentic Butter Chicken",
          description: "A rich and creamy North Indian classic featuring tender chicken pieces in a velvety tomato-based sauce with aromatic spices.",
          prepTime: "30 minutes (plus 2 hours marinating)",
          cookTime: "40 minutes",
          totalTime: "3 hours 10 minutes",
          servings: 4,
          ingredients: [
            "800g (1.8lb) boneless chicken thighs, cut into pieces",
            "1 cup plain yogurt",
            "2 tbsp lemon juice",
            "2 tsp garam masala",
            "2 tsp ground cumin",
            "2 tsp ground turmeric",
            "2 tsp ground coriander",
            "4 tbsp butter, divided",
            "1 large onion, finely chopped",
            "4 cloves garlic, minced",
            "2 tbsp ginger, grated",
            "2 green chilies, minced (adjust to taste)",
            "2 cups tomato puree",
            "1 cup heavy cream",
            "2 tbsp dried fenugreek leaves (kasoori methi)",
            "Salt to taste",
            "Fresh cilantro for garnish"
          ],
          instructions: [
            "In a bowl, mix yogurt, lemon juice, and spices for the marinade.",
            "Add chicken pieces and marinate for at least 2 hours or overnight.",
            "Heat 2 tbsp butter in a large pan. Cook chicken until browned and set aside.",
            "In the same pan, add remaining butter, onions, garlic, ginger, and chilies. Sauté until golden.",
            "Add tomato puree and simmer for 15 minutes until sauce thickens.",
            "Return chicken to the pan, add heavy cream, and simmer for 10-15 minutes.",
            "Crush dried fenugreek leaves between palms and add to the curry.",
            "Season with salt, garnish with cilantro, and serve with naan or rice."
          ],
          nutritionInfo: {
            calories: 580,
            protein: "42g",
            carbs: "18g",
            fats: "38g"
          }
        }
      ]
    }
  },
  {
    name: "Pasta Carbonara",
    image: "https://images.pexels.com/photos/5949894/pexels-photo-5949894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Italian", "Dinner", "Creamy"],
    recipe: {
      foodName: "Pasta Carbonara",
      description: "Pasta Carbonara is a classic Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper. The dish took its modern form and name in the middle of the 20th century, after World War II.",
      tags: ["Italian", "Pasta", "Dinner", "Creamy", "Quick", "Egg-based"],
      recipes: [
        {
          title: "Classic Pasta Carbonara",
          description: "A traditional Roman pasta dish that combines eggs, Pecorino Romano cheese, pancetta and black pepper for a simple yet delicious meal.",
          prepTime: "10 minutes",
          cookTime: "15 minutes",
          totalTime: "25 minutes",
          servings: 4,
          ingredients: [
            "350g (12oz) spaghetti or bucatini",
            "150g (5oz) pancetta or guanciale, diced",
            "4 large egg yolks",
            "1 whole egg",
            "75g (2.5oz) Pecorino Romano cheese, finely grated",
            "75g (2.5oz) Parmesan cheese, finely grated", 
            "Black pepper, freshly ground",
            "Salt for pasta water"
          ],
          instructions: [
            "Bring a large pot of salted water to boil and cook pasta until al dente.",
            "While pasta cooks, sauté the pancetta in a large pan until crispy.",
            "In a bowl, whisk together egg yolks, whole egg, and grated cheeses.",
            "Reserve 1 cup of pasta water, then drain pasta.",
            "Working quickly, add hot pasta to the pan with pancetta (heat off).",
            "Add a splash of pasta water, then pour in egg mixture, tossing rapidly.",
            "Add more pasta water as needed to create a silky sauce.",
            "Season generously with freshly ground black pepper.",
            "Serve immediately with extra grated cheese on top."
          ],
          nutritionInfo: {
            calories: 650,
            protein: "32g",
            carbs: "65g",
            fats: "28g"
          }
        }
      ]
    }
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
    description: "Take a photo of any dish or upload an existing food image",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    contentIcon: "fa-image"
  },
  {
    icon: "fa-microchip",
    title: "AI Analysis",
    description: "Our AI analyzes the image to identify ingredients and preparation",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    contentIcon: "fa-brain"
  },
  {
    icon: "fa-book-open",
    title: "Get Your Recipe",
    description: "Receive a complete recipe with ingredients, instructions, and nutrition facts",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    contentIcon: "fa-clipboard-list"
  },
  {
    icon: "fa-utensils",
    title: "Cook & Enjoy",
    description: "Follow the interactive recipe steps and enjoy your homemade dish",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    contentIcon: "fa-smile-beam"
  }
];

export default function Home() {
  const [stage, setStage] = useState<"upload" | "loading" | "results">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeImageResponse | null>(null);
  const [featuredRecipeOpen, setFeaturedRecipeOpen] = useState(false);
  const [selectedFeaturedRecipe, setSelectedFeaturedRecipe] = useState<typeof featuredFoods[0] | null>(null);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the upload section if a deep link is used
  useEffect(() => {
    if (location.includes('#upload-section')) {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
  
  // Function to handle clicking on a featured dish
  const handleFeaturedDishClick = (food: typeof featuredFoods[0]) => {
    setSelectedFeaturedRecipe(food);
    setFeaturedRecipeOpen(true);
  };

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
                  {/* Step number circle with icon */}
                  <div className={`rounded-full ${step.bgColor} w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <i className={`fas ${step.icon} text-2xl ${step.iconColor}`}></i>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 mb-4">{step.description}</p>
                  
                  {/* Illustration */}
                  <div className="mt-2 h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                    <i className={`fas ${step.contentIcon} text-4xl text-slate-400`}></i>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recipe Magic in Action Section */}
        <section id="recipe-magic" className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                AI-POWERED RECIPES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Recipe <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Magic</span> In Action
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
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
                          {/* Video 1 */}
                          <div className="rounded-lg overflow-hidden border border-slate-200">
                            <div className="aspect-video bg-slate-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                                  <i className="fas fa-play text-white text-2xl"></i>
                                </div>
                                <img 
                                  src="https://i.ytimg.com/vi/a03U45jFxOI/maxresdefault.jpg" 
                                  alt="Butter Chicken Recipe"
                                  className="absolute inset-0 w-full h-full object-cover z-[-1]"
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-base">Butter Chicken Recipe | Restaurant Style</h4>
                              <div className="flex justify-between mt-2 text-xs text-slate-500">
                                <span>Chef Ranveer Brar</span>
                                <span>10:28</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video 2 */}
                          <div className="rounded-lg overflow-hidden border border-slate-200">
                            <div className="aspect-video bg-slate-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                                  <i className="fas fa-play text-white text-2xl"></i>
                                </div>
                                <img 
                                  src="https://i.ytimg.com/vi/4WCd135Upd8/maxresdefault.jpg" 
                                  alt="Easy Butter Chicken Recipe"
                                  className="absolute inset-0 w-full h-full object-cover z-[-1]"
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-base">Easy Butter Chicken at Home | Authentic Indian Recipe</h4>
                              <div className="flex justify-between mt-2 text-xs text-slate-500">
                                <span>Get Curried</span>
                                <span>8:45</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video 3 */}
                          <div className="rounded-lg overflow-hidden border border-slate-200">
                            <div className="aspect-video bg-slate-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                                  <i className="fas fa-play text-white text-2xl"></i>
                                </div>
                                <img 
                                  src="https://i.ytimg.com/vi/MWzxDPVtF8g/maxresdefault.jpg" 
                                  alt="Authentic Butter Chicken"
                                  className="absolute inset-0 w-full h-full object-cover z-[-1]"
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-base">The Secret to Perfect Butter Chicken | Murgh Makhani</h4>
                              <div className="flex justify-between mt-2 text-xs text-slate-500">
                                <span>Cooking With Sukhi</span>
                                <span>12:37</span>
                              </div>
                            </div>
                          </div>
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
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                POWERFUL FEATURES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Every <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Tool</span> You Need
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
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
        
        {/* Featured Dishes Section */}
        <section id="featured-dishes" className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                DISCOVER RECIPES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Dishes</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Explore these popular recipes that you can prepare at home today.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredFoods.map((food, index) => (
                <motion.div 
                  key={index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleFeaturedDishClick(food)}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={food.image} 
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{food.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {food.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50 to-white"></div>
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                USER FEEDBACK
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Users</span> Say
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
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
        <section ref={uploadSectionRef} id="upload-section" className="py-16 bg-gradient-to-br from-primary/5 to-emerald-600/5 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSI0OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIyNCIgcj0iMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjQ4IiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iMSIvPjwvZz48L3N2Zz4=')]" style={{ opacity: 0.3, color: '#10b981' }}></div>
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
                START COOKING
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Your <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Recipe</span> Now
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
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
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                      <ImageUploader onAnalyzeImage={handleAnalyzeImage} />
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
                    className="bg-white rounded-xl p-8 shadow-sm border border-slate-100"
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
          </div>
        </section>
        
        {/* Featured Recipe Dialog */}
        <Dialog open={featuredRecipeOpen} onOpenChange={setFeaturedRecipeOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedFeaturedRecipe?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedFeaturedRecipe?.recipe.description}
              </DialogDescription>
            </DialogHeader>
            
            {/* Recipe Content */}
            {selectedFeaturedRecipe && (
              <div className="mt-4">
                <Tabs defaultValue="recipe" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recipe">Recipe</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recipe" className="p-4">
                    <div className="space-y-4">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          {selectedFeaturedRecipe.recipe.recipes[0].title}
                        </h3>
                        <p className="text-slate-600">
                          {selectedFeaturedRecipe.recipe.recipes[0].description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          <i className="fas fa-clock mr-1"></i>
                          {selectedFeaturedRecipe.recipe.recipes[0].prepTime} prep
                        </span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          <i className="fas fa-clock mr-1"></i>
                          {selectedFeaturedRecipe.recipe.recipes[0].cookTime} cook time
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          <i className="fas fa-users mr-1"></i>
                          Serves {selectedFeaturedRecipe.recipe.recipes[0].servings}
                        </span>
                      </div>
                      
                      <div className="relative">
                        {/* Timeline connector */}
                        <div className="absolute left-4 top-5 bottom-4 w-0.5 bg-green-100"></div>
                        
                        {/* Steps with timeline */}
                        <div className="space-y-6">
                          {selectedFeaturedRecipe.recipe.recipes[0].instructions.map((instruction, idx) => (
                            <div key={idx} className="flex">
                              <div className="flex-shrink-0 mr-4">
                                <div className="bg-white h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center text-sm font-semibold text-green-600 z-10 relative">
                                  {idx + 1}
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex-grow">
                                {instruction}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ingredients" className="p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                      <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
                      <ul className="space-y-3">
                        {selectedFeaturedRecipe.recipe.recipes[0].ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs mr-3 mt-0.5">
                              {idx + 1}
                            </div>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nutrition" className="p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                      <h3 className="font-semibold text-lg mb-4">Nutritional Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-blue-800 text-sm font-semibold">Calories</p>
                          <p className="text-2xl font-bold">{selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.calories}</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <p className="text-red-800 text-sm font-semibold">Protein</p>
                          <p className="text-2xl font-bold">{selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.protein}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-yellow-800 text-sm font-semibold">Carbs</p>
                          <p className="text-2xl font-bold">{selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.carbs}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-green-800 text-sm font-semibold">Fats</p>
                          <p className="text-2xl font-bold">{selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.fats}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Dietary Information</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { text: "High Protein", color: "bg-red-100 text-red-800" },
                            { text: "Low Carb", color: "bg-yellow-100 text-yellow-800" },
                            { text: "Gluten Free", color: "bg-amber-100 text-amber-800" },
                            { text: "Keto Friendly", color: "bg-purple-100 text-purple-800" }
                          ].map((badge, i) => (
                            <span key={i} className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
                              {badge.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            <DialogFooter className="flex justify-between items-center">
              <Button onClick={() => setLocation('/library')} variant="outline" className="flex items-center gap-2">
                <i className="fas fa-book-open"></i>
                View Recipe Library
              </Button>
              <DialogClose asChild>
                <Button variant="default">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}