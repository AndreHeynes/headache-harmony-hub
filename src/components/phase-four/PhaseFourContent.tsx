
import React from "react";
import GoalSetting from "./GoalSetting";
import ExerciseLibrary from "./ExerciseLibrary";
import ProgramBuilder from "./ProgramBuilder";
import PhaseHeader from "@/components/phase-four/PhaseHeader";

const PhaseFourContent = () => {
  return (
    <div className="space-y-6">
      <PhaseHeader />
      <GoalSetting />
      <ExerciseLibrary />
      <ProgramBuilder />
      <HelpButton />
    </div>
  );
};

const HelpButton = () => {
  return (
    <div className="fixed right-4 bottom-20">
      <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};

export default PhaseFourContent;
