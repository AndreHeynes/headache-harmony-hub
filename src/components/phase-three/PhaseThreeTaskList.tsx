
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
      
      console.log("PhaseThreeTaskList - Completed questionnaires:", completed);
      setCompletedQuestionnaires(completed);
    };
    
    loadCompletedQuestionnaires();
    
    window.addEventListener('storage', loadCompletedQuestionnaires);
    
    return () => {
      window.removeEventListener('storage', loadCompletedQuestionnaires);
    };
  }, []);

  useEffect(() => {
    console.log("PhaseThreeTaskList - day:", day);
    console.log("PhaseThreeTaskList - completedQuestionnaires:", completedQuestionnaires);
    
    const phaseTasks = getPhaseThreeTasks(day, completedQuestionnaires);
    console.log("PhaseThreeTaskList - tasks:", phaseTasks);
    
    const nonLinkableTasks = phaseTasks.map(task => ({
      ...task,
      link: day === 8 ? undefined : task.link
    }));
    
    setTasks(nonLinkableTasks);
  }, [day, completedQuestionnaires]);

  const allCompleted = Object.keys(completedQuestionnaires).length >= 4;
  
  const emptyMessage = day === 8 
    ? (allCompleted
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
      showIcons={true} // Show icons for better visibility
    />
  );
};

export default PhaseThreeTaskList;
