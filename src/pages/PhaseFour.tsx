
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
          
          {/* Navigation Buttons - Previous button removed as requested */}
          <div className="flex justify-end items-center mb-8">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center">
              Complete Program
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-2"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default PhaseFour;
