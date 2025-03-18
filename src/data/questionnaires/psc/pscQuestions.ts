
import { QuestionnaireSection } from "@/types/questionnaire";

// Helper function to create radio question options
const createRadioOptions = (prefix: string) => [
  { id: `${prefix}-1`, text: "1 - Strongly Disagree", value: 1 },
  { id: `${prefix}-2`, text: "2 - Disagree", value: 2 },
  { id: `${prefix}-3`, text: "3 - Undecided/Unsure", value: 3 },
  { id: `${prefix}-4`, text: "4 - Agree", value: 4 },
  { id: `${prefix}-5`, text: "5 - Strongly Agree", value: 5 }
];

export const pscQuestions: QuestionnaireSection[] = [
  {
    id: "psc-main",
    title: "Pain Stages of Change",
    questions: [
      {
        id: "psc-intro",
        type: "info",
        text: "Circle the response that best describes how much you agree or disagree with each statement.\n\n1 = Strongly Disagree\n2 = Disagree\n3 = Undecided/Unsure\n4 = Agree\n5 = Strongly Agree"
      },
      {
        id: "psc-q1",
        type: "radio",
        text: "1. I have been thinking that the way I cope with my pain could improve.",
        required: true,
        options: createRadioOptions("psc-q1")
      },
      {
        id: "psc-q2",
        type: "radio",
        text: "2. I am developing new ways to cope with my pain.",
        required: true,
        options: createRadioOptions("psc-q2")
      },
      {
        id: "psc-q3",
        type: "radio",
        text: "3. I have learned some effective ways to keep my pain problem from interfering with my life.",
        required: true,
        options: createRadioOptions("psc-q3")
      },
      {
        id: "psc-q4",
        type: "radio",
        text: "4. When my pain flares up, I find myself automatically using coping strategies that have worked in the past, such as a relaxation exercise or mental distraction technique.",
        required: true,
        options: createRadioOptions("psc-q4")
      },
      {
        id: "psc-q5",
        type: "radio",
        text: "5. I am using some strategies that help me better deal with my pain problem on a day-to-day basis.",
        required: true,
        options: createRadioOptions("psc-q5")
      }
    ]
  },
  {
    id: "psc-main-2",
    title: "Pain Stages of Change (continued)",
    questions: [
      {
        id: "psc-q6",
        type: "radio",
        text: "6. I have started to come up with strategies to help myself control my pain.",
        required: true,
        options: createRadioOptions("psc-q6")
      },
      {
        id: "psc-q7",
        type: "radio",
        text: "7. I have recently realized that there is no medical cure for my pain condition, and I want to learn some ways to cope with it.",
        required: true,
        options: createRadioOptions("psc-q7")
      },
      {
        id: "psc-q8",
        type: "radio",
        text: "8. Even if my pain doesn't go away, I am ready to start changing how I deal with it.",
        required: true,
        options: createRadioOptions("psc-q8")
      },
      {
        id: "psc-q9",
        type: "radio",
        text: "9. I realize now that it is time for me to develop a better plan to cope with my pain problem.",
        required: true,
        options: createRadioOptions("psc-q9")
      },
      {
        id: "psc-q10",
        type: "radio",
        text: "10. I use what I have learned to help keep my pain under control.",
        required: true,
        options: createRadioOptions("psc-q10")
      }
    ]
  },
  {
    id: "psc-main-3",
    title: "Pain Stages of Change (continued)",
    questions: [
      {
        id: "psc-q11",
        type: "radio",
        text: "11. I have tried everything that people have recommended to manage my pain, and nothing helps.",
        required: true,
        options: createRadioOptions("psc-q11")
      },
      {
        id: "psc-q12",
        type: "radio",
        text: "12. My pain is a medical problem, and I should be dealing with physicians about it.",
        required: true,
        options: createRadioOptions("psc-q12")
      },
      {
        id: "psc-q13",
        type: "radio",
        text: "13. I am currently using some suggestions people have made about how to live with my pain problem.",
        required: true,
        options: createRadioOptions("psc-q13")
      },
      {
        id: "psc-q14",
        type: "radio",
        text: "14. I am beginning to wonder if I need to get some help to develop skills for dealing with my pain.",
        required: true,
        options: createRadioOptions("psc-q14")
      },
      {
        id: "psc-q15",
        type: "radio",
        text: "15. I have recently figured out that it's up to me to deal better with my pain.",
        required: true,
        options: createRadioOptions("psc-q15")
      }
    ]
  },
  {
    id: "psc-interpretation",
    title: "Interpretation",
    questions: [
      {
        id: "psc-interpretation-info",
        type: "info",
        text: "Interpretation:\n\nCalculate responses and divide by 7, i.e., Total/7 = Outcome\n\nPrecontemplation: < 8\nContemplation: >8 - 11\nPreparation/Action: > 11 - 14\n\nOutput:\nProvide clients with Activity Sheets"
      }
    ]
  }
];
