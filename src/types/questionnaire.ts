
export type QuestionType = 'multiple-choice' | 'radio' | 'checkbox' | 'text' | 'heading' | 'info' | 'activity-select';

export interface QuestionOption {
  id: string;
  text: string;
  value: string | number;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  required?: boolean;
  info?: string;
  activitySaveKey?: string; // For storing user-defined activities
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  instructions?: string;
  sections: QuestionnaireSection[];
  interpretations?: {
    ranges: {
      min: number;
      max: number;
      text: string;
    }[];
  };
  scoring?: {
    type: 'sum' | 'custom';
    groups?: {
      id: string;
      name: string;
      items: string[]; // question IDs
      interpretation?: {
        ranges: {
          min: number;
          max: number;
          text: string;
        }[];
      };
    }[];
    customFunction?: string; // For complex scoring logic
  };
  recommendedExercises?: {
    typeMap: Record<string, string[]>; // Maps types to exercise IDs
  };
}

export interface QuestionnaireResponse {
  questionnaireId: string;
  date: string;
  answers: {
    questionId: string;
    value: string | number | string[];
  }[];
  score?: number;
  groupScores?: Record<string, number | string>;
  savedActivities?: {
    id: string;
    text: string;
    rating: number;
  }[];
  recommendedExercises?: string[];
}
