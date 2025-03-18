
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  type?: "default" | "questionnaire" | "document" | "video";
  link?: string;
}

interface PhaseTaskListProps {
  day?: number;
  phase?: number;
}

const PhaseTaskList = ({ day = 1, phase = 1 }: PhaseTaskListProps) => {
  const navigate = useNavigate();
  
  // Generate tasks based on the phase and day
  const getTasks = (): Task[] => {
    if (phase === 1) {
      // Special tasks for day 1
      if (day === 1) {
        return [
          { 
            id: 1, 
            title: "Read the Phase 1 guide", 
            status: "not-started",
            type: "document",
            link: "/documents/phase-one-guide"
          },
          { 
            id: 2, 
            title: "Watch the Phase 1 introduction video", 
            status: "not-started",
            type: "video",
            link: "#" // This would link to the video player
          }
        ];
      }
      
      // Day 2 - Initial questionnaires
      else if (day === 2) {
        return [
          { 
            id: 1, 
            title: "HIT-6 Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hit-6"
          },
          { 
            id: 2, 
            title: "MIDAS Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/midas"
          }
        ];
      }
      
      // Day 3 - More questionnaires
      else if (day === 3) {
        return [
          { 
            id: 1, 
            title: "Headache Self-Efficacy Scale", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hses"
          },
          { 
            id: 2, 
            title: "Headache Type Assessment", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/fht"
          }
        ];
      }
      
      // Day 4 - More questionnaires
      else if (day === 4) {
        return [
          { 
            id: 1, 
            title: "Patient Specific Functional Scale", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psfs"
          },
          { 
            id: 2, 
            title: "Headache Locus of Control", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hsloc"
          }
        ];
      }
      
      // Days 5-7 - Review and reflect
      else {
        return [
          { 
            id: 1, 
            title: "Review your questionnaire results", 
            status: day > 6 ? "completed" : "not-started"
          },
          { 
            id: 2, 
            title: "Track headache symptoms and triggers", 
            status: day > 5 ? "in-progress" : "not-started"
          },
          { 
            id: 3, 
            title: "Prepare for Phase 2", 
            status: day === 7 ? "in-progress" : "not-started"
          }
        ];
      }
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
          title: "HIT-6 Follow-up", 
          status: day % 5 === 0 ? "completed" : day % 4 === 0 ? "in-progress" : "not-started",
          type: "questionnaire",
          link: "/questionnaire/hit-6"
        }
      ];
    } else {
      return [];
    }
  };

  const tasks = getTasks();
  
  const handleTaskClick = (task: Task) => {
    console.log(`Task ${task.id} clicked with type: ${task.type}`);
    if (task.link) {
      navigate(task.link);
    }
  };
  
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
              completed={task.status === "completed"}
              status={task.status}
              type={task.type}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTaskList;
