import admin from 'firebase-admin';
import { 
  User, InsertUser, 
  Session, InsertSession,
  SavedRecipe, InsertSavedRecipe,
  Transaction, InsertTransaction,
  AnalyzeImageResponse
} from '@shared/schema';

// Initialize Firebase Admin
if (!process.env.VITE_FIREBASE_PROJECT_ID) {
  throw new Error('Missing Firebase project ID environment variable');
}

// We need to use environment variables for the Firebase admin config
// Initialize the app if it hasn't been initialized yet
let firebaseApp;
try {
  firebaseApp = admin.app();
} catch (error) {
  firebaseApp = admin.initializeApp({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    // If you have a service account key, you'd use this:
    // credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
  });
}

const db = admin.firestore();
const auth = admin.auth();

// Collection references
export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const savedRecipesCollection = db.collection('savedRecipes');
export const transactionsCollection = db.collection('transactions');

// Helper functions
export async function createFirebaseUser(email: string, password: string, displayName?: string): Promise<string> {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName || undefined,
    });
    return userRecord.uid;
  } catch (error) {
    console.error('Error creating Firebase user:', error);
    throw error;
  }
}

export async function getFirebaseUser(uid: string) {
  try {
    return await auth.getUser(uid);
  } catch (error) {
    console.error('Error getting Firebase user:', error);
    throw error;
  }
}

// User CRUD operations
export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const snapshot = await usersCollection.where('email', '==', email).limit(1).get();
    
    if (snapshot.empty) {
      return undefined;
    }
    
    const userData = snapshot.docs[0].data() as Omit<User, 'id'>;
    return {
      id: parseInt(snapshot.docs[0].id),
      ...userData
    };
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  try {
    const snapshot = await usersCollection.where('username', '==', username).limit(1).get();
    
    if (snapshot.empty) {
      return undefined;
    }
    
    const userData = snapshot.docs[0].data();
    return {
      id: parseInt(snapshot.docs[0].id),
      ...userData as User
    };
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
}

