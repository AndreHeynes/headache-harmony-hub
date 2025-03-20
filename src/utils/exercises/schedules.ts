import { Exercise } from "./types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getRecommendedExercises } from "./filters";
import { exercises } from "./data";

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
    
    return exercises.filter(ex => 
      day1ExerciseIds.includes(ex.id) || day1ActivityIds.includes(ex.id)
    );
  }
  
  // Days 2-44 are already implemented in the existing file...
  // ... keep existing code for days 2-44
  
  // Day 45 exercises
  else if (day === 45) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0",
                           "18.4", "20.1", "21.0", "22.1", "53.0", "54.0", "51.0", "51.1", "52.0",
                           "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 46 exercises
  else if (day === 46) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 47 exercises
  else if (day === 47) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1",
                           "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 48 exercises
  else if (day === 48) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", "11.0", "12.0", 
                           "15.0", "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 49 exercises - Week 7 review
  else if (day === 49) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "11.0", "16.0", "17.0",
                           "18.4", "20.1", "21.0", "22.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 50 exercises
  else if (day === 50) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 51 exercises
  else if (day === 51) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 52 exercises
  else if (day === 52) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 53 exercises
  else if (day === 53) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 54 exercises
  else if (day === 54) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 55 exercises
  else if (day === 55) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 56 exercises
  else if (day === 56) {
    const dayExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 57 exercises
  else if (day === 57) {
    const dayExerciseIds = ["43.0", "46.0", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 58 exercises
  else if (day === 58) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 59 exercises
  else if (day === 59) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 60 exercises
  else if (day === 60) {
    const dayExerciseIds = ["48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 61 exercises
  else if (day === 61) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 62 exercises
  else if (day === 62) {
    const dayExerciseIds = ["43.0", "46.0", "46.1", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 63 exercises 
  else if (day === 63) {
    const dayExerciseIds = ["43.0", "46.0", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 64 exercises
  else if (day === 64) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 65 exercises
  else if (day === 65) {
    const dayExerciseIds = ["46.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 66 exercises
  else if (day === 66) {
    const dayExerciseIds = ["46.1", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 67 exercises
  else if (day === 67) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 68 exercises
  else if (day === 68) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 69 exercises
  else if (day === 69) {
    const dayExerciseIds = ["46.1", "48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 70 exercises - Week 10 review
  else if (day === 70) {
    const dayExerciseIds = ["46.0", "46.1", "48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 71 exercises
  else if (day === 71) {
    const dayExerciseIds = ["46.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 72 exercises
  else if (day === 72) {
    const dayExerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 73 exercises
  else if (day === 73) {
    const dayExerciseIds = ["48.0", "48.1", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 74 exercises
  else if (day === 74) {
    const dayExerciseIds = ["46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 75 exercises
  else if (day === 75) {
    const dayExerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 76 exercises - Final day of Phase 2
  else if (day === 76) {
    const dayExerciseIds = ["46.0", "46.1", "48.0", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // For weekly review days (7, 14, etc.)
  else if (day % 7 === 0) {
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
  
  // For days not explicitly defined yet, use the pattern from previous weeks
  // This is a fallback for any days that might be missed
  else {
    // Map to the equivalent day in the first few weeks
    const equivalentDay = ((day - 1) % 42) + 1;
    return getExercisesForDay(equivalentDay, fhtResponse);
  }
};

/**
 * Get exercises for day 7 (including breathing exercises from day 1)
 * This is a special case for the weekly review day
 */
export const getDay7Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day7ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "11.0", "16.0", "17.0", 
                           "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day7ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return exercises.filter(ex => 
    day7ExerciseIds.includes(ex.id) || day7ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 14 (second weekly review day)
 */
export const getDay14Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day14ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0", 
                            "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day14ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return exercises.filter(ex => 
    day14ExerciseIds.includes(ex.id) || day14ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 21 (third weekly review day)
 */
export const getDay21Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day21ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.2", "19.2", "23.1", 
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day21ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return exercises.filter(ex => 
    day21ExerciseIds.includes(ex.id) || day21ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 28 (fourth weekly review day)
 */
export const getDay28Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day28ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const day28ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return exercises.filter(ex => 
    day28ExerciseIds.includes(ex.id) || day28ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 35 (fifth weekly review day)
 */
export const getDay35Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day35ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day35ActivityIds = ["as-3", "as-4"];
  
  return exercises.filter(ex => 
    day35ExerciseIds.includes(ex.id) || day35ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 42 (sixth weekly review day)
 */
export const getDay42Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day42ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day42ActivityIds = ["as-3", "as-4"];
  
  return exercises.filter(ex => 
    day42ExerciseIds.includes(ex.id) || day42ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 49 (seventh weekly review day)
 */
export const getDay49Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day49ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "11.0", "16.0", "17.0",
                           "18.4", "20.1", "21.0", "22.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day49ActivityIds = ["as-4", "as-5.1"];
  
  return exercises.filter(ex => 
    day49ExerciseIds.includes(ex.id) || day49ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 56 (eighth weekly review day)
 */
export const getDay56Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day56ExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
  const day56ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day56ExerciseIds.includes(ex.id) || day56ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 63 (ninth weekly review day)
 */
export const getDay63Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day63ExerciseIds = ["43.0", "46.0", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day63ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day63ExerciseIds.includes(ex.id) || day63ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 70 (tenth weekly review day)
 */
export const getDay70Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day70ExerciseIds = ["46.0", "46.1", "48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day70ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day70ExerciseIds.includes(ex.id) || day70ActivityIds.includes(ex.id)
  );
};
