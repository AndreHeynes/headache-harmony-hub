
import React from "react";
import { Exercise } from "@/utils/exercises/types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import EmptyExerciseDay from "./exercise/EmptyExerciseDay";
import WeeklyReviewDay from "./exercise/WeeklyReviewDay";
import RegularExerciseDay from "./exercise/RegularExerciseDay";
import { getExercisesForDay } from "@/utils/exercises/schedules";

interface DailyExerciseListProps {
  exercises: Exercise[];
  day: number;
  videoDisplayMode?: "embedded" | "link";
  fhtResponse?: QuestionnaireResponse;
}

const DailyExerciseList: React.FC<DailyExerciseListProps> = ({ 
  exercises, 
  day,
  videoDisplayMode = "link",
  fhtResponse
}) => {
  // If no exercises, show empty exercise day component
  if (exercises.length === 0) {
    return <EmptyExerciseDay />;
  }
  
  // Weekly review days (days divisible by 7)
  if (day % 7 === 0) {
    const weekNumber = Math.floor(day / 7);
    // Use the already-filtered exercises from the parent (which called getExercisesForDay with fhtResponse)
    const reviewDayExercises = getExercisesForDay(day, fhtResponse);
    
    return (
      <WeeklyReviewDay 
        day={day} 
        weekNumber={weekNumber} 
        reviewDayExercises={reviewDayExercises}
        videoDisplayMode={videoDisplayMode}
      />
    );
  }
  
  // Regular exercise days - calculate week from day
  const weekNumber = Math.ceil(day / 7);
  
  return (
    <RegularExerciseDay 
      exercises={exercises} 
      videoDisplayMode={videoDisplayMode}
      week={weekNumber}
      day={day}
    />
  );
};

export default DailyExerciseList;
