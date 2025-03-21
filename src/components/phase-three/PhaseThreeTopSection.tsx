
import React from "react";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseThreeTaskList from "@/components/phase-three/PhaseThreeTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";

interface PhaseThreeTopSectionProps {
  currentDay: number;
  totalDays: number;
}

const PhaseThreeTopSection: React.FC<PhaseThreeTopSectionProps> = ({
  currentDay,
  totalDays
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <CurrentPhaseCard 
        day={currentDay} 
        totalDays={totalDays} 
        phaseNumber={3} 
      />
      <PhaseThreeTaskList day={currentDay} />
      <PhaseTimeline currentPhase={3} />
    </div>
  );
};

export default PhaseThreeTopSection;
