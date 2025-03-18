
import { Questionnaire } from "@/types/questionnaire";

export const hbQuestionnaire: Questionnaire = {
  id: "hb",
  title: "Headache Beliefs",
  description: "This questionnaire helps identify your beliefs about headache causes and supports.",
  instructions: "Please select any beliefs that apply to you regarding the causes or reasons for your headaches.",
  sections: [
    {
      id: "hb-beliefs",
      title: "Headache Beliefs",
      questions: [
        {
          id: "hb-intro",
          type: "info",
          text: "What are the known Headache Pain beliefs? Do you recognize any of these?"
        },
        {
          id: "hb-organic",
          type: "checkbox",
          text: "Organic causes:",
          options: [
            { id: "hb-org-genetics", text: "Genetics", value: "genetics" },
            { id: "hb-org-physiological", text: "Physiological needs (hunger, thirst, dehydration)", value: "physiological" },
            { id: "hb-org-tissue", text: "Tissue damage (car accidents, trauma)", value: "tissue_damage" },
            { id: "hb-org-surgery", text: "Surgery", value: "surgery" },
            { id: "hb-org-lifting", text: "Lifting/moving heavy objects", value: "lifting" }
          ]
        },
        {
          id: "hb-psychological",
          type: "checkbox",
          text: "Psychological causes:",
          options: [
            { id: "hb-psych-stress", text: "Stress", value: "stress" },
            { id: "hb-psych-sadness", text: "Sadness", value: "sadness" },
            { id: "hb-psych-sensitive", text: "Sensitive personality", value: "sensitive" },
            { id: "hb-psych-interpersonal", text: "Interpersonal relationships (marriage, work, etc.)", value: "interpersonal" },
            { id: "hb-psych-anxiety", text: "Future anxiety (about Headache or other)", value: "anxiety" },
            { id: "hb-psych-anticipation", text: "Pain anticipation", value: "anticipation" }
          ]
        },
        {
          id: "hb-environmental",
          type: "checkbox",
          text: "Environmental causes:",
          options: [
            { id: "hb-env-air", text: "Change of air (wind, feeling cold)", value: "air" },
            { id: "hb-env-seasonal", text: "Seasonal changes", value: "seasonal" },
            { id: "hb-env-smoking", text: "Smoking", value: "smoking" },
            { id: "hb-env-noise", text: "Noise", value: "noise" }
          ]
        },
        {
          id: "hb-family",
          type: "checkbox",
          text: "Family support beliefs:",
          options: [
            { id: "hb-fam-sad", text: "To be sad for sufferer, from family", value: "sad_family" },
            { id: "hb-fam-impact", text: "Family gets used to or impact of pain", value: "family_impact" },
            { id: "hb-fam-disbelief", text: "Do not believe the pain", value: "family_disbelief" },
            { id: "hb-fam-rearrange", text: "To rearrange surroundings", value: "rearrange" },
            { id: "hb-fam-medication", text: "To suggest taking medication", value: "suggest_medication" }
          ]
        },
        {
          id: "hb-nonfamily",
          type: "checkbox",
          text: "Non-family support beliefs:",
          options: [
            { id: "hb-nonfam-misunderstand", text: "Don't understand pain", value: "misunderstand" },
            { id: "hb-nonfam-disbelief", text: "Don't believe the pain", value: "disbelief" },
            { id: "hb-nonfam-negative", text: "Negative support or suggestions", value: "negative" }
          ]
        }
      ]
    }
  ]
};
