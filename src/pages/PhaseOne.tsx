
import React, { useState, useEffect } from "react";
import PhaseOneLayout from "@/components/phase-one/PhaseOneLayout";
import DayContentRenderer from "@/components/phase-one/DayContentRenderer";

const PhaseOne = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  
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
