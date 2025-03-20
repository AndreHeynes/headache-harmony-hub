
import React from "react";
import QuestionnaireOutcomeFeedback from "@/components/questionnaire/QuestionnaireOutcomeFeedback";

interface DayEightContentProps {
  allCompleted: boolean;
  questionnaireResults: Record<string, any>;
}

const DayEightContent: React.FC<DayEightContentProps> = ({
  allCompleted,
  questionnaireResults
}) => {
  if (!allCompleted) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Progress Review</h3>
        <p>
          Please complete all the required assessments to view your progress feedback.
        </p>
        <div className="bg-amber-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Assessments Incomplete</h4>
          <p>
            You need to complete all assessments before you can view your progress feedback.
            Return to previous days to complete any remaining questionnaires.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Your Progress Overview</h3>
      <p>
        Based on your assessment results, we've analyzed your progress and developed
        recommendations for your ongoing maintenance plan.
      </p>
      <QuestionnaireOutcomeFeedback questionnaireResults={questionnaireResults} />
    </div>
  );
};

export default DayEightContent;
