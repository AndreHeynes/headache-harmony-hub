
import React from "react";
import { Question } from "@/types/questionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface QuestionnaireSectionProps {
  questions: Question[];
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
}

const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({
  questions,
  answers,
  onAnswerChange,
}) => {
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "heading":
        return (
          <div className="mb-4">
            <h3 className="text-lg font-medium">{question.text}</h3>
            {question.info && <p className="text-sm text-neutral-600">{question.info}</p>}
          </div>
        );
      case "info":
        return (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-neutral-700 whitespace-pre-line">{question.text}</p>
          </div>
        );
      case "radio":
        return (
          <div className="mb-6">
            <p className="mb-2 font-medium">{question.text}</p>
            {question.info && (
              <p className="text-sm text-neutral-500 mb-2">{question.info}</p>
            )}
            <RadioGroup
              value={answers[question.id]?.toString() || ""}
              onValueChange={(value) => {
                // Convert string numbers to actual numbers for scoring
                if (!isNaN(Number(value))) {
                  onAnswerChange(question.id, Number(value));
                } else {
                  onAnswerChange(question.id, value);
                }
              }}
              className="space-y-1"
            >
              {question.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "checkbox":
        return (
          <div className="mb-6">
            <p className="mb-2 font-medium">{question.text}</p>
            {question.info && (
              <p className="text-sm text-neutral-500 mb-2">{question.info}</p>
            )}
            <div className="space-y-2">
              {question.options?.map((option) => {
                const checked = Array.isArray(answers[question.id])
                  ? answers[question.id].includes(option.value.toString())
                  : false;
                return (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const currentValues = Array.isArray(answers[question.id])
                          ? [...answers[question.id]]
                          : [];
                        
                        if (isChecked) {
                          onAnswerChange(question.id, [
                            ...currentValues,
                            option.value.toString(),
                          ]);
                        } else {
                          onAnswerChange(
                            question.id,
                            currentValues.filter(
                              (v) => v !== option.value.toString()
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "text":
        return (
          <div className="mb-6">
            <Label htmlFor={question.id} className="block mb-2">
              {question.text}
            </Label>
            {question.info && (
              <p className="text-sm text-neutral-500 mb-2">{question.info}</p>
            )}
            <Input
              id={question.id}
              value={answers[question.id] || ""}
              onChange={(e) => {
                // For numeric fields that need conversion
                if (
                  question.id.startsWith("midas-q") && 
                  !isNaN(Number(e.target.value))
                ) {
                  onAnswerChange(question.id, Number(e.target.value) || 0);
                } else {
                  onAnswerChange(question.id, e.target.value);
                }
              }}
              type={
                question.id.startsWith("midas-q")
                  ? "number"
                  : "text"
              }
              min={
                question.id.startsWith("midas-q")
                  ? "0"
                  : undefined
              }
              className="w-full"
            />
          </div>
        );
      case "activity-select":
        // For PSFS-specific activity selection
        return (
          <div className="mb-6">
            <Label htmlFor={question.id} className="block mb-2">
              {question.text}
            </Label>
            <Input
              id={question.id}
              value={answers[question.id] || ""}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-full"
              placeholder="Enter an activity affected by your headaches"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="animate-fadeIn">
          {renderQuestion(question)}
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireSection;
