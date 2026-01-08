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

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [savedResponses, setSavedResponses] = useState<Record<string, any>>({});
  const { saveResponse, getResponse } = useQuestionnaireResponses();
  
  // Determine which phase we're in from URL params or localStorage
  const phaseParam = searchParams.get('phase');
  const currentPhase = phaseParam ? parseInt(phaseParam, 10) : 
    (parseInt(localStorage.getItem('current-phase') || '1', 10));
  
  const questionnaire = getQuestionnaire(id);
  
  useEffect(() => {
    if (!id) return;
    
    // Build the storage key based on current phase
    const phasePrefix = currentPhase === 3 ? 'phase3' : 'phase1';
    const phaseKey = `questionnaire-${phasePrefix}-${id}`;
    const legacyKey = `questionnaire-${id}`;
    
    // Load any previous responses for this questionnaire
    // First try phase-specific key, then fall back to legacy
    const savedResponse = localStorage.getItem(phaseKey) || 
      (currentPhase === 1 ? localStorage.getItem(legacyKey) : null);
    
    // Special handling for PSFS activities
    if (id === 'psfs') {
      // In Phase 3, load Phase 1 activities to pre-populate activity names
      const phase1ActivitiesKey = 'psfs-activities-phase1';
      const legacyActivitiesKey = 'psfs-activities';
      const savedActivities = localStorage.getItem(phase1ActivitiesKey) || 
        localStorage.getItem(legacyActivitiesKey);
      
      if (savedActivities) {
        try {
          const activities = JSON.parse(savedActivities);
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
        } catch (e) {
          console.error("Error parsing saved PSFS activities");
        }
      }
    }
    
    if (savedResponse) {
      try {
        const parsed = JSON.parse(savedResponse);
        const answers: Record<string, any> = {};
        
        parsed.answers.forEach((answer: any) => {
          answers[answer.questionId] = answer.value;
        });
        
        setSavedResponses(prev => ({
          ...prev,
          ...answers
        }));
        
        toast.info("Previous responses loaded");
      } catch (e) {
        console.error("Error parsing saved responses");
      }
    }
  }, [id, currentPhase]);
  
  const handleQuestionnaireComplete = async (response: QuestionnaireResponse) => {
    // Save to database via hook (will also save to localStorage as fallback)
    await saveResponse({
      questionnaireId: id!,
      phase: currentPhase as 1 | 3,
      response,
    });
    
    // Also store in legacy key for backward compatibility during transition
    localStorage.setItem(`questionnaire-${id}`, JSON.stringify(response));
    
    if (id === 'psfs' && response.savedActivities) {
      const activitiesKey = `psfs-activities-phase${currentPhase}`;
      localStorage.setItem(activitiesKey, JSON.stringify(response.savedActivities));
      localStorage.setItem('psfs-activities', JSON.stringify(response.savedActivities));
    }
    
    window.dispatchEvent(new Event('storage'));
    
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
  
  const handleSaveProgress = (partialResponse: Partial<QuestionnaireResponse>) => {
    localStorage.setItem(`questionnaire-${id}-progress`, JSON.stringify(partialResponse));
    toast.success("Progress saved");
  };
  
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
        onSaveProgress={handleSaveProgress}
        initialAnswers={savedResponses}
      />
    </PageLayout>
  );
};

export default Questionnaire;
