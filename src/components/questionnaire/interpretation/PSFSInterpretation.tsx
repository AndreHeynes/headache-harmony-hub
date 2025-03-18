
import React from "react";

interface PSFSInterpretationProps {
  score: number | null;
  savedActivities: any[];
}

const PSFSInterpretation: React.FC<PSFSInterpretationProps> = ({
  score,
  savedActivities = []
}) => {
  if (!savedActivities.length) return null;
  
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

export default PSFSInterpretation;
