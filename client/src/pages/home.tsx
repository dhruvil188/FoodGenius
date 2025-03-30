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
        // Validate that we have a proper response with required fields
        if (!response || !response.foodName || !response.recipes || response.recipes.length === 0) {
          console.error('Invalid response from API:', response);
          throw new Error("The AI couldn't identify the food in your image properly.");
        }
        
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
        
        toast({
          title: `Found: ${response.foodName}`,
          description: "Your recipe is ready! We've analyzed your dish successfully.",
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
            description: "Our AI service has reached its quota limit. Please try again later.",
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
        // Handle API validation errors
        else if (error.status === 500 && error.details) {
          toast({
            title: "Analysis Failed",
            description: error.details || "The AI service encountered a problem. Please try again with a different image.",
            variant: "destructive",
          });
        }
        // Generic error for other cases
        else {
          toast({
            title: "Analysis Failed",
            description: "We couldn't analyze your image. Please try again with a clearer photo of a food dish.",
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
