
import React, { useEffect, useState } from "react";
import TaskList from "@/components/phase/TaskList";
import { Task } from "@/types/task";
import { getPhaseThreeTasks, CompletedQuestionnairesMap } from "@/utils/phase-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    
    // Don't set tasks for day 8, as we'll display custom content instead
    if (day !== 8) {
      const phaseTasks = getPhaseThreeTasks(day, completedQuestionnaires);
      console.log("PhaseThreeTaskList - tasks:", phaseTasks);
      
      const nonLinkableTasks = phaseTasks.map(task => ({
        ...task,
        link: task.link
      }));
      
      setTasks(nonLinkableTasks);
    } else {
      setTasks([]);
    }
  }, [day, completedQuestionnaires]);

  const allCompleted = Object.keys(completedQuestionnaires).length >= 4;
  
  // For Day 8, show a simple card with the requested text instead of tasks
  if (day === 8) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Program Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-700">
            Please review the outcomes of the questionnaires that inform you of what impact the program has had on your headache experience.
          </p>
        </CardContent>
      </Card>
    );
  }

  const emptyMessage = day === 8 
    ? (allCompleted
      ? "All assessments completed. Review your feedback below."
      : "Please complete all assessments to view your feedback.")
    : "No tasks for today.";

  const title = "Today's Tasks";

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
