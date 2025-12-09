import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";

interface BetaUser {
  email: string;
  fullName: string;
  product: string;
}

interface BetaSessionContextType {
  isValidating: boolean;
  isValid: boolean;
  user: BetaUser | null;
  error: string | null;
  clearBetaSession: () => void;
}

const BetaSessionContext = createContext<BetaSessionContextType | null>(null);

const STORAGE_KEY = "beta_access_token";
const USER_STORAGE_KEY = "beta_user";
const HEADACHE_RECOVERY_API = "https://plgarmijuqynxeyymkco.supabase.co/functions/v1/validate-beta-token";

export function BetaSessionProvider({ children }: { children: ReactNode }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState<BetaUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearBetaSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setIsValid(false);
    setUser(null);
    setError(null);
    window.location.href = "/";
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      setIsValidating(true);
      setError(null);

      // Check URL for token parameter
      const urlParams = new URLSearchParams(window.location.search);
      let token = urlParams.get("token");

      // If no token in URL, check localStorage
      if (!token) {
        token = localStorage.getItem(STORAGE_KEY);
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        
        if (token && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsValid(true);
            setIsValidating(false);
            return;
          } catch {
            // Invalid stored data, continue to validate
          }
        }
      }

      // No token found anywhere
      if (!token) {
        setIsValid(false);
        setError("No access token provided");
        setIsValidating(false);
        return;
      }

      try {
        // Call HeadacheRecovery API directly
        const response = await fetch(HEADACHE_RECOVERY_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.valid && data.user) {
          localStorage.setItem(STORAGE_KEY, token);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
          
          // Remove token from URL for cleaner UX
          if (urlParams.has("token")) {
            window.history.replaceState({}, "", window.location.pathname);
          }

          setUser(data.user);
          setIsValid(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
          setIsValid(false);
          setError(data.error || "Invalid token");
        }
      } catch (err) {
        console.error("Token validation error:", err);
        setIsValid(false);
        setError("Failed to validate access token");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  return (
    <BetaSessionContext.Provider value={{ isValidating, isValid, user, error, clearBetaSession }}>
      {children}
    </BetaSessionContext.Provider>
  );
}

export function useBetaSession(): BetaSessionContextType {
  const context = useContext(BetaSessionContext);
  if (!context) {
    throw new Error("useBetaSession must be used within a BetaSessionProvider");
  }
  return context;
}

// Legacy export for backward compatibility
export function useTokenValidation() {
  return useBetaSession();
}
