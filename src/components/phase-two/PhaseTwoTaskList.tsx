import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getExercisesForDay } from "@/utils/exercises/schedules";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import WeeklyReviewTasks from "./tasks/WeeklyReviewTasks";
import ExerciseTasks from "./tasks/ExerciseTasks";
import ActivitySheetTasks from "./tasks/ActivitySheetTasks";
import HeadacheLoggingTask from "./tasks/HeadacheLoggingTask";
import { useTaskCompletions } from "@/hooks/useTaskCompletions";
import { Skeleton } from "@/components/ui/skeleton";

interface PhaseTwoTaskListProps {
  day: number;
}

const PhaseTwoTaskList: React.FC<PhaseTwoTaskListProps> = ({ day }) => {
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | undefined>(undefined);
  const { completedTasks, toggleTaskCompletion, loading } = useTaskCompletions(2, day);
  const { getResponse, loading: responsesLoading } = useQuestionnaireResponses();
  
  useEffect(() => {
    const loadFhtResponse = async () => {
      try {
        const response = await getResponse('fht', 1);
        if (response) {
          setFhtResponse(response);
        }
      } catch (e) {
        console.error("Error loading FHT response:", e);
      }
    };
    
    if (!responsesLoading) {
      loadFhtResponse();
    }
  }, [responsesLoading]);
  
  const exercises = getExercisesForDay(day, fhtResponse);
  
  // Separate exercises and activity sheets
  const physicalExercises = exercises.filter(ex => ex.type !== "activity");
  const activitySheets = exercises.filter(ex => ex.type === "activity");
  
  const isWeeklyReviewDay = day % 7 === 0;
  
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Today's Tasks</CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    );
  }

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
