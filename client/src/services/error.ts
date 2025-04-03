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
 * Formats API errors into a consistent AppError structure
 * @param error The raw error to process
 * @param fallbackMessage Message to use if error doesn't have one
 * @param showToast Whether to show a toast notification (default: true)
 */
export function handleApiError(
  error: unknown, 
  fallbackMessage = "An unexpected error occurred",
  showToast = true
): AppError {
  console.error("API Error:", error);
  
  let appError: AppError;
  
  // If it's already an AppError, use it directly
  if (error && typeof error === 'object' && 'type' in error && error instanceof Error) {
    appError = error as AppError;
  } 
  // Handle standard Error objects
  else if (error instanceof Error) {
    appError = createAppError(error.message, ErrorType.UNKNOWN, error);
  } 
  // Handle response-like objects (from fetch API)
  else if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    
    // Handle HTTP response errors with status codes
    if (errorObj.status && typeof errorObj.status === 'number') {
      const errorType = getErrorTypeFromStatus(errorObj.status);
      const message = errorObj.message || fallbackMessage;
      appError = createAppError(message, errorType, error, errorObj.status);
    } 
    // Handle error objects with message properties
    else if (errorObj.message) {
      appError = createAppError(
        errorObj.message,
        errorObj.type || ErrorType.UNKNOWN,
        error,
        errorObj.statusCode
      );
    } 
    // Fallback for other object types
    else {
      appError = createAppError(fallbackMessage, ErrorType.UNKNOWN, error);
    }
  } 
  // Fallback for primitive error types
  else {
    appError = createAppError(fallbackMessage, ErrorType.UNKNOWN, error);
  }
  
  // Only show toast if requested (allows silent error handling in some cases)
  if (showToast) {
    toast({
      title: getErrorTitle(appError.type),
      description: appError.message,
      variant: "destructive",
    });
  }
  
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
 * Options for the safeAsync function
 */
export interface SafeAsyncOptions {
  /** Message to use if error doesn't have one */
  fallbackMessage?: string;
  /** Whether to show a toast notification on error */
  showToast?: boolean;
  /** Custom error handler function */
  onError?: (error: AppError) => void;
}

/**
 * Safely handles promises and returns errors in a consistent format
 * Uses the Go-style error handling pattern with [error, result] tuple
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  optionsOrMessage: SafeAsyncOptions | string = {}
): Promise<[AppError | null, T | null]> {
  // Handle string fallback message for backward compatibility
  const options: SafeAsyncOptions = typeof optionsOrMessage === 'string' 
    ? { fallbackMessage: optionsOrMessage }
    : optionsOrMessage;
  
  // Default options
  const {
    fallbackMessage = "Operation failed",
    showToast = true,
    onError
  } = options;
  
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const appError = handleApiError(error, fallbackMessage, showToast);
    
    // Call custom error handler if provided
    if (onError) {
      onError(appError);
    }
    
    return [appError, null];
  }
}