
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineItem from "./TimelineItem";

const PhaseTimeline = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Program Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TimelineItem 
            phase="Phase 1: Week 1" 
            status="Current" 
            isCurrent={true} 
          />
          <TimelineItem 
            phase="Phase 2: Weeks 2-10" 
            status="Not Started" 
          />
          <TimelineItem 
            phase="Phase 3: Week 11" 
            status="Not Started" 
          />
          <TimelineItem 
            phase="Phase 4: Weeks 12+" 
            status="Not Started" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTimeline;
