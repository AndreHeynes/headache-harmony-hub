
import React from "react";
import { ChartLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExternalTracking = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">External Headache Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center h-[200px]">
          <div className="text-center">
            <ChartLine className="h-12 w-12 text-white mb-2" />
            <p className="text-white">Connect Your External Tracking App</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalTracking;
