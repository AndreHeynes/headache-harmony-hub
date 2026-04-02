
import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PhaseHeader = () => {
  return (
    <div className="fixed w-full bg-card border-b border-border z-50 top-0 left-0">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Maintain Your Gains!</h1>
        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help
        </Button>
      </div>
    </div>
  );
};

export default PhaseHeader;
