
import React from "react";

const PhaseHeader = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-4 mb-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-800">Custom Exercise Program</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Phase 4</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Active</span>
        </div>
      </div>
    </div>
  );
};

export default PhaseHeader;
