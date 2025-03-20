
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";
import { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  title?: string;
  emptyMessage?: string;
  onTaskClick?: (task: Task) => void;
  showIcons?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title = "Today's Tasks",
  emptyMessage = "No tasks for today.",
  onTaskClick,
  showIcons = true
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem 
                key={task.id}
                title={task.title}
                completed={task.status === "completed"}
                status={task.status}
                type={task.type}
                onClick={() => onTaskClick && onTaskClick(task)}
                showIcon={showIcons}
              />
            ))
          ) : (
            <p className="text-neutral-500 italic">{emptyMessage}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
