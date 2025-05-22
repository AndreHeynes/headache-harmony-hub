
import { Questionnaire } from "@/types/questionnaire";

export const gpocQuestionnaire: Questionnaire = {
  id: "gpoc",
  title: "Global Impression of Change",
  description: "This questionnaire helps us understand how you feel your condition has changed since beginning treatment.",
  instructions: "Since beginning treatment, how would you describe the change (if any) in ACTIVITY LIMITATIONS, SYMPTOMS, EMOTIONS and OVERALL QUALITY OF LIFE, related to your headache condition?",
  attribution: "Modified from and used with permission from Dr. J. Farrar and colleagues.",
  sections: [
    {
      id: "gpoc-main",
      title: "Global Impression of Change",
      questions: [
        {
          id: "gpoc-q1",
          type: "radio",
          text: "Choose ONE:",
          required: true,
          options: [
            { id: "gpoc-1", text: "No change (or condition has gotten worse)", value: 1 },
            { id: "gpoc-2", text: "Almost the same, hardly any change at all", value: 2 },
            { id: "gpoc-3", text: "A little better, but no noticeable change", value: 3 },
            { id: "gpoc-4", text: "Somewhat better, but the change has not made any real difference", value: 4 },
            { id: "gpoc-5", text: "Moderately better, and a slight but noticeable change", value: 5 },
            { id: "gpoc-6", text: "Better and a definite improvement that has made a real and worthwhile difference", value: 6 },
            { id: "gpoc-7", text: "A great deal better and a considerable improvement that has made all the difference", value: 7 }
          ]
        },
        {
          id: "gpoc-comments",
          type: "text", // Using "text" which is an allowed QuestionType
          text: "Comments (optional)",
          required: false
        }
      ]
    }
  ],
  interpretations: {
    ranges: [] // Empty ranges array to match the expected type
  }
};
