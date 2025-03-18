
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConnectedApp = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Connected App</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3 border rounded flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-neutral-700" />
            <span className="ml-3">Health App</span>
          </div>
          <span className="text-neutral-600">Connected</span>
        </div>
        <div className="mt-4 p-4 bg-gray-50 border border-dashed rounded-md">
          <div className="text-center">
            <h4 className="font-medium mb-2">Health Metrics</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-neutral-600">Sleep</div>
                <div className="font-medium">7.2 hrs</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-neutral-600">Steps</div>
                <div className="font-medium">8,453</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-neutral-600">Water</div>
                <div className="font-medium">1.3L</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-neutral-600">Stress</div>
                <div className="font-medium">Medium</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedApp;
