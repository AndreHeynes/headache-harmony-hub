
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
  
  // Days 45-76 exercise schedules
  if (day >= 45 && day <= 76) {
    return getLaterPhaseExercises(day);
  }
  
  // For days not explicitly defined yet, use the pattern from previous weeks
  // This is a fallback for any days that might be missed
  else {
    // Map to the equivalent day in the first few weeks
    const equivalentDay = ((day - 1) % 42) + 1;
    return getExercisesForDay(equivalentDay, fhtResponse);
  }
};

/**
 * Get exercises for days 45-76
 */
const getLaterPhaseExercises = (day: number): Exercise[] => {
  // Day 45 exercises
  if (day === 45) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0",
                           "18.4", "20.1", "21.0", "22.1", "53.0", "54.0", "51.0", "51.1", "52.0",
                           "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 46 exercises
  else if (day === 46) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 47 exercises
  else if (day === 47) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1",
                           "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 48 exercises
  else if (day === 48) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", "11.0", "12.0", 
                           "15.0", "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 50 exercises
  else if (day === 50) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 51 exercises
  else if (day === 51) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 52 exercises
  else if (day === 52) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 53 exercises
  else if (day === 53) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 54 exercises
  else if (day === 54) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 55 exercises
  else if (day === 55) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 57 exercises
  else if (day === 57) {
    const dayExerciseIds = ["43.0", "46.0", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 58 exercises
  else if (day === 58) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 59 exercises
  else if (day === 59) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 60 exercises
  else if (day === 60) {
    const dayExerciseIds = ["48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 61 exercises
  else if (day === 61) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 62 exercises
  else if (day === 62) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 64 exercises
  else if (day === 64) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 65 exercises
  else if (day === 65) {
    const dayExerciseIds = ["46.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 66 exercises
  else if (day === 66) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 67 exercises
  else if (day === 67) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 68 exercises
  else if (day === 68) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 69 exercises
  else if (day === 69) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 71 exercises
  else if (day === 71) {
    const dayExerciseIds = ["46.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 72 exercises
  else if (day === 72) {
    const dayExerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 73 exercises
  else if (day === 73) {
    const dayExerciseIds = ["48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 74 exercises
  else if (day === 74) {
    const dayExerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 75 exercises
  else if (day === 75) {
    const dayExerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Day 76 exercises - Final day of Phase 2
  else if (day === 76) {
    const dayExerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return getExercisesByIds(dayExerciseIds, dayActivityIds);
  }
  
  // Default case - return an empty array
  return [];
};
