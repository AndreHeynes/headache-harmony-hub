import React from "react";
import { CheckCircle, Circle, ExternalLink } from "lucide-react";

interface HeadacheLoggingTaskProps {
  isCompleted: boolean;
  toggleCompletion: () => void;
  userEmail?: string;
}

const HeadacheLoggingTask: React.FC<HeadacheLoggingTaskProps> = ({ 
  isCompleted, 
  toggleCompletion,
  userEmail = ""
}) => {
  const journalUrl = `https://headache-harmony-journal.lovable.app?email=${encodeURIComponent(userEmail)}&source=headache-recovery-beta`;

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
        <div 
          className="flex items-center cursor-pointer flex-1"
          onClick={toggleCompletion}
        >
          <div className="mr-3">
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <span className="text-foreground">
            Log headaches (if any occurred today)
          </span>
        </div>
        <a 
          href={journalUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline flex items-center gap-1 ml-2"
        >
          Open Journal
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default HeadacheLoggingTask;
