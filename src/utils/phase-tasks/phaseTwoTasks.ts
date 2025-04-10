
import { Task } from "@/types/task";
import { CompletedQuestionnairesMap } from "./types";

/**
 * Generates tasks for Phase 2 based on the current day
 */
export const getPhaseTwoTasks = (
  day: number,
  completedQuestionnaires: CompletedQuestionnairesMap = {}
): Task[] => {
  // Activity sheets are recommended based on the day number
  const activitySheets = getActivitySheetsForDay(day);
  
  // Regular exercise tasks
  const tasks: Task[] = [
    {
      id: 1,
      title: "Complete Today's Exercise Routine",
      description: "Complete your recommended daily exercises",
      status: "not-started",
      type: "default"
    },
    {
      id: 2,
      title: "Track Headache Symptoms",
      description: "Record any headaches experienced today",
      status: "not-started",
      type: "default"
    }
  ];
  
  // Add activity sheet tasks if there are any for this day
  if (activitySheets.length > 0) {
    activitySheets.forEach((sheet, index) => {
      tasks.push({
        id: 3 + index,
        title: `Complete ${sheet.name} Activity`,
        description: sheet.description,
        status: "not-started",
        type: "default"
      });
    });
  }
  
  return tasks;
};

/**
 * Determines which activity sheets should be recommended for a specific day
 */
const getActivitySheetsForDay = (day: number): Array<{name: string, description: string}> => {
  // Days 1-21: AS1, AS2, AS3, AS4, AS5
  if (day >= 1 && day <= 21) {
    return [
      { name: "Improved Readiness for Change (AS1)", description: "Activities to help you move forward in your recovery journey" },
      { name: "Developing Helpful Beliefs (AS2)", description: "Working on positive beliefs about your headaches" },
      { name: "Introduction to Headache Mechanisms (AS3)", description: "Learning about how headaches work" },
      { name: "Sleep Hygiene (AS4)", description: "Improving your sleep quality" },
      { name: "Trigger Management (AS5)", description: "Identifying and managing headache triggers" }
    ];
  }
  // Days 22-28: AS1, AS2, AS3, AS4, AS5
  else if (day >= 22 && day <= 28) {
    return [
      { name: "Improved Readiness for Change (AS1)", description: "Activities to help you move forward in your recovery journey" },
      { name: "Developing Helpful Beliefs (AS2)", description: "Working on positive beliefs about your headaches" },
      { name: "Introduction to Headache Mechanisms (AS3)", description: "Learning about how headaches work" },
      { name: "Sleep Hygiene (AS4)", description: "Improving your sleep quality" },
      { name: "Trigger Management (AS5)", description: "Identifying and managing headache triggers" }
    ];
  }
  // Days 29-35: AS1, AS2, AS3, AS4, AS5.1
  else if (day >= 29 && day <= 35) {
    return [
      { name: "Improved Readiness for Change (AS1)", description: "Activities to help you move forward in your recovery journey" },
      { name: "Developing Helpful Beliefs (AS2)", description: "Working on positive beliefs about your headaches" },
      { name: "Introduction to Headache Mechanisms (AS3)", description: "Learning about how headaches work" },
      { name: "Sleep Hygiene (AS4)", description: "Improving your sleep quality" },
      { name: "Medication Management (AS5.1)", description: "Managing your headache medications effectively" }
    ];
  }
  // Days 36-42: AS3, AS4, AS5.1
  else if (day >= 36 && day <= 42) {
    return [
      { name: "Introduction to Headache Mechanisms (AS3)", description: "Learning about how headaches work" },
      { name: "Sleep Hygiene (AS4)", description: "Improving your sleep quality" },
      { name: "Medication Management (AS5.1)", description: "Managing your headache medications effectively" }
    ];
  }
  // Days 43-49: AS4, AS5.1
  else if (day >= 43 && day <= 49) {
    return [
      { name: "Sleep Hygiene (AS4)", description: "Improving your sleep quality" },
      { name: "Medication Management (AS5.1)", description: "Managing your headache medications effectively" }
    ];
  }
  // Days 50+: AS4
  else if (day >= 50) {
    return [
      { name: "Sleep Hygiene (AS4)", description: "Maintaining good sleep hygiene" }
    ];
  }
  
  // Default - no activity sheets
  return [];
};
