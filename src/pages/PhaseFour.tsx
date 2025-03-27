
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseHeader from "@/components/phase-four/PhaseHeader";
import PhaseProgress from "@/components/phase-four/PhaseProgress";
import GoalSettingSection from "@/components/phase-four/GoalSettingSection";
import ExerciseLibrary from "@/components/phase-four/ExerciseLibrary";
import ProgramBuilder from "@/components/phase-four/ProgramBuilder";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const PhaseFour = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <PhaseHeader />
        <PhaseProgress />
        <GoalSettingSection />
        <ExerciseLibrary />
        <ProgramBuilder />
        
        {/* Floating Help Button */}
        <div className="fixed bottom-24 right-6">
          <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PhaseFour;
