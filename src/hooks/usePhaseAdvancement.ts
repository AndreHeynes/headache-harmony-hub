import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { toast } from "sonner";

const PHASE_1_QUESTIONNAIRES = ['hit-6', 'fht', 'psfs', 'mkq', 'midas', 'hsloc', 'psc', 'hses', 'hb'];
const PHASE_2_TOTAL_DAYS = 77;

/**
 * Hook to check and auto-advance the user's current phase when milestones are met.
 * 
 * Phase 1 → 2: All 9 questionnaires completed
 * Phase 2 → 3: Day 77 reached (final day)
 * Phase 3 → 4: All 4 Phase 3 questionnaires completed + Day 8 viewed
 */
export const usePhaseAdvancement = () => {
  const { user } = useAuth();
  const userStatus = useUserStatus();

  const advanceToPhase = useCallback(async (newPhase: number) => {
    if (!user) return false;

    try {
      const upsertData: Record<string, unknown> = {
        user_id: user.id,
        current_phase: newPhase,
        updated_at: new Date().toISOString(),
      };

      // Set phase_two_start_date when advancing to Phase 2
      if (newPhase === 2) {
        upsertData.phase_two_start_date = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase
        .from("user_progress")
        .upsert(upsertData as any, { onConflict: "user_id" });

      if (error) {
        console.error("Error advancing phase:", error);
        return false;
      }

      userStatus.updateLocalStatus({ currentPhase: newPhase });

      const phaseNames: Record<number, string> = {
        2: "Phase 2: Building Your Recovery Foundation",
        3: "Phase 3: Consolidating Your Progress",
        4: "Phase 4: Maintain Your Gains",
      };

      toast.success(`Congratulations! You've unlocked ${phaseNames[newPhase] || `Phase ${newPhase}`}!`, {
        duration: 5000,
      });

      return true;
    } catch (err) {
      console.error("Error advancing phase:", err);
      return false;
    }
  }, [user, userStatus]);

  const checkPhase1Completion = useCallback(async () => {
    if (!user || userStatus.currentPhase !== 1) return false;

    try {
      const { data, error } = await supabase
        .from("user_responses")
        .select("questionnaire_id")
        .eq("user_id", user.id)
        .eq("phase", 1);

      if (error) return false;

      const completedIds = new Set(data?.map(r => r.questionnaire_id) || []);
      const allDone = PHASE_1_QUESTIONNAIRES.every(id => completedIds.has(id));

      if (allDone) {
        return await advanceToPhase(2);
      }
      return false;
    } catch {
      return false;
    }
  }, [user, userStatus.currentPhase, advanceToPhase]);

  const checkPhase2Completion = useCallback(async (currentDay: number) => {
    if (!user || userStatus.currentPhase !== 2) return false;
    if (currentDay >= PHASE_2_TOTAL_DAYS) {
      return await advanceToPhase(3);
    }
    return false;
  }, [user, userStatus.currentPhase, advanceToPhase]);

  const checkPhase3Completion = useCallback(async (completedQuestionnaires: Record<string, boolean>, currentDay: number) => {
    if (!user || userStatus.currentPhase !== 3) return false;

    const phase3Ids = ['hit-6', 'midas', 'psfs', 'gpoc'];
    const allDone = phase3Ids.every(id => completedQuestionnaires[id]);

    if (allDone && currentDay >= 8) {
      return await advanceToPhase(4);
    }
    return false;
  }, [user, userStatus.currentPhase, advanceToPhase]);

  return {
    checkPhase1Completion,
    checkPhase2Completion,
    checkPhase3Completion,
    advanceToPhase,
  };
};
