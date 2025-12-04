import React, { useState, useEffect } from "react";
import PhaseOneLayout from "@/components/phase-one/PhaseOneLayout";
import DayContentRenderer from "@/components/phase-one/DayContentRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";
import { supabase } from "@/integrations/supabase/client";

const PhaseOne = () => {
  const { user } = useAuth();
  const userStatus = useUserStatus();
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
      if (currentDay === userStatus.phaseOneDay) return; // No change

      try {
        await supabase
          .from("user_progress")
          .update({ 
            phase_one_day: currentDay,
            updated_at: new Date().toISOString()
          })
          .eq("user_id", user.id);

        // Update local context to stay in sync
        userStatus.updateLocalStatus({ phaseOneDay: currentDay });
        console.log("Progress saved - Phase 1 Day:", currentDay);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };

    saveProgress();
  }, [currentDay, user, isLoadingProgress, userStatus.phaseOneDay]);

  // Load questionnaire completion status from localStorage
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

  // Show loading only for progress data (auth/subscription handled by ProtectedRoute)
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
