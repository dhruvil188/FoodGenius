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
            {/* Hero Section */}
            <section className="pt-8 pb-16 overflow-hidden relative">
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
                            src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                            alt="Chocolate lava cake being analyzed"
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
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleFeaturedDishClick(food)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-md h-64">
                        <img 
                          src={food.image} 
                          alt={food.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-xl mb-2 flex items-center">
                            {food.name}
                            <i className="fas fa-search-plus ml-2 text-sm opacity-70"></i>
                          </h3>
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
                
                {/* Recipe Dialog */}
                <Dialog open={featuredRecipeOpen} onOpenChange={setFeaturedRecipeOpen}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                    <DialogTitle className="sr-only">Recipe Details</DialogTitle>
                    <DialogDescription className="sr-only">Detailed recipe information with ingredients, instructions, and nutritional facts.</DialogDescription>
                    {selectedFeaturedRecipe && (
                      <div>
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                          <img 
                            src={selectedFeaturedRecipe.image} 
                            alt={selectedFeaturedRecipe.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h2 className="text-white text-2xl sm:text-3xl font-bold">{selectedFeaturedRecipe.recipe.foodName}</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedFeaturedRecipe.recipe.tags.slice(0, 5).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="bg-black/30 text-white border-none backdrop-blur-sm">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <p className="text-slate-700 mb-6">{selectedFeaturedRecipe.recipe.description}</p>
                          
                          <Tabs defaultValue="recipe" className="mt-4">
                            <TabsList className="w-full grid grid-cols-3 mb-6">
                              <TabsTrigger value="recipe">Recipe</TabsTrigger>
                              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="recipe" className="space-y-4">
                              <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-slate-50 p-4 rounded-lg text-center">
                                  <p className="text-xs text-slate-500">Prep Time</p>
                                  <p className="font-semibold text-primary">{selectedFeaturedRecipe.recipe.recipes[0].prepTime}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg text-center">
                                  <p className="text-xs text-slate-500">Cook Time</p>
                                  <p className="font-semibold text-primary">{selectedFeaturedRecipe.recipe.recipes[0].cookTime}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg text-center">
                                  <p className="text-xs text-slate-500">Servings</p>
                                  <p className="font-semibold text-primary">{selectedFeaturedRecipe.recipe.recipes[0].servings}</p>
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                              <ol className="space-y-3 list-decimal pl-5">
                                {selectedFeaturedRecipe.recipe.recipes[0].instructions.map((step, idx) => (
                                  <li key={idx} className="text-slate-700">
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </TabsContent>
                            
                            <TabsContent value="ingredients" className="space-y-4">
                              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                              <ul className="space-y-2">
                                {selectedFeaturedRecipe.recipe.recipes[0].ingredients.map((ingredient, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 size-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                      <i className="fas fa-check text-xs text-primary"></i>
                                    </div>
                                    <span className="text-slate-700">{ingredient}</span>
                                  </li>
                                ))}
                              </ul>
                            </TabsContent>
                            
                            <TabsContent value="nutrition" className="space-y-4">
                              <h3 className="text-lg font-semibold mb-4">Nutritional Information</h3>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                  <div className="text-2xl font-bold text-primary">
                                    {selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.calories}
                                  </div>
                                  <div className="text-sm text-slate-500">Calories</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                  <div className="text-2xl font-bold text-emerald-600">
                                    {selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.protein}
                                  </div>
                                  <div className="text-sm text-slate-500">Protein</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                  <div className="text-2xl font-bold text-amber-600">
                                    {selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.carbs}
                                  </div>
                                  <div className="text-sm text-slate-500">Carbs</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600">
                                    {selectedFeaturedRecipe.recipe.recipes[0].nutritionInfo.fats}
                                  </div>
                                  <div className="text-sm text-slate-500">Fats</div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                        
                        <DialogFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-4 items-center">
                          <Button 
                            className="w-full sm:w-auto bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 gap-2 text-white"
                            onClick={scrollToUpload}
                          >
                            <i className="fas fa-camera"></i>
                            Try with your own dish
                          </Button>
                          <DialogClose asChild>
                            <Button 
                              variant="outline" 
                              className="w-full sm:w-auto"
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
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
                
                <div className="relative">
                  {/* Connector Lines */}
                  <div className="hidden lg:block absolute top-1/3 left-[20%] right-[20%] h-1 bg-gradient-to-r from-primary/30 to-emerald-300/30 transform -translate-y-1/2 z-0">
                    <div className="absolute left-1/3 top-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-2/3 top-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksSteps.map((step, index) => (
                      <motion.div 
                        key={index}
                        className="text-center relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative">
                          <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100 border-2 border-white">
                            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md shadow-emerald-200/50">
                              {index + 1}
                            </div>
                            
                            {/* Inner circle with icon */}
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{ 
                                  duration: 2.5, 
                                  repeat: Infinity, 
                                  repeatType: "loop" 
                                }}
                                className="relative"
                              >
                                {step.icon === "fa-camera" && (
                                  <div className="relative">
                                    <i className={`fas ${step.icon} text-3xl text-primary`}></i>
                                    <motion.div 
                                      className="absolute -top-2 -right-2 text-yellow-400 text-sm"
                                      animate={{ opacity: [0, 1, 0] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                      <i className="fas fa-circle"></i>
                                    </motion.div>
                                  </div>
                                )}
                                {step.icon === "fa-magic" && (
                                  <div className="relative">
                                    <i className={`fas ${step.icon} text-3xl text-primary`}></i>
                                    <motion.div 
                                      className="absolute -top-3 -right-1 text-purple-400 text-sm"
                                      animate={{ 
                                        scale: [0.8, 1.2, 0.8],
                                        opacity: [0.5, 1, 0.5]
                                      }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <i className="fas fa-star"></i>
                                    </motion.div>
                                  </div>
                                )}
                                {step.icon === "fa-utensils" && (
                                  <div className="relative flex items-center">
                                    <i className={`fas ${step.icon} text-3xl text-primary`}></i>
                                    <motion.div 
                                      className="absolute -top-3 left-5 text-red-400 text-xs"
                                      animate={{ y: [0, -8, 0] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <i className="fas fa-heart"></i>
                                    </motion.div>
                                  </div>
                                )}
                                {step.icon === "fa-check-circle" && (
                                  <div className="relative">
                                    <i className={`fas ${step.icon} text-3xl text-primary`}></i>
                                    <motion.div 
                                      className="absolute -bottom-1 -right-1 bg-green-500 rounded-full h-4 w-4 flex items-center justify-center"
                                      animate={{ scale: [1, 1.3, 1] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      <i className="fas fa-check text-[8px] text-white"></i>
                                    </motion.div>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Connection arrow */}
                          {index < howItWorksSteps.length - 1 && (
                            <div className="hidden lg:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-emerald-400/20 transform -translate-x-10">
                              <div className="absolute right-0 -top-1.5 bg-white rounded-full p-1 shadow-sm">
                                <i className="fas fa-chevron-right text-primary text-xs"></i>
                              </div>
                            </div>
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-emerald-400/10 rounded-xl flex items-center justify-center mb-5 shadow-md shadow-emerald-100/50 relative">
                        <div className="absolute inset-0 bg-white opacity-40 rounded-xl"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-sm border border-green-100 flex items-center justify-center">
                          <i className="fas fa-check text-xs text-primary"></i>
                        </div>
                        <motion.div
                          animate={{ 
                            rotateY: [0, 15, 0, -15, 0],
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                        >
                          <i className={`fas ${feature.icon} text-2xl text-primary`}></i>
                        </motion.div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent flex items-center justify-center gap-2">
                        {feature.title}
                        {feature.icon === "fa-camera-retro" && <span className="text-yellow-400 text-xs"><i className="fas fa-bolt"></i></span>}
                        {feature.icon === "fa-chart-pie" && <span className="text-blue-400 text-xs"><i className="fas fa-tachometer-alt"></i></span>}
                        {feature.icon === "fa-lightbulb" && <span className="text-amber-400 text-xs"><i className="fas fa-star"></i></span>}
                      </h3>
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
            {/* Spacer to replace footer */}
            <div className="pb-12"></div>
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
