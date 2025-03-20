
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import { Task } from "@/types/task";
import { getPhaseOneTasks, CompletedQuestionnairesMap } from "@/utils/phaseTaskUtils";

interface PhaseTaskListProps {
  day?: number;
  phase?: number;
  completedQuestionnaires?: CompletedQuestionnairesMap;
}

const PhaseTaskList = ({ 
  day = 1, 
  phase = 1,
  completedQuestionnaires = {}
}: PhaseTaskListProps) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Generate tasks based on the phase and day
    if (phase === 1) {
      setTasks(getPhaseOneTasks(day, completedQuestionnaires));
    } else {
      setTasks([]);
    }
  }, [day, phase, completedQuestionnaires]);
  
  const handleTaskClick = (task: Task) => {
    console.log(`Task ${task.id} clicked with type: ${task.type}`);
    if (task.link) {
      navigate(task.link);
    }
  };
  
  return (
    <TaskList
      tasks={tasks}
      onTaskClick={handleTaskClick}
    />
  );
};

export default PhaseTaskList;
