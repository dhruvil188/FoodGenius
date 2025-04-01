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
}

export class MemStorage implements IStorage {
  // Make savedRecipes accessible for debugging purposes in this file only
  savedRecipes: Map<number, SavedRecipe>;
  private users: Map<number, User>;
  private userSessions: Map<string, Session>;
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
      password: hash,
      salt: salt,
      displayName: 'Demo User',
      profileImage: null,
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const { hash, salt } = hashPassword(insertUser.password);
    
    const user: User = { 
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: hash,
      salt: salt,
      displayName: insertUser.displayName || null,
      profileImage: null,
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
    console.log("Getting saved recipes for user ID:", userId);
    console.log("All saved recipes:", Array.from(this.savedRecipes.entries()));
    
    // Enhanced debugging
    const allRecipesList = Array.from(this.savedRecipes.values());
    console.log("All recipes list:", allRecipesList);
    console.log("Recipe user IDs:", allRecipesList.map(r => r.userId));
    
    // Further comparison debugging
    allRecipesList.forEach(recipe => {
      console.log(`Recipe ID ${recipe.id}: userId=${recipe.userId}, comparing to ${userId}, equal: ${recipe.userId === userId}`);
    });
    
    const userRecipes = allRecipesList.filter(recipe => recipe.userId === userId);
    
    console.log("Filtered recipes for user:", userRecipes);
    return userRecipes;
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    return this.savedRecipes.get(id);
  }

  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const id = this.recipeId++;
    console.log("Creating saved recipe with ID:", id, "for user:", recipeData.userId);
    
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
    
    // Store the recipe in the map
    this.savedRecipes.set(id, recipe);
    
    // Verify storage
    console.log("Saved recipe verified in storage:", this.savedRecipes.has(id));
    console.log("Current savedRecipes map size:", this.savedRecipes.size);
    console.log("All saved recipe IDs:", Array.from(this.savedRecipes.keys()));
    
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
