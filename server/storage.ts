import { 
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type ChatMessage, type InsertChatMessage,
  type AnalyzeImageResponse,
  type AppUser
} from "@shared/schema";
import { hashPassword, verifyPassword, generateToken } from './utils';

// Import storage implementations
import { databaseStorage } from './databaseStorage';
import { supabaseStorage } from './supabaseStorage';

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
  
  // Helper methods
  convertToAppUser(user: User): AppUser;
  
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
  
  // Chat message methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(userId: number, conversationId: string): Promise<ChatMessage[]>;
  getConversations(userId: number): Promise<{ id: string, lastMessage: ChatMessage }[]>;
  deleteConversation(userId: number, conversationId: string): Promise<boolean>;
  createRecipeFromChatPrompt(userId: number, prompt: string, conversationId?: string): Promise<{
    recipe: AnalyzeImageResponse, 
    message: ChatMessage
  }>;
}

// Use the Supabase storage implementation
export const storage = supabaseStorage;

// Uncomment the line below to revert to PostgreSQL database storage
// export const storage = databaseStorage;