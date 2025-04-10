
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

  // Find laterality answer
  const lateralityAnswer = fhtResponse.answers.find(
    answer => answer.questionId === "headache-laterality"
  );
  
  const laterality = lateralityAnswer?.value as string || "bilateral";
  
  let selectedTypes: string[] = [];
  
  if (headacheTypesAnswer && Array.isArray(headacheTypesAnswer.value)) {
    selectedTypes = headacheTypesAnswer.value as string[];
  }
  
  // If no specific types selected, return general exercises
  if (selectedTypes.length === 0) {
    return exercises.filter(ex => ex.isGeneralExercise);
  }

  // Check if types 4 or 6 are selected
  const hasType4 = selectedTypes.includes("4"); // Occipital Neuralgia
  const hasType6 = selectedTypes.includes("6"); // TMJD
  
  // Filter exercises based on selected types and laterality
  return exercises.filter(exercise => {
    // Include general exercises for everyone
    if (exercise.isGeneralExercise) {
      // For laterality-specific general exercises, filter by side
      if (exercise.title.includes("(R)") && (laterality === "left" || laterality === "bilateral" || laterality === "varies")) {
        return true;
      }
      if (exercise.title.includes("(L)") && (laterality === "right" || laterality === "bilateral" || laterality === "varies")) {
        return true;
      }
      if (!exercise.title.includes("(R)") && !exercise.title.includes("(L)")) {
        return true; // Non-lateralized exercise
      }
      return false;
    }
    
    // Handle laterality for special exercises
    const isRightSideExercise = exercise.title.includes("(R)");
    const isLeftSideExercise = exercise.title.includes("(L)");
    
    // Filter out side-specific exercises based on laterality preference
    if (isRightSideExercise && laterality === "left") {
      return false;
    }
    if (isLeftSideExercise && laterality === "right") {
      return false;
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
