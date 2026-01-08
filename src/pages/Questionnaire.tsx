import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { getQuestionnaire } from "@/utils/questionnaireUtils";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { useUserStatus } from "@/hooks/useUserStatus";

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [savedResponses, setSavedResponses] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { saveResponse, getResponse } = useQuestionnaireResponses();
  const userStatus = useUserStatus();
  
  // Determine which phase we're in from URL params or user status
  const phaseParam = searchParams.get('phase');
  const currentPhase = phaseParam ? parseInt(phaseParam, 10) : userStatus.currentPhase || 1;
  
  const questionnaire = getQuestionnaire(id);
  
  useEffect(() => {
    const loadPreviousResponses = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Try to load previous response from database
        const previousResponse = await getResponse(id, currentPhase as 1 | 3);
        
        if (previousResponse) {
          const answers: Record<string, any> = {};
          previousResponse.answers.forEach((answer: any) => {
            answers[answer.questionId] = answer.value;
          });
          setSavedResponses(answers);
          toast.info("Previous responses loaded");
        }
        
        // Special handling for PSFS - load Phase 1 activities for Phase 3
        if (id === 'psfs' && currentPhase === 3) {
          const phase1Response = await getResponse('psfs', 1);
          if (phase1Response?.savedActivities) {
            const activities = phase1Response.savedActivities;
            setSavedResponses(prev => ({
              ...prev,
              'savedActivities': activities
            }));
            
            // Pre-populate activity names from Phase 1
            activities.forEach((activity: any) => {
              if (activity.id.includes("activity")) {
                setSavedResponses(prev => ({
                  ...prev,
                  [activity.id]: activity.text
                }));
              }
            });
          }
        }
      } catch (error) {
        console.error("Error loading previous responses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPreviousResponses();
  }, [id, currentPhase]);
  
  const handleQuestionnaireComplete = async (response: QuestionnaireResponse) => {
    // Save to database via hook
    await saveResponse({
      questionnaireId: id!,
      phase: currentPhase as 1 | 3,
      response,
    });
    
    console.log(`Questionnaire completed (Phase ${currentPhase}):`, response);
    
    if (id === 'gpoc') {
      const ratingAnswer = response.answers.find(a => a.questionId === 'gpoc-q1');
      const rating = ratingAnswer ? Number(ratingAnswer.value) : null;
      
      let feedbackText = "Thank you for completing the Global Impression of Change questionnaire.";
      
      if (rating !== null) {
        if (rating <= 3) {
          feedbackText += " We're glad to see you've experienced improvement!";
        } else if (rating === 4) {
          feedbackText += " We'll continue working together on your progress.";
        } else if (rating > 4) {
          feedbackText += " We'll work to improve your outcomes moving forward.";
        }
      }
      
      toast.success(feedbackText);
    } else {
      toast.success("Questionnaire completed successfully!");
    }
    
    // Navigate back to appropriate phase
    setTimeout(() => {
      if (currentPhase === 3) {
        navigate('/phase-three');
      } else {
        navigate('/phase-one');
      }
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }
  
  if (!questionnaire) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Questionnaire Not Found</h2>
          <p className="mb-8">The questionnaire you're looking for doesn't exist or is no longer available.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <QuestionnaireForm
        questionnaire={questionnaire}
        onComplete={handleQuestionnaireComplete}
        initialAnswers={savedResponses}
      />
    </PageLayout>
  );
};

export default Questionnaire;
