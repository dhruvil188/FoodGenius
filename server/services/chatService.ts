import { storage } from "../storage";
import { AnalyzeImageResponse, ChatMessage } from "@shared/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonString, extractJsonFromText } from "../utils";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.4,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

// Shorter prompt for recipe combination
const RECIPE_COMBINATION_PROMPT = `Create a fusion recipe combining the user's specified dishes. Include a name, description, prep/cook times, difficulty, ingredients, instructions, nutrition info, variations, and side dishes. Format as JSON with keys: foodName, description, tags, recipes (array with title, description, prepTime, cookTime, totalTime, servings, difficulty, ingredients, instructions, nutritionInfo, variations, sideDishSuggestions).`;

/**
 * Generate a recipe based on a chat prompt using Gemini AI
 */
export async function generateRecipeFromChatPrompt(
  userId: number,
  prompt: string,
  conversationId?: string
): Promise<{ recipe: AnalyzeImageResponse; message: ChatMessage }> {
  // Create a unique conversation ID if not provided
  const actualConversationId =
    conversationId ||
    `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Create the user message in the database
  const userMessage = await storage.createChatMessage({
    userId,
    content: prompt,
    role: "user",
    conversationId: actualConversationId,
  });

  try {
    console.log(`🔍 Generating recipe from prompt for user ${userId}...`);

    // Get the chat history if in an existing conversation
    let historyPrompts: { role: "user" | "model"; parts: { text: string }[] }[] = [];
    
    if (conversationId) {
      const messages = await storage.getChatMessages(userId, conversationId);
      historyPrompts = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
    }

    // Create a chat session - handle the system prompt separately
    const chat = model.startChat({
      history: historyPrompts,
    });
    
    // First send the system instruction as a separate message if there's no history
    if (historyPrompts.length === 0) {
      await chat.sendMessage([{ text: RECIPE_COMBINATION_PROMPT }]);
    }

    // Send the user's prompt
    const result = await chat.sendMessage([{ text: prompt }]);
    const responseText = result.response.text();
    
    console.log(`✅ Got response from Gemini AI for user ${userId}`);
    
    // Extract the JSON from the response
    let jsonString = extractJsonFromText(responseText);
    jsonString = cleanJsonString(jsonString);
    
    // Parse the JSON as a recipe
    let recipeData: AnalyzeImageResponse;
    try {
      recipeData = JSON.parse(jsonString);
      console.log(`✅ Successfully parsed recipe JSON`);
    } catch (err) {
      const error = err as Error;
      console.error("❌ Error parsing recipe JSON:", error);
      throw new Error(`Failed to parse recipe JSON: ${error.message}`);
    }

    // Create the assistant message with the recipe
    const assistantMessage = await storage.createChatMessage({
      userId,
      content: `Here's a recipe for ${recipeData.foodName}`,
      role: "assistant",
      conversationId: actualConversationId,
      recipeOutput: recipeData as any,
    });

    return {
      recipe: recipeData,
      message: assistantMessage,
    };
  } catch (err) {
    const error = err as Error;
    console.error("❌ Error generating recipe from prompt:", error);

    // Create an error message
    const errorMessage = await storage.createChatMessage({
      userId,
      content: `Sorry, I couldn't generate a recipe from your prompt. Error: ${error.message || 'Unknown error'}`,
      role: "assistant",
      conversationId: actualConversationId,
    });

    // Return a basic error response
    return {
      recipe: {
        foodName: "Error Generating Recipe",
        description: `Sorry, I couldn't generate a recipe. Error: ${error.message || 'Unknown error'}`,
        tags: ["error"],
        recipes: [],
      },
      message: errorMessage,
    };
  }
}

/**
 * Get all chat messages for a conversation
 */
export async function getChatMessages(userId: number, conversationId: string): Promise<ChatMessage[]> {
  return storage.getChatMessages(userId, conversationId);
}

/**
 * Get all conversations for a user
 */
export async function getUserConversations(userId: number): Promise<{ id: string, lastMessage: ChatMessage }[]> {
  return storage.getConversations(userId);
}

/**
 * Create a new chat message
 */
export async function createChatMessage(userId: number, content: string, conversationId: string, role: 'user' | 'assistant' = 'user'): Promise<ChatMessage> {
  return storage.createChatMessage({
    userId,
    content,
    role,
    conversationId,
  });
}