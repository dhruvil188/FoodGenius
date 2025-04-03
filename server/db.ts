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
    pool = new Pool({ connectionString });
    console.log("Connecting to PostgreSQL database...");
    
    // Test the connection
    await pool.query('SELECT NOW()');
    console.log("Database connection successful");
    isDbConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
    
    if (process.env.NODE_ENV === 'production') {
      console.error("CRITICAL: Database connection failed in production");
      console.error("Make sure DATABASE_URL or PGHOST, PGUSER, PGPASSWORD, and PGDATABASE environment variables are set.");
      
      // In production, we'll create a placeholder pool that will throw clear errors
      // This allows the application to at least start and show error messages
      pool = new Pool({ 
        connectionString: 'postgresql://placeholder:placeholder@placeholder:5432/placeholder',
        max: 1 
      });
      isDbConnected = false;
    } else {
      console.warn("WARNING: Database connection failed in development, using fallback connection");
      pool = new Pool({ connectionString: 'postgresql://postgres:postgres@localhost:5432/recipe_snap' });
      // Try to continue in development mode with fallback connection
      isDbConnected = true;
    }
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
