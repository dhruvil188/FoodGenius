import { useState, useEffect } from 'react';
import { Redirect } from 'wouter';
import { AuthForms } from '@/components/AuthForms';
import { UserProfile } from '@/components/UserProfile';
import { useAuth } from '@/lib/AuthContext';
import { type AnalyzeImageResponse } from '@shared/schema';

export default function Account() {
  const { user, loading } = useAuth();
  const [selectedRecipe, setSelectedRecipe] = useState<AnalyzeImageResponse | null>(null);
  
  // If selected recipe, redirect to home with the recipe data
  useEffect(() => {
    if (selectedRecipe) {
      // Store the selected recipe in localStorage
      localStorage.setItem('selectedSavedRecipe', JSON.stringify(selectedRecipe));
      window.location.href = '/'; // Redirect to home page to view the recipe
    }
  }, [selectedRecipe]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <AuthForms />;
  }
  
  return <UserProfile onSelectRecipe={setSelectedRecipe} />;
}