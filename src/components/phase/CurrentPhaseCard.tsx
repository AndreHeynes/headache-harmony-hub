
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhaseHeader from "./PhaseHeader";
import PhaseProgressBar from "./PhaseProgressBar";

interface CurrentPhaseCardProps {
  day?: number;
  totalDays?: number;
}

const CurrentPhaseCard = ({ day = 1, totalDays = 7 }: CurrentPhaseCardProps) => {
  // Calculate progress percentage based on day number
  const progressValue = (day / totalDays) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <PhaseHeader phaseNumber={1} detailsLink="/phase-one" />
        <PhaseProgressBar value={progressValue} day={day} totalDays={totalDays} />
      </CardContent>
    </Card>
  );
};

export default CurrentPhaseCard;
