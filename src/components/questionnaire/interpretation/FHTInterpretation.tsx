
import React from "react";
import { Info, Dumbbell } from "lucide-react";

interface FHTInterpretationProps {
  recommendedExercises: string[];
}

const FHTInterpretation: React.FC<FHTInterpretationProps> = ({
  recommendedExercises = []
}) => {
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

export default FHTInterpretation;
