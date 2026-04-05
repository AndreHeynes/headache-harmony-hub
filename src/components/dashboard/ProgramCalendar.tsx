
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgramCalendar = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Program Calendar</CardTitle>
        <p className="text-xs text-muted-foreground italic">Coming soon — dates will update based on your progress</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Start: Phase 1, Day 1</span>
            <span className="text-muted-foreground">—</span>
          </div>
          <Progress value={0} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>Current: —</span>
            <span className="text-muted-foreground">—</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>End: Phase 4</span>
            <span className="text-muted-foreground">—</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCalendar;
