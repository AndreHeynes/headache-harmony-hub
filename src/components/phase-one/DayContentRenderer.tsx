
import React from "react";
import DayOneContent from "./days/DayOneContent";
import DayTwoContent from "./days/DayTwoContent";
import DayThreeContent from "./days/DayThreeContent";
import DayFourContent from "./days/DayFourContent";
import DayFiveContent from "./days/DayFiveContent";
import DaySixContent from "./days/DaySixContent";
import DaySevenContent from "./days/DaySevenContent";

interface DayContentRendererProps {
  day: number;
  completedQuestionnaires: Record<string, boolean>;
  questionnaireResults: Record<string, any>;
}

const DayContentRenderer: React.FC<DayContentRendererProps> = ({
  day,
  completedQuestionnaires,
  questionnaireResults
}) => {
  switch (day) {
    case 1:
      return <DayOneContent />;
    case 2:
      return <DayTwoContent completedQuestionnaires={completedQuestionnaires} />;
    case 3:
      return <DayThreeContent completedQuestionnaires={completedQuestionnaires} />;
    case 4:
      return <DayFourContent completedQuestionnaires={completedQuestionnaires} />;
    case 5:
      return <DayFiveContent completedQuestionnaires={completedQuestionnaires} />;
    case 6:
      return <DaySixContent completedQuestionnaires={completedQuestionnaires} />;
    case 7:
      return <DaySevenContent 
        completedQuestionnaires={completedQuestionnaires} 
        questionnaireResults={questionnaireResults} 
      />;
    default:
      return null;
  }
};

export default DayContentRenderer;
