
import { Questionnaire } from "@/types/questionnaire";
import { pscQuestions } from "./pscQuestions";
import { pscScoring } from "./pscScoring";

export const pscQuestionnaire: Questionnaire = {
  id: "psc",
  title: "Pain Stages of Change Questionnaire",
  description: "This questionnaire helps us better understand the way you view your pain problem.",
  instructions: "Each statement describes how you may feel about this problem. Please indicate the extent to which you tend to agree or disagree with each statement. In each case, make your choice based on how you feel right now, not how you have felt in the past or how you would like to feel.",
  sections: pscQuestions,
  scoring: pscScoring
};
