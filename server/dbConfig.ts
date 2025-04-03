/**
 * Database configuration helper
 * Used to provide consistent database connection configuration across the application
 */

// Function to get database connection URL with fallbacks
export function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    console.error('DATABASE_URL environment variable is required in production');
    throw new Error('Missing required DATABASE_URL environment variable');
  }

  // For development, use a default local connection
  console.warn('No DATABASE_URL found, using default local PostgreSQL connection');
  return 'postgresql://postgres:postgres@localhost:5432/recipe_snap';
}