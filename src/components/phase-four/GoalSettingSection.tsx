
import React from "react";
import { Link } from "react-router-dom";

const GoalSettingSection = () => {
  return (
    <section className="bg-gray-800 rounded-xl p-8 mb-8">
      <div className="max-w-3xl">
        <div className="flex flex-col mb-6">
          <h2 className="text-2xl font-bold">Define Your SMART Goal</h2>
          <p className="text-sm text-gray-400 mt-1">In 1981, George T. Doran wrote a paper titled, "There's a S.M.A.R.T. Way to Write Management's Goals and Objectives."</p>
        </div>
        <div className="mb-8">
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-100" 
            rows={4} 
            placeholder="Enter your specific, measurable, achievable, relevant, and time-bound goal..."
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="font-medium mb-1">Specific</h3>
              <p className="text-sm text-gray-400">Clear target outcome</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="font-medium mb-1">Measurable</h3>
              <p className="text-sm text-gray-400">Track progress</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="font-medium mb-1">Achievable</h3>
              <p className="text-sm text-gray-400">Realistic goals</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="font-medium mb-1">Relevant</h3>
              <p className="text-sm text-gray-400">Aligns with needs</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="font-medium mb-1">Time-bound</h3>
              <p className="text-sm text-gray-400">Set deadline</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Key Habits to Maintain</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-400 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="16" y1="19" x2="16" y2="19"/><line x1="19" y1="16" x2="19" y2="16"/><circle cx="17" cy="17" r="4"/></svg>
              </div>
              <div>
                <h4 className="font-medium">Activity Sheet AS4</h4>
                <p className="text-sm text-gray-400">Trigger Management Review</p>
                <Link to="/phase-two" className="text-blue-400 text-sm hover:underline">Review AS4 Document</Link>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-400 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              </div>
              <div>
                <h4 className="font-medium">Sleep Hygiene (AS3)</h4>
                <p className="text-sm text-gray-400">Maintain Sleep Routine</p>
                <Link to="/phase-two" className="text-blue-400 text-sm hover:underline">Review AS3 Document</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalSettingSection;
