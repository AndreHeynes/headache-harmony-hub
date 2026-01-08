
import React from "react";
import { Exercise } from "@/utils/exercises/types";
import EmptyExerciseDay from "./exercise/EmptyExerciseDay";
import WeeklyReviewDay from "./exercise/WeeklyReviewDay";
import RegularExerciseDay from "./exercise/RegularExerciseDay";
import { 
  getDay7Exercises, 
  getDay14Exercises, 
  getDay21Exercises, 
  getDay28Exercises,
  getDay35Exercises,
  getDay42Exercises,
  getDay49Exercises,
  getDay56Exercises,
  getDay63Exercises,
  getDay70Exercises
} from "@/utils/exercises/schedules";

interface DailyExerciseListProps {
  exercises: Exercise[];
  day: number;
  videoDisplayMode?: "embedded" | "link";
}

const DailyExerciseList: React.FC<DailyExerciseListProps> = ({ 
  exercises, 
  day,
  videoDisplayMode = "link"
}) => {
  // If no exercises, show empty exercise day component
  if (exercises.length === 0) {
    return <EmptyExerciseDay />;
  }
  
  // Weekly review days (days divisible by 7)
  if (day % 7 === 0) {
    // Get specific exercises for this review day
    const weekNumber = Math.floor(day / 7);
    let reviewDayExercises: Exercise[] = [];
    
    // Select the appropriate exercises based on the day
    if (day === 7) {
      reviewDayExercises = getDay7Exercises();
    } else if (day === 14) {
      reviewDayExercises = getDay14Exercises();
    } else if (day === 21) {
      reviewDayExercises = getDay21Exercises();
    } else if (day === 28) {
      reviewDayExercises = getDay28Exercises();
    } else if (day === 35) {
      reviewDayExercises = getDay35Exercises();
    } else if (day === 42) {
      reviewDayExercises = getDay42Exercises();
    } else if (day === 49) {
      reviewDayExercises = getDay49Exercises();
    } else if (day === 56) {
      reviewDayExercises = getDay56Exercises();
    } else if (day === 63) {
      reviewDayExercises = getDay63Exercises();
    } else if (day === 70) {
      reviewDayExercises = getDay70Exercises();
    }
    
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
