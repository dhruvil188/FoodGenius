/**
 * Database configuration helper
 * Used to provide consistent database connection configuration across the application
 */

// Function to get database connection URL with fallbacks
export function getDatabaseUrl(): string {
  // Check for DATABASE_URL environment variable
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Alternative: construct from individual environment variables if available
  if (process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER && process.env.PGPASSWORD) {
    const host = process.env.PGHOST;
    const database = process.env.PGDATABASE;
    const user = process.env.PGUSER;
    const password = process.env.PGPASSWORD;
    const port = process.env.PGPORT || '5432';
    
    return `postgres://${user}:${password}@${host}:${port}/${database}`;
  }
  
  // If we get here, we don't have any database connection info
  throw new Error("DATABASE_URL or PostgreSQL credentials environment variables not found");
}