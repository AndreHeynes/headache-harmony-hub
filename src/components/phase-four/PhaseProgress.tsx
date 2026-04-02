
import React from "react";
import { cn } from "@/lib/utils";

interface PhaseProgressProps {
  activeDaysCount: number;
  goalsCount: number;
  exercisesCount: number;
}

const PhaseProgress: React.FC<PhaseProgressProps> = ({ activeDaysCount, goalsCount, exercisesCount }) => {
  const steps = [
    { num: 1, name: "Goal Setting", desc: "Define SMART goals", done: goalsCount > 0 },
    { num: 2, name: "Exercise Selection", desc: "Choose your exercises", done: exercisesCount > 0 },
    { num: 3, name: "Customize", desc: "Set schedule & reps", done: activeDaysCount >= 4 },
    { num: 4, name: "Review", desc: "Finalize program", done: goalsCount > 0 && exercisesCount > 0 && activeDaysCount >= 4 },
  ];

  const completedSteps = steps.filter(s => s.done).length;
  const progressPercent = (completedSteps / steps.length) * 100;

  return (
    <div className="fixed top-20 w-full bg-card border-b border-border z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 overflow-x-auto">
            {steps.map(step => (
              <div key={step.num} className={cn("flex items-center", !step.done && "opacity-50")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  step.done ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                  {step.num}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="font-medium text-sm text-foreground">{step.name}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center shrink-0">
            <span className="text-sm text-muted-foreground mr-3">Progress</span>
            <div className="w-32 md:w-48 h-2 bg-secondary rounded-full">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseProgress;
