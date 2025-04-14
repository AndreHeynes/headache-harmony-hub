
import { useState, useEffect } from 'react';
import { secureRetrieve, secureStore } from "@/utils/security/encryption";

export const useCompletedTasks = (day: number) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  // Load saved tasks on mount
  useEffect(() => {
    const savedTasks = secureRetrieve(`phase2-day${day}-tasks`);
    if (savedTasks) {
      try {
        setCompletedTasks(savedTasks);
      } catch (e) {
        console.error("Error parsing saved tasks:", e);
      }
    }
  }, [day]);
  
  // Save completed tasks whenever they change
  useEffect(() => {
    if (Object.keys(completedTasks).length > 0) {
      secureStore(`phase2-day${day}-tasks`, completedTasks);
    }
  }, [completedTasks, day]);
  
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  return { completedTasks, toggleTaskCompletion };
};
