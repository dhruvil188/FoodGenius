import { 
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type SavedDietPlan, type InsertSavedDietPlan
} from "@shared/schema";
import { hashPassword, verifyPassword, generateToken } from './utils';

// Dynamically import to avoid circular dependency
import { databaseStorage } from './databaseStorage';

// Re-export utility functions from utils.ts
export { hashPassword, verifyPassword, generateToken };

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
  
  // Diet plan methods
  getSavedDietPlans(userId: number): Promise<SavedDietPlan[]>;
  getSavedDietPlanById(id: number): Promise<SavedDietPlan | undefined>;
  createSavedDietPlan(dietPlan: InsertSavedDietPlan): Promise<SavedDietPlan>;
  deleteSavedDietPlan(id: number): Promise<boolean>;
  updateSavedDietPlan(id: number, dietPlan: Partial<SavedDietPlan>): Promise<SavedDietPlan | undefined>;
}

// Use the database storage implementation
export const storage = databaseStorage;