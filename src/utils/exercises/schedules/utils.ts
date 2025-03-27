
import { Exercise } from "../types";
import { exercises } from "../data";

/**
 * Filter exercises by specified IDs
 */
export const getExercisesByIds = (exerciseIds: string[], activityIds: string[] = []): Exercise[] => {
  return exercises.filter(ex => 
    exerciseIds.includes(ex.id) || activityIds.includes(ex.id)
  );
};

/**
 * Get weekly review day exercises based on the day number
 */
export const getWeeklyReviewExercises = (day: number): Exercise[] => {
  // Weekly review days exercises will be handled in the dailyExercises.ts file
  // This is a placeholder for now
  return [];
};
