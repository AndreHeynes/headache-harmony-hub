
import { Exercise } from "../../types";
import { getExercisesByIds } from "../utils";

/**
 * Get exercises for days 43-49 in Phase 2
 */

// Day 43 exercises
export const getDay43Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "18.3", "20.2", "21.1", "22.0", "23.2", "53.0", "54.0", 
                      "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 44 exercises
export const getDay44Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "10.0", "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", 
                      "41.0", "41.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 45 exercises
export const getDay45Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                      "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "23.2", 
                      "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 46 exercises
export const getDay46Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                      "18.4", "20.1", "21.0", "22.1", "41.0", "41.1", "53.0", 
                      "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 47 exercises
export const getDay47Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                      "18.4", "20.1", "21.0", "22.1", "23.2", "41.0", "41.1", 
                      "53.0", "54.0", "51.0", "51.1", "52.0"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};

// Day 48 exercises
export const getDay48Exercises = (): Exercise[] => {
  const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                      "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", 
                      "41.0", "41.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const activityIds = ["as-4", "as-5.1"];
  
  return getExercisesByIds(exerciseIds, activityIds);
};
