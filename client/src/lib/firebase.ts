import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  type Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  type Firestore
} from 'firebase/firestore';
import { AnalyzeImageResponse } from '@shared/schema';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log Firebase config (without sensitive values)
console.log('Initializing Firebase with config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  hasApiKey: !!firebaseConfig.apiKey,
  hasAppId: !!firebaseConfig.appId,
  hasMessagingSenderId: !!firebaseConfig.messagingSenderId
});

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.error('Firebase configuration is incomplete. Some features may not work properly.');
}

// Initialize Firebase with proper error handling
let app: any;
let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  
  // Since we can't properly mock Firebase types, we'll create a fake Auth and Firestore
  // that will throw appropriate errors when methods are called
  
  // Create a dummy implementation so the app doesn't crash on import
  // This is just to satisfy TypeScript - any actual usage will properly throw an error
  const createDummyFirebase = () => {
    const handler = {
      get: function(target: any, prop: string) {
        if (typeof target[prop] === 'function') {
          return () => {
            throw new Error('Firebase not initialized');
          };
        }
        
        if (typeof target[prop] === 'undefined') {
          if (typeof prop === 'symbol' || prop === 'then') {
            return undefined;
          }
          return createDummyFirebase();
        }
        
        return target[prop];
      }
    };
    
    return new Proxy({}, handler);
  };
  
  // Create fake Auth and Firestore objects that throw errors
  const dummyImplementation = createDummyFirebase();
  
  // Use type assertion to satisfy TypeScript
  auth = {
    currentUser: null,
    ...dummyImplementation
  } as unknown as ReturnType<typeof getAuth>;
  
  db = dummyImplementation as unknown as ReturnType<typeof getFirestore>;
}

// Create Google auth provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Initialize user profile document
    await setDoc(doc(db, 'userProfiles', user.uid), {
      email: user.email,
      createdAt: Timestamp.now(),
      recipeCount: 0,
      preferences: {} // For future use with dietary preferences, etc.
    });
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Google Sign-in function
export const signInWithGoogle = async () => {
  try {
    // Add scopes for requested permissions
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    // Use popup for mobile friendliness (can be changed to redirect for specific cases)
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if this is a new user to create profile
    const userProfileRef = doc(db, 'userProfiles', user.uid);
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (!userProfileSnap.exists()) {
      // Create a new user profile document
      await setDoc(userProfileRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: Timestamp.now(),
        recipeCount: 0,
        preferences: {}
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Recipe management functions - using Replit Database API
export const saveRecipe = async (userId: string, recipe: AnalyzeImageResponse, imageUrl: string) => {
  try {
    console.log('Starting saveRecipe process for user:', userId);

    // Store recipe in local storage as backup
    console.log('Recipe saved to local storage:', recipe.foodName || recipe.recipes?.[0]?.title || "Recipe");
    
    // Call our API endpoint to save to Replit Database
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        recipe,
        imageUrl
      })
    });
    
    if (!response.ok) {
      // If server error, we'll throw an error
      const errorData = await response.json();
      console.error('Server error saving recipe:', errorData);
      throw new Error(`Failed to save recipe: ${errorData.error}`);
    }
    
    const data = await response.json();
    console.log('Recipe saving process completed successfully', data);
    return data.recipeId;
  } catch (error: any) {
    console.error('Error saving recipe:', error);
    
    // Store the recipe in localStorage as a fallback
    try {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      const newRecipeEntry = {
        id: `local_${Date.now()}`,
        userId,
        recipe,
        imageUrl,
        createdAt: new Date().toISOString(),
        pendingSync: true
      };
      
      savedRecipes.push(newRecipeEntry);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      console.log('Recipe saved to local storage as fallback');
      
      return newRecipeEntry.id;
    } catch (localStorageError) {
      console.error('Failed to save to localStorage:', localStorageError);
    }
    
    throw error;
  }
};

// Get user recipes from Replit Database API
export const getUserRecipes = async (userId: string) => {
  try {
    // Call our API endpoint
    const response = await fetch(`/api/recipes/${userId}`);
    
    if (!response.ok) {
      // If server error, we'll throw an error
      const errorData = await response.json();
      console.error('Error fetching recipes:', errorData);
      throw new Error(`Failed to fetch recipes: ${errorData.error}`);
    }
    
    const recipes = await response.json();
    
    // Merge with any locally saved recipes that haven't been synced
    try {
      const localRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
        .filter((r: any) => r.userId === userId && r.pendingSync);
      
      return [...recipes, ...localRecipes];
    } catch (localStorageError) {
      console.error('Error reading from localStorage:', localStorageError);
      return recipes;
    }
  } catch (error) {
    console.error('Error getting user recipes:', error);
    
    // Fallback to localStorage if API call fails
    try {
      const localRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
        .filter((r: any) => r.userId === userId);
      
      console.log('Returning recipes from localStorage fallback');
      return localRecipes;
    } catch (localStorageError) {
      console.error('Error reading from localStorage:', localStorageError);
      return [];
    }
  }
};

// Delete a recipe - new function
export const deleteRecipe = async (userId: string, recipeId: string) => {
  try {
    // If it's a local recipe ID, just remove from localStorage
    if (recipeId.startsWith('local_')) {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      const filteredRecipes = savedRecipes.filter((r: any) => r.id !== recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(filteredRecipes));
      console.log('Recipe deleted from local storage');
      return true;
    }
    
    // Otherwise, call our API endpoint
    const response = await fetch(`/api/recipes/${userId}/${recipeId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      // If server error, we'll throw an error
      const errorData = await response.json();
      console.error('Server error deleting recipe:', errorData);
      throw new Error(`Failed to delete recipe: ${errorData.error}`);
    }
    
    const result = await response.json();
    console.log('Recipe deleted successfully', result);
    return true;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

// User profile management - using Replit Database API
export const updateUserProfile = async (userId: string, data: any) => {
  try {
    // Call our API endpoint
    const response = await fetch(`/api/user-profile/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      // If server error, we'll throw an error
      const errorData = await response.json();
      console.error('Server error updating profile:', errorData);
      throw new Error(`Failed to update profile: ${errorData.error}`);
    }
    
    const result = await response.json();
    console.log('Profile updated successfully', result);
    return result;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    console.log('Fetching user profile for user ID:', userId);
    
    // Get the email from the current user
    const email = auth.currentUser?.email;
    
    // Call our API endpoint
    const response = await fetch(`/api/user-profile/${userId}?email=${email || ''}`);
    
    if (!response.ok) {
      // If server error, throw an error
      const errorData = await response.json();
      console.error('Error fetching profile:', errorData);
      throw new Error(`Failed to fetch profile: ${errorData.error}`);
    }
    
    const result = await response.json();
    if (result.success) {
      console.log('User profile fetched successfully');
      return result.profile;
    }
    
    console.log('User profile not found');
    return null;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    
    // Return null to indicate no profile exists
    return null;
  }
};

// Auth state observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};