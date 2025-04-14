
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
  
  // Get exercise details based on title or ID
  const getExerciseDetails = (title: string) => {
    // Extract ID from title if possible
    const idMatch = title.match(/^(\d+\.\d+|\d+):/);
    const id = idMatch ? idMatch[1] : null;
    
    // Default values
    const details = {
      reps: "10-15",
      sets: "3",
      frequency: "3x daily"
    };
    
    // IDs with specific patterns
    if (title.includes("Anterior Scalene") || 
        title.includes("Middle Scalene") ||
        title.includes("Posterior Scalene") ||
        title.includes("Serratus Superior") ||
        title.includes("Pec Major") ||
        title.includes("Pec Minor") ||
        title.includes("Levator Scapula") ||
        title.includes("Erector Spinae")) {
      details.reps = "20 second hold";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Serratus Superior Posterior Stretch")) {
      details.reps = "20 second holds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Deep Neck Flexors (Start)")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "2x daily (before getting out of bed and returning to bed)";
    } else if (title.includes("Deep Neck Flexors Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Deep Neck Flexors Level 2")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Deep Neck Flexors Level 3")) {
      details.reps = "15";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Deep Neck Flexors Level 4")) {
      details.reps = "20";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Relaxed Breathing (Seated)")) {
      details.reps = "Relaxed breathing";
      details.sets = "2";
      details.frequency = "2x daily";
    } else if (title.includes("Relaxed Breathing (Side")) {
      details.reps = "Relaxed breathing";
      details.sets = "2";
      details.frequency = "Before getting out of bed & when getting back to bed";
    } else if (title.includes("Neck Forward Flexion") || title.includes("Neck FWD Flexion")) {
      details.reps = "10 x 10 second holds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Chin Retractions")) {
      details.reps = "10 x 10 second holds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("SNAG")) {
      details.reps = "5 x 10 second holds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Archer")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("TMJ Opening Mobilization")) {
      details.reps = "10";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Self Massage")) {
      details.reps = "60 seconds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neural Mobility Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neural Mobility Level 2")) {
      details.reps = "6";
      details.sets = "2";
      details.frequency = "2x daily";
    } else if (title.includes("Combined Movement Level 1")) {
      details.reps = "10 x 10 second holds";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Combined Movement Level 2")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Combined Movement Level 3")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Gaze Stability Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Gaze Stability Level 2")) {
      details.reps = "15";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Eye/Head Coordination Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Eye/Head Coordination Level 2")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Trunk/Head Coordination")) {
      details.reps = "15";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Quadruped) Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Plank) Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (In Sitting) Level 1")) {
      details.reps = "10";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Quadruped) Level 2")) {
      details.reps = "15";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Plank) Level 2")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Inclined Sitting) Level 2")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Quadruped) Level 3")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Plank) Level 3")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Extensors (Inclined Sitting) Level 3")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Rotators (Plank) Level 1")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Rotators (Quadruped) Level 2")) {
      details.reps = "15";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Neck Rotator (Inclined Sitting) Level 3")) {
      details.reps = "20";
      details.sets = "5";
      details.frequency = "3x daily";
    } else if (title.includes("Scapular Shrug Level 1")) {
      details.reps = "5 x 10 second holds";
      details.sets = "3";
      details.frequency = "Before getting out of bed and when getting back to bed";
    } else if (title.includes("Scapular Shrug Level 2")) {
      details.reps = "10";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Scapular Shrug Level 3")) {
      details.reps = "20";
      details.sets = "3";
      details.frequency = "3x daily";
    } else if (title.includes("Scapular Shrug Level 4")) {
      details.reps = "25";
      details.sets = "5";
      details.frequency = "3x daily";
    }
    
    return details;
  };
  
  // Get the exercise details based on the title
  const exerciseDetails = type === "exercise" ? getExerciseDetails(title) : null;
  
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={`${!isExpanded ? 'max-h-12 overflow-hidden' : ''}`}>
        {description && (
          <p className="text-neutral-600 text-xs md:text-sm">
            {description}
          </p>
        )}
        
        {type === "exercise" && exerciseDetails && (
          <div className="flex flex-wrap gap-2 my-2">
            <Badge variant="outline" className="bg-purple-50 text-xs">
              {exerciseDetails.reps}
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
