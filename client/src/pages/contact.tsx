import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-16 px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
            CONTACT US
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Have questions about Recipe Snap? We're here to help you turn food photos into delicious recipes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="yourname@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-slate-600 mb-4">Your message has been sent successfully. We'll get back to you soon.</p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-slate-600 mb-6">
                Have questions about our AI-powered recipe generator? Looking for support or partnership opportunities? 
                Reach out to our team using the contact information below.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Email Us</h3>
              <p className="text-primary font-medium">argonpatel835@gmail.com</p>
              <p className="text-sm text-slate-500 mt-1">We typically respond within 24-48 hours</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-100 text-blue-600 h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-blue-100 text-blue-400 h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-pink-100 text-pink-600 h-10 w-10 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-blue-100 text-blue-700 h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">FAQ</h3>
              <p className="text-slate-600 mb-3">Find answers to frequently asked questions about our Image to Recipe tool, AI recipe recognition, and more.</p>
              <Button variant="outline" className="w-full">
                Visit FAQ Page
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* SEO content - hidden visually but available for search engines */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Recipe Snap - Your AI Food Recognition Tool
          </h2>
          <div className="max-w-3xl mx-auto text-slate-600">
            <p className="mb-4">
              Recipe Snap is the leading AI-powered solution for transforming food photos into detailed recipes. 
              Our innovative platform uses advanced image recognition technology to identify ingredients, cooking methods, 
              and cultural contexts of dishes captured in photos.
            </p>
            <p className="mb-4">
              Turn your food pictures into step-by-step cooking instructions with our AI recipe generator. 
              Whether you're looking to recreate a restaurant dish or identify ingredients in your meal, 
              our food image analyzer provides accurate recipes in seconds.
            </p>
            <p>
              Recipe Snap offers a suite of features including nutritional analysis, cooking tips, 
              ingredient substitutions, and more - all from a simple photo. Experience the future of cooking 
              with our visual recipe tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}