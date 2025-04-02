import { initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let firebaseApp: App;

// Initialize Firebase Admin with application credentials
try {
  // Initialize the app
  firebaseApp = initializeApp({
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`
  });
  
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  // Initialize with a default app for development if there's an error
  // This prevents the server from crashing during development
  firebaseApp = initializeApp();
  console.log('Initialized with default app for development');
}

// Export Firestore instance
export const firestore = getFirestore();

// Export Auth instance
export const auth = getAuth();

export default firebaseApp;