import { 
  users, sessions, savedRecipes, savedDietPlans,
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type SavedDietPlan, type InsertSavedDietPlan,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import { hashPassword, verifyPassword, generateToken } from "./utils";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
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
    if (!firebaseUid) return undefined;
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user;
  }

  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    if (!customerId) return undefined;
    const [user] = await db.select().from(users).where(eq(users.stripeCustomerId, customerId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { hash, salt } = hashPassword(insertUser.password);
    
    const [user] = await db.insert(users).values({ 
      ...insertUser,
      password: `${hash}:${salt}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    console.log("✨ Created new user in database:", { 
      id: user.id, 
      username: user.username, 
      email: user.email
    });
    
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  // Subscription methods
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({ 
        stripeCustomerId: customerId,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!updatedUser) {
      throw new Error('Failed to update user with Stripe customer ID');
    }
    
    return updatedUser;
  }

  async updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({ 
        stripeCustomerId: stripeInfo.customerId,
        stripeSubscriptionId: stripeInfo.subscriptionId,
        subscriptionStatus: 'active',
        subscriptionTier: 'basic',
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!updatedUser) {
      throw new Error('Failed to update user with subscription info');
    }
    
    return updatedUser;
  }

  async updateUserCredits(userId: number, credits: number): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({ 
        credits,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!updatedUser) {
      throw new Error('Failed to update user credits');
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
    
    const [newUser] = await db.insert(users).values({
      username,
      email: firebaseData.email,
      password: `${hash}:${salt}`,
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
    }).returning();
    
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
    const [session] = await db.insert(sessions).values({
      ...sessionData,
      createdAt: new Date()
    }).returning();
    
    console.log("🔑 Created new session:", { 
      id: session.id, 
      userId: session.userId, 
      token: session.token.substring(0, 10) + '...',
      expires: session.expiresAt
    });
    
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    
    if (!session) return undefined;
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      await db.delete(sessions).where(eq(sessions.token, token));
      return undefined;
    }
    
    return session;
  }

  async deleteSession(token: string): Promise<boolean> {
    const result = await db.delete(sessions).where(eq(sessions.token, token));
    return !!result;
  }

  // Saved recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    return db.select()
      .from(savedRecipes)
      .where(eq(savedRecipes.userId, userId))
      .orderBy(desc(savedRecipes.createdAt));
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    const [recipe] = await db.select().from(savedRecipes).where(eq(savedRecipes.id, id));
    return recipe;
  }

  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const [recipe] = await db.insert(savedRecipes).values({
      ...recipeData,
      createdAt: new Date()
    }).returning();
    
    return recipe;
  }

  async deleteSavedRecipe(id: number): Promise<boolean> {
    const result = await db.delete(savedRecipes).where(eq(savedRecipes.id, id));
    return !!result;
  }

  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const [updatedRecipe] = await db.update(savedRecipes)
      .set(updates)
      .where(eq(savedRecipes.id, id))
      .returning();
    
    return updatedRecipe;
  }

  // Diet plan methods
  async getSavedDietPlans(userId: number): Promise<SavedDietPlan[]> {
    return db.select()
      .from(savedDietPlans)
      .where(eq(savedDietPlans.userId, userId))
      .orderBy(desc(savedDietPlans.createdAt));
  }

  async getSavedDietPlanById(id: number): Promise<SavedDietPlan | undefined> {
    const [dietPlan] = await db.select().from(savedDietPlans).where(eq(savedDietPlans.id, id));
    return dietPlan;
  }

  async createSavedDietPlan(dietPlanData: InsertSavedDietPlan): Promise<SavedDietPlan> {
    const [dietPlan] = await db.insert(savedDietPlans).values({
      ...dietPlanData,
      createdAt: new Date()
    }).returning();
    
    return dietPlan;
  }

  async deleteSavedDietPlan(id: number): Promise<boolean> {
    const result = await db.delete(savedDietPlans).where(eq(savedDietPlans.id, id));
    return !!result;
  }

  async updateSavedDietPlan(id: number, updates: Partial<SavedDietPlan>): Promise<SavedDietPlan | undefined> {
    const [updatedDietPlan] = await db.update(savedDietPlans)
      .set(updates)
      .where(eq(savedDietPlans.id, id))
      .returning();
    
    return updatedDietPlan;
  }
}

export const databaseStorage = new DatabaseStorage();