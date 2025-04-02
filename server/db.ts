import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable not found");
  throw new Error("Database connection string not configured. Please add DATABASE_URL to deployment secrets.");
}

try {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle(pool, { schema });
} catch (error) {
  console.error("Failed to connect to database:", error);
  throw error;
}
