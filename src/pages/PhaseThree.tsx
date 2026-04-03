
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseHeading from "@/components/phase/PhaseHeading";
import PhaseThreeTopSection from "@/components/phase-three/PhaseThreeTopSection";
import PhaseThreeMainContent from "@/components/phase-three/PhaseThreeMainContent";
import PageFooter from "@/components/layout/PageFooter";
import { usePhaseThreeToasts } from "@/components/phase-three/usePhaseThreeToasts";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { useUserStatus } from "@/hooks/useUserStatus";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const PhaseThree = () => {
  const { user } = useAuth();
  const userStatus = useUserStatus();
  const [currentDay, setCurrentDay] = useState(userStatus.phaseThreeDay || 1);
  const totalDays = 8;
  const { 
    showIncompletionToast, 
    showQuestionnairesReminderToast, 
    showCompletionToast 
  } = usePhaseThreeToasts();
  const { getPhaseResponses, loading: questLoading } = useQuestionnaireResponses();
  
  // Track completed questionnaires from DB
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  
  // Sync currentDay from userStatus when it initializes
  useEffect(() => {
    if (userStatus.isInitialized && userStatus.phaseThreeDay) {
      setCurrentDay(userStatus.phaseThreeDay);
    }
  }, [userStatus.isInitialized, userStatus.phaseThreeDay]);
  
  // Load completed questionnaires from DB
  useEffect(() => {
    const loadQuestionnaires = async () => {
      if (questLoading) return;
      try {
        const responses = await getPhaseResponses(3);
        const completed: Record<string, boolean> = {};
        Object.keys(responses).forEach(id => {
          completed[id] = true;
        });
        setCompletedQuestionnaires(completed);
        console.log("PhaseThree - Loaded questionnaires from DB:", completed);
      } catch (error) {
        console.error("Error loading questionnaires:", error);
      }
    };
    
    loadQuestionnaires();
  }, [questLoading, getPhaseResponses]);
  
  // Persist currentDay to database when it changes
  useEffect(() => {
    const persistDay = async () => {
      if (!user || !userStatus.isInitialized) return;
      if (currentDay === userStatus.phaseThreeDay) return;
      
      try {
        await supabase
          .from('user_progress')
          .update({ phase_three_day: currentDay })
          .eq('user_id', user.id);
        
        userStatus.updateLocalStatus({ phaseThreeDay: currentDay });
      } catch (error) {
        console.error("Error persisting phase 3 day:", error);
      }
    };
    
    persistDay();
  }, [currentDay, user, userStatus.isInitialized]);
  
  // Show a reminder toast when user reaches day 7 and hasn't completed all questionnaires
  useEffect(() => {
    if (currentDay === 7) {
      const incompleteQuestionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'].filter(
        id => !completedQuestionnaires[id]
      );
      
      if (incompleteQuestionnaires.length > 0) {
        showQuestionnairesReminderToast(incompleteQuestionnaires);
      }
    }
  }, [currentDay, completedQuestionnaires]);
  
  const goToNextDay = () => {
    if (currentDay < totalDays) {
      // If going to day 8, check if all questionnaires are completed
      if (currentDay === 7 && Object.keys(completedQuestionnaires).length < 4) {
        showIncompletionToast();
        return;
      }
      
      setCurrentDay(currentDay + 1);
      
      // Show completion toast for final day
      if (currentDay === totalDays - 1) {
        showCompletionToast();
      }
    }
  };
  
  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  return (
    <>
      <PageLayout>
        <div className="flex justify-between items-center mb-8">
          <PhaseHeading title="Consolidating your recovery progress" />
        </div>
        
        <PhaseThreeTopSection 
          currentDay={currentDay} 
          totalDays={totalDays} 
        />

        <PhaseThreeMainContent
          currentDay={currentDay}
          totalDays={totalDays}
          onPrevious={goToPreviousDay}
          onNext={goToNextDay}
        />
      </PageLayout>
      <PageFooter />
    </>
  );
};

export default PhaseThree;
