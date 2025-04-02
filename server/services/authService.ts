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
export async function syncFirebaseUser(firebaseData: FirebaseAuthSync): Promise<{ user: User, token: string }> {
  if (!firebaseData.uid || !firebaseData.email) {
    throw new ValidationError("Missing required Firebase user data");
  }
  
  try {
    const user = await storage.syncFirebaseUser(firebaseData);
    const token = await createUserSession(user.id);
    
    return { user, token };
  } catch (error) {
    console.error("Firebase sync error:", error);
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