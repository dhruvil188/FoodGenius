import { storage } from "../storage";
import { AnalyzeImageResponse, ChatMessage } from "@shared/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonString, extractJsonFromText } from "../utils";
import { ValidationError } from "../middleware/errorHandler";

// Initialize the Gemini API if API key exists
const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.4,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });
} else {
  console.warn("❗ GEMINI_API_KEY not found. Recipe generation will not work.");
}

// Recipe combination instruction that will be used as a regular message
const RECIPE_COMBINATION_INSTRUCTION = `You are a professional chef assistant that can create fusion recipes.

Please create a fusion recipe combining the dishes I'm about to describe. Include:
1. Creative name
2. Brief description
3. Prep/cook times
4. Difficulty level
5. Ingredients with measurements
6. Step-by-step instructions 
7. Nutritional information
8. Recipe variations
9. Side dish suggestions

Format your response as a JSON object with this structure:
{
  "foodName": "Name",
  "description": "Description",
  "tags": ["tag1", "tag2"],
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Description",
      "prepTime": "Prep time", 
      "cookTime": "Cook time",
      "totalTime": "Total time",
      "servings": number,
      "difficulty": "Easy/Medium/Hard",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "instructions": ["Step 1", "Step 2"],
      "nutritionInfo": {
        "calories": number,
        "protein": "amount",
        "carbs": "amount", 
        "fats": "amount"
      },
      "variations": [
        {
          "type": "Variation name",
          "description": "Description",
          "adjustments": ["Adjustment 1", "Adjustment 2"]
        }
      ],
      "sideDishSuggestions": [
        {
          "name": "Side dish name",
          "description": "Description",
          "preparationTime": "Prep time"
        }
      ]
    }
  ]
}

Now, what dishes would you like me to combine?`;

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

    // Check if Gemini API is available
    if (!genAI || !model || !apiKey) {
      console.error("❌ Gemini API key is missing or invalid");
      throw new Error("API configuration error: Gemini API key is missing. Please contact support.");
    }

    // Get the chat history if in an existing conversation
    let historyPrompts: { role: "user" | "model"; parts: { text: string }[] }[] = [];
    
    if (conversationId) {
      const messages = await storage.getChatMessages(userId, conversationId);
      historyPrompts = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
    }

    // Create a chat session
    const chat = model.startChat({
      history: historyPrompts,
    });
    
    // For new conversations, we need a different approach.
    // The Gemini API requires that the first message in history has role 'user', not 'model'
    if (historyPrompts.length === 0) {
      // Create a chat with no history
      const chat = model.startChat();
      
      // First send the user message with our instructions prompt merged
      const instructionsResult = await chat.sendMessage([{ 
        text: RECIPE_COMBINATION_INSTRUCTION + "\n\nUser Input: " + prompt 
      }]);
      
      const responseText = instructionsResult.response.text();
      console.log(`✅ Got response from Gemini AI for user ${userId}`);
      
      // No need to store the instruction in the database as a separate message
      // since we're including it with the user prompt
      
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
    } else {
      // For existing conversations, just send the user prompt
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
    }
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

/**
 * Delete a conversation and all its messages
 */
export async function deleteConversation(userId: number, conversationId: string): Promise<boolean> {
  return storage.deleteConversation(userId, conversationId);
}

/**
 * Helper function that doesn't create a user message - used to solve circular dependency
 * This is called from DatabaseStorage.createRecipeFromChatPrompt
 */
export async function generateRecipeFromPrompt(
  userId: number,
  prompt: string,
  conversationId: string,
  userMessage: ChatMessage
): Promise<{ recipe: AnalyzeImageResponse; message: ChatMessage }> {
  try {
    console.log(`🔍 Generating recipe from prompt for user ${userId}...`);

    // Check if Gemini API is available
    if (!genAI || !model || !apiKey) {
      console.error("❌ Gemini API key is missing or invalid");
      throw new ValidationError("API configuration error: Gemini API key is missing. Please contact support.");
    }

    // Get the chat history
    const messages = await storage.getChatMessages(userId, conversationId);
    let historyPrompts = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Check if we need to use the special approach for first message
    if (historyPrompts.length <= 1) { // Just the user message or empty
      // We need to start fresh with no history to avoid the "first message must be user" error
      const chat = model.startChat();
      
      // Send a combined message with instructions and user prompt
      const combinedPrompt = RECIPE_COMBINATION_INSTRUCTION + "\n\nUser Input: " + prompt;
      const result = await chat.sendMessage([{ text: combinedPrompt }]);
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
        conversationId: conversationId,
        recipeOutput: recipeData as any,
      });
  
      return {
        recipe: recipeData,
        message: assistantMessage,
      };
    } else {
      // For existing conversations with more than one message,
      // we need a different approach to handle continuation
      const chat = model.startChat();
      
      // Send just the user prompt
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
        conversationId: conversationId,
        recipeOutput: recipeData as any,
      });
  
      return {
        recipe: recipeData,
        message: assistantMessage,
      };
    }
  } catch (err) {
    const error = err as Error;
    console.error("❌ Error generating recipe from prompt:", error);
    throw error; // Let the calling function handle the error
  }
}