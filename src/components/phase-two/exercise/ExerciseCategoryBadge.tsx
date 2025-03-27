
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ExerciseCategoryBadgeProps {
  title: string;
}

const ExerciseCategoryBadge: React.FC<ExerciseCategoryBadgeProps> = ({ title }) => {
  // Helper function to get category badge
  const getCategoryBadge = () => {
    if (title.toLowerCase().includes("breathing")) return "Breathing";
    if (title.toLowerCase().includes("stretch") || title.toLowerCase().includes("scalene")) 
      return "Stretching";
    if (title.toLowerCase().includes("mobilization") || title.toLowerCase().includes("massage")) 
      return "Mobilization";
    if (title.toLowerCase().includes("tmj") || title.toLowerCase().includes("temporal")) 
      return "TMJ";
    if (title.toLowerCase().includes("flexor") || title.toLowerCase().includes("extensor")) 
      return "Strengthening";
    if (title.toLowerCase().includes("coordination") || title.toLowerCase().includes("gaze")) 
      return "Coordination";
    
    return null;
  };
  
  const category = getCategoryBadge();
  
  if (!category) return null;
  
  return (
    <Badge variant="outline" className="bg-blue-50 text-xs whitespace-nowrap">
      {category}
    </Badge>
  );
};

export default ExerciseCategoryBadge;
