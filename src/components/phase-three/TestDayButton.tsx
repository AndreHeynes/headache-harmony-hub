
import React from "react";
import { Button } from "@/components/ui/button";

interface TestDayButtonProps {
  onClick: () => void;
  phase?: number;
  day?: number;
}

const TestDayButton: React.FC<TestDayButtonProps> = ({ 
  onClick, 
  phase = 3, 
  day = 8 
}) => {
  return (
    <Button 
      onClick={onClick}
      variant="secondary"
      size="sm"
      className="ml-auto"
    >
      Test Day {day}
    </Button>
  );
};

export default TestDayButton;
