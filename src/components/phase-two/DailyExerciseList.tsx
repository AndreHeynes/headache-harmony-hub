
import React from "react";
import ExerciseItem from "./ExerciseItem";
import { Exercise } from "@/utils/exerciseUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DailyExerciseListProps {
  exercises: Exercise[];
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const DailyExerciseList: React.FC<DailyExerciseListProps> = ({ 
  exercises, 
  day,
  videoDisplayMode = "link"
}) => {
  // Group exercises by type
  const generalExercises = exercises.filter(ex => ex.isGeneralExercise);
  const specializedExercises = exercises.filter(ex => !ex.isGeneralExercise);
  
  if (exercises.length === 0) {
    return (
      <div className="bg-neutral-50 p-4 rounded border text-center">
        <p className="text-neutral-600">
          Today is a rest or review day. No specific exercises are scheduled.
        </p>
      </div>
    );
  }
  
  if (day % 7 === 0) {
    // Weekly review day
    return (
      <div className="bg-blue-50 p-4 rounded border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">Weekly Review Day</h3>
        <p className="text-blue-700">
          Today is your weekly review day. Take some time to reflect on your progress
          and make note of any changes in your symptoms. Continue with your tracking
          and consider which exercises have been most helpful this week.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All Exercises</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {exercises.map((exercise) => (
            <ExerciseItem 
              key={exercise.id} 
              exercise={exercise} 
              videoDisplayMode={videoDisplayMode}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          {generalExercises.length > 0 ? (
            generalExercises.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise} 
                videoDisplayMode={videoDisplayMode}
              />
            ))
          ) : (
            <p className="text-neutral-500 italic">No general exercises for today.</p>
          )}
        </TabsContent>
        
        <TabsContent value="specialized" className="space-y-4">
          {specializedExercises.length > 0 ? (
            specializedExercises.map((exercise) => (
              <ExerciseItem 
                key={exercise.id} 
                exercise={exercise} 
                videoDisplayMode={videoDisplayMode}
              />
            ))
          ) : (
            <p className="text-neutral-500 italic">No specialized exercises for today.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyExerciseList;
