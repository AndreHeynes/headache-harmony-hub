
import { Exercise } from "../types";
import { exercises } from "../data";
import { QuestionnaireResponse } from "@/types/questionnaire";

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

/**
 * Get exercises for day 49 (seventh weekly review day)
 */
export const getDay49Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day49ExerciseIds = ["0.1", "0.2", "6.0", "6.1", "7.0", "7.1", "8.0", "8.1", "11.0", "16.0", "17.0",
                           "18.4", "20.1", "21.0", "22.1", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day49ActivityIds = ["as-4", "as-5.1"];
  
  return exercises.filter(ex => 
    day49ExerciseIds.includes(ex.id) || day49ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 56 (eighth weekly review day)
 */
export const getDay56Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day56ExerciseIds = ["19.0", "21.2", "22.2", "42.0", "53.0", "54.0", "51.0", "51.1", "52.0", "57.0"];
  const day56ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day56ExerciseIds.includes(ex.id) || day56ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 63 (ninth weekly review day)
 */
export const getDay63Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day63ExerciseIds = ["43.0", "46.0", "48.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day63ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day63ExerciseIds.includes(ex.id) || day63ActivityIds.includes(ex.id)
  );
};

/**
 * Get exercises for day 70 (tenth weekly review day)
 */
export const getDay70Exercises = (fhtResponse?: QuestionnaireResponse): Exercise[] => {
  const day70ExerciseIds = ["46.0", "46.1", "48.0", "48.1", "50.0", "53.0", "54.0", "51.0", "51.1", "52.0"];
  const day70ActivityIds = ["as-4"];
  
  return exercises.filter(ex => 
    day70ExerciseIds.includes(ex.id) || day70ActivityIds.includes(ex.id)
  );
};
