import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BetaUser {
  id?: string;
  email: string;
  fullName: string;
  full_name?: string;
  product: string;
  status?: string;
  token_expires_at?: string;
}

interface BetaSession {
  user: BetaUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface BetaSessionContextType {
  session: BetaSession;
  setSession: (user: BetaUser, token: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

const BetaSessionContext = createContext<BetaSessionContextType | undefined>(undefined);

const STORAGE_KEY = 'beta_access_token';
const USER_STORAGE_KEY = 'beta_user';

export const BetaSessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSessionState] = useState<BetaSession>(() => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (token && storedUser) {
        const user = JSON.parse(storedUser);
        return {
          user,
          token,
          isAuthenticated: true,
        };
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Failed to parse stored session:', e);
      }
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    return { user: null, token: null, isAuthenticated: false };
  });

  const isTokenExpired = (): boolean => {
    if (!session.user?.token_expires_at) return false;
    return new Date(session.user.token_expires_at) < new Date();
  };

  const setSession = (user: BetaUser, token: string) => {
    const newSession = { user, token, isAuthenticated: true };
    setSessionState(newSession);
    localStorage.setItem(STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setSessionState({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    window.location.href = '/';
  };

  // Check for token expiry periodically
  useEffect(() => {
    if (!session.isAuthenticated) return;
    
    const checkExpiry = () => {
      if (isTokenExpired()) {
        logout();
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 60000);
    
    return () => clearInterval(interval);
  }, [session.isAuthenticated, session.user?.token_expires_at]);

  return (
    <BetaSessionContext.Provider value={{ session, setSession, logout, isTokenExpired }}>
      {children}
    </BetaSessionContext.Provider>
  );
};

export const useBetaSession = () => {
  const context = useContext(BetaSessionContext);
  if (!context) {
    throw new Error('useBetaSession must be used within a BetaSessionProvider');
  }
  return context;
};
