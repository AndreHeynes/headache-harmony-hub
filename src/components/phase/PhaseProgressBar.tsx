
import React from "react";
import { Progress } from "@/components/ui/progress";

interface PhaseProgressBarProps {
  value: number;
  day: number;
  totalDays: number;
}

const PhaseProgressBar = ({ value, day, totalDays }: PhaseProgressBarProps) => {
  return (
    <>
      <Progress value={value} className="h-2 mb-2" />
      <p className="text-neutral-600">Day {day} of {totalDays}</p>
    </>
  );
};

export default PhaseProgressBar;
