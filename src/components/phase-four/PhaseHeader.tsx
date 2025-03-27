
import React from "react";
import { Brain } from "lucide-react";

const PhaseHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Phase 4: Maintaining Your Gains</h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-sm">
          Program Access: 59 days left
        </span>
      </div>
    </div>
  );
};

export default PhaseHeader;
