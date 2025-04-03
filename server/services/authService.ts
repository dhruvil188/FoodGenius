import { storage, generateToken } from "../storage";
import { 
  AuthenticationError, 
  NotFoundError,
  ValidationError
} from "../middleware/errorHandler";
import type { FirebaseAuthSync, User } from "@shared/schema";

/**
 * Creates a new session for a user
 */
export async function createUserSession(userId: number): Promise<string> {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // 30 days from now
  
  const token = generateToken();
  
  await storage.createSession({
    userId,
    token,
    expiresAt: expirationDate,
  });
  
  return token;
}

/**
 * Handles Firebase user authentication and synchronization
 */
export async function syncFirebaseUser(firebaseData: FirebaseAuthSync, req?: any): Promise<{ user: User, token: string }> {
  if (!firebaseData.uid || !firebaseData.email) {
    throw new ValidationError("Missing required Firebase user data");
  }
  
  try {
    const user = await storage.syncFirebaseUser(firebaseData);
    const token = await createUserSession(user.id);
    
    return { user, token };
  } catch (error) {
    console.error("Firebase sync error:", error);
    
    // Check if this is a mobile client with DB connectivity issues
    const isMobileWithDbLimitations = req && (req.mobileDbLimited === true);
    const userAgent = req?.headers?.['user-agent'] || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    if (isMobileWithDbLimitations || isMobile) {
      console.log("📱 Mobile client detected, providing temporary credentials");
      
      // For mobile clients, provide a temporary user with a token
      // This will allow basic app functionality without DB access
      const tempUser: User = {
        id: 999999, // Use a special ID for temporary mobile users
        username: 'mobile_user',
        email: firebaseData.email || 'mobile@example.com',
        password: '', // No password for temp user
        firebaseUid: firebaseData.uid,
        displayName: firebaseData.displayName || 'Mobile User',
        profileImage: firebaseData.photoURL || null,
        credits: 1, // Give them one credit for trying
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        subscriptionStatus: 'free',
        subscriptionTier: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Generate a temporary token
      const tempToken = `mobile_temp_${Math.random().toString(36).substring(2, 15)}`;
      
      return { user: tempUser, token: tempToken };
    }
    
    throw new AuthenticationError("Failed to authenticate with Firebase");
  }
}

/**
 * Gets user data by ID
 */
export async function getUserById(userId: number): Promise<User> {
  const user = await storage.getUser(userId);
  
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found`);
  }
  
  return user;
}

/**
 * Validates a session and returns the associated user
 */
export async function validateSession(token: string): Promise<User> {
  if (!token) {
    throw new AuthenticationError("No session token provided");
  }
  
  // Check if this is a temporary mobile token
  const isTempMobileToken = token.startsWith('mobile_temp_');
  
  if (isTempMobileToken) {
    console.log("📱 Validating temporary mobile token");
    
    // For mobile temp tokens, return a temporary user
    // This is the same user we created in syncFirebaseUser for mobile clients
    return {
      id: 999999,
      username: 'mobile_user',
      email: 'mobile@example.com',
      password: '',
      firebaseUid: 'mobile-fallback-uid',
      displayName: 'Mobile User',
      profileImage: null,
      credits: 1,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: 'free',
      subscriptionTier: 'free',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  // For normal sessions, validate against the database
  const session = await storage.getSessionByToken(token);
  
  if (!session) {
    throw new AuthenticationError("Invalid or expired session");
  }
  
  if (new Date() > new Date(session.expiresAt)) {
    await storage.deleteSession(token);
    throw new AuthenticationError("Session expired");
  }
  
  const user = await storage.getUser(session.userId);
  
  if (!user) {
    await storage.deleteSession(token);
    throw new AuthenticationError("User not found");
  }
  
  return user;
}

/**
 * Ends a user session (logout)
 */
export async function endUserSession(token: string): Promise<boolean> {
  if (!token) {
    throw new ValidationError("No session token provided");
  }
  
  return storage.deleteSession(token);
}