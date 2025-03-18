
import React from "react";

interface PhaseHeadingProps {
  title: string;
}

const PhaseHeading = ({ title }: PhaseHeadingProps) => {
  return (
    <h1 className="text-3xl mb-8 text-neutral-900">{title}</h1>
  );
};

export default PhaseHeading;
