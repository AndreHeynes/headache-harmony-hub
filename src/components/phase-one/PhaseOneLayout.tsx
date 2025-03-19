
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";
import { useToast } from "@/hooks/use-toast";

interface PhaseOneLayoutProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  totalDays: number;
  completedQuestionnaires: Record<string, boolean>;
  questionnaireResults: Record<string, any>;
  renderDayContent: (day: number) => React.ReactNode | string;
}

const PhaseOneLayout: React.FC<PhaseOneLayoutProps> = ({
  currentDay,
  setCurrentDay,
  totalDays,
  completedQuestionnaires,
  questionnaireResults,
  renderDayContent
}) => {
  const { toast } = useToast();
  
  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
      
      if (currentDay === 6) {
        toast({
          title: "Phase 1 Completion",
          description: "You've reached the final day of Phase 1. Review your assessment results and prepare for Phase 2.",
        });
      }
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <PhaseHeading title="Understanding where you are starting from" />
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousDay}
            disabled={currentDay === 1}
            className="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={goToNextDay}
            disabled={currentDay === totalDays}
            className="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CurrentPhaseCard day={currentDay} totalDays={totalDays} />
        <PhaseTaskList 
          day={currentDay} 
          completedQuestionnaires={completedQuestionnaires}
        />
        <PhaseTimeline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhaseContent 
          day={currentDay} 
          content={typeof renderDayContent(currentDay) === 'string' 
            ? renderDayContent(currentDay) as string
            : undefined}
          customContent={typeof renderDayContent(currentDay) !== 'string' 
            ? renderDayContent(currentDay) 
            : undefined}
          onNextDay={goToNextDay}
          onPreviousDay={goToPreviousDay}
          totalDays={totalDays}
        />
        <ExternalTracking />
      </div>
    </PageLayout>
  );
};

export default PhaseOneLayout;
