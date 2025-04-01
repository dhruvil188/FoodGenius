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
  getRedirectResult
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
  Timestamp 
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
let app;
let auth;
let db;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  
  // Create empty implementations to prevent app from crashing
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
    signOut: () => Promise.reject(new Error('Firebase not initialized')),
    signInWithPopup: () => Promise.reject(new Error('Firebase not initialized')),
  };
  
  db = {
    collection: () => ({
      doc: () => ({
        set: () => Promise.reject(new Error('Firebase not initialized')),
        get: () => Promise.reject(new Error('Firebase not initialized')),
      }),
    }),
    doc: () => ({
      set: () => Promise.reject(new Error('Firebase not initialized')),
      get: () => Promise.reject(new Error('Firebase not initialized')),
    }),
  };
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

// Recipe management functions
export const saveRecipe = async (userId: string, recipe: AnalyzeImageResponse, imageUrl: string) => {
  try {
    console.log('Starting saveRecipe process for user:', userId);
    console.log('Firebase config:', {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      apiKeyExists: !!import.meta.env.VITE_FIREBASE_API_KEY
    });
    
    // Create a new recipe document reference
    const recipeDocRef = doc(collection(db, 'recipes'));
    console.log('Created recipe document reference:', recipeDocRef.id);
    
    // Create the recipe data object
    const recipeData = {
      userId,
      recipe,
      imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    // Save the recipe document
    console.log('Attempting to save recipe document');
    await setDoc(recipeDocRef, recipeData);
    console.log('Recipe document saved successfully');
    
    // Update user's recipe count
    console.log('Updating user profile recipe count');
    const userProfileRef = doc(db, 'userProfiles', userId);
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (userProfileSnap.exists()) {
      console.log('User profile found, updating recipe count');
      const userData = userProfileSnap.data();
      await setDoc(userProfileRef, {
        ...userData,
        recipeCount: (userData.recipeCount || 0) + 1,
        updatedAt: Timestamp.now()
      }, { merge: true });
      console.log('User profile updated successfully');
    } else {
      console.log('User profile not found, creating new profile');
      await setDoc(userProfileRef, {
        email: auth.currentUser?.email,
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        recipeCount: 1
      });
      console.log('New user profile created successfully');
    }
    
    console.log('Recipe saving process completed successfully');
    return recipeDocRef.id;
  } catch (error: any) {
    console.error('Error saving recipe:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Attempt to reconnect if we get a connection error
    if (error.code === 'unavailable' || error.code === 'resource-exhausted') {
      console.log('Attempting to reinitialize Firebase connection...');
      // Don't actually reinitialize, but log the intent
    }
    
    throw error;
  }
};

// Get user recipes
export const getUserRecipes = async (userId: string) => {
  try {
    const recipesQuery = query(collection(db, 'recipes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(recipesQuery);
    
    const recipes: any[] = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
    
    return recipes;
  } catch (error) {
    console.error('Error getting user recipes:', error);
    throw error;
  }
};

// User profile management
export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userProfileRef = doc(db, 'userProfiles', userId);
    await setDoc(userProfileRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    console.log('Fetching user profile for user ID:', userId);
    
    // Validate that we have a proper connection to Firestore
    console.log('Firebase config for user profile:', {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      apiKeyExists: !!import.meta.env.VITE_FIREBASE_API_KEY
    });
    
    const userProfileRef = doc(db, 'userProfiles', userId);
    console.log('User profile reference created:', userProfileRef.path);
    
    console.log('Attempting to get user profile document');
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (userProfileSnap.exists()) {
      console.log('User profile document exists');
      const data = userProfileSnap.data();
      console.log('User profile data retrieved successfully');
      return data;
    }
    
    console.log('User profile document does not exist');
    return null;
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Rethrow the error
    throw error;
  }
};

// Auth state observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};