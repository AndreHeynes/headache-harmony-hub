import React, { useEffect, useState } from "react";
import TaskList from "@/components/phase/TaskList";
import { Task } from "@/types/task";
import { getPhaseThreeTasks, CompletedQuestionnairesMap } from "@/utils/phase-tasks";

interface PhaseThreeTaskListProps {
  day: number;
}

const PhaseThreeTaskList: React.FC<PhaseThreeTaskListProps> = ({ day }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<CompletedQuestionnairesMap>({});
  
  useEffect(() => {
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
    
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);

  useEffect(() => {
    const phaseTasks = getPhaseThreeTasks(day, completedQuestionnaires);
    
    const nonLinkableTasks = phaseTasks.map(task => ({
      ...task,
      link: undefined
    }));
    
    setTasks(nonLinkableTasks);
  }, [day, completedQuestionnaires]);

  const emptyMessage = day === 8 
    ? (Object.keys(completedQuestionnaires).length === 4
      ? "All assessments completed. Review your feedback below."
      : "Please complete all assessments to view your feedback.")
    : "No tasks for today.";

  const title = day === 8 ? "Program Completion" : "Today's Tasks";

  return (
    <TaskList
      tasks={tasks}
      title={title}
      emptyMessage={emptyMessage}
      onTaskClick={() => {}} // Empty function since tasks shouldn't be clickable
      showIcons={false} // Add this prop to hide icons
    />
  );
};

export default PhaseThreeTaskList;
