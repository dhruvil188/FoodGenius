import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalyzeImageResponse, User } from '@shared/schema';
import { storage } from '../storage';
import { getMockAnalysisResponse } from '../mockData';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize the Gemini AI client
if (!GEMINI_API_KEY) {
  console.warn('⚠️ GEMINI_API_KEY environment variable is not set. AI features will use mock data.');
}

// Create a client with the provided API key
const genAI = GEMINI_API_KEY 
  ? new GoogleGenerativeAI(GEMINI_API_KEY) 
  : null;

/**
 * Generate a recipe analysis from text prompt
 */
export async function generateRecipe(prompt: string, userId: number): Promise<AnalyzeImageResponse> {
  try {
    // Get user to check credits
    const user = await storage.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user has enough credits
    if (user.credits <= 0 && user.subscriptionTier !== 'premium') {
      throw new Error('Insufficient credits. Please purchase more credits or upgrade to premium.');
    }
    
    // Deduct a credit if not premium
    if (user.subscriptionTier !== 'premium') {
      await storage.updateUserCredits(userId, user.credits - 1);
    }
    
    if (!genAI) {
      console.warn('⚠️ Gemini AI client not initialized. Using mock data.');
      return getMockAnalysisResponse();
    }
    
    // Create a Gemini model instance
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });
    
    // Construct the prompt
    const fullPrompt = `
    I need you to analyze the following food description and provide detailed recipe information:
    
    "${prompt}"
    
    Please provide a comprehensive response in the following JSON format:
    
    {
      "foodName": "The name of the dish",
      "description": "A brief, enticing description of the dish",
      "tags": ["tag1", "tag2", "tag3"],
      "recipes": [
        {
          "title": "Recipe title",
          "description": "Brief description of this recipe variation",
          "ingredients": ["ingredient 1", "ingredient 2"],
          "instructions": ["step 1", "step 2"],
          "prepTime": "preparation time",
          "cookTime": "cooking time",
          "totalTime": "total time",
          "servings": "number of servings",
          "tips": ["tip 1", "tip 2"],
          "variations": ["variation 1", "variation 2"],
          "storageInstructions": "How to store the dish",
          "commonMistakes": ["mistake 1", "mistake 2"],
          "chefNotes": "Professional chef's notes and insights",
          "pairingRecommendations": ["pairing 1", "pairing 2"],
          "successIndicators": ["indicator 1", "indicator 2"]
        }
      ],
      "sideDishes": ["side dish 1", "side dish 2"]
    }
    
    Don't include any nutrition facts or calorie information. Format all times as strings like "15 minutes" or "1 hour 30 minutes". Include at least 5 items for lists where possible. Don't include any explanations, just return the JSON object. Make sure the recipe is detailed, accurate, and professionally written.
    `;
    
    console.log('🔍 Generating recipe from prompt:', prompt);
    
    // Generate the content
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse recipe response');
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    console.log('✅ Successfully generated recipe');
    return jsonResponse as AnalyzeImageResponse;
    
  } catch (error: any) {
    console.error('❌ Error generating recipe:', error);
    
    // If the error is about insufficient credits, propagate it
    if (error.message.includes('Insufficient credits')) {
      throw error;
    }
    
    // For other errors, return a mock response in production
    // but throw the error in development
    if (process.env.NODE_ENV === 'production') {
      console.warn('Using mock data as fallback in production');
      return getMockAnalysisResponse();
    } else {
      throw error;
    }
  }
}

/**
 * Analyze an image and generate recipe information
 */
export async function analyzeImage(
  base64Image: string,
  userId: number
): Promise<AnalyzeImageResponse> {
  try {
    // Get user to check credits
    const user = await storage.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user has enough credits
    if (user.credits <= 0 && user.subscriptionTier !== 'premium') {
      throw new Error('Insufficient credits. Please purchase more credits or upgrade to premium.');
    }
    
    // Deduct a credit if not premium
    if (user.subscriptionTier !== 'premium') {
      await storage.updateUserCredits(userId, user.credits - 1);
    }
    
    if (!genAI) {
      console.warn('⚠️ Gemini AI client not initialized. Using mock data.');
      return getMockAnalysisResponse();
    }
    
    // Create a Gemini model instance
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });
    
    console.log('🔍 Analyzing image...');
    
    // Multimodal content - both image and text
    const prompt = `
    Analyze this food image and provide detailed recipe information.
    
    Please provide a comprehensive response in the following JSON format:
    
    {
      "foodName": "The name of the dish",
      "description": "A brief, enticing description of the dish",
      "tags": ["tag1", "tag2", "tag3"],
      "recipes": [
        {
          "title": "Recipe title",
          "description": "Brief description of this recipe variation",
          "ingredients": ["ingredient 1", "ingredient 2"],
          "instructions": ["step 1", "step 2"],
          "prepTime": "preparation time",
          "cookTime": "cooking time",
          "totalTime": "total time",
          "servings": "number of servings",
          "tips": ["tip 1", "tip 2"],
          "variations": ["variation 1", "variation 2"],
          "storageInstructions": "How to store the dish",
          "commonMistakes": ["mistake 1", "mistake 2"],
          "chefNotes": "Professional chef's notes and insights",
          "pairingRecommendations": ["pairing 1", "pairing 2"],
          "successIndicators": ["indicator 1", "indicator 2"]
        }
      ],
      "sideDishes": ["side dish 1", "side dish 2"]
    }
    
    Don't include any nutrition facts or calorie information. Format all times as strings like "15 minutes" or "1 hour 30 minutes". Include at least 5 items for lists where possible. Don't include any explanations, just return the JSON object. Make sure the recipe is detailed, accurate, and professionally written.
    `;
    
    // Prepare the parts array with both text and image
    const parts = [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      }
    ];
    
    // Generate the content
    const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse recipe response');
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    console.log('✅ Successfully analyzed image');
    return jsonResponse as AnalyzeImageResponse;
    
  } catch (error: any) {
    console.error('❌ Error analyzing image:', error);
    
    // If the error is about insufficient credits, propagate it
    if (error.message.includes('Insufficient credits')) {
      throw error;
    }
    
    // For other errors, return a mock response in production
    // but throw the error in development
    if (process.env.NODE_ENV === 'production') {
      console.warn('Using mock data as fallback in production');
      return getMockAnalysisResponse();
    } else {
      throw error;
    }
  }
}