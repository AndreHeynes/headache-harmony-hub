
import React from "react";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DayOneContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-neutral-600">
        Welcome to Phase 1 of your headache management program. This first phase focuses on understanding 
        your current situation through comprehensive assessments.
      </p>

      <h3 className="font-medium text-lg mt-4">What to expect in Phase 1:</h3>
      <ul className="list-disc pl-5 space-y-2 text-neutral-600">
        <li>Complete various assessment questionnaires to help us understand your headache patterns</li>
        <li>Begin tracking your headaches using the integrated tracking tool</li>
        <li>Receive personalized feedback based on your assessment results</li>
        <li>Prepare for Phase 2 where your customized treatment plan will begin</li>
      </ul>

      <Alert className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Headache Tracking</AlertTitle>
        <AlertDescription>
          It's important to track your headaches throughout the program. You can either connect 
          your existing headache tracking app or create a new tracking profile. Please log each 
          headache event when it occurs.
        </AlertDescription>
      </Alert>

      <div className="bg-blue-50 p-4 rounded-md mt-4 border border-blue-100">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-700 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Already using a headache tracker?</h4>
            <p className="text-blue-700 text-sm mt-1">
              If you're already using our headache tracking app, you can link your existing 
              account in the tracking panel on the right. This will allow us to analyze your 
              historical data for more personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayOneContent;
