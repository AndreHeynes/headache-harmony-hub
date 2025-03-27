
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PhaseFourContent from "@/components/phase-four/PhaseFourContent";
import PhaseHeading from "@/components/phase/PhaseHeading";

const PhaseFour = () => {
  return (
    <PageLayout>
      <PhaseHeading title="Phase 4: Maintaining Your Gains" />
      <PhaseFourContent />
    </PageLayout>
  );
};

export default PhaseFour;
