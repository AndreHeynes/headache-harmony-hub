
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { date: "Mon", intensity: 2 },
  { date: "Tue", intensity: 1 },
  { date: "Wed", intensity: 0 },
  { date: "Thu", intensity: 3 },
  { date: "Fri", intensity: 4 },
  { date: "Sat", intensity: 2 },
  { date: "Sun", intensity: 1 },
];

const HeadacheTracker: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center">
        <button className="text-sm bg-blue-500 text-white py-1 px-3 rounded">
          Record Headache
        </button>
        <span className="text-sm text-neutral-600">Last recorded: Today</span>
      </div>
    </div>
  );
};

export default HeadacheTracker;
