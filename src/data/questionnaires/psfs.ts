
import { Questionnaire } from "@/types/questionnaire";

export const psfsQuestionnaire: Questionnaire = {
  id: "psfs",
  title: "Patient Specific Functional Scale",
  description: "This tool allows you to identify up to 3 important activities that you are unable to do or are having difficulty with as a result of your headaches.",
  instructions: "Please identify up to three important activities that you are unable to do or are having difficulty with as a result of your headaches. Rate each activity on the scale below.",
  attribution: "Modified from and used with permission from Dr. Paul Stratford and colleagues.",
  sections: [
    {
      id: "psfs-main",
      title: "Activity Rating",
      questions: [
        {
          id: "psfs-intro",
          type: "info",
          text: "For each activity, please rate your current level of ability on a scale of 0 to 10, where 0 means 'unable to perform the activity' and 10 means 'able to perform the activity at the same level as before the headaches'."
        },
        {
          id: "psfs-activity1",
          type: "text",
          text: "Activity 1:",
          required: true,
          activitySaveKey: "activity1"
        },
        {
          id: "psfs-rating1",
          type: "radio",
          text: "Rate your current level of ability for Activity 1:",
          required: true,
          options: [
            { id: "psfs-r1-0", text: "0 - Unable to perform", value: 0 },
            { id: "psfs-r1-1", text: "1", value: 1 },
            { id: "psfs-r1-2", text: "2", value: 2 },
            { id: "psfs-r1-3", text: "3", value: 3 },
            { id: "psfs-r1-4", text: "4", value: 4 },
            { id: "psfs-r1-5", text: "5", value: 5 },
            { id: "psfs-r1-6", text: "6", value: 6 },
            { id: "psfs-r1-7", text: "7", value: 7 },
            { id: "psfs-r1-8", text: "8", value: 8 },
            { id: "psfs-r1-9", text: "9", value: 9 },
            { id: "psfs-r1-10", text: "10 - Able to perform normally", value: 10 }
          ]
        },
        {
          id: "psfs-activity2",
          type: "text",
          text: "Activity 2:",
          activitySaveKey: "activity2"
        },
        {
          id: "psfs-rating2",
          type: "radio",
          text: "Rate your current level of ability for Activity 2:",
          options: [
            { id: "psfs-r2-0", text: "0 - Unable to perform", value: 0 },
            { id: "psfs-r2-1", text: "1", value: 1 },
            { id: "psfs-r2-2", text: "2", value: 2 },
            { id: "psfs-r2-3", text: "3", value: 3 },
            { id: "psfs-r2-4", text: "4", value: 4 },
            { id: "psfs-r2-5", text: "5", value: 5 },
            { id: "psfs-r2-6", text: "6", value: 6 },
            { id: "psfs-r2-7", text: "7", value: 7 },
            { id: "psfs-r2-8", text: "8", value: 8 },
            { id: "psfs-r2-9", text: "9", value: 9 },
            { id: "psfs-r2-10", text: "10 - Able to perform normally", value: 10 }
          ]
        },
        {
          id: "psfs-activity3",
          type: "text",
          text: "Activity 3:",
          activitySaveKey: "activity3"
        },
        {
          id: "psfs-rating3",
          type: "radio",
          text: "Rate your current level of ability for Activity 3:",
          options: [
            { id: "psfs-r3-0", text: "0 - Unable to perform", value: 0 },
            { id: "psfs-r3-1", text: "1", value: 1 },
            { id: "psfs-r3-2", text: "2", value: 2 },
            { id: "psfs-r3-3", text: "3", value: 3 },
            { id: "psfs-r3-4", text: "4", value: 4 },
            { id: "psfs-r3-5", text: "5", value: 5 },
            { id: "psfs-r3-6", text: "6", value: 6 },
            { id: "psfs-r3-7", text: "7", value: 7 },
            { id: "psfs-r3-8", text: "8", value: 8 },
            { id: "psfs-r3-9", text: "9", value: 9 },
            { id: "psfs-r3-10", text: "10 - Able to perform normally", value: 10 }
          ]
        }
      ]
    }
  ],
  scoring: {
    type: 'custom',
    customFunction: 'psfsScoring'
  }
};