export async function createUser(userData: InsertUser, firebaseUid?: string): Promise<User> {
  try {
    // Get the next user ID by querying for the highest existing ID
    const snapshot = await usersCollection.orderBy('id', 'desc').limit(1).get();
    
    let nextId = 1;
    if (!snapshot.empty) {
      const highestId = snapshot.docs[0].data().id;
      nextId = highestId + 1;
    }
    
    const user: User = {
      id: nextId,
      username: userData.username,
      email: userData.email,
      password: userData.password, // Note: In Firebase, this should be a hashed version or not stored at all
      displayName: userData.displayName || null,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      credits: 1, // Start with one free credit
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: 'free',
      subscriptionTier: 'free',
      firebaseUid: firebaseUid || null, // Store the Firebase UID for reference
    };
    
    await usersCollection.doc(nextId.toString()).set(user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
  try {
    const userRef = usersCollection.doc(id.toString());
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return undefined;
    }
    
    const updatedData = {
      ...updates,
      updatedAt: new Date()
    };
    
    await userRef.update(updatedData);
    
    const updatedDoc = await userRef.get();
    return {
      id,
      ...updatedDoc.data() as User
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Credit-related operations
export async function updateUserCredits(userId: number, credits: number): Promise<User> {
  try {
    const userRef = usersCollection.doc(userId.toString());
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    
    await userRef.update({
      credits,
      updatedAt: new Date()
    });
    
    const updatedDoc = await userRef.get();
    return {
      id: userId,
      ...updatedDoc.data() as User
    };
  } catch (error) {
    console.error('Error updating user credits:', error);
    throw error;
  }
}

// Saved recipes operations
export async function getSavedRecipes(userId: number): Promise<SavedRecipe[]> {
  try {
    const snapshot = await savedRecipesCollection.where('userId', '==', userId).get();
    
    return snapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data() as SavedRecipe
    }));
  } catch (error) {
    console.error('Error getting saved recipes:', error);
    throw error;
  }
}

export async function createSavedRecipe(recipeData: InsertSavedRecipe): Promise<SavedRecipe> {
  try {
    // Get the next recipe ID by querying for the highest existing ID
    const snapshot = await savedRecipesCollection.orderBy('id', 'desc').limit(1).get();
    
    let nextId = 1;
    if (!snapshot.empty) {
      const highestId = snapshot.docs[0].data().id;
      nextId = highestId + 1;
    }
    
    const recipe: SavedRecipe = {
      id: nextId,
      userId: recipeData.userId,
      recipeData: recipeData.recipeData,
      foodName: recipeData.foodName,
      description: recipeData.description || null,
      imageUrl: recipeData.imageUrl || null,
      tags: recipeData.tags || [],
      favorite: recipeData.favorite || false,
      createdAt: new Date()
    };
    
    await savedRecipesCollection.doc(nextId.toString()).set(recipe);
    return recipe;
  } catch (error) {
    console.error('Error creating saved recipe:', error);
    throw error;
  }
}

export async function getSavedRecipeById(id: number): Promise<SavedRecipe | undefined> {
  try {
    const recipeDoc = await savedRecipesCollection.doc(id.toString()).get();
    
    if (!recipeDoc.exists) {
      return undefined;
    }
    
    return {
      id,
      ...recipeDoc.data() as SavedRecipe
    };
  } catch (error) {
    console.error('Error getting saved recipe by ID:', error);
    throw error;
  }
}

export async function updateSavedRecipe(id: number, updates: Partial<SavedRecipe>): Promise<SavedRecipe | undefined> {
  try {
    const recipeRef = savedRecipesCollection.doc(id.toString());
    const recipeDoc = await recipeRef.get();
    
    if (!recipeDoc.exists) {
      return undefined;
    }
    
    await recipeRef.update(updates);
    
    const updatedDoc = await recipeRef.get();
    return {
      id,
      ...updatedDoc.data() as SavedRecipe
    };
  } catch (error) {
    console.error('Error updating saved recipe:', error);
    throw error;
  }
}

export async function deleteSavedRecipe(id: number): Promise<boolean> {
  try {
    const recipeRef = savedRecipesCollection.doc(id.toString());
    const recipeDoc = await recipeRef.get();
    
    if (!recipeDoc.exists) {
      return false;
    }
    
    await recipeRef.delete();
    return true;
  } catch (error) {
    console.error('Error deleting saved recipe:', error);
    throw error;
  }
}

// Session management
export async function createSession(sessionData: InsertSession): Promise<Session> {
  try {
    // Get the next session ID by querying for the highest existing ID
    const snapshot = await sessionsCollection.orderBy('id', 'desc').limit(1).get();
    
    let nextId = 1;
    if (!snapshot.empty) {
      const highestId = snapshot.docs[0].data().id;
      nextId = highestId + 1;
    }
    
    const session: Session = {
      id: nextId,
      userId: sessionData.userId,
      token: sessionData.token,
      expiresAt: sessionData.expiresAt,
      createdAt: new Date()
    };
    
    await sessionsCollection.doc(nextId.toString()).set(session);
    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function getSessionByToken(token: string): Promise<Session | undefined> {
  try {
    const snapshot = await sessionsCollection.where('token', '==', token).limit(1).get();
    
    if (snapshot.empty) {
      return undefined;
    }
    
    const sessionData = snapshot.docs[0].data();
    
    // Check if session is expired
    if (new Date() > new Date(sessionData.expiresAt)) {
      await sessionsCollection.doc(snapshot.docs[0].id).delete();
      return undefined;
    }
    
    return {
      id: parseInt(snapshot.docs[0].id),
      ...sessionData as Session
    };
  } catch (error) {
    console.error('Error getting session by token:', error);
    throw error;
  }
}

export async function deleteSession(token: string): Promise<boolean> {
  try {
    const snapshot = await sessionsCollection.where('token', '==', token).limit(1).get();
    
    if (snapshot.empty) {
      return false;
    }
    
    await sessionsCollection.doc(snapshot.docs[0].id).delete();
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

// Transaction management for credits
export async function createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
  try {
    // Get the next transaction ID
    const snapshot = await transactionsCollection.orderBy('id', 'desc').limit(1).get();
    
    let nextId = 1;
    if (!snapshot.empty) {
      const highestId = snapshot.docs[0].data().id;
      nextId = highestId + 1;
    }
    
    const transaction: Transaction = {
      id: nextId,
      userId: transactionData.userId,
      amount: transactionData.amount,
      credits: transactionData.credits,
      stripeSessionId: transactionData.stripeSessionId || null,
      stripePaymentIntentId: transactionData.stripePaymentIntentId || null,
      status: transactionData.status,
      createdAt: new Date()
    };
    
    await transactionsCollection.doc(nextId.toString()).set(transaction);
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function getUserTransactions(userId: number): Promise<Transaction[]> {
  try {
    const snapshot = await transactionsCollection.where('userId', '==', userId).orderBy('createdAt', 'desc').get();
    
    return snapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data() as Transaction
    }));
  } catch (error) {
    console.error('Error getting user transactions:', error);
    throw error;
  }
}

export async function getTransactionBySessionId(sessionId: string): Promise<Transaction | undefined> {
  try {
    const snapshot = await transactionsCollection.where('stripeSessionId', '==', sessionId).limit(1).get();
    
    if (snapshot.empty) {
      return undefined;
    }
    
    return {
      id: parseInt(snapshot.docs[0].id),
      ...snapshot.docs[0].data() as Transaction
    };
  } catch (error) {
    console.error('Error getting transaction by session ID:', error);
    throw error;
  }
}

export async function updateTransactionStatus(id: number, status: string, paymentIntentId?: string): Promise<Transaction | undefined> {
  try {
    const transactionRef = transactionsCollection.doc(id.toString());
    const transactionDoc = await transactionRef.get();
    
    if (!transactionDoc.exists) {
      return undefined;
    }
    
    const updates: Partial<Transaction> = { status };
    if (paymentIntentId) {
      updates.stripePaymentIntentId = paymentIntentId;
    }
    
    await transactionRef.update(updates);
    
    const updatedDoc = await transactionRef.get();
    return {
      id,
      ...updatedDoc.data() as Transaction
    };
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
}