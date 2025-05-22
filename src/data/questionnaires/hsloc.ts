
import { Questionnaire } from "@/types/questionnaire";

export const hslocQuestionnaire: Questionnaire = {
  id: "hsloc",
  title: "Headache Specific Locus of Control (HSLOC)",
  description: "This questionnaire is designed to determine the way in which people view certain important headache-related issues.",
  instructions: "Each item is a belief statement with which you may agree or disagree. Beside each statement are numbers which correspond to a scale on which you may rate the extent to which you agree or disagree with each item. The values range from \"Strongly Disagree\" = 1 to \"Strongly Agree\" = 5.",
  attribution: "Modified from and used with permission from Dr. Robert J. Martin and colleagues.",
  sections: [
    {
      id: "hsloc-intro",
      title: "Introduction",
      questions: [
        {
          id: "hsloc-info",
          type: "info",
          text: "Circle the number that represents the extent to which you disagree or agree with the statement. Please make sure that you answer every item and that you circle only one number per item. This is a measure of your personal beliefs; there are no right or wrong answers.\n\n1 = Strongly Disagree\n2 = Moderately Disagree\n3 = Neutral\n4 = Moderately Agree\n5 = Strongly Agree"
        }
      ]
    },
    {
      id: "hsloc-beliefs",
      title: "Belief Statements",
      questions: [
        {
          id: "hsloc-1",
          type: "radio",
          text: "When I have a headache, there is nothing I can do to affect its course",
          required: true,
          options: [
            { id: "hsloc-1-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "hsloc-1-2", text: "2 - Moderately Disagree", value: 2 },
            { id: "hsloc-1-3", text: "3 - Neutral", value: 3 },
            { id: "hsloc-1-4", text: "4 - Moderately Agree", value: 4 },
            { id: "hsloc-1-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "hsloc-2",
          type: "radio",
          text: "I can prevent some of my headaches by avoiding certain stressful situations",
          required: true,
          options: [
            { id: "hsloc-2-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "hsloc-2-2", text: "2 - Moderately Disagree", value: 2 },
            { id: "hsloc-2-3", text: "3 - Neutral", value: 3 },
            { id: "hsloc-2-4", text: "4 - Moderately Agree", value: 4 },
            { id: "hsloc-2-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "hsloc-3",
          type: "radio",
          text: "I am completely at the mercy of my headaches",
          required: true,
          options: [
            { id: "hsloc-3-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "hsloc-3-2", text: "2 - Moderately Disagree", value: 2 },
            { id: "hsloc-3-3", text: "3 - Neutral", value: 3 },
            { id: "hsloc-3-4", text: "4 - Moderately Agree", value: 4 },
            { id: "hsloc-3-5", text: "5 - Strongly Agree", value: 5 }
          ]
        }
      ]
    }
  ],
  scoring: {
    type: 'custom',
    groups: [
      {
        id: 'internal',
        name: 'Internal Locus of Control',
        items: ['hsloc-2', 'hsloc-4', 'hsloc-5', 'hsloc-7', 'hsloc-11', 'hsloc-17', 'hsloc-19', 'hsloc-21', 'hsloc-26', 'hsloc-28', 'hsloc-32']
      },
      {
        id: 'healthcare',
        name: 'Health Care Professionals Locus of Control',
        items: ['hsloc-6', 'hsloc-8', 'hsloc-10', 'hsloc-12', 'hsloc-14', 'hsloc-15', 'hsloc-16', 'hsloc-22', 'hsloc-24', 'hsloc-27', 'hsloc-30']
      },
      {
        id: 'chance',
        name: 'Chance Locus of Control',
        items: ['hsloc-1', 'hsloc-3', 'hsloc-9', 'hsloc-13', 'hsloc-18', 'hsloc-20', 'hsloc-23', 'hsloc-25', 'hsloc-29', 'hsloc-31', 'hsloc-33']
      }
    ],
    customFunction: 'hslocScoring'
  },
  interpretations: {
    ranges: [
      {
        min: 0,
        max: 100,
        text: "Your beliefs about headache control will be shown here based on your responses."
      }
    ]
  }
};
