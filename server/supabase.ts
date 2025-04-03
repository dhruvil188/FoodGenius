import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase.types';

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_KEY environment variables.');
}

// Create a Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // We manage our own sessions
    autoRefreshToken: false
  }
});

// Function to check if Supabase connection is working
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    console.log(`Checking Supabase connection to ${supabaseUrl}...`);
    
    // Try to fetch a small amount of data to test the connection
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error('Supabase connection test failed:', error);
      
      // Check if it's a "relation does not exist" error, which means the connection works
      // but the table doesn't exist yet
      if (error.code === '42P01') {
        console.log('✓ Supabase connection successful, but tables need to be created');
        return true;
      }
      
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}