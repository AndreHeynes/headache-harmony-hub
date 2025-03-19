
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ContentHeader from "./ContentHeader";
import VideoPreview from "./VideoPreview";

interface PhaseContentProps {
  day?: number;
  content?: string;
  customContent?: React.ReactNode;
  onNextDay?: () => void;
  onPreviousDay?: () => void;
  totalDays?: number;
  phase?: number;
}

const PhaseContent = ({ 
  day = 1, 
  content, 
  customContent,
  onNextDay, 
  onPreviousDay,
  totalDays = 7,
  phase = 1
}: PhaseContentProps) => {
  const dayContent = content || "Please review the description for this phase.";
  
  // For Phase 1, Day 1 - show special content with links
  const renderPhase1Day1Content = () => {
    return (
      <div className="space-y-6">
        <p className="text-neutral-600">
          Welcome to Phase 1 of your headache management program. To get started, please review the 
          Phase 1 guide and watch the introduction video.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium mb-2">Phase 1 Guide Document</h3>
            <p className="text-neutral-500 mb-3">
              This document explains how Phase 1 works and what you should expect over the next 7 days.
            </p>
            <Link to="/documents/phase-one-guide">
              <Button variant="outline" className="w-full">Read the Guide</Button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-4 hover:bg-neutral-50 transition-colors">
            <h3 className="font-medium mb-2">Introduction Video</h3>
            <p className="text-neutral-500 mb-3">
              Watch this short video for a visual walkthrough of your Phase 1 program.
            </p>
            <VideoPreview title="Phase 1 Introduction" />
          </div>
        </div>
        
        <div className="bg-neutral-100 p-4 rounded mt-4">
          <h3 className="font-medium mb-2">Getting Started</h3>
          <p className="text-neutral-600">
            After reviewing these materials, you'll be ready to begin your assessment process.
            Starting from tomorrow, you'll have access to questionnaires that will help us 
            understand your specific situation and create a personalized treatment plan.
          </p>
        </div>
      </div>
    );
  };
  
  // For Phase 2, we'll show exercise details
  const renderPhase2Content = () => {
    // This is just a template - actual content would be filled in later
    return (
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Morning Exercises</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Neck Stretches - 3 sets x 10 reps (2x daily)</li>
            <li>Shoulder Rolls - 2 sets x 15 reps (3x daily)</li>
            <li>Deep Breathing - 5 minutes (4x daily)</li>
          </ul>
        </div>
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Relaxation Techniques</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Progressive Muscle Relaxation - 15 minutes</li>
            <li>Mindfulness Meditation - 10 minutes</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Evening Routine</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Gentle Yoga - 20 minutes</li>
            <li>Sleep Hygiene Practice - 30 minutes before bed</li>
          </ul>
        </div>
      </div>
    );
  };
  
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
        {/* Special content for Phase 1, Day 1 */}
        {phase === 1 && day === 1 ? (
          renderPhase1Day1Content()
        ) : customContent ? (
          customContent
        ) : (
          <p className="text-neutral-600 mb-6">
            {dayContent}
          </p>
        )}
        
        {/* Phase 1 specific content for other days */}
        {phase === 1 && day !== 1 && day === 7 && !customContent && (
          <div className="bg-neutral-100 p-4 rounded mt-4">
            <h3 className="font-medium mb-2">Week 1 Summary</h3>
            <p className="text-neutral-600">
              Complete your final assessments and review your progress from the past week. 
              Prepare for moving to Phase 2 of your program.
            </p>
          </div>
        )}
        
        {/* Phase 2 specific content */}
        {phase === 2 && renderPhase2Content()}
        
        {/* For Phase 2, Day 64 - add a completion summary */}
        {phase === 2 && day === 64 && (
          <div className="bg-neutral-100 p-4 rounded mt-4">
            <h3 className="font-medium mb-2">Phase 2 Completion</h3>
            <p className="text-neutral-600">
              Congratulations on completing Phase 2! Review your progress over the past 9 weeks.
              Prepare for moving to Phase 3 of your program.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhaseContent;
