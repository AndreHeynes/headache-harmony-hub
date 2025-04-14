
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 29-35 in Phase 2
 */

// Day 29 exercises
export const getDay29Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "8.3", "20.0", "23.1", "53.0", "54.0", "51.0", "51.1", "52.0", 
                      "56.1", "56.2"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 30 exercises
export const getDay30Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                      "11.0", "12.0", "14.0", "18.3", "20.0", "22.2", "53.0", "54.0", 
                      "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 31 exercises
export const getDay31Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "11.0", "16.0", "17.0", "18.3", "20.0", "23.1", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 32 exercises
export const getDay32Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "18.3", "20.0", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 33 exercises
export const getDay33Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.3", 
                      "20.0", "23.1", "53.0", "54.0", "51.0", "51.1", "52.0", 
                      "56.1", "56.2"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 34 exercises
export const getDay34Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "10.0", "11.0", "12.0", "15.0", "18.3", "20.0", "22.2", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
