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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
    const recipeDocRef = doc(collection(db, 'recipes'));
    
    await setDoc(recipeDocRef, {
      userId,
      recipe,
      imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    // Update user's recipe count
    const userProfileRef = doc(db, 'userProfiles', userId);
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (userProfileSnap.exists()) {
      const userData = userProfileSnap.data();
      await setDoc(userProfileRef, {
        ...userData,
        recipeCount: (userData.recipeCount || 0) + 1,
        updatedAt: Timestamp.now()
      }, { merge: true });
    }
    
    return recipeDocRef.id;
  } catch (error) {
    console.error('Error saving recipe:', error);
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
    const userProfileRef = doc(db, 'userProfiles', userId);
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (userProfileSnap.exists()) {
      return userProfileSnap.data();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};