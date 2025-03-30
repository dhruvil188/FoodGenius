import React, { useState } from "react";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import RecipeResults from "@/components/RecipeResults";
import { AnalyzeImageResponse } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Library() {
  const [selectedRecipe, setSelectedRecipe] = useState<AnalyzeImageResponse | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  // Placeholder image URLs for each recipe
  const placeholderImages: Record<string, string> = {
    "Pasta Carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Neapolitan Pizza Margherita": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Butter Chicken (Murgh Makhani)": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Guacamole": "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Sushi": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "French Onion Soup": "https://cdn.pixabay.com/photo/2018/03/22/16/09/food-3251104_960_720.jpg",
    "Chinese Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Pad Thai": "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Greek Tzatziki": "https://cdn.pixabay.com/photo/2018/07/12/21/33/food-3534452_960_720.jpg",
    "Korean Bibimbap": "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Brazilian Feijoada": "https://cdn.pixabay.com/photo/2021/02/15/11/55/feijoada-6017804_960_720.jpg",
    "Falafel": "https://cdn.pixabay.com/photo/2021/01/10/04/37/falafel-5904068_960_720.jpg",
    "Paella": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
  };

  // Generic food category images to use as fallbacks
  const fallbackImages = {
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    meat: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    vegetarian: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
  };

  // Get an appropriate image for a recipe based on name or tags
  const getRecipeImage = (recipe: AnalyzeImageResponse): string => {
    // First try exact match by name
    if (placeholderImages[recipe.foodName]) {
      return placeholderImages[recipe.foodName];
    }
    
    // Then look for category matches in tags
    const lowerTags = recipe.tags.map(tag => tag.toLowerCase());
    if (lowerTags.some(tag => tag.includes('soup'))) {
      return fallbackImages.soup;
    } else if (lowerTags.some(tag => tag.includes('dessert') || tag.includes('sweet'))) {
      return fallbackImages.dessert;
    } else if (lowerTags.some(tag => tag.includes('vegetarian') || tag.includes('vegan'))) {
      return fallbackImages.vegetarian;
    } else if (lowerTags.some(tag => tag.includes('meat') || tag.includes('chicken') || tag.includes('beef'))) {
      return fallbackImages.meat;
    }
    
    // Default fallback
    return fallbackImages.default;
  };

  const handleRecipeSelect = (recipe: AnalyzeImageResponse) => {
    setSelectedRecipe(recipe);
    setSelectedImageUrl(getRecipeImage(recipe));
  };

  const handleBackToLibrary = () => {
    setSelectedRecipe(null);
    setSelectedImageUrl("");
  };

  // Categorize recipes by cuisine type
  const recipesByCategory: Record<string, AnalyzeImageResponse[]> = {};
  
  expandedRecipes.forEach(recipe => {
    const mainTag = recipe.tags[0] || "Other";
    if (!recipesByCategory[mainTag]) {
      recipesByCategory[mainTag] = [];
    }
    recipesByCategory[mainTag].push(recipe);
  });

  // If a recipe is selected, show the RecipeResults component
  if (selectedRecipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={handleBackToLibrary}
          className="mb-6"
          variant="outline"
        >
          ← Back to Recipe Library
        </Button>
        <RecipeResults 
          result={selectedRecipe} 
          imageUrl={selectedImageUrl} 
          onTryAnother={handleBackToLibrary}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
          Recipe Library
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of detailed recipes with step-by-step instructions, nutrition information, and more. No need to upload photos!
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap justify-center mb-8">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          {Object.keys(recipesByCategory).map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expandedRecipes.map((recipe, index) => (
              <RecipeCard 
                key={index} 
                recipe={recipe} 
                imageUrl={getRecipeImage(recipe)} 
                onSelect={handleRecipeSelect}
                index={index}
              />
            ))}
          </div>
        </TabsContent>

        {Object.entries(recipesByCategory).map(([category, recipes]) => (
          <TabsContent key={category} value={category} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  imageUrl={getRecipeImage(recipe)} 
                  onSelect={handleRecipeSelect}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface RecipeCardProps {
  recipe: AnalyzeImageResponse;
  imageUrl: string;
  onSelect: (recipe: AnalyzeImageResponse) => void;
  index: number;
}

function RecipeCard({ recipe, imageUrl, onSelect, index }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 bg-gray-100">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={recipe.foodName} 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2">{recipe.foodName}</h3>
          <p className="text-muted-foreground text-sm mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  i === 0 ? "bg-green-100 text-green-800" :
                  i === 1 ? "bg-blue-100 text-blue-800" :
                  "bg-amber-100 text-amber-800"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
          <Button 
            onClick={() => onSelect(recipe)} 
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
          >
            View Recipe
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}