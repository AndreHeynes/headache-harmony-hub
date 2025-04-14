
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ExerciseExpandableContent from "./ExerciseExpandableContent";
import { getExerciseConfig } from "@/utils/exercises/exerciseDetailsConfig";

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
  
  // Get exercise details based on title
  const exerciseConfig = type === "exercise" ? getExerciseConfig(title) : undefined;
  
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <ExerciseExpandableContent
        description={description}
        type={type}
        videoUrl={videoUrl}
        videoDisplayMode={videoDisplayMode}
        title={title}
        isExpanded={isExpanded}
        exerciseConfig={exerciseConfig}
      />
      
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
