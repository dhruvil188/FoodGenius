import { 
  User, InsertUser, 
  Session, InsertSession,
  SavedRecipe, InsertSavedRecipe,
  Transaction, InsertTransaction,
  AnalyzeImageResponse
} from "@shared/schema";
import { IStorage } from "./storage";
import * as firebaseService from "./services/firebaseService";
import { randomBytes, pbkdf2Sync } from 'crypto';

// Utility functions for authentication
export function hashPassword(password: string, salt?: string): { hash: string, salt: string } {
  const generatedSalt = salt || randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, generatedSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

export class FirebaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const userDoc = await firebaseService.usersCollection.doc(id.toString()).get();
      if (!userDoc.exists) {
        return undefined;
      }
      return { id, ...userDoc.data() as User };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return firebaseService.getUserByUsername(username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return firebaseService.getUserByEmail(email);
  }

  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    try {
      const snapshot = await firebaseService.usersCollection
        .where('stripeCustomerId', '==', customerId)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return undefined;
      }
      
      const userData = snapshot.docs[0].data();
      return {
        id: parseInt(snapshot.docs[0].id),
        ...userData as User
      };
    } catch (error) {
      console.error('Error getting user by Stripe customer ID:', error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash the password before creating the user
    const { hash, salt } = hashPassword(insertUser.password);
    const hashedPassword = `${hash}:${salt}`;
    
    // Try to create a Firebase auth user
    let firebaseUid = undefined;
    try {
      // Only create Firebase auth user if email/password is used
      firebaseUid = await firebaseService.createFirebaseUser(
        insertUser.email, 
        insertUser.password,
        insertUser.displayName || undefined
      );
    } catch (error) {
      console.warn('Could not create Firebase auth user:', error);
      // Continue anyway, as we're storing in Firestore
    }
    
    // Create the user record in Firestore
    return firebaseService.createUser({
      ...insertUser,
      password: hashedPassword
    }, firebaseUid);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    return firebaseService.updateUser(id, updates);
  }

  // Subscription methods
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = await firebaseService.updateUser(userId, { 
      stripeCustomerId: customerId 
    });
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return updatedUser;
  }

  async updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = await firebaseService.updateUser(userId, { 
      stripeCustomerId: stripeInfo.customerId,
      stripeSubscriptionId: stripeInfo.subscriptionId,
      subscriptionStatus: 'active',
      subscriptionTier: 'basic', // Can be 'basic', 'premium' etc.
      credits: user.credits ? user.credits + 20 : 20 // Start with 20 credits for basic plan
    });
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return updatedUser;
  }

  async updateUserCredits(userId: number, credits: number): Promise<User> {
    return firebaseService.updateUserCredits(userId, credits);
  }

  // Session methods
  async createSession(sessionData: InsertSession): Promise<Session> {
    return firebaseService.createSession(sessionData);
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    return firebaseService.getSessionByToken(token);
  }

  async deleteSession(token: string): Promise<boolean> {
    return firebaseService.deleteSession(token);
  }

  // Saved recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    return firebaseService.getSavedRecipes(userId);
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    return firebaseService.getSavedRecipeById(id);
  }

  async createSavedRecipe(recipe: InsertSavedRecipe): Promise<SavedRecipe> {
    return firebaseService.createSavedRecipe(recipe);
  }

  async deleteSavedRecipe(id: number): Promise<boolean> {
    return firebaseService.deleteSavedRecipe(id);
  }

  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    return firebaseService.updateSavedRecipe(id, updates);
  }

  // Transaction methods for credit purchases
  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    return firebaseService.createTransaction(transactionData);
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return firebaseService.getUserTransactions(userId);
  }

  async getTransactionBySessionId(sessionId: string): Promise<Transaction | undefined> {
    return firebaseService.getTransactionBySessionId(sessionId);
  }

  async updateTransactionStatus(id: number, status: string, paymentIntentId?: string): Promise<Transaction | undefined> {
    return firebaseService.updateTransactionStatus(id, status, paymentIntentId);
  }
}

// Export an instance of the Firebase storage
export const firebaseStorage = new FirebaseStorage();