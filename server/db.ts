import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { getDatabaseUrl } from './dbConfig';

// Configure NeonDB to use WebSockets
neonConfig.webSocketConstructor = ws;

// Initialize pool with connection string
let pool: Pool;

try {
  const connectionString = getDatabaseUrl();
  pool = new Pool({ connectionString });
  console.log("Connecting to PostgreSQL database...");
  
  // Test the connection
  await pool.query('SELECT NOW()');
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection error:", error);
  
  if (process.env.NODE_ENV === 'production') {
    console.error("CRITICAL: Database connection failed in production");
    throw error;
  } else {
    console.warn("WARNING: Database connection failed in development");
    pool = new Pool({ connectionString: 'postgresql://postgres:postgres@localhost:5432/recipe_snap' });
  }
}

// Export Drizzle instance
export const db = drizzle(pool, { schema });
