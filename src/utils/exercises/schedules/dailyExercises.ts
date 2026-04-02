
import { Exercise } from "../types";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { getRecommendedExercises } from "../filters";
import { exercises } from "../data";
import {
  getDay1Exercises, getDay2Exercises, getDay3Exercises, getDay4Exercises, getDay5Exercises, getDay6Exercises,
  getDay8Exercises, getDay9Exercises, getDay10Exercises, getDay11Exercises, getDay12Exercises, getDay13Exercises,
  getDay15Exercises, getDay16Exercises, getDay17Exercises, getDay18Exercises, getDay19Exercises, getDay20Exercises,
  getDay22Exercises, getDay23Exercises, getDay24Exercises, getDay25Exercises, getDay26Exercises, getDay27Exercises,
  getDay29Exercises, getDay30Exercises, getDay31Exercises, getDay32Exercises, getDay33Exercises, getDay34Exercises,
  getDay36Exercises, getDay37Exercises, getDay38Exercises, getDay39Exercises, getDay40Exercises, getDay41Exercises,
  getDay43Exercises, getDay44Exercises, getDay45Exercises, getDay46Exercises, getDay47Exercises, getDay48Exercises,
  getDay50Exercises, getDay51Exercises, getDay52Exercises, getDay53Exercises, getDay54Exercises, getDay55Exercises,
  getDay57Exercises, getDay58Exercises, getDay59Exercises, getDay60Exercises, getDay61Exercises, getDay62Exercises,
  getDay64Exercises, getDay65Exercises, getDay66Exercises, getDay67Exercises, getDay68Exercises, getDay69Exercises,
  getDay71Exercises, getDay72Exercises, getDay73Exercises, getDay74Exercises, getDay75Exercises, getDay76Exercises
} from "./weekly";

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
} from "./weeklyReviews";

/**
 * Filter a day's hardcoded exercises against the user's FHT-recommended set.
 * Activity sheets and general exercises always pass through.
 * If no FHT response is provided, returns the unfiltered list.
 */
const applyFhtFilter = (
  dayExercises: Exercise[],
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  if (!fhtResponse) return dayExercises;

  const recommended = getRecommendedExercises(fhtResponse);
  const recommendedIds = new Set(recommended.map(ex => ex.id));

  return dayExercises.filter(ex => {
    if (ex.type === "activity") return true;
    if (ex.isGeneralExercise) return true;
    return recommendedIds.has(ex.id);
  });
};

/**
 * Get exercises for a specific day in Phase 2, filtered by FHT response
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  let rawExercises: Exercise[];

  if (day % 7 === 0) {
    if (day === 7) rawExercises = getDay7Exercises();
    else if (day === 14) rawExercises = getDay14Exercises();
    else if (day === 21) rawExercises = getDay21Exercises();
    else if (day === 28) rawExercises = getDay28Exercises();
    else if (day === 35) rawExercises = getDay35Exercises();
    else if (day === 42) rawExercises = getDay42Exercises();
    else if (day === 49) rawExercises = getDay49Exercises();
    else if (day === 56) rawExercises = getDay56Exercises();
    else if (day === 63) rawExercises = getDay63Exercises();
    else if (day === 70) rawExercises = getDay70Exercises();
    else rawExercises = exercises.filter(ex => ex.type === "activity").slice(0, 6);

    return applyFhtFilter(rawExercises, fhtResponse);
  }

  switch (day) {
    case 1: rawExercises = getDay1Exercises(); break;
    case 2: rawExercises = getDay2Exercises(); break;
    case 3: rawExercises = getDay3Exercises(); break;
    case 4: rawExercises = getDay4Exercises(); break;
    case 5: rawExercises = getDay5Exercises(); break;
    case 6: rawExercises = getDay6Exercises(); break;
    case 8: rawExercises = getDay8Exercises(); break;
    case 9: rawExercises = getDay9Exercises(); break;
    case 10: rawExercises = getDay10Exercises(); break;
    case 11: rawExercises = getDay11Exercises(); break;
    case 12: rawExercises = getDay12Exercises(); break;
    case 13: rawExercises = getDay13Exercises(); break;
    case 15: rawExercises = getDay15Exercises(); break;
    case 16: rawExercises = getDay16Exercises(); break;
    case 17: rawExercises = getDay17Exercises(); break;
    case 18: rawExercises = getDay18Exercises(); break;
    case 19: rawExercises = getDay19Exercises(); break;
    case 20: rawExercises = getDay20Exercises(); break;
    case 22: rawExercises = getDay22Exercises(); break;
    case 23: rawExercises = getDay23Exercises(); break;
    case 24: rawExercises = getDay24Exercises(); break;
    case 25: rawExercises = getDay25Exercises(); break;
    case 26: rawExercises = getDay26Exercises(); break;
    case 27: rawExercises = getDay27Exercises(); break;
    case 29: rawExercises = getDay29Exercises(); break;
    case 30: rawExercises = getDay30Exercises(); break;
    case 31: rawExercises = getDay31Exercises(); break;
    case 32: rawExercises = getDay32Exercises(); break;
    case 33: rawExercises = getDay33Exercises(); break;
    case 34: rawExercises = getDay34Exercises(); break;
    case 36: rawExercises = getDay36Exercises(); break;
    case 37: rawExercises = getDay37Exercises(); break;
    case 38: rawExercises = getDay38Exercises(); break;
    case 39: rawExercises = getDay39Exercises(); break;
    case 40: rawExercises = getDay40Exercises(); break;
    case 41: rawExercises = getDay41Exercises(); break;
    case 43: rawExercises = getDay43Exercises(); break;
    case 44: rawExercises = getDay44Exercises(); break;
    case 45: rawExercises = getDay45Exercises(); break;
    case 46: rawExercises = getDay46Exercises(); break;
    case 47: rawExercises = getDay47Exercises(); break;
    case 48: rawExercises = getDay48Exercises(); break;
    case 50: rawExercises = getDay50Exercises(); break;
    case 51: rawExercises = getDay51Exercises(); break;
    case 52: rawExercises = getDay52Exercises(); break;
    case 53: rawExercises = getDay53Exercises(); break;
    case 54: rawExercises = getDay54Exercises(); break;
    case 55: rawExercises = getDay55Exercises(); break;
    case 57: rawExercises = getDay57Exercises(); break;
    case 58: rawExercises = getDay58Exercises(); break;
    case 59: rawExercises = getDay59Exercises(); break;
    case 60: rawExercises = getDay60Exercises(); break;
    case 61: rawExercises = getDay61Exercises(); break;
    case 62: rawExercises = getDay62Exercises(); break;
    case 64: rawExercises = getDay64Exercises(); break;
    case 65: rawExercises = getDay65Exercises(); break;
    case 66: rawExercises = getDay66Exercises(); break;
    case 67: rawExercises = getDay67Exercises(); break;
    case 68: rawExercises = getDay68Exercises(); break;
    case 69: rawExercises = getDay69Exercises(); break;
    case 71: rawExercises = getDay71Exercises(); break;
    case 72: rawExercises = getDay72Exercises(); break;
    case 73: rawExercises = getDay73Exercises(); break;
    case 74: rawExercises = getDay74Exercises(); break;
    case 75: rawExercises = getDay75Exercises(); break;
    case 76: rawExercises = getDay76Exercises(); break;
    default: return [];
  }

  return applyFhtFilter(rawExercises, fhtResponse);
};
