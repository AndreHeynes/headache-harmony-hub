
import React, { useEffect, useState } from "react";
import TaskList from "@/components/phase/TaskList";
import { Task } from "@/types/task";
import { getPhaseThreeTasks, CompletedQuestionnairesMap } from "@/utils/phaseTaskUtils";

interface PhaseThreeTaskListProps {
  day: number;
}

const PhaseThreeTaskList: React.FC<PhaseThreeTaskListProps> = ({ day }) => {
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
    const phaseTasks = getPhaseThreeTasks(day, completedQuestionnaires);
    
    // Remove links from tasks to make assessments not clickable
    const nonLinkableTasks = phaseTasks.map(task => ({
      ...task,
      link: undefined
    }));
    
    setTasks(nonLinkableTasks);
  }, [day, completedQuestionnaires]);

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
      onTaskClick={() => {}} // Empty function since tasks shouldn't be clickable
      showIcons={false} // Add this prop to hide icons
    />
  );
};

export default PhaseThreeTaskList;
