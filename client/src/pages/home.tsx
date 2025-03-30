import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageUploader from "@/components/ImageUploader";
import LoadingAnimation from "@/components/LoadingAnimation";
import RecipeResults from "@/components/RecipeResults";
import Footer from "@/components/Footer";
import { type AnalyzeImageResponse } from "@shared/schema";
import { apiRequest } from "@/lib/api";

export default function Home() {
  const [stage, setStage] = useState<"upload" | "loading" | "results">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeImageResponse | null>(null);
  
  // Handle analyzing an image
  const handleAnalyzeImage = (imageData: string) => {
    setSelectedImage(imageData);
    setStage("loading");
    
    // Directly use apiRequest from lib/api
    apiRequest<AnalyzeImageResponse>('POST', '/api/analyze-image', { imageData })
      .then((response) => {
        console.log('Analysis successful:', response);
        setAnalysisResult(response);
        setStage("results");
      })
      .catch((error: any) => {
        console.error('Error in image analysis:', error);
        setStage("upload");
      });
  };
  
  // Handle successful analysis - kept for backward compatibility
  const handleAnalysisComplete = (result: AnalyzeImageResponse) => {
    setAnalysisResult(result);
    setStage("results");
  };
  
  // Handle trying another image
  const handleTryAnother = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setStage("upload");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <Hero />
        
        {stage === "upload" && (
          <ImageUploader onAnalyzeImage={handleAnalyzeImage} />
        )}
        
        {stage === "loading" && (
          <LoadingAnimation />
        )}
        
        {stage === "results" && analysisResult && selectedImage && (
          <RecipeResults 
            result={analysisResult}
            imageUrl={selectedImage}
            onTryAnother={handleTryAnother}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
