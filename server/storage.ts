import { 
  users, sessions, savedRecipes, subscriptions, analysisUsage, payments,
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type AnalyzeImageResponse,
  type Subscription, type InsertSubscription,
  type AnalysisUsage, type InsertAnalysisUsage,
  type Payment, type InsertPayment
} from "@shared/schema";
import { randomBytes, pbkdf2Sync } from 'crypto';
import { db } from './db';
import { eq, and, gte, desc } from 'drizzle-orm';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import connectPg from 'connect-pg-simple';
import { pool } from './db';

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
  // Session store for express-session
  sessionStore: session.Store;

  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

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
  
  // Subscription methods
  getSubscription(id: number): Promise<Subscription | undefined>;
  getSubscriptionByUserId(userId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, updates: Partial<Subscription>): Promise<Subscription | undefined>;
  
  // Analysis usage methods
  getAnalysisUsage(userId: number): Promise<AnalysisUsage | undefined>;
  createAnalysisUsage(usage: InsertAnalysisUsage): Promise<AnalysisUsage>;
  updateAnalysisUsage(id: number, updates: Partial<AnalysisUsage>): Promise<AnalysisUsage | undefined>;
  incrementAnalysisCount(userId: number): Promise<AnalysisUsage | undefined>;
  
  // Payment methods
  getPaymentsByUserId(userId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  
  // User Firebase methods
  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | undefined>;
  updateUserFirebaseUid(userId: number, firebaseUid: string): Promise<User | undefined>;
  updateUserStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined>;
  markFreeAnalysisUsed(userId: number): Promise<User | undefined>;
  
  // Check if user can perform analysis
  canPerformAnalysis(userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userSessions: Map<string, Session>;
  private savedRecipes: Map<number, SavedRecipe>;
  private subscriptionsMap: Map<number, Subscription>;
  private analysisUsageMap: Map<number, AnalysisUsage>;
  private paymentsMap: Map<number, Payment>;
  private userId: number;
  private sessionId: number;
  private recipeId: number;
  private subscriptionId: number;
  private analysisUsageId: number;
  private paymentId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.userSessions = new Map();
    this.savedRecipes = new Map();
    this.subscriptionsMap = new Map();
    this.analysisUsageMap = new Map();
    this.paymentsMap = new Map();
    this.userId = 1;
    this.sessionId = 1;
    this.recipeId = 1;
    this.subscriptionId = 1;
    this.analysisUsageId = 1;
    this.paymentId = 1;
    
    // Create memory session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Add a demo account for testing
    const { hash, salt } = hashPassword('password123');
    const demoUser: User = {
      id: this.userId++,
      username: 'demo',
      email: 'demo@example.com',
      password: `${hash}:${salt}`,
      displayName: 'Demo User',
      profileImage: null,
      firebaseUid: null,
      stripeCustomerId: null,
      freeAnalysisUsed: false,
      createdAt: new Date(),
      updatedAt: new Date()
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
      firebaseUid: insertUser.firebaseUid || null,
      stripeCustomerId: insertUser.stripeCustomerId || null,
      freeAnalysisUsed: false,
      createdAt: new Date(),
      updatedAt: new Date()
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
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptionsMap.get(id);
  }
  
  async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptionsMap.values()).find(
      (subscription) => subscription.userId === userId
    );
  }
  
  async createSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionId++;
    const subscription: Subscription = {
      id,
      ...subscriptionData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.subscriptionsMap.set(id, subscription);
    return subscription;
  }
  
  async updateSubscription(id: number, updates: Partial<Subscription>): Promise<Subscription | undefined> {
    const subscription = this.subscriptionsMap.get(id);
    if (!subscription) return undefined;
    
    const updatedSubscription = { 
      ...subscription, 
      ...updates, 
      updatedAt: new Date() 
    };
    
    this.subscriptionsMap.set(id, updatedSubscription);
    return updatedSubscription;
  }
  
  // Analysis usage methods
  async getAnalysisUsage(userId: number): Promise<AnalysisUsage | undefined> {
    return Array.from(this.analysisUsageMap.values()).find(
      (usage) => usage.userId === userId
    );
  }
  
  async createAnalysisUsage(usageData: InsertAnalysisUsage): Promise<AnalysisUsage> {
    const id = this.analysisUsageId++;
    const usage: AnalysisUsage = {
      id,
      ...usageData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.analysisUsageMap.set(id, usage);
    return usage;
  }
  
  async updateAnalysisUsage(id: number, updates: Partial<AnalysisUsage>): Promise<AnalysisUsage | undefined> {
    const usage = this.analysisUsageMap.get(id);
    if (!usage) return undefined;
    
    const updatedUsage = { 
      ...usage, 
      ...updates, 
      updatedAt: new Date() 
    };
    
    this.analysisUsageMap.set(id, updatedUsage);
    return updatedUsage;
  }
  
  async incrementAnalysisCount(userId: number): Promise<AnalysisUsage | undefined> {
    const usage = await this.getAnalysisUsage(userId);
    if (!usage) return undefined;
    
    return this.updateAnalysisUsage(usage.id, {
      analysisCount: usage.analysisCount + 1
    });
  }
  
  // Payment methods
  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return Array.from(this.paymentsMap.values()).filter(
      (payment) => payment.userId === userId
    );
  }
  
  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const id = this.paymentId++;
    const payment: Payment = {
      id,
      ...paymentData,
      createdAt: new Date()
    };
    
    this.paymentsMap.set(id, payment);
    return payment;
  }
  
  // User Firebase and Stripe methods
  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.stripeCustomerId === stripeCustomerId
    );
  }
  
  async updateUserFirebaseUid(userId: number, firebaseUid: string): Promise<User | undefined> {
    return this.updateUser(userId, { firebaseUid });
  }
  
  async updateUserStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId });
  }
  
  async markFreeAnalysisUsed(userId: number): Promise<User | undefined> {
    return this.updateUser(userId, { freeAnalysisUsed: true });
  }
  
  // Check if user can perform analysis
  async canPerformAnalysis(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;
    
    // Check if user has used their free analysis
    if (!user.freeAnalysisUsed) {
      return true;
    }
    
    // Check if user has an active subscription
    const subscription = await this.getSubscriptionByUserId(userId);
    if (!subscription || subscription.status !== 'active') {
      return false;
    }
    
    // Check if user has exceeded their analysis limit
    const usage = await this.getAnalysisUsage(userId);
    if (!usage) {
      return true; // No usage tracking yet
    }
    
    // For unlimited plan, always return true
    if (subscription.planType === 'unlimited') {
      return true;
    }
    
    // Otherwise check against the limit
    return usage.analysisCount < usage.analysisLimit;
  }
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    // Create PostgreSQL session store
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Session methods
  async createSession(sessionData: InsertSession): Promise<Session> {
    const [session] = await db.insert(sessions).values(sessionData).returning();
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.token, token),
          gte(sessions.expiresAt, new Date())
        )
      );
    return session;
  }

  async deleteSession(token: string): Promise<boolean> {
    const result = await db
      .delete(sessions)
      .where(eq(sessions.token, token));
    return true; // In drizzle, delete doesn't return the count
  }

  // Saved recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    return db
      .select()
      .from(savedRecipes)
      .where(eq(savedRecipes.userId, userId))
      .orderBy(desc(savedRecipes.createdAt));
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    const [recipe] = await db
      .select()
      .from(savedRecipes)
      .where(eq(savedRecipes.id, id));
    return recipe;
  }

  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const [recipe] = await db
      .insert(savedRecipes)
      .values(recipeData)
      .returning();
    return recipe;
  }

  async deleteSavedRecipe(id: number): Promise<boolean> {
    await db
      .delete(savedRecipes)
      .where(eq(savedRecipes.id, id));
    return true;
  }

  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const [recipe] = await db
      .update(savedRecipes)
      .set(updates)
      .where(eq(savedRecipes.id, id))
      .returning();
    return recipe;
  }
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, id));
    return subscription;
  }
  
  async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
    return subscription;
  }
  
  async createSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(subscriptionData)
      .returning();
    return subscription;
  }
  
  async updateSubscription(id: number, updates: Partial<Subscription>): Promise<Subscription | undefined> {
    const [subscription] = await db
      .update(subscriptions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return subscription;
  }
  
  // Analysis usage methods
  async getAnalysisUsage(userId: number): Promise<AnalysisUsage | undefined> {
    const [usage] = await db
      .select()
      .from(analysisUsage)
      .where(eq(analysisUsage.userId, userId))
      .orderBy(desc(analysisUsage.createdAt));
    return usage;
  }
  
  async createAnalysisUsage(usageData: InsertAnalysisUsage): Promise<AnalysisUsage> {
    const [usage] = await db
      .insert(analysisUsage)
      .values(usageData)
      .returning();
    return usage;
  }
  
  async updateAnalysisUsage(id: number, updates: Partial<AnalysisUsage>): Promise<AnalysisUsage | undefined> {
    const [usage] = await db
      .update(analysisUsage)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(analysisUsage.id, id))
      .returning();
    return usage;
  }
  
  async incrementAnalysisCount(userId: number): Promise<AnalysisUsage | undefined> {
    const usage = await this.getAnalysisUsage(userId);
    if (!usage) return undefined;
    
    const [updatedUsage] = await db
      .update(analysisUsage)
      .set({
        analysisCount: usage.analysisCount + 1,
        updatedAt: new Date()
      })
      .where(eq(analysisUsage.id, usage.id))
      .returning();
    
    return updatedUsage;
  }
  
  // Payment methods
  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.paymentDate));
  }
  
  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(paymentData)
      .returning();
    return payment;
  }
  
  // User Firebase and Stripe methods
  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, stripeCustomerId));
    return user;
  }
  
  async updateUserFirebaseUid(userId: number, firebaseUid: string): Promise<User | undefined> {
    return this.updateUser(userId, { firebaseUid });
  }
  
  async updateUserStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId });
  }
  
  async markFreeAnalysisUsed(userId: number): Promise<User | undefined> {
    return this.updateUser(userId, { freeAnalysisUsed: true });
  }
  
  // Check if user can perform analysis
  async canPerformAnalysis(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;
    
    // Check if user has used their free analysis
    if (!user.freeAnalysisUsed) {
      return true;
    }
    
    // Check if user has an active subscription
    const subscription = await this.getSubscriptionByUserId(userId);
    if (!subscription || subscription.status !== 'active') {
      return false;
    }
    
    // Check if user has exceeded their analysis limit
    const usage = await this.getAnalysisUsage(userId);
    if (!usage) {
      return true; // No usage tracking yet
    }
    
    // For unlimited plan, always return true
    if (subscription.planType === 'unlimited') {
      return true;
    }
    
    // Otherwise check against the limit
    return usage.analysisCount < usage.analysisLimit;
  }
}

// Uncomment the following line to use PostgreSQL database
// export const storage = new DatabaseStorage();

// Use in-memory storage for now
export const storage = new MemStorage();
