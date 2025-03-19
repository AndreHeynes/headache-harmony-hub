
import React from "react";
import { Link } from "react-router-dom";

interface DayFiveContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DayFiveContent: React.FC<DayFiveContentProps> = ({ completedQuestionnaires }) => {
  return (
    <div className="space-y-4">
      <p>Today we attempt to understand your perception of control over your headache. Complete today's questionnaires.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['psfs'] && (
          <Link to="/questionnaire/psfs" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">PSFS</h3>
            <p className="text-sm text-neutral-600">Patient-Specific Functional Scale</p>
          </Link>
        )}
        {!completedQuestionnaires['hsloc'] && (
          <Link to="/questionnaire/hsloc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HSLOC</h3>
            <p className="text-sm text-neutral-600">Headache-Specific Locus of Control</p>
          </Link>
        )}
        {!completedQuestionnaires['psc'] && (
          <Link to="/questionnaire/psc" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">PSC</h3>
            <p className="text-sm text-neutral-600">Pain Stages of Change</p>
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

export default DayFiveContent;
