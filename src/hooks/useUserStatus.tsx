import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserStatus {
  hasSubscription: boolean;
  hasCompletedOnboarding: boolean;
  currentPhase: number;
  loading: boolean;
}

export const useUserStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<UserStatus>({
    hasSubscription: false,
    hasCompletedOnboarding: false,
    currentPhase: 1,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setStatus({
        hasSubscription: false,
        hasCompletedOnboarding: false,
        currentPhase: 1,
        loading: false,
      });
      return;
    }

    const fetchUserStatus = async () => {
      try {
        // Check subscription
        const { data: subscription } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle();

        // Check progress/onboarding
        const { data: progress } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        setStatus({
          hasSubscription: !!subscription,
          hasCompletedOnboarding: progress?.has_completed_onboarding || false,
          currentPhase: progress?.current_phase || 1,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching user status:", error);
        setStatus({
          hasSubscription: false,
          hasCompletedOnboarding: false,
          currentPhase: 1,
          loading: false,
        });
      }
    };

    fetchUserStatus();
  }, [user]);

  return status;
};
