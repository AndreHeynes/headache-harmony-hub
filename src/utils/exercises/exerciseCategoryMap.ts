
/**
 * Maps exercise ID prefixes to human-readable categories for the Phase 4 Exercise Vault.
 */

export type ExerciseCategory = 
  | "Neck Mobility"
  | "Neck Stability" 
  | "Neck Stretches"
  | "Sensorimotor"
  | "Neural"
  | "TMJ"
  | "Breathing"
  | "Activity Sheet";

interface CategoryRule {
  category: ExerciseCategory;
  idPrefixes: string[];
}

const categoryRules: CategoryRule[] = [
  { category: "Breathing", idPrefixes: ["0."] },
  { category: "Neck Stretches", idPrefixes: ["2.", "3.", "4.", "5.", "6.", "7.", "8.", "9."] }, // scalenes, serratus, pec, levator, erector
  { category: "Neck Mobility", idPrefixes: ["10.", "11.", "12.", "13.", "14.", "15.", "16.", "17."] }, // chin-neck
  { category: "Neck Stability", idPrefixes: ["18.", "19.", "20.", "21.", "22.", "23.", "24.", "25.", "26.", "27.", "28.", "29.", "30.", "31.", "32.", "33.", "34.", "35.", "36.", "37.", "38.", "39.", "40."] }, // neck strength
  { category: "Sensorimotor", idPrefixes: ["41.", "42.", "43.", "44.", "45.", "46.", "47.", "48.", "49.", "50."] }, // combined movement
  { category: "TMJ", idPrefixes: ["51.", "52.", "53.", "54.", "55."] },
  { category: "Neural", idPrefixes: ["56.", "57."] },
];

export const getExerciseCategory = (exerciseId: string): ExerciseCategory => {
  for (const rule of categoryRules) {
    for (const prefix of rule.idPrefixes) {
      if (exerciseId.startsWith(prefix)) {
        return rule.category;
      }
    }
  }
  return "Neck Mobility"; // fallback
};

export const EXERCISE_CATEGORY_COLORS: Record<ExerciseCategory, string> = {
  "Breathing": "bg-cyan-600",
  "Neck Mobility": "bg-blue-600",
  "Neck Stability": "bg-green-600",
  "Neck Stretches": "bg-purple-600",
  "Sensorimotor": "bg-amber-600",
  "Neural": "bg-rose-600",
  "TMJ": "bg-orange-600",
  "Activity Sheet": "bg-slate-600",
};

export const ALL_VAULT_CATEGORIES: ExerciseCategory[] = [
  "Breathing",
  "Neck Mobility",
  "Neck Stability",
  "Neck Stretches",
  "Sensorimotor",
  "Neural",
  "TMJ",
];
