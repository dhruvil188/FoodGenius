import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ImageUploader from "@/components/ImageUploader";
import LoadingAnimation from "@/components/LoadingAnimation";
import RecipeResults from "@/components/RecipeResults";
import { type AnalyzeImageResponse } from "@shared/schema";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import confetti from "canvas-confetti";

export default function Home() {
  const [stage, setStage] = useState<"upload" | "loading" | "results">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeImageResponse | null>(null);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  
  // Scroll to the upload section if a deep link is used
  useEffect(() => {
    if (location.includes('#upload-section')) {
      const element = document.getElementById('upload-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  // Handle demo mode activation (without real image upload)
  const handleDemoMode = () => {
    setStage("loading");
    
    // Show toast for demo mode feedback
    toast({
      title: "Demo Mode Activated",
      description: "Loading sample recipe data for demonstration...",
    });
    
    // Use the demo API endpoint
    apiRequest<AnalyzeImageResponse>('GET', '/api/analyze-image/demo')
      .then((response) => {
        console.log('Demo mode data loaded:', response);
        
        // Set a placeholder image URL for demo mode
        setSelectedImage("data:image/jpeg;base64,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");
        
        setAnalysisResult(response);
        setStage("results");
        
        // Trigger confetti effect
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
        
        toast({
          title: `Demo: ${response.foodName}`,
          description: "Demo recipe loaded successfully.",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error('Error loading demo data:', error);
        setStage("upload");
        
        toast({
          title: "Demo Mode Failed",
          description: "Couldn't load the demo data. Please try again.",
          variant: "destructive",
        });
      });
  };

  // Handle analyzing an image
  const handleAnalyzeImage = (imageData: string) => {
    setSelectedImage(imageData);
    setStage("loading");
    
    // Show toast for better user feedback
    toast({
      title: "Analysis Started",
      description: "We're analyzing your food image. This may take a moment...",
    });
    
    // Directly use apiRequest from lib/api
    apiRequest<AnalyzeImageResponse>('POST', '/api/analyze-image', { imageData })
      .then((response) => {
        console.log('Analysis successful:', response);
        setAnalysisResult(response);
        setStage("results");
        
        // Trigger confetti effect when recipe is found
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
        
        // Check if this is the mock/demo data from the backend
        const isDemoData = response.foodName.includes('(DEMO MODE)');
        
        toast({
          title: `${isDemoData ? 'Demo Mode: ' : 'Found: '}${response.foodName.replace(' (DEMO MODE)', '')}`,
          description: isDemoData 
            ? "Using demo data due to API quota limits. This is a sample recipe."
            : "Your recipe is ready! We've analyzed your dish successfully.",
          variant: "default",
        });
      })
      .catch((error: any) => {
        console.error('Error in image analysis:', error);
        setStage("upload");
        
        // Check if it's a quota exceeded error
        if (error.status === 429) {
          toast({
            title: "API Quota Exceeded",
            description: "Our AI service has reached its quota limit. Try using Demo Mode instead.",
            variant: "destructive",
          });
        } 
        // Check if it's a file size issue
        else if (error.status === 413) {
          toast({
            title: "Image Too Large",
            description: "The image you uploaded is too large. Please use an image under 5MB.",
            variant: "destructive",
          });
        }
        // Generic error for other cases
        else {
          toast({
            title: "Analysis Failed",
            description: "We couldn't analyze your image. Please try again with a clearer photo.",
            variant: "destructive",
          });
        }
      });
  };
  
  // Handle trying another image
  const handleTryAnother = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setStage("upload");
    
    // Smooth scroll back to upload section
    const element = document.getElementById('upload-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-4">
      <AnimatePresence mode="wait">
        {stage === "upload" && (
          <motion.div
            key="upload-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <ImageUploader 
              onAnalyzeImage={handleAnalyzeImage} 
              onDemoMode={handleDemoMode}
            />
          </motion.div>
        )}
        
        {stage === "loading" && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-16"
          >
            <LoadingAnimation />
          </motion.div>
        )}
        
        {stage === "results" && analysisResult && selectedImage && (
          <motion.div
            key="results-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-8"
          >
            <RecipeResults 
              result={analysisResult}
              imageUrl={selectedImage}
              onTryAnother={handleTryAnother}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
