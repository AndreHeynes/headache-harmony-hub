
/**
 * Enhanced input validation and sanitization
 */

import { hasSecurityRisk, sanitizeInput } from './encryption';
import { logSecurityEvent } from './securityMonitor';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => boolean;
  errorMessage?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue: string;
}

/**
 * Enhanced input validation with security monitoring
 */
export const validateInput = (
  value: string,
  rules: ValidationRule,
  fieldName: string = 'input'
): ValidationResult => {
  const errors: string[] = [];
  let sanitizedValue = sanitizeInput(value);

  // Security risk check
  if (hasSecurityRisk(value)) {
    logSecurityEvent('validation_failure', `Security risk detected in ${fieldName}: potential XSS`, 'high');
    errors.push('Invalid input detected for security reasons');
    return { isValid: false, errors, sanitizedValue: '' };
  }

  // Required check
  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push(`${fieldName} is required`);
  }

  // Length checks
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`${fieldName} must not exceed ${rules.maxLength} characters`);
    logSecurityEvent('validation_failure', `Input length exceeded for ${fieldName}: ${value.length} chars`, 'medium');
  }

  // Pattern validation
  if (rules.pattern && value && !rules.pattern.test(value)) {
    errors.push(rules.errorMessage || `${fieldName} format is invalid`);
  }

  // Custom validation
  if (rules.customValidator && value && !rules.customValidator(value)) {
    errors.push(rules.errorMessage || `${fieldName} validation failed`);
  }

  // Log validation failures
  if (errors.length > 0) {
    logSecurityEvent('validation_failure', `Validation failed for ${fieldName}: ${errors.join(', ')}`, 'low');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue
  };
};

/**
 * Predefined validation rules for common field types
 */
export const ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    errorMessage: 'Please enter a valid email address'
  },
  
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    errorMessage: 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character'
  },
  
  name: {
    required: true,
    minLength: 1,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMessage: 'Name can only contain letters, spaces, hyphens, and apostrophes'
  },
  
  headacheNote: {
    maxLength: 500,
    customValidator: (value: string) => {
      // Check for potentially sensitive medical information patterns
      const sensitivePatterns = [
        /ssn|social security/i,
        /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
        /\b\d{16}\b/, // Credit card pattern
      ];
      return !sensitivePatterns.some(pattern => pattern.test(value));
    },
    errorMessage: 'Please avoid including sensitive personal information'
  },
  
  numeric: {
    pattern: /^\d+(\.\d+)?$/,
    errorMessage: 'Please enter a valid number'
  },
  
  phoneNumber: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    errorMessage: 'Please enter a valid phone number'
  }
};

/**
 * Validate multiple fields at once
 */
export const validateForm = (
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): { isValid: boolean; errors: Record<string, string[]>; sanitizedData: Record<string, string> } => {
  const errors: Record<string, string[]> = {};
  const sanitizedData: Record<string, string> = {};
  let isValid = true;

  Object.entries(formData).forEach(([fieldName, value]) => {
    const rules = validationRules[fieldName];
    if (rules) {
      const result = validateInput(value, rules, fieldName);
      if (!result.isValid) {
        errors[fieldName] = result.errors;
        isValid = false;
      }
      sanitizedData[fieldName] = result.sanitizedValue;
    } else {
      sanitizedData[fieldName] = sanitizeInput(value);
    }
  });

  return { isValid, errors, sanitizedData };
};

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  private attempts: Record<string, number[]> = {};
  
  checkLimit(identifier: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.attempts[identifier]) {
      this.attempts[identifier] = [];
    }
    
    // Remove old attempts outside the window
    this.attempts[identifier] = this.attempts[identifier].filter(time => time > windowStart);
    
    if (this.attempts[identifier].length >= maxAttempts) {
      logSecurityEvent('suspicious_activity', `Rate limit exceeded for ${identifier}`, 'medium');
      return false;
    }
    
    this.attempts[identifier].push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
