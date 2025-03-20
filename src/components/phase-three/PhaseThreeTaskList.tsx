
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PhaseThreeTaskListProps {
  day: number;
}

const PhaseThreeTaskList: React.FC<PhaseThreeTaskListProps> = ({ day }) => {
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load completed questionnaires from localStorage
    const loadCompletedQuestionnaires = () => {
      const questionnaires = ['hit-6', 'midas', 'psfs', 'gpoc'];
      const completed: Record<string, boolean> = {};
      
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

  // Common tasks for all days in Phase 3
  const getTasks = () => [
    {
      id: 1,
      title: "Complete HIT-6 Assessment",
      status: completedQuestionnaires['hit-6'] ? "completed" : "not-started" as "not-started" | "in-progress" | "completed",
      questionnaire: "hit-6"
    },
    {
      id: 2,
      title: "Complete MIDAS Assessment",
      status: completedQuestionnaires['midas'] ? "completed" : "not-started" as "not-started" | "in-progress" | "completed",
      questionnaire: "midas"
    },
    {
      id: 3,
      title: "Complete PSFS Assessment",
      status: completedQuestionnaires['psfs'] ? "completed" : "not-started" as "not-started" | "in-progress" | "completed",
      questionnaire: "psfs"
    },
    {
      id: 4,
      title: "Complete Global Perception of Change",
      status: completedQuestionnaires['gpoc'] ? "completed" : "not-started" as "not-started" | "in-progress" | "completed",
      questionnaire: "gpoc"
    }
  ];

  // Day 8 will show a different set of tasks
  const tasks = day === 8 ? [] : getTasks();
  const allCompleted = Object.keys(completedQuestionnaires).length === 4;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {day < 8 ? (
            tasks.length > 0 ? (
              tasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded transition-colors"
                >
                  <span className={task.status === "completed" ? "line-through text-neutral-500" : ""}>
                    {task.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed" 
                      ? "bg-neutral-800 text-white" 
                      : task.status === "in-progress" 
                        ? "bg-neutral-400 text-white"
                        : "bg-neutral-200 text-neutral-700"
                  }`}>
                    {task.status === "completed" 
                      ? "Completed" 
                      : task.status === "in-progress" 
                        ? "In Progress"
                        : "Not Started"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 italic">No tasks for today.</p>
            )
          ) : (
            <p className="text-neutral-500">
              {allCompleted 
                ? "All assessments completed. Review your feedback below." 
                : "Please complete all assessments to view your feedback."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseThreeTaskList;
