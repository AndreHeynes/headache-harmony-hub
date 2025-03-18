
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PhaseHeaderProps {
  phaseNumber: number;
  detailsLink: string;
}

const PhaseHeader = ({ phaseNumber, detailsLink }: PhaseHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-lg">Phase {phaseNumber}</span>
      <Link to={detailsLink} className="text-neutral-600 hover:text-neutral-900 flex items-center">
        View Details
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default PhaseHeader;
