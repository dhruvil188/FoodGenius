import { toast } from "@/hooks/use-toast";

export enum ErrorType {
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  VALIDATION = "VALIDATION",
  SERVER = "SERVER",
  NETWORK = "NETWORK",
  TIMEOUT = "TIMEOUT",
  UNKNOWN = "UNKNOWN"
}

export interface AppError extends Error {
  type: ErrorType;
  originalError?: unknown;
  statusCode?: number;
}

/**
 * Creates a typed application error
 */
export function createAppError(
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  originalError?: unknown,
  statusCode?: number
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.originalError = originalError;
  error.statusCode = statusCode;
  return error;
}

/**
 * Determines error type based on the error or status code
 */
export function getErrorTypeFromStatus(statusCode: number): ErrorType {
  if (statusCode === 401) return ErrorType.AUTHENTICATION;
  if (statusCode === 403) return ErrorType.AUTHORIZATION;
  if (statusCode === 422 || statusCode === 400) return ErrorType.VALIDATION;
  if (statusCode >= 500) return ErrorType.SERVER;
  return ErrorType.UNKNOWN;
}

/**
 * Handles API errors by formatting them and showing toast notifications
 */
export function handleApiError(error: unknown, fallbackMessage = "An unexpected error occurred"): AppError {
  console.error("API Error:", error);
  
  let appError: AppError;
  
  if (error instanceof Error) {
    // Handle typical Error objects
    appError = createAppError(error.message, ErrorType.UNKNOWN, error);
  } else if (typeof error === 'object' && error !== null) {
    // Try to handle API error responses
    const errorObj = error as any;
    if (errorObj.status && typeof errorObj.status === 'number') {
      const errorType = getErrorTypeFromStatus(errorObj.status);
      const message = errorObj.message || fallbackMessage;
      appError = createAppError(message, errorType, error, errorObj.status);
    } else {
      appError = createAppError(
        errorObj.message || fallbackMessage,
        ErrorType.UNKNOWN,
        error
      );
    }
  } else {
    // Fallback for unexpected error types
    appError = createAppError(fallbackMessage, ErrorType.UNKNOWN, error);
  }
  
  // Show toast notification for the error
  toast({
    title: getErrorTitle(appError.type),
    description: appError.message,
    variant: "destructive",
  });
  
  return appError;
}

/**
 * Returns a user-friendly error title based on error type
 */
function getErrorTitle(type: ErrorType): string {
  switch (type) {
    case ErrorType.AUTHENTICATION:
      return "Authentication Error";
    case ErrorType.AUTHORIZATION:
      return "Access Denied";
    case ErrorType.VALIDATION:
      return "Validation Error";
    case ErrorType.SERVER:
      return "Server Error";
    case ErrorType.NETWORK:
      return "Network Error";
    case ErrorType.TIMEOUT:
      return "Request Timeout";
    case ErrorType.UNKNOWN:
    default:
      return "Error";
  }
}

/**
 * Safely handles promises and returns errors in a consistent format
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  fallbackMessage = "Operation failed"
): Promise<[AppError | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const appError = handleApiError(error, fallbackMessage);
    return [appError, null];
  }
}