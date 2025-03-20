
import React from "react";
import { Circle, CheckCircle, Clock, FileText, FileQuestion, Video } from "lucide-react";

interface TaskItemProps {
  title: string;
  completed: boolean;
  onClick: () => void;
  status?: "not-started" | "in-progress" | "completed";
  type?: "default" | "questionnaire" | "document" | "video";
  showIcon?: boolean;
}

const TaskItem = ({ 
  title, 
  completed, 
  onClick, 
  status = "not-started", 
  type = "default",
  showIcon = true
}: TaskItemProps) => {
  const renderStatusIcon = () => {
    if (!showIcon) return null;
    
    // Choose icon based on task type
    if (type === "questionnaire") {
      return <FileQuestion className={`mr-3 h-5 w-5 ${getIconColorClass()}`} />;
    } else if (type === "document") {
      return <FileText className={`mr-3 h-5 w-5 ${getIconColorClass()}`} />;
    } else if (type === "video") {
      return <Video className={`mr-3 h-5 w-5 ${getIconColorClass()}`} />;
    }
    
    // Choose icon based on status
    switch (status) {
      case "completed":
        return <CheckCircle className="mr-3 h-5 w-5 text-neutral-800" />;
      case "in-progress":
        return <Clock className="mr-3 h-5 w-5 text-neutral-600" />;
      case "not-started":
      default:
        return <Circle className="mr-3 h-5 w-5 text-neutral-400" />;
    }
  };

  const getIconColorClass = () => {
    switch (status) {
      case "completed":
        return "text-neutral-800";
      case "in-progress":
        return "text-neutral-600";
      case "not-started":
      default:
        return "text-neutral-400";
    }
  };

  const renderStatusBadge = () => {
    switch (status) {
      case "completed":
        return <span className="text-xs px-2 py-1 bg-neutral-800 text-white rounded-full">Completed</span>;
      case "in-progress":
        return <span className="text-xs px-2 py-1 bg-neutral-400 text-white rounded-full">In Progress</span>;
      case "not-started":
      default:
        return <span className="text-xs px-2 py-1 bg-neutral-200 text-neutral-700 rounded-full">Not Started</span>;
    }
  };

  return (
    <li 
      className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-2 rounded transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        {renderStatusIcon()}
        <span className={status === "completed" ? "line-through text-neutral-500" : ""}>
          {title}
        </span>
      </div>
      {renderStatusBadge()}
    </li>
  );
};

export default TaskItem;
