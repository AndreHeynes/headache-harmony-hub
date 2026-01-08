import React, { useState, useEffect } from "react";
import DaysOneToSevenContent from "./DaysOneToSevenContent";
import DayEightContent from "./DayEightContent";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";

interface PhaseThreeContentProps {
  day: number;
}

const PhaseThreeContent: React.FC<PhaseThreeContentProps> = ({ day }) => {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  const [questionnaireResults, setQuestionnaireResults] = useState<Record<string, any>>({});
  const { getPhaseResponses, loading } = useQuestionnaireResponses();
  
  useEffect(() => {
    const loadQuestionnaires = async () => {
      try {
        const responses = await getPhaseResponses(3);
        
        const completed: Record<string, boolean> = {};
        const results: Record<string, any> = {};
        
        Object.entries(responses).forEach(([id, response]) => {
          completed[id] = true;
          results[id] = response;
        });
        
        console.log("PhaseThreeContent - Loaded questionnaires from database:", completed);
        console.log("PhaseThreeContent - Loaded results:", results);
        
        setCompletedQuestionnaires(completed);
        setQuestionnaireResults(results);
      } catch (error) {
        console.error("Error loading questionnaires:", error);
      }
    };
    
    if (!loading) {
      loadQuestionnaires();
    }
  }, [loading]);

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
