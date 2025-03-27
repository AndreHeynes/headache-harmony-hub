
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const openExternalTracker = () => {
    // Check if app is connected
    const appId = localStorage.getItem("headache-app-id");
    
    if (appId) {
      // Navigate to the external tracking component
      navigate("/phase-one?tab=tracking");
      
      // Show toast
      toast({
        title: "Opening External Tracker",
        description: "Connecting to your headache tracking app"
      });
    } else {
      // Prompt to connect app first
      toast({
        title: "No Tracking App Connected",
        description: "Please connect a headache tracking app first",
        variant: "destructive"
      });
      
      // Navigate to connect app page
      navigate("/phase-one?connect=true");
    }
  };
  
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
        <Button className="text-sm" onClick={openExternalTracker}>
          Record Headache
        </Button>
        <span className="text-sm text-neutral-600">Last recorded: Today</span>
      </div>
    </div>
  );
};

export default HeadacheTracker;
