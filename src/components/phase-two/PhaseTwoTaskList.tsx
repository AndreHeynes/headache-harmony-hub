
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, FileText, Dumbbell } from "lucide-react";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getExercisesForDay } from "@/utils/exercises/schedules";
import { secureRetrieve, secureStore } from "@/utils/security/encryption";
import { Exercise } from "@/utils/exercises/types";

interface PhaseTwoTaskListProps {
  day: number;
}

const PhaseTwoTaskList: React.FC<PhaseTwoTaskListProps> = ({ day }) => {
  const [fhtResponse, setFhtResponse] = useState<QuestionnaireResponse | undefined>(undefined);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const savedFht = secureRetrieve('questionnaire-fht');
    if (savedFht) {
      try {
        setFhtResponse(savedFht);
      } catch (e) {
        console.error("Error parsing FHT response:", e);
      }
    }
    
    const savedTasks = secureRetrieve(`phase2-day${day}-tasks`);
    if (savedTasks) {
      try {
        setCompletedTasks(savedTasks);
      } catch (e) {
        console.error("Error parsing saved tasks:", e);
      }
    }
  }, [day]);
  
  // Save completed tasks whenever they change
  useEffect(() => {
    if (Object.keys(completedTasks).length > 0) {
      secureStore(`phase2-day${day}-tasks`, completedTasks);
    }
  }, [completedTasks, day]);
  
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
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
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Physical Exercises Section */}
          {physicalExercises.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
                <Dumbbell className="h-4 w-4 mr-1.5" /> 
                Physical Exercises
              </h3>
              <div className="space-y-2 bg-gradient-to-r from-purple-50 to-white p-3 rounded-md">
                {physicalExercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    className="flex items-center cursor-pointer hover:bg-white/80 p-1.5 rounded-md transition-colors" 
                    onClick={() => toggleTaskCompletion(exercise.id)}
                  >
                    <div className="mr-3 text-neutral-500 flex-shrink-0">
                      {completedTasks[exercise.id] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-neutral-700 text-sm">
                      {exercise.title}
                      {exercise.side && (
                        <span className="ml-1 text-xs text-purple-500">({exercise.side})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Activity Sheets Section */}
          {activitySheets.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-1.5" /> 
                Activity Sheets
              </h3>
              <div className="space-y-2 bg-gradient-to-r from-blue-50 to-white p-3 rounded-md">
                {activitySheets.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center cursor-pointer hover:bg-white/80 p-1.5 rounded-md transition-colors" 
                    onClick={() => toggleTaskCompletion(activity.id)}
                  >
                    <div className="mr-3 text-neutral-500 flex-shrink-0">
                      {completedTasks[activity.id] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-neutral-700 text-sm">
                      {activity.title}
                      {activity.requiresInput && (
                        <span className="ml-1.5 text-xs text-blue-500 font-medium">(Requires input)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Headache Logging Section */}
          <div className="mt-4 pt-4 border-t">
            <div 
              className="flex items-center cursor-pointer p-2 hover:bg-neutral-50 rounded-md transition-colors"
              onClick={() => toggleTaskCompletion('headache_log')}
            >
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
          
          {/* Empty State */}
          {physicalExercises.length === 0 && activitySheets.length === 0 && (
            <p className="text-neutral-500 italic">No exercises scheduled for today.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTwoTaskList;
