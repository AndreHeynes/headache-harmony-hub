
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 36-42 in Phase 2
 */

// Day 36 exercises
export const getDay36Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                      "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", 
                      "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 37 exercises
export const getDay37Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "22.0", "29.0", "31.0", "34.0", "39.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 38 exercises
export const getDay38Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", 
                      "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 39 exercises
export const getDay39Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.4", 
                      "20.1", "21.0", "22.1", "22.0", "53.0", "54.0", "51.0", "51.1", 
                      "52.0", "56.1", "56.2"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 40 exercises
export const getDay40Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "10.0", "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", 
                      "22.0", "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 41 exercises
export const getDay41Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "22.2", 
                      "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-3", "as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
