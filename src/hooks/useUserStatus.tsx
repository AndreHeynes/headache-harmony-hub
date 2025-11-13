import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserStatus {
  hasSubscription: boolean;
  hasCompletedOnboarding: boolean;
  currentPhase: number;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const useUserStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<UserStatus>({
    hasSubscription: false,
    hasCompletedOnboarding: false,
    currentPhase: 1,
    loading: true,
    refetch: async () => {},
  });

  const fetchUserStatus = async () => {
    if (!user) {
      setStatus(prev => ({
        ...prev,
        hasSubscription: false,
        hasCompletedOnboarding: false,
        currentPhase: 1,
        loading: false,
      }));
      return;
    }

    try {
      setStatus(prev => ({ ...prev, loading: true }));

      // Check subscription - use limit(1) to handle multiple subscriptions
      const { data: subscriptions, error: subError } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1);

      if (subError) {
        console.error("Error fetching subscription:", subError);
      }

      // Check progress/onboarding
      const { data: progress, error: progError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (progError) {
        console.error("Error fetching progress:", progError);
      }

      console.log("User status fetched:", {
        hasSubscription: !!(subscriptions && subscriptions.length > 0),
        hasCompletedOnboarding: progress?.has_completed_onboarding || false,
        currentPhase: progress?.current_phase || 1
      });

      setStatus(prev => ({
        ...prev,
        hasSubscription: !!(subscriptions && subscriptions.length > 0),
        hasCompletedOnboarding: progress?.has_completed_onboarding || false,
        currentPhase: progress?.current_phase || 1,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching user status:", error);
      setStatus(prev => ({
        ...prev,
        hasSubscription: false,
        hasCompletedOnboarding: false,
        currentPhase: 1,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    console.log("useUserStatus: User changed, fetching status for user:", user?.id);
    fetchUserStatus();
  }, [user]);

  // Update the refetch function reference
  useEffect(() => {
    setStatus(prev => ({ ...prev, refetch: fetchUserStatus }));
  }, [user]);

  return status;
};
