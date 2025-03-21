
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseHeading from "@/components/phase/PhaseHeading";
import TestDayButton from "@/components/phase-three/TestDayButton";
import PhaseThreeTopSection from "@/components/phase-three/PhaseThreeTopSection";
import PhaseThreeMainContent from "@/components/phase-three/PhaseThreeMainContent";
import PageFooter from "@/components/layout/PageFooter";
import { usePhaseThreeToasts } from "@/components/phase-three/usePhaseThreeToasts";

const PhaseThree = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 8; // 8 days to include feedback day
  const { 
    showIncompletionToast, 
    showQuestionnairesReminderToast, 
    showCompletionToast 
  } = usePhaseThreeToasts();
  
  // Initialize currentDay from localStorage or set to 1
  useEffect(() => {
    const savedDay = localStorage.getItem('phase3-current-day');
    if (savedDay) {
      setCurrentDay(parseInt(savedDay, 10));
    }
  }, []);
  
  // Save currentDay to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('phase3-current-day', currentDay.toString());
    console.log("Current day set to:", currentDay);
  }, [currentDay]);
  
  // Track completed questionnaires
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load completed questionnaires from localStorage
    const loadCompletedQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
        }
      });
      
      setCompletedQuestionnaires(completed);
      console.log("Loaded questionnaires in PhaseThree:", completed);
    };
    
    loadCompletedQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);
  
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

  // FOR TESTING ONLY: Navigate directly to day 8
  const goToDay8 = () => {
    console.log("Going to day 8 for testing");
    // Add some mock data for testing
    const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
    questionnaires.forEach(id => {
      if (!localStorage.getItem(`questionnaire-${id}`)) {
        localStorage.setItem(`questionnaire-${id}`, JSON.stringify({completed: true}));
      }
    });
    
    setCurrentDay(8);
    // Force reload completed questionnaires
    const completed: Record<string, boolean> = {};
    questionnaires.forEach(id => {
      completed[id] = true;
    });
    setCompletedQuestionnaires(completed);
    console.log("Set current day to 8 and completed questionnaires:", completed);
  };

  return (
    <>
      <PageLayout>
        <div className="flex justify-between items-center mb-8">
          <PhaseHeading title="Consolidating your recovery progress" />
          <TestDayButton onClick={goToDay8} />
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
