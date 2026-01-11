import { useAuth } from './useAuth';
import { useBetaSession } from '@/contexts/BetaSessionContext';

interface CurrentUser {
  id: string;
  email: string | null;
  isAuthenticated: boolean;
  source: 'supabase' | 'beta' | null;
}

/**
 * Unified hook that provides a consistent user identity from either:
 * 1. Supabase authentication (standard auth flow)
 * 2. Beta session (token-based access during beta)
 * 
 * This allows data persistence hooks to work with both auth methods.
 */
export const useCurrentUser = (): CurrentUser => {
  const { user: supabaseUser, isAuthenticated: supabaseAuth } = useAuth();
  const { session: betaSession } = useBetaSession();

  // Priority: Supabase auth takes precedence (will be used post-beta)
  if (supabaseAuth && supabaseUser) {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? null,
      isAuthenticated: true,
      source: 'supabase',
    };
  }

  // Fallback to beta session
  if (betaSession.isAuthenticated && betaSession.user?.id) {
    return {
      id: betaSession.user.id,
      email: betaSession.user.email ?? null,
      isAuthenticated: true,
      source: 'beta',
    };
  }

  // Not authenticated
  return {
    id: '',
    email: null,
    isAuthenticated: false,
    source: null,
  };
};
