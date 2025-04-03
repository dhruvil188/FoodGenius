import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import { cn, slugify } from "@/lib/utils";
import SEO from "@/components/SEO";

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useLocation();

  // Extract all unique categories from recipes
  const allCategories = Array.from(
    new Set(
      expandedRecipes.flatMap(recipe => 
        recipe.tags.filter(tag => tag.length > 0)
      )
    )
  ).sort();

  // Filter recipes based on search term and categories
  const filteredRecipes = expandedRecipes.filter(recipe => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      recipe.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by categories
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => recipe.tags.includes(category));

    return matchesSearch && matchesCategories;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-12">
      <SEO 
        title="Recipe Library | Recipe Snap"
        description="Browse our collection of AI-analyzed recipes with detailed instructions, nutrition information, and cooking tips."
        canonical="/library"
      />
      
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
            RECIPE COLLECTION
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Recipe Library</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Browse our collection of curated recipes with detailed instructions, cooking tips, and more. No login required!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search recipes, ingredients, or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-primary/20 focus:border-primary focus:ring-primary"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <i className="fas fa-search"></i>
              </div>
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="fas fa-times"></i>
                </Button>
              )}
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Filter by Category:</h2>
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full",
                    selectedCategories.includes(category) 
                      ? "bg-primary hover:bg-primary/90" 
                      : "border-primary/30 text-slate-700 hover:bg-primary/5"
                  )}
                  onClick={() => toggleCategory(category)}
                >
                  {selectedCategories.includes(category) && (
                    <i className="fas fa-check mr-1 text-xs"></i>
                  )}
                  {category}
                </Button>
              ))}
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-slate-500 hover:text-primary"
                  onClick={() => setSelectedCategories([])}
                >
                  <i className="fas fa-times-circle mr-1"></i>
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <motion.div
                key={`${recipe.foodName}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index % 6 * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-100">
                    {recipe.youtubeVideos && recipe.youtubeVideos.length > 0 && recipe.youtubeVideos[0].videoId ? (
                      <img 
                        src={`https://i.ytimg.com/vi/${recipe.youtubeVideos[0].videoId}/mqdefault.jpg`} 
                        alt={recipe.foodName} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-100 to-emerald-200">
                        <i className="fas fa-utensils text-4xl text-emerald-500"></i>
                      </div>
                    )}
                    {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].difficulty && (
                      <div className="absolute top-3 right-3 bg-white/90 text-sm font-medium px-2.5 py-1 rounded-full shadow-sm">
                        {recipe.recipes[0].difficulty === 'easy' ? (
                          <span className="text-green-600">
                            <i className="fas fa-leaf mr-1"></i> Easy
                          </span>
                        ) : recipe.recipes[0].difficulty === 'medium' ? (
                          <span className="text-amber-600">
                            <i className="fas fa-fire-alt mr-1"></i> Medium
                          </span>
                        ) : (
                          <span className="text-red-600">
                            <i className="fas fa-pepper-hot mr-1"></i> Hard
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-xl mb-2 line-clamp-1">{recipe.foodName}</h3>
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
                      {recipe.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                          +{recipe.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].prepTime && (
                        <div className="flex items-center">
                          <i className="fas fa-clock mr-1.5 text-primary"></i>
                          {recipe.recipes[0].prepTime}
                        </div>
                      )}
                      {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].cookTime && (
                        <div className="flex items-center">
                          <i className="fas fa-fire mr-1.5 text-orange-500"></i>
                          {recipe.recipes[0].cookTime}
                        </div>
                      )}
                      {recipe.recipes && recipe.recipes[0] && recipe.recipes[0].servings && (
                        <div className="flex items-center">
                          <i className="fas fa-utensils mr-1.5 text-slate-500"></i>
                          {recipe.recipes[0].servings} servings
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={() => setLocation(`/recipe/${slugify(recipe.foodName)}`)} 
                      className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                    >
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="text-6xl text-slate-300 mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-slate-500 mb-4">
                We couldn't find any recipes matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}