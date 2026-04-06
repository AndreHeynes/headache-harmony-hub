import React, { useState, useEffect } from "react";
import PhaseOneLayout from "@/components/phase-one/PhaseOneLayout";
import DayContentRenderer from "@/components/phase-one/DayContentRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { supabase } from "@/integrations/supabase/client";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { usePhaseAdvancement } from "@/hooks/usePhaseAdvancement";

const PHASE_1_QUESTIONNAIRES = ['hit-6', 'fht', 'psfs', 'mkq', 'midas', 'hsloc', 'psc', 'hses', 'hb'];

const PhaseOne = () => {
  const { user } = useAuth();
  const userStatus = useUserStatus();
  const { getPhaseResponses, loading: responsesLoading } = useQuestionnaireResponses();
  const { checkPhase1Completion } = usePhaseAdvancement();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Load saved progress from userStatus context
  useEffect(() => {
    if (userStatus.isInitialized && !userStatus.loading) {
      console.log("PhaseOne: Loading progress from context - Day:", userStatus.phaseOneDay);
      setCurrentDay(userStatus.phaseOneDay || 1);
      setIsLoadingProgress(false);
    }
  }, [userStatus.isInitialized, userStatus.loading, userStatus.phaseOneDay]);

  // Save progress when day changes
  useEffect(() => {
    const saveProgress = async () => {
      if (!user || isLoadingProgress) return;
      if (currentDay === userStatus.phaseOneDay) return;

      try {
        await supabase
          .from("user_progress")
          .update({ 
            phase_one_day: currentDay,
            updated_at: new Date().toISOString()
          })
          .eq("user_id", user.id);

        userStatus.updateLocalStatus({ phaseOneDay: currentDay });
        console.log("Progress saved - Phase 1 Day:", currentDay);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };

    saveProgress();
  }, [currentDay, user, isLoadingProgress, userStatus.phaseOneDay]);

  // Load questionnaire completion status from database
  useEffect(() => {
    const loadCompletedQuestionnaires = async () => {
      if (!user) return;
      
      try {
        const responses = await getPhaseResponses(1);
        
        const completed: Record<string, boolean> = {};
        const results: Record<string, any> = {};
        
        Object.entries(responses).forEach(([id, response]) => {
          completed[id] = true;
          results[id] = response;
        });
        
        setCompletedQuestionnaires(completed);
        setQuestionnaireResults(results);

        // Check if all 9 questionnaires are done — auto-advance to Phase 2
        const allDone = PHASE_1_QUESTIONNAIRES.every(id => completed[id]);
        if (allDone && userStatus.currentPhase === 1) {
          checkPhase1Completion();
        }
      } catch (error) {
        console.error("Error loading questionnaires from database:", error);
      }
    };
    
    if (!responsesLoading && user) {
      loadCompletedQuestionnaires();
    }
  }, [user, responsesLoading]);
  
  const renderDayContent = (day: number) => {
    return <DayContentRenderer 
      day={day} 
      completedQuestionnaires={completedQuestionnaires} 
      questionnaireResults={questionnaireResults} 
    />;
  };

  if (isLoadingProgress) {
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
