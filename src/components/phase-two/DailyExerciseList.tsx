
import React from "react";
import ExerciseItem from "./ExerciseItem";
import { Exercise } from "@/utils/exerciseUtils";
import { Card } from "@/components/ui/card";

interface DailyExerciseListProps {
  exercises: Exercise[];
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const DailyExerciseList: React.FC<DailyExerciseListProps> = ({ 
  exercises, 
  day,
  videoDisplayMode = "link"
}) => {
  if (exercises.length === 0) {
    return (
      <div className="bg-neutral-50 p-4 rounded border text-center">
        <p className="text-neutral-600">
          Today is a rest or review day. No specific exercises are scheduled.
        </p>
      </div>
    );
  }
  
  if (day % 7 === 0) {
    return (
      <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">Weekly Review Day</h3>
        <p className="text-blue-700">
          Today is your weekly review day. Take some time to reflect on your progress
          and make note of any changes in your symptoms. Continue with your tracking
          and consider which exercises have been most helpful this week.
        </p>
      </div>
    );
  }
  
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10">
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <ExerciseItem 
            key={exercise.id} 
            exercise={exercise} 
            videoDisplayMode={videoDisplayMode}
          />
        ))}
      </div>
    </Card>
  );
};

export default DailyExerciseList;
