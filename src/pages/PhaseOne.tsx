
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import CurrentPhaseCard from "@/components/phase/CurrentPhaseCard";
import PhaseTaskList from "@/components/phase/PhaseTaskList";
import PhaseTimeline from "@/components/phase/PhaseTimeline";
import PhaseContent from "@/components/phase/PhaseContent";
import ExternalTracking from "@/components/phase/ExternalTracking";
import PhaseHeading from "@/components/phase/PhaseHeading";

const PhaseOne = () => {
  return (
    <PageLayout>
      <PhaseHeading title="Understanding where you are starting from" />
      
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
