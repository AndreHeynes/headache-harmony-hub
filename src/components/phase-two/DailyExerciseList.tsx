
import React, { useState } from "react";
import ExerciseItem from "./ExerciseItem";
import { Exercise } from "@/utils/exercises/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDay7Exercises, getDay14Exercises } from "@/utils/exercises/schedules";

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
  const [showExercisesOnReviewDay, setShowExercisesOnReviewDay] = useState(false);
  
  if (exercises.length === 0) {
    return (
      <div className="bg-neutral-50 p-4 rounded border text-center">
        <p className="text-neutral-600">
          Today is a rest or review day. No specific exercises are scheduled.
        </p>
      </div>
    );
  }
  
  // Weekly review days
  if (day % 7 === 0) {
    // Get specific exercises for weekly review days
    const reviewDayExercises = day === 7 
      ? getDay7Exercises()
      : day === 14 
        ? getDay14Exercises() 
        : [];
        
    return (
      <div className="space-y-4">
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Weekly Review Day</h3>
          <p className="text-blue-700 mb-4">
            Today is your weekly review day (Week {Math.floor(day / 7)}). Take some time to reflect on your progress
            and make note of any changes in your symptoms. Continue with your tracking
            and consider which exercises have been most helpful this week.
          </p>
          
          <button 
            onClick={() => setShowExercisesOnReviewDay(!showExercisesOnReviewDay)}
            className="text-blue-600 underline text-sm font-medium hover:text-blue-800"
          >
            {showExercisesOnReviewDay ? "Hide exercises" : "Show recommended exercises for today"}
          </button>
        </div>
        
        {showExercisesOnReviewDay && reviewDayExercises.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50/10 mt-4">
            <div className="space-y-4">
              {reviewDayExercises.map((exercise) => (
                <ExerciseItem 
                  key={exercise.id} 
                  exercise={exercise} 
                  videoDisplayMode={videoDisplayMode}
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }
  
  // Regular exercise days
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
