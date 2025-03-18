
import { Questionnaire } from "@/types/questionnaire";

export const hit6Questionnaire: Questionnaire = {
  id: "hit-6",
  title: "Headache Impact Test (HIT-6)",
  description: "This questionnaire was designed to help you describe and communicate the way you feel and what you cannot do because of headaches.",
  instructions: "To complete, please select one answer for each question.",
  sections: [
    {
      id: "hit-6-main",
      title: "HIT-6 Questions",
      questions: [
        {
          id: "hit-intro",
          type: "info",
          text: "This questionnaire measures the impact headaches have on your ability to function on the job, at school, at home, and in social situations."
        },
        {
          id: "hit-q1",
          type: "radio",
          text: "When you have headaches, how often is the pain severe?",
          required: true,
          options: [
            { id: "hit-q1-never", text: "Never", value: 6 },
            { id: "hit-q1-rarely", text: "Rarely", value: 8 },
            { id: "hit-q1-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q1-very-often", text: "Very Often", value: 11 },
            { id: "hit-q1-always", text: "Always", value: 13 }
          ]
        },
        {
          id: "hit-q2",
          type: "radio",
          text: "How often do headaches limit your ability to do usual daily activities including household work, work, school, or social activities?",
          required: true,
          options: [
            { id: "hit-q2-never", text: "Never", value: 6 },
            { id: "hit-q2-rarely", text: "Rarely", value: 8 },
            { id: "hit-q2-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q2-very-often", text: "Very Often", value: 11 },
            { id: "hit-q2-always", text: "Always", value: 13 }
          ]
        },
        {
          id: "hit-q3",
          type: "radio",
          text: "When you have a headache, how often do you wish you could lie down?",
          required: true,
          options: [
            { id: "hit-q3-never", text: "Never", value: 6 },
            { id: "hit-q3-rarely", text: "Rarely", value: 8 },
            { id: "hit-q3-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q3-very-often", text: "Very Often", value: 11 },
            { id: "hit-q3-always", text: "Always", value: 13 }
          ]
        }
      ]
    },
    {
      id: "hit-6-section-2",
      title: "HIT-6 Questions (Continued)",
      questions: [
        {
          id: "hit-q4",
          type: "radio",
          text: "In the past 4 weeks, how often have you felt too tired to do work or daily activities because of your headaches?",
          required: true,
          options: [
            { id: "hit-q4-never", text: "Never", value: 6 },
            { id: "hit-q4-rarely", text: "Rarely", value: 8 },
            { id: "hit-q4-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q4-very-often", text: "Very Often", value: 11 },
            { id: "hit-q4-always", text: "Always", value: 13 }
          ]
        },
        {
          id: "hit-q5",
          type: "radio",
          text: "In the past 4 weeks, how often have you felt fed up or irritated because of your headaches?",
          required: true,
          options: [
            { id: "hit-q5-never", text: "Never", value: 6 },
            { id: "hit-q5-rarely", text: "Rarely", value: 8 },
            { id: "hit-q5-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q5-very-often", text: "Very Often", value: 11 },
            { id: "hit-q5-always", text: "Always", value: 13 }
          ]
        },
        {
          id: "hit-q6",
          type: "radio",
          text: "In the past 4 weeks, how often did headaches limit your ability to concentrate on work or daily activities?",
          required: true,
          options: [
            { id: "hit-q6-never", text: "Never", value: 6 },
            { id: "hit-q6-rarely", text: "Rarely", value: 8 },
            { id: "hit-q6-sometimes", text: "Sometimes", value: 10 },
            { id: "hit-q6-very-often", text: "Very Often", value: 11 },
            { id: "hit-q6-always", text: "Always", value: 13 }
          ]
        }
      ]
    }
  ],
  interpretations: {
    ranges: [
      {
        min: 60,
        max: 78,
        text: "Your headaches are having a very severe impact on your life. You may be experiencing disabling pain and other symptoms that are more severe than those of other headache sufferers. You should consult your doctor about your results."
      },
      {
        min: 56,
        max: 59,
        text: "Your headaches are having a substantial impact on your life. As a result you may be experiencing severe pain and other symptoms, causing you to miss some time from family, work, school, or social activities."
      },
      {
        min: 50,
        max: 55,
        text: "Your headaches seem to be having some impact on your life. Your headaches should not make you miss time from family, work, school, or social activities."
      },
      {
        min: 36,
        max: 49,
        text: "Your headaches seem to be having little to no impact on your life at this time. We encourage you to continue to track how your headaches affect your life."
      }
    ]
  }
};
