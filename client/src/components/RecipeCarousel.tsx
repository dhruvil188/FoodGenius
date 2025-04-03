import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { type SavedRecipe, type AnalyzeImageResponse } from "@shared/schema";

// Sample recipes to show if not authenticated or no recipes available
const sampleRecipes = [
  {
    id: "sample-1",
    foodName: "Classic Margherita Pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    description: "A traditional Italian pizza topped with tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 4,
    tags: ["Italian", "Pizza", "Vegetarian"]
  },
  {
    id: "sample-2",
    foodName: "Creamy Mushroom Risotto",
    imageUrl: "https://images.unsplash.com/photo-1633436375105-4f2da3b90836",
    description: "Arborio rice slowly cooked with mushrooms, white wine, and Parmesan cheese for a rich and creamy texture.",
    prepTime: "10 mins",
    cookTime: "30 mins",
    servings: 4,
    tags: ["Italian", "Rice", "Vegetarian"]
  },
  {
    id: "sample-3",
    foodName: "Avocado Chicken Salad",
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
    description: "Fresh salad with grilled chicken, avocado, cherry tomatoes, and a zesty lime dressing.",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    tags: ["Healthy", "Salad", "Quick"]
  }
];

type CarouselProps = {
  isAuthenticated?: boolean;
};

export default function RecipeCarousel({ isAuthenticated = false }: CarouselProps) {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return; // Don't fetch from API if not authenticated
      }
      
      try {
        setLoading(true);
        const response = await apiRequest<SavedRecipe[]>('GET', '/api/recipes');
        if (Array.isArray(response) && response.length > 0) {
          setRecipes(response);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Don't show error toast since this is a background feature
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRecipes();
  }, [isAuthenticated]);

  const nextRecipe = () => {
    if (isAuthenticated && recipes.length <= 1) return;
    if (!isAuthenticated && sampleRecipes.length <= 1) return;
    
    const itemCount = isAuthenticated ? recipes.length : sampleRecipes.length;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const prevRecipe = () => {
    if (isAuthenticated && recipes.length <= 1) return;
    if (!isAuthenticated && sampleRecipes.length <= 1) return;
    
    const itemCount = isAuthenticated ? recipes.length : sampleRecipes.length;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  const viewRecipeDetails = (id: number | string) => {
    if (typeof id === 'number') {
      navigate(`/recipe/${id}`);
    } else {
      // For sample recipes, redirect to auth page
      navigate('/auth');
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-40 w-full max-w-sm bg-slate-200 rounded-lg mb-3"></div>
          <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-48 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Use sample recipes if not authenticated or no saved recipes
  const displayRecipes = isAuthenticated && recipes.length > 0 ? recipes : [];
  const showSamples = !isAuthenticated || recipes.length === 0;
  const itemCount = showSamples ? sampleRecipes.length : displayRecipes.length;

  if (itemCount === 0) {
    return null; // Don't show anything if no recipes and no samples
  }

  return (
    <div className="w-full py-2">
      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        {itemCount > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-slate-200 bg-white/80 shadow-md hover:bg-white hover:shadow-lg -ml-3 sm:-ml-5"
              onClick={prevRecipe}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-slate-200 bg-white/80 shadow-md hover:bg-white hover:shadow-lg -mr-3 sm:-mr-5"
              onClick={nextRecipe}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Recipe Cards */}
        <div className="overflow-hidden px-4 sm:px-10">
          <div className="flex items-center">
            {showSamples ? (
              // Display sample recipes for non-authenticated users
              sampleRecipes.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  className="w-full flex-shrink-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    x: currentIndex === index ? 0 : 100,
                    scale: currentIndex === index ? 1 : 0.8,
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    scale: { duration: 0.4 },
                  }}
                  style={{
                    position: currentIndex === index ? "relative" : "absolute",
                    zIndex: currentIndex === index ? 1 : 0,
                    pointerEvents: currentIndex === index ? "auto" : "none",
                  }}
                >
                  <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-5">
                      {/* Image (takes 2/5 of space on desktop) */}
                      <div className="md:col-span-2 h-48 md:h-full overflow-hidden bg-slate-100">
                        <img
                          src={sample.imageUrl}
                          alt={sample.foodName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content (takes 3/5 of space on desktop) */}
                      <div className="md:col-span-3">
                        <CardContent className="p-4 md:p-5">
                          <div className="mb-2">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                              {sample.foodName}
                            </h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {sample.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Recipe Highlights */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {sample.description}
                          </p>
                          
                          {/* Recipe Details */}
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{sample.prepTime} prep</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{sample.servings} servings</span>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm"
                            className="w-full"
                            onClick={() => viewRecipeDetails(sample.id)}
                          >
                            View Recipe
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              // Display saved recipes for authenticated users
              displayRecipes.map((recipe, index) => {
                // Parse recipeData as AnalyzeImageResponse
                const parsedData = recipe.recipeData as AnalyzeImageResponse;
                return (
                  <motion.div
                    key={recipe.id}
                    className="w-full flex-shrink-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: currentIndex === index ? 1 : 0,
                      x: currentIndex === index ? 0 : 100,
                      scale: currentIndex === index ? 1 : 0.8,
                    }}
                    transition={{
                      opacity: { duration: 0.5 },
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      scale: { duration: 0.4 },
                    }}
                    style={{
                      position: currentIndex === index ? "relative" : "absolute",
                      zIndex: currentIndex === index ? 1 : 0,
                      pointerEvents: currentIndex === index ? "auto" : "none",
                    }}
                  >
                    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <div className="grid grid-cols-1 md:grid-cols-5">
                        {/* Image (takes 2/5 of space on desktop) */}
                        <div className="md:col-span-2 h-48 md:h-full overflow-hidden bg-slate-100">
                          {parsedData.imageUrl && (
                            <img
                              src={parsedData.imageUrl}
                              alt={parsedData.foodName}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        {/* Content (takes 3/5 of space on desktop) */}
                        <div className="md:col-span-3">
                          <CardContent className="p-4 md:p-5">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                {parsedData.foodName}
                              </h3>
                              {recipe.favorite && (
                                <span className="text-rose-500">
                                  <i className="fas fa-heart"></i>
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-1 mb-2">
                              {parsedData.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Recipe Highlights */}
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {parsedData.description}
                            </p>
                            
                            {/* Recipe Details */}
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{parsedData.recipes[0]?.prepTime || "20 mins"} prep</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>
                                  {parsedData.recipes[0]?.servings ? `${parsedData.recipes[0].servings}` : "4"} servings
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm"
                              className="w-full"
                              onClick={() => viewRecipeDetails(recipe.id)}
                            >
                              View Recipe
                            </Button>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Pagination Dots */}
        {itemCount > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: itemCount }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-5 bg-primary" : "w-2 bg-slate-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}