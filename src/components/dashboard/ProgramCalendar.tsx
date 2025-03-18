
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgramCalendar = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Program Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Start: Phase 1, Day 1</span>
            <span className="text-neutral-500">Jan 1, 2025</span>
          </div>
          <Progress value={45} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>Current: Phase 2, Day 14</span>
            <span className="text-neutral-500">Feb 15, 2025</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>End: Phase 4, Day 7</span>
            <span className="text-neutral-500">Apr 1, 2025</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCalendar;
