
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Info, TrendingDown } from "lucide-react";

interface HeadacheAnalysisProps {
  isConnected: boolean;
  showInPhaseThree?: boolean;
}

// Sample data - in a real app, this would come from the external tracking app
const weeklyData = [
  { day: "Mon", count: 0, severity: 0 },
  { day: "Tue", count: 1, severity: 6 },
  { day: "Wed", count: 0, severity: 0 },
  { day: "Thu", count: 1, severity: 4 },
  { day: "Fri", count: 0, severity: 0 },
  { day: "Sat", count: 0, severity: 0 },
  { day: "Sun", count: 1, severity: 7 },
];

const monthlyData = [
  { week: "Week 1", count: 3, avgSeverity: 5.7 },
  { week: "Week 2", count: 2, avgSeverity: 4.5 },
  { week: "Week 3", count: 4, avgSeverity: 6.2 },
  { week: "Week 4", count: 2, avgSeverity: 3.0 },
];

// For Phase 3 - showing progress over the program
const progressData = [
  { month: "Month 1", count: 12, avgSeverity: 7.2 },
  { month: "Month 2", count: 8, avgSeverity: 5.8 },
  { month: "Month 3", count: 5, avgSeverity: 4.2 },
  { month: "Month 4", count: 3, avgSeverity: 3.1 },
];

const HeadacheAnalysis: React.FC<HeadacheAnalysisProps> = ({ isConnected, showInPhaseThree = false }) => {
  const [activeTab, setActiveTab] = useState(showInPhaseThree ? "progress" : "weekly");

  const renderAnalysisContent = () => {
    if (!isConnected) {
      return (
        <div className="text-center p-6 border border-dashed rounded">
          <Info className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-500">Connect your headache tracking app to view analysis</p>
        </div>
      );
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="weekly" disabled={showInPhaseThree}>Weekly Summary</TabsTrigger>
          {showInPhaseThree ? (
            <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
          ) : (
            <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          <div className="h-[250px]">
            <ChartContainer 
              config={{ 
                headaches: { color: "#f43f5e" }, 
                severity: { color: "#8b5cf6" } 
              }}
            >
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-headaches)" name="Headaches" />
                <Bar dataKey="severity" fill="var(--color-severity)" name="Severity" />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-3 rounded">
              <p className="text-sm text-neutral-500">Weekly Headaches</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <p className="text-sm text-neutral-500">Avg. Severity</p>
              <p className="text-2xl font-bold">5.7/10</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <div className="h-[250px]">
            <ChartContainer 
              config={{ 
                headaches: { color: "#f43f5e" }, 
                severity: { color: "#8b5cf6" } 
              }}
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="var(--color-headaches)" name="Headaches" />
                <Line type="monotone" dataKey="avgSeverity" stroke="var(--color-severity)" name="Avg. Severity" />
              </LineChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-3 rounded">
              <p className="text-sm text-neutral-500">Monthly Headaches</p>
              <p className="text-2xl font-bold">11</p>
            </div>
            <div className="bg-neutral-50 p-3 rounded">
              <p className="text-sm text-neutral-500">Avg. Severity</p>
              <p className="text-2xl font-bold">4.9/10</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded border border-green-100">
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">Your headaches have decreased by 25% this month</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          <div className="h-[250px]">
            <ChartContainer 
              config={{ 
                headaches: { color: "#f43f5e" }, 
                severity: { color: "#8b5cf6" } 
              }}
            >
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="var(--color-headaches)" name="Headaches per Month" />
                <Line type="monotone" dataKey="avgSeverity" stroke="var(--color-severity)" name="Avg. Severity" />
              </LineChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 p-4 rounded border border-green-100">
              <div className="flex items-center mb-2">
                <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800 font-medium">75% reduction in headache frequency</p>
              </div>
              <p className="text-green-700 text-sm">
                Your headache frequency has decreased from 12 per month to just 3 per month since starting the program.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded border border-green-100">
              <div className="flex items-center mb-2">
                <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800 font-medium">57% reduction in headache severity</p>
              </div>
              <p className="text-green-700 text-sm">
                Your average headache severity has decreased from 7.2/10 to 3.1/10 since starting the program.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          {showInPhaseThree ? "Headache Progress Analysis" : "Headache Analysis"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderAnalysisContent()}
      </CardContent>
    </Card>
  );
};

export default HeadacheAnalysis;
