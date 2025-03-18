
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { hit6Questionnaire } from "@/data/questionnaires/hit6";
import { fhtQuestionnaire } from "@/data/questionnaires/fht";
import { midasQuestionnaire } from "@/data/questionnaires/midas";
import { hsesQuestionnaire } from "@/data/questionnaires/hses";
import { psfsQuestionnaire } from "@/data/questionnaires/psfs";
import { hslocQuestionnaire } from "@/data/questionnaires/hsloc";
import { hbQuestionnaire } from "@/data/questionnaires/hb";
import { pscQuestionnaire } from "@/data/questionnaires/psc";
import { mkqQuestionnaire } from "@/data/questionnaires/mkq";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Questionnaire = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [savedResponses, setSavedResponses] = useState<Record<string, any>>({});
  
  // Get the appropriate questionnaire based on ID
  const getQuestionnaire = () => {
    switch (id) {
      case "hit-6":
        return hit6Questionnaire;
      case "fht":
        return fhtQuestionnaire;
      case "midas":
        return midasQuestionnaire;
      case "hses":
        return hsesQuestionnaire;
      case "psfs":
        return psfsQuestionnaire;
      case "hsloc":
        return hslocQuestionnaire;
      case "hb":
        return hbQuestionnaire;
      case "psc":
        return pscQuestionnaire;
      case "mkq":
        return mkqQuestionnaire;
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
    
    console.log("Questionnaire completed:", response);
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
