
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dumbbell, FileText, Pencil, CheckSquare, Info } from "lucide-react";
import ExerciseVideo from "./ExerciseVideo";
import { Exercise } from "@/utils/exercises/types";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

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
  
  // Placeholder exercise details - these will be updated per exercise later
  const exerciseDetails = {
    reps: "10-15",
    sets: "3",
    frequency: "2x daily"
  };
  
  // Helper function to get activity sheet description
  const getActivitySheetDescription = () => {
    if (!exercise.activitySheetName) return "";
    
    // Return descriptions based on activity sheet ID or name
    switch (exercise.activitySheetId) {
      case "readiness-for-change":
        return "Complete this worksheet to assess and improve your readiness to make changes in managing your condition.";
      case "helpful-beliefs":
        return "Activities to identify and modify beliefs that may be affecting your recovery progress.";
      case "headache-mechanisms":
        return "Educational material explaining how headaches work and what factors influence their frequency and severity.";
      case "sleep-hygiene":
        return "Complete this worksheet to improve your sleep habits and quality to reduce headache frequency.";
      case "trigger-management":
        return "Use this worksheet to identify and develop strategies to manage your specific headache triggers.";
      case "medication-management":
        return "Track and optimize your medication use with this structured activity sheet.";
      default:
        return "Complete this activity sheet as part of your personalized recovery program.";
    }
  };
  
  return (
    <Card className={`mb-4 ${isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-gradient-to-r from-white to-slate-50/30'} 
      hover:shadow-md transition-all duration-200 border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            {exercise.type === "activity" ? (
              <FileText className="h-5 w-5 text-blue-600" />
            ) : (
              <Dumbbell className="h-5 w-5 text-purple-600" />
            )}
            <span className="text-neutral-800">{exercise.title}</span>
          </div>
          {isCompleted && (
            <CheckSquare className="h-5 w-5 text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {exercise.description && (
          <p className="text-neutral-600 text-sm">
            {exercise.description}
          </p>
        )}
        
        {exercise.type === "exercise" && (
          <div className="flex gap-3 my-2">
            <Badge variant="outline" className="bg-purple-50">
              {exerciseDetails.reps} reps
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              {exerciseDetails.sets} sets
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              {exerciseDetails.frequency}
            </Badge>
          </div>
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
          className={`w-full transition-colors ${isCompleted ? 'hover:bg-green-50' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'}`}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseItem;
