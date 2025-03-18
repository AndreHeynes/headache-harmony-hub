
import React from "react";
import { Progress } from "@/components/ui/progress";

interface QuestionnaireProgressProps {
  currentSection: number;
  totalSections: number;
}

const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
  currentSection,
  totalSections,
}) => {
  const progressPercentage = (currentSection / totalSections) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-neutral-600">
        <span>Section {currentSection} of {totalSections}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuestionnaireProgress;
