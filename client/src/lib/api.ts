/**
 * Helper functions for making API requests
 */

/**
 * Makes a request to the API with the specified method, path, and body
 * @param method HTTP method to use
 * @param path API path to call
 * @param body Optional body to send with the request
 * @returns Response from the API
 */
export async function apiRequest<T = any>(
  method: string,
  path: string,
  body?: any
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if we have a token in localStorage
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(path, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: "An unknown error occurred",
    }));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  // Check if the response is JSON or not
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return response as any;
}