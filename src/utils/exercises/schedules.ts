
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
  
  // Day 2 exercises
  else if (day === 2) {
    const day2ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day2ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day2ExerciseIds.includes(ex.id) || day2ActivityIds.includes(ex.id)
    );
  }
  
  // Day 3 exercises
  else if (day === 3) {
    const day3ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "11.0", 
                             "16.0", "17.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day3ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day3ExerciseIds.includes(ex.id) || day3ActivityIds.includes(ex.id)
    );
  }
  
  // Day 4 exercises
  else if (day === 4) {
    const day4ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day4ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day4ExerciseIds.includes(ex.id) || day4ActivityIds.includes(ex.id)
    );
  }
  
  // Day 5 exercises
  else if (day === 5) {
    const day5ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", "12.0", "13.0", 
                             "15.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day5ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day5ExerciseIds.includes(ex.id) || day5ActivityIds.includes(ex.id)
    );
  }
  
  // Day 6 exercises
  else if (day === 6) {
    const day6ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day6ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day6ExerciseIds.includes(ex.id) || day6ActivityIds.includes(ex.id)
    );
  }
  
  // Day 8 exercises (after week 1 review)
  else if (day === 8) {
    const day8ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day8ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day8ExerciseIds.includes(ex.id) || day8ActivityIds.includes(ex.id)
    );
  }
  
  // Day 9 exercises
  else if (day === 9) {
    const day9ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "10.0", "12.0", 
                             "13.0", "14.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day9ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day9ExerciseIds.includes(ex.id) || day9ActivityIds.includes(ex.id)
    );
  }
  
  // Day 10 exercises
  else if (day === 10) {
    const day10ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "18.0", "19.0", 
                              "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day10ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day10ExerciseIds.includes(ex.id) || day10ActivityIds.includes(ex.id)
    );
  }
  
  // Day 11 exercises
  else if (day === 11) {
    const day11ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0", 
                              "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day11ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day11ExerciseIds.includes(ex.id) || day11ActivityIds.includes(ex.id)
    );
  }
  
  // Day 12 exercises
  else if (day === 12) {
    const day12ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "18.0", "19.0", 
                              "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day12ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day12ExerciseIds.includes(ex.id) || day12ActivityIds.includes(ex.id)
    );
  }
  
  // Day 13 exercises
  else if (day === 13) {
    const day13ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "10.0", "12.0", "13.0", 
                              "15.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day13ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day13ExerciseIds.includes(ex.id) || day13ActivityIds.includes(ex.id)
    );
  }
  
  // For weekly review days (7, 14, etc.)
  else if (day % 7 === 0) {
    // Weekly review days are handled in the component with special UI
    // Return activity sheets for review
    return exercises.filter(ex => ex.type === "activity").slice(0, 6);
  }
  
  // For days not explicitly defined yet, use the pattern from week 1 and 2
  // This is a fallback for days beyond 14
  else {
    // Map to the equivalent day in the first two weeks
    const equivalentDay = ((day - 1) % 14) + 1;
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
