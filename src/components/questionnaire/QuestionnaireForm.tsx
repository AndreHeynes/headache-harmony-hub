
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Questionnaire, QuestionnaireResponse } from "@/types/questionnaire";
import QuestionnaireSection from "./QuestionnaireSection";
import QuestionnaireProgress from "./QuestionnaireProgress";
import QuestionnaireInterpretation from "./QuestionnaireInterpretation";
import { toast } from "sonner";
import { isSectionComplete } from "./utils/SectionValidator";
import { calculateQuestionnaireScore, formatQuestionnaireResponse } from "./QuestionnaireScoring";

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
  const [groupScores, setGroupScores] = useState<Record<string, number | string>>({});
  const [savedActivities, setSavedActivities] = useState<any[]>([]);
  const [recommendedExercises, setRecommendedExercises] = useState<string[]>([]);

  const currentSection = questionnaire.sections[currentSectionIndex];
  
  // Load saved PSFS activities if applicable
  useEffect(() => {
    if (questionnaire.id === "psfs") {
      const storedActivities = localStorage.getItem(`psfs-activities`);
      if (storedActivities) {
        try {
          const activities = JSON.parse(storedActivities);
          const updatedAnswers = { ...answers };
          activities.forEach((activity: any) => {
            if (activity.id.includes("activity")) {
              updatedAnswers[activity.id] = activity.text;
            }
          });
          setAnswers(updatedAnswers);
          setSavedActivities(activities);
        } catch (e) {
          console.error("Error parsing saved activities");
        }
      }
    }
  }, [questionnaire.id]);
  
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

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
      toast.success("Section completed!");
    } else {
      // Calculate and set results
      const results = calculateQuestionnaireScore(questionnaire, answers, savedActivities);
      setScore(results.score);
      setGroupScores(results.groupScores);
      
      if (results.savedActivities) {
        setSavedActivities(results.savedActivities);
      }
      
      if (results.recommendedExercises) {
        setRecommendedExercises(results.recommendedExercises);
      }

      setIsCompleted(true);
      toast.success("Questionnaire completed!");
      
      // Create and submit response
      const response = formatQuestionnaireResponse(questionnaire, answers, results);
      onComplete(response);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const isCurrentSectionComplete = () => {
    return isSectionComplete(currentSection.questions, answers);
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
            groupScores={groupScores}
            savedActivities={savedActivities}
            recommendedExercises={recommendedExercises}
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
              disabled={!isCurrentSectionComplete()}
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
