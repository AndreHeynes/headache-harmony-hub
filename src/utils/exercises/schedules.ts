
import { Exercise } from "./types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getRecommendedExercises } from "./filters";
import { exercises } from "./data";

/**
 * Get exercises for a specific day in Phase 2
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  // Get all recommended exercises based on FHT questionnaire
  const allRecommended = getRecommendedExercises(fhtResponse);
  
  // Return exercises for specific days based on the provided schedule
  // For days 7, 14, etc. (weekly review days), the component itself handles the display
  
  // Day 1 exercises - specific list from requirements
  if (day === 1) {
    const day1ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", 
                             "10.0", "12.0", "13.0", "14.0", "53.0", "54.0", 
                             "51.0", "51.1", "52.0"];
    const day1ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day1ExerciseIds.includes(ex.id) || day1ActivityIds.includes(ex.id)
    );
  }
  
  // Day 2 exercises
  else if (day === 2) {
    const day2ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day2ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day2ExerciseIds.includes(ex.id) || day2ActivityIds.includes(ex.id)
    );
  }
  
  // Day 3 exercises
  else if (day === 3) {
    const day3ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "11.0", 
                             "16.0", "17.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day3ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day3ExerciseIds.includes(ex.id) || day3ActivityIds.includes(ex.id)
    );
  }
  
  // Day 4 exercises
  else if (day === 4) {
    const day4ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.0", "3.1", "4.0", "4.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day4ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day4ExerciseIds.includes(ex.id) || day4ActivityIds.includes(ex.id)
    );
  }
  
  // Day 5 exercises
  else if (day === 5) {
    const day5ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "10.0", "12.0", "13.0", 
                             "15.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day5ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day5ExerciseIds.includes(ex.id) || day5ActivityIds.includes(ex.id)
    );
  }
  
  // Day 6 exercises
  else if (day === 6) {
    const day6ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day6ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day6ExerciseIds.includes(ex.id) || day6ActivityIds.includes(ex.id)
    );
  }
  
  // Day 8 exercises (after week 1 review)
  else if (day === 8) {
    const day8ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "18.0", "19.0", 
                             "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day8ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day8ExerciseIds.includes(ex.id) || day8ActivityIds.includes(ex.id)
    );
  }
  
  // Day 9 exercises
  else if (day === 9) {
    const day9ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "10.0", "12.0", 
                             "13.0", "14.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day9ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day9ExerciseIds.includes(ex.id) || day9ActivityIds.includes(ex.id)
    );
  }
  
  // Day 10 exercises
  else if (day === 10) {
    const day10ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "18.0", "19.0", 
                              "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day10ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day10ExerciseIds.includes(ex.id) || day10ActivityIds.includes(ex.id)
    );
  }
  
  // Day 11 exercises
  else if (day === 11) {
    const day11ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0", 
                              "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day11ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day11ExerciseIds.includes(ex.id) || day11ActivityIds.includes(ex.id)
    );
  }
  
  // Day 12 exercises
  else if (day === 12) {
    const day12ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "18.0", "19.0", 
                              "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day12ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day12ExerciseIds.includes(ex.id) || day12ActivityIds.includes(ex.id)
    );
  }
  
  // Day 13 exercises
  else if (day === 13) {
    const day13ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "10.0", "12.0", "13.0", 
                              "15.0", "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const day13ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
    
    return exercises.filter(ex => 
      day13ExerciseIds.includes(ex.id) || day13ActivityIds.includes(ex.id)
    );
  }
  
  // Day 15 exercises
  else if (day === 15) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "10.0", "11.0", "12.0", "14.0", "18.2", "19.2", "23.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 16 exercises
  else if (day === 16) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 17 exercises
  else if (day === 17) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "11.0", "16.0", "17.0", "18.2", "19.2", "23.1", 
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 18 exercises
  else if (day === 18) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.2", "19.2", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 19 exercises
  else if (day === 19) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "10.0", "11.0", "12.0", "15.0", "18.2", "19.2", "23.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 20 exercises
  else if (day === 20) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "11.0", "16.0", "17.0", "18.2", "19.2", "23.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 21 exercises - Week 3 review
  else if (day === 21) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.2", "19.2", "23.1", 
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 22 exercises
  else if (day === 22) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "18.3", "20.0", "53.0", "54.0", "51.0", "51.1", "52.0",
                           "56.1", "56.2"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 23 exercises
  else if (day === 23) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "10.0", "11.0", "12.0", "14.0", "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 24 exercises
  else if (day === 24) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "11.0", "16.0", "17.0", "18.3", "20.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 25 exercises
  else if (day === 25) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 26 exercises
  else if (day === 26) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.3", "20.0", "53.0", "54.0", "51.0", "51.1", "52.0",
                           "56.1", "56.2"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 27 exercises
  else if (day === 27) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "10.0", "11.0", "12.0", "15.0", "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 28 exercises - Week 4 review
  else if (day === 28) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 29 exercises
  else if (day === 29) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "10.0", "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 30 exercises
  else if (day === 30) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 31 exercises
  else if (day === 31) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 32 exercises
  else if (day === 32) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 33 exercises
  else if (day === 33) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "10.0", "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 34 exercises
  else if (day === 34) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "22.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 35 exercises - Week 5 review
  else if (day === 35) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 36 exercises
  else if (day === 36) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.4", "20.1", "21.0", "22.1", "22.0", "23.3",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 37 exercises
  else if (day === 37) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "10.0", "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1", "mhej"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 38 exercises
  else if (day === 38) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 39 exercises
  else if (day === 39) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 40 exercises
  else if (day === 40) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "10.0", "11.0", "12.0", "15.0", "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 41 exercises
  else if (day === 41) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.4", "20.1", "21.0", "22.1", "22.0",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-3", "as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 42 exercises - Week 6 review
  else if (day === 42) {
    const dayExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-3", "as-4"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 43 exercises
  else if (day === 43) {
    const dayExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.3", "20.2", "22.1", "22.0", "23.3",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // Day 44 exercises
  else if (day === 44) {
    const dayExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "10.0", "11.0", "12.0", "14.0", "18.4", "20.1", "21.0", "22.1", "41.0", "41.1",
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
    const dayActivityIds = ["as-4", "as-5.1"];
    
    return exercises.filter(ex => 
      dayExerciseIds.includes(ex.id) || dayActivityIds.includes(ex.id)
    );
  }
  
  // For weekly review days (7, 14, etc.)
  else if (day % 7 === 0) {
    // Select the appropriate weekly review function based on week number
    if (day === 7) {
      return getDay7Exercises();
    } else if (day === 14) {
      return getDay14Exercises();
    } else if (day === 21) {
      return getDay21Exercises();
    } else if (day === 28) {
      return getDay28Exercises();
    } else if (day === 35) {
      return getDay35Exercises();
    } else if (day === 42) {
      return getDay42Exercises();
    } else {
      // For other weekly review days, use a default set of exercises
      return exercises.filter(ex => ex.type === "activity").slice(0, 6);
    }
  }
  
  // For days not explicitly defined yet, use the pattern from weeks 1-6
  // This is a fallback for days beyond 44
  else {
    // Map to the equivalent day in the first six weeks
    const equivalentDay = ((day - 1) % 42) + 1;
    return getExercisesForDay(equivalentDay, fhtResponse);
  }
};

/**
 * Get exercises for day 7 (including breathing exercises from day 1)
 * This is a special case for the weekly review day
 */
