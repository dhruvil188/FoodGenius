// Define Supabase database types based on our schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          username: string;
          email: string;
          password: string | null;
          displayName: string | null;
          profileImage: string | null;
          firebaseUid: string | null;
          stripeCustomerId: string | null;
          stripeSubscriptionId: string | null;
          credits: number;
          subscriptionTier: string;
          subscriptionStatus: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          username: string;
          email: string;
          password?: string | null;
          displayName?: string | null;
          profileImage?: string | null;
          firebaseUid?: string | null;
          stripeCustomerId?: string | null;
          stripeSubscriptionId?: string | null;
          credits?: number;
          subscriptionTier?: string;
          subscriptionStatus?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          username?: string;
          email?: string;
          password?: string | null;
          displayName?: string | null;
          profileImage?: string | null;
          firebaseUid?: string | null;
          stripeCustomerId?: string | null;
          stripeSubscriptionId?: string | null;
          credits?: number;
          subscriptionTier?: string;
          subscriptionStatus?: string;
          created_at?: string;
        };
      };
      saved_recipes: {
        Row: {
          id: number;
          userId: number;
          foodName: string;
          description: string | null;
          tags: string[] | null;
          imageUrl: string | null;
          recipeData: Json;
          favorite: boolean | null;
          createdAt: string;
        };
        Insert: {
          id?: number;
          userId: number;
          foodName: string;
          description?: string | null;
          tags?: string[] | null;
          imageUrl?: string | null;
          recipeData: Json;
          favorite?: boolean | null;
          createdAt?: string;
        };
        Update: {
          id?: number;
          userId?: number;
          foodName?: string;
          description?: string | null;
          tags?: string[] | null;
          imageUrl?: string | null;
          recipeData?: Json;
          favorite?: boolean | null;
          createdAt?: string;
        };
      };
      sessions: {
        Row: {
          id: number;
          userId: number;
          token: string;
          expires: string;
        };
        Insert: {
          id?: number;
          userId: number;
          token: string;
          expires: string;
        };
        Update: {
          id?: number;
          userId?: number;
          token?: string;
          expires?: string;
        };
      };
      chat_messages: {
        Row: {
          id: number;
          userId: number;
          conversationId: string;
          content: string;
          role: string;
          timestamp: string;
        };
        Insert: {
          id?: number;
          userId: number;
          conversationId: string;
          content: string;
          role: string;
          timestamp?: string;
        };
        Update: {
          id?: number;
          userId?: number;
          conversationId?: string;
          content?: string;
          role?: string;
          timestamp?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}