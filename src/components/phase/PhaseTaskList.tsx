
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
  questionnaire?: string;
}

interface PhaseTaskListProps {
  day?: number;
  phase?: number;
  completedQuestionnaires?: Record<string, boolean>;
}

const PhaseTaskList = ({ 
  day = 1, 
  phase = 1,
  completedQuestionnaires = {}
}: PhaseTaskListProps) => {
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
            status: completedQuestionnaires['fht'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['fht'] ? undefined : "/questionnaire/fht",
            questionnaire: "fht"
          },
          { 
            id: 2, 
            title: "HIT-6 Questionnaire", 
            status: completedQuestionnaires['hit-6'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hit-6'] ? undefined : "/questionnaire/hit-6",
            questionnaire: "hit-6"
          },
          { 
            id: 3, 
            title: "MKQ Questionnaire", 
            status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
            questionnaire: "mkq"
          },
          { 
            id: 4, 
            title: "PSFS Questionnaire", 
            status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
            questionnaire: "psfs"
          }
        ];
      }
      
      // Day 3
      else if (day === 3) {
        return [
          { 
            id: 1, 
            title: "FHT Questionnaire", 
            status: completedQuestionnaires['fht'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['fht'] ? undefined : "/questionnaire/fht",
            questionnaire: "fht"
          },
          { 
            id: 2, 
            title: "MIDAS Questionnaire", 
            status: completedQuestionnaires['midas'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['midas'] ? undefined : "/questionnaire/midas",
            questionnaire: "midas"
          },
          { 
            id: 3, 
            title: "PSFS Questionnaire", 
            status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
            questionnaire: "psfs"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
            questionnaire: "mkq"
          }
        ];
      }
      
      // Day 4
      else if (day === 4) {
        return [
          { 
            id: 1, 
            title: "HIT-6 Questionnaire", 
            status: completedQuestionnaires['hit-6'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hit-6'] ? undefined : "/questionnaire/hit-6",
            questionnaire: "hit-6"
          },
          { 
            id: 2, 
            title: "MIDAS Questionnaire", 
            status: completedQuestionnaires['midas'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['midas'] ? undefined : "/questionnaire/midas",
            questionnaire: "midas"
          },
          { 
            id: 3, 
            title: "PSC Questionnaire", 
            status: completedQuestionnaires['psc'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
            questionnaire: "psc"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
            questionnaire: "mkq"
          }
        ];
      }
      
      // Day 5
      else if (day === 5) {
        return [
          { 
            id: 1, 
            title: "PSFS Questionnaire", 
            status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
            questionnaire: "psfs"
          },
          { 
            id: 2, 
            title: "HSLOC Questionnaire", 
            status: completedQuestionnaires['hsloc'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hsloc'] ? undefined : "/questionnaire/hsloc",
            questionnaire: "hsloc"
          },
          { 
            id: 3, 
            title: "PSC Questionnaire", 
            status: completedQuestionnaires['psc'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
            questionnaire: "psc"
          },
          { 
            id: 4, 
            title: "MKQ Questionnaire", 
            status: completedQuestionnaires['mkq'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['mkq'] ? undefined : "/questionnaire/mkq",
            questionnaire: "mkq"
          }
        ];
      }
      
      // Day 6
      else if (day === 6) {
        return [
          { 
            id: 1, 
            title: "HSES Questionnaire", 
            status: completedQuestionnaires['hses'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hses'] ? undefined : "/questionnaire/hses",
            questionnaire: "hses"
          },
          { 
            id: 2, 
            title: "HB Questionnaire", 
            status: completedQuestionnaires['hb'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hb'] ? undefined : "/questionnaire/hb",
            questionnaire: "hb"
          }
        ];
      }
      
      // Day 7
      else if (day === 7) {
        return [
          { 
            id: 1, 
            title: "HSES Questionnaire", 
            status: completedQuestionnaires['hses'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hses'] ? undefined : "/questionnaire/hses",
            questionnaire: "hses"
          },
          { 
            id: 2, 
            title: "HSLOC Questionnaire", 
            status: completedQuestionnaires['hsloc'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hsloc'] ? undefined : "/questionnaire/hsloc",
            questionnaire: "hsloc"
          },
          { 
            id: 3, 
            title: "HB Questionnaire", 
            status: completedQuestionnaires['hb'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['hb'] ? undefined : "/questionnaire/hb",
            questionnaire: "hb"
          },
          { 
            id: 4, 
            title: "PSC Questionnaire", 
            status: completedQuestionnaires['psc'] ? "completed" : "not-started",
            type: "questionnaire",
            link: completedQuestionnaires['psc'] ? undefined : "/questionnaire/psc",
            questionnaire: "psc"
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
