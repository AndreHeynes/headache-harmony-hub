
import React from "react";
import { Questionnaire } from "@/types/questionnaire";
import { ArrowRight, AlertTriangle, CheckCircle, Info, Dumbbell } from "lucide-react";

interface QuestionnaireInterpretationProps {
  questionnaire: Questionnaire;
  score: number | null;
  groupScores?: Record<string, number>;
  savedActivities?: any[];
  recommendedExercises?: string[];
}

const QuestionnaireInterpretation: React.FC<QuestionnaireInterpretationProps> = ({
  questionnaire,
  score,
  groupScores = {},
  savedActivities = [],
  recommendedExercises = [],
}) => {
  if (!score && !Object.keys(groupScores).length && questionnaire.id !== 'fht') {
    return (
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium mb-2">Questionnaire Completed</h3>
        <p>Thank you for completing this questionnaire.</p>
      </div>
    );
  }

  // Find the interpretation range that matches the score for standard questionnaires
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

  // Handle HSLOC special case
  const renderHSLOCResults = () => {
    if (questionnaire.id !== 'hsloc') return null;
    
    const internalScore = groupScores['internal'] || 0;
    const healthcareScore = groupScores['healthcare'] || 0;
    const chanceScore = groupScores['chance'] || 0;
    const dominant = groupScores['dominant'];
    
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
  
  // Handle PSFS special case
  const renderPSFSResults = () => {
    if (questionnaire.id !== 'psfs' || !savedActivities.length) return null;
    
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-medium mb-2">Activity Ratings</h3>
          <div className="text-3xl font-bold">{score}</div>
          <p className="text-sm text-neutral-600 mt-1">Average Score</p>
        </div>
        
        <div className="space-y-3">
          {savedActivities.map((activity, index) => (
            <div key={index} className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">{activity.text}</div>
                <div className="text-xl font-bold">{activity.rating}/10</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-neutral-700">
            These activities and ratings will be saved and used for comparison in Phase 3 
            to evaluate your progress.
          </p>
        </div>
      </div>
    );
  };
  
  // Handle FHT special case with exercise recommendations
  const renderFHTResults = () => {
    if (questionnaire.id !== 'fht') return null;
    
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-md border bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <div className="mr-3 mt-1"><Info className="h-8 w-8 text-blue-600" /></div>
            <div>
              <h4 className="font-medium mb-1 text-blue-800">
                Headache Type Assessment Complete
              </h4>
              <p className="text-neutral-800">
                Based on your responses, we have identified your headache characteristics and 
                will recommend specific exercises that may help alleviate your symptoms.
              </p>
            </div>
          </div>
        </div>
        
        {recommendedExercises.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3 flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-purple-600" />
              Recommended Exercises
            </h4>
            <div className="space-y-2">
              {recommendedExercises.map((exerciseId, index) => (
                <div key={index} className="p-3 border rounded-md bg-neutral-50">
                  Exercise {index + 1}: {exerciseId}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              These exercises will be included in your personalized program. You'll receive detailed 
              instructions on how to perform them in the exercise section.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Handle special questionnaires
  if (questionnaire.id === 'hsloc') {
    return renderHSLOCResults();
  } else if (questionnaire.id === 'psfs') {
    return renderPSFSResults();
  } else if (questionnaire.id === 'fht') {
    return renderFHTResults();
  }

  // Default interpretation for standard questionnaires
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

export default QuestionnaireInterpretation;
