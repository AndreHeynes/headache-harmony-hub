import { useState, useEffect, useCallback, useRef } from 'react';
import { useBetaSession, BetaUser } from '@/contexts/BetaSessionContext';

// Re-export for backward compatibility
export { BetaSessionProvider, useBetaSession } from '@/contexts/BetaSessionContext';

interface ValidationResult {
  isValidating: boolean;
  isValid: boolean;
  user: BetaUser | null;
  error: string | null;
  isExpired: boolean;
  clearBetaSession: () => void;
}

const VALIDATION_ENDPOINT = 'https://plgarmijuqynxeyymkco.supabase.co/functions/v1/validate-beta-token';
const REVALIDATION_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useTokenValidation = (): ValidationResult => {
  const { session, setSession, logout, isTokenExpired } = useBetaSession();
  const hasValidated = useRef(false);
  const [state, setState] = useState<ValidationResult>({
    isValidating: true,
    isValid: false,
    user: null,
    error: null,
    isExpired: false,
    clearBetaSession: logout,
  });

  const validateToken = useCallback(async (token: string): Promise<void> => {
    setState(prev => ({ ...prev, isValidating: true, error: null }));

    try {
      const response = await fetch(VALIDATION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          product: 'program'
        }),
      });

      // FIX: Check HTTP status BEFORE parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Validation failed';
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorMessage;
        } catch {
          errorMessage = errorText || `HTTP ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.valid && data.user) {
        // FIX: Check if token is expired from response
        if (data.user.token_expires_at && new Date(data.user.token_expires_at) < new Date()) {
          setState({
            isValidating: false,
            isValid: false,
            user: null,
            error: 'Your access token has expired. Please request a new one.',
            isExpired: true,
            clearBetaSession: logout,
          });
          logout();
          return;
        }

        const normalizedUser: BetaUser = {
          ...data.user,
          fullName: data.user.fullName || data.user.full_name || '',
          full_name: data.user.full_name || data.user.fullName || '',
        };

        setSession(normalizedUser, token);
        setState({
          isValidating: false,
          isValid: true,
          user: normalizedUser,
          error: null,
          isExpired: false,
          clearBetaSession: logout,
        });
      } else {
        setState({
          isValidating: false,
          isValid: false,
          user: null,
          error: data.error || 'Invalid access token',
          isExpired: data.error?.toLowerCase().includes('expired') || false,
          clearBetaSession: logout,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Validation failed';
      
      // FIX: Only log in development
      if (import.meta.env.DEV) {
        console.error('Token validation error:', err);
      }
      
      setState({
        isValidating: false,
        isValid: false,
        user: null,
        error: errorMessage,
        isExpired: errorMessage.toLowerCase().includes('expired'),
        clearBetaSession: logout,
      });
    }
  }, [setSession, logout]);

  useEffect(() => {
    // Prevent duplicate validation
    if (hasValidated.current) return;
    hasValidated.current = true;

    // Get token from URL or stored session
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    const storedToken = session.token;
    const token = urlToken || storedToken;

    if (!token) {
      setState({
        isValidating: false,
        isValid: false,
        user: null,
        error: null,
        isExpired: false,
        clearBetaSession: logout,
      });
      return;
    }

    // FIX: Always validate on mount, even with stored session
    validateToken(token);

    // Clean up URL if token was in query params
    if (urlToken) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('token');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, []);

  // FIX: Periodic re-validation for long sessions
  useEffect(() => {
    if (!session.isAuthenticated || !session.token) return;

    const interval = setInterval(() => {
      validateToken(session.token!);
    }, REVALIDATION_INTERVAL);

    return () => clearInterval(interval);
  }, [session.isAuthenticated, session.token, validateToken]);

  // Use stored user if authenticated
  if (session.isAuthenticated && session.user && !state.isValidating) {
    if (isTokenExpired()) {
      return {
        isValidating: false,
        isValid: false,
        user: null,
        error: 'Your access token has expired. Please request a new one.',
        isExpired: true,
        clearBetaSession: logout,
      };
    }

    return {
      isValidating: false,
      isValid: true,
      user: session.user,
      error: null,
      isExpired: false,
      clearBetaSession: logout,
    };
  }

  return state;
};
