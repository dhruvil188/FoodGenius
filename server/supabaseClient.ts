import { createClient } from '@supabase/supabase-js';
import { Database } from './supabaseTypes'; // We'll create this later

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);