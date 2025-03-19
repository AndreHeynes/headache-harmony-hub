
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getExercisesForDay } from "@/utils/exerciseUtils";

interface PhaseTwoTaskListProps {
  day: number;
}

const PhaseTwoTaskList: React.FC<PhaseTwoTaskListProps> = ({ day }) => {
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | undefined>(undefined);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
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
    
    // Load completed tasks from localStorage
    const savedTasks = localStorage.getItem(`phase2-day${day}-tasks`);
    if (savedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Error parsing saved tasks:", e);
      }
    }
  }, [day]);
  
  // Get exercises for the current day
  const exercises = getExercisesForDay(day, fhtResponse);
  
  // For weekly review days, show different tasks
  const isWeeklyReviewDay = day % 7 === 0;
  
  if (isWeeklyReviewDay) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Weekly Review Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-green-500">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Review Your Progress</p>
              <p className="text-neutral-500 text-sm">Compare this week with previous weeks</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-green-500">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Complete Symptom Check</p>
              <p className="text-neutral-500 text-sm">Update your weekly symptom log</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-green-500">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Check Headache Frequency</p>
              <p className="text-neutral-500 text-sm">Review your headache tracking data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exercises.length > 0 ? (
            exercises.map(exercise => (
              <div key={exercise.id} className="flex items-center">
                <div className="mr-3 text-neutral-500">
                  {completedTasks[exercise.id] ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <div className="text-neutral-700">
                  {exercise.title}
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 italic">No exercises scheduled for today.</p>
          )}
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center">
              <div className="mr-3 text-neutral-500">
                {completedTasks['headache_log'] ? (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTwoTaskList;
