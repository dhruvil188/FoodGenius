import { supabase } from './supabaseClient';
import { 
  type User, type InsertUser, 
  type Session, type InsertSession,
  type SavedRecipe, type InsertSavedRecipe,
  type ChatMessage, type InsertChatMessage,
  type AppUser
} from '@shared/schema';
import { IStorage } from './storage';
import { hashPassword, generateToken } from './utils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalyzeImageResponse } from './services/geminiService';
import { createId } from '@paralleldrive/cuid2';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class DatabaseStorage implements IStorage {
  // User-related methods
  convertToAppUser(user: User): AppUser {
    const { password, ...appUser } = user;
    return appUser as AppUser;
  }

  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
      
    if (error || !data) return undefined;
    return data as User;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error || !data) return undefined;
    return data as User;
  }
  
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('firebaseUid', firebaseUid)
      .single();
      
    if (error || !data) return undefined;
    return data as User;
  }
  
  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('stripeCustomerId', customerId)
      .single();
      
    if (error || !data) return undefined;
    return data as User;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password if provided
    let userWithHashedPassword = { ...insertUser };
    if (insertUser.password) {
      const { hash, salt } = hashPassword(insertUser.password);
      userWithHashedPassword.password = `${hash}.${salt}`;
    }
    
    // Add default values for new users
    const userWithDefaults = {
      ...userWithHashedPassword,
      credits: insertUser.credits ?? 3,
      subscriptionTier: insertUser.subscriptionTier ?? 'free',
      subscriptionStatus: insertUser.subscriptionStatus ?? 'active',
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(userWithDefaults)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data as User;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) return undefined;
    return data as User;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ stripeCustomerId: customerId })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to update stripe customer ID: ${error.message}`);
    return data as User;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        stripeCustomerId: stripeInfo.customerId,
        stripeSubscriptionId: stripeInfo.subscriptionId,
        subscriptionTier: 'premium',
        subscriptionStatus: 'active'
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to update user stripe info: ${error.message}`);
    return data as User;
  }
  
  async updateUserCredits(userId: number, credits: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error(`User not found: ${userId}`);
    
    const { data, error } = await supabase
      .from('users')
      .update({ credits })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to update user credits: ${error.message}`);
    return data as User;
  }
  
  async syncFirebaseUser(firebaseData: { uid: string, email: string, displayName: string | null, photoURL: string | null }): Promise<User> {
    // Check if user already exists
    const existingUser = await this.getUserByFirebaseUid(firebaseData.uid);
    
    if (existingUser) {
      // Update existing user's profile if needed
      const updates: Partial<User> = {};
      if (firebaseData.displayName && existingUser.displayName !== firebaseData.displayName) {
        updates.displayName = firebaseData.displayName;
      }
      if (firebaseData.photoURL && existingUser.profileImage !== firebaseData.photoURL) {
        updates.profileImage = firebaseData.photoURL;
      }
      
      // Only update if there are changes
      if (Object.keys(updates).length > 0) {
        const updatedUser = await this.updateUser(existingUser.id, updates);
        return updatedUser || existingUser;
      }
      
      return existingUser;
    } else {
      // Create new user
      const username = await this.generateUniqueUsername(
        firebaseData.email, 
        firebaseData.displayName
      );
      
      const newUser: InsertUser = {
        username,
        email: firebaseData.email,
        displayName: firebaseData.displayName || username,
        profileImage: firebaseData.photoURL || null,
        firebaseUid: firebaseData.uid,
        password: null, // Firebase users don't need password
        credits: 3, // Default credits
        subscriptionTier: 'free',
        subscriptionStatus: 'active',
      };
      
      return await this.createUser(newUser);
    }
  }
  
  private async generateUniqueUsername(email: string, displayName: string | null): Promise<string> {
    // Try to use the part before @ in email
    let baseUsername = email.split('@')[0];
    
    // Or use displayName if available
    if (displayName) {
      baseUsername = displayName.toLowerCase().replace(/\s+/g, '_');
    }
    
    // Remove special characters
    baseUsername = baseUsername.replace(/[^a-z0-9_]/gi, '');
    
    // Check if username exists
    const exists = await this.getUserByUsername(baseUsername);
    if (!exists) return baseUsername;
    
    // If username exists, add a numeric suffix
    for (let i = 1; i <= 100; i++) {
      const candidateUsername = `${baseUsername}_${i}`;
      const exists = await this.getUserByUsername(candidateUsername);
      if (!exists) return candidateUsername;
    }
    
    // If we still can't find a unique name, use a random one
    return `user_${Math.floor(Math.random() * 10000)}`;
  }
  
  // Session-related methods
  async createSession(sessionData: InsertSession): Promise<Session> {
    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create session: ${error.message}`);
    return data as Session;
  }
  
  async getSessionByToken(token: string): Promise<Session | undefined> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('token', token)
      .single();
      
    if (error || !data) return undefined;
    return data as Session;
  }
  
  async deleteSession(token: string): Promise<boolean> {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('token', token);
      
    return !error;
  }
  
  // Saved Recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
      
    if (error) throw new Error(`Failed to get saved recipes: ${error.message}`);
    return data as SavedRecipe[];
  }
  
  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) return undefined;
    return data as SavedRecipe;
  }
  
  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const now = new Date().toISOString();
    const dataWithTimestamp = {
      ...recipeData,
      createdAt: recipeData.createdAt || now,
      favorite: recipeData.favorite || false
    };
    
    const { data, error } = await supabase
      .from('saved_recipes')
      .insert(dataWithTimestamp)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create saved recipe: ${error.message}`);
    return data as SavedRecipe;
  }
  
  async deleteSavedRecipe(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('id', id);
      
    return !error;
  }
  
  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) return undefined;
    return data as SavedRecipe;
  }
  
  // Chat message methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const now = new Date().toISOString();
    const messageWithTimestamp = {
      ...message,
      timestamp: message.timestamp || now,
    };
    
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(messageWithTimestamp)
      .select()
      .single();
      
    if (error) throw new Error(`Failed to create chat message: ${error.message}`);
    return data as ChatMessage;
  }
  
  async getChatMessages(userId: number, conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('userId', userId)
      .eq('conversationId', conversationId)
      .order('timestamp', { ascending: true });
      
    if (error) throw new Error(`Failed to get chat messages: ${error.message}`);
    return data as ChatMessage[];
  }
  
  async getConversations(userId: number): Promise<{ id: string, lastMessage: ChatMessage }[]> {
    // Get all messages for the user
    const { data: allMessages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('userId', userId)
      .order('timestamp', { ascending: false });
      
    if (error) throw new Error(`Failed to get conversations: ${error.message}`);
    
    // Group by conversationId
    const conversationMap = new Map<string, ChatMessage[]>();
    for (const message of allMessages) {
      if (!conversationMap.has(message.conversationId)) {
        conversationMap.set(message.conversationId, []);
      }
      conversationMap.get(message.conversationId)!.push(message);
    }
    
    // Return with last message for each conversation
    return Array.from(conversationMap.entries()).map(([id, messages]) => {
      // Sort messages to get the most recent one
      messages.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      return { id, lastMessage: messages[0] };
    });
  }
  
  async deleteConversation(userId: number, conversationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('userId', userId)
      .eq('conversationId', conversationId);
      
    return !error;
  }
  
  async createRecipeFromChatPrompt(userId: number, prompt: string, conversationId?: string): Promise<{
    recipe: AnalyzeImageResponse,
    message: ChatMessage
  }> {
    try {
      // Create or use existing conversation ID
      const convId = conversationId || createId();
      
      // Save user message
      const userMessage: InsertChatMessage = {
        userId,
        conversationId: convId,
        content: prompt,
        role: 'user'
      };
      await this.createChatMessage(userMessage);
      
      // Generate recipe using Gemini API
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        },
      });
    
      const promptText = `You are a professional chef and cooking assistant. Create a recipe based on the following request: "${prompt}". Respond in this JSON format:
      {
        "name": "Recipe Name",
        "description": "A brief description of the dish",
        "ingredients": ["Ingredient 1", "Ingredient 2", ...],
        "instructions": ["Step 1", "Step 2", ...],
        "cookingTime": "Total cooking time in minutes",
        "servings": "Number of servings",
        "difficulty": "easy/medium/hard",
        "tags": ["Tag1", "Tag2", ...],
        "variations": ["Variation 1", "Variation 2", ...],
        "tips": ["Tip 1", "Tip 2", ...],
        "pairings": ["Pairing 1", "Pairing 2", ...]
      }`;
      
      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();
      
      // Extract JSON from text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Failed to generate a valid recipe response");
      }
      
      const recipeJson = JSON.parse(jsonMatch[0]);
      
      // Create a standardized recipe object
      const recipeResponse: AnalyzeImageResponse = {
        name: recipeJson.name,
        description: recipeJson.description,
        ingredients: recipeJson.ingredients,
        instructions: recipeJson.instructions,
        cookingTime: recipeJson.cookingTime,
        servings: recipeJson.servings,
        difficulty: recipeJson.difficulty,
        tags: recipeJson.tags,
        variations: recipeJson.variations,
        tips: recipeJson.tips,
        pairings: recipeJson.pairings
      };
      
      // Save AI response message
      const aiMessage: InsertChatMessage = {
        userId,
        conversationId: convId,
        content: JSON.stringify(recipeResponse),
        role: 'assistant'
      };
      const savedMessage = await this.createChatMessage(aiMessage);
      
      return {
        recipe: recipeResponse,
        message: savedMessage
      };
    } catch (error) {
      console.error('Error generating recipe from prompt:', error);
      throw new Error(`Failed to generate recipe: ${error.message}`);
    }
  }
}

export const databaseStorage = new DatabaseStorage();