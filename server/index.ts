import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeDatabase } from "./db";

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

// Enable CORS for Vercel deployment
app.use((req, res, next) => {
  // Allow requests from any origin in development
  // In production, this should be limited to your specific domains
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize database connection before starting the server
(async () => {
  try {
    console.log("Attempting to connect to PostgreSQL database...");
    await initializeDatabase();
    console.log("Database connection successful");
    
    const server = await registerRoutes(app);

    // Error handling is now done in errorHandler middleware in routes.ts

    // Determine environment
    const isDev = process.env.NODE_ENV !== 'production';
    
    // Set up Vite in development or serve static files in production
    if (isDev) {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Determine port - use environment variable for Vercel or default to 5000
    const port = process.env.PORT || 5000;
    
    // In Vercel's serverless environment, we don't need to explicitly listen
    // But we do need to for local development and other hosting environments
    if (!process.env.VERCEL) {
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`serving on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();

// Export for Vercel serverless functions
export default app;
