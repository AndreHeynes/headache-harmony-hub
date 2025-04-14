
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
 * Get exercises for a specific day in Phase 2
 */
export const getExercisesForDay = (
  day: number,
  fhtResponse?: QuestionnaireResponse
): Exercise[] => {
  // Get all recommended exercises based on FHT questionnaire
  const allRecommended = getRecommendedExercises(fhtResponse);
  
  // For weekly review days (7, 14, etc.)
  if (day % 7 === 0) {
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
    } else if (day === 49) {
      return getDay49Exercises();
    } else if (day === 56) {
      return getDay56Exercises();
    } else if (day === 63) {
      return getDay63Exercises();
    } else if (day === 70) {
      return getDay70Exercises();
    } else {
      // For other weekly review days, use a default set of exercises
      return exercises.filter(ex => ex.type === "activity").slice(0, 6);
    }
  }
  
  // For regular exercise days, use the appropriate day function
  switch (day) {
    case 1: return getDay1Exercises();
    case 2: return getDay2Exercises();
    case 3: return getDay3Exercises();
    case 4: return getDay4Exercises();
    case 5: return getDay5Exercises();
    case 6: return getDay6Exercises();
    case 8: return getDay8Exercises();
    case 9: return getDay9Exercises();
    case 10: return getDay10Exercises();
    case 11: return getDay11Exercises();
    case 12: return getDay12Exercises();
    case 13: return getDay13Exercises();
    case 15: return getDay15Exercises();
    case 16: return getDay16Exercises();
    case 17: return getDay17Exercises();
    case 18: return getDay18Exercises();
    case 19: return getDay19Exercises();
    case 20: return getDay20Exercises();
    case 22: return getDay22Exercises();
    case 23: return getDay23Exercises();
    case 24: return getDay24Exercises();
    case 25: return getDay25Exercises();
    case 26: return getDay26Exercises();
    case 27: return getDay27Exercises();
    case 29: return getDay29Exercises();
    case 30: return getDay30Exercises();
    case 31: return getDay31Exercises();
    case 32: return getDay32Exercises();
    case 33: return getDay33Exercises();
    case 34: return getDay34Exercises();
    case 36: return getDay36Exercises();
    case 37: return getDay37Exercises();
    case 38: return getDay38Exercises();
    case 39: return getDay39Exercises();
    case 40: return getDay40Exercises();
    case 41: return getDay41Exercises();
    case 43: return getDay43Exercises();
    case 44: return getDay44Exercises();
    case 45: return getDay45Exercises();
    case 46: return getDay46Exercises();
    case 47: return getDay47Exercises();
    case 48: return getDay48Exercises();
    case 50: return getDay50Exercises();
    case 51: return getDay51Exercises();
    case 52: return getDay52Exercises();
    case 53: return getDay53Exercises();
    case 54: return getDay54Exercises();
    case 55: return getDay55Exercises();
    case 57: return getDay57Exercises();
    case 58: return getDay58Exercises();
    case 59: return getDay59Exercises();
    case 60: return getDay60Exercises();
    case 61: return getDay61Exercises();
    case 62: return getDay62Exercises();
    case 64: return getDay64Exercises();
    case 65: return getDay65Exercises();
    case 66: return getDay66Exercises();
    case 67: return getDay67Exercises();
    case 68: return getDay68Exercises();
    case 69: return getDay69Exercises();
    case 71: return getDay71Exercises();
    case 72: return getDay72Exercises();
    case 73: return getDay73Exercises();
    case 74: return getDay74Exercises();
    case 75: return getDay75Exercises();
    case 76: return getDay76Exercises();
    default: return [];
  }
};
