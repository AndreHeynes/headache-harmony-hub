
import { Exercise } from "@/utils/exercises/types";

export interface CategorizedExercises {
  breathing: Exercise[];
  stretching: Exercise[];
  strengthening: Exercise[];
  mobilization: Exercise[];
  tmj: Exercise[];
  coordination: Exercise[];
  activities: Exercise[];
  other: Exercise[];
}

/**
 * Function to categorize exercises based on their titles and types
 */
export const categorizeExercises = (exercises: Exercise[]): CategorizedExercises => {
  const categories = {
    breathing: exercises.filter(e => e.title.toLowerCase().includes("breathing")),
    stretching: exercises.filter(e => 
      e.title.toLowerCase().includes("stretch") || 
      e.title.toLowerCase().includes("scalene") ||
      e.title.toLowerCase().includes("pec")
    ),
    strengthening: exercises.filter(e => 
      e.title.toLowerCase().includes("flexor") || 
      e.title.toLowerCase().includes("extensor") || 
      e.title.toLowerCase().includes("rotator") ||
      e.title.toLowerCase().includes("shrug")
    ),
    mobilization: exercises.filter(e => 
      e.title.toLowerCase().includes("mobilization") || 
      e.title.toLowerCase().includes("snag") ||
      e.title.toLowerCase().includes("neural")
    ),
    tmj: exercises.filter(e => 
      e.title.toLowerCase().includes("tmj") ||
      e.title.toLowerCase().includes("massage") ||
      e.title.toLowerCase().includes("temporal") ||
      e.title.toLowerCase().includes("buccal")
    ),
    coordination: exercises.filter(e => 
      e.title.toLowerCase().includes("coordination") || 
      e.title.toLowerCase().includes("gaze") ||
      e.title.toLowerCase().includes("combined") ||
      e.title.toLowerCase().includes("archer")
    ),
    activities: exercises.filter(e => e.type === "activity")
  };
  
  // For exercises that didn't fit in any category
  const categorized = [
    ...categories.breathing, 
    ...categories.stretching,
    ...categories.strengthening,
    ...categories.mobilization,
    ...categories.tmj,
    ...categories.coordination,
    ...categories.activities
  ];
  
  const other = exercises.filter(e => !categorized.includes(e));
  
  return {
    ...categories,
    other
  };
};
