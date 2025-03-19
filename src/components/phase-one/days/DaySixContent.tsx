
import React from "react";
import { Link } from "react-router-dom";

interface DaySixContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DaySixContent: React.FC<DaySixContentProps> = ({ completedQuestionnaires }) => {
  return (
    <div className="space-y-4">
      <p>Focus on identifying lifestyle factors that may be contributing to your migraines. Complete these final assessments.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['hses'] && (
          <Link to="/questionnaire/hses" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HSES</h3>
            <p className="text-sm text-neutral-600">Headache Self-Efficacy Scale</p>
          </Link>
        )}
        {!completedQuestionnaires['hb'] && (
          <Link to="/questionnaire/hb" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HB</h3>
            <p className="text-sm text-neutral-600">Headache Beliefs</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DaySixContent;
