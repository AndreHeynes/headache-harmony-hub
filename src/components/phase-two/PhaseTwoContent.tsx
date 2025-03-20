import React from "react";
import DailyExerciseList from "./DailyExerciseList";
import { getExercisesForDay } from "@/utils/exercises/schedules";

interface PhaseTwoContentProps {
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const PhaseTwoContent: React.FC<PhaseTwoContentProps> = ({ 
  day, 
  videoDisplayMode = "link" 
}) => {
  // Get recommended exercises for the current day
  const exercises = getExercisesForDay(day);

  // Description for the current day
  let dayDescription = "";
  if (day === 1) {
    dayDescription = "Welcome to Phase 2! Today we begin building your recovery foundation with carefully selected exercises.";
  } else if (day % 7 === 0) {
    dayDescription = `Week ${Math.floor(day / 7)} review day. Take time to reflect on your progress and continue practicing what works best for you.`;
  } else {
    dayDescription = `Phase 2 Day ${day}: Follow your prescribed exercise plan and track your symptoms.`;
  }
  
  return (
    <div className="space-y-6">
      <p className="text-neutral-600 font-medium">{dayDescription}</p>
      
      <h3 className="font-medium text-lg mt-4 text-purple-900">Today's Exercises</h3>
      <DailyExerciseList 
        exercises={exercises} 
        day={day} 
        videoDisplayMode={videoDisplayMode} 
      />
      
      {day % 7 !== 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border border-purple-100/50 shadow-sm">
          <h3 className="font-medium mb-2 text-purple-900">Daily Reminders</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Remember to stay hydrated throughout the day</li>
            <li>Take breaks from screen time every 30 minutes</li>
            <li>Track any headache symptoms in the tracking app</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhaseTwoContent;
