
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 15-21 in Phase 2
 */

// Day 15 exercises
export const getDay15Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.1", 
                      "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 16 exercises
export const getDay16Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "10.0", "12.0", "13.0", "14.0", "18.1", "19.1", "53.0", 
                      "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 17 exercises
export const getDay17Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "18.1", "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 18 exercises
export const getDay18Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                      "16.0", "17.0", "18.1", "19.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 19 exercises
export const getDay19Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "18.1", "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 20 exercises
export const getDay20Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "10.0", "12.0", "13.0", "15.0", "18.1", "19.1", "53.0", 
                      "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
