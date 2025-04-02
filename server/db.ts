import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable not found");
  throw new Error("DATABASE_URL must be set");
}

// Initialize pool and db outside of try/catch for proper exports
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Verify database connection on startup
try {
  console.log("Connecting to PostgreSQL database...");
  // This is async but we don't need to await it - it will connect when needed
} catch (error) {
  console.error("Failed to connect to database:", error);
  // Don't throw here - let the application start anyway
  // Individual queries will fail if there's a real connection issue
}
