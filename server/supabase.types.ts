export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          username: string
          email: string
          password: string | null
          created_at: string
          display_name: string | null
          firebase_uid: string | null
          profile_image: string | null
          credits: number
          subscription_status: string
          subscription_tier: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          id?: number
          username: string
          email: string
          password?: string | null
          created_at?: string
          display_name?: string | null
          firebase_uid?: string | null
          profile_image?: string | null
          credits?: number
          subscription_status?: string
          subscription_tier?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          id?: number
          username?: string
          email?: string
          password?: string | null
          created_at?: string
          display_name?: string | null
          firebase_uid?: string | null
          profile_image?: string | null
          credits?: number
          subscription_status?: string
          subscription_tier?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
      }
      sessions: {
        Row: {
          id: number
          user_id: number
          token: string
          expires: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: number
          token: string
          expires: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: number
          token?: string
          expires?: string
          created_at?: string
        }
      }
      saved_recipes: {
        Row: {
          id: number
          user_id: number
          recipe_data: Json
          created_at: string
          food_name: string
          description: string | null
          image_url: string | null
          favorite: boolean | null
          tags: string[] | null
        }
        Insert: {
          id?: number
          user_id: number
          recipe_data: Json
          created_at?: string
          food_name: string
          description?: string | null
          image_url?: string | null
          favorite?: boolean | null
          tags?: string[] | null
        }
        Update: {
          id?: number
          user_id?: number
          recipe_data?: Json
          created_at?: string
          food_name?: string
          description?: string | null
          image_url?: string | null
          favorite?: boolean | null
          tags?: string[] | null
        }
      }
      chat_messages: {
        Row: {
          id: number
          user_id: number
          content: string
          conversation_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: number
          content: string
          conversation_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: number
          content?: string
          conversation_id?: string
          role?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}