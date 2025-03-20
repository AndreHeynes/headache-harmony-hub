import { Exercise } from "./types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getRecommendedExercises } from "./filters";

/**
 * Get exercises for a specific day in Phase 2
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  // Get all recommended exercises based on FHT questionnaire
  const allRecommended = getRecommendedExercises(fhtResponse);
  
  // Day 1 exercises - specific list from requirements
  if (day === 1) {
    // Filter day 1 exercises from our allRecommended list
    const day1ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                              "10.0", "12.0", "13.0", "14.0", "53.0", "54.0", 
                              "51.0", "51.1", "52.0"];
    const day1ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    // Return only the exercises that are both recommended (based on FHT) and in our day 1 list
    return allRecommended.filter(ex => 
      day1ExerciseIds.includes(ex.id) || day1ActivityIds.includes(ex.id)
    );
  }
  
  // For demonstration, show different exercises on different days
  // In a real implementation, you would have a proper schedule
  else if (day % 7 === 0) { // Day 7, 14, 21, etc.
    // Weekly review days - return activity sheets for review
    return allRecommended.filter(ex => ex.type === "activity").slice(0, 3);
  } else if (day % 7 === 2) { // Day 2, 9, 16, etc.
    // Get a subset of exercises for variety
    return allRecommended.filter((_, index) => index % 3 === 0).slice(0, 5);
  } else if (day % 7 === 3) { // Day 3, 10, 17, etc.
    // Get a different subset of exercises
    return allRecommended.filter((_, index) => index % 3 === 1).slice(0, 5);
  } else if (day % 7 === 4) { // Day 4, 11, 18, etc.
    // Get another subset of exercises
    return allRecommended.filter((_, index) => index % 3 === 2).slice(0, 5);
  } else if (day % 7 === 5) { // Day 5, 12, 19, etc.
    // Focus more on general exercises
    return allRecommended.filter(ex => ex.isGeneralExercise).slice(0, 6);
  } else if (day % 7 === 6) { // Day 6, 13, 20, etc.
    // Focus more on specialized exercises
    return allRecommended.filter(ex => !ex.isGeneralExercise && ex.type === "exercise").slice(0, 6);
  } else {
    // Other days - mix of exercises
    return allRecommended.slice(0, Math.min(day % 5 + 3, allRecommended.length));
  }
};
