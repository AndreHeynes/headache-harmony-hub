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
  
  useEffect(() => {
    if (!id) return;
    
    const savedResponse = localStorage.getItem(`questionnaire-${id}`);
    
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
    localStorage.setItem(`questionnaire-${id}`, JSON.stringify(response));
    
    if (id === 'psfs' && response.savedActivities) {
      localStorage.setItem('psfs-activities', JSON.stringify(response.savedActivities));
    }
    
    window.dispatchEvent(new Event('storage'));
    
    console.log("Questionnaire completed:", response);
    
    if (id === 'gpoc') {
      const ratingAnswer = response.answers.find(a => a.questionId === 'gpoc-q1');
      const rating = ratingAnswer ? Number(ratingAnswer.value) : null;
      
      let feedbackText = "Thank you for completing the Global Impression of Change questionnaire.";
      
      if (rating !== null) {
        if (rating <= 3) {
          feedbackText += " We'll work to improve your outcomes moving forward.";
        } else if (rating === 4) {
          feedbackText += " We'll continue working together on your progress.";
        } else if (rating > 4) {
          feedbackText += " We're glad to see you've experienced improvement!";
        }
      }
      
      toast.success(feedbackText);
    } else {
      toast.success("Questionnaire completed successfully!");
    }
    
    setTimeout(() => {
      navigate('/phase-three');
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
