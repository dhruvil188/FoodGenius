import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { type SavedRecipe, type AnalyzeImageResponse } from "@shared/schema";

export default function RecipeCarousel() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
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
  }, []);

  const nextRecipe = () => {
    if (recipes.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const prevRecipe = () => {
    if (recipes.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const viewRecipeDetails = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-48 w-full max-w-md bg-slate-200 rounded-lg mb-4"></div>
          <div className="h-6 w-40 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return null; // Don't show anything if no recipes
  }

  return (
    <div className="w-full py-4">
      <div className="relative max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        {recipes.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border border-slate-200 bg-white/80 shadow-md hover:bg-white hover:shadow-lg -ml-4 sm:-ml-6"
              onClick={prevRecipe}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border border-slate-200 bg-white/80 shadow-md hover:bg-white hover:shadow-lg -mr-4 sm:-mr-6"
              onClick={nextRecipe}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Recipe Cards */}
        <div className="overflow-hidden px-4 sm:px-10">
          <div className="flex items-center">
            {recipes.map((recipe, index) => {
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
                  <Card className="w-full overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="aspect-video w-full overflow-hidden bg-slate-100">
                      {parsedData.imageUrl && (
                        <img
                          src={parsedData.imageUrl}
                          alt={parsedData.foodName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                          {parsedData.foodName}
                        </h3>
                        {recipe.favorite && (
                          <span className="text-rose-500">
                            <i className="fas fa-heart"></i>
                          </span>
                        )}
                      </div>
                      
                      {/* Recipe Highlights */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {parsedData.description}
                      </p>
                      
                      {/* Recipe Details */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-500">Prep Time</p>
                          <p className="font-medium text-sm">
                            {parsedData.recipes[0]?.prepTime || "20 mins"}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-500">Cook Time</p>
                          <p className="font-medium text-sm">
                            {parsedData.recipes[0]?.cookTime || "30 mins"}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded-lg">
                          <p className="text-xs text-gray-500">Servings</p>
                          <p className="font-medium text-sm">
                            {parsedData.recipes[0]?.servings ? `${parsedData.recipes[0].servings}` : "4"}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => viewRecipeDetails(recipe.id)}
                      >
                        View Recipe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Pagination Dots */}
        {recipes.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {recipes.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? "w-6 bg-primary" : "w-2.5 bg-slate-300"
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