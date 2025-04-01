
/**
 * Security utility functions for client-side encryption
 * Note: This provides basic protection but should be replaced with server-side 
 * security when Supabase is integrated
 */

// Simple encryption key - in production this should be more securely managed
// This will be replaced with proper auth when Supabase is integrated
const ENCRYPTION_KEY = "temp_headache_recovery_key";

/**
 * Encrypts sensitive data before storing it
 * Uses a simple XOR encryption for now - will be replaced with proper encryption
 */
export const encryptData = (data: any): string => {
  if (!data) return '';
  
  try {
    // Convert data to string if it's not already
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Simple XOR encryption with the key
    let encrypted = '';
    for (let i = 0; i < stringData.length; i++) {
      const charCode = stringData.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    
    // Convert to base64 for storage
    return btoa(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    return '';
  }
};

/**
 * Decrypts data retrieved from storage
 */
export const decryptData = (encryptedData: string): any => {
  if (!encryptedData) return null;
  
  try {
    // Decode from base64
    const encrypted = atob(encryptedData);
    
    // Decrypt using XOR with the key
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    
    // Parse back to original format if it was JSON
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

/**
 * Securely store data in localStorage with encryption
 */
export const secureStore = (key: string, data: any): void => {
  if (!key || data === undefined) return;
  
  try {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Error storing encrypted data:", error);
  }
};

/**
 * Retrieve and decrypt data from localStorage
 */
export const secureRetrieve = (key: string): any => {
  if (!key) return null;
  
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    
    return decryptData(encryptedData);
  } catch (error) {
    console.error("Error retrieving encrypted data:", error);
    return null;
  }
};

/**
 * Securely remove data from localStorage
 */
export const secureRemove = (key: string): void => {
  if (!key) return;
  localStorage.removeItem(key);
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Basic HTML sanitization
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Check if a string contains potentially malicious content
 */
export const hasSecurityRisk = (input: string): boolean => {
  if (!input) return false;
  
  // Check for common script injection patterns
  const riskPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi
  ];
  
  return riskPatterns.some(pattern => pattern.test(input));
};
