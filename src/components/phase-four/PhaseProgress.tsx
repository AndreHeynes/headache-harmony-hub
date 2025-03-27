
import React from "react";

const PhaseProgress = () => {
  return (
    <div className="fixed top-20 w-full bg-gray-800 border-b border-gray-700 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">1</div>
              <div className="ml-3">
                <p className="font-medium">Goal Setting</p>
                <p className="text-sm text-gray-400">Define SMART goals</p>
              </div>
            </div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">2</div>
              <div className="ml-3">
                <p className="font-medium">Exercise Selection</p>
                <p className="text-sm text-gray-400">Choose your exercises</p>
              </div>
            </div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">3</div>
              <div className="ml-3">
                <p className="font-medium">Customize</p>
                <p className="text-sm text-gray-400">Set schedule & reps</p>
              </div>
            </div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">4</div>
              <div className="ml-3">
                <p className="font-medium">Review</p>
                <p className="text-sm text-gray-400">Finalize program</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-3">Progress</span>
            <div className="w-48 h-2 bg-gray-700 rounded-full">
              <div className="w-1/4 h-full bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseProgress;
