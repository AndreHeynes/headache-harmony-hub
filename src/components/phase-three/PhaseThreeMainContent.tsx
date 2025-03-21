
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhaseThreeContent from "@/components/phase-three/PhaseThreeContent";
import PhaseThreeNavigation from "@/components/phase-three/PhaseThreeNavigation";
import HeadacheAnalysis from "@/components/phase/HeadacheAnalysis";
import ExternalTracking from "@/components/phase/ExternalTracking";

interface PhaseThreeMainContentProps {
  currentDay: number;
  totalDays: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PhaseThreeMainContent: React.FC<PhaseThreeMainContentProps> = ({
  currentDay,
  totalDays,
  onPrevious,
  onNext
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2 flex justify-between items-center">
          <CardTitle className="text-lg">Day {currentDay} Content</CardTitle>
          <PhaseThreeNavigation 
            currentDay={currentDay}
            totalDays={totalDays}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </CardHeader>
        <CardContent>
          <PhaseThreeContent day={currentDay} />
        </CardContent>
      </Card>
      
      {/* Only show headache analysis for day 8, otherwise show the normal external tracking */}
      {currentDay === 8 ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Headache Progress Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <HeadacheAnalysis isConnected={true} showInPhaseThree={true} />
          </CardContent>
        </Card>
      ) : (
        <ExternalTracking phase={3} />
      )}
    </div>
  );
};

export default PhaseThreeMainContent;
