
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 57-63 in Phase 2
 */

// Day 57 exercises
export const getDay57Exercises = (): Exercise[] => {
  const exerciseIds = ["23.3", "43.0", "46.0", "48.0", "50.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 58 exercises
export const getDay58Exercises = (): Exercise[] => {
  const exerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 59 exercises
export const getDay59Exercises = (): Exercise[] => {
  const exerciseIds = ["23.3", "43.0", "46.0", "46.1", "50.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 60 exercises
export const getDay60Exercises = (): Exercise[] => {
  const exerciseIds = ["48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 61 exercises
export const getDay61Exercises = (): Exercise[] => {
  const exerciseIds = ["23.3", "43.0", "46.0", "46.1", "48.1", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 62 exercises
export const getDay62Exercises = (): Exercise[] => {
  const exerciseIds = ["46.0", "46.1", "48.0", "48.1", "50.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
