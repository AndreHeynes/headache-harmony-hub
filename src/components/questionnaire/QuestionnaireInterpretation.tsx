
import React from "react";
import { Questionnaire } from "@/types/questionnaire";
import StandardInterpretation from "./interpretation/StandardInterpretation";
import HSLOCInterpretation from "./interpretation/HSLOCInterpretation";
import PSFSInterpretation from "./interpretation/PSFSInterpretation";
import FHTInterpretation from "./interpretation/FHTInterpretation";
import PSCInterpretation from "./interpretation/PSCInterpretation";
import SimpleCompletion from "./interpretation/SimpleCompletion";

interface QuestionnaireInterpretationProps {
  questionnaire: Questionnaire;
  score: number | null;
  groupScores?: Record<string, number | string>;
  savedActivities?: any[];
  recommendedExercises?: string[];
}

const QuestionnaireInterpretation: React.FC<QuestionnaireInterpretationProps> = ({
  questionnaire,
  score,
  groupScores = {},
  savedActivities = [],
  recommendedExercises = [],
}) => {
  // If no score and no group scores for questionnaires that need them
  if (!score && !Object.keys(groupScores).length && questionnaire.id !== 'fht' && questionnaire.id !== 'hb') {
    return <SimpleCompletion />;
  }

  // Handle special questionnaires
  switch (questionnaire.id) {
    case 'hsloc':
      return <HSLOCInterpretation groupScores={groupScores} />;
    
    case 'psfs':
      return <PSFSInterpretation score={score} savedActivities={savedActivities} />;
    
    case 'fht':
      return <FHTInterpretation recommendedExercises={recommendedExercises} />;
    
    case 'psc':
      return <PSCInterpretation groupScores={groupScores} />;
    
    case 'hb':
      // HB questionnaire has no specific interpretation, just confirmation of completion
      return <SimpleCompletion customMessage="Thank you for sharing your beliefs about headaches. This information will help us tailor your program." />;
    
    case 'mkq':
      // MKQ questionnaire completion message
      return <SimpleCompletion customMessage="Thank you for completing the Medication Knowledge Questionnaire. This information will help us understand your current medication management." />;
    
    default:
      // Default interpretation for standard questionnaires
      return <StandardInterpretation questionnaire={questionnaire} score={score} />;
  }
};

export default QuestionnaireInterpretation;
