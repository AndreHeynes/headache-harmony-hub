
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
  
  // Day 8 will show a different set of tasks (feedback day)
  if (day === 8) {
    const allCompleted = Object.keys(completedQuestionnaires).length >= 4;
    
    if (allCompleted) {
      return [
        {
          id: 1,
          title: "Review Phase 3 Progress Summary",
          status: "not-started",
          type: "content",
        },
        {
          id: 2,
          title: "Review Questionnaire Results",
          status: "not-started",
          type: "content",
        }
      ];
    } else {
      // If not all questionnaires are completed
      return [
        {
          id: 1,
          title: "Complete all assessments to view feedback",
          status: "not-started",
          type: "warning",
        }
      ];
    }
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
