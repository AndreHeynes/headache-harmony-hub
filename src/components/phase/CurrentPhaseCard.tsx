
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurrentPhaseCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Phase 1</span>
          <Link to="/phase-one" className="text-neutral-600 hover:text-neutral-900 flex items-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <Progress value={15} className="h-2 mb-2" />
        <p className="text-neutral-600">Day 1 of 7</p>
      </CardContent>
    </Card>
  );
};

export default CurrentPhaseCard;
