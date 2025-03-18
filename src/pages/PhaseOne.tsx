
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";

const PhaseOne = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 7;
  
  const dayContents = [
    "Please review the description of how Phase 1 functions. A guide to participating in Phase 1.",
    "Please start completing the questionnaires. You can either complete them full or wait till they will be available again during the course of the week.",
    "Continue tracking your symptoms and triggers. Pay attention to patterns that may emerge.",
    "Today's focus is on understanding your personal migraine triggers and how they affect you.",
    "Review your progress so far and make note of any patterns or trends in your symptoms.",
    "Focus on identifying lifestyle factors that may be contributing to your migraines.",
    "Complete the week 1 summary and prepare for moving to the next phase of your program."
  ];

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
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
        <PhaseTaskList day={currentDay} />
        <PhaseTimeline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhaseContent day={currentDay} content={dayContents[currentDay - 1]} />
        <ExternalTracking />
      </div>
    </PageLayout>
  );
};

export default PhaseOne;
