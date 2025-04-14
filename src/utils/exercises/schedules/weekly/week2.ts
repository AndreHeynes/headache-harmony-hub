
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 8-14 in Phase 2
 */

// Day 8 exercises
export const getDay8Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "10.0", "12.0", "13.0", "14.0", "23.0", "53.0", "54.0", 
                      "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 9 exercises
export const getDay9Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", 
                      "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 10 exercises
export const getDay10Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "11.0", "16.0", "17.0", "18.0", "19.0", "23.0", "53.0", 
                      "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 11 exercises
export const getDay11Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 12 exercises
export const getDay12Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                      "12.0", "13.0", "15.0", "18.0", "19.0", "23.0", "53.0", 
                      "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 13 exercises
export const getDay13Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
