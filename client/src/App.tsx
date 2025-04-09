import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { HelmetProvider } from 'react-helmet-async';
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Library from "@/pages/library";
import RecipePage from "@/pages/recipe-page";
import ChatPage from "@/pages/chat-page";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import SavedRecipesPage from "@/pages/saved-recipes-page";
import RecipeDetailPage from "@/pages/recipe-detail-page";
import AuthPage from "@/pages/auth-page";
import AuthHandler from "@/pages/auth-handler";
import PaymentSuccess from "@/pages/payment-success";
import PaymentCancel from "@/pages/payment-cancel";
import PaymentProcessor from "@/pages/payment-processor";
import CreditsPage from "@/pages/credits-page";
import BlogPage from "@/pages/blog-page";
import BlogPostPage from "@/pages/blog-post-page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/library" component={Library} />
      <Route path="/recipe/:slug" component={RecipePage} />
      <Route path="/recipes">
        {() => (
          <ProtectedRoute featureName="My Recipes">
            <SavedRecipesPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/recipes/:id">
        {({id}) => (
          <ProtectedRoute featureName="Recipe Details">
            <RecipeDetailPage id={id} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/chat">
        {() => (
          <ProtectedRoute featureName="Recipe Fusion Chat">
            <ChatPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/chat/:id">
        {({id}) => (
          <ProtectedRoute featureName="Recipe Fusion Chat">
            <ChatPage id={id} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/auth/handler" component={AuthHandler} />
      <Route path="/__/auth/handler" component={AuthHandler} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/payment-cancel" component={PaymentCancel} />
      <Route path="/payment-processor" component={PaymentProcessor} />
      <Route path="/credits">
        {() => (
          <ProtectedRoute featureName="Credits Management">
            <CreditsPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300">
              <Header />
              <main className="flex-grow pt-16">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
