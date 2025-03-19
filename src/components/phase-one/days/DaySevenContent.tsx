
import React from "react";
import { Link } from "react-router-dom";
import QuestionnaireOutcomeFeedback from "@/components/questionnaire/QuestionnaireOutcomeFeedback";

interface DaySevenContentProps {
  completedQuestionnaires: Record<string, boolean>;
  questionnaireResults: Record<string, any>;
}

const DaySevenContent: React.FC<DaySevenContentProps> = ({ 
  completedQuestionnaires, 
  questionnaireResults 
}) => {
  return (
    <div className="space-y-6">
      <p>Complete the final questionnaires for Phase 1. This will help us prepare your personalized program for Phase 2.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['hses'] && (
          <Link to="/questionnaire/hses" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HSES</h3>
            <p className="text-sm text-neutral-600">Headache Self-Efficacy Scale</p>
          </Link>
        )}
        {!completedQuestionnaires['hsloc'] && (
          <Link to="/questionnaire/hsloc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HSLOC</h3>
            <p className="text-sm text-neutral-600">Headache-Specific Locus of Control</p>
          </Link>
        )}
        {!completedQuestionnaires['hb'] && (
          <Link to="/questionnaire/hb" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HB</h3>
            <p className="text-sm text-neutral-600">Headache Beliefs</p>
          </Link>
        )}
        {!completedQuestionnaires['psc'] && (
          <Link to="/questionnaire/psc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">PSC</h3>
            <p className="text-sm text-neutral-600">Pain Stages of Change</p>
          </Link>
        )}
      </div>
      
      <QuestionnaireOutcomeFeedback questionnaireResults={questionnaireResults} />
    </div>
  );
};

export default DaySevenContent;
