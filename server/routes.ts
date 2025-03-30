import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  analyzeImageRequestSchema,
  analyzeImageResponseSchema,
  type AnalyzeImageResponse,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the Google Generative AI API
  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || "AIzaSyBPdE26_ZZpOg5Ru91QJ9Ihp1TodQKQsZo"
  );

  // Define the model to use for image analysis
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  app.post("/api/analyze-image", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = analyzeImageRequestSchema.parse(req.body);
      const { imageData } = validatedData;

      // Remove the data URL prefix to get the base64 string
      const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "");

      // Prepare the image part
      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      // Generate content using Gemini API
      const prompt = `
      Analyze this food image and provide:
      1. The exact name of the dish
      2. A brief description of the dish
      3. Tags/categories (cuisine type, diet type, meal type)
      4. 3 recipes for how to make this dish. For each recipe, include:
         - Title
         - Brief description
         - Preparation time
         - Cooking time
         - Servings
         - Difficulty level
         - Ingredients list
         - Step-by-step instructions
      
      Format your response as a JSON object with the following structure:
      {
        "foodName": "Name of the dish",
        "description": "Brief description",
        "tags": ["tag1", "tag2", "tag3"],
        "recipes": [
          {
            "title": "Recipe title",
            "description": "Recipe description",
            "prepTime": "Prep time",
            "cookTime": "Cook time",
            "totalTime": "Total time", 
            "servings": number,
            "difficulty": "Difficulty level",
            "tags": ["tag1", "tag2"],
            "ingredients": ["ingredient1", "ingredient2"],
            "instructions": ["step1", "step2"]
          }
        ]
      }

      Ensure the JSON is valid with no trailing commas.
      `;

      // Generate content using the Gemini API
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      // Extract the JSON from the response
      let jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/\{[\s\S]*\}/);
      
      let jsonContent = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
      
      // Parse the JSON response
      let parsedData: AnalyzeImageResponse;
      try {
        parsedData = JSON.parse(jsonContent);
        
        // Validate the response against our schema
        const validatedResponse = analyzeImageResponseSchema.parse(parsedData);
        
        return res.status(200).json(validatedResponse);
      } catch (err) {
        console.error("Error parsing Gemini API response:", err);
        console.log("Raw response:", text);
        
        return res.status(500).json({ 
          error: "Could not parse the AI response properly",
          details: "The response format from Gemini API was unexpected" 
        });
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ 
          error: "Validation error", 
          details: validationError.message 
        });
      }
      
      return res.status(500).json({ 
        error: "Error analyzing image",
        details: err instanceof Error ? err.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
