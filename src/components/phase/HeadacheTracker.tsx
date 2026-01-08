import React from "react";
import { BookOpen, ExternalLink, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadacheTrackerProps {
  isConnected?: boolean;
  userEmail?: string;
}

const HeadacheTracker: React.FC<HeadacheTrackerProps> = ({ userEmail = "" }) => {
  const journalUrl = `https://headache-harmony-journal.lovable.app?email=${encodeURIComponent(userEmail)}&source=headache-recovery-beta`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Headache Logger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <p className="text-muted-foreground text-sm mb-4">
            Track your headache episodes in your personal journal app. 
            Connect Fitbit or Oura for detailed correlation analysis.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
            <Activity className="h-3 w-3" />
            <span>Supports Fitbit & Oura Ring integration</span>
          </div>
          <Button asChild className="w-full">
            <a href={journalUrl} target="_blank" rel="noopener noreferrer">
              Open Journal App
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeadacheTracker;
