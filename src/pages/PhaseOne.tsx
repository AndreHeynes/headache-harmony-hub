
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";

const PhaseOne = () => {
  return (
    <PageLayout>
      <h1 className="text-3xl mb-8 text-neutral-900">Understanding where you are starting from</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CurrentPhaseCard />
        <PhaseTaskList />
        <PhaseTimeline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhaseContent />
        <ExternalTracking />
      </div>
    </PageLayout>
  );
};

export default PhaseOne;
