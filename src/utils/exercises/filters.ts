
import { Exercise } from "./types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { exercises } from "./data";

/**
 * Gets recommended exercises based on FHT questionnaire responses
 */
export const getRecommendedExercises = (
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  if (!fhtResponse || !fhtResponse.answers) {
    // If no FHT response, return general exercises only
    return exercises.filter(ex => ex.isGeneralExercise);
  }

  // Find the headache types answer
  const headacheTypesAnswer = fhtResponse.answers.find(
    answer => answer.questionId === "headache-types"
  );

  let selectedTypes: string[] = [];
  
  if (headacheTypesAnswer && Array.isArray(headacheTypesAnswer.value)) {
    selectedTypes = headacheTypesAnswer.value as string[];
  }
  
  // If no specific types selected, return general exercises
  if (selectedTypes.length === 0) {
    return exercises.filter(ex => ex.isGeneralExercise);
  }

  // Check if types 4 or 6 are selected
  const hasType4 = selectedTypes.includes("4");
  const hasType6 = selectedTypes.includes("6");
  
  // Filter exercises based on selected types
  return exercises.filter(exercise => {
    // Include general exercises for everyone
    if (exercise.isGeneralExercise) {
      return true;
    }
    
    // Special handling for Types 4 and 6
    if (hasType4 && exercise.includedForTypes?.includes("4")) {
      return true;
    }
    
    if (hasType6 && exercise.includedForTypes?.includes("6")) {
      return true;
    }
    
    // Exclude exercises specifically for types 4 or 6 if those types aren't selected
    if (!hasType4 && exercise.includedForTypes?.includes("4")) {
      return false;
    }
    
    if (!hasType6 && exercise.includedForTypes?.includes("6")) {
      return false;
    }
    
    // Check if this exercise should be excluded for any of the selected types
    for (const type of selectedTypes) {
      if (exercise.excludedForTypes?.includes(type)) {
        return false;
      }
    }
    
    // Include type-specific exercises for the selected types
    for (const type of selectedTypes) {
      if (exercise.includedForTypes?.includes(type)) {
        return true;
      }
    }
    
    // Default - include if not specifically excluded and not for types 4 or 6
    return (!exercise.excludedForTypes || exercise.excludedForTypes.length === 0) 
           && (!exercise.includedForTypes || (!exercise.includedForTypes.includes("4") && !exercise.includedForTypes.includes("6")));
  });
};

/**
 * Check if a specific exercise should be shown to the user based on their FHT results
 */
export const shouldShowExercise = (
  exerciseId: string,
  fhtResponse?: QuestionnaireResponse
): boolean => {
  const recommendedExercises = getRecommendedExercises(fhtResponse);
  return recommendedExercises.some(ex => ex.id === exerciseId);
};
