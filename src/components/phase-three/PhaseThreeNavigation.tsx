
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhaseThreeNavigationProps {
  currentDay: number;
  totalDays: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PhaseThreeNavigation: React.FC<PhaseThreeNavigationProps> = ({
  currentDay,
  totalDays,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        onClick={onPrevious}
        disabled={currentDay === 1}
        variant="outline"
        size="sm"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <Button 
        onClick={onNext}
        disabled={currentDay === totalDays}
        variant="outline"
        size="sm"
      >
        Next
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default PhaseThreeNavigation;
