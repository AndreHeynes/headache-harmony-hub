
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExerciseConfig } from "@/utils/exercises/exerciseDetailsConfig";

interface ExerciseDetailsBadgesProps {
  config: ExerciseConfig;
}

const ExerciseDetailsBadges: React.FC<ExerciseDetailsBadgesProps> = ({ config }) => {
  return (
    <div className="flex flex-wrap gap-2 my-2">
      <Badge variant="outline" className="bg-purple-50 text-xs">
        {config.reps}
      </Badge>
      <Badge variant="outline" className="bg-purple-50 text-xs">
        {config.sets} sets
      </Badge>
      <Badge variant="outline" className="bg-purple-50 text-xs">
        {config.frequency}
      </Badge>
    </div>
  );
};

export default ExerciseDetailsBadges;
