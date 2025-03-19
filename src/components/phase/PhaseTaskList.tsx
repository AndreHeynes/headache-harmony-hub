
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
            title: "FHT Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/fht"
          },
          { 
            id: 2, 
            title: "HIT-6 Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hit-6"
          },
          { 
            id: 3, 
            title: "MKQ Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/mkq"
          },
          { 
            id: 4, 
            title: "PSFS Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psfs"
          }
        ];
      }
      
      // Day 3
      else if (day === 3) {
        return [
          { 
            id: 1, 
            title: "FHT Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/fht"
          },
          { 
            id: 2, 
            title: "MIDAS Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/midas"
          },
          { 
            id: 3, 
            title: "PSFS Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psfs"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/mkq"
          }
        ];
      }
      
      // Day 4
      else if (day === 4) {
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
          },
          { 
            id: 3, 
            title: "PSC Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psc"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/mkq"
          }
        ];
      }
      
      // Day 5
      else if (day === 5) {
        return [
          { 
            id: 1, 
            title: "PSFS Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psfs"
          },
          { 
            id: 2, 
            title: "HSLOC Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hsloc"
          },
          { 
            id: 3, 
            title: "PSC Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psc"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/mkq"
          }
        ];
      }
      
      // Day 6
      else if (day === 6) {
        return [
          { 
            id: 1, 
            title: "HSES Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hses"
          },
          { 
            id: 2, 
            title: "HB Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hb"
          }
        ];
      }
      
      // Day 7
      else if (day === 7) {
        return [
          { 
            id: 1, 
            title: "HSES Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hses"
          },
          { 
            id: 2, 
            title: "HSLOC Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hsloc"
          },
          { 
            id: 3, 
            title: "HB Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/hb"
          },
          { 
            id: 4, 
            title: "PSC Questionnaire", 
            status: "not-started",
            type: "questionnaire",
            link: "/questionnaire/psc"
          }
        ];
      } else {
        return [];
      }
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
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem 
                key={task.id}
                title={task.title}
                completed={task.status === "completed"}
                status={task.status}
                type={task.type}
                onClick={() => handleTaskClick(task)}
              />
            ))
          ) : (
            <p className="text-neutral-500 italic">No tasks for today.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTaskList;
