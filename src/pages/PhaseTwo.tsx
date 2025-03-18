
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";

const PhaseTwo = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const totalDays = 64;
  
  // Sample content for each day in Phase 2
  const dayContents = Array(totalDays).fill("").map((_, index) => {
    const day = index + 1;
    
    // Different content based on the day
    if (day === 1) {
      return `Phase 2 Day 1: Starting your routine with prescribed exercises and relaxation techniques.`;
    } else if (day % 7 === 0) {
      return `Phase 2 Day ${day}: Weekly review and assessment. Continue building on your progress.`;
    } else {
      return `Phase 2 Day ${day}: Follow your prescribed exercise plan and track your symptoms.`;
    }
  });

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <PhaseHeading title="Building your recovery foundation" />
        <div className="flex space-x-2">
          {currentDay === 1 && (
            <button 
              onClick={goToNextDay}
              className="p-2 rounded hover:bg-neutral-100"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CurrentPhaseCard 
          day={currentDay} 
          totalDays={totalDays} 
          phaseNumber={2} 
        />
        <PhaseTaskList day={currentDay} phase={2} />
        <PhaseTimeline currentPhase={2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhaseContent 
          day={currentDay} 
          content={dayContents[currentDay - 1]} 
          onNextDay={currentDay === 1 ? goToNextDay : undefined}
          onPreviousDay={undefined}
          totalDays={totalDays}
          phase={2}
        />
        <ExternalTracking />
      </div>
    </PageLayout>
  );
};

export default PhaseTwo;
