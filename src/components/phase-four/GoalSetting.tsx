
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const GoalSetting = () => {
  const [goalText, setGoalText] = useState("");
  const maxLength = 250;

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Set Your Goals</h2>
        <textarea 
          className="w-full bg-white text-gray-800 rounded-lg p-4 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="Describe your personal health and movement goals..."
          maxLength={maxLength}
          rows={3}
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
        />
        <div className="flex justify-between mt-2">
          <button className="text-purple-600 text-sm flex items-center hover:text-purple-700">
            <Lightbulb className="h-4 w-4 mr-2" />
            S.M.A.R.T. Goal Tips
          </button>
          <span className="text-gray-500 text-sm">{goalText.length}/{maxLength}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
