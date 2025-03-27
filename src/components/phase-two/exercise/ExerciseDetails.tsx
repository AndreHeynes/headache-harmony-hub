
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ExerciseVideo from "../ExerciseVideo";

interface ExerciseDetailsProps {
  description?: string;
  type?: "activity" | "exercise";
  videoUrl?: string;
  videoDisplayMode?: "embedded" | "link";
  title: string;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ 
  description, 
  type, 
  videoUrl, 
  videoDisplayMode = "link",
  title
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Placeholder exercise details - these will be updated per exercise later
  const exerciseDetails = {
    reps: "10-15",
    sets: "3",
    frequency: "2x daily"
  };
  
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={`${!isExpanded ? 'max-h-12 overflow-hidden' : ''}`}>
        {description && (
          <p className="text-neutral-600 text-xs md:text-sm">
            {description}
          </p>
        )}
        
        {type === "exercise" && (
          <div className="flex flex-wrap gap-2 my-2">
            <Badge variant="outline" className="bg-purple-50 text-xs">
              {exerciseDetails.reps} reps
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-xs">
              {exerciseDetails.sets} sets
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-xs">
              {exerciseDetails.frequency}
            </Badge>
          </div>
        )}
        
        {videoUrl && isExpanded && (
          <div className="mt-2">
            <ExerciseVideo
              title={`Watch: ${title}`}
              videoUrl={videoUrl}
              displayMode={videoDisplayMode}
            />
          </div>
        )}
      </div>
      
      {(description || videoUrl) && (
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-1 h-6 py-0">
            {isExpanded ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </Button>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
};

export default ExerciseDetails;
