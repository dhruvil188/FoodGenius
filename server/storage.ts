import { 
  users, sessions, savedRecipes,
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type AnalyzeImageResponse
} from "@shared/schema";
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

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByStripeCustomerId(customerId: string): Promise<User | undefined>;
  getUserByFirebaseId(firebaseId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Subscription methods
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User>;
  updateUserCredits(userId: number, credits: number): Promise<User>;

  // Session methods
  createSession(session: InsertSession): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<boolean>;

  // Saved recipe methods
  getSavedRecipes(userId: number): Promise<SavedRecipe[]>;
  getSavedRecipeById(id: number): Promise<SavedRecipe | undefined>;
  createSavedRecipe(recipe: InsertSavedRecipe): Promise<SavedRecipe>;
  deleteSavedRecipe(id: number): Promise<boolean>;
  updateSavedRecipe(id: number, recipe: Partial<SavedRecipe>): Promise<SavedRecipe | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userSessions: Map<string, Session>;
  private savedRecipes: Map<number, SavedRecipe>;
  private userId: number;
  private sessionId: number;
  private recipeId: number;

  constructor() {
    this.users = new Map();
    this.userSessions = new Map();
    this.savedRecipes = new Map();
    this.userId = 1;
    this.sessionId = 1;
    this.recipeId = 1;
    
    // Add a demo account for testing
    const { hash, salt } = hashPassword('password123');
    const demoUser: User = {
      id: this.userId++,
      username: 'demo',
      email: 'demo@example.com',
      password: `${hash}:${salt}`,
      displayName: 'Demo User',
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      credits: 1,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: 'free',
      subscriptionTier: 'free'
    };
    this.users.set(demoUser.id, demoUser);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.stripeCustomerId === customerId
    );
  }
  
  async getUserByFirebaseId(firebaseId: string): Promise<User | undefined> {
    // In a real implementation with Firebase, we'd map Firebase UIDs to our user IDs
    // For now, we'll try to find a user by checking if their email contains the Firebase UID
    // This is just a simple mapping for demo purposes
    const lowerFirebaseId = firebaseId.toLowerCase();
    
    // First try to find user by email that might contain the firebase ID
    let user = Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase().includes(lowerFirebaseId)
    );
    
    // If not found, just use the first user as a fallback (for demo purposes)
    if (!user && this.users.size > 0) {
      user = Array.from(this.users.values())[0];
    }
    
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const { hash, salt } = hashPassword(insertUser.password);
    
    const user: User = { 
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: `${hash}:${salt}`,
      displayName: insertUser.displayName || null,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      credits: 1, // Start with one free credit
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: 'free',
      subscriptionTier: 'free'
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Subscription methods
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = await this.updateUser(userId, { 
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
    
    const updatedUser = await this.updateUser(userId, { 
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
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = await this.updateUser(userId, { credits });
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return updatedUser;
  }

  // Session methods
  async createSession(sessionData: InsertSession): Promise<Session> {
    const id = this.sessionId++;
    const session: Session = {
      ...sessionData,
      id,
      createdAt: new Date()
    };
    
    this.userSessions.set(session.token, session);
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const session = this.userSessions.get(token);
    
    if (!session) return undefined;
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      this.userSessions.delete(token);
      return undefined;
    }
    
    return session;
  }

  async deleteSession(token: string): Promise<boolean> {
    return this.userSessions.delete(token);
  }

  // Saved recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    return Array.from(this.savedRecipes.values()).filter(
      (recipe) => recipe.userId === userId
    );
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    return this.savedRecipes.get(id);
  }

  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const id = this.recipeId++;
    const recipe: SavedRecipe = {
      id,
      userId: recipeData.userId,
      recipeData: recipeData.recipeData,
      foodName: recipeData.foodName,
      description: recipeData.description || null,
      imageUrl: recipeData.imageUrl || null,
      tags: recipeData.tags || null,
      favorite: recipeData.favorite || null,
      createdAt: new Date()
    };
    
    this.savedRecipes.set(id, recipe);
    return recipe;
  }

  async deleteSavedRecipe(id: number): Promise<boolean> {
    return this.savedRecipes.delete(id);
  }

  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const recipe = this.savedRecipes.get(id);
    if (!recipe) return undefined;

    const updatedRecipe = { ...recipe, ...updates };
    this.savedRecipes.set(id, updatedRecipe);
    return updatedRecipe;
  }
}

export const storage = new MemStorage();
