
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Questionnaire, QuestionnaireResponse } from "@/types/questionnaire";
import QuestionnaireSection from "./QuestionnaireSection";
import QuestionnaireProgress from "./QuestionnaireProgress";
import QuestionnaireInterpretation from "./QuestionnaireInterpretation";

interface QuestionnaireFormProps {
  questionnaire: Questionnaire;
  onComplete: (response: QuestionnaireResponse) => void;
  onSaveProgress?: (response: Partial<QuestionnaireResponse>) => void;
  initialAnswers?: Record<string, any>;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  questionnaire,
  onComplete,
  onSaveProgress,
  initialAnswers = {},
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const currentSection = questionnaire.sections[currentSectionIndex];
  
  // Handle answer changes
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Check if section is complete
  const isSectionComplete = () => {
    const requiredQuestions = currentSection.questions.filter(
      (q) => q.required && q.type !== 'heading' && q.type !== 'info'
    );
    
    return requiredQuestions.every((q) => {
      const answer = answers[q.id];
      return answer !== undefined && answer !== "" && answer !== null;
    });
  };

  // Go to next section
  const handleNext = () => {
    // Save progress if handler provided
    if (onSaveProgress) {
      onSaveProgress({
        questionnaireId: questionnaire.id,
        date: new Date().toISOString(),
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      });
    }

    if (currentSectionIndex < questionnaire.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      // Calculate score if needed
      let calculatedScore = null;
      if (questionnaire.interpretations) {
        // Simple scoring example - would need customization based on questionnaire
        calculatedScore = Object.values(answers).reduce((total, val) => {
          if (typeof val === 'number') {
            return total + val;
          }
          return total;
        }, 0);
        setScore(calculatedScore);
      }

      // Mark as completed and prepare response
      setIsCompleted(true);
      
      const response: QuestionnaireResponse = {
        questionnaireId: questionnaire.id,
        date: new Date().toISOString(),
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
        score: calculatedScore || undefined,
      };
      
      onComplete(response);
    }
  };

  // Go to previous section
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{questionnaire.title}</CardTitle>
        {!isCompleted && (
          <QuestionnaireProgress 
            currentSection={currentSectionIndex + 1} 
            totalSections={questionnaire.sections.length} 
          />
        )}
        {questionnaire.instructions && !isCompleted && (
          <p className="text-sm text-neutral-600 mt-2">{questionnaire.instructions}</p>
        )}
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <QuestionnaireSection
            questions={currentSection.questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        ) : (
          <QuestionnaireInterpretation 
            questionnaire={questionnaire} 
            score={score} 
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isCompleted ? (
          <>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isSectionComplete()}
            >
              {currentSectionIndex < questionnaire.sections.length - 1
                ? <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                : <>Complete <Check className="ml-2 h-4 w-4" /></>
              }
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={() => window.history.back()}>
            Return to Dashboard
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionnaireForm;
