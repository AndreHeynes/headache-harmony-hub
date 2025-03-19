
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import ExerciseVideo from "./ExerciseVideo";
import { Exercise } from "@/utils/exerciseUtils";

interface ExerciseItemProps {
  exercise: Exercise;
  videoDisplayMode?: "embedded" | "link";
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  videoDisplayMode = "link" 
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Dumbbell className="h-5 w-5 mr-2 text-purple-600" />
          {exercise.title}
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
      </CardContent>
    </Card>
  );
};

export default ExerciseItem;
