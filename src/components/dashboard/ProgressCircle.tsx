
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressCircle = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle 
                cx="64" 
                cy="64" 
                r="60" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="8" 
              />
              <circle 
                cx="64" 
                cy="64" 
                r="60" 
                fill="none" 
                stroke="#1f2937" 
                strokeWidth="8" 
                strokeDasharray="377" 
                strokeDashoffset="207" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-medium">45%</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Phase Progress</span>
            <span>14/30 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Tasks Completed</span>
            <span>8/12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCircle;
