
import React from "react";
import { Link } from "react-router-dom";

interface DayFourContentProps {
  completedQuestionnaires: Record<string, boolean>;
}

const DayFourContent: React.FC<DayFourContentProps> = ({ completedQuestionnaires }) => {
  return (
    <div className="space-y-4">
      <p>Today's focus is on understanding how your headache affects you, your medication knowledge base, and how ready you are for change. Please complete the following assessments.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!completedQuestionnaires['hit-6'] && (
          <Link to="/questionnaire/hit-6" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">HIT-6</h3>
            <p className="text-sm text-neutral-600">Headache Impact Test</p>
          </Link>
        )}
        {!completedQuestionnaires['midas'] && (
          <Link to="/questionnaire/midas" className="p-3 border rounded-md hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium">MIDAS</h3>
            <p className="text-sm text-neutral-600">Migraine Disability Assessment</p>
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

export default DayFourContent;
