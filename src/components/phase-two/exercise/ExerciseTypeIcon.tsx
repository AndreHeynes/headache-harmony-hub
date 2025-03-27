
import React from "react";
import { Dumbbell, FileText } from "lucide-react";

interface ExerciseTypeIconProps {
  title: string;
  type?: "activity" | "exercise";
}

const ExerciseTypeIcon: React.FC<ExerciseTypeIconProps> = ({ title, type }) => {
  // Get icon based on exercise type
  const getExerciseIcon = () => {
    if (type === "activity") return <FileText className="h-5 w-5 text-blue-600" />;
    
    if (title.toLowerCase().includes("breathing")) 
      return <Dumbbell className="h-5 w-5 text-indigo-600" />;
    if (title.toLowerCase().includes("stretch") || title.toLowerCase().includes("scalene")) 
      return <Dumbbell className="h-5 w-5 text-purple-600" />;
    if (title.toLowerCase().includes("mobilization") || title.toLowerCase().includes("massage")) 
      return <Dumbbell className="h-5 w-5 text-green-600" />;
    if (title.toLowerCase().includes("flexor") || title.toLowerCase().includes("extensor")) 
      return <Dumbbell className="h-5 w-5 text-orange-600" />;
    
    // Default icon
    return <Dumbbell className="h-5 w-5 text-purple-600" />;
  };
  
  return getExerciseIcon();
};

export default ExerciseTypeIcon;
