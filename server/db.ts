import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { getDatabaseUrl } from './dbConfig';

// Configure NeonDB to use WebSockets
neonConfig.webSocketConstructor = ws;

// Initialize pool with connection string
let pool: Pool;
let isDbConnected = false;

// Create a function to initialize the database connection
export async function initializeDatabase() {
  try {
    const connectionString = getDatabaseUrl();
    console.log("Attempting to connect to PostgreSQL database...");
    
    // Create a new pool with the connection string
    pool = new Pool({ connectionString });
    
    // Test the connection with a timeout
    const connectionTest = await Promise.race([
      pool.query('SELECT NOW()'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timeout')), 5000))
    ]);
    
    console.log("Database connection successful");
    isDbConnected = true;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    
    // Create a meaningful error message
    let errorMessage = "Database connection failed: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += "Unknown error";
    }
    
    // Different handling for production vs development
    if (process.env.NODE_ENV === 'production') {
      console.error("CRITICAL: Database connection failed in production");
      console.error("Make sure DATABASE_URL or PGHOST, PGUSER, PGPASSWORD, and PGDATABASE environment variables are set.");
      
      // In production, create a placeholder pool that will throw clear errors
      // This allows the application to at least start and show error messages
      pool = new Pool({ 
        connectionString: 'postgresql://placeholder:placeholder@placeholder:5432/placeholder',
        max: 1 
      });
      isDbConnected = false;
      
      // Create a proper pool._clients array to avoid "Cannot read property 'release' of undefined" errors
      (pool as any)._clients = [];
    } else {
      console.warn("WARNING: Database connection failed in development");
      console.warn("Trying to continue with fallback in-memory storage where possible...");
      
      // In development, we'll try to create a working pool anyway to prevent startup errors
      pool = new Pool({ 
        connectionString: 'postgresql://postgres:postgres@localhost:5432/recipe_snap',
        max: 1
      });
      
      // Some routes may still work without DB access
      isDbConnected = false;
    }
    
    return false;
  }
}

// Initialize the pool with a placeholder that will be replaced
pool = new Pool({ 
  connectionString: 'postgresql://placeholder:placeholder@placeholder:5432/placeholder',
  max: 1 
});

// Initialize database asynchronously but don't block module loading
initializeDatabase().catch(err => {
  console.error("Failed to initialize database:", err);
});

// Export Drizzle instance and connection status
export const db = drizzle(pool, { schema });
export const isDatabaseConnected = () => isDbConnected;
