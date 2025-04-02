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
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByStripeCustomerId(customerId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  syncFirebaseUser(firebaseData: { uid: string, email: string, displayName: string | null, photoURL: string | null }): Promise<User>;
  
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
      firebaseUid: null,
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
  
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.firebaseUid === firebaseUid
    );
  }

  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.stripeCustomerId === customerId
    );
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
      firebaseUid: null,
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
  
  async syncFirebaseUser(firebaseData: { uid: string, email: string, displayName: string | null, photoURL: string | null }): Promise<User> {
    console.log("📝 Firebase Sync - Received user data:", { 
      uid: firebaseData.uid, 
      email: firebaseData.email,
      displayName: firebaseData.displayName
    });
    
    // First, check if the user already exists with this Firebase UID
    let user = await this.getUserByFirebaseUid(firebaseData.uid);
    
    if (user) {
      console.log("✅ Found existing user with Firebase UID:", user.id, user.username);
      
      // User exists, update their profile data if needed
      const updatedUser = await this.updateUser(user.id, {
        email: firebaseData.email, // Update in case the email changed in Firebase
        displayName: firebaseData.displayName,
        profileImage: firebaseData.photoURL,
        updatedAt: new Date()
      });
      
      if (!updatedUser) {
        console.error("❌ Failed to update existing user:", user.id);
        throw new Error('Failed to update existing user');
      }
      
      console.log("🔄 Updated existing user profile:", updatedUser.id);
      return updatedUser;
    }
    
    // Check if a user with this email already exists
    user = await this.getUserByEmail(firebaseData.email);
    
    if (user) {
      console.log("📧 Found existing user with email:", user.id, user.username);
      
      // User exists but isn't linked to Firebase yet, update their profile
      const updatedUser = await this.updateUser(user.id, {
        firebaseUid: firebaseData.uid,
        displayName: firebaseData.displayName || user.displayName,
        profileImage: firebaseData.photoURL || user.profileImage,
        updatedAt: new Date()
      });
      
      if (!updatedUser) {
        console.error("❌ Failed to link existing user:", user.id);
        throw new Error('Failed to link existing user');
      }
      
      console.log("🔗 Linked existing account with Firebase UID:", updatedUser.id);
      return updatedUser;
    }
    
    console.log("🆕 Creating new user for Firebase account");
    
    // Create a new user
    const username = await this.generateUniqueUsername(firebaseData.email, firebaseData.displayName);
    console.log("👤 Generated unique username:", username);
    
    const randomPassword = Math.random().toString(36).substring(2, 15);
    const { hash, salt } = hashPassword(randomPassword);
    
    const newUser: User = {
      id: this.userId++,
      username,
      email: firebaseData.email,
      password: `${hash}.${salt}`,
      displayName: firebaseData.displayName,
      profileImage: firebaseData.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      firebaseUid: firebaseData.uid,
      credits: 1, // Start with one free credit
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: 'free',
      subscriptionTier: 'free'
    };
    
    this.users.set(newUser.id, newUser);
    console.log("✨ Created new user:", { 
      id: newUser.id, 
      username: newUser.username, 
      email: newUser.email,
      firebaseUid: newUser.firebaseUid 
    });
    return newUser;
  }
  
  private async generateUniqueUsername(email: string, displayName: string | null): Promise<string> {
    // Start with the part before @ in the email
    let baseUsername = email.split('@')[0].toLowerCase();
    
    // If displayName is available, use that instead
    if (displayName) {
      // Convert display name to lowercase, replace spaces with underscores
      baseUsername = displayName.toLowerCase().replace(/\s+/g, '_');
    }
    
    // Remove special characters
    baseUsername = baseUsername.replace(/[^a-z0-9_]/g, '');
    
    // Ensure username is at least 3 characters
    if (baseUsername.length < 3) {
      baseUsername = baseUsername + '000'.substring(0, 3 - baseUsername.length);
    }
    
    // Check if username already exists
    let username = baseUsername;
    let counter = 1;
    
    while (await this.getUserByUsername(username)) {
      // If username exists, append a number
      username = `${baseUsername}${counter}`;
      counter++;
    }
    
    return username;
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
    console.log("🔑 Created new session:", { 
      id: session.id, 
      userId: session.userId, 
      token: session.token.substring(0, 10) + '...',
      expires: session.expiresAt
    });
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
