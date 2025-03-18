
import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ProgramCalendar from "@/components/dashboard/ProgramCalendar";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import ProgramTimeline from "@/components/dashboard/ProgramTimeline";
import TaskList from "@/components/dashboard/TaskList";
import ConnectedApp from "@/components/dashboard/ConnectedApp";

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-neutral-600">
            <span>Current Phase: </span>
            <Link to="/phase-one" className="text-neutral-800 hover:underline">1</Link>
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ProgramCalendar />
        <ProgressCircle />
        <ProgramTimeline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TaskList />
        <ConnectedApp />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
