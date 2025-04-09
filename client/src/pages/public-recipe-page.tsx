import React, { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { expandedRecipes } from "@/data/expandedRecipeLibrary";
import { 
  AnalyzeImageResponse, 
  RecipeVariation, 
  EquipmentItem, 
  TechniqueDetail, 
  SideDish,
  YoutubeVideo
} from "@shared/schema";
import { slugify, cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, Users, ChefHat, Book, Award, Utensils, ArrowLeft,
  Star, ThumbsUp, Printer, Share2, Bookmark, Globe, Coffee,
  AlarmClock, Thermometer, Info, Lightbulb, Medal, Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

      <div className="flex flex-wrap items-center justify-between mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/library")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
        </Button>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print Recipe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Recipe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to Favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Header and Image - Left Column on Desktop */}
        <div className="lg:col-span-2">
          <header className="relative">
            <div className="absolute -top-1 -left-2 rotate-[-2deg]">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {recipe.tags && recipe.tags.length > 0 ? recipe.tags[0] : "Recipe"}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 pt-8 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
              {recipe.foodName}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm ml-2 text-muted-foreground">(4.8 rating)</span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <ThumbsUp className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm text-muted-foreground">97% would make again</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags?.map((tag: string, i: number) => (
                <Badge 
                  key={i} 
                  variant="secondary"
                  className={cn(
                    "font-medium",
                    i % 3 === 0 ? "bg-green-100 text-green-800 hover:bg-green-200" :
                    i % 3 === 1 ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                    "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="relative mb-6 bg-muted/50 p-4 rounded-md border border-muted">
              <span className="absolute -top-3 left-4 bg-background px-2 text-xs font-medium text-muted-foreground">CHEF'S NOTE</span>
              <p className="text-lg italic text-muted-foreground">
                {recipe.description}
              </p>
            </div>
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
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="ingredients">
                <Utensils className="mr-2 h-4 w-4" /> Ingredients
              </TabsTrigger>
              <TabsTrigger value="instructions">
                <Book className="mr-2 h-4 w-4" /> Instructions
              </TabsTrigger>
              {mainRecipe?.variations && mainRecipe.variations.length > 0 && (
                <TabsTrigger value="variations">
                  <span className="mr-2">🔄</span> Variations
                </TabsTrigger>
              )}
              {mainRecipe?.techniqueDetails && mainRecipe.techniqueDetails.length > 0 && (
                <TabsTrigger value="techniques">
                  <span className="mr-2">👨‍🍳</span> Techniques
                </TabsTrigger>
              )}
              {mainRecipe?.cookingScience && (
                <TabsTrigger value="science">
                  <span className="mr-2">🧪</span> Cooking Science
                </TabsTrigger>
              )}
              {mainRecipe?.culturalContext && (
                <TabsTrigger value="culture">
                  <span className="mr-2">🌍</span> Cultural Context
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-6">
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-primary" />
                    Ingredients
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      Adjust Servings
                    </Button>
                    <Button size="sm" variant="outline" className="text-sm">
                      <span className="mr-2">📋</span>
                      Copy List
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="h-72">
                      <ul className="space-y-3 pt-2">
                        {ingredients.map((ingredient: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center mr-2">
                              <input type="checkbox" id={`ingredient-${i}`} className="h-4 w-4 rounded border-muted-foreground text-primary" />
                            </div>
                            <label htmlFor={`ingredient-${i}`} className="text-base cursor-pointer hover:text-primary transition-colors">
                              {ingredient}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="bg-muted/30 py-2 px-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Info className="mr-2 h-3 w-3" />
                      Tip: Check off ingredients as you gather them
                    </div>
                  </CardFooter>
                </Card>
              </section>
            </TabsContent>
            
            <TabsContent value="instructions" className="space-y-4">
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Step-by-Step Instructions
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline">
                          <AlarmClock className="mr-2 h-4 w-4" />
                          Start Cooking Timer
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set timers for each step</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="h-96">
                      <ol className="space-y-6 relative [counter-reset:step]">
                        {instructions.map((step: string, i: number) => (
                          <li key={i} className="relative pl-10 [counter-increment:step]">
                            <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-medium before:absolute before:content-[counter(step)]"></div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id={`step-${i}`} 
                                  className="h-4 w-4 rounded border-muted-foreground text-primary mr-2" 
                                />
                                <label htmlFor={`step-${i}`} className="font-medium cursor-pointer hover:text-primary transition-colors">
                                  {step.split('.')[0]}
                                </label>
                              </div>
                              <p className="text-muted-foreground ml-6">
                                {step.includes('.') ? step.split('.').slice(1).join('.').trim() : ''}
                              </p>
                              {(i === 1 || i === 3 || i === 5) && (
                                <div className="ml-6 mt-2 bg-muted/30 p-3 rounded-md text-sm flex items-start">
                                  <Lightbulb className="h-4 w-4 text-amber-500 mr-2 mt-0.5 shrink-0" />
                                  <p><span className="font-medium">Pro Tip:</span> {
                                    i === 1 ? "For maximum flavor, don't rush this step. The caramelization creates depth of flavor." :
                                    i === 3 ? "Taste and adjust seasoning as you go. This is key to balanced flavor." :
                                    "Allow to rest before serving to let the flavors fully develop."
                                  }</p>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            {mainRecipe?.variations && mainRecipe.variations.length > 0 && (
              <TabsContent value="variations" className="space-y-6">
                <div className="space-y-6">
                  {mainRecipe.variations.map((variation: RecipeVariation, i: number) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">{variation.type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{variation.description}</p>
                        {variation.adjustments && variation.adjustments.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Adjustments:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {variation.adjustments.map((adjustment: string, idx: number) => (
                                <li key={idx}>{adjustment}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}

            {mainRecipe?.techniqueDetails && mainRecipe.techniqueDetails.length > 0 && (
              <TabsContent value="techniques" className="space-y-6">
                <div className="space-y-6">
                  {mainRecipe.techniqueDetails.map((technique: TechniqueDetail, i: number) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">{technique.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{technique.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}

            {mainRecipe?.cookingScience && (
              <TabsContent value="science" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cooking Science</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mainRecipe.cookingScience.principles && (
                        <div>
                          <h4 className="font-medium mb-2">Key Principles:</h4>
                          <p>{mainRecipe.cookingScience.principles}</p>
                        </div>
                      )}
                      {mainRecipe.cookingScience.reactions && (
                        <div>
                          <h4 className="font-medium mb-2">Chemical Reactions:</h4>
                          <p>{mainRecipe.cookingScience.reactions}</p>
                        </div>
                      )}
                      {mainRecipe.cookingScience.tips && (
                        <div>
                          <h4 className="font-medium mb-2">Science-Based Tips:</h4>
                          <p>{mainRecipe.cookingScience.tips}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {mainRecipe?.culturalContext && (
              <TabsContent value="culture" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mainRecipe.culturalContext.origin && (
                        <div>
                          <h4 className="font-medium mb-2">Origin:</h4>
                          <p>{mainRecipe.culturalContext.origin}</p>
                        </div>
                      )}
                      {mainRecipe.culturalContext.history && (
                        <div>
                          <h4 className="font-medium mb-2">Historical Background:</h4>
                          <p>{mainRecipe.culturalContext.history}</p>
                        </div>
                      )}
                      {mainRecipe.culturalContext.significance && (
                        <div>
                          <h4 className="font-medium mb-2">Cultural Significance:</h4>
                          <p>{mainRecipe.culturalContext.significance}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        {/* Sidebar - Right Column on Desktop */}
        <div className="space-y-8">
          {/* Chef's Expertise Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base">Chef's Expert Rating</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">Flavor Complexity</span>
                    <span className="text-muted-foreground">8.5/10</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">Beginner Friendly</span>
                    <span className="text-muted-foreground">7/10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">Presentation Value</span>
                    <span className="text-muted-foreground">9/10</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-center w-full">
                <Badge variant="outline" className="bg-white">
                  <Heart className="w-3 h-3 mr-1 text-rose-500 fill-rose-500" />
                  96% of home cooks love this recipe
                </Badge>
              </div>
            </CardFooter>
          </Card>

          {/* Side Dishes */}
          {mainRecipe?.sideDishes && mainRecipe.sideDishes.length > 0 && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Globe className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <CardTitle>Perfect Pairings</CardTitle>
                  <CardDescription>Complete your meal</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mainRecipe.sideDishes.map((side: SideDish, i: number) => (
                    <div key={i} className="p-3 bg-muted/40 rounded-lg border border-muted hover:border-muted-foreground/30 transition-colors">
                      <h4 className="font-medium flex items-center text-green-700">
                        {side.name}
                        <Badge variant="outline" className="ml-2 text-xs bg-white">
                          {side.preparationTime || "Quick"}
                        </Badge>
                      </h4>
                      <p className="text-sm mt-1">{side.description}</p>
                      {side.pairingReason && (
                        <div className="mt-2 text-xs flex items-center text-muted-foreground">
                          <Coffee className="h-3 w-3 mr-1" />
                          <span>Why it works: {side.pairingReason}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Equipment */}
          {mainRecipe?.recommendedEquipment && mainRecipe.recommendedEquipment.length > 0 && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <ChefHat className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <CardTitle>Essential Tools</CardTitle>
                  <CardDescription>For professional results</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {mainRecipe.recommendedEquipment.map((equipment: EquipmentItem, i: number) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{equipment.name}</span>
                        {equipment.difficultyToUse && (
                          <Badge variant="outline" className={cn(
                            "text-xs",
                            equipment.difficultyToUse.toLowerCase().includes("easy") ? "bg-green-50 text-green-700" : 
                            equipment.difficultyToUse.toLowerCase().includes("medium") ? "bg-amber-50 text-amber-700" : 
                            "bg-red-50 text-red-700"
                          )}>
                            {equipment.difficultyToUse}
                          </Badge>
                        )}
                      </div>
                      {equipment.description && (
                        <p className="text-sm text-muted-foreground mt-1">{equipment.description}</p>
                      )}
                      {equipment.alternatives && equipment.alternatives.length > 0 && (
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Alternatives: </span>
                          {equipment.alternatives.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Presentation Guidance */}
          {mainRecipe?.presentationGuidance && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                  <span className="text-lg">🎨</span>
                </div>
                <div>
                  <CardTitle>Presentation Mastery</CardTitle>
                  <CardDescription>Make it Instagram-worthy</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  {mainRecipe.presentationGuidance.plating && (
                    <div className="p-3 bg-gradient-to-r from-violet-50 to-indigo-50">
                      <h4 className="font-medium flex items-center text-violet-800 mb-2">
                        <span className="mr-2">🍽️</span> Plating Technique
                      </h4>
                      <p className="text-sm">{mainRecipe.presentationGuidance.plating}</p>
                    </div>
                  )}
                  {mainRecipe.presentationGuidance.garnish && (
                    <div className="p-3 bg-white border-t">
                      <h4 className="font-medium flex items-center text-emerald-800 mb-2">
                        <span className="mr-2">🌿</span> Garnish Suggestions
                      </h4>
                      <p className="text-sm">{mainRecipe.presentationGuidance.garnish}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Related Recipes */}
          {recipe.recipes && recipe.recipes.length > 1 && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <span className="text-lg">🍲</span>
                </div>
                <div>
                  <CardTitle>You Might Also Like</CardTitle>
                  <CardDescription>Similar recipes to try</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.recipes.slice(1).map((relatedRecipe: any, i: number) => (
                    <div 
                      key={i} 
                      className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/40 rounded-lg border border-amber-100 hover:border-amber-200 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-amber-900">{relatedRecipe.title}</h4>
                        <Badge variant="outline" className="bg-white text-xs">
                          {relatedRecipe.prepTime || "Quick"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{relatedRecipe.description}</p>
                      <div className="mt-2 text-xs flex justify-between">
                        <span className="text-amber-700">{relatedRecipe.difficulty || "Easy"}</span>
                        <span className="text-amber-700 font-medium">Try Recipe →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* YouTube Videos */}
          {recipe.youtubeVideos && recipe.youtubeVideos.length > 0 && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-lg">▶️</span>
                </div>
                <div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Watch expert techniques</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.youtubeVideos.slice(0, 3).map((video: YoutubeVideo, i: number) => (
                    <div key={i} className="group">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                      >
                        <div className="relative w-20 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-100">
                              <span className="text-red-600 text-xl">▶</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{video.title}</h4>
                          {video.channelTitle && (
                            <p className="text-xs text-muted-foreground mt-1">{video.channelTitle}</p>
                          )}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-xs w-full">
                    View All Video Tutorials
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recipe Footer */}
      <footer className="mt-16 border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-primary" />
              Nutritional Information
            </h3>
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">Calculated values are approximate and may vary based on specific ingredients used.</p>
              <p className="mb-1">Consult a professional dietitian for personalized advice.</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-primary" />
              Recipe Disclaimer
            </h3>
            <div className="text-sm text-muted-foreground">
              <p className="mb-1">This recipe provides general guidance and may need to be adjusted based on your specific equipment and ingredients.</p>
              <p className="mb-1">Always ensure food is cooked to safe temperatures.</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <span className="mr-2">💬</span>
              Share Your Results
            </h3>
            <div className="text-sm text-muted-foreground">
              <p className="mb-3">Made this recipe? We'd love to see your creation!</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8">
                  <span className="mr-1">📸</span> Share Photo
                </Button>
                <Button size="sm" variant="outline" className="h-8">
                  <Star className="mr-1 h-4 w-4" /> Rate Recipe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Recipe Snap | Professional recipes powered by AI
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <span className="text-muted-foreground text-sm">Privacy Policy</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <span className="text-muted-foreground text-sm">Terms of Use</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <span className="text-muted-foreground text-sm">Contact</span>
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}