
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhaseHeader from "./PhaseHeader";
import PhaseProgressBar from "./PhaseProgressBar";

interface CurrentPhaseCardProps {
  day?: number;
  totalDays?: number;
  phaseNumber?: number;
}

const CurrentPhaseCard = ({ 
  day = 1, 
  totalDays = 7,
  phaseNumber = 1
}: CurrentPhaseCardProps) => {
  // Calculate progress percentage based on day number
  const progressValue = (day / totalDays) * 100;
  
  // Determine details link based on phase number
  const detailsLink = phaseNumber === 1 ? "/phase-one" : 
                     phaseNumber === 2 ? "/phase-two" :
                     phaseNumber === 3 ? "/phase-three" : "/phase-four";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <PhaseHeader phaseNumber={phaseNumber} detailsLink={detailsLink} />
        <PhaseProgressBar value={progressValue} day={day} totalDays={totalDays} />
      </CardContent>
    </Card>
  );
};

export default CurrentPhaseCard;
