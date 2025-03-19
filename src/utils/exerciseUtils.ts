import { QuestionnaireResponse } from "@/types/questionnaire";

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  excludedForTypes?: string[];
  includedForTypes?: string[];
  isGeneralExercise?: boolean;
}

// Map of headache types to specific exercises
export const typeToExerciseMap: Record<string, string[]> = {
  "4": ["56.1", "56.2", "57"], // Occipital Neuralgia specific exercises
  "6": ["51.0", "51.1", "52.0", "53.0", "54.0"], // TMJD Related specific exercises
};

// Exercises to exclude for specific headache types
export const typeToExcludedExercises: Record<string, string[]> = {
  "4": ["51.0", "51.1", "52.0", "53.0", "54.0"], // TMJD exercises excluded for Occipital Neuralgia
  "6": ["56.1", "56.2", "57"], // Occipital exercises excluded for TMJD
};

// Exercise database
export const exercises: Exercise[] = [
  {
    id: "51.0",
    title: "TMJ Opening Mobilization 1 (R)",
    description: "Gentle mobilization technique for the right temporomandibular joint",
    videoUrl: "https://vimeo.com/1055488933?share=copy#t=0",
    includedForTypes: ["6"],
    excludedForTypes: ["4"]
  },
  {
    id: "51.1",
    title: "TMJ Opening Mobilization 1 (L)",
    description: "Gentle mobilization technique for the left temporomandibular joint",
    videoUrl: "https://vimeo.com/1055490245?share=copy#t=0",
    includedForTypes: ["6"],
    excludedForTypes: ["4"]
  },
  {
    id: "52.0",
    title: "TMJ Opening Mobilization 2",
    description: "Advanced mobilization technique for the temporomandibular joint",
    videoUrl: "https://vimeo.com/1055483903?share=copy#t=0",
    includedForTypes: ["6"],
    excludedForTypes: ["4"]
  },
  {
    id: "53.0",
    title: "Temporal Self Massage",
    description: "Self-massage technique for temporal region to relieve tension",
    videoUrl: "https://vimeo.com/1055487326?share=copy#t=0",
    includedForTypes: ["6"],
    excludedForTypes: ["4"]
  },
  {
    id: "54.0",
    title: "Buccal Self Massage",
    description: "Self-massage technique for the buccal region to relieve tension",
    videoUrl: "https://vimeo.com/1055485611?share=copy#t=0",
    includedForTypes: ["6"],
    excludedForTypes: ["4"]
  },
  {
    id: "56.1",
    title: "Neural Mobility Level 1 (L)",
    description: "Neural mobility exercise for the left side",
    videoUrl: "https://vimeo.com/1063585819?share=copy#t=0",
    includedForTypes: ["4"],
    excludedForTypes: ["6"]
  },
  {
    id: "56.2",
    title: "Neural Mobility Level 1 (R)",
    description: "Neural mobility exercise for the right side",
    videoUrl: "https://vimeo.com/1063586666?share=copy#t=0",
    includedForTypes: ["4"],
    excludedForTypes: ["6"]
  },
  {
    id: "57",
    title: "Additional Occipital Exercise",
    description: "Specialized exercise for occipital neuralgia",
    videoUrl: "https://vimeo.com/example",
    includedForTypes: ["4"],
    excludedForTypes: ["6"]
  },
  // General exercises that everyone does
  {
    id: "1",
    title: "Deep Breathing Exercise",
    description: "Controlled breathing technique to reduce stress and tension",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true
  },
  {
    id: "2",
    title: "Posture Correction",
    description: "Exercise to improve posture and reduce neck strain",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true
  },
  {
    id: "3",
    title: "Shoulder Rolls",
    description: "Simple exercise to relieve tension in shoulders and upper back",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true
  }
];

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

  // Filter exercises based on selected types
  return exercises.filter(exercise => {
    // Include general exercises for everyone
    if (exercise.isGeneralExercise) {
      return true;
    }
    
    // Check if this exercise should be excluded for any of the selected types
    for (const type of selectedTypes) {
      if (exercise.excludedForTypes?.includes(type)) {
        return false;
      }
    }
    
    // Include type-specific exercises
    for (const type of selectedTypes) {
      if (exercise.includedForTypes?.includes(type)) {
        return true;
      }
    }
    
    // Default - include if not specifically excluded
    return !exercise.excludedForTypes || exercise.excludedForTypes.length === 0;
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

/**
 * Get exercise by ID
 */
export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(ex => ex.id === id);
};

/**
 * Get exercises for a specific day in Phase 2
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  // This is a simplified implementation
  // In a real app, you'd have a more structured approach
  // to assign specific exercises to specific days
  
  // For now, let's just return a subset of exercises based on the day
  const allRecommended = getRecommendedExercises(fhtResponse);
  
  // For demonstration, show different exercises on different days
  // In a real implementation, you would have a proper schedule
  if (day % 7 === 1) { // Day 1, 8, 15, etc.
    return allRecommended.slice(0, 3);
  } else if (day % 7 === 2) { // Day 2, 9, 16, etc.
    return allRecommended.slice(2, 5);
  } else if (day % 7 === 0) { // Day 7, 14, 21, etc.
    // Weekly review days
    return [];
  } else {
    // Other days
    return allRecommended.slice(0, Math.min(day % 5 + 1, allRecommended.length));
  }
};
