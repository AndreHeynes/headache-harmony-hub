
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PSCInterpretationProps {
  groupScores: Record<string, number | string>;
}

const PSCInterpretation: React.FC<PSCInterpretationProps> = ({ groupScores }) => {
  // Convert the scores to determine the pain change stage
  const precontemplationScore = Number(groupScores['precontemplation'] || 0);
  const contemplationScore = Number(groupScores['contemplation'] || 0);
  const actionScore = Number(groupScores['action'] || 0);
  const maintenanceScore = Number(groupScores['maintenance'] || 0);
  
  // Determine dominant stage
  let dominantStage = "Unknown";
  let dominantScore = 0;
  
  if (precontemplationScore > dominantScore) {
    dominantStage = "Precontemplation";
    dominantScore = precontemplationScore;
  }
  
  if (contemplationScore > dominantScore) {
    dominantStage = "Contemplation";
    dominantScore = contemplationScore;
  }
  
  if (actionScore > dominantScore) {
    dominantStage = "Preparation/Action";
    dominantScore = actionScore;
  }
  
  if (maintenanceScore > dominantScore) {
    dominantStage = "Maintenance";
    dominantScore = maintenanceScore;
  }
  
  const getStageDescription = (stage: string) => {
    switch (stage) {
      case "Precontemplation":
        return "You may not be ready to make changes yet. At this stage, individuals typically don't recognize their pain management approach needs to change.";
      case "Contemplation":
        return "You're thinking about making changes to how you manage your pain. This is an important step toward taking action.";
      case "Preparation/Action":
        return "You're preparing for or actively making changes to better manage your pain. You're developing strategies that work for you.";
      case "Maintenance":
        return "You're working to maintain the positive changes you've already made in your pain management approach.";
      default:
        return "We couldn't determine your current stage clearly.";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">Pain Stages of Change Results</h3>
        <p className="text-neutral-600 mt-2">
          Based on your responses, you appear to be in the following stage:
        </p>
      </div>
      
      <Card className="border-l-4" style={{ borderLeftColor: "#3b82f6" }}>
        <CardContent className="pt-6">
          <h4 className="text-lg font-medium mb-2">{dominantStage} Stage</h4>
          <p className="text-neutral-600">{getStageDescription(dominantStage)}</p>
        </CardContent>
      </Card>
      
      <div className="bg-neutral-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">What This Means For Your Program</h4>
        <p className="text-neutral-600">
          Your current stage helps us tailor recommendations and exercises that are most appropriate 
          for where you are in your pain management journey. We'll provide resources that match your 
          readiness to change and adopt new pain management strategies.
        </p>
      </div>
      
      <div className="text-sm text-neutral-500 mt-2">
        <p>Keep in mind that stages can change over time as you progress through your program.</p>
      </div>
    </div>
  );
};

export default PSCInterpretation;
