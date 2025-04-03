import { supabase } from './supabaseClient';

// Supabase connection status tracking
let isSupabaseConnected = false;

// Check Supabase connection
async function checkSupabaseConnection() {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error("ERROR: Supabase environment variables not found");
      return false;
    }
    
    // Test Supabase connection by querying users
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error("Supabase connection error:", error.message);
      return false;
    }
    
    console.log("Supabase connection successful");
    isSupabaseConnected = true;
    return true;
  } catch (error) {
    console.error("Supabase connection error:", error);
    return false;
  }
}

// Initialize the database connection
export async function initializeDatabase() {
  try {
    // Check Supabase connection
    const connected = await checkSupabaseConnection();
    
    if (!connected) {
      console.error("CRITICAL: Failed to connect to Supabase");
      console.error("Make sure SUPABASE_URL and SUPABASE_ANON_KEY environment variables are set correctly");
      return false;
    }
    
    console.log("Using Supabase for database operations");
    return true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return false;
  }
}

// Initialize database asynchronously but don't block module loading
initializeDatabase().catch(err => {
  console.error("Failed to initialize database:", err);
});

// Export connection status
export const isDatabaseConnected = () => isSupabaseConnected;
