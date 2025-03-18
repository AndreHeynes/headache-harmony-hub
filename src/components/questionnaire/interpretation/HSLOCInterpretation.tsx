
import React from "react";
import { Info } from "lucide-react";

interface HSLOCInterpretationProps {
  groupScores: Record<string, number | string>;
}

const HSLOCInterpretation: React.FC<HSLOCInterpretationProps> = ({ groupScores }) => {
  // Fix type issues by ensuring we're using numbers for all score values
  const internalScore = typeof groupScores['internal'] === 'number' ? groupScores['internal'] : 0;
  const healthcareScore = typeof groupScores['healthcare'] === 'number' ? groupScores['healthcare'] : 0;
  const chanceScore = typeof groupScores['chance'] === 'number' ? groupScores['chance'] : 0;
  
  // Convert dominant to string explicitly to avoid type errors
  const dominant = groupScores['dominant'] ? String(groupScores['dominant']) : undefined;
  
  let dominantText = '';
  let dominantDescription = '';
  
  if (dominant === 'internal') {
    dominantText = 'Internal Locus of Control';
    dominantDescription = 'You believe that you have significant control over your headaches. This perspective emphasizes personal responsibility and active involvement in managing your condition.';
  } else if (dominant === 'healthcare') {
    dominantText = 'Healthcare Professional Locus of Control';
    dominantDescription = 'You believe that healthcare professionals play the most important role in managing your headaches. This perspective emphasizes working closely with medical experts.';
  } else if (dominant === 'chance') {
    dominantText = 'Chance Locus of Control';
    dominantDescription = 'You believe that chance, fate, or luck largely determines your headaches. This perspective may indicate a feeling that headaches are outside of anyone\'s control.';
  }
  
  const severity = {
    icon: <Info className="h-8 w-8 text-blue-500" />,
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-800"
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded-md p-3 text-center">
          <div className="text-lg font-medium">Internal</div>
          <div className="text-2xl font-bold">{internalScore}</div>
        </div>
        <div className="border rounded-md p-3 text-center">
          <div className="text-lg font-medium">Healthcare</div>
          <div className="text-2xl font-bold">{healthcareScore}</div>
        </div>
        <div className="border rounded-md p-3 text-center">
          <div className="text-lg font-medium">Chance</div>
          <div className="text-2xl font-bold">{chanceScore}</div>
        </div>
      </div>
      
      <div className={`p-4 rounded-md border ${severity.color}`}>
        <div className="flex items-start">
          <div className="mr-3 mt-1">{severity.icon}</div>
          <div>
            <h4 className={`font-medium mb-1 ${severity.textColor}`}>
              {dominantText}
            </h4>
            <p className="text-neutral-800">{dominantDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSLOCInterpretation;
