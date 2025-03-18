
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PhaseContent = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Day 1 Content</CardTitle>
          <ArrowRight className="h-5 w-5 text-neutral-600" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600 mb-6">
          Please review the description of how Phase 1 functions. A guide to participating in Phase 1.
        </p>
        <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <Play className="h-12 w-12 text-white mb-2" />
            <p className="text-white">Phase 1 Introduction Video</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseContent;
