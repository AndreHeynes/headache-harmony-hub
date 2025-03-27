
import { Exercise } from "../types";

// Activity sheets based on readiness for change (from PSC)
export const activitySheets: Exercise[] = [
  {
    id: "as-1",
    title: "Improved Readiness for Change",
    description: "Activities to help you move forward in your pain management journey",
    type: "activity",
    activitySheetName: "AS 1 Improved Readiness for Change",
    activitySheetId: "readiness-for-change",
    requiresInput: true
  },
  {
    id: "as-2",
    title: "Developing Helpful Beliefs",
    description: "Exercises to identify and modify beliefs about your pain",
    type: "activity",
    activitySheetName: "AS 2 Developing Helpful Beliefs",
    activitySheetId: "helpful-beliefs",
    requiresInput: true
  },
  {
    id: "as-3",
    title: "Introduction to Headache Mechanisms",
    description: "Learn about the science behind headaches and how they work",
    type: "activity",
    activitySheetName: "AS 3 Introduction to Headache Mechanisms",
    activitySheetId: "headache-mechanisms",
    requiresInput: false
  },
  {
    id: "as-4",
    title: "Sleep Hygiene",
    description: "Techniques to improve sleep quality and reduce headaches",
    type: "activity",
    activitySheetName: "AS 4 Sleep Hygiene",
    activitySheetId: "sleep-hygiene",
    requiresInput: true
  },
  {
    id: "as-5",
    title: "Trigger Management",
    description: "Techniques to identify and manage headache triggers",
    type: "activity",
    activitySheetName: "AS 5 Trigger Management",
    activitySheetId: "trigger-management",
    requiresInput: true
  },
  {
    id: "as-5.1",
    title: "Medication Management",
    description: "Strategies for effective use of headache medications",
    type: "activity",
    activitySheetName: "AS 5.1 Medication Management",
    activitySheetId: "medication-management",
    requiresInput: true
  },
  {
    id: "mhej",
    title: "Mindful Headache Experience Journal",
    description: "Journal for tracking your mindful experiences with headaches",
    type: "activity",
    activitySheetName: "Mindful Headache Experience Journal",
    activitySheetId: "mindful-headache-journal",
    requiresInput: true
  }
];
