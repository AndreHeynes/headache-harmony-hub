
// Re-export all exercise data
import { Exercise } from "../types";
import { breathingExercises } from "./breathing";
import { scalenesExercises } from "./scalenes";
import { serratusExercises } from "./serratus";
import { pecExercises } from "./pec";
import { levatorScapulaExercises } from "./levator-scapula";
import { erectorSpinaeExercises } from "./erector-spinae";
import { chinNeckExercises } from "./chin-neck";
import { archerExercises } from "./archer";
import { neckStrengthBeginnerExercises } from "./neck-strength-beginner";
import { neckStrengthIntermediateExercises } from "./neck-strength-intermediate";
import { neckStrengthAdvancedExercises } from "./neck-strength-advanced";
import { neckStrengthVeryAdvancedExercises } from "./neck-strength-very-advanced";
import { combinedMovementExercises } from "./combined-movement";
import { tmjExercises } from "./tmj";
import { occipitalExercises } from "./occipital";
import { activitySheets } from "./activity-sheets";

// Combine all exercises into a single array
export const exercises: Exercise[] = [
  ...breathingExercises,
  ...scalenesExercises,
  ...serratusExercises,
  ...pecExercises,
  ...levatorScapulaExercises,
  ...erectorSpinaeExercises,
  ...chinNeckExercises,
  ...archerExercises,
  ...neckStrengthBeginnerExercises,
  ...neckStrengthIntermediateExercises,
  ...neckStrengthAdvancedExercises,
  ...neckStrengthVeryAdvancedExercises,
  ...combinedMovementExercises,
  ...tmjExercises,
  ...occipitalExercises,
  ...activitySheets
];
