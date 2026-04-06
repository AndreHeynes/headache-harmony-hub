import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useAuth } from "@/hooks/useAuth";

interface PhaseGuardProps {
  requiredPhase: number;
  children: React.ReactNode;
}

/**
 * Guards phase routes so users cannot access phases they haven't unlocked.
 * Redirects to the appropriate phase or dashboard if the user hasn't reached the required phase.
 */
const PhaseGuard: React.FC<PhaseGuardProps> = ({ requiredPhase, children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentPhase, loading, isInitialized } = useUserStatus();

  // Wait for data to load
  if (authLoading || loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking your progress...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — let other guards handle redirect
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // User hasn't reached this phase yet
  if (currentPhase < requiredPhase) {
    const phaseRoutes: Record<number, string> = {
      1: "/phase-one",
      2: "/phase-two",
      3: "/phase-three",
      4: "/phase-four",
    };
    const redirectTo = phaseRoutes[currentPhase] || "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PhaseGuard;
