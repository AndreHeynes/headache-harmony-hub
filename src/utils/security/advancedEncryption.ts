
/**
 * Advanced encryption utilities using Web Crypto API
 * This provides much stronger security than the basic XOR encryption
 */

interface EncryptedData {
  data: string;
  iv: string;
  salt: string;
  timestamp: number;
}

/**
 * Generate a cryptographic key from a password using PBKDF2
 */
const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

/**
 * Encrypt data using AES-GCM with a user-derived key
 */
export const encryptDataAdvanced = async (data: any, userKey?: string): Promise<string> => {
  try {
    const password = userKey || 'default_headache_recovery_key_v2';
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Derive key from password
    const key = await deriveKey(password, salt);
    
    // Encrypt the data
    const encoder = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(stringData)
    );
    
    // Package the encrypted data with metadata
    const encryptedData: EncryptedData = {
      data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv)),
      salt: btoa(String.fromCharCode(...salt)),
      timestamp: Date.now()
    };
    
    return btoa(JSON.stringify(encryptedData));
  } catch (error) {
    console.error('Advanced encryption error:', error);
    // Fallback to basic encryption if Web Crypto API fails
    const { encryptData } = await import('./encryption');
    return encryptData(data);
  }
};

/**
 * Decrypt data using AES-GCM
 */
export const decryptDataAdvanced = async (encryptedData: string, userKey?: string): Promise<any> => {
  try {
    const password = userKey || 'default_headache_recovery_key_v2';
    
    // Parse the encrypted data package
    const parsed: EncryptedData = JSON.parse(atob(encryptedData));
    
    // Convert base64 back to arrays
    const data = new Uint8Array(atob(parsed.data).split('').map(c => c.charCodeAt(0)));
    const iv = new Uint8Array(atob(parsed.iv).split('').map(c => c.charCodeAt(0)));
    const salt = new Uint8Array(atob(parsed.salt).split('').map(c => c.charCodeAt(0)));
    
    // Derive the same key
    const key = await deriveKey(password, salt);
    
    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    const decryptedString = decoder.decode(decrypted);
    
    // Try to parse as JSON, return as string if it fails
    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error('Advanced decryption error:', error);
    // Fallback to basic decryption
    const { decryptData } = await import('./encryption');
    return decryptData(encryptedData);
  }
};

/**
 * Check if data was encrypted with advanced encryption
 */
export const isAdvancedEncryption = (encryptedData: string): boolean => {
  try {
    const parsed = JSON.parse(atob(encryptedData));
    return parsed.hasOwnProperty('iv') && parsed.hasOwnProperty('salt') && parsed.hasOwnProperty('timestamp');
  } catch {
    return false;
  }
};
