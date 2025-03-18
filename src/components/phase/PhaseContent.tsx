
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentHeader from "./ContentHeader";
import VideoPreview from "./VideoPreview";

interface PhaseContentProps {
  day?: number;
  content?: string;
}

const PhaseContent = ({ day = 1, content }: PhaseContentProps) => {
  const dayContent = content || "Please review the description of how Phase 1 functions. A guide to participating in Phase 1.";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <ContentHeader title={`Day ${day} Content`} />
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600 mb-6">
          {dayContent}
        </p>
        {day === 1 && <VideoPreview title="Phase 1 Introduction Video" />}
      </CardContent>
    </Card>
  );
};

export default PhaseContent;
