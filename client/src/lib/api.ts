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
    const response = await baseApiRequest(method, url, data);
    
    // Check for non-2xx response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Create a custom error object with status and error details from the response
      const error: any = new Error(errorData.error || response.statusText);
      error.status = response.status;
      error.details = errorData.details || null;
      error.retryAfter = errorData.retryAfter || null;
      throw error;
    }
    
    // Handle the JSON parsing error specifically
    try {
      const jsonData = await response.json();
      
      // For the analyze-image endpoint, verify we have actual content
      if (url === '/api/analyze-image' && (!jsonData.foodName || !jsonData.recipes || jsonData.recipes.length === 0)) {
        throw new Error("The AI service couldn't properly analyze the image. Please try with a clearer food image.");
      }
      
      return jsonData;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      const error: any = new Error("Failed to parse server response");
      error.status = 500;
      error.originalError = parseError;
      throw error;
    }
  } catch (error) {
    console.error("API request error:", error);
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
