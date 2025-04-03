import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  createAppError, 
  getErrorTypeFromStatus, 
  ErrorType 
} from "@/services/error";
import { getAuthToken } from "@/services/firebase";

const TOKEN_KEY = 'recipe_snap_auth_token';

/**
 * Enhanced error handling for API responses
 */
async function handleResponseErrors(res: Response): Promise<void> {
  if (!res.ok) {
    let errorMessage: string;
    let errorData: any = null;
    
    try {
      // Try to parse error response as JSON
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorData = await res.json();
        errorMessage = errorData.message || errorData.error || res.statusText;
      } else {
        errorMessage = await res.text() || res.statusText;
      }
    } catch (e) {
      errorMessage = res.statusText;
    }
    
    const errorType = getErrorTypeFromStatus(res.status);
    throw createAppError(errorMessage, errorType, errorData, res.status);
  }
}

/**
 * Makes API requests with proper authorization and error handling
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Get auth token from centralized service
  const token = getAuthToken();
  
  // Prepare headers with auth token if available
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };
  
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  try {
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await handleResponseErrors(res);
    return res;
  } catch (error) {
    // If it's already an AppError, rethrow it
    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }
    
    // Otherwise, wrap it in an AppError
    throw createAppError(
      error instanceof Error ? error.message : 'Network request failed',
      ErrorType.NETWORK,
      error
    );
  }
}

/**
 * Query function factory for TanStack Query
 */
type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get auth token from centralized service
    const token = getAuthToken();
    
    // Prepare headers with auth token if available
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
        headers
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await handleResponseErrors(res);
      return await res.json();
    } catch (error) {
      // Don't show toast for queries, that's handled by the components
      if (error && typeof error === 'object' && 'type' in error) {
        throw error;
      }
      
      throw createAppError(
        error instanceof Error ? error.message : 'Query failed',
        ErrorType.NETWORK,
        error
      );
    }
  };

/**
 * Centralized query client with default configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes instead of Infinity for better UX
      retry: 1, // One retry for transient network issues
    },
    mutations: {
      retry: false,
    },
  },
});
