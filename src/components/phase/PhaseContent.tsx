
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentHeader from "./ContentHeader";
import VideoPreview from "./VideoPreview";

interface PhaseContentProps {
  day?: number;
  content?: string;
  onNextDay?: () => void;
  onPreviousDay?: () => void;
  totalDays?: number;
}

const PhaseContent = ({ 
  day = 1, 
  content, 
  onNextDay, 
  onPreviousDay,
  totalDays = 7 
}: PhaseContentProps) => {
  const dayContent = content || "Please review the description of how Phase 1 functions. A guide to participating in Phase 1.";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <ContentHeader 
          title={`Day ${day} Content`} 
          onNext={onNextDay}
          onPrevious={onPreviousDay}
          canGoNext={day < totalDays}
          canGoPrevious={day > 1}
        />
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600 mb-6">
          {dayContent}
        </p>
        {day === 1 && <VideoPreview title="Phase 1 Introduction Video" />}
        {day === 7 && (
          <div className="bg-neutral-100 p-4 rounded mt-4">
            <h3 className="font-medium mb-2">Week 1 Summary</h3>
            <p className="text-neutral-600">
              Complete your final assessments and review your progress from the past week. 
              Prepare for moving to Phase 2 of your program.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhaseContent;
