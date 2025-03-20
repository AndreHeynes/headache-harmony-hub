import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProgramTimeline from "@/components/dashboard/ProgramTimeline";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import TaskList from "@/components/dashboard/TaskList";
import ProgramCalendar from "@/components/dashboard/ProgramCalendar";
import HeadacheTracker from "@/components/dashboard/HeadacheTracker";
import ConnectedApp from "@/components/dashboard/ConnectedApp";

const Dashboard = () => {
  const [currentProgress, setCurrentProgress] = useState(75);
  const [currentPhase, setCurrentPhase] = useState(2);

  useEffect(() => {
    // Placeholder for fetching actual progress and phase data
    // Replace with your actual data fetching logic
    // Example:
    // fetch('/api/dashboard-data')
    //   .then(response => response.json())
    //   .then(data => {
    //     setCurrentProgress(data.progress);
    //     setCurrentPhase(data.phase);
    //   });
  }, []);

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Your Recovery Dashboard</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <ProgramTimeline />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Your Progress</h2>
          <div className="flex items-center justify-center mb-4">
            <ProgressCircle value={currentProgress} />
          </div>
          <p className="text-center text-neutral-600 mb-4">
            You're {currentProgress}% through your recovery program.
          </p>
          
          <div className="space-y-2">
            {currentPhase === 1 && (
              <Link 
                to="/phase-one" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 1
              </Link>
            )}
            
            {currentPhase === 2 && (
              <Link 
                to="/phase-two" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 2
              </Link>
            )}
            
            {currentPhase === 3 && (
              <Link 
                to="/phase-three" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 3
              </Link>
            )}
            
            {currentPhase === 4 && (
              <Link 
                to="/phase-four" 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Phase 4
              </Link>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Today's Tasks</h2>
          <TaskList />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Upcoming Schedule</h2>
          <ProgramCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Headache Tracking</h2>
          <HeadacheTracker />
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Connected Apps</h2>
          <div className="space-y-4">
            <ConnectedApp 
              name="Strava" 
              status="connected" 
              lastSync="2 hours ago" 
            />
            <ConnectedApp 
              name="Fitbit" 
              status="connected" 
              lastSync="1 day ago" 
            />
            <ConnectedApp 
              name="Apple Health" 
              status="not-connected" 
            />
            <ConnectedApp 
              name="Sleep Cycle" 
              status="not-connected" 
            />
          </div>
          <div className="mt-4">
            <Link 
              to="/profile#connected-apps" 
              className="text-blue-500 hover:underline text-sm"
            >
              Manage connected apps
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
