import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Get auth token from localStorage if available
  const token = localStorage.getItem("recipe_snap_token");
  
  // Prepare headers with auth token if available
  const headers: Record<string, string> = {};
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  // If using Firebase, get the current user's email and add it to headers
  try {
    // Dynamically import firebase auth to avoid circular dependencies
    const { auth } = await import('./firebase');
    
    if (auth.currentUser?.email) {
      // Add Firebase user email to headers
      headers["x-user-email"] = auth.currentUser.email;
      console.log(`Adding email header: ${auth.currentUser.email}`);
      
      // Try to get Firebase ID token if available
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        if (idToken) {
          headers["x-firebase-token"] = idToken;
        }
      } catch (tokenError) {
        console.warn("Could not get Firebase ID token:", tokenError);
      }
    }
  } catch (error) {
    console.warn("Error adding Firebase auth info to request:", error);
  }
  
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get auth token from localStorage if available
    const token = localStorage.getItem("recipe_snap_token");
    
    // Prepare headers with auth token if available
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    // If using Firebase, get the current user's email and add it to headers
    try {
      // Dynamically import firebase auth to avoid circular dependencies
      const { auth } = await import('./firebase');
      
      if (auth.currentUser?.email) {
        // Add Firebase user email to headers
        headers["x-user-email"] = auth.currentUser.email;
        
        // Try to get Firebase ID token if available
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          if (idToken) {
            headers["x-firebase-token"] = idToken;
          }
        } catch (tokenError) {
          console.warn("Could not get Firebase ID token:", tokenError);
        }
      }
    } catch (error) {
      console.warn("Error adding Firebase auth info to request:", error);
    }
    
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
