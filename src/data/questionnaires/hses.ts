
import { Questionnaire } from "@/types/questionnaire";

export const hsesQuestionnaire: Questionnaire = {
  id: "hses",
  title: "Headache Self-Efficacy Scale (HSES)",
  description: "Rate your confidence in your ability to take action that may prevent the occurrence of a moderately painful headache.",
  instructions: "Please rate your confidence in your ability to take some action that may prevent the occurrence of a moderately painful headache by selecting one of the following for each statement.",
  sections: [
    {
      id: "hses-intro",
      title: "Introduction",
      questions: [
        {
          id: "hses-info",
          type: "info",
          text: "1 = \"very confident,\"\n2 = \"pretty confident,\"\n3 = \"somewhat confident,\"\n4 = \"little confidence,\"\n5 = \"no confidence\""
        }
      ]
    },
    {
      id: "hses-environmental",
      title: "ENVIRONMENTAL",
      questions: [
        {
          id: "hses-e1",
          type: "radio",
          text: "When you are out in the direct sun",
          required: true,
          options: [
            { id: "hses-e1-1", text: "1 - Very confident", value: 1 },
            { id: "hses-e1-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-e1-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-e1-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-e1-5", text: "5 - No confidence", value: 5 }
          ]
        },
        {
          id: "hses-e2",
          type: "radio",
          text: "When you are riding in a car",
          required: true,
          options: [
            { id: "hses-e2-1", text: "1 - Very confident", value: 1 },
            { id: "hses-e2-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-e2-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-e2-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-e2-5", text: "5 - No confidence", value: 5 }
          ]
        },
        {
          id: "hses-e3",
          type: "radio",
          text: "When there are bright lights or noise",
          required: true,
          options: [
            { id: "hses-e3-1", text: "1 - Very confident", value: 1 },
            { id: "hses-e3-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-e3-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-e3-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-e3-5", text: "5 - No confidence", value: 5 }
          ]
        },
        {
          id: "hses-e4",
          type: "radio",
          text: "When you spend time out in the summer heat",
          required: true,
          options: [
            { id: "hses-e4-1", text: "1 - Very confident", value: 1 },
            { id: "hses-e4-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-e4-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-e4-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-e4-5", text: "5 - No confidence", value: 5 }
          ]
        },
        {
          id: "hses-e5",
          type: "radio",
          text: "When you are cold",
          required: true,
          options: [
            { id: "hses-e5-1", text: "1 - Very confident", value: 1 },
            { id: "hses-e5-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-e5-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-e5-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-e5-5", text: "5 - No confidence", value: 5 }
          ]
        }
      ]
    },
    {
      id: "hses-work",
      title: "WORK-RELATED",
      questions: [
        {
          id: "hses-w1",
          type: "radio",
          text: "When you're rushing around at work or school",
          required: true,
          options: [
            { id: "hses-w1-1", text: "1 - Very confident", value: 1 },
            { id: "hses-w1-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-w1-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-w1-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-w1-5", text: "5 - No confidence", value: 5 }
          ]
        },
        {
          id: "hses-w2",
          type: "radio",
          text: "When you're not able to get everything done that you had planned to get done",
          required: true,
          options: [
            { id: "hses-w2-1", text: "1 - Very confident", value: 1 },
            { id: "hses-w2-2", text: "2 - Pretty confident", value: 2 },
            { id: "hses-w2-3", text: "3 - Somewhat confident", value: 3 },
            { id: "hses-w2-4", text: "4 - Little confidence", value: 4 },
            { id: "hses-w2-5", text: "5 - No confidence", value: 5 }
          ]
        }
      ]
    }
  ],
  interpretations: {
    ranges: [
      {
        min: 55,
        max: 101,
        text: "High self-efficacy: You feel confident in your ability to prevent or manage headaches in various situations."
      },
      {
        min: 102,
        max: 153,
        text: "Medium self-efficacy: You have moderate confidence in your ability to prevent or manage headaches."
      },
      {
        min: 154,
        max: 255,
        text: "Low self-efficacy: You have limited confidence in your ability to prevent or manage headaches."
      }
    ]
  },
  scoring: {
    type: 'sum',
    groups: [
      {
        id: 'hses_total',
        name: 'HSES Total Score',
        items: [
          'hses-e1', 'hses-e2', 'hses-e3', 'hses-e4', 'hses-e5',
          'hses-w1', 'hses-w2'
          // Additional items would be added for the complete questionnaire
        ]
      }
    ]
  }
};
