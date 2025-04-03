import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

interface RecipeCardProps {
  recipe: any; // Use any for flexibility with different recipe formats
  preview?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, preview = false }) => {
  const [, navigate] = useLocation();
  
  if (!recipe) return null;
  
  // Extract the first recipe from the recipes array if it exists
  const mainRecipe = recipe.recipes && recipe.recipes.length > 0 
    ? recipe.recipes[0] 
    : null;
  
  const handleViewRecipe = () => {
    // In a real implementation, you'd save the recipe to the database first
    // and navigate to the recipe page with the ID, but for now just an example
    navigate(`/chat`);
  };

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">
              {recipe.foodName}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {recipe.description}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.tags && recipe.tags.map((tag: string, i: number) => (
            <Badge key={i} variant="outline" className="bg-white/50 dark:bg-gray-800/50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {mainRecipe && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-sm font-medium">
                Recipe Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Prep Time:</span>
                    <span>{mainRecipe.prepTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cook Time:</span>
                    <span>{mainRecipe.cookTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Difficulty:</span>
                    <span>{mainRecipe.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Servings:</span>
                    <span>{mainRecipe.servings}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-sm font-medium">
                Ingredients
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {mainRecipe.ingredients && mainRecipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="instructions">
              <AccordionTrigger className="text-sm font-medium">
                Instructions
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  {mainRecipe.instructions && mainRecipe.instructions.map((step: string, i: number) => (
                    <li key={i} className="pl-1">
                      <span className="ml-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            {mainRecipe.nutritionInfo && (
              <AccordionItem value="nutrition">
                <AccordionTrigger className="text-sm font-medium">
                  Nutrition Information
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Calories:</span>
                      <span>{mainRecipe.nutritionInfo.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Protein:</span>
                      <span>{mainRecipe.nutritionInfo.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Carbs:</span>
                      <span>{mainRecipe.nutritionInfo.carbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fats:</span>
                      <span>{mainRecipe.nutritionInfo.fats}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </CardContent>
      {!preview && (
        <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800/20 py-3">
          <Button variant="outline" size="sm" className="text-xs" onClick={handleViewRecipe}>
            View Full Recipe <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RecipeCard;