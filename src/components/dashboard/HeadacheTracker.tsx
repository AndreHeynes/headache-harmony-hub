import React from "react";
import { BookOpen, ExternalLink, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeadacheTrackerProps {
  userEmail?: string;
}

const HeadacheTracker: React.FC<HeadacheTrackerProps> = ({ userEmail = "" }) => {
  const journalUrl = `https://headache-harmony-journal.lovable.app?email=${encodeURIComponent(userEmail)}&source=headache-recovery-beta`;

  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-medium text-lg mb-2">My Headache Experience Journal</h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
          Track your headache episodes, triggers, and patterns in your personal journal. 
          Connect Fitbit or Oura for correlation analysis with sleep and activity data.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
          <Activity className="h-3 w-3" />
          <span>Supports Fitbit & Oura Ring integration</span>
        </div>
        <Button asChild>
          <a href={journalUrl} target="_blank" rel="noopener noreferrer">
            Open Journal App
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default HeadacheTracker;
