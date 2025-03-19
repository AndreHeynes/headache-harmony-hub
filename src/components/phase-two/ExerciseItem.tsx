
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dumbbell, FileText, Pencil, CheckSquare } from "lucide-react";
import ExerciseVideo from "./ExerciseVideo";
import { Exercise } from "@/utils/exerciseUtils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [isActivitySheetOpen, setIsActivitySheetOpen] = useState(false);
  
  const hasActivitySheet = exercise.activitySheetName && showActivitySheet;
  const ActivitySheetIcon = exercise.requiresInput ? Pencil : FileText;
  
  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
    // In a real app, we would save this state to the user's profile
  };
  
  const getActivitySheetDescription = () => {
    if (!exercise.activitySheetName) return "";
    
    if (exercise.requiresInput) {
      return "This activity sheet requires you to complete exercises and input your responses.";
    }
    return "Review this activity sheet information to support your recovery process.";
  };
  
  return (
    <Card className={`mb-4 ${isCompleted ? 'border-green-300 bg-green-50' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {exercise.type === "activity" ? (
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
          ) : (
            <Dumbbell className="h-5 w-5 mr-2 text-purple-600" />
          )}
          {exercise.title}
          {isCompleted && (
            <CheckSquare className="h-5 w-5 ml-2 text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {exercise.description && (
          <p className="text-neutral-600 text-sm">
            {exercise.description}
          </p>
        )}
        
        {exercise.videoUrl && (
          <div className="mt-2">
            <ExerciseVideo
              title={`Watch: ${exercise.title}`}
              videoUrl={exercise.videoUrl}
              displayMode={videoDisplayMode}
            />
          </div>
        )}
        
        {hasActivitySheet && (
          <Collapsible 
            open={isActivitySheetOpen} 
            onOpenChange={setIsActivitySheetOpen}
            className="border rounded-md p-2 mt-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ActivitySheetIcon className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium">Activity Sheet: {exercise.activitySheetName}</span>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isActivitySheetOpen ? "Hide Details" : "Show Details"}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2">
              <p className="text-sm text-neutral-600 mb-2">
                {getActivitySheetDescription()}
              </p>
              
              <div className="flex justify-between">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs"
                  onClick={() => window.open(`/activity-sheets/${exercise.activitySheetId}`, '_blank')}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Open Activity Sheet
                </Button>
                
                {exercise.requiresInput && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs"
                    onClick={() => window.open(`/activity-sheets/${exercise.activitySheetId}/edit`, '_blank')}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Complete Activity Sheet
                  </Button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button 
          variant={isCompleted ? "outline" : "default"} 
          size="sm"
          className="w-full"
          onClick={handleMarkComplete}
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseItem;
