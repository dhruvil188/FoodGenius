import { firestore } from './firebase-admin';
import {
  IStorage,
  hashPassword,
  verifyPassword,
  generateToken
} from './storage';
import {
  User,
  InsertUser,
  Session,
  InsertSession,
  SavedRecipe,
  InsertSavedRecipe
} from '@shared/schema';

// Helper to convert firestore timestamps to proper format
const convertTimestampsToDate = (obj: any) => {
  const result = { ...obj };
  
  // Convert string timestamps to Date objects
  if (typeof result.createdAt === 'string') {
    result.createdAt = new Date(result.createdAt);
  }
  if (typeof result.updatedAt === 'string') {
    result.updatedAt = new Date(result.updatedAt);
  }
  if (typeof result.expiresAt === 'string') {
    result.expiresAt = new Date(result.expiresAt);
  }
  
  return result;
};

export class FirestoreStorage implements IStorage {
  private usersCollection = firestore.collection('users');
  private sessionsCollection = firestore.collection('sessions');
  private savedRecipesCollection = firestore.collection('saved_recipes');

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const snapshot = await this.usersCollection.where('id', '==', id).limit(1).get();
    if (snapshot.empty) return undefined;
    return convertTimestampsToDate(snapshot.docs[0].data()) as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const snapshot = await this.usersCollection.where('username', '==', username).limit(1).get();
    if (snapshot.empty) return undefined;
    return convertTimestampsToDate(snapshot.docs[0].data()) as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await this.usersCollection.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return undefined;
    return convertTimestampsToDate(snapshot.docs[0].data()) as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Get the highest ID for auto-increment
    const usersSnapshot = await this.usersCollection.orderBy('id', 'desc').limit(1).get();
    const nextId = usersSnapshot.empty ? 1 : (usersSnapshot.docs[0].data() as any).id + 1;

    const now = new Date();
    const user: any = {
      id: nextId,
      username: insertUser.username,
      email: insertUser.email || '',
      password: insertUser.password,
      displayName: insertUser.displayName || null,
      profileImage: null,
      createdAt: now,
      updatedAt: now,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      analysisCount: 0,
      maxAnalyses: 1, // Free tier - 1 free analysis
      planType: 'free'
    };

    await this.usersCollection.doc(nextId.toString()).set(user);
    return user as User;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const userRef = this.usersCollection.doc(id.toString());
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) return undefined;
    
    const userData = userDoc.data() as any;
    const updatedUser = {
      ...userData,
      ...updates,
      updatedAt: new Date()
    };
    
    await userRef.update(updatedUser);
    return convertTimestampsToDate(updatedUser) as User;
  }

  // Session methods
  async createSession(sessionData: InsertSession): Promise<Session> {
    // Get the highest ID for auto-increment
    const sessionsSnapshot = await this.sessionsCollection.orderBy('id', 'desc').limit(1).get();
    const nextId = sessionsSnapshot.empty ? 1 : (sessionsSnapshot.docs[0].data() as any).id + 1;

    const now = new Date();
    const session: any = {
      id: nextId,
      userId: sessionData.userId,
      token: sessionData.token,
      expiresAt: sessionData.expiresAt,
      createdAt: now
    };

    await this.sessionsCollection.doc(nextId.toString()).set(session);
    return session as Session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const snapshot = await this.sessionsCollection.where('token', '==', token).limit(1).get();
    if (snapshot.empty) return undefined;
    return convertTimestampsToDate(snapshot.docs[0].data()) as Session;
  }

  async deleteSession(token: string): Promise<boolean> {
    const snapshot = await this.sessionsCollection.where('token', '==', token).limit(1).get();
    if (snapshot.empty) return false;
    
    await this.sessionsCollection.doc(snapshot.docs[0].id).delete();
    return true;
  }

  // Saved recipe methods
  async getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
    const snapshot = await this.savedRecipesCollection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => convertTimestampsToDate(doc.data()) as SavedRecipe);
  }

  async getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
    const snapshot = await this.savedRecipesCollection.where('id', '==', id).limit(1).get();
    if (snapshot.empty) return undefined;
    return convertTimestampsToDate(snapshot.docs[0].data()) as SavedRecipe;
  }

  async createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
    // Get the highest ID for auto-increment
    const recipesSnapshot = await this.savedRecipesCollection.orderBy('id', 'desc').limit(1).get();
    const nextId = recipesSnapshot.empty ? 1 : (recipesSnapshot.docs[0].data() as any).id + 1;

    const now = new Date();
    const recipe: any = {
      id: nextId,
      userId: recipeData.userId,
      foodName: recipeData.foodName,
      description: recipeData.description || null,
      imageUrl: recipeData.imageUrl || null,
      recipeData: recipeData.recipeData,
      favorite: recipeData.favorite || false,
      tags: recipeData.tags || [],
      createdAt: now,
      updatedAt: now
    };

    await this.savedRecipesCollection.doc(nextId.toString()).set(recipe);
    return recipe as SavedRecipe;
  }

  async deleteSavedRecipe(id: number): Promise<boolean> {
    const snapshot = await this.savedRecipesCollection.where('id', '==', id).limit(1).get();
    if (snapshot.empty) return false;
    
    await this.savedRecipesCollection.doc(snapshot.docs[0].id).delete();
    return true;
  }

  async updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
    const snapshot = await this.savedRecipesCollection.where('id', '==', id).limit(1).get();
    if (snapshot.empty) return undefined;
    
    const recipeRef = this.savedRecipesCollection.doc(snapshot.docs[0].id);
    const recipeData = snapshot.docs[0].data() as any;
    
    const updatedRecipe = {
      ...recipeData,
      ...updates,
      updatedAt: new Date()
    };
    
    await recipeRef.update(updatedRecipe);
    return convertTimestampsToDate(updatedRecipe) as SavedRecipe;
  }

  // Stripe specific methods
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId: customerId } as Partial<User>);
  }

  async updateUserSubscription(userId: number, subscriptionId: string, planType: string, maxAnalyses: number): Promise<User | undefined> {
    return this.updateUser(userId, { 
      stripeSubscriptionId: subscriptionId,
      planType: planType,
      maxAnalyses: maxAnalyses
    } as Partial<User>);
  }

  async incrementAnalysisCount(userId: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    return this.updateUser(userId, { 
      analysisCount: ((user as any).analysisCount || 0) + 1 
    } as Partial<User>);
  }

  async getRemainingAnalyses(userId: number): Promise<number> {
    const user = await this.getUser(userId);
    if (!user) return 0;
    
    return Math.max(0, ((user as any).maxAnalyses || 1) - ((user as any).analysisCount || 0));
  }
}

// Export a single instance to be used throughout the application
export const firestoreStorage = new FirestoreStorage();