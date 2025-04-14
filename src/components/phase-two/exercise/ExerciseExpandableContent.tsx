
import React from "react";
import ExerciseVideo from "../ExerciseVideo";
import ExerciseDetailsBadges from "./ExerciseDetailsBadges";
import { ExerciseConfig } from "@/utils/exercises/exerciseDetailsConfig";

interface ExerciseExpandableContentProps {
  description?: string;
  type?: "activity" | "exercise";
  videoUrl?: string;
  videoDisplayMode?: "embedded" | "link";
  title: string;
  isExpanded: boolean;
  exerciseConfig?: ExerciseConfig;
}

const ExerciseExpandableContent: React.FC<ExerciseExpandableContentProps> = ({
  description,
  type,
  videoUrl,
  videoDisplayMode = "link",
  title,
  isExpanded,
  exerciseConfig
}) => {
  return (
    <div className={`${!isExpanded ? 'max-h-12 overflow-hidden' : ''}`}>
      {description && (
        <p className="text-neutral-600 text-xs md:text-sm">
          {description}
        </p>
      )}
      
      {type === "exercise" && exerciseConfig && (
        <ExerciseDetailsBadges config={exerciseConfig} />
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
  );
};

export default ExerciseExpandableContent;
