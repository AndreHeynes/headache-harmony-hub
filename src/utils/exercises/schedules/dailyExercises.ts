import { Exercise } from "../types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getRecommendedExercises } from "../filters";
import { exercises } from "../data";
import { getExercisesByIds } from "./utils";
import {
  getDay7Exercises,
  getDay14Exercises,
  getDay21Exercises,
  getDay28Exercises,
  getDay35Exercises,
  getDay42Exercises,
  getDay49Exercises,
  getDay56Exercises,
  getDay63Exercises,
  getDay70Exercises
} from "./weeklyReviews";

/**
 * Get exercises for a specific day in Phase 2
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  // Get all recommended exercises based on FHT questionnaire
  const allRecommended = getRecommendedExercises(fhtResponse);
  
  // Return exercises for specific days based on the provided schedule
  // For days 7, 14, etc. (weekly review days), the component itself handles the display
  
  // Day 1 exercises - specific list from requirements
  if (day === 1) {
    const day1ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                             "10.0", "12.0", "13.0", "14.0", "53.0", "54.0", 
                             "51.0", "51.1", "52.0"];
    const day1ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day1ExerciseIds, day1ActivityIds);
  }
  
  // Day 2 exercises
  if (day === 2) {
    const day2ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day2ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day2ExerciseIds, day2ActivityIds);
  }
  
  // Day 3 exercises
  if (day === 3) {
    const day3ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day3ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day3ExerciseIds, day3ActivityIds);
  }
  
  // Day 4 exercises
  if (day === 4) {
    const day4ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day4ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day4ExerciseIds, day4ActivityIds);
  }
  
  // Day 5 exercises
  if (day === 5) {
    const day5ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day5ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day5ExerciseIds, day5ActivityIds);
  }
  
  // Day 6 exercises
  if (day === 6) {
    const day6ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day6ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return getExercisesByIds(day6ExerciseIds, day6ActivityIds);
  }
  
  // For weekly review days (7, 14, etc.)
  if (day % 7 === 0) {
    // Select the appropriate weekly review function based on week number
    if (day === 7) {
      return getDay7Exercises();
    } else if (day === 14) {
      return getDay14Exercises();
    } else if (day === 21) {
      return getDay21Exercises();
    } else if (day === 28) {
      return getDay28Exercises();
    } else if (day === 35) {
      return getDay35Exercises();
    } else if (day === 42) {
      return getDay42Exercises();
    } else if (day === 49) {
      return getDay49Exercises();
    } else if (day === 56) {
      return getDay56Exercises();
    } else if (day === 63) {
      return getDay63Exercises();
    } else if (day === 70) {
      return getDay70Exercises();
    } else {
      // For other weekly review days, use a default set of exercises
      return exercises.filter(ex => ex.type === "activity").slice(0, 6);
    }
  }
  
  // Updated daily exercise schedules
  
  // Day 8
  if (day === 8) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "10.0", "12.0", "13.0", "14.0", "23.0", "53.0", "54.0", 
                        "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 9
  if (day === 9) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", 
                        "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 10
  if (day === 10) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "11.0", "16.0", "17.0", "18.0", "19.0", "23.0", "53.0", 
                        "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 11
  if (day === 11) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 12
  if (day === 12) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                        "12.0", "13.0", "15.0", "18.0", "19.0", "23.0", "53.0", 
                        "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 13
  if (day === 13) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
    // Day 14
    if (day === 14) {
        return getDay14Exercises();
    }
  
  // Day 15
  if (day === 15) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.1", 
                        "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 16
  if (day === 16) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "10.0", "12.0", "13.0", "14.0", "18.1", "19.1", "53.0", 
                        "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 17
  if (day === 17) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "18.1", "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 18
  if (day === 18) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                        "16.0", "17.0", "18.1", "19.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 19
  if (day === 19) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "18.1", "19.1", "23.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 20
  if (day === 20) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "10.0", "12.0", "13.0", "15.0", "18.1", "19.1", "53.0", 
                        "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
    // Day 21
    if (day === 21) {
        return getDay21Exercises();
    }
  
  // Day 22
  if (day === 22) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "10.0", "11.0", "12.0", "14.0", "18.2", "19.2", "23.1", 
                        "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 23
  if (day === 23) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 24
  if (day === 24) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                        "16.0", "17.0", "18.2", "19.2", "23.1", "53.0", "54.0", 
                        "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 25
  if (day === 25) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 26
  if (day === 26) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "10.0", "11.0", "12.0", "15.0", "18.2", "19.2", "23.1", 
                        "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 27
  if (day === 27) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                        "16.0", "17.0", "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
    // Day 28
    if (day === 28) {
        return getDay28Exercises();
    }
  
  // Day 29
  if (day === 29) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "8.3", "20.0", "23.1", "53.0", "54.0", "51.0", "51.1", "52.0", 
                        "56.1", "56.2"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 30
  if (day === 30) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                        "11.0", "12.0", "14.0", "18.3", "20.0", "22.2", "53.0", "54.0", 
                        "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 31
  if (day === 31) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "11.0", "16.0", "17.0", "18.3", "20.0", "23.1", "53.0", "54.0", 
                        "51.0", "51.1", "52.0", "56.1", "56.2"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 32
  if (day === 32) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "18.3", "20.0", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 33
  if (day === 33) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.3", 
                        "20.0", "23.1", "53.0", "54.0", "51.0", "51.1", "52.0", 
                        "56.1", "56.2"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 34
  if (day === 34) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "10.0", "11.0", "12.0", "15.0", "18.3", "20.0", "22.2", 
                        "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
    // Day 35
    if (day === 35) {
        return getDay35Exercises();
    }
  
  // Day 36
  if (day === 36) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                        "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", 
                        "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 37
  if (day === 37) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "22.0", "29.0", "31.0", "34.0", "39.0", "53.0", "54.0", 
                        "51.0", "51.1", "52.0", "56.1", "56.2"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 38
  if (day === 38) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", 
                        "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 39
  if (day === 39) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.4", 
                        "20.1", "21.0", "22.1", "22.0", "53.0", "54.0", "51.0", "51.1", 
                        "52.0", "56.1", "56.2"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 40
  if (day === 40) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "10.0", "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", 
                        "22.0", "23.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 41
  if (day === 41) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "22.2", 
                        "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const activityIds = ["as-3", "as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
    // Day 42
    if (day === 42) {
        return getDay42Exercises();
    }
  
  // Day 43
  if (day === 43) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "18.3", "20.2", "21.1", "22.0", "23.2", "53.0", "54.0", 
                        "51.0", "51.1", "52.0", "56.1", "56.2"];
    const activityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 44
  if (day === 44) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "10.0", "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", 
                        "41.0", "41.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  // Day 45 to Day 76
  if (day === 45) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", 
                        "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "23.2", 
                        "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const activityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  if (day === 46) {
    const exerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                        "18.4", "20.1", "21.0", "22.1", "41.0", "41.1", "53.0", 
                        "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  if (day === 47) {
    const exerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                        "18.4", "20.1", "21.0", "22.1", "23.2", "41.0", "41.1", 
                        "53.0", "54.0", "51.0", "51.1", "52.0"];
    const activityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(exerciseIds, activityIds);
  }
  
  if (day === 48) {
    const exerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", 
                        "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", 
                        "41.0", "41.1", "53.0", "54
