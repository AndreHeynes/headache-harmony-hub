
import { Exercise } from "./types";
import { exercises } from "./data";

/**
 * Get exercise by ID
 */
export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(ex => ex.id === id);
};
