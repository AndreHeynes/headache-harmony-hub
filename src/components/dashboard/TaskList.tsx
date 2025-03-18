
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type Task = {
  id: number;
  title: string;
  status: string;
  completed: boolean;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Morning Exercise Routine", status: "completed", completed: true },
    { id: 2, title: "Meditation Session", status: "in-progress", completed: false },
    { id: 3, title: "Pain Journal Entry", status: "not-started", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, status: !task.completed ? "completed" : "in-progress" } 
          : task
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-neutral-800 hover:bg-neutral-700">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-neutral-600 hover:bg-neutral-500">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-neutral-700">Not Started</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Today's Tasks - Day 14</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="h-5 w-5"
              />
              <label
                htmlFor={`task-${task.id}`}
                className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.title}
              </label>
              <div className="ml-auto">
                {getStatusBadge(task.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
