
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { getQuestionnaire } from "@/utils/questionnaireUtils";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [savedResponses, setSavedResponses] = useState<Record<string, any>>({});
  
  const questionnaire = getQuestionnaire(id);
  
  // Load any previously saved responses
  useEffect(() => {
    if (!id) return;
    
    // In a real app, you'd fetch from a database or local storage
    const savedResponse = localStorage.getItem(`questionnaire-${id}`);
    
    // Special handling for PSFS in Phase 3 - load activities from Phase 1
    if (id === 'psfs') {
      const savedActivities = localStorage.getItem('psfs-activities');
      if (savedActivities) {
        try {
          const activities = JSON.parse(savedActivities);
          setSavedResponses(prev => ({
            ...prev,
            'savedActivities': activities
          }));
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
  }, [id]);
  
  const handleQuestionnaireComplete = (response: QuestionnaireResponse) => {
    // Save completed response
    localStorage.setItem(`questionnaire-${id}`, JSON.stringify(response));
    
    // For PSFS, save activities separately for reuse in Phase 3
    if (id === 'psfs' && response.savedActivities) {
      localStorage.setItem('psfs-activities', JSON.stringify(response.savedActivities));
    }
    
    // Dispatch a storage event so other tabs can be notified
    window.dispatchEvent(new Event('storage'));
    
    console.log("Questionnaire completed:", response);
    
    // Show success message
    if (id === 'gpoc') {
      const ratingAnswer = response.answers.find(a => a.questionId === 'gpoc-q1');
      const rating = ratingAnswer ? Number(ratingAnswer.value) : null;
      
      let feedbackText = "Thank you for completing the Global Perception of Change questionnaire.";
      
      // Add specific feedback based on rating only if it's a valid number
      if (rating !== null) {
        if (rating <= 3) {
          feedbackText += " We're glad to see you've experienced improvement!";
        } else if (rating === 4) {
          feedbackText += " We'll continue working together on your progress.";
        } else if (rating > 4) {
          feedbackText += " We'll adjust your plan to better address your needs.";
        }
      }
      
      toast.success(feedbackText);
    } else {
      toast.success("Questionnaire completed successfully!");
    }
    
    // Navigate back to Phase 3
    setTimeout(() => {
      navigate('/phase-three');
    }, 2000);
  };
  
  const handleSaveProgress = (partialResponse: Partial<QuestionnaireResponse>) => {
    // Save progress
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
