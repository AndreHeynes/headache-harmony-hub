
import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Exercise } from "@/utils/exercises/types";

interface TaskItemProps {
  item: Exercise;
  isCompleted: boolean;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, isCompleted, onClick }) => {
  return (
    <div 
      className="flex items-center cursor-pointer hover:bg-white/80 p-1.5 rounded-md transition-colors" 
      onClick={onClick}
    >
      <div className="mr-3 text-neutral-500 flex-shrink-0">
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </div>
      <div className="text-neutral-700 text-sm">
        {item.title}
        {item.side && (
          <span className="ml-1 text-xs text-purple-500">({item.side})</span>
        )}
        {item.requiresInput && (
          <span className="ml-1.5 text-xs text-blue-500 font-medium">(Requires input)</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
