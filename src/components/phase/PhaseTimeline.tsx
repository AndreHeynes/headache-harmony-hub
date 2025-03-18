
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineItem from "./TimelineItem";

interface PhaseTimelineProps {
  currentPhase?: number;
}

const PhaseTimeline = ({ currentPhase = 1 }: PhaseTimelineProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Program Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TimelineItem 
            phase="Phase 1: Week 1" 
            status={currentPhase > 1 ? "Completed" : currentPhase === 1 ? "Current" : "Not Started"} 
            isCurrent={currentPhase === 1} 
          />
          <TimelineItem 
            phase="Phase 2: Weeks 2-10" 
            status={currentPhase > 2 ? "Completed" : currentPhase === 2 ? "Current" : "Not Started"} 
            isCurrent={currentPhase === 2} 
          />
          <TimelineItem 
            phase="Phase 3: Week 11" 
            status={currentPhase > 3 ? "Completed" : currentPhase === 3 ? "Current" : "Not Started"} 
            isCurrent={currentPhase === 3} 
          />
          <TimelineItem 
            phase="Phase 4: Weeks 12+" 
            status={currentPhase > 4 ? "Completed" : currentPhase === 4 ? "Current" : "Not Started"} 
            isCurrent={currentPhase === 4} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTimeline;
