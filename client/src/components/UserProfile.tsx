import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { getUserRecipes, deleteRecipe, type SavedRecipe } from '@/lib/supabase';
import { AnalyzeImageResponse } from '@shared/schema';

interface SavedRecipeCardProps {
  recipe: SavedRecipe;
  onSelect: (recipe: AnalyzeImageResponse) => void;
  onDelete: (id: string) => void;
}

function SavedRecipeCard({ recipe, onSelect, onDelete }: SavedRecipeCardProps) {
  const recipeData = recipe.recipe_data;
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setIsDeleting(true);
      try {
        await onDelete(recipe.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all overflow-hidden group" 
      onClick={() => onSelect(recipeData)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image_url} 
          alt={recipeData.foodName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-bold text-lg">{recipeData.foodName}</h3>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {recipeData.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipeData.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipeData.tags.length - 3} more
            </Badge>
          )}
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">
          {recipeData.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <div className="text-sm text-slate-500">
          <span>
            {new Date(recipe.created_at).toLocaleDateString()}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function UserProfile({ onSelectRecipe }: { onSelectRecipe: (recipe: AnalyzeImageResponse) => void }) {
  const { user, signOut } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSavedRecipes();
  }, [user]);

  const loadSavedRecipes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await getUserRecipes();
      
      if (error) {
        throw error;
      }
      
      setSavedRecipes(data || []);
    } catch (error: any) {
      console.error('Error loading saved recipes:', error);
      toast({
        title: 'Error loading recipes',
        description: error.message || 'There was a problem loading your saved recipes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      const { error } = await deleteRecipe(recipeId);
      
      if (error) {
        throw error;
      }
      
      // Update the local state to remove the deleted recipe
      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
      
      toast({
        title: 'Recipe deleted',
        description: 'The recipe has been removed from your saved recipes.',
      });
    } catch (error: any) {
      console.error('Error deleting recipe:', error);
      toast({
        title: 'Error deleting recipe',
        description: error.message || 'There was a problem deleting this recipe.',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <motion.section
      className="max-w-5xl mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your account and saved recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">{user.email}</h3>
              <p className="text-sm text-slate-500">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="recipes">
        <TabsList className="mb-6">
          <TabsTrigger value="recipes">Saved Recipes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes">
          <h2 className="text-2xl font-bold mb-6 food-gradient-text">Your Saved Recipes</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading your recipes...</p>
            </div>
          ) : savedRecipes.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-xl mb-2">No saved recipes yet</h3>
              <p className="text-slate-600 mb-4">Start exploring recipes and save your favorites!</p>
              <Button onClick={() => window.location.href = '/'}>Discover Recipes</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map(recipe => (
                <SavedRecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onSelect={onSelectRecipe}
                  onDelete={handleDeleteRecipe}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings">
          <h2 className="text-2xl font-bold mb-6 food-gradient-text">Account Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Email notification settings coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.section>
  );
}