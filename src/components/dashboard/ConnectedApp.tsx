
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConnectedAppProps {
  name: string;
  status: string;
  lastSync?: string;
}

const ConnectedApp: React.FC<ConnectedAppProps> = ({ name, status, lastSync }) => {
  return (
    <div className="p-3 border rounded flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Heart className="h-6 w-6 text-neutral-700" />
        <span className="ml-3">{name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-sm ${status === "connected" ? "text-green-600" : "text-neutral-500"}`}>
          {status === "connected" ? "Connected" : "Not Connected"}
        </span>
        {lastSync && status === "connected" && (
          <span className="text-xs text-neutral-500">Last sync: {lastSync}</span>
        )}
      </div>
    </div>
  );
};

export default ConnectedApp;
