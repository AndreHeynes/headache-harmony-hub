
import { Questionnaire } from "@/types/questionnaire";

export const mkqQuestionnaire: Questionnaire = {
  id: "mkq",
  title: "Medication Knowledge Quiz",
  description: "This questionnaire helps assess your understanding of medications and their impact on headaches.",
  instructions: "Please answer the following questions about medications and their effects. Select True or False for each statement.",
  sections: [
    {
      id: "mkq-main",
      title: "Medication Knowledge",
      questions: [
        {
          id: "mkq-intro",
          type: "info",
          text: "Headaches can be a nonspecific symptom of many conditions including (but not limited to) dehydration, nutritional deficiencies, hormone imbalances, high blood pressure, and glaucoma. Medications can also have side effects that can cause headaches.\n\nLet's spend some time talking about medications, side effects, and how you can start to be more knowledgeable about the medications you take and help to rule out if your medications may be contributing to your headache symptoms."
        },
        {
          id: "mkq-q1",
          type: "radio",
          text: "1. By taking a medication, I no longer have the health condition the medication treats.",
          required: true,
          options: [
            { id: "mkq-q1-true", text: "True", value: "true" },
            { id: "mkq-q1-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q2",
          type: "radio",
          text: "2. My medication doses will be constant and not change over time.",
          required: true,
          options: [
            { id: "mkq-q2-true", text: "True", value: "true" },
            { id: "mkq-q2-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q3",
          type: "radio",
          text: "3. I may begin to experience side effects from a drug even after taking it for a long period of time without any side effects.",
          required: true,
          options: [
            { id: "mkq-q3-true", text: "True", value: "true" },
            { id: "mkq-q3-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q4",
          type: "radio",
          text: "4. Some medications can deplete my body of critical nutrients and increase my risk for side effects or worsen other disease states.",
          required: true,
          options: [
            { id: "mkq-q4-true", text: "True", value: "true" },
            { id: "mkq-q4-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q5",
          type: "radio",
          text: "5. 1 in 6 hospital visits is related to medication side effects.",
          required: true,
          options: [
            { id: "mkq-q5-true", text: "True", value: "true" },
            { id: "mkq-q5-false", text: "False", value: "false" }
          ]
        }
      ]
    },
    {
      id: "mkq-main-2",
      title: "Medication Knowledge (continued)",
      questions: [
        {
          id: "mkq-q6",
          type: "radio",
          text: "6. Most medication related harm is avoidable.",
          required: true,
          options: [
            { id: "mkq-q6-true", text: "True", value: "true" },
            { id: "mkq-q6-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q7",
          type: "radio",
          text: "7. Using certain headache medications frequently can cause headaches.",
          required: true,
          options: [
            { id: "mkq-q7-true", text: "True", value: "true" },
            { id: "mkq-q7-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-q8",
          type: "radio",
          text: "8. Medications are the best choice for treatment and prevention of headache pain.",
          required: true,
          options: [
            { id: "mkq-q8-true", text: "True", value: "true" },
            { id: "mkq-q8-false", text: "False", value: "false" }
          ]
        },
        {
          id: "mkq-info-assessment",
          type: "info",
          text: "After completing this questionnaire, consider:\n\n- What was your score on the test?\n- Did you know more or less than you expected about medications?\n- What is your biggest take-away after reading the answers and explanations to the Medication Knowledge Quiz?"
        }
      ]
    }
  ],
  interpretations: {
    ranges: [
      { min: 0, max: 4, text: "You might benefit from learning more about medications and their effects. Consider discussing your medications with your healthcare provider or pharmacist." },
      { min: 5, max: 8, text: "You have a good understanding of medications and their effects. Continue to stay informed about your medications and their potential impacts on your headaches." }
    ]
  }
};
