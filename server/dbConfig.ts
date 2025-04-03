/**
 * Database configuration helper
 * Used to provide consistent database connection configuration across the application
 */

// Function to get database connection URL with fallbacks
export function getDatabaseUrl(): string {
  // First try environment variable
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Then try individual connection parameters (commonly used in some deployment platforms)
  if (process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER && process.env.PGPASSWORD) {
    const host = process.env.PGHOST;
    const database = process.env.PGDATABASE;
    const user = process.env.PGUSER;
    const password = process.env.PGPASSWORD;
    const port = process.env.PGPORT || '5432';
    
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }

  // For development, use a default local connection
  if (process.env.NODE_ENV !== 'production') {
    console.warn('No database connection details found, using default local PostgreSQL connection');
    
    // Try to create a valid local connection
    try {
      // Try to use environment variable if set
      const hostname = process.env.HOSTNAME || '';
      
      // Check if we're on Replit
      if (hostname.includes('replit')) {
        console.log('Running on Replit, using neon connection...');
        // If on Replit, try to connect to the Neon serverless database
        // This matches how neon configures environment variables on Replit
        return 'postgresql://postgres:postgres@localhost:5432/recipe_snap?sslmode=require';
      } else {
        // Local development fallback
        return 'postgresql://postgres:postgres@localhost:5432/recipe_snap';
      }
    } catch (err) {
      console.error('Error constructing development database URL:', err);
      return 'postgresql://postgres:postgres@localhost:5432/recipe_snap';
    }
  }
  
  // Last resort for production - show clear error but don't crash immediately
  console.error('============= DATABASE CONNECTION ERROR =============');
  console.error('No database connection details found. The application requires either:');
  console.error('1. DATABASE_URL environment variable, or');
  console.error('2. PGHOST, PGDATABASE, PGUSER, and PGPASSWORD environment variables');
  console.error('Check your deployment configuration and make sure these values are set.');
  console.error('============= DATABASE CONNECTION ERROR =============');
  
  // Return a placeholder that will cause an error when connecting, but allow the app to start
  return 'postgresql://invalid:invalid@invalid:5432/invalid?application_name=recipe_snap_error';
}