import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Schema for food analysis
export const foodAnalysis = pgTable("food_analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  foodName: text("food_name").notNull(),
  description: text("description"),
  tags: text("tags").array(),
  imageUrl: text("image_url"),
  createdAt: text("created_at").notNull(),
});

export const insertFoodAnalysisSchema = createInsertSchema(foodAnalysis).omit({
  id: true,
  createdAt: true,
});

export type InsertFoodAnalysis = z.infer<typeof insertFoodAnalysisSchema>;
export type FoodAnalysis = typeof foodAnalysis.$inferSelect;

// Schema for recipes
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  foodAnalysisId: integer("food_analysis_id").references(() => foodAnalysis.id),
  title: text("title").notNull(),
  description: text("description"),
  prepTime: text("prep_time"),
  cookTime: text("cook_time"),
  servings: integer("servings"),
  difficulty: text("difficulty"),
  tags: text("tags").array(),
  ingredients: text("ingredients").array(),
  instructions: text("instructions").array(),
  imageUrl: text("image_url"),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
});

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;

// API Request/Response Types
export const analyzeImageRequestSchema = z.object({
  imageData: z.string().min(1, "Image data is required"),
});

export type AnalyzeImageRequest = z.infer<typeof analyzeImageRequestSchema>;

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  servings: z.number().optional(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  imageUrl: z.string().optional(),
});

export const analyzeImageResponseSchema = z.object({
  foodName: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  recipes: z.array(recipeSchema),
});

export type AnalyzeImageResponse = z.infer<typeof analyzeImageResponseSchema>;
