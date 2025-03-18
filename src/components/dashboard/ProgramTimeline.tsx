
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProgramTimeline = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Program Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>
              <Link to="/phase-one" className="hover:underline flex items-center">
                Phase 1: Week 1
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </span>
            <Badge className="bg-neutral-800 hover:bg-neutral-700">Completed</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Phase 2: Weeks 2-10</span>
            <Badge className="bg-neutral-600 hover:bg-neutral-500">In Progress</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Phase 3: Week 11</span>
            <Badge variant="outline" className="text-neutral-700">Not Started</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Phase 4: Weeks 12+</span>
            <Badge variant="outline" className="text-neutral-700">Not Started</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramTimeline;
