
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PhaseTimeline = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Program Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Phase 1: Week 1</span>
            <Badge className="bg-neutral-800 hover:bg-neutral-700">Current</Badge>
          </li>
          <li className="flex justify-between items-center text-neutral-500">
            <span>Phase 2: Weeks 2-10</span>
            <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
          </li>
          <li className="flex justify-between items-center text-neutral-500">
            <span>Phase 3: Week 11</span>
            <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
          </li>
          <li className="flex justify-between items-center text-neutral-500">
            <span>Phase 4: Week 12+</span>
            <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PhaseTimeline;
