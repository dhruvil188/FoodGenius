import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Account Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  displayName: true,
});

// Auth schemas for form validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

// User session schema 
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

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
  macronutrientRatio: z.object({
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fats: z.number().optional(),
  }).optional(),
  allergens: z.array(z.string()).optional(),
  dietaryCompliance: z.array(z.string()).optional(),
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
  type: z.string(),
  description: z.string(),
  adjustments: z.array(z.string()),
});

export type RecipeVariation = z.infer<typeof recipeVariationSchema>;

export const youtubeVideoSchema = z.object({
  videoId: z.string(),
  title: z.string(),
  channelTitle: z.string().optional(),
  description: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  publishedAt: z.string().optional(),
});

export type YoutubeVideo = z.infer<typeof youtubeVideoSchema>;

export const equipmentItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  alternatives: z.array(z.string()).optional(),
  difficultyToUse: z.string().optional(),
});

export type EquipmentItem = z.infer<typeof equipmentItemSchema>;

export const techniqueDetailSchema = z.object({
  name: z.string(),
  description: z.string(),
  visualCues: z.array(z.string()).optional(),
  commonErrors: z.array(z.string()).optional(),
});

export type TechniqueDetail = z.infer<typeof techniqueDetailSchema>;

export const culturalContextSchema = z.object({
  origin: z.string().optional(),
  history: z.string().optional(),
  traditionalServing: z.string().optional(),
  festiveRelevance: z.array(z.string()).optional(),
});

export type CulturalContext = z.infer<typeof culturalContextSchema>;

export const presentationGuidanceSchema = z.object({
  platingSuggestions: z.array(z.string()).optional(),
  garnishingTips: z.array(z.string()).optional(),
  photoTips: z.array(z.string()).optional(),
});

export type PresentationGuidance = z.infer<typeof presentationGuidanceSchema>;

export const cookingScienceSchema = z.object({
  keyReactions: z.array(z.string()).optional(),
  techniquePurpose: z.array(z.string()).optional(),
  safetyTips: z.array(z.string()).optional(),
});

export type CookingScience = z.infer<typeof cookingScienceSchema>;

export const sensoryGuidanceSchema = z.object({
  tasteProgression: z.array(z.string()).optional(),
  aromaIndicators: z.array(z.string()).optional(),
  textureDescriptors: z.array(z.string()).optional(),
});

export type SensoryGuidance = z.infer<typeof sensoryGuidanceSchema>;

export const ingredientGroupSchema = z.object({
  groupName: z.string(),
  ingredients: z.array(z.string()),
  preparationNotes: z.string().optional(),
});

export type IngredientGroup = z.infer<typeof ingredientGroupSchema>;

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  activeTime: z.string().optional(),
  passiveTime: z.string().optional(),
  servings: z.number().optional(),
  servingSize: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  equipment: z.array(equipmentItemSchema).optional(),
  ingredientGroups: z.array(ingredientGroupSchema).optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  techniqueDetails: z.array(techniqueDetailSchema).optional(),
  chefTips: z.array(z.string()).optional(),
  commonMistakes: z.array(z.string()).optional(),
  storageInstructions: z.string().optional(),
  reheatingMethods: z.string().optional(),
  beveragePairings: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
  nutritionInfo: nutritionInfoSchema.optional(),
  variations: z.array(recipeVariationSchema).optional(),
  sideDishSuggestions: z.array(sideDishSchema).optional(),
  culturalContext: culturalContextSchema.optional(),
  presentationGuidance: presentationGuidanceSchema.optional(),
  cookingScience: cookingScienceSchema.optional(),
  sensoryGuidance: sensoryGuidanceSchema.optional(),
  mealPlanningNotes: z.array(z.string()).optional(),
  successIndicators: z.array(z.string()).optional(),
});

export const analyzeImageResponseSchema = z.object({
  foodName: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  recipes: z.array(recipeSchema),
  youtubeVideos: z.array(youtubeVideoSchema).optional(),
});

export type AnalyzeImageResponse = z.infer<typeof analyzeImageResponseSchema>;

// Saved recipes schema
export const savedRecipes = pgTable("saved_recipes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  recipeData: jsonb("recipe_data").notNull(), // Store the full recipe JSON
  foodName: text("food_name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  favorite: boolean("favorite").default(false),
  tags: text("tags").array(),
});

export const insertSavedRecipeSchema = createInsertSchema(savedRecipes).omit({
  id: true,
  createdAt: true,
});

export type InsertSavedRecipe = z.infer<typeof insertSavedRecipeSchema>;
export type SavedRecipe = typeof savedRecipes.$inferSelect;

// Auth related types and schemas
export const authResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    displayName: z.string().nullable(),
    profileImage: z.string().nullable(),
  }),
  token: z.string(),
  success: z.boolean(),
  message: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Meal Plan Types
export const mealPlanPreferencesSchema = z.object({
  mealsPerDay: z.enum(['2', '4']),
  spiciness: z.enum(['spicy', 'mild']),
  dietType: z.enum(['vegetarian', 'non-vegetarian', 'vegan']),
  healthGoal: z.enum(['fit', 'indulgent']),
  cuisinePreferences: z.array(z.string()),
  prepTime: z.enum(['quick', 'moderate', 'slow']),
  duration: z.enum(['1-week', '2-weeks', '1-month']),
  restrictions: z.array(z.string())
});

export type MealPlanPreferences = z.infer<typeof mealPlanPreferencesSchema>;

export const mealSchema = z.object({
  type: z.string(),
  name: z.string(),
  image: z.string().optional(),
  calories: z.number(),
  recipe: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  nutrients: z.object({
    protein: z.string(),
    carbs: z.string(),
    fats: z.string()
  })
});

export type Meal = z.infer<typeof mealSchema>;

export const mealPlanDaySchema = z.object({
  date: z.date(),
  meals: z.array(mealSchema),
  dailyNutrition: z.object({
    totalCalories: z.number(),
    totalProtein: z.string(),
    totalCarbs: z.string(),
    totalFats: z.string()
  })
});

export type MealPlanDay = z.infer<typeof mealPlanDaySchema>;

export const groceryCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string())
});

export type GroceryCategory = z.infer<typeof groceryCategorySchema>;

export const mealPlanSchema = z.object({
  days: z.array(mealPlanDaySchema),
  groceryList: z.array(groceryCategorySchema),
  nutritionSummary: z.object({
    averageCalories: z.number(),
    averageProtein: z.string(),
    averageCarbs: z.string(),
    averageFats: z.string(),
    recommendations: z.array(z.string())
  })
});

export type MealPlan = z.infer<typeof mealPlanSchema>;
