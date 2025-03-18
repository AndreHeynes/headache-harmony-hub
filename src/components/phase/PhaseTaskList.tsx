
import React, { useState } from "react";
import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <li 
              key={task.id}
              className="flex items-center cursor-pointer hover:bg-neutral-50 p-2 rounded"
              onClick={() => toggleTask(task.id)}
            >
              <Circle className={`mr-3 h-5 w-5 ${task.completed ? "text-neutral-800 fill-neutral-800" : "text-neutral-400"}`} />
              <span className={task.completed ? "line-through text-neutral-500" : ""}>{task.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PhaseTaskList;
