
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "@/components/phase/TaskList";
import { Task } from "@/types/task";
import { getPhaseThreeTasks, CompletedQuestionnairesMap } from "@/utils/phaseTaskUtils";

interface PhaseThreeTaskListProps {
  day: number;
}

const PhaseThreeTaskList: React.FC<PhaseThreeTaskListProps> = ({ day }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<CompletedQuestionnairesMap>({});
  
  useEffect(() => {
    // Load completed questionnaires from localStorage
    const loadCompletedQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: CompletedQuestionnairesMap = {};
      
      questionnaires.forEach(id => {
        const savedResponse = localStorage.getItem(`questionnaire-${id}`);
        if (savedResponse) {
          completed[id] = true;
        }
      });
      
      setCompletedQuestionnaires(completed);
    };
    
    loadCompletedQuestionnaires();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);

  useEffect(() => {
    // Generate tasks for Phase 3
    setTasks(getPhaseThreeTasks(day, completedQuestionnaires));
  }, [day, completedQuestionnaires]);
  
  const handleTaskClick = (task: Task) => {
    if (task.link) {
      navigate(task.link);
    }
  };

  // For day 8, show message about completing assessments instead of tasks
  const emptyMessage = day === 8 
    ? (Object.keys(completedQuestionnaires).length === 4
      ? "All assessments completed. Review your feedback below."
      : "Please complete all assessments to view your feedback.")
    : "No tasks for today.";

  return (
    <TaskList
      tasks={tasks}
      title="Today's Tasks"
      emptyMessage={emptyMessage}
      onTaskClick={handleTaskClick}
    />
  );
};

export default PhaseThreeTaskList;
