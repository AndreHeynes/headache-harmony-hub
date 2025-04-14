
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 1-7 in Phase 2
 */

// Day 1 exercises
export const getDay1Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "10.0", "12.0", "13.0", "14.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 2 exercises
export const getDay2Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 3 exercises
export const getDay3Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 4 exercises
export const getDay4Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 5 exercises
export const getDay5Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 6 exercises
export const getDay6Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
