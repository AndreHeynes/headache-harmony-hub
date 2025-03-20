
import React, { useState, useEffect } from "react";
import DaysOneToSevenContent from "./DaysOneToSevenContent";
import DayEightContent from "./DayEightContent";

interface PhaseThreeContentProps {
  day: number;
}

const PhaseThreeContent: React.FC<PhaseThreeContentProps> = ({ day }) => {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Load completed questionnaires and results from localStorage
    const loadQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      const results: Record<string, any> = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
          
          try {
            results[id] = JSON.parse(savedResponse);
          } catch (e) {
            console.error(`Error parsing ${id} questionnaire results`, e);
          }
        }
      });
      
      console.log("PhaseThreeContent - Loaded questionnaires:", completed);
      console.log("PhaseThreeContent - Loaded results:", results);
      
      setCompletedQuestionnaires(completed);
      setQuestionnaireResults(results);
    };
    
    loadQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadQuestionnaires);
    };
  }, []);

  const allCompleted = Object.keys(completedQuestionnaires).length >= 4;
  
  console.log("PhaseThreeContent - Day:", day);
  console.log("PhaseThreeContent - All Completed:", allCompleted);
  console.log("PhaseThreeContent - Questionnaire results available:", Object.keys(questionnaireResults));

  if (day >= 1 && day <= 7) {
    return <DaysOneToSevenContent completedQuestionnaires={completedQuestionnaires} />;
  } else if (day === 8) {
    console.log("PhaseThreeContent - Rendering DayEightContent");
    return <DayEightContent allCompleted={allCompleted} questionnaireResults={questionnaireResults} />;
  } else {
    return <p>Content for this day is not available.</p>;
  }
};

export default PhaseThreeContent;
