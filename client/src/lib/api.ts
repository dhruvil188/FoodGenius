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
    return await response.json();
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
    } catch (error) {
      toast({
        title: "Request Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  return makeRequest;
}
