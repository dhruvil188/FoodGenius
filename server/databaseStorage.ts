import { 
  users, sessions, savedRecipes, chatMessages, 
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type ChatMessage, type InsertChatMessage,
  type AnalyzeImageResponse,
  type AppUser
} from "@shared/schema";
import { db, isDatabaseConnected } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import { hashPassword, verifyPassword, generateToken } from "./utils";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // Helper method to convert a full user to an AppUser (public user profile)
  convertToAppUser(user: User): AppUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      profileImage: user.profileImage,
      credits: user.credits || 0,
      subscriptionStatus: user.subscriptionStatus || undefined,
      subscriptionTier: user.subscriptionTier || undefined,
    };
  }
  
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

  // Chat message methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values({
      ...message,
      createdAt: new Date()
    }).returning();
    
    return newMessage;
  }

  async getChatMessages(userId: number, conversationId: string): Promise<ChatMessage[]> {
    return db.select()
      .from(chatMessages)
      .where(and(
        eq(chatMessages.userId, userId),
        eq(chatMessages.conversationId, conversationId)
      ))
      .orderBy(chatMessages.createdAt);
  }

  async getConversations(userId: number): Promise<{ id: string, lastMessage: ChatMessage }[]> {
    // Get the most recent message from each conversation for this user
    const result = await db.execute(sql`
      WITH ranked_messages AS (
        SELECT 
          *, 
          ROW_NUMBER() OVER (PARTITION BY conversation_id ORDER BY created_at DESC) as rn
        FROM chat_messages
        WHERE user_id = ${userId}
      )
      SELECT * FROM ranked_messages
      WHERE rn = 1
      ORDER BY created_at DESC
    `);
    
    // Parse the result into our expected format
    const conversations = result.rows.map((row: any) => {
      const message = {
        id: row.id,
        userId: row.user_id,
        content: row.content,
        role: row.role,
        conversationId: row.conversation_id,
        recipeOutput: row.recipe_output,
        createdAt: row.created_at
      } as ChatMessage;
      
      return {
        id: String(row.conversation_id), // Explicitly convert to string
        lastMessage: message
      };
    });
    
    return conversations;
  }

  async deleteConversation(userId: number, conversationId: string): Promise<boolean> {
    // Delete all messages in the conversation for this user
    const result = await db
      .delete(chatMessages)
      .where(
        and(
          eq(chatMessages.userId, userId),
          eq(chatMessages.conversationId, conversationId)
        )
      )
      .returning();
    
    return result.length > 0;
  }

  // This method is a pass-through to the chat service
  // The actual implementation is in chatService.ts
  async createRecipeFromChatPrompt(userId: number, prompt: string, conversationId?: string): Promise<{
    recipe: AnalyzeImageResponse,
    message: ChatMessage
  }> {
    // Create a unique conversation ID if not provided
    const actualConversationId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Create the user message in the database
    const userMessage = await this.createChatMessage({
      userId,
      content: prompt,
      role: "user",
      conversationId: actualConversationId,
    });
    
    try {
      // Forward to the chat service - we need to dynamically import to avoid circular dependencies
      const { generateRecipeFromPrompt } = await import('./services/chatService');
      return await generateRecipeFromPrompt(userId, prompt, actualConversationId, userMessage);
    } catch (error) {
      console.error("Error in createRecipeFromChatPrompt:", error);
      
      // Create an error message
      const errorMessage = await this.createChatMessage({
        userId,
        content: `Sorry, I couldn't generate a recipe from your prompt. Error: ${(error as Error).message || 'Unknown error'}`,
        role: "assistant",
        conversationId: actualConversationId,
      });
      
      // Return a basic error response
      return {
        recipe: {
          foodName: "Error Generating Recipe",
          description: `Sorry, I couldn't generate a recipe. Error: ${(error as Error).message || 'Unknown error'}`,
          tags: ["error"],
          recipes: [],
        },
        message: errorMessage,
      };
    }
  }
}

export const databaseStorage = new DatabaseStorage();