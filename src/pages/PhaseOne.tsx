
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhaseOneLayout from "@/components/phase-one/PhaseOneLayout";
import DayContentRenderer from "@/components/phase-one/DayContentRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { supabase } from "@/integrations/supabase/client";

const PhaseOne = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const userStatus = useUserStatus();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Load saved progress from database
  useEffect(() => {
    const loadSavedProgress = async () => {
      if (!user) return;

      try {
        const { data: progress } = await supabase
          .from("user_progress")
          .select("phase_one_day")
          .eq("user_id", user.id)
          .maybeSingle();

        if (progress?.phase_one_day) {
          console.log("Loading saved progress - Phase 1 Day:", progress.phase_one_day);
          setCurrentDay(progress.phase_one_day);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    if (user) {
      loadSavedProgress();
    }
  }, [user]);

  // Save progress when day changes
  useEffect(() => {
    const saveProgress = async () => {
      if (!user || isLoadingProgress) return;

      try {
        await supabase
          .from("user_progress")
          .update({ 
            phase_one_day: currentDay,
            updated_at: new Date().toISOString()
          })
          .eq("user_id", user.id);

        console.log("Progress saved - Phase 1 Day:", currentDay);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };

    saveProgress();
  }, [currentDay, user, isLoadingProgress]);

  // Guard: Require authentication and subscription
  useEffect(() => {
    console.log("Phase One guard check:", {
      authLoading,
      statusLoading: userStatus.loading,
      hasUser: !!user,
      hasSubscription: userStatus.hasSubscription,
      hasCompletedOnboarding: userStatus.hasCompletedOnboarding
    });

    // CRITICAL: Don't redirect while still loading
    if (authLoading || userStatus.loading) {
      console.log("Phase One: Still loading, skipping redirects");
      return;
    }

    // CRITICAL: Additional safety - if user exists but status hasn't loaded yet, wait
    if (user && userStatus.loading) {
      console.log("Phase One: User exists but status still loading, waiting...");
      return;
    }

    if (!user) {
      console.log("Phase One: No user, redirecting to sign-in");
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!userStatus.hasSubscription) {
      console.log("Phase One: No subscription, redirecting to pricing");
      navigate("/pricing", { replace: true });
      return;
    }

    if (!userStatus.hasCompletedOnboarding) {
      console.log("Phase One: Onboarding not completed, redirecting to onboarding");
      navigate("/onboarding", { replace: true });
      return;
    }

    console.log("Phase One: All checks passed, user can access Phase One");
  }, [authLoading, userStatus.loading, user, userStatus.hasSubscription, userStatus.hasCompletedOnboarding, navigate]);
  
  useEffect(() => {
    const loadCompletedQuestionnaires = () => {
      const questionnaires = [
        'hit-6', 'fht', 'psfs', 'mkq', 'midas', 'psc', 'hsloc', 'hses', 'hb'
      ];
      
      const completed: Record<string, boolean> = {};
      const results: Record<string, any> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
          
          try {
            results[id] = JSON.parse(savedResponse);
          } catch (e) {
            console.error(`Error parsing ${id} questionnaire results`);
          }
        }
      });
      
      setCompletedQuestionnaires(completed);
      setQuestionnaireResults(results);
    };
    
    loadCompletedQuestionnaires();
    
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);
  
  const renderDayContent = (day: number) => {
    return <DayContentRenderer 
      day={day} 
      completedQuestionnaires={completedQuestionnaires} 
      questionnaireResults={questionnaireResults} 
    />;
  };

  // Show loading state while checking auth/subscription/progress
  if (authLoading || userStatus.loading || isLoadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <PhaseOneLayout
      currentDay={currentDay}
      setCurrentDay={setCurrentDay}
      totalDays={totalDays}
      completedQuestionnaires={completedQuestionnaires}
      questionnaireResults={questionnaireResults}
      renderDayContent={renderDayContent}
    />
  );
};

export default PhaseOne;
