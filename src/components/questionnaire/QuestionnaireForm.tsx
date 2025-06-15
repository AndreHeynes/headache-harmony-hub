
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
import { secureRetrieve, secureStore, sanitizeInput } from "@/utils/security/encryption";

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
      const loadActivities = async () => {
        try {
          const storedActivities = await secureRetrieve(`psfs-activities`);
          if (storedActivities) {
            const activities = storedActivities;
            const updatedAnswers = { ...answers };
            activities.forEach((activity: any) => {
              if (activity.id.includes("activity")) {
                updatedAnswers[activity.id] = activity.text;
              }
            });
            setAnswers(updatedAnswers);
            setSavedActivities(activities);
          }
        } catch (e) {
          console.error("Error parsing saved activities");
        }
      };
      
      loadActivities();
    }
  }, [questionnaire.id]);
  
  const handleAnswerChange = (questionId: string, value: any) => {
    // If value is a string, sanitize it before storing
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    
    setAnswers((prev) => ({
      ...prev,
      [questionId]: sanitizedValue,
    }));
  };

  const handleNext = () => {
    // Save progress if handler provided
    if (onSaveProgress) {
      const sanitizedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value: typeof value === 'string' ? sanitizeInput(value) : value,
      }));
      
      onSaveProgress({
        questionnaireId: questionnaire.id,
        date: new Date().toISOString(),
        answers: sanitizedAnswers,
      });
      
      // Also securely store the progress
      secureStore(`questionnaire-${questionnaire.id}-progress`, {
        sectionIndex: currentSectionIndex,
        answers: sanitizedAnswers
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
        secureStore(`psfs-activities`, results.savedActivities);
      }
      
      if (results.recommendedExercises) {
        setRecommendedExercises(results.recommendedExercises);
      }

      setIsCompleted(true);
      toast.success("Questionnaire completed!");
      
      // Create and submit response
      const response = formatQuestionnaireResponse(questionnaire, answers, results);
      
      // Store completed questionnaire securely
      secureStore(`questionnaire-${questionnaire.id}`, response);
      
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
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full">
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
        </div>
        
        {/* Attribution section */}
        {questionnaire.attribution && (
          <div className="w-full mt-4 text-xs text-neutral-500 italic text-center">
            {questionnaire.attribution}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionnaireForm;
