import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";

interface RecipeCardProps {
  recipe: any; // Use any for flexibility with different recipe formats
  preview?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, preview = false }) => {
  const [, navigate] = useLocation();
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  
  if (!recipe) return null;
  
  // Extract the first recipe from the recipes array if it exists
  const mainRecipe = recipe.recipes && recipe.recipes.length > 0 
    ? recipe.recipes[0] 
    : null;
  
  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const toggleStep = (index: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">
              {recipe.foodName || "Fusion Recipe"}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {recipe.description || "A custom fusion dish based on your suggestions."}
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
                <div className="space-y-2">
                  {mainRecipe.ingredients && mainRecipe.ingredients.map((ingredient: any, i: number) => {
                    const ingredientText = typeof ingredient === 'string' 
                      ? ingredient 
                      : `${ingredient.amount || ''} ${ingredient.unit || ''} ${ingredient.item || ingredient.name || ''} ${ingredient.preparation ? `(${ingredient.preparation})` : ''}`
                        .replace(/\s+/g, ' ')
                        .trim();
                        
                    return (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`ingredient-${i}`} 
                          checked={checkedIngredients[i] || false}
                          onCheckedChange={() => toggleIngredient(i)}
                        />
                        <label 
                          htmlFor={`ingredient-${i}`}
                          className={`text-sm ${checkedIngredients[i] ? 'line-through text-gray-400' : ''}`}
                        >
                          {ingredientText}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="instructions">
              <AccordionTrigger className="text-sm font-medium">
                Instructions
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {mainRecipe.instructions && mainRecipe.instructions.map((step: string, i: number) => (
                    <div key={i} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`step-${i}`} 
                        checked={checkedSteps[i] || false}
                        onCheckedChange={() => toggleStep(i)}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor={`step-${i}`}
                        className={`text-sm ${checkedSteps[i] ? 'line-through text-gray-400' : ''}`}
                      >
                        <span className="font-medium">{i+1}.</span> {step}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Nutrition section removed as requested */}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;