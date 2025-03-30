import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type AnalyzeImageResponse } from '@shared/schema';

interface RecipeResultsProps {
  result: AnalyzeImageResponse;
  imageUrl: string;
  onTryAnother: () => void;
}

export default function RecipeResults({ result, imageUrl, onTryAnother }: RecipeResultsProps) {
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  
  const toggleRecipeExpand = (index: number) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };
  
  const displayedRecipes = showAllRecipes ? result.recipes : result.recipes.slice(0, 3);
  
  return (
    <motion.section 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-2xl shadow-lg mb-8">
        <CardContent className="p-6">
          <motion.div 
            className="flex flex-col md:flex-row items-start gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-1/3">
              <img 
                src={imageUrl} 
                alt={result.foodName} 
                className="w-full h-48 md:h-64 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <Badge variant="success" className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
                Identified Dish
              </Badge>
              
              <h3 className="text-2xl font-bold font-heading mb-2">{result.foodName}</h3>
              <p className="text-slate-600 mb-4">{result.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {result.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {result.recipes[0] && (
                <div className="flex flex-wrap items-center space-x-4 text-sm text-slate-500">
                  {result.recipes[0].prepTime && (
                    <div>
                      <i className="fas fa-clock mr-1"></i> {result.recipes[0].prepTime}
                    </div>
                  )}
                  {result.recipes[0].difficulty && (
                    <div>
                      <i className="fas fa-fire mr-1"></i> {result.recipes[0].difficulty}
                    </div>
                  )}
                  {result.recipes[0].servings && (
                    <div>
                      <i className="fas fa-user-friends mr-1"></i> Serves {result.recipes[0].servings}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
          
          <h4 className="text-xl font-semibold font-heading mb-4">Try These Recipes</h4>
          
          {displayedRecipes.map((recipe, index) => (
            <motion.div 
              key={index}
              className="recipe-card bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 bg-slate-100 flex items-center justify-center">
                  <i className="fas fa-utensils text-4xl text-slate-300"></i>
                </div>
                <div className="w-full md:w-3/4 p-4">
                  <h5 className="text-lg font-semibold mb-2">{recipe.title}</h5>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    {recipe.prepTime && (
                      <div><i className="fas fa-clock mr-1"></i> {recipe.prepTime}</div>
                    )}
                    {recipe.servings && (
                      <div><i className="fas fa-chart-pie mr-1"></i> {recipe.servings} servings</div>
                    )}
                    {recipe.difficulty && (
                      <div><i className="fas fa-star mr-1"></i> {recipe.difficulty}</div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {recipe.tags && recipe.tags.length > 0 && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full">
                        {recipe.tags[0]}
                      </Badge>
                    )}
                    <Button 
                      variant="link" 
                      className="text-primary hover:text-[#16a34a] font-medium text-sm flex items-center"
                      onClick={() => toggleRecipeExpand(index)}
                    >
                      {expandedRecipe === index ? 'Hide Recipe' : 'View Recipe'} 
                      <i className={`fas fa-arrow-${expandedRecipe === index ? 'up' : 'right'} ml-1`}></i>
                    </Button>
                  </div>
                  
                  {expandedRecipe === index && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-slate-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-4">
                        <h6 className="font-semibold mb-2">Ingredients:</h6>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="font-semibold mb-2">Instructions:</h6>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          {recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {result.recipes.length > 3 && (
            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-primary hover:text-[#16a34a] font-medium flex items-center mx-auto"
                onClick={() => setShowAllRecipes(!showAllRecipes)}
              >
                {showAllRecipes ? 'Show Less' : 'Show More Recipes'} 
                <i className={`fas fa-chevron-${showAllRecipes ? 'up' : 'down'} ml-1`}></i>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          className="bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-300 rounded-full px-6 py-3"
          onClick={onTryAnother}
        >
          <i className="fas fa-redo mr-2"></i> Try Another Image
        </Button>
      </div>
    </motion.section>
  );
}
