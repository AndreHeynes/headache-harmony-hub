
import React from "react";
import { Link } from "react-router-dom";

interface DayTwoContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DayTwoContent: React.FC<DayTwoContentProps> = ({ completedQuestionnaires }) => {
  return (
    <div className="space-y-4">
      <p>Please start completing the questionnaires today. These assessments will help us understand your specific situation and create a personalized treatment plan.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['hit-6'] && (
          <Link to="/questionnaire/hit-6" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HIT-6</h3>
            <p className="text-sm text-neutral-600">Headache Impact Test</p>
          </Link>
        )}
        {!completedQuestionnaires['fht'] && (
          <Link to="/questionnaire/fht" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">FHT</h3>
            <p className="text-sm text-neutral-600">Familiar Headache Symptoms</p>
          </Link>
        )}
        {!completedQuestionnaires['psfs'] && (
          <Link to="/questionnaire/psfs" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">PSFS</h3>
            <p className="text-sm text-neutral-600">Patient-Specific Functional Scale</p>
          </Link>
        )}
        {!completedQuestionnaires['mkq'] && (
          <Link to="/questionnaire/mkq" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">MKQ</h3>
            <p className="text-sm text-neutral-600">Medication Knowledge Quiz</p>
          </Link>
        )}
      </div>
      {Object.keys(completedQuestionnaires).some(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)) && 
        Object.keys(completedQuestionnaires).length < 4 && (
        <p className="text-sm mt-2">You have completed some questionnaires. Continue with the remaining ones.</p>
      )}
      {Object.keys(completedQuestionnaires).filter(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)).length === 4 && (
        <p className="text-sm mt-2 text-green-600">You have completed all questionnaires for today!</p>
      )}
      {Object.keys(completedQuestionnaires).filter(id => ['hit-6', 'fht', 'psfs', 'mkq'].includes(id)).length === 0 && (
        <p className="text-sm mt-2">You can save your progress and complete these questionnaires later if needed.</p>
      )}
    </div>
  );
};

export default DayTwoContent;
