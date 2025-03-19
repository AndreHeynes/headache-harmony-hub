
import React from "react";
import { Link } from "react-router-dom";

interface DayThreeContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DayThreeContent: React.FC<DayThreeContentProps> = ({ completedQuestionnaires }) => {
  return (
    <div className="space-y-4">
      <p>Continue tracking your symptoms and triggers. Today's questionnaires focus on headache impact and disability assessment.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['fht'] && (
          <Link to="/questionnaire/fht" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">FHT</h3>
            <p className="text-sm text-neutral-600">Familiar Headache Symptoms</p>
          </Link>
        )}
        {!completedQuestionnaires['midas'] && (
          <Link to="/questionnaire/midas" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">MIDAS</h3>
            <p className="text-sm text-neutral-600">Migraine Disability Assessment</p>
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
    </div>
  );
};

export default DayThreeContent;
