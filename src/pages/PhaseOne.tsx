
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhaseOneLayout from "@/components/phase-one/PhaseOneLayout";
import DayContentRenderer from "@/components/phase-one/DayContentRenderer";
import { useAuth } from "@/hooks/useAuth";
import { useUserStatus } from "@/hooks/useUserStatus";

const PhaseOne = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const userStatus = useUserStatus();
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});

  // Guard: Require authentication and subscription
  useEffect(() => {
    if (authLoading || userStatus.loading) return;

    if (!user) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!userStatus.hasSubscription) {
      navigate("/pricing", { replace: true });
      return;
    }

    if (!userStatus.hasCompletedOnboarding) {
      navigate("/onboarding", { replace: true });
    }
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

  // Show loading state while checking auth/subscription
  if (authLoading || userStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
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
