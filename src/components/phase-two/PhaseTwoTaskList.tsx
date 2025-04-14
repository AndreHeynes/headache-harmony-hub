
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getExercisesForDay } from "@/utils/exercises/schedules";
import { secureRetrieve } from "@/utils/security/encryption";
import { Exercise } from "@/utils/exercises/types";
import WeeklyReviewTasks from "./tasks/WeeklyReviewTasks";
import ExerciseTasks from "./tasks/ExerciseTasks";
import ActivitySheetTasks from "./tasks/ActivitySheetTasks";
import HeadacheLoggingTask from "./tasks/HeadacheLoggingTask";
import { useCompletedTasks } from "./tasks/useCompletedTasks";

interface PhaseTwoTaskListProps {
  day: number;
}

const PhaseTwoTaskList: React.FC<PhaseTwoTaskListProps> = ({ day }) => {
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | undefined>(undefined);
  const { completedTasks, toggleTaskCompletion } = useCompletedTasks(day);
  
  useEffect(() => {
    const savedFht = secureRetrieve('questionnaire-fht');
    if (savedFht) {
      try {
        setFhtResponse(savedFht);
      } catch (e) {
        console.error("Error parsing FHT response:", e);
      }
    }
  }, []);
  
  const exercises = getExercisesForDay(day, fhtResponse);
  
  // Separate exercises and activity sheets
  const physicalExercises = exercises.filter(ex => ex.type !== "activity");
  const activitySheets = exercises.filter(ex => ex.type === "activity");
  
  const isWeeklyReviewDay = day % 7 === 0;
  
  if (isWeeklyReviewDay) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Weekly Review Tasks</CardTitle>
        </CardHeader>
        <WeeklyReviewTasks 
          completedTasks={completedTasks} 
          toggleTaskCompletion={toggleTaskCompletion} 
        />
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <div className="space-y-4">
          <ExerciseTasks
            exercises={physicalExercises}
            completedTasks={completedTasks}
            toggleTaskCompletion={toggleTaskCompletion}
          />
          
          <ActivitySheetTasks
            activities={activitySheets}
            completedTasks={completedTasks}
            toggleTaskCompletion={toggleTaskCompletion}
          />
          
          <HeadacheLoggingTask 
            isCompleted={!!completedTasks['headache_log']} 
            toggleCompletion={() => toggleTaskCompletion('headache_log')} 
          />
          
          {/* Empty State */}
          {physicalExercises.length === 0 && activitySheets.length === 0 && (
            <p className="text-neutral-500 italic">No exercises scheduled for today.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PhaseTwoTaskList;
