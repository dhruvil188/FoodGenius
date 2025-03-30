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

export const nutritionInfoSchema = z.object({
  calories: z.number().optional(),
  protein: z.string().optional(),
  carbs: z.string().optional(),
  fats: z.string().optional(),
  fiber: z.string().optional(),
  sugar: z.string().optional(),
  sodium: z.string().optional(),
  vitamins: z.array(z.string()).optional(),
  healthyAlternatives: z.array(z.string()).optional(),
  dietaryNotes: z.array(z.string()).optional(),
});

export type NutritionInfo = z.infer<typeof nutritionInfoSchema>;

export const sideDishSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  preparationTime: z.string().optional(),
  pairingReason: z.string().optional(),
});

export type SideDish = z.infer<typeof sideDishSchema>;

export const recipeVariationSchema = z.object({
  type: z.enum(['spicy', 'buttery', 'non-spicy']),
  description: z.string(),
  adjustments: z.array(z.string()),
});

export type RecipeVariation = z.infer<typeof recipeVariationSchema>;

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  servings: z.number().optional(),
  servingSize: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  chefTips: z.array(z.string()).optional(),
  commonMistakes: z.array(z.string()).optional(),
  storageInstructions: z.string().optional(),
  reheatingMethods: z.string().optional(),
  beveragePairings: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
  nutritionInfo: nutritionInfoSchema.optional(),
  variations: z.array(recipeVariationSchema).optional(),
  sideDishSuggestions: z.array(sideDishSchema).optional(),
});

export const analyzeImageResponseSchema = z.object({
  foodName: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  recipes: z.array(recipeSchema),
});

export type AnalyzeImageResponse = z.infer<typeof analyzeImageResponseSchema>;
