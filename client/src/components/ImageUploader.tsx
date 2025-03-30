import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import Webcam from 'react-webcam';
import { apiRequest } from '@/lib/api';

interface ImageUploaderProps {
  onAnalyzeImage: (imageData: string) => void;
  onDemoMode?: () => void;
}

export default function ImageUploader({ onAnalyzeImage, onDemoMode }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary', 'bg-[rgba(34,197,94,0.05)]');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-primary', 'bg-[rgba(34,197,94,0.05)]');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary', 'bg-[rgba(34,197,94,0.05)]');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const handleCapturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setSelectedImage(imageSrc);
        setFileName('webcam-capture.jpg');
      }
    }
  }, [webcamRef]);

  const handleAnalyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Don't call the API here anymore, just pass the image to the parent component
    // which will handle the API call
    onAnalyzeImage(selectedImage);
  };

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: facingMode,
  };

  return (
    <motion.section 
      id="upload-section"
      className="max-w-2xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <CardContent className="p-8">
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">
                Upload or Capture Your Dish
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600/40 to-primary/40 rounded-full"></span>
            </span>
          </motion.h3>
          
          <Tabs 
            defaultValue="upload" 
            className="mb-6"
            onValueChange={val => {
              setActiveTab(val);
              setSelectedImage(null);
              setFileName(null);
            }}
          >
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-slate-100 p-1.5 mb-8 border border-slate-200">
              <TabsTrigger 
                value="upload" 
                className="flex items-center justify-center gap-2.5 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md py-2.5"
              >
                <i className="fas fa-cloud-upload-alt text-primary"></i>
                <span className="font-medium">Upload Image</span>
              </TabsTrigger>
              <TabsTrigger 
                value="camera" 
                className="flex items-center justify-center gap-2.5 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md py-2.5"
              >
                <i className="fas fa-camera text-primary"></i>
                <span className="font-medium">Take Photo</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
                  selectedImage 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'border-slate-200 hover:border-primary/30 hover:bg-slate-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  hidden 
                  accept="image/*" 
                  onChange={handleFileSelect}
                />
                
                <AnimatePresence mode="wait">
                  {!selectedImage ? (
                    <motion.div 
                      key="upload-prompt"
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className="text-6xl flex justify-center gap-4"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <i className="fas fa-utensils text-primary/80"></i>
                        <i className="fas fa-cloud-upload-alt text-primary/60"></i>
                      </motion.div>
                      <div className="space-y-2 max-w-md mx-auto">
                        <h4 className="text-lg font-medium">Drag & drop your food image</h4>
                        <p className="text-sm text-slate-500">
                          or click to browse your device
                        </p>
                        <p className="text-xs text-slate-400 mt-4">
                          <i className="fas fa-info-circle mr-1"></i> Supports JPG, PNG files up to 5MB
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="image-preview"
                      className="py-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="relative max-w-xs mx-auto">
                        <motion.div
                          className="rounded-xl overflow-hidden shadow-lg"
                          whileHover={{ scale: 1.03 }}
                        >
                          <img 
                            src={selectedImage} 
                            alt="Selected food" 
                            className="max-h-60 w-full object-cover"
                          />
                          <motion.button 
                            className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-red-500 hover:text-red-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className="fas fa-times"></i>
                          </motion.button>
                        </motion.div>
                        {fileName && (
                          <motion.p 
                            className="mt-3 text-sm font-medium overflow-hidden text-ellipsis text-slate-600"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <i className="fas fa-file-image text-primary mr-2"></i>
                            {fileName}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="camera" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                className="camera-container relative bg-slate-100 rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ minHeight: '300px' }}
              >
                {activeTab === 'camera' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      onUserMedia={() => setIsCameraReady(true)}
                      onUserMediaError={() => {
                        toast({
                          title: "Camera Error",
                          description: "Could not access camera. Make sure you've granted camera permissions.",
                          variant: "destructive"
                        });
                      }}
                      className="w-full h-full object-cover"
                      style={{ height: '350px' }}
                    />
                  </motion.div>
                )}
                
                {!selectedImage && activeTab === 'camera' && (
                  <motion.div 
                    className="absolute bottom-4 left-0 right-0 flex justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        className="bg-white hover:bg-slate-50 text-primary hover:text-primary/80 rounded-full size-14 shadow-lg border-none"
                        onClick={handleCapturePhoto}
                        disabled={!isCameraReady}
                        size="icon"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
                          <i className="fas fa-circle text-2xl"></i>
                        </div>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        className="bg-white hover:bg-slate-50 text-slate-600 rounded-full size-10 shadow-md"
                        onClick={handleSwitchCamera}
                        disabled={!isCameraReady}
                        size="icon"
                      >
                        <i className="fas fa-sync-alt"></i>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                
                {selectedImage && activeTab === 'camera' && (
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={selectedImage} 
                        alt="Captured food" 
                        className="w-full h-full object-cover"
                      />
                      <motion.button 
                        className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-red-500 hover:text-red-600 transition-colors"
                        onClick={handleRemoveImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fas fa-times"></i>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              {activeTab === 'camera' && !isCameraReady && !selectedImage && (
                <div className="flex justify-center items-center h-32">
                  <motion.div 
                    className="text-center" 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <i className="fas fa-spinner fa-spin text-2xl text-primary mb-2"></i>
                    <p className="text-sm text-slate-500">Initializing camera...</p>
                  </motion.div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <motion.div 
            className="text-center pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Buttons container */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              {/* Analyze Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-primary to-emerald-600 text-white font-medium rounded-full px-10 py-6 shadow-md hover:shadow-lg hover:from-primary/95 hover:to-emerald-600/95 transition-all"
                  disabled={!selectedImage || isAnalyzing}
                  onClick={handleAnalyzeImage}
                  size="lg"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-5 h-5">
                        <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-25 animate-ping"></div>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <span className="font-semibold tracking-wide">Analyzing Dish...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <i className="fas fa-magic text-lg"></i>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                      </div>
                      <span className="font-semibold tracking-wide">Analyze This Dish</span>
                    </div>
                  )}
                </Button>
              </motion.div>
              
              {/* Demo Mode Button */}
              {onDemoMode && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-full px-6 py-6 shadow-md hover:shadow-lg hover:from-amber-500/95 hover:to-orange-600/95 transition-all"
                    onClick={onDemoMode}
                    size="lg"
                  >
                    <div className="flex items-center gap-2">
                      <i className="fas fa-vial text-lg"></i>
                      <span className="font-semibold tracking-wide">Try Demo Mode</span>
                    </div>
                  </Button>
                </motion.div>
              )}
            </div>
            
            {!selectedImage && (
              <motion.p 
                className="mt-4 text-xs text-slate-500 max-w-xs mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <i className="fas fa-info-circle mr-1"></i> Upload or capture an image of your food to get detailed cooking instructions and nutritional information
              </motion.p>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
