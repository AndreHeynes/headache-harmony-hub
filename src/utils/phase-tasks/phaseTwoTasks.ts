
import { Task } from "@/types/task";
import { CompletedQuestionnairesMap } from "./types";

/**
 * Generates tasks for Phase 2 based on the current day
 */
export const getPhaseTwoTasks = (
  day: number,
  completedQuestionnaires: CompletedQuestionnairesMap = {}
): Task[] => {
  // Placeholder for Phase 2 tasks
  return [
    {
      id: 1,
      title: "Daily Exercise Routine",
      status: "not-started",
      type: "default"
    },
    {
      id: 2,
      title: "Track Headache Symptoms",
      status: "not-started",
      type: "default"
    }
  ];
};
