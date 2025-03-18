
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentHeader from "./ContentHeader";
import VideoPreview from "./VideoPreview";

const PhaseContent = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <ContentHeader title="Day 1 Content" />
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600 mb-6">
          Please review the description of how Phase 1 functions. A guide to participating in Phase 1.
        </p>
        <VideoPreview title="Phase 1 Introduction Video" />
      </CardContent>
    </Card>
  );
};

export default PhaseContent;
