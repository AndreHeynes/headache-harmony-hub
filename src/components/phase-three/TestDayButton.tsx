
import React from "react";
import { Button } from "@/components/ui/button";

interface TestDayButtonProps {
  onClick: () => void;
}

const TestDayButton: React.FC<TestDayButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      variant="secondary"
      size="sm"
      className="ml-auto"
    >
      Test Day 8
    </Button>
  );
};

export default TestDayButton;
