
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

interface PhaseTaskListProps {
  day?: number;
}

const PhaseTaskList = ({ day = 1 }: PhaseTaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Different tasks for different days
    switch (day) {
      case 1:
        setTasks([
          { id: 1, title: "Complete Initial Assessment", completed: false },
          { id: 2, title: "Watch Introduction Video", completed: false },
          { id: 3, title: "Set Up Daily Reminders", completed: false },
        ]);
        break;
      case 2:
        setTasks([
          { id: 1, title: "Morning Questionnaire", completed: false },
          { id: 2, title: "Symptom Log", completed: false },
          { id: 3, title: "Evening Check-in", completed: false },
        ]);
        break;
      case 3:
        setTasks([
          { id: 1, title: "Complete Day 3 Assessment", completed: false },
          { id: 2, title: "Log Daily Activities", completed: false },
          { id: 3, title: "Review Progress", completed: false },
        ]);
        break;
      case 4:
        setTasks([
          { id: 1, title: "Mid-week Check-in", completed: false },
          { id: 2, title: "Update Symptom Journal", completed: false },
          { id: 3, title: "Review Educational Materials", completed: false },
        ]);
        break;
      case 5:
        setTasks([
          { id: 1, title: "Complete Symptom Assessment", completed: false },
          { id: 2, title: "Track Medication Response", completed: false },
          { id: 3, title: "Record Sleep Pattern", completed: false },
        ]);
        break;
      case 6:
        setTasks([
          { id: 1, title: "Weekend Planning", completed: false },
          { id: 2, title: "Stress Management Exercise", completed: false },
          { id: 3, title: "Schedule Week 2 Activities", completed: false },
        ]);
        break;
      case 7:
        setTasks([
          { id: 1, title: "Week 1 Review Questionnaire", completed: false },
          { id: 2, title: "Weekly Summary Report", completed: false },
          { id: 3, title: "Prepare for Phase 2", completed: false },
        ]);
        break;
      default:
        setTasks([
          { id: 1, title: "Complete Daily Assessment", completed: false },
          { id: 2, title: "Track Symptoms", completed: false },
          { id: 3, title: "Review Progress", completed: false },
        ]);
    }
  }, [day]);

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
