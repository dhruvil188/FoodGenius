import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {activeTab === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Log in to save and access your recipes across devices'
              : 'Join Recipe Snap to save your favorite recipes and cooking history'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="pt-4">
            <LoginForm onSuccess={handleAuthSuccess} />
            
            <div className="mt-4 text-center text-sm text-slate-600">
              <p>Don't have an account?{' '}
                <button 
                  className="text-primary hover:underline" 
                  onClick={() => setActiveTab('register')}
                  type="button"
                >
                  Create one
                </button>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="pt-4">
            <RegisterForm onSuccess={handleAuthSuccess} />
            
            <div className="mt-4 text-center text-sm text-slate-600">
              <p>Already have an account?{' '}
                <button 
                  className="text-primary hover:underline" 
                  onClick={() => setActiveTab('login')}
                  type="button"
                >
                  Log in
                </button>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}