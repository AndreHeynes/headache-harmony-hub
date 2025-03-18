
import React from "react";
import { Circle } from "lucide-react";

interface TaskItemProps {
  title: string;
  completed: boolean;
  onClick: () => void;
}

const TaskItem = ({ title, completed, onClick }: TaskItemProps) => {
  return (
    <li 
      className="flex items-center cursor-pointer hover:bg-neutral-50 p-2 rounded"
      onClick={onClick}
    >
      <Circle className={`mr-3 h-5 w-5 ${completed ? "text-neutral-800 fill-neutral-800" : "text-neutral-400"}`} />
      <span className={completed ? "line-through text-neutral-500" : ""}>{title}</span>
    </li>
  );
};

export default TaskItem;