export const getDay7Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day7ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", "11.0", "16.0", "17.0", 
                           "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day7ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return exercises.filter(ex => 
    day7ExerciseIds.includes(ex.id) || day7ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 14 (second weekly review day)
 */
export const getDay14Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day14ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", "11.0", "16.0", "17.0", 
                            "18.0", "19.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day14ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5", "as-5.1"];
  
  return exercises.filter(ex => 
    day14ExerciseIds.includes(ex.id) || day14ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 21 (third weekly review day)
 */
export const getDay21Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day21ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", 
                           "18.2", "19.2", "23.1", 
                           "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day21ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5"];
  
  return exercises.filter(ex => 
    day21ExerciseIds.includes(ex.id) || day21ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 28 (fourth weekly review day)
 */
export const getDay28Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day28ExerciseIds = ["0.1", "0.2", "2.0", "2.1", "3.1", "4.0", "4.1", 
                           "11.0", "16.0", "17.0", "18.3", "20.0", "22.2",
                           "53.0", "54.0", "51.0", "51.1", "52.0", "56.1", "56.2"];
  const day28ActivityIds = ["as-1", "as-2", "as-3", "as-4", "as-5.1"];
  
  return exercises.filter(ex => 
    day28ExerciseIds.includes(ex.id) || day28ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 35 (fifth weekly review day)
 */
export const getDay35Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day35ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day35ActivityIds = ["as-3", "as-4"];
  
  return exercises.filter(ex => 
    day35ExerciseIds.includes(ex.id) || day35ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 42 (sixth weekly review day)
 */
export const getDay42Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day42ExerciseIds = ["0.1", "0.2", "8.0", "8.1", "5.0", "5.1", "9.1", 
                           "18.4", "20.1", "21.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day42ActivityIds = ["as-3", "as-4"];
  
  return exercises.filter(ex => 
    day42ExerciseIds.includes(ex.id) || day42ActivityIds.includes(ex.id)
  );
};
