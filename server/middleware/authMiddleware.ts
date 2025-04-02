import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase-admin';
import { firestoreStorage } from '../firestore-storage';

// Extend Express Request to include userId and user properties
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: any;
      session: any;
    }
  }
}

// Middleware to verify Firebase authentication token
export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No authentication required, continue as guest
      return next();
    }
    
    // Extract the token
    const idToken = authHeader.split('Bearer ')[1];
    if (!idToken) {
      return next();
    }
    
    // Verify the token with Firebase Admin
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      const firebaseUid = decodedToken.uid;
      
      // Find the user in our database by Firebase UID
      const user = await firestoreStorage.getUserByFirebaseUid(firebaseUid);
      
      if (user) {
        // Set the user ID and user object in the request
        req.userId = user.id;
        req.user = user;
        
        // Also set in session for compatibility with existing code
        if (!req.session) {
          req.session = {} as any;
        }
        req.session.userId = user.id;
      }
    } catch (verifyError) {
      console.error('Error verifying Firebase token:', verifyError);
      // Don't return an error, just continue without authentication
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    next();
  }
};

// Middleware to require authentication
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  next();
};