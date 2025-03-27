
import React from "react";

const PhaseProgress = () => {
  return (
    <div className="mb-6 bg-secondary p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
            <div className="ml-3">
              <p className="font-medium">Goal Setting</p>
              <p className="text-sm text-muted-foreground">Define SMART goals</p>
            </div>
          </div>
          <div className="flex items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">2</div>
            <div className="ml-3">
              <p className="font-medium">Exercise Selection</p>
              <p className="text-sm text-muted-foreground">Choose your exercises</p>
            </div>
          </div>
          <div className="flex items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">3</div>
            <div className="ml-3">
              <p className="font-medium">Customize</p>
              <p className="text-sm text-muted-foreground">Set schedule & reps</p>
            </div>
          </div>
          <div className="flex items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">4</div>
            <div className="ml-3">
              <p className="font-medium">Review</p>
              <p className="text-sm text-muted-foreground">Finalize program</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-3">Progress</span>
          <div className="w-48 h-2 bg-muted rounded-full">
            <div className="w-1/4 h-full bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseProgress;
