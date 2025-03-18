
import { Question } from "@/types/questionnaire";

export const isSectionComplete = (
  questions: Question[],
  answers: Record<string, any>
): boolean => {
  const requiredQuestions = questions.filter(
    (q) => q.required && q.type !== 'heading' && q.type !== 'info'
  );
  
  return requiredQuestions.every((q) => {
    const answer = answers[q.id];
    return answer !== undefined && answer !== "" && answer !== null;
  });
};
