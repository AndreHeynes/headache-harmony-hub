
import React from "react";
import { Clock } from "lucide-react";

const PhaseHeader = () => {
  return (
    <div className="fixed w-full bg-gray-800 border-b border-gray-700 z-50 top-0 left-0">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">Maintain Your Gains!</h1>
          <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full">
            <Clock className="h-4 w-4" />
            <span>Access expires in: 59 days 23 hours</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Help
          </button>
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-10 h-10 rounded-full" alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default PhaseHeader;
