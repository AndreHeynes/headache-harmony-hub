
import { Questionnaire } from "@/types/questionnaire";

export const headacheTypeQuestionnaire: Questionnaire = {
  id: "headache-type",
  title: "Your Familiar Headache Symptoms",
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
          text: "This questionnaire will help identify what type of headache you may be experiencing. The results can guide your treatment plan."
        },
        {
          id: "headache-types",
          type: "checkbox",
          text: "Please select any headache types that match your symptoms:",
          required: true,
          options: [
            { 
              id: "type-1", 
              text: "Type 1: Migraine without Aura - At least five attacks, headache lasting 4-72 hours, unilateral, moderate or severe pain intensity", 
              value: "migraine-without-aura" 
            },
            { 
              id: "type-2", 
              text: "Type 2: Migraine with Aura - At least two attacks, one or more fully reversible aura symptoms (visual, sensory, speech/language)",
              value: "migraine-with-aura" 
            },
            { 
              id: "type-3", 
              text: "Type 3: TTH - At least 10 episodes, bilateral location, pressing/tightening (non-pulsating) quality, mild to moderate intensity",
              value: "tension-type-headache" 
            },
            { 
              id: "type-4", 
              text: "Type 4: Occipital Neuralgia - Unilateral or bilateral pain in the distribution of the greater, lesser and/or third occipital nerves",
              value: "occipital-neuralgia" 
            },
            { 
              id: "type-5", 
              text: "Type 5: Cervicogenic - Headache has developed in temporal relation to the onset of the cervical disorder",
              value: "cervicogenic" 
            },
            { 
              id: "type-6", 
              text: "Type 6: TMD related - Headache is aggravated by jaw motion, jaw function or jaw parafunction",
              value: "tmd-related" 
            }
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
        },
        {
          id: "headache-triggers",
          type: "checkbox",
          text: "What triggers or worsens your headaches?",
          options: [
            { id: "trigger-stress", text: "Stress or anxiety", value: "stress" },
            { id: "trigger-sleep", text: "Sleep disturbances", value: "sleep" },
            { id: "trigger-food", text: "Certain foods or drinks", value: "food" },
            { id: "trigger-hormonal", text: "Hormonal changes", value: "hormonal" },
            { id: "trigger-weather", text: "Weather changes", value: "weather" },
            { id: "trigger-screen", text: "Screen time/bright lights", value: "screen" },
            { id: "trigger-physical", text: "Physical activity", value: "physical" },
            { id: "trigger-posture", text: "Poor posture/neck position", value: "posture" }
          ]
        }
      ]
    }
  ]
};
