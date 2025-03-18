
export type QuestionType = 'multiple-choice' | 'radio' | 'checkbox' | 'text' | 'heading' | 'info';

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
}

export interface QuestionnaireResponse {
  questionnaireId: string;
  date: string;
  answers: {
    questionId: string;
    value: string | number | string[];
  }[];
  score?: number;
}
