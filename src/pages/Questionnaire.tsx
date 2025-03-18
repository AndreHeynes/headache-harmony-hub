
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { hit6Questionnaire } from "@/data/questionnaires/hit6";
import { headacheTypeQuestionnaire } from "@/data/questionnaires/headache-type";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [savedResponses, setSavedResponses] = useState<Record<string, any>>({});
  
  // Get the appropriate questionnaire based on ID
  const getQuestionnaire = () => {
    switch (id) {
      case "hit-6":
        return hit6Questionnaire;
      case "headache-type":
        return headacheTypeQuestionnaire;
      default:
        return null;
    }
  };
  
  const questionnaire = getQuestionnaire();
  
  // Load any previously saved responses
  useEffect(() => {
    if (!id) return;
    
    // In a real app, you'd fetch from a database or local storage
    const savedResponse = localStorage.getItem(`questionnaire-${id}`);
    if (savedResponse) {
      try {
        const parsed = JSON.parse(savedResponse);
        const answers: Record<string, any> = {};
        
        parsed.answers.forEach((answer: any) => {
          answers[answer.questionId] = answer.value;
        });
        
        setSavedResponses(answers);
      } catch (e) {
        console.error("Error parsing saved responses");
      }
    }
  }, [id]);
  
  const handleQuestionnaireComplete = (response: QuestionnaireResponse) => {
    // Save completed response
    localStorage.setItem(`questionnaire-${id}`, JSON.stringify(response));
    
    // In a real app, you'd also send this to a server
    console.log("Questionnaire completed:", response);
    
    // Don't navigate away immediately so the user can see their result
    // The form has a button to return
  };
  
  const handleSaveProgress = (partialResponse: Partial<QuestionnaireResponse>) => {
    // Save progress
    localStorage.setItem(`questionnaire-${id}-progress`, JSON.stringify(partialResponse));
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
