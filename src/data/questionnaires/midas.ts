
import { Questionnaire } from "@/types/questionnaire";

export const midasQuestionnaire: Questionnaire = {
  id: "midas",
  title: "Migraine Disability Assessment (MIDAS)",
  description: "This questionnaire helps measure the impact your headaches have on your life.",
  instructions: "Please answer the following questions about ALL of the headaches you have had over the last 3 months. Select zero if you did not have the activity in the last 3 months.",
  sections: [
    {
      id: "midas-main",
      title: "MIDAS Questions",
      questions: [
        {
          id: "midas-intro",
          type: "info",
          text: "The MIDAS questionnaire was put together to help you measure the impact your headaches have on your life. The information on this questionnaire is also helpful for your primary care provider to determine the level of pain and disability caused by your headaches and to find the best treatment for you."
        },
        {
          id: "midas-q1",
          type: "text",
          text: "On how many days in the last 3 months did you miss work or school because of your headaches?",
          required: true
        },
        {
          id: "midas-q2",
          type: "text",
          text: "How many days in the last 3 months was your productivity at work or school reduced by half or more because of your headaches? (Do not include days you counted in question 1 where you missed work or school.)",
          required: true
        },
        {
          id: "midas-q3",
          type: "text",
          text: "On how many days in the last 3 months did you not do household work (such as housework, home repairs and maintenance, shopping, caring for children and relatives) because of your headaches?",
          required: true
        },
        {
          id: "midas-q4",
          type: "text",
          text: "How many days in the last 3 months was your productivity in household work reduced by half or more because of your headaches? (Do not include days you counted in question 3 where you did not do household work.)",
          required: true
        },
        {
          id: "midas-q5",
          type: "text",
          text: "On how many days in the last 3 months did you miss family, social or leisure activities because of your headaches?",
          required: true
        },
        {
          id: "midas-q-a",
          type: "text",
          text: "On how many days in the last 3 months did you have a headache? (If a headache lasted more than 1 day, count each day.)",
          info: "What your Physician will need to know about your headache"
        },
        {
          id: "midas-q-b",
          type: "radio",
          text: "On a scale of 0-10, on average how painful were these headaches? (where 0=no pain at all, and 10=pain as bad as it can be.)",
          options: [
            { id: "pain-0", text: "0 - No pain", value: 0 },
            { id: "pain-1", text: "1", value: 1 },
            { id: "pain-2", text: "2", value: 2 },
            { id: "pain-3", text: "3", value: 3 },
            { id: "pain-4", text: "4", value: 4 },
            { id: "pain-5", text: "5", value: 5 },
            { id: "pain-6", text: "6", value: 6 },
            { id: "pain-7", text: "7", value: 7 },
            { id: "pain-8", text: "8", value: 8 },
            { id: "pain-9", text: "9", value: 9 },
            { id: "pain-10", text: "10 - Pain as bad as it can be", value: 10 }
          ]
        }
      ]
    }
  ],
  interpretations: {
    ranges: [
      {
        min: 0,
        max: 5,
        text: "Grade I: Little or No Disability - You have little or no disability from your headaches and usually don't need medical care."
      },
      {
        min: 6,
        max: 10,
        text: "Grade II: Mild Disability - You have mild disability from your headaches and may need basic care."
      },
      {
        min: 11,
        max: 20,
        text: "Grade III: Moderate Disability - You have moderate disability from your headaches and need more advanced care."
      },
      {
        min: 21,
        max: 1000,
        text: "Grade IV: Severe Disability - You have severe disability from your headaches and need specialized care."
      }
    ]
  },
  scoring: {
    type: 'sum',
    groups: [
      {
        id: 'midas_total',
        name: 'MIDAS Total Score',
        items: ['midas-q1', 'midas-q2', 'midas-q3', 'midas-q4', 'midas-q5']
      }
    ]
  }
};
