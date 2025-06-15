/**
 * Security utility functions for client-side encryption
 * Note: This provides basic protection but should be replaced with server-side 
 * security when Supabase is integrated
 */

import { encryptDataAdvanced, decryptDataAdvanced, isAdvancedEncryption } from './advancedEncryption';
import { logSecurityEvent } from './securityMonitor';

// Simple encryption key - in production this should be more securely managed
// This will be replaced with proper auth when Supabase is integrated
const ENCRYPTION_KEY = "temp_headache_recovery_key";

/**
 * Encrypts sensitive data before storing it
 * Uses advanced encryption when possible, falls back to basic XOR
 */
export const encryptData = async (data: any): Promise<string> => {
  if (!data) return '';
  
  try {
    // Try advanced encryption first
    if (window.crypto && window.crypto.subtle) {
      const encrypted = await encryptDataAdvanced(data);
      logSecurityEvent('data_access', 'Data encrypted using advanced encryption', 'low');
      return encrypted;
    }
  } catch (error) {
    console.warn('Advanced encryption failed, falling back to basic encryption:', error);
    logSecurityEvent('encryption_failure', 'Advanced encryption failed, using fallback', 'medium');
  }
  
  try {
    // Fallback to basic XOR encryption
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Simple XOR encryption with the key
    let encrypted = '';
    for (let i = 0; i < stringData.length; i++) {
      const charCode = stringData.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    
    // Convert to base64 for storage
    const result = btoa(encrypted);
    logSecurityEvent('data_access', 'Data encrypted using basic encryption', 'low');
    return result;
  } catch (error) {
    console.error("Encryption error:", error);
    logSecurityEvent('encryption_failure', 'All encryption methods failed', 'critical');
    return '';
  }
};

/**
 * Decrypts data retrieved from storage
 */
export const decryptData = async (encryptedData: string): Promise<any> => {
  if (!encryptedData) return null;
  
  try {
    // Check if this is advanced encryption
    if (isAdvancedEncryption(encryptedData)) {
      const decrypted = await decryptDataAdvanced(encryptedData);
      logSecurityEvent('data_access', 'Data decrypted using advanced encryption', 'low');
      return decrypted;
    }
  } catch (error) {
    console.warn('Advanced decryption failed, trying basic decryption:', error);
    logSecurityEvent('encryption_failure', 'Advanced decryption failed, trying fallback', 'medium');
  }
  
  try {
    // Fallback to basic XOR decryption
    const encrypted = atob(encryptedData);
    
    // Decrypt using XOR with the key
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    
    // Parse back to original format if it was JSON
    try {
      const result = JSON.parse(decrypted);
      logSecurityEvent('data_access', 'Data decrypted using basic encryption', 'low');
      return result;
    } catch {
      logSecurityEvent('data_access', 'Data decrypted as string using basic encryption', 'low');
      return decrypted;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    logSecurityEvent('encryption_failure', 'All decryption methods failed', 'critical');
    return null;
  }
};

/**
 * Securely store data in localStorage with encryption
 */
export const secureStore = async (key: string, data: any): Promise<void> => {
  if (!key || data === undefined) return;
  
  try {
    const encryptedData = await encryptData(data);
    localStorage.setItem(key, encryptedData);
    logSecurityEvent('data_access', `Data stored securely for key: ${key}`, 'low');
  } catch (error) {
    console.error("Error storing encrypted data:", error);
    logSecurityEvent('encryption_failure', `Failed to store data for key: ${key}`, 'high');
  }
};

/**
 * Retrieve and decrypt data from localStorage
 */
export const secureRetrieve = async (key: string): Promise<any> => {
  if (!key) return null;
  
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    
    const result = await decryptData(encryptedData);
    logSecurityEvent('data_access', `Data retrieved securely for key: ${key}`, 'low');
    return result;
  } catch (error) {
    console.error("Error retrieving encrypted data:", error);
    logSecurityEvent('encryption_failure', `Failed to retrieve data for key: ${key}`, 'high');
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
