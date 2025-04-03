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
  // Get the database URL from our centralized config helper
  const connectionString = getDatabaseUrl();
  pool = new Pool({ connectionString });
  console.log("Connecting to PostgreSQL database...");
} catch (error) {
  console.error("Failed to initialize database connection:", error);
  
  // In development, we might want to continue without a database
  // but for production deployment, we should fail fast
  if (process.env.NODE_ENV === 'production') {
    throw error;
  } else {
    console.warn("WARNING: Starting without database connection. Some features may not work.");
    // Create a dummy pool that will throw errors when used
    // This allows the app to start but database operations will fail
    pool = new Pool({ connectionString: 'postgresql://user:pass@localhost:5432/dummy' });
  }
}

// Export Drizzle instance
export const db = drizzle(pool, { schema });
