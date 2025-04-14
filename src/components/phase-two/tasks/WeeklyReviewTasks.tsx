
import React from "react";
import { CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface WeeklyReviewTasksProps {
  completedTasks: Record<string, boolean>;
  toggleTaskCompletion: (taskId: string) => void;
}

const WeeklyReviewTasks: React.FC<WeeklyReviewTasksProps> = ({ 
  completedTasks,
  toggleTaskCompletion
}) => {
  return (
    <CardContent className="space-y-3">
      <div className="flex items-start cursor-pointer" onClick={() => toggleTaskCompletion('review_progress')}>
        <div className="mr-3 mt-1 text-green-500">
          {completedTasks['review_progress'] ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5 text-neutral-500" />
          )}
        </div>
        <div>
          <p className="font-medium">Review Your Progress</p>
          <p className="text-neutral-500 text-sm">Compare this week with previous weeks</p>
        </div>
      </div>
      
      <div className="flex items-start cursor-pointer" onClick={() => toggleTaskCompletion('symptom_check')}>
        <div className="mr-3 mt-1 text-green-500">
          {completedTasks['symptom_check'] ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5 text-neutral-500" />
          )}
        </div>
        <div>
          <p className="font-medium">Complete Symptom Check</p>
          <p className="text-neutral-500 text-sm">Update your weekly symptom log</p>
        </div>
      </div>
      
      <div className="flex items-start cursor-pointer" onClick={() => toggleTaskCompletion('headache_frequency')}>
        <div className="mr-3 mt-1 text-green-500">
          {completedTasks['headache_frequency'] ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5 text-neutral-500" />
          )}
        </div>
        <div>
          <p className="font-medium">Check Headache Frequency</p>
          <p className="text-neutral-500 text-sm">Review your headache tracking data</p>
        </div>
      </div>
    </CardContent>
  );
};

export default WeeklyReviewTasks;
