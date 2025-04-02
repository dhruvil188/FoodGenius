import { initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let firebaseApp: App;

// Initialize Firebase Admin with application credentials
try {
  // Handle private key properly - try more robust parsing approaches
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  
  // Fix common issues with private key formatting
  // 1. If the key is wrapped in quotes (from JSON stringification), remove them
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  
  // 2. Replace literal "\n" with actual newlines
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
  
  // Check if we have all required credentials
  if (!process.env.VITE_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error('Missing Firebase Admin credentials (project ID or client email)');
  }
  
  if (!formattedPrivateKey || formattedPrivateKey.trim() === '') {
    throw new Error('Missing or empty Firebase private key');
  }
  
  console.log('Attempting to initialize Firebase Admin with private key');
  
  // Initialize the app
  firebaseApp = initializeApp({
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: formattedPrivateKey,
    }),
    projectId: process.env.VITE_FIREBASE_PROJECT_ID
  });
  
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  // Initialize with a default app for development if there's an error
  // This prevents the server from crashing during development
  try {
    firebaseApp = initializeApp({}, 'recipe-snap-app');
    console.log('Initialized with default app for development');
  } catch (e) {
    console.error('Failed to initialize default app:', e);
    // Last resort, if even the default app fails
    firebaseApp = initializeApp({
      projectId: 'recipe-snap-default'
    }, 'recipe-snap-fallback');
    console.log('Initialized with fallback app configuration');
  }
}

// Export Firestore and Auth instances with error handling
let firestoreInstance;
try {
  firestoreInstance = getFirestore();
  console.log('Firestore instance initialized');
} catch (error) {
  console.error('Failed to initialize Firestore:', error);
  // Create a mock Firestore for development
  firestoreInstance = {
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async () => {},
        update: async () => {},
        delete: async () => {}
      }),
      add: async () => ({ id: 'mock-id' }),
      where: () => ({
        limit: () => ({
          get: async () => ({ empty: true, docs: [] })
        }),
        get: async () => ({ empty: true, docs: [] })
      }),
      orderBy: () => ({
        limit: () => ({
          get: async () => ({ empty: true, docs: [] })
        }),
        get: async () => ({ empty: true, docs: [] })
      }),
      get: async () => ({ empty: true, docs: [] })
    })
  };
  console.log('Using mock Firestore instance for development');
}

let authInstance;
try {
  authInstance = getAuth();
  console.log('Auth instance initialized');
} catch (error) {
  console.error('Failed to initialize Auth:', error);
  // Create a mock Auth for development
  authInstance = {
    verifyIdToken: async () => ({ 
      uid: 'mock-uid',
      email: 'mock@example.com',
      name: 'Mock User'
    })
  };
  console.log('Using mock Auth instance for development');
}

export const firestore = firestoreInstance;
export const auth = authInstance;

export default firebaseApp;