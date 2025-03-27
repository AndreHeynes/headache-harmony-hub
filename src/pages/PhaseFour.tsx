
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseHeader from "@/components/phase-four/PhaseHeader";
import PhaseProgress from "@/components/phase-four/PhaseProgress";
import GoalSettingSection from "@/components/phase-four/GoalSettingSection";
import ExerciseLibrary from "@/components/phase-four/ExerciseLibrary";
import ProgramBuilder from "@/components/phase-four/ProgramBuilder";

const PhaseFour = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <PhaseHeader />
        <PhaseProgress />
        
        <main className="container mx-auto px-4 pt-40 pb-20">
          <GoalSettingSection />
          <ExerciseLibrary />
          <ProgramBuilder />
        </main>
      </div>
    </PageLayout>
  );
};

export default PhaseFour;
