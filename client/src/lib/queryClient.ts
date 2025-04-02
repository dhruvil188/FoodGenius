import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

type ApiRequestOptions = RequestInit & {
  on401?: "error" | "returnNull";
};

export const getQueryFn = (options: ApiRequestOptions = {}) => {
  return async ({ queryKey }: any) => {
    const [endpoint] = queryKey;
    const token = localStorage.getItem("auth_token");

    const response = await fetch(endpoint, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    if (response.status === 401) {
      if (options.on401 === "returnNull") {
        return null;
      }
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Request failed with status ${response.status}`
      );
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  };
};

export const apiRequest = async (
  method: string,
  endpoint: string,
  data?: any,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) => {
  const token = localStorage.getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  if (response.status === 204) {
    return response;
  }

  return response;
};