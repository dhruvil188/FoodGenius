import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import LoadingAnimation from "@/components/LoadingAnimation";
import { motion } from "framer-motion";
import { SavedRecipe } from "@shared/schema";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Only fetch saved recipes if the user is logged in
    if (user) {
      fetchSavedRecipes();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchSavedRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest<SavedRecipe[]>('GET', '/api/recipes');
      setSavedRecipes(response || []);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      toast({
        title: "Failed to load recipes",
        description: "We couldn't load your saved recipes. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    try {
      await apiRequest('DELETE', `/api/recipes/${id}`);
      // Update the local state to remove the deleted recipe
      setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
      toast({
        title: "Recipe deleted",
        description: "The recipe has been removed from your saved recipes.",
      });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast({
        title: "Delete failed",
        description: "We couldn't delete this recipe. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (id: number, currentStatus: boolean) => {
    try {
      await apiRequest('PATCH', `/api/recipes/${id}/favorite`, { favorite: !currentStatus });
      // Update the local state to reflect the new favorite status
      setSavedRecipes(savedRecipes.map(recipe => 
        recipe.id === id ? { ...recipe, favorite: !currentStatus } : recipe
      ));
      toast({
        title: currentStatus ? "Removed from favorites" : "Added to favorites",
        description: currentStatus 
          ? "The recipe has been removed from your favorites." 
          : "The recipe has been added to your favorites.",
      });
    } catch (error) {
      console.error('Error updating favorite status:', error);
      toast({
        title: "Update failed",
        description: "We couldn't update the favorite status. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // If user is not logged in, redirect to auth page
  if (!user && !isLoading) {
    return <Redirect to="/auth" />;
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={user?.username ? `https://ui-avatars.com/api/?name=${user.username}` : ""} alt={user?.username || "User"} />
                  <AvatarFallback className="text-xl font-bold">
                    {getInitials(user?.username || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user?.username || "User"}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="bg-primary/10">Member</Badge>
                    {savedRecipes.length > 10 && <Badge variant="outline" className="bg-amber-500/10 text-amber-600">Food Enthusiast</Badge>}
                    {savedRecipes.some(r => r.favorite) && <Badge variant="outline" className="bg-red-500/10 text-red-600">Has Favorites</Badge>}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => logoutMutation.mutate()} className="md:self-start">
                Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
            <h2 className="text-2xl font-bold mb-6">Your Saved Recipes</h2>
            {savedRecipes.length === 0 ? (
              <Card className="bg-slate-50">
                <CardContent className="pt-6 text-center">
                  <div className="py-12">
                    <h3 className="text-xl font-semibold mb-2">No Saved Recipes Yet</h3>
                    <p className="text-slate-500 mb-6">Start analyzing food images or browse the recipe library to save your favorite recipes.</p>
                    <Link href="/">
                      <Button>Start Discovering</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 bg-slate-100">
                        {recipe.imageUrl ? (
                          <img 
                            src={recipe.imageUrl} 
                            alt={recipe.foodName} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <span className="text-slate-400">
                              <i className="fas fa-image text-4xl"></i>
                            </span>
                          </div>
                        )}
                        <button 
                          className={`absolute top-2 right-2 p-2 rounded-full ${recipe.favorite ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600'}`}
                          onClick={() => handleToggleFavorite(recipe.id, recipe.favorite || false)}
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                      <CardContent className="flex-grow pt-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{recipe.foodName}</h3>
                        <p className="text-slate-500 mb-4 line-clamp-3">{recipe.description || ''}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipe.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <i className="fas fa-clock mr-2"></i>
                          <span>
                            {typeof recipe.recipeData === 'object' && recipe.recipeData !== null
                              ? (recipe.recipeData as any).totalTime || 'N/A'
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <i className="fas fa-utensils mr-2"></i>
                          <span>
                            {typeof recipe.recipeData === 'object' && recipe.recipeData !== null
                              ? (recipe.recipeData as any).difficulty || 'N/A'
                              : 'N/A'}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex justify-between w-full">
                          <Link href={`/recipe/${recipe.id}`}>
                            <Button variant="outline" size="sm">
                              View Recipe
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites">
            <h2 className="text-2xl font-bold mb-6">Your Favorite Recipes</h2>
            {savedRecipes.filter(r => r.favorite).length === 0 ? (
              <Card className="bg-slate-50">
                <CardContent className="pt-6 text-center">
                  <div className="py-12">
                    <h3 className="text-xl font-semibold mb-2">No Favorite Recipes Yet</h3>
                    <p className="text-slate-500 mb-6">Mark recipes as favorites to find them quickly here.</p>
                    <Link href="/">
                      <Button>Browse Recipes</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.filter(recipe => recipe.favorite).map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 bg-slate-100">
                        {recipe.imageUrl ? (
                          <img 
                            src={recipe.imageUrl} 
                            alt={recipe.foodName} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <span className="text-slate-400">
                              <i className="fas fa-image text-4xl"></i>
                            </span>
                          </div>
                        )}
                        <button 
                          className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white"
                          onClick={() => handleToggleFavorite(recipe.id, true)}
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                      <CardContent className="flex-grow pt-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{recipe.foodName}</h3>
                        <p className="text-slate-500 mb-4 line-clamp-3">{recipe.description || ''}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipe.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <i className="fas fa-clock mr-2"></i>
                          <span>
                            {typeof recipe.recipeData === 'object' && recipe.recipeData !== null
                              ? (recipe.recipeData as any).totalTime || 'N/A'
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <i className="fas fa-utensils mr-2"></i>
                          <span>
                            {typeof recipe.recipeData === 'object' && recipe.recipeData !== null
                              ? (recipe.recipeData as any).difficulty || 'N/A'
                              : 'N/A'}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex justify-between w-full">
                          <Link href={`/recipe/${recipe.id}`}>
                            <Button variant="outline" size="sm">
                              View Recipe
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                    <Separator className="mb-4" />
                    <p className="text-slate-500 mb-4">Manage your account information.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <p className="border rounded-md px-3 py-2">{user?.username || "Not provided"}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <p className="border rounded-md px-3 py-2">{user?.email || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Management</h3>
                    <Separator className="mb-4" />
                    <p className="text-slate-500 mb-6">Manage your account settings and preferences.</p>
                    <Button variant="destructive" onClick={() => logoutMutation.mutate()}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}