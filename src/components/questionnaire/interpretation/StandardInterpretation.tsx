
import React from "react";
import { Questionnaire } from "@/types/questionnaire";
import { ArrowRight, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface StandardInterpretationProps {
  questionnaire: Questionnaire;
  score: number | null;
}

const StandardInterpretation: React.FC<StandardInterpretationProps> = ({
  questionnaire,
  score
}) => {
  // Find the interpretation range that matches the score
  const interpretation = questionnaire.interpretations?.ranges.find(
    (range) => score !== null && score >= range.min && score <= range.max
  );

  // Determine severity level for styling
  const getSeverityLevel = () => {
    if (!score || !questionnaire.interpretations) return defaultSeverity();
    
    const maxScore = Math.max(...questionnaire.interpretations.ranges.map(r => r.max));
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 75) {
      return {
        icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
        color: "bg-red-50 border-red-200",
        textColor: "text-red-800"
      };
    } else if (percentage >= 50) {
      return {
        icon: <Info className="h-8 w-8 text-amber-500" />,
        color: "bg-amber-50 border-amber-200",
        textColor: "text-amber-800"
      };
    } else {
      return {
        icon: <CheckCircle className="h-8 w-8 text-emerald-500" />,
        color: "bg-emerald-50 border-emerald-200",
        textColor: "text-emerald-800"
      };
    }
  };
  
  const defaultSeverity = () => {
    return {
      icon: <Info className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800"
    };
  };
  
  const severity = getSeverityLevel();

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-medium mb-2">Your Results</h3>
        <div className="text-3xl font-bold">{score}</div>
        <p className="text-sm text-neutral-600 mt-1">Total Score</p>
      </div>

      {interpretation && (
        <div className={`p-4 rounded-md border ${severity.color}`}>
          <div className="flex items-start">
            <div className="mr-3 mt-1">{severity.icon}</div>
            <div>
              <h4 className={`font-medium mb-1 ${severity.textColor}`}>
                {interpretation.min}-{interpretation.max} Points
              </h4>
              <p className="text-neutral-800">{interpretation.text}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium mb-2 flex items-center">
          <ArrowRight className="mr-2 h-5 w-5 text-blue-600" />
          Next Steps
        </h4>
        <p className="text-neutral-700">
          Discuss these results with your healthcare provider. The information from this
          questionnaire can help guide your treatment and care.
        </p>
      </div>
    </div>
  );
};

export default StandardInterpretation;
