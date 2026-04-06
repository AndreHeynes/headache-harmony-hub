
import React from "react";
import { AlertCircle, Info, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DayOneContent: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Urgency notice: complete within 1 week */}
      <Alert variant="default" className="border-primary/30 bg-primary/5">
        <Clock className="h-4 w-4" />
        <AlertTitle>Complete Phase 1 within 7 days</AlertTitle>
        <AlertDescription>
          For the best results, we recommend completing all 9 questionnaires within your first week. 
          This ensures your baseline assessments are captured accurately before starting your personalised treatment program in Phase 2.
        </AlertDescription>
      </Alert>

      <p className="text-muted-foreground">
        Welcome to Phase 1 of your headache management program. This first phase focuses on understanding 
        your current situation through comprehensive assessments.
      </p>

      <h3 className="font-medium text-lg mt-4">What to expect in Phase 1:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
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

      <div className="bg-muted p-4 rounded-md mt-4 border border-border">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground">Already using a headache tracker?</h4>
            <p className="text-muted-foreground text-sm mt-1">
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
