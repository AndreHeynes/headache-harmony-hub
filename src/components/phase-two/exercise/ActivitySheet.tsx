
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ActivitySheetProps {
  activitySheetName?: string;
  activitySheetId?: string;
  requiresInput?: boolean;
  showActivitySheet?: boolean;
}

const ActivitySheet: React.FC<ActivitySheetProps> = ({ 
  activitySheetName, 
  activitySheetId, 
  requiresInput = false,
  showActivitySheet = true 
}) => {
  const [isActivitySheetOpen, setIsActivitySheetOpen] = useState(false);
  
  if (!activitySheetName || !showActivitySheet) return null;
  
  const ActivitySheetIcon = requiresInput ? Pencil : FileText;

  // Helper function to get activity sheet description
  const getActivitySheetDescription = () => {
    if (!activitySheetName) return "";
    
    // Return descriptions based on activity sheet ID or name
    switch (activitySheetId) {
      case "readiness-for-change":
        return "Complete this worksheet to assess and improve your readiness to make changes in managing your condition.";
      case "helpful-beliefs":
        return "Activities to identify and modify beliefs that may be affecting your recovery progress.";
      case "headache-mechanisms":
        return "Educational material explaining how headaches work and what factors influence their frequency and severity.";
      case "sleep-hygiene":
        return "Complete this worksheet to improve your sleep habits and quality to reduce headache frequency.";
      case "trigger-management":
        return "Use this worksheet to identify and develop strategies to manage your specific headache triggers.";
      case "medication-management":
        return "Track and optimize your medication use with this structured activity sheet.";
      default:
        return "Complete this activity sheet as part of your personalized recovery program.";
    }
  };
  
  return (
    <Collapsible 
      open={isActivitySheetOpen} 
      onOpenChange={setIsActivitySheetOpen}
      className="border rounded-md p-2 mt-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ActivitySheetIcon className="h-4 w-4 mr-2 text-blue-600" />
          <span className="text-xs font-medium">Activity Sheet: {activitySheetName}</span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 py-0 px-2">
            {isActivitySheetOpen ? "Hide" : "View"}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="mt-2">
        <p className="text-xs text-neutral-600 mb-2">
          {getActivitySheetDescription()}
        </p>
        
        <div className="flex justify-between">
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs"
            onClick={() => window.open(`/activity-sheets/${activitySheetId}`, '_blank')}
          >
            <FileText className="h-3 w-3 mr-1" />
            Open Activity Sheet
          </Button>
          
          {requiresInput && (
            <Button 
              size="sm" 
              variant="outline"
              className="text-xs"
              onClick={() => window.open(`/activity-sheets/${activitySheetId}/edit`, '_blank')}
            >
              <Pencil className="h-3 w-3 mr-1" />
              Complete Activity
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ActivitySheet;
