
import { Questionnaire } from "@/types/questionnaire";

export const fhtQuestionnaire: Questionnaire = {
  id: "fht",
  title: "Familiar Headache Symptoms",
  description: "This questionnaire helps identify what type of headache you may be experiencing.",
  instructions: "Please select any type or types from the groups below that best describe your headache(s).",
  sections: [
    {
      id: "headache-type-main",
      title: "Headache Classification",
      questions: [
        {
          id: "headache-intro",
          type: "info",
          text: "This questionnaire will help identify what type of headache you may be experiencing. The results can guide your treatment plan and recommended exercises."
        },
        {
          id: "headache-types",
          type: "checkbox",
          text: "Please select any headache types that match your symptoms:",
          required: true,
          options: [
            { 
              id: "type-1", 
              text: "Type 1: At least five attacks, headache lasting 4-72 hours, unilateral, moderate or severe pain intensity", 
              value: "1" 
            },
            { 
              id: "type-2", 
              text: "Type 2: At least two attacks, one or more fully reversible aura symptoms (visual, sensory, speech/language)",
              value: "2" 
            },
            { 
              id: "type-3", 
              text: "Type 3: At least 10 episodes, bilateral location, pressing/tightening (non-pulsating) quality, mild to moderate intensity",
              value: "3" 
            },
            { 
              id: "type-4", 
              text: "Type 4: Unilateral or bilateral pain in the distribution of the greater, lesser and/or third occipital nerves",
              value: "4" 
            },
            { 
              id: "type-5", 
              text: "Type 5: Headache has developed in temporal relation to the onset of the cervical disorder",
              value: "5" 
            },
            { 
              id: "type-6", 
              text: "Type 6: Headache is aggravated by jaw motion, jaw function or jaw parafunction",
              value: "6" 
            }
          ]
        },
        {
          id: "headache-laterality",
          type: "radio",
          text: "On which side do you typically experience your headache symptoms?",
          required: true,
          options: [
            { id: "laterality-right", text: "Right side only", value: "right" },
            { id: "laterality-left", text: "Left side only", value: "left" },
            { id: "laterality-bilateral", text: "Both sides (bilateral)", value: "bilateral" },
            { id: "laterality-varies", text: "It varies or alternates sides", value: "varies" }
          ]
        }
      ]
    },
    {
      id: "headache-details",
      title: "Headache Details",
      questions: [
        {
          id: "headache-frequency",
          type: "radio",
          text: "How frequently do you experience headaches?",
          required: true,
          options: [
            { id: "freq-daily", text: "Daily or near-daily", value: "daily" },
            { id: "freq-weekly", text: "Several times per week", value: "weekly" },
            { id: "freq-monthly", text: "Several times per month", value: "monthly" },
            { id: "freq-occasional", text: "Occasionally (less than monthly)", value: "occasional" }
          ]
        },
        {
          id: "headache-severity",
          type: "radio",
          text: "On average, how severe are your headaches?",
          required: true,
          options: [
            { id: "sev-mild", text: "Mild - I can function normally", value: "mild" },
            { id: "sev-moderate", text: "Moderate - Somewhat interferes with activities", value: "moderate" },
            { id: "sev-severe", text: "Severe - Significantly limits activities", value: "severe" },
            { id: "sev-extreme", text: "Extreme - Unable to function, bed rest required", value: "extreme" }
          ]
        }
      ]
    }
  ],
  recommendedExercises: {
    typeMap: {
      "1": ["ex_001", "ex_002", "ex_003"], // Type 1 exercises
      "2": ["ex_002", "ex_004", "ex_005"], // Type 2 exercises
      "3": ["ex_006", "ex_007", "ex_008"], // Type 3 exercises
      "4": ["ex_009", "ex_010", "ex_011"], // Type 4 exercises
      "5": ["ex_012", "ex_013", "ex_014"], // Type 5 exercises
      "6": ["ex_015", "ex_016", "ex_017"]  // Type 6 exercises
    }
  }
};
