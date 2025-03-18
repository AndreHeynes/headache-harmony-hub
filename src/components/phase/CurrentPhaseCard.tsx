
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhaseHeader from "./PhaseHeader";
import PhaseProgressBar from "./PhaseProgressBar";

const CurrentPhaseCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <PhaseHeader phaseNumber={1} detailsLink="/phase-one" />
        <PhaseProgressBar value={15} day={1} totalDays={7} />
      </CardContent>
    </Card>
  );
};

export default CurrentPhaseCard;
