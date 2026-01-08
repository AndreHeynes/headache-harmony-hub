
import React, { useState, useEffect } from "react";
import DaysOneToSevenContent from "./DaysOneToSevenContent";
import DayEightContent from "./DayEightContent";
import { migrateQuestionnaireData } from "@/utils/dataMigration";

interface PhaseThreeContentProps {
  day: number;
}

const PhaseThreeContent: React.FC<PhaseThreeContentProps> = ({ day }) => {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Run migration on component mount
    migrateQuestionnaireData();
    
    // Set current phase in localStorage
    localStorage.setItem('current-phase', '3');
  }, []);
  
  useEffect(() => {
    // Load completed questionnaires and results from localStorage
    const loadQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      const results: Record<string, any> = {};
      
      questionnaires.forEach(id => {
        // Check Phase 3 specific keys first, then fall back to legacy
        const phase3Key = `questionnaire-phase3-${id}`;
        const legacyKey = `questionnaire-${id}`;
        
        const savedResponse = localStorage.getItem(phase3Key) || localStorage.getItem(legacyKey);
        
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

  // Check specifically for Phase 3 questionnaire completion
  const phase3Questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
  const allCompleted = phase3Questionnaires.every(id => completedQuestionnaires[id]);
  
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
