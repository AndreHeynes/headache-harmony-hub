
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 22-28 in Phase 2
 */

// Day 22 exercises
export const getDay22Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "10.0", "11.0", "12.0", "14.0", "18.2", "19.2", "23.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 23 exercises
export const getDay23Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 24 exercises
export const getDay24Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                      "16.0", "17.0", "18.2", "19.2", "23.1", "53.0", "54.0", 
                      "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 25 exercises
export const getDay25Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 26 exercises
export const getDay26Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "10.0", "11.0", "12.0", "15.0", "18.2", "19.2", "23.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 27 exercises
export const getDay27Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                      "16.0", "17.0", "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
