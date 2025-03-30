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
}

export default function ImageUploader({ onAnalyzeImage }: ImageUploaderProps) {
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

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    
    try {
      setIsAnalyzing(true);
      
      await apiRequest('POST', '/api/analyze-image', { imageData: selectedImage });
      
      // If successful, notify parent component
      onAnalyzeImage(selectedImage);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Failed",
        description: "Sorry, we couldn't analyze your image. Please try again.",
        variant: "destructive"
      });
    }
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
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold font-heading mb-4 text-center">Upload or Capture Food Image</h3>
          
          <Tabs 
            defaultValue="upload" 
            className="mb-6"
            onValueChange={val => {
              setActiveTab(val);
              setSelectedImage(null);
              setFileName(null);
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center">
                <i className="fas fa-upload mr-2"></i> Upload Image
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex items-center">
                <i className="fas fa-camera mr-2"></i> Take Photo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6">
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
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
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-5xl text-slate-300 flex justify-center">
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <h4 className="text-lg font-medium text-slate-700">Drag & drop your image or click to browse</h4>
                      <p className="text-sm text-slate-500">Supports JPG, PNG files up to 5MB</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="image-preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative w-full max-w-xs mx-auto">
                        <img 
                          src={selectedImage} 
                          alt="Selected food" 
                          className="rounded-lg max-h-60 mx-auto"
                        />
                        <button 
                          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md text-red-500 hover:text-red-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      {fileName && (
                        <p className="mt-3 text-sm font-medium text-slate-700">{fileName}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
            
            <TabsContent value="camera" className="mt-6">
              <div className="camera-container relative bg-slate-100 rounded-lg overflow-hidden" style={{ minHeight: '250px' }}>
                {activeTab === 'camera' && (
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
                    style={{ height: '300px' }}
                  />
                )}
                
                {!selectedImage && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <Button 
                      className="bg-white rounded-full p-3 shadow-md text-primary hover:text-primary-dark transition-colors"
                      onClick={handleCapturePhoto}
                      disabled={!isCameraReady}
                      size="icon"
                    >
                      <i className="fas fa-circle text-xl"></i>
                    </Button>
                    <Button 
                      className="bg-white rounded-full p-3 shadow-md text-red-500 hover:text-red-600 transition-colors"
                      onClick={handleSwitchCamera}
                      disabled={!isCameraReady}
                      size="icon"
                    >
                      <i className="fas fa-sync-alt"></i>
                    </Button>
                  </div>
                )}
                
                {selectedImage && (
                  <div className="absolute inset-0">
                    <div className="relative w-full h-full">
                      <img 
                        src={selectedImage} 
                        alt="Captured food" 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md text-red-500 hover:text-red-600 transition-colors"
                        onClick={handleRemoveImage}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <Button 
              className="bg-primary hover:bg-[#16a34a] text-white font-medium rounded-full px-8 py-3 transition-colors"
              disabled={!selectedImage || isAnalyzing}
              onClick={handleAnalyzeImage}
            >
              {isAnalyzing ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Analyzing...
                </>
              ) : (
                'Analyze Image'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
