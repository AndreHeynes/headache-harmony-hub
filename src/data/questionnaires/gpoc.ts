
import { Questionnaire } from "@/types/questionnaire";

export const gpocQuestionnaire: Questionnaire = {
  id: "gpoc",
  title: "Global Perception of Change",
  description: "This questionnaire helps us understand how you feel your condition has changed since beginning treatment.",
  instructions: "Since beginning treatment, how would you describe the change (if any) in your headaches and related symptoms?",
  sections: [
    {
      id: "gpoc-main",
      title: "Global Perception of Change",
      questions: [
        {
          id: "gpoc-q1",
          type: "radio",
          text: "Please select the one answer that best describes how your headache condition is now, compared to how it was before beginning treatment.",
          required: true,
          options: [
            { id: "gpoc-1", text: "Very much improved", value: 1 },
            { id: "gpoc-2", text: "Much improved", value: 2 },
            { id: "gpoc-3", text: "Minimally improved", value: 3 },
            { id: "gpoc-4", text: "No change", value: 4 },
            { id: "gpoc-5", text: "Minimally worse", value: 5 },
            { id: "gpoc-6", text: "Much worse", value: 6 },
            { id: "gpoc-7", text: "Very much worse", value: 7 }
          ]
        },
        {
          id: "gpoc-comments",
          type: "text", // Changed from "textarea" to "text" which is an allowed QuestionType
          text: "Comments (optional)",
          required: false
        }
      ]
    }
  ],
  interpretations: {
    ranges: [] // Empty ranges array instead of 'custom' property to match the expected type
  }
};
