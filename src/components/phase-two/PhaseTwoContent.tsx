
import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import DailyExerciseList from "./DailyExerciseList";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getExercisesForDay } from "@/utils/exerciseUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PhaseTwoContentProps {
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const PhaseTwoContent: React.FC<PhaseTwoContentProps> = ({ 
  day, 
  videoDisplayMode = "link" 
}) => {
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | undefined>(undefined);
  
  // Load FHT questionnaire response from localStorage
  useEffect(() => {
    const savedFht = localStorage.getItem('questionnaire-fht');
    if (savedFht) {
      try {
        const parsedResponse = JSON.parse(savedFht);
        setFhtResponse(parsedResponse);
      } catch (e) {
        console.error("Error parsing FHT response:", e);
      }
    }
  }, []);
  
  // Get recommended exercises for the current day
  const exercises = getExercisesForDay(day, fhtResponse);

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
      <p className="text-neutral-600">{dayDescription}</p>
      
      {!fhtResponse && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>FHT Assessment Missing</AlertTitle>
          <AlertDescription>
            We couldn't find your Familiar Headache Type assessment results. Your exercise plan 
            may not be fully personalized. Please complete the FHT questionnaire in Phase 1.
          </AlertDescription>
        </Alert>
      )}
      
      <h3 className="font-medium text-lg mt-4">Today's Exercises</h3>
      <DailyExerciseList 
        exercises={exercises} 
        day={day} 
        videoDisplayMode={videoDisplayMode} 
      />
      
      {day % 7 !== 0 && (
        <div className="bg-neutral-100 p-4 rounded mt-4">
          <h3 className="font-medium mb-2">Daily Reminders</h3>
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
