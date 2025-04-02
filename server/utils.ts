import crypto from "crypto";

/**
 * Hashes a password with a salt (or generates a new salt if none provided)
 */
export function hashPassword(password: string, salt?: string): { hash: string, salt: string } {
  // Generate a salt if not provided
  const useSalt = salt || crypto.randomBytes(16).toString("hex");
  
  // Create an HMAC hash with the salt
  const hash = crypto
    .createHmac("sha512", useSalt)
    .update(password)
    .digest("hex");
  
  return { hash, salt: useSalt };
}

/**
 * Verifies a password against a stored hash and salt
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const result = hashPassword(password, salt);
  return result.hash === hash;
}

/**
 * Generates a random token for session authentication
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Safely parses a JSON string with error handling
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
}

/**
 * Safely extracts a JSON object from a potentially malformed string
 */
export function extractJsonFromText(text: string): string {
  // First try to extract JSON from code blocks (most common format)
  const codeBlockMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim();
  }
  
  // Then try to find JSON object directly 
  const directJsonMatch = text.match(/(\{[\s\S]*\})/);
  if (directJsonMatch && directJsonMatch[1]) {
    return directJsonMatch[1].trim();
  }
  
  // As a last resort, use the whole text
  return text.trim();
}

/**
 * Cleans a JSON string to make it valid
 */
export function cleanJsonString(jsonStr: string): string {
  return jsonStr
    .replace(/,\s*}/g, '}') // Fix trailing commas in objects
    .replace(/,\s*\]/g, ']') // Fix trailing commas in arrays
    .replace(/(\w+):/g, '"$1":') // Convert unquoted property names to quoted
    .replace(/'/g, '"'); // Replace single quotes with double quotes
}