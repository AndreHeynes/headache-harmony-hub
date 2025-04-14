
import React from "react";
import { FileText } from "lucide-react";
import TaskItem from "./TaskItem";
import { Exercise } from "@/utils/exercises/types";

interface ActivitySheetTasksProps {
  activities: Exercise[];
  completedTasks: Record<string, boolean>;
  toggleTaskCompletion: (taskId: string) => void;
}

const ActivitySheetTasks: React.FC<ActivitySheetTasksProps> = ({ 
  activities,
  completedTasks,
  toggleTaskCompletion
}) => {
  if (activities.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center">
        <FileText className="h-4 w-4 mr-1.5" /> 
        Activity Sheets
      </h3>
      <div className="space-y-2 bg-gradient-to-r from-blue-50 to-white p-3 rounded-md">
        {activities.map((activity) => (
          <TaskItem
            key={activity.id}
            item={activity}
            isCompleted={!!completedTasks[activity.id]}
            onClick={() => toggleTaskCompletion(activity.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitySheetTasks;
