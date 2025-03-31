// This file exposes environment variables to the client
// These variables are fetched from the server at runtime

// Initialize with empty values
let SUPABASE_URL = '';
let SUPABASE_ANON_KEY = '';

// Function to fetch environment variables from the server
const fetchEnvironmentVariables = async () => {
  try {
    const response = await fetch('/api/environment');
    if (!response.ok) {
      throw new Error('Failed to fetch environment variables');
    }
    const data = await response.json();
    
    // Update the exported variables
    SUPABASE_URL = data.SUPABASE_URL;
    SUPABASE_ANON_KEY = data.SUPABASE_ANON_KEY;
    
    // Return true if we have valid values
    return checkEnvironment();
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    return false;
  }
};

// For debugging purposes - don't show actual keys in console
const checkEnvironment = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase credentials are missing. Authentication will not work.');
    return false;
  }
  console.log('Supabase environment variables are properly configured.');
  return true;
};

// Immediately fetch environment variables
fetchEnvironmentVariables().catch(console.error);

// Export the variables and functions
export { SUPABASE_URL, SUPABASE_ANON_KEY, checkEnvironment, fetchEnvironmentVariables };