
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const PhaseTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete Initial Assessment", completed: false },
    { id: 2, title: "Watch Introduction Video", completed: false },
    { id: 3, title: "Set Up Daily Reminders", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id}
              title={task.title}
              completed={task.completed}
              onClick={() => toggleTask(task.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PhaseTaskList;
