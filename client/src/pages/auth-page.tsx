import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@shared/schema";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { ArrowRight, ChefHat, CheckCircle2, Image, Salad, ShieldCheck, UtensilsCrossed } from "lucide-react";
import Hero from "@/components/Hero";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [, navigate] = useLocation();
  const { currentUser: user, isLoading, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if we have a pending payment process to resume
      const hasPendingPayment = localStorage.getItem('pending_payment_process') === 'true';
      
      if (hasPendingPayment) {
        console.log('Detected pending payment process, redirecting to payment processor');
        // Clear the pending flag
        localStorage.removeItem('pending_payment_process');
        // Redirect to payment processor
        navigate("/payment-processor");
      } else {
        // Normal login flow - redirect to home
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await login();
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // Switch tab handler to clear forms
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "login") {
      loginForm.reset();
    } else {
      registerForm.reset();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Auth Form Section */}
        <div>
          <div className="max-w-md mx-auto flex flex-col items-center">
            <Logo size="large" animated={true} />

            <h1 className="text-3xl font-bold mt-8 text-center mb-2">
              Welcome to Recipe Snap
            </h1>
            <p className="text-slate-500 text-center mb-8">
              Sign in to your account or create a new one to save your favorite recipes.
            </p>

            <Card className="w-full">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <CardHeader>
                    <CardTitle>Login to Your Account</CardTitle>
                    <CardDescription>
                      Enter your email and password to access your saved recipes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                              Logging in...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Sign In <ArrowRight size={16} />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <CardHeader>
                    <CardTitle>Create Your Account</CardTitle>
                    <CardDescription>
                      Join Recipe Snap to save recipes and get personalized recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="chefmaster" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormDescription>
                                At least 8 characters
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                              Creating account...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Create Account <ArrowRight size={16} />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Benefits/Hero Section */}
        <div className="lg:block hidden">
          <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-sm border border-emerald-100">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Unlock All Recipe Snap Features
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Salad size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Save Favorite Recipes</h3>
                  <p className="text-slate-500">Create a personal collection of your favorite dishes for easy access.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
                  <p className="text-slate-500">Get recipe suggestions based on your preferences and previous choices.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Track Cooking History</h3>
                  <p className="text-slate-500">Keep a record of recipes you've tried and your notes for future reference.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Image size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Unlimited Image Analysis</h3>
                  <p className="text-slate-500">Analyze as many food images as you want to discover new recipes.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Data Storage</h3>
                  <p className="text-slate-500">Your recipes and preferences are securely stored and always available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;