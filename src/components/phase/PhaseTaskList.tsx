
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";

interface PhaseTaskListProps {
  day?: number;
  phase?: number;
}

const PhaseTaskList = ({ day = 1, phase = 1 }: PhaseTaskListProps) => {
  // Generate tasks based on the phase and day
  const getTasks = () => {
    if (phase === 1) {
      // Phase 1 tasks
      return [
        { 
          id: 1, 
          title: "Initial Assessment", 
          status: day > 3 ? "completed" : day > 1 ? "in-progress" : "not-started" 
        },
        { 
          id: 2, 
          title: "Pain Diary", 
          status: day > 5 ? "completed" : day > 2 ? "in-progress" : "not-started" 
        },
        { 
          id: 3, 
          title: "Lifestyle Survey", 
          status: day > 6 ? "completed" : day > 4 ? "in-progress" : "not-started" 
        }
      ];
    } else if (phase === 2) {
      // Phase 2 tasks - these will vary based on the day
      return [
        { 
          id: 1, 
          title: "Morning Exercise Routine", 
          status: day % 4 === 0 ? "completed" : day % 3 === 0 ? "in-progress" : "not-started" 
        },
        { 
          id: 2, 
          title: "Breathing Techniques", 
          status: day % 3 === 0 ? "completed" : day % 2 === 0 ? "in-progress" : "not-started" 
        },
        { 
          id: 3, 
          title: "Stress Management", 
          status: day % 5 === 0 ? "completed" : day % 4 === 0 ? "in-progress" : "not-started" 
        }
      ];
    } else {
      return [];
    }
  };

  const tasks = getTasks();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              title={task.title}
              status={task.status}
              onClick={() => console.log(`Task ${task.id} clicked`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTaskList;
