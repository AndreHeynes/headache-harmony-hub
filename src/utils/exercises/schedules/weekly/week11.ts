
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 71-76 in Phase 2
 */

// Day 71 exercises
export const getDay71Exercises = (): Exercise[] => {
  const exerciseIds = ["46.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 72 exercises
export const getDay72Exercises = (): Exercise[] => {
  const exerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 73 exercises
export const getDay73Exercises = (): Exercise[] => {
  const exerciseIds = ["46.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 74 exercises
export const getDay74Exercises = (): Exercise[] => {
  const exerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 75 exercises
export const getDay75Exercises = (): Exercise[] => {
  const exerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 76 exercises
export const getDay76Exercises = (): Exercise[] => {
  const exerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
