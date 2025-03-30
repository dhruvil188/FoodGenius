import { apiRequest as baseApiRequest } from "./queryClient";
import { useToast } from "@/hooks/use-toast";

/**
 * Make an API request
 * This is a thin wrapper around the apiRequest function from queryClient
 * that adds error handling specific to this application
 */
export async function apiRequest<T = any>(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<T> {
  try {
    // Use the baseApiRequest function to make the actual request
    const response = await baseApiRequest(method, url, data);
    
    // Clone the response so we can read the body multiple times if needed
    const clonedResponse = response.clone();
    
    // Try to parse the JSON response
    try {
      const jsonData = await response.json();
      
      // For the analyze-image endpoint, verify we have actual content
      if (url === '/api/analyze-image' && (!jsonData.foodName || !jsonData.recipes || jsonData.recipes.length === 0)) {
        if (jsonData.error) {
          // If the response has an error field, use that information
          const error: any = new Error(jsonData.error);
          error.status = 500;
          error.details = jsonData.details || "The AI couldn't properly analyze the image. Please try with a clearer food photo.";
          throw error;
        } else {
          // Otherwise, create a generic error
          const error: any = new Error("The AI service couldn't properly analyze the image.");
          error.status = 500;
          error.details = "Please try with a clearer food photo that shows the dish more distinctly.";
          throw error;
        }
      }
      
      return jsonData;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      
      // Try to read the text response to see if there's any useful information
      try {
        const textResponse = await clonedResponse.text();
        console.log("Raw response text:", textResponse);
        
        // Check if there's an error message in the raw text
        if (textResponse.includes("error")) {
          const error: any = new Error("Server error");
          error.status = 500;
          error.details = "The server encountered an error processing your request.";
          throw error;
        }
      } catch (textError) {
        console.error("Error reading response text:", textError);
      }
      
      // Create a user-friendly error
      const error: any = new Error("Failed to process server response");
      error.status = 500;
      error.details = "There was a problem with the server response. Please try again with a different image.";
      error.originalError = parseError;
      throw error;
    }
  } catch (error: any) {
    // Add more detailed logging for debugging
    console.error("API request error:", error);
    
    // If the error doesn't have a status, add one
    if (!error.status) {
      error.status = 500;
    }
    
    // If the error doesn't have details, add generic ones
    if (!error.details) {
      error.details = "There was a problem processing your request.";
    }
    
    throw error;
  }
}

/**
 * A hook that returns a function to make API requests
 * with toast notifications for errors
 */
export function useApi() {
  const { toast } = useToast();

  const makeRequest = async <T = any>(
    method: string,
    url: string,
    data?: unknown,
  ): Promise<T> => {
    try {
      return await apiRequest<T>(method, url, data);
    } catch (error: any) {
      // Check for specific error status codes
      if (error.status === 429) {
        toast({
          title: "API Quota Exceeded",
          description: error.details || "We've hit our API rate limit. Please try again later.",
          variant: "destructive",
        });
      } else if (error.status === 413) {
        toast({
          title: "File Too Large",
          description: error.details || "The file you tried to upload is too large.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Request Failed",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  return makeRequest;
}
