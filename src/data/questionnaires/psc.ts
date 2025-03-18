import { Questionnaire } from "@/types/questionnaire";

export const pscQuestionnaire: Questionnaire = {
  id: "psc",
  title: "Pain Stages of Change Questionnaire",
  description: "This questionnaire helps us better understand the way you view your pain problem.",
  instructions: "Each statement describes how you may feel about this problem. Please indicate the extent to which you tend to agree or disagree with each statement. In each case, make your choice based on how you feel right now, not how you have felt in the past or how you would like to feel.",
  sections: [
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
          options: [
            { id: "psc-q1-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q1-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q1-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q1-4", text: "4 - Agree", value: 4 },
            { id: "psc-q1-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q2",
          type: "radio",
          text: "2. I am developing new ways to cope with my pain.",
          required: true,
          options: [
            { id: "psc-q2-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q2-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q2-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q2-4", text: "4 - Agree", value: 4 },
            { id: "psc-q2-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q3",
          type: "radio",
          text: "3. I have learned some effective ways to keep my pain problem from interfering with my life.",
          required: true,
          options: [
            { id: "psc-q3-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q3-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q3-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q3-4", text: "4 - Agree", value: 4 },
            { id: "psc-q3-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q4",
          type: "radio",
          text: "4. When my pain flares up, I find myself automatically using coping strategies that have worked in the past, such as a relaxation exercise or mental distraction technique.",
          required: true,
          options: [
            { id: "psc-q4-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q4-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q4-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q4-4", text: "4 - Agree", value: 4 },
            { id: "psc-q4-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q5",
          type: "radio",
          text: "5. I am using some strategies that help me better deal with my pain problem on a day-to-day basis.",
          required: true,
          options: [
            { id: "psc-q5-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q5-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q5-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q5-4", text: "4 - Agree", value: 4 },
            { id: "psc-q5-5", text: "5 - Strongly Agree", value: 5 }
          ]
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
          options: [
            { id: "psc-q6-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q6-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q6-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q6-4", text: "4 - Agree", value: 4 },
            { id: "psc-q6-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q7",
          type: "radio",
          text: "7. I have recently realized that there is no medical cure for my pain condition, and I want to learn some ways to cope with it.",
          required: true,
          options: [
            { id: "psc-q7-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q7-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q7-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q7-4", text: "4 - Agree", value: 4 },
            { id: "psc-q7-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q8",
          type: "radio",
          text: "8. Even if my pain doesn't go away, I am ready to start changing how I deal with it.",
          required: true,
          options: [
            { id: "psc-q8-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q8-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q8-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q8-4", text: "4 - Agree", value: 4 },
            { id: "psc-q8-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q9",
          type: "radio",
          text: "9. I realize now that it is time for me to develop a better plan to cope with my pain problem.",
          required: true,
          options: [
            { id: "psc-q9-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q9-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q9-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q9-4", text: "4 - Agree", value: 4 },
            { id: "psc-q9-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q10",
          type: "radio",
          text: "10. I use what I have learned to help keep my pain under control.",
          required: true,
          options: [
            { id: "psc-q10-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q10-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q10-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q10-4", text: "4 - Agree", value: 4 },
            { id: "psc-q10-5", text: "5 - Strongly Agree", value: 5 }
          ]
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
          options: [
            { id: "psc-q11-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q11-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q11-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q11-4", text: "4 - Agree", value: 4 },
            { id: "psc-q11-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q12",
          type: "radio",
          text: "12. My pain is a medical problem, and I should be dealing with physicians about it.",
          required: true,
          options: [
            { id: "psc-q12-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q12-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q12-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q12-4", text: "4 - Agree", value: 4 },
            { id: "psc-q12-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q13",
          type: "radio",
          text: "13. I am currently using some suggestions people have made about how to live with my pain problem.",
          required: true,
          options: [
            { id: "psc-q13-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q13-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q13-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q13-4", text: "4 - Agree", value: 4 },
            { id: "psc-q13-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q14",
          type: "radio",
          text: "14. I am beginning to wonder if I need to get some help to develop skills for dealing with my pain.",
          required: true,
          options: [
            { id: "psc-q14-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q14-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q14-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q14-4", text: "4 - Agree", value: 4 },
            { id: "psc-q14-5", text: "5 - Strongly Agree", value: 5 }
          ]
        },
        {
          id: "psc-q15",
          type: "radio",
          text: "15. I have recently figured out that it's up to me to deal better with my pain.",
          required: true,
          options: [
            { id: "psc-q15-1", text: "1 - Strongly Disagree", value: 1 },
            { id: "psc-q15-2", text: "2 - Disagree", value: 2 },
            { id: "psc-q15-3", text: "3 - Undecided/Unsure", value: 3 },
            { id: "psc-q15-4", text: "4 - Agree", value: 4 },
            { id: "psc-q15-5", text: "5 - Strongly Agree", value: 5 }
          ]
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
  ],
  scoring: {
    type: 'custom',
    groups: [
      {
        id: 'precontemplation',
        name: 'Precontemplation',
        items: ['psc-q11', 'psc-q12', 'psc-q22', 'psc-q24', 'psc-q25', 'psc-q29'],
        interpretation: {
          ranges: [
            { min: 0, max: 8, text: "Precontemplation Stage - Not ready to change" }
          ]
        }
      },
      {
        id: 'contemplation',
        name: 'Contemplation',
        items: ['psc-q1', 'psc-q7', 'psc-q8', 'psc-q9', 'psc-q14', 'psc-q15', 'psc-q21'],
        interpretation: {
          ranges: [
            { min: 9, max: 11, text: "Contemplation Stage - Thinking about change" }
          ]
        }
      },
      {
        id: 'action',
        name: 'Action',
        items: ['psc-q2', 'psc-q6', 'psc-q20', 'psc-q26', 'psc-q27', 'psc-q30'],
        interpretation: {
          ranges: [
            { min: 12, max: 14, text: "Preparation/Action Stage - Taking steps to change" }
          ]
        }
      },
      {
        id: 'maintenance',
        name: 'Maintenance',
        items: ['psc-q3', 'psc-q4', 'psc-q5', 'psc-q10', 'psc-q13', 'psc-q17', 'psc-q18'],
        interpretation: {
          ranges: [
            { min: 15, max: 30, text: "Maintenance Stage - Working to maintain changes" }
          ]
        }
      }
    ]
  }
};
