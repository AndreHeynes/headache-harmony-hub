import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "@/components/phase/TaskItem";

interface PhaseThreeTaskListProps {
  day: number;
}

const PhaseThreeTaskList: React.FC<PhaseThreeTaskListProps> = ({ day }) => {
  // Tasks for each day
  const getDayTasks = (day: number) => {
    switch (day) {
      case 1:
        return [
          {
            id: 1,
            title: "Complete HIT-6 Assessment",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "questionnaire" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Complete MIDAS Assessment",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "questionnaire" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Complete PSFS Assessment",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "questionnaire" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 4,
            title: "Review Phase 3 Guide",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 2:
        return [
          {
            id: 1,
            title: "Review Headache Diary",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "default" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Complete Progress Analysis Worksheet",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Progress Assessment Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 3:
        return [
          {
            id: 1,
            title: "Create Maintenance Exercise Schedule",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Record Most Effective Exercises",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Maintenance Planning Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 4:
        return [
          {
            id: 1,
            title: "Update Trigger Journal",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Complete Trigger Response Plan",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Trigger Management Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 5:
        return [
          {
            id: 1,
            title: "Create Relapse Prevention Plan",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Identify Personal Warning Signs",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Relapse Prevention Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 6:
        return [
          {
            id: 1,
            title: "Complete Healthcare Communication Worksheet",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Prepare Questions for Healthcare Provider",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Self-Advocacy Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      case 7:
        return [
          {
            id: 1,
            title: "Review Maintenance Plan",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "document" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 2,
            title: "Complete Phase 3 Feedback Survey",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "questionnaire" as "questionnaire" | "document" | "default" | "video"
          },
          {
            id: 3,
            title: "Watch Phase 4 Introduction Video",
            status: "not-started" as "not-started" | "in-progress" | "completed",
            type: "video" as "questionnaire" | "document" | "default" | "video"
          }
        ];
      default:
        return [];
    }
  };

  const tasks = getDayTasks(day);

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
                onClick={() => console.log(`Task ${task.id} clicked`)}
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

export default PhaseThreeTaskList;
