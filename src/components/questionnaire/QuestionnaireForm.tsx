import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Questionnaire, QuestionnaireResponse } from "@/types/questionnaire";
import QuestionnaireSection from "./QuestionnaireSection";
import QuestionnaireProgress from "./QuestionnaireProgress";
import QuestionnaireInterpretation from "./QuestionnaireInterpretation";
import { toast } from "sonner";

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

  const isSectionComplete = () => {
    const requiredQuestions = currentSection.questions.filter(
      (q) => q.required && q.type !== 'heading' && q.type !== 'info'
    );
    
    return requiredQuestions.every((q) => {
      const answer = answers[q.id];
      return answer !== undefined && answer !== "" && answer !== null;
    });
  };

  const calculateScore = () => {
    let calculatedScore: number | null = null;
    let calculatedGroupScores: Record<string, number | string> = {};
    let calculatedRecommendedExercises: string[] = [];
    
    if (!questionnaire.scoring) {
      calculatedScore = Object.entries(answers).reduce((total, [questionId, val]) => {
        if (typeof val === 'number') {
          return total + val;
        }
        return total;
      }, 0);
    } else if (questionnaire.scoring.type === 'sum') {
      calculatedScore = 0;
      
      if (questionnaire.scoring.groups) {
        questionnaire.scoring.groups.forEach(group => {
          const groupScore = group.items.reduce((total, questionId) => {
            const val = answers[questionId];
            if (typeof val === 'number') {
              return total + val;
            }
            return total;
          }, 0);
          
          calculatedGroupScores[group.id] = groupScore;
          
          if (group.id === 'midas_total' || group.id === 'hses_total') {
            calculatedScore = groupScore;
          }
        });
      }
    } else if (questionnaire.scoring.type === 'custom') {
      if (questionnaire.id === 'hsloc') {
        const internalItems = questionnaire.scoring.groups?.find(g => g.id === 'internal')?.items || [];
        const healthcareItems = questionnaire.scoring.groups?.find(g => g.id === 'healthcare')?.items || [];
        const chanceItems = questionnaire.scoring.groups?.find(g => g.id === 'chance')?.items || [];
        
        const internalScore = internalItems.reduce((total, questionId) => {
          return total + (answers[questionId] || 0);
        }, 0);
        
        const healthcareScore = healthcareItems.reduce((total, questionId) => {
          return total + (answers[questionId] || 0);
        }, 0);
        
        const chanceScore = chanceItems.reduce((total, questionId) => {
          return total + (answers[questionId] || 0);
        }, 0);
        
        calculatedGroupScores['internal'] = internalScore;
        calculatedGroupScores['healthcare'] = healthcareScore;
        calculatedGroupScores['chance'] = chanceScore;
        
        let dominant = 'internal';
        let dominantScore = internalScore;
        
        if (healthcareScore > dominantScore) {
          dominant = 'healthcare';
          dominantScore = healthcareScore;
        }
        
        if (chanceScore > dominantScore) {
          dominant = 'chance';
        }
        
        calculatedScore = 0;
        calculatedGroupScores['dominant'] = dominant;
      } else if (questionnaire.id === 'psfs') {
        const activities = [];
        
        if (answers['psfs-activity1']) {
          activities.push({
            id: 'psfs-activity1',
            text: answers['psfs-activity1'],
            rating: Number(answers['psfs-rating1']) || 0
          });
        }
        
        if (answers['psfs-activity2']) {
          activities.push({
            id: 'psfs-activity2',
            text: answers['psfs-activity2'],
            rating: Number(answers['psfs-rating2']) || 0
          });
        }
        
        if (answers['psfs-activity3']) {
          activities.push({
            id: 'psfs-activity3',
            text: answers['psfs-activity3'],
            rating: Number(answers['psfs-rating3']) || 0
          });
        }
        
        localStorage.setItem(`psfs-activities`, JSON.stringify(activities));
        setSavedActivities(activities);
        
        if (activities.length > 0) {
          const sum = activities.reduce((total, activity) => total + activity.rating, 0);
          calculatedScore = Math.round((sum / activities.length) * 10) / 10;
        }
      }
    }
    
    if (questionnaire.id === 'fht' && questionnaire.recommendedExercises) {
      const selectedTypes = answers['headache-types'] || [];
      if (Array.isArray(selectedTypes)) {
        const exercises = new Set<string>();
        selectedTypes.forEach(type => {
          const typeExercises = questionnaire.recommendedExercises?.typeMap[type] || [];
          typeExercises.forEach(ex => exercises.add(ex));
        });
        calculatedRecommendedExercises = Array.from(exercises);
      }
    }

    return {
      score: calculatedScore,
      groupScores: calculatedGroupScores,
      savedActivities: questionnaire.id === 'psfs' ? savedActivities : undefined,
      recommendedExercises: calculatedRecommendedExercises
    };
  };

  const handleNext = () => {
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
      const results = calculateScore();
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
      
      const response: QuestionnaireResponse = {
        questionnaireId: questionnaire.id,
        date: new Date().toISOString(),
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
        score: results.score || undefined,
        groupScores: Object.keys(results.groupScores).length > 0 ? results.groupScores as Record<string, number> : undefined,
        savedActivities: results.savedActivities,
        recommendedExercises: results.recommendedExercises.length > 0 ? results.recommendedExercises : undefined
      };
      
      onComplete(response);
    }
  };

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
            groupScores={groupScores as Record<string, number>}
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
