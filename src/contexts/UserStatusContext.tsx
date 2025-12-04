import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface UserStatusState {
  hasSubscription: boolean;
  hasCompletedOnboarding: boolean;
  currentPhase: number;
  phaseOneDay: number;
  phaseTwoWeek: number;
  phaseThreeDay: number;
  loading: boolean;
  isInitialized: boolean;
}

interface UserStatusContextType extends UserStatusState {
  refetch: () => Promise<void>;
  updateLocalStatus: (updates: Partial<UserStatusState>) => void;
}

const defaultState: UserStatusState = {
  hasSubscription: false,
  hasCompletedOnboarding: false,
  currentPhase: 1,
  phaseOneDay: 1,
  phaseTwoWeek: 1,
  phaseThreeDay: 1,
  loading: true,
  isInitialized: false,
};

const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

export const UserStatusProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<UserStatusState>(defaultState);

  const fetchUserStatus = useCallback(async (): Promise<void> => {
    if (!user) {
      console.log("UserStatusContext: No user, resetting to defaults");
      setStatus({
        ...defaultState,
        loading: false,
        isInitialized: true,
      });
      return;
    }

    console.log("UserStatusContext: Fetching status for user:", user.id);
    setStatus(prev => ({ ...prev, loading: true }));

    try {
      // Fetch subscription and progress in parallel
      const [subscriptionResult, progressResult] = await Promise.all([
        supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .limit(1),
        supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle()
      ]);

      const hasSubscription = !!(subscriptionResult.data && subscriptionResult.data.length > 0);
      const progress = progressResult.data;

      const newStatus: UserStatusState = {
        hasSubscription,
        hasCompletedOnboarding: progress?.has_completed_onboarding ?? false,
        currentPhase: progress?.current_phase ?? 1,
        phaseOneDay: progress?.phase_one_day ?? 1,
        phaseTwoWeek: progress?.phase_two_week ?? 1,
        phaseThreeDay: progress?.phase_three_day ?? 1,
        loading: false,
        isInitialized: true,
      };

      console.log("UserStatusContext: Status fetched:", newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error("UserStatusContext: Error fetching status:", error);
      setStatus({
        ...defaultState,
        loading: false,
        isInitialized: true,
      });
    }
  }, [user]);

  // Optimistic update for immediate UI feedback
  const updateLocalStatus = useCallback((updates: Partial<UserStatusState>) => {
    console.log("UserStatusContext: Local update:", updates);
    setStatus(prev => ({ ...prev, ...updates }));
  }, []);

  // Fetch when user changes
  useEffect(() => {
    if (!authLoading) {
      fetchUserStatus();
    }
  }, [user?.id, authLoading, fetchUserStatus]);

  const value: UserStatusContextType = {
    ...status,
    refetch: fetchUserStatus,
    updateLocalStatus,
  };

  return (
    <UserStatusContext.Provider value={value}>
      {children}
    </UserStatusContext.Provider>
  );
};

export const useUserStatusContext = (): UserStatusContextType => {
  const context = useContext(UserStatusContext);
  if (!context) {
    throw new Error("useUserStatusContext must be used within a UserStatusProvider");
  }
  return context;
};
