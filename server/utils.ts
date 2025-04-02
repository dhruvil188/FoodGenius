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
  // First try to extract JSON from code blocks (most common format from AI responses)
  const codeBlockMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim();
  }
  
  // Then try to find JSON object directly - looking for the most complete { to } pattern
  const directJsonMatch = text.match(/(\{[\s\S]*\})/g);
  if (directJsonMatch && directJsonMatch.length > 0) {
    // Find the longest match which is likely the most complete JSON object
    const longestMatch = directJsonMatch.reduce((acc, match) => 
      match.length > acc.length ? match : acc, "");
    
    if (longestMatch) {
      return longestMatch.trim();
    }
  }
  
  // Try to detect where the JSON object starts and ends
  let startIndex = text.indexOf('{');
  if (startIndex !== -1) {
    let bracketCount = 1;
    let endIndex = startIndex + 1;
    
    while (bracketCount > 0 && endIndex < text.length) {
      if (text[endIndex] === '{') bracketCount++;
      if (text[endIndex] === '}') bracketCount--;
      endIndex++;
    }
    
    if (bracketCount === 0) {
      return text.substring(startIndex, endIndex).trim();
    }
  }
  
  // As a last resort, use the whole text
  return text.trim();
}

/**
 * Cleans a JSON string to make it valid
 */
export function cleanJsonString(jsonStr: string): string {
  try {
    // First attempt: Try to parse the JSON as is
    JSON.parse(jsonStr);
    return jsonStr; // If it parses, return it unchanged
  } catch (error) {
    // If parsing fails, apply cleaning operations
    
    // Safe truncation for unfinished arrays or objects
    let safeJson = jsonStr;
    
    // Process for truncated arrays - find the last complete array element and properly close the array
    const findIncompleteArrays = (str: string): string => {
      let result = str;
      let openBracketPos = -1;
      let openBraceStack = 0;
      let lastCompleteObjectEnd = -1;
      
      // Find incomplete arrays
      for (let i = 0; i < str.length; i++) {
        if (str[i] === '[' && openBracketPos === -1) {
          openBracketPos = i;
          lastCompleteObjectEnd = i; // Reset on new array start
        } else if (str[i] === '{') {
          openBraceStack++;
        } else if (str[i] === '}') {
          openBraceStack--;
          if (openBraceStack === 0 && openBracketPos !== -1) {
            // Found a complete object in an array
            lastCompleteObjectEnd = i + 1;
          }
        } else if (str[i] === ']') {
          if (openBracketPos !== -1) {
            openBracketPos = -1; // Array closed properly
          }
        }
      }
      
      // If we have an open array with a complete object, truncate after the last complete object
      if (openBracketPos !== -1 && lastCompleteObjectEnd > openBracketPos) {
        const arrayStart = str.substring(0, openBracketPos + 1);
        const completeContent = str.substring(openBracketPos + 1, lastCompleteObjectEnd);
        
        // Add closing bracket and any needed structure after the array
        const remainingStructure = str.substring(lastCompleteObjectEnd).match(/^[^,]*?([\]}])/);
        if (remainingStructure) {
          const closingChar = remainingStructure[1];
          const restOfJson = str.substring(str.indexOf(closingChar) + 1);
          result = arrayStart + completeContent + "]" + restOfJson;
        } else {
          result = arrayStart + completeContent + "]";
        }
      }
      
      return result;
    };
    
    safeJson = findIncompleteArrays(safeJson);
    
    // Apply standard JSON cleaning operations
    safeJson = safeJson
      // Replace trailing commas
      .replace(/,\s*}/g, '}') 
      .replace(/,\s*\]/g, ']')
      
      // Fix property names: ensure all property names are properly quoted
      .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
      
      // Replace single quotes with double quotes
      .replace(/'/g, '"')
      
      // Fix common formatting issues
      .replace(/\n/g, ' ')         // Remove newlines
      .replace(/\t/g, ' ')         // Remove tabs
      .replace(/\s+/g, ' ')        // Normalize whitespace
      
      // Fix unescaped quotes in string values
      .replace(/:\s*"([^"]*?)([^\\])"([^,"}\]])/g, ':"$1$2\\"$3')
      
      // Fix missing commas between objects in an array
      .replace(/}\s*{/g, '},{')
      
      // Ensure balanced brackets and braces
      .replace(/\}\s*\}/g, '}}')
      .replace(/\]\s*\]/g, ']]')
      
      // Fix unclosed objects and arrays at the end of the string
      .replace(/\{([^{}]*?)$/g, '{$1}')
      .replace(/\[([^\[\]]*?)$/g, '[$1]')
      
      // Ensure numbers are not in quotes
      .replace(/"(\d+)\.?(\d*)"/g, (match, p1, p2) => {
        // Keep numbers with decimals as is, but remove quotes
        if (p2) return `${p1}.${p2}`;
        return p1;
      })
      
      // Fix boolean values
      .replace(/"(true|false)"/gi, (_, bool) => bool.toLowerCase());
    
    // Check if the JSON is now valid
    try {
      JSON.parse(safeJson);
      return safeJson;
    } catch (secondError) {
      // If it's still not valid, try more aggressive repairs
      
      // Try to reconstruct the minimal valid structure
      if (safeJson.includes('"weeklyPlan"')) {
        // Try to extract weeklyPlan array
        const weeklyPlanMatch = safeJson.match(/"weeklyPlan"\s*:\s*(\[.*?\])/);
        if (weeklyPlanMatch) {
          try {
            const weeklyPlanArray = JSON.parse(weeklyPlanMatch[1]);
            
            // Create a minimal valid structure
            return JSON.stringify({
              weeklyPlan: weeklyPlanArray,
              planSummary: "Diet plan generated with limited data",
              weeklyNutritionAverage: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
              }
            });
          } catch (error) {
            // If we can't parse the weeklyPlan array, return a minimal structure
            return '{"weeklyPlan":[],"planSummary":"Error parsing plan data","weeklyNutritionAverage":{"calories":0,"protein":0,"carbs":0,"fat":0}}';
          }
        }
      }
      
      // Last resort: return minimal valid structure
      return '{"weeklyPlan":[],"planSummary":"Error parsing plan data","weeklyNutritionAverage":{"calories":0,"protein":0,"carbs":0,"fat":0}}';
    }
  }
}