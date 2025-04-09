import React, { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import { AnalyzeImageResponse } from "@shared/schema";
import { slugify, cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, ChefHat, Book, Award, Utensils, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function PublicRecipePage() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/recipe/:slug");
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    if (params?.slug) {
      // Find the recipe with matching slug
      const foundRecipe = expandedRecipes.find(
        (r) => slugify(r.foodName) === params.slug
      );
      
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
    }
  }, [params?.slug]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
        <Button onClick={() => navigate("/library")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
        </Button>
      </div>
    );
  }

  // Generate image URL for the recipe
  const placeholderImages: Record<string, string> = {
    "Pasta Carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Neapolitan Pizza Margherita": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Butter Chicken (Murgh Makhani)": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Green Thai Curry": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Beef Bourguignon": "https://images.unsplash.com/photo-1600626333540-9d589136ed91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Paella Valenciana": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Japanese Ramen": "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    "Eggs Benedict": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
  };
  
  const imageUrl = recipe.imageUrl || placeholderImages[recipe.foodName] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  
  // Find the main recipe from the recipe array
  const mainRecipe = recipe.recipes && recipe.recipes.length > 0 ? recipe.recipes[0] : null;
  
  // Extract ingredients and instructions from the main recipe
  const ingredients = mainRecipe?.ingredients || [];
  const instructions = mainRecipe?.instructions || [];
  const prepTime = mainRecipe?.prepTime || "20 mins";
  const cookTime = mainRecipe?.cookTime || "30 mins";
  const servings = mainRecipe?.servings || "4";
  const difficulty = mainRecipe?.difficulty || "Medium";
  
  // Define schema for structured data with proper URLs
  const websiteUrl = "https://image2recipe.com";
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.foodName,
    "image": imageUrl,
    "description": recipe.description || `Delicious ${recipe.foodName} recipe with detailed instructions and ingredients.`,
    "keywords": recipe.tags?.join(", ") || "recipe, food, cooking",
    "author": {
      "@type": "Organization",
      "name": "Recipe Snap",
      "url": websiteUrl
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "prepTime": `PT${prepTime.replace(/\D/g, '') || "20"}M`,
    "cookTime": `PT${cookTime.replace(/\D/g, '') || "30"}M`,
    "totalTime": `PT${(parseInt(prepTime.replace(/\D/g, '') || "20") + parseInt(cookTime.replace(/\D/g, '') || "30")).toString()}M`,
    "recipeYield": servings,
    "recipeCategory": recipe.tags && recipe.tags.length > 0 ? recipe.tags[0] : "Main Dish",
    "recipeCuisine": recipe.tags && recipe.tags.length > 1 ? recipe.tags[1] : "International",
    "recipeIngredient": ingredients.length > 0 ? ingredients : ["Ingredients not specified"],
    "recipeInstructions": instructions.length > 0 ? instructions.map((step: string, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    })) : [{
      "@type": "HowToStep",
      "position": 1,
      "text": "Instructions not available"
    }],
    "suitableForDiet": recipe.tags?.includes("Vegetarian") ? "VegetarianDiet" : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${websiteUrl}/recipe/${slugify(recipe.foodName)}`
    },
    "url": `${websiteUrl}/recipe/${slugify(recipe.foodName)}`
  };

  return (
    <article className="container mx-auto px-4 py-8 pb-16">
      <SEO 
        title={`${recipe.foodName} Recipe | Recipe Snap`}
        description={recipe.description || `Learn how to make delicious ${recipe.foodName} with our detailed recipe including ingredients, instructions, and cooking tips.`}
        image={imageUrl}
        canonical={`https://image2recipe.com/recipe/${slugify(recipe.foodName)}`}
        schema={recipeSchema}
      />

      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate("/library")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Header and Image - Left Column on Desktop */}
        <div className="lg:col-span-2">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
              {recipe.foodName}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags?.map((tag: string, i: number) => (
                <span 
                  key={i} 
                  className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    i % 3 === 0 ? "bg-green-100 text-green-800" :
                    i % 3 === 1 ? "bg-blue-100 text-blue-800" :
                    "bg-amber-100 text-amber-800"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              {recipe.description}
            </p>
          </header>
          
          {/* Hero Image */}
          <div className="rounded-lg overflow-hidden mb-8 shadow-md">
            <img 
              src={imageUrl} 
              alt={recipe.foodName} 
              className="w-full h-auto" 
              loading="eager"
              width="800"
              height="500"
            />
          </div>
          
          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Prep Time</p>
                  <p className="font-medium">{prepTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex items-center">
                <ChefHat className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Cook Time</p>
                  <p className="font-medium">{cookTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Servings</p>
                  <p className="font-medium">{servings}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="font-medium">{difficulty}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="ingredients" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="ingredients">
                <Utensils className="mr-2 h-4 w-4" /> Ingredients
              </TabsTrigger>
              <TabsTrigger value="instructions">
                <Book className="mr-2 h-4 w-4" /> Instructions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-6">
              <section>
                <ul className="space-y-2">
                  {ingredients.map((ingredient: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>
            
            <TabsContent value="instructions" className="space-y-4">
              <section>
                <ol className="space-y-6 list-decimal list-inside">
                  {instructions.map((step: string, i: number) => (
                    <li key={i} className="ml-6 pl-2">
                      <p className="inline">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar - Right Column on Desktop */}
        <div className="space-y-8">
          {/* Related Recipes */}
          {recipe.recipes && recipe.recipes.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Recipes</CardTitle>
                <CardDescription>Other recipes for {recipe.foodName}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recipe.recipes.slice(1).map((relatedRecipe: any, i: number) => (
                    <li key={i}>
                      <h4 className="font-medium">{relatedRecipe.title}</h4>
                      <p className="text-sm text-muted-foreground">{relatedRecipe.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {/* YouTube Videos */}
          {recipe.youtubeVideos && recipe.youtubeVideos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Watch how to make this recipe</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recipe.youtubeVideos.slice(0, 3).map((video: any, i: number) => (
                    <li key={i}>
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </article>
  );
}