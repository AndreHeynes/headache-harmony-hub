import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
  requireOnboarding?: boolean;
}

/**
 * Centralized route protection component.
 * Handles all auth, subscription, and onboarding checks in one place.
 * CRITICAL: Waits for BOTH auth AND user status to be fully loaded before redirecting.
 */
export const ProtectedRoute = ({
  children,
  requireSubscription = false,
  requireOnboarding = false,
}: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const userStatus = useUserStatus();

  // CRITICAL: Wait for BOTH auth AND status to be fully initialized
  const isLoading = authLoading || userStatus.loading || !userStatus.isInitialized;

  console.log("ProtectedRoute check:", {
    authLoading,
    statusLoading: userStatus.loading,
    isInitialized: userStatus.isInitialized,
    hasUser: !!user,
    hasSubscription: userStatus.hasSubscription,
    hasCompletedOnboarding: userStatus.hasCompletedOnboarding,
    requireSubscription,
    requireOnboarding,
    isLoading,
  });

  if (isLoading) {
    console.log("ProtectedRoute: Still loading, showing loading state");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!user) {
    console.log("ProtectedRoute: No user, redirecting to sign-in");
    return <Navigate to="/sign-in" replace />;
  }

  // Check subscription if required
  if (requireSubscription && !userStatus.hasSubscription) {
    console.log("ProtectedRoute: No subscription, redirecting to pricing");
    return <Navigate to="/pricing" replace />;
  }

  // Check onboarding if required
  if (requireOnboarding && !userStatus.hasCompletedOnboarding) {
    console.log("ProtectedRoute: Onboarding not complete, redirecting to onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  // All checks passed - render the protected content
  console.log("ProtectedRoute: All checks passed, rendering children");
  return <>{children}</>;
};
