import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser
} from "firebase/auth";
import { apiRequest } from "@/lib/queryClient";
import { AuthResponse } from "@shared/schema";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // For custom domain, use official Firebase domain as a fallback
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "", // Optional in our use case
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase (only if not already initialized)
let app;
try {
  // Check for existing Firebase apps
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If error is about duplicate app, get the existing app
  if ((error as any)?.code === 'app/duplicate-app') {
    console.log('Firebase app already initialized, using existing app');
  } else {
    console.error('Firebase initialization error:', error);
  }
}

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Token management
const TOKEN_KEY = 'recipe_snap_auth_token';

/**
 * Retrieves the authentication token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Saves the authentication token to localStorage
 */
export function saveAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  console.log("Token saved to localStorage");
}

/**
 * Removes the authentication token from localStorage
 */
export function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  console.log("Token removed from localStorage");
}

/**
 * Handles Google sign-in
 */
export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    // Configure the auth provider with custom redirect parameters
    googleProvider.setCustomParameters({
      // Ensure we redirect to a path that exists in our router
      // This prevents 404 errors on the redirect
      redirect_uri: `${window.location.origin}/auth/handler`
    });
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Sync with our backend
    return await syncUserWithBackend(user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

/**
 * Signs the user out from Firebase and our backend
 */
export async function logoutUser(): Promise<void> {
  try {
    const token = getAuthToken();
    if (token) {
      await apiRequest('POST', '/api/auth/logout', { token });
    }
    removeAuthToken();
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

/**
 * Synchronizes Firebase user with our backend
 */
export async function syncUserWithBackend(user: FirebaseUser): Promise<AuthResponse> {
  try {
    console.log("Attempting to sync Firebase user with backend...");
    
    // Prepare user data for syncing
    const userData = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    
    // Send to our backend endpoint
    const response = await apiRequest('POST', '/api/auth/firebase-sync', userData);
    const authResponse: AuthResponse = await response.json();
    
    // Save token for future requests
    if (authResponse.token) {
      saveAuthToken(authResponse.token);
    }
    
    console.log("User sync successful:", authResponse);
    return authResponse;
  } catch (error) {
    console.error("Error syncing user with backend:", error);
    throw error;
  }
}

/**
 * Sets up Firebase auth state listener, useful for handling auth state in React context
 */
export function setupAuthListener(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export { auth };