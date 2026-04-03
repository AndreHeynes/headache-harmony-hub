
import React from "react";
import { Dumbbell } from "lucide-react";
import TaskItem from "./TaskItem";
import { Exercise } from "@/utils/exercises/types";

interface ExerciseTasksProps {
  exercises: Exercise[];
  completedTasks: Record<string, boolean>;
  toggleTaskCompletion: (taskId: string) => void;
}

const ExerciseTasks: React.FC<ExerciseTasksProps> = ({ 
  exercises,
  completedTasks,
  toggleTaskCompletion
}) => {
  if (exercises.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
        <Dumbbell className="h-4 w-4 mr-1.5" /> 
        Physical Exercises
      </h3>
      <div className="space-y-2 bg-muted p-3 rounded-md">
        {exercises.map((exercise) => (
          <TaskItem
            key={exercise.id}
            item={exercise}
            isCompleted={!!completedTasks[exercise.id]}
            onClick={() => toggleTaskCompletion(exercise.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseTasks;
