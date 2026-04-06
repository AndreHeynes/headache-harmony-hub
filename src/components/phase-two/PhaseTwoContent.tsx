import React, { useEffect, useState } from "react";
import DailyExerciseList from "./DailyExerciseList";
import { getExercisesForDay } from "@/utils/exercises/schedules";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target } from "lucide-react";

interface PhaseTwoContentProps {
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const PhaseTwoContent: React.FC<PhaseTwoContentProps> = ({ 
  day, 
  videoDisplayMode = "link" 
}) => {
  const { getResponse } = useQuestionnaireResponses();
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | null>(null);

  useEffect(() => {
    getResponse("fht", 1).then(setFhtResponse);
  }, [getResponse]);

  const exercises = getExercisesForDay(day, fhtResponse ?? undefined);

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
      {/* Aim/Goal — Locus of Control educational messaging */}
      {day === 1 && (
        <Alert variant="default" className="border-primary/30 bg-primary/5">
          <Target className="h-4 w-4" />
          <AlertTitle>Programme Aim</AlertTitle>
          <AlertDescription>
            This programme is designed to help you develop from an external to an internal locus of control — 
            or to strengthen your existing internal locus of control. Through improved knowledge and the skills 
            you'll learn, you'll gain greater ability to manage your headache disorder and positively impact your life.
          </AlertDescription>
        </Alert>
      )}

      <p className="text-muted-foreground font-medium">{dayDescription}</p>
      
      <h3 className="font-medium text-lg mt-4 text-foreground">Today's Exercises</h3>
      <DailyExerciseList 
        exercises={exercises} 
        day={day} 
        videoDisplayMode={videoDisplayMode}
        fhtResponse={fhtResponse ?? undefined}
      />
      
      {day % 7 !== 0 && (
        <div className="bg-muted p-6 rounded-lg border border-border shadow-sm">
          <h3 className="font-medium mb-2 text-foreground">Daily Reminders</h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
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
