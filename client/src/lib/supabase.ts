import { createClient } from '@supabase/supabase-js';
import { type AnalyzeImageResponse } from '@shared/schema';

// Initialize Supabase client using environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Log status without exposing actual values
console.log('Supabase configuration:', 
  supabaseUrl ? 'URL is configured' : 'URL is missing',
  supabaseAnonKey ? 'Key is configured' : 'Key is missing'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database
export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type SavedRecipe = {
  id: string;
  user_id: string;
  recipe_data: AnalyzeImageResponse;
  image_url: string;
  created_at: string;
};

// Helper functions for authentication
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Helper functions for recipes
export const saveRecipe = async (recipe: AnalyzeImageResponse, imageUrl: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('saved_recipes')
    .insert({
      user_id: user.id,
      recipe_data: recipe,
      image_url: imageUrl,
    })
    .select()
    .single();
};

export const getUserRecipes = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('saved_recipes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
};

export const deleteRecipe = async (recipeId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('saved_recipes')
    .delete()
    .eq('id', recipeId)
    .eq('user_id', user.id); // Security check to ensure users can only delete their own recipes
};