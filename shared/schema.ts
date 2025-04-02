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
  // Firebase authentication
  firebaseUid: text("firebase_uid").unique(),
  // Subscription fields
  credits: integer("credits").default(1),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("free"),
  subscriptionTier: text("subscription_tier").default("free"),
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
    // Subscription fields
    credits: z.number().optional(),
    subscriptionStatus: z.string().optional(),
    subscriptionTier: z.string().optional(),
  }),
  token: z.string(),
  success: z.boolean(),
  message: z.string().optional(),
});

// Firebase auth sync schema
export const firebaseAuthSyncSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable(),
});

// Diet Plan Schemas
export const mealSchema = z.object({
  name: z.string(),
  timeOfDay: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  nutritionalInfo: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number()
  }),
});

export type Meal = z.infer<typeof mealSchema>;

export const dailyPlanSchema = z.object({
  day: z.string(),
  meals: z.array(mealSchema),
  totalDailyCalories: z.number(),
});

export type DailyPlan = z.infer<typeof dailyPlanSchema>;

export const dietPlanRequestSchema = z.object({
  mealsPerDay: z.number().min(2).max(5),
  dietType: z.string(),
  healthGoals: z.array(z.string()),
  calorieTarget: z.number(),
  excludedFoods: z.array(z.string()),
  medicalConditions: z.array(z.string()),
  cookingSkill: z.string(),
  timeConstraint: z.number(),
  budgetLevel: z.string(),
  preferredCuisines: z.array(z.string()),
  seasonalPreference: z.string(),
  proteinPreference: z.string(),
  extraNotes: z.string().optional(),
});

export type DietPlanRequest = z.infer<typeof dietPlanRequestSchema>;

export const dietPlanResponseSchema = z.object({
  weeklyPlan: z.array(dailyPlanSchema),
  planSummary: z.string(),
  weeklyNutritionAverage: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
  }),
});

export type DietPlanResponse = z.infer<typeof dietPlanResponseSchema>;

// Database schema for saved diet plans
export const savedDietPlans = pgTable("saved_diet_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planName: text("plan_name").notNull(),
  planData: jsonb("plan_data").notNull(), // Store the full diet plan JSON
  mealsPerDay: integer("meals_per_day").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  tags: text("tags").array(),
});

export const insertSavedDietPlanSchema = createInsertSchema(savedDietPlans).omit({
  id: true,
  createdAt: true,
});

export type InsertSavedDietPlan = z.infer<typeof insertSavedDietPlanSchema>;
export type SavedDietPlan = typeof savedDietPlans.$inferSelect;

export type FirebaseAuthSync = z.infer<typeof firebaseAuthSyncSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
