
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { Exercise } from "@/utils/exercises/types";
import { Button } from "@/components/ui/button";
import ExerciseTypeIcon from "./exercise/ExerciseTypeIcon";
import ExerciseCategoryBadge from "./exercise/ExerciseCategoryBadge";
import ActivitySheet from "./exercise/ActivitySheet";
import ExerciseDetails from "./exercise/ExerciseDetails";

interface ExerciseItemProps {
  exercise: Exercise;
  videoDisplayMode?: "embedded" | "link";
  showActivitySheet?: boolean;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  videoDisplayMode = "link",
  showActivitySheet = true
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  
  const hasActivitySheet = exercise.activitySheetName && showActivitySheet;
  
  return (
    <Card className={`${isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-gradient-to-r from-white to-slate-50/30'} 
      hover:shadow-md transition-all duration-200 border h-full`}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ExerciseTypeIcon title={exercise.title} type={exercise.type} />
            <span className="text-neutral-800 text-sm md:text-base line-clamp-1">
              {exercise.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ExerciseCategoryBadge title={exercise.title} />
            {isCompleted && (
              <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2 space-y-3">
        <ExerciseDetails 
          description={exercise.description}
          type={exercise.type}
          videoUrl={exercise.videoUrl}
          videoDisplayMode={videoDisplayMode}
          title={exercise.title}
        />
        
        {hasActivitySheet && (
          <ActivitySheet
            activitySheetName={exercise.activitySheetName}
            activitySheetId={exercise.activitySheetId}
            requiresInput={exercise.requiresInput}
            showActivitySheet={showActivitySheet}
          />
        )}
      </CardContent>
      
      <CardFooter className="p-3">
        <Button 
          variant={isCompleted ? "outline" : "default"} 
          size="sm"
          className={`w-full transition-colors text-xs ${isCompleted ? 'hover:bg-green-50' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'}`}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseItem;
