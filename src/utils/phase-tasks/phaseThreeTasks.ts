
import { Task } from "@/types/task";
import { CompletedQuestionnairesMap } from "./types";

/**
 * Generates tasks for Phase 3 based on completed questionnaires
 */
export const getPhaseThreeTasks = (
  day: number,
  completedQuestionnaires: CompletedQuestionnairesMap = {}
): Task[] => {
  console.log("getPhaseThreeTasks - Day:", day);
  
  // Day 8 will show a different set of tasks (no tasks, just instructional text)
  if (day === 8) {
    return [];
  }
  
  // Common tasks for all days in Phase 3 (days 1-7)
  return [
    {
      id: 1,
      title: "Complete HIT-6 Assessment",
      status: completedQuestionnaires['hit-6'] ? "completed" : "not-started",
      type: "questionnaire",
      link: completedQuestionnaires['hit-6'] ? undefined : "/questionnaire/hit-6",
      questionnaire: "hit-6"
    },
    {
      id: 2,
      title: "Complete MIDAS Assessment",
      status: completedQuestionnaires['midas'] ? "completed" : "not-started",
      type: "questionnaire",
      link: completedQuestionnaires['midas'] ? undefined : "/questionnaire/midas",
      questionnaire: "midas"
    },
    {
      id: 3,
      title: "Complete PSFS Assessment",
      status: completedQuestionnaires['psfs'] ? "completed" : "not-started",
      type: "questionnaire",
      link: completedQuestionnaires['psfs'] ? undefined : "/questionnaire/psfs",
      questionnaire: "psfs"
    },
    {
      id: 4,
      title: "Complete Global Perception of Change",
      status: completedQuestionnaires['gpoc'] ? "completed" : "not-started",
      type: "questionnaire",
      link: completedQuestionnaires['gpoc'] ? undefined : "/questionnaire/gpoc",
      questionnaire: "gpoc"
    }
  ];
};
