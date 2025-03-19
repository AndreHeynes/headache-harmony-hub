import { QuestionnaireResponse } from "@/types/questionnaire";

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  excludedForTypes?: string[];
  includedForTypes?: string[];
  isGeneralExercise?: boolean;
  type?: "activity" | "exercise";
  activitySheetName?: string;
  activitySheetId?: string;
  requiresInput?: boolean;
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
  // Breathing exercises - general for everyone
  {
    id: "0.1",
    title: "Relaxed Breathing (Seated)",
    description: "Deep relaxed breathing technique performed while seated",
    videoUrl: "https://vimeo.com/1055229271",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "0.2",
    title: "Relaxed Breathing (Sidelying)",
    description: "Deep relaxed breathing technique performed while lying on your side",
    videoUrl: "https://vimeo.com/1055222728",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Scalene stretches - general for everyone
  {
    id: "2.0",
    title: "Anterior Scalene Stretch (R)",
    description: "Gentle stretch for the right anterior scalene muscle",
    videoUrl: "https://vimeo.com/1055234697",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "2.1", 
    title: "Anterior Scalene Stretch (L)",
    description: "Gentle stretch for the left anterior scalene muscle",
    videoUrl: "https://vimeo.com/1055478757",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3.0",
    title: "Middle Scalene Stretch (R)",
    description: "Gentle stretch for the right middle scalene muscle",
    videoUrl: "https://vimeo.com/1055479330",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3.1",
    title: "Middle Scalene Stretch (L)",
    description: "Gentle stretch for the left middle scalene muscle",
    videoUrl: "https://vimeo.com/1055479994",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "4.0",
    title: "Posterior Scalene Stretch (R)",
    description: "Gentle stretch for the right posterior scalene muscle",
    videoUrl: "https://vimeo.com/1055481097",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "4.1",
    title: "Posterior Scalene Stretch (L)",
    description: "Gentle stretch for the left posterior scalene muscle",
    videoUrl: "https://vimeo.com/1055236162",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Chin and neck exercises - general for everyone
  {
    id: "10.0",
    title: "Chin Retractions",
    description: "Exercise to improve posture and neck alignment",
    videoUrl: "https://vimeo.com/1055478757",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "12.0",
    title: "Extension SNAG",
    description: "Sustained Natural Apophyseal Glide technique for neck extension",
    videoUrl: "",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "13.0",
    title: "Reverse SNAG",
    description: "Reversed Sustained Natural Apophyseal Glide technique",
    videoUrl: "https://vimeo.com/1055482073",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "14.0",
    title: "Left Rotation SNAG",
    description: "Sustained Natural Apophyseal Glide technique for left neck rotation",
    videoUrl: "https://vimeo.com/1055483241",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // TMJ specific exercises - for Type 6
  {
    id: "51.0",
    title: "TMJ Opening Mobilization 1 (R)",
    description: "Gentle mobilization technique for the right temporomandibular joint",
    videoUrl: "https://vimeo.com/1055488933",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "51.1",
    title: "TMJ Opening Mobilization 1 (L)",
    description: "Gentle mobilization technique for the left temporomandibular joint",
    videoUrl: "https://vimeo.com/1055490245",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "52.0",
    title: "TMJ Opening Mobilization 2",
    description: "Advanced mobilization technique for the temporomandibular joint",
    videoUrl: "https://vimeo.com/1055483903",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "53.0",
    title: "Temporal Self Massage",
    description: "Self-massage technique for temporal region to relieve tension",
    videoUrl: "https://vimeo.com/1055487326",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "54.0",
    title: "Buccal Self Massage",
    description: "Self-massage technique for the buccal region to relieve tension",
    videoUrl: "https://vimeo.com/1055485611",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  
  // Occipital Neuralgia specific exercises - for Type 4
  {
    id: "56.1",
    title: "Neural Mobility Level 1 (L)",
    description: "Neural mobility exercise for the left side",
    videoUrl: "https://vimeo.com/1063585819",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  {
    id: "56.2",
    title: "Neural Mobility Level 1 (R)",
    description: "Neural mobility exercise for the right side",
    videoUrl: "https://vimeo.com/1063586666",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  {
    id: "57",
    title: "Additional Occipital Exercise",
    description: "Specialized exercise for occipital neuralgia",
    videoUrl: "https://vimeo.com/example",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  
  // General exercises that everyone does
  {
    id: "1",
    title: "Deep Breathing Exercise",
    description: "Controlled breathing technique to reduce stress and tension",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "2",
    title: "Posture Correction",
    description: "Exercise to improve posture and reduce neck strain",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3",
    title: "Shoulder Rolls",
    description: "Simple exercise to relieve tension in shoulders and upper back",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Activity sheets based on readiness for change (from PSC)
  {
    id: "as-1",
    title: "Improved Readiness for Change",
    description: "Activities to help you move forward in your pain management journey",
    type: "activity",
    activitySheetName: "AS 1 Improved Readiness for Change",
    activitySheetId: "readiness-for-change",
    requiresInput: true
  },
  {
    id: "as-2",
    title: "Developing Helpful Beliefs",
    description: "Exercises to identify and modify beliefs about your pain",
    type: "activity",
    activitySheetName: "AS 2 Developing Helpful Beliefs",
    activitySheetId: "helpful-beliefs",
    requiresInput: true
  },
  {
    id: "as-3",
    title: "Introduction to Headache Mechanisms",
    description: "Learn about the science behind headaches and how they work",
    type: "activity",
    activitySheetName: "AS 3 Introduction to Headache Mechanisms",
    activitySheetId: "headache-mechanisms",
    requiresInput: false
  },
  {
    id: "as-4",
    title: "Sleep Hygiene",
    description: "Techniques to improve sleep quality and reduce headaches",
    type: "activity",
    activitySheetName: "AS 4 Sleep Hygiene",
    activitySheetId: "sleep-hygiene",
    requiresInput: true
  },
  {
    id: "as-5",
    title: "Trigger Management",
    description: "Techniques to identify and manage headache triggers",
    type: "activity",
    activitySheetName: "AS 5 Trigger Management",
    activitySheetId: "trigger-management",
    requiresInput: true
  },
  {
    id: "as-5.1",
    title: "Medication Management",
    description: "Strategies for effective use of headache medications",
    type: "activity",
    activitySheetName: "AS 5.1 Medication Management",
    activitySheetId: "medication-management",
    requiresInput: true
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
