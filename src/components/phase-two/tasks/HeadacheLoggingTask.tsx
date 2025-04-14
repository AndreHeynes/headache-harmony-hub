
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

interface HeadacheLoggingTaskProps {
  isCompleted: boolean;
  toggleCompletion: () => void;
}

const HeadacheLoggingTask: React.FC<HeadacheLoggingTaskProps> = ({ 
  isCompleted, 
  toggleCompletion 
}) => {
  return (
    <div className="mt-4 pt-4 border-t">
      <div 
        className="flex items-center cursor-pointer p-2 hover:bg-neutral-50 rounded-md transition-colors"
        onClick={toggleCompletion}
      >
        <div className="mr-3 text-neutral-500">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </div>
        <div className="text-neutral-700">
          Log headaches (if any occurred today)
        </div>
      </div>
    </div>
  );
};

export default HeadacheLoggingTask;
