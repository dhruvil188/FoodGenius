import { supabase } from './supabase';
import { IStorage } from './storage';
import { 
  User, 
  InsertUser, 
  Session, 
  InsertSession, 
  SavedRecipe, 
  InsertSavedRecipe, 
  ChatMessage, 
  InsertChatMessage,
  AppUser,
  AnalyzeImageResponse
} from '@shared/schema';
import { generateRecipe } from './services/aiService';
import crypto from 'crypto';

/**
 * Implements the storage interface using Supabase
 */
export class SupabaseStorage implements IStorage {
  /**
   * Converts a database user to an AppUser format for frontend use
   */
  convertToAppUser(user: User): AppUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName || user.username,
      profileImage: user.profileImage || null,
      credits: user.credits || 0,
      subscriptionStatus: user.subscriptionStatus || 'free',
      subscriptionTier: user.subscriptionTier || 'free'
    };
  }

  /**
   * Gets a user by their ID
   */
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) {
      console.error('Error fetching user by ID:', error);
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Gets a user by their username
   */
  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
      
    if (error || !data) {
      // Not found is not an error in this context
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user by username:', error);
      }
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Gets a user by their email
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error || !data) {
      // Not found is not an error in this context
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user by email:', error);
      }
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Gets a user by their Firebase UID
   */
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', firebaseUid)
      .single();
      
    if (error || !data) {
      // Not found is not an error in this context
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user by Firebase UID:', error);
      }
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Gets a user by their Stripe customer ID
   */
  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();
      
    if (error || !data) {
      console.error('Error fetching user by Stripe customer ID:', error);
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Creates a new user
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    const dbUser = {
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      display_name: insertUser.displayName,
      firebase_uid: insertUser.firebaseUid,
      profile_image: insertUser.profileImage,
      credits: insertUser.credits || 3,
      subscription_status: insertUser.subscriptionStatus || 'free',
      subscription_tier: insertUser.subscriptionTier || 'free',
      stripe_customer_id: insertUser.stripeCustomerId || null,
      stripe_subscription_id: insertUser.stripeSubscriptionId || null,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(dbUser)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Updates an existing user
   */
  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const dbUpdates: any = {};
    
    if (updates.username) dbUpdates.username = updates.username;
    if (updates.email) dbUpdates.email = updates.email;
    if (updates.password) dbUpdates.password = updates.password;
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.firebaseUid !== undefined) dbUpdates.firebase_uid = updates.firebaseUid;
    if (updates.profileImage !== undefined) dbUpdates.profile_image = updates.profileImage;
    if (updates.credits !== undefined) dbUpdates.credits = updates.credits;
    if (updates.subscriptionStatus) dbUpdates.subscription_status = updates.subscriptionStatus;
    if (updates.subscriptionTier) dbUpdates.subscription_tier = updates.subscriptionTier;
    if (updates.stripeCustomerId !== undefined) dbUpdates.stripe_customer_id = updates.stripeCustomerId;
    if (updates.stripeSubscriptionId !== undefined) dbUpdates.stripe_subscription_id = updates.stripeSubscriptionId;
    
    const { data, error } = await supabase
      .from('users')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Updates a user's Stripe customer ID
   */
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error updating Stripe customer ID:', error);
      throw new Error(`Failed to update Stripe customer ID: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Updates a user's Stripe information
   */
  async updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        stripe_customer_id: stripeInfo.customerId,
        stripe_subscription_id: stripeInfo.subscriptionId,
        subscription_status: 'active',
        subscription_tier: 'premium',
        credits: 999 // Unlimited credits for premium subscribers
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error updating user Stripe info:', error);
      throw new Error(`Failed to update user Stripe info: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Updates a user's credits
   */
  async updateUserCredits(userId: number, credits: number): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ credits })
      .eq('id', userId)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error updating user credits:', error);
      throw new Error(`Failed to update user credits: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbUserToUser(data);
  }
  
  /**
   * Syncs a Firebase user with our database
   */
  async syncFirebaseUser(firebaseData: { uid: string, email: string, displayName: string | null, photoURL: string | null }): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.getUserByFirebaseUid(firebaseData.uid);
    
    if (existingUser) {
      // Update existing user with latest Firebase profile data
      const updated = await this.updateUser(existingUser.id, {
        email: firebaseData.email,
        displayName: firebaseData.displayName || existingUser.displayName,
        profileImage: firebaseData.photoURL || existingUser.profileImage
      });
      
      if (!updated) {
        throw new Error('Failed to update existing user profile');
      }
      
      console.log('🔄 Updated existing user profile:', existingUser.id);
      return updated;
    }
    
    // User doesn't exist, create a new one
    const userByEmail = await this.getUserByEmail(firebaseData.email);
    
    if (userByEmail) {
      // User exists with this email but no Firebase UID, link accounts
      const updated = await this.updateUser(userByEmail.id, {
        firebaseUid: firebaseData.uid,
        displayName: firebaseData.displayName || userByEmail.displayName,
        profileImage: firebaseData.photoURL || userByEmail.profileImage
      });
      
      if (!updated) {
        throw new Error('Failed to link Firebase account to existing email');
      }
      
      console.log('🔄 Linked Firebase account to existing email:', userByEmail.id);
      return updated;
    }
    
    // Create completely new user
    const username = await this.generateUniqueUsername(
      firebaseData.email,
      firebaseData.displayName
    );
    
    const newUser = await this.createUser({
      username,
      email: firebaseData.email,
      password: null, // No password for Firebase users
      displayName: firebaseData.displayName || username,
      profileImage: firebaseData.photoURL,
      firebaseUid: firebaseData.uid,
      credits: 3, // Default free credits
      subscriptionStatus: 'free',
      subscriptionTier: 'free'
    });
    
    console.log('✅ Created new user from Firebase auth:', newUser.id, username);
    return newUser;
  }
  
  /**
   * Generates a unique username for new users
   */
  private async generateUniqueUsername(email: string, displayName: string | null): Promise<string> {
    // Try to generate a username from display name or email
    let baseUsername = '';
    
    if (displayName) {
      // Convert display name to lowercase and remove special characters
      baseUsername = displayName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    } else {
      // Use email without domain and special characters
      baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
    
    // Check if username is available
    const exists = await this.getUserByUsername(baseUsername);
    if (!exists) return baseUsername;
    
    // Add random number if username is taken
    for (let i = 1; i <= 100; i++) {
      const candidateUsername = `${baseUsername}_${i}`;
      const exists = await this.getUserByUsername(candidateUsername);
      if (!exists) return candidateUsername;
    }
    
    // Last resort: Add random string
    const randomStr = crypto.randomBytes(4).toString('hex');
    return `${baseUsername}_${randomStr}`;
  }
  
  /**
   * Creates a new session
   */
  async createSession(sessionData: InsertSession): Promise<Session> {
    const dbSession = {
      user_id: sessionData.userId,
      token: sessionData.token,
      expires: sessionData.expires.toISOString(),
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('sessions')
      .insert(dbSession)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error creating session:', error);
      throw new Error(`Failed to create session: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbSessionToSession(data);
  }
  
  /**
   * Gets a session by token
   */
  async getSessionByToken(token: string): Promise<Session | undefined> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('token', token)
      .single();
      
    if (error || !data) {
      // Not found is not an error in this context
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching session by token:', error);
      }
      return undefined;
    }
    
    return this.mapDbSessionToSession(data);
  }
  
  /**
   * Deletes a session by token
   */
  async deleteSession(token: string): Promise<boolean> {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('token', token);
      
    if (error) {
      console.error('Error deleting session:', error);
      return false;
    }
    
    return true;
  }
  
  /**
   * Gets all saved recipes for a user
   */
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching saved recipes:', error);
      return [];
    }
    
    return (data || []).map(this.mapDbRecipeToSavedRecipe);
  }
  
  /**
   * Gets a saved recipe by ID
   */
  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) {
      console.error('Error fetching saved recipe by ID:', error);
      return undefined;
    }
    
    return this.mapDbRecipeToSavedRecipe(data);
  }
  
  /**
   * Creates a new saved recipe
   */
  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    const dbRecipe = {
      user_id: recipeData.userId,
      recipe_data: recipeData.recipeData,
      food_name: recipeData.foodName,
      description: recipeData.description,
      image_url: recipeData.imageUrl,
      favorite: recipeData.favorite || false,
      tags: recipeData.tags || [],
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('saved_recipes')
      .insert(dbRecipe)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error creating saved recipe:', error);
      throw new Error(`Failed to create saved recipe: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbRecipeToSavedRecipe(data);
  }
  
  /**
   * Deletes a saved recipe
   */
  async deleteSavedRecipe(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting saved recipe:', error);
      return false;
    }
    
    return true;
  }
  
  /**
   * Updates a saved recipe
   */
  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const dbUpdates: any = {};
    
    if (updates.foodName) dbUpdates.food_name = updates.foodName;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;
    if (updates.favorite !== undefined) dbUpdates.favorite = updates.favorite;
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
    if (updates.recipeData !== undefined) dbUpdates.recipe_data = updates.recipeData;
    
    const { data, error } = await supabase
      .from('saved_recipes')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating saved recipe:', error);
      return undefined;
    }
    
    return this.mapDbRecipeToSavedRecipe(data);
  }
  
  /**
   * Creates a new chat message
   */
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const dbMessage = {
      user_id: message.userId,
      content: message.content,
      conversation_id: message.conversationId,
      role: message.role,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(dbMessage)
      .select()
      .single();
      
    if (error || !data) {
      console.error('Error creating chat message:', error);
      throw new Error(`Failed to create chat message: ${error?.message || 'Unknown error'}`);
    }
    
    return this.mapDbMessageToChatMessage(data);
  }
  
  /**
   * Gets all chat messages for a conversation
   */
  async getChatMessages(userId: number, conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }
    
    return (data || []).map(this.mapDbMessageToChatMessage);
  }
  
  /**
   * Gets all conversations for a user
   */
  async getConversations(userId: number): Promise<{ id: string, lastMessage: ChatMessage }[]> {
    // This query gets the newest message for each conversation
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
    
    // Group messages by conversation and get the latest for each
    const conversations = new Map<string, any>();
    
    for (const message of data || []) {
      if (!conversations.has(message.conversation_id)) {
        conversations.set(message.conversation_id, message);
      }
    }
    
    return Array.from(conversations.entries()).map(([id, message]) => ({
      id,
      lastMessage: this.mapDbMessageToChatMessage(message)
    }));
  }
  
  /**
   * Deletes all messages in a conversation
   */
  async deleteConversation(userId: number, conversationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId)
      .eq('conversation_id', conversationId);
      
    if (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
    
    return true;
  }
  
  /**
   * Generates a recipe from a chat prompt
   */
  async createRecipeFromChatPrompt(
    userId: number, 
    prompt: string, 
    conversationId: string = `conv_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`
  ): Promise<{ recipe: AnalyzeImageResponse, message: ChatMessage }> {
    // Save the user's message
    const userMessage = await this.createChatMessage({
      userId,
      content: prompt,
      conversationId,
      role: 'user'
    });
    
    try {
      // Generate recipe from prompt
      const recipe = await generateRecipe(prompt, userId);
      
      // Save the AI response message with the recipe
      const responseContent = JSON.stringify({
        type: 'recipe',
        recipe
      });
      
      const aiMessage = await this.createChatMessage({
        userId,
        content: responseContent,
        conversationId,
        role: 'model'
      });
      
      return {
        recipe,
        message: aiMessage
      };
    } catch (error) {
      console.error('Error generating recipe from chat prompt:', error);
      
      // Save error message as AI response
      const errorMessage = await this.createChatMessage({
        userId,
        content: JSON.stringify({
          type: 'error',
          error: 'Failed to generate recipe. Please try again with a different prompt.'
        }),
        conversationId,
        role: 'model'
      });
      
      throw error;
    }
  }
  
  // Helper methods to map Supabase data to our schema
  
  private mapDbUserToUser(dbUser: any): User {
    return {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password,
      createdAt: new Date(dbUser.created_at),
      displayName: dbUser.display_name,
      firebaseUid: dbUser.firebase_uid,
      profileImage: dbUser.profile_image,
      credits: dbUser.credits || 0,
      subscriptionStatus: dbUser.subscription_status || 'free',
      subscriptionTier: dbUser.subscription_tier || 'free',
      stripeCustomerId: dbUser.stripe_customer_id,
      stripeSubscriptionId: dbUser.stripe_subscription_id
    };
  }
  
  private mapDbSessionToSession(dbSession: any): Session {
    return {
      id: dbSession.id,
      userId: dbSession.user_id,
      token: dbSession.token,
      expires: new Date(dbSession.expires),
      createdAt: new Date(dbSession.created_at)
    };
  }
  
  private mapDbRecipeToSavedRecipe(dbRecipe: any): SavedRecipe {
    return {
      id: dbRecipe.id,
      userId: dbRecipe.user_id,
      recipeData: dbRecipe.recipe_data,
      createdAt: new Date(dbRecipe.created_at),
      foodName: dbRecipe.food_name,
      description: dbRecipe.description,
      imageUrl: dbRecipe.image_url,
      favorite: dbRecipe.favorite,
      tags: dbRecipe.tags
    };
  }
  
  private mapDbMessageToChatMessage(dbMessage: any): ChatMessage {
    return {
      id: dbMessage.id,
      userId: dbMessage.user_id,
      content: dbMessage.content,
      conversationId: dbMessage.conversation_id,
      role: dbMessage.role,
      createdAt: new Date(dbMessage.created_at)
    };
  }
}

// Export a singleton instance
export const supabaseStorage = new SupabaseStorage();