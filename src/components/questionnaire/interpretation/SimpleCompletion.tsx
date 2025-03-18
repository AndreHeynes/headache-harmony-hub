
import React from "react";
import { Button } from "@/components/ui/button"; 
import { ArrowLeft } from "lucide-react";

interface SimpleCompletionProps {
  customMessage?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const SimpleCompletion: React.FC<SimpleCompletionProps> = ({
  customMessage,
  showBackButton = false,
  onBack
}) => {
  const defaultMessage = "Thank you for completing this questionnaire.";
  
  return (
    <div className="p-4 text-center space-y-4">
      <h3 className="text-lg font-medium mb-2">Questionnaire Completed</h3>
      <p>{customMessage || defaultMessage}</p>
      
      {showBackButton && (
        <div className="mt-4">
          <Button variant="outline" onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default SimpleCompletion;
