
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
  side?: "left" | "right" | "bilateral"; // Optional side specification
}

// Map of headache types to specific exercises
export const typeToExerciseMap: Record<string, string[]> = {
  "4": ["56.1", "56.2", "57.0"], // Occipital Neuralgia specific exercises
  "6": ["51.0", "51.1", "52.0", "53.0", "54.0"], // TMJD Related specific exercises
};

// Exercises to exclude for specific headache types
export const typeToExcludedExercises: Record<string, string[]> = {
  "4": ["51.0", "51.1", "52.0", "53.0", "54.0"], // TMJD exercises excluded for Occipital Neuralgia
  "6": ["56.1", "56.2", "57.0"], // Occipital exercises excluded for TMJD
};
