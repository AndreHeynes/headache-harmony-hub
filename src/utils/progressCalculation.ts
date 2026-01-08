/**
 * Progress Calculation Utility
 * Pure utility functions for comparing Phase 1 baseline scores with Phase 3 follow-up scores
 * Note: Data fetching is handled by useProgressData hook
 */

export interface QuestionnaireComparison {
  baseline: number | null;
  followUp: number | null;
  percentageChange: number | null;
  direction: 'improved' | 'worsened' | 'unchanged' | 'unknown';
  baselineInterpretation: string;
  followUpInterpretation: string;
}

export interface PSFSActivityComparison {
  id: string;
  text: string;
  baselineRating: number;
  followUpRating: number;
  change: number;
}

export interface ProgressSummary {
  hit6: QuestionnaireComparison | null;
  midas: QuestionnaireComparison | null;
  psfs: {
    averageBaseline: number | null;
    averageFollowUp: number | null;
    percentageChange: number | null;
    direction: 'improved' | 'worsened' | 'unchanged' | 'unknown';
    activities: PSFSActivityComparison[];
  } | null;
  gpoc: {
    rating: number | null;
    interpretation: string;
  } | null;
  hasBaselineData: boolean;
  hasFollowUpData: boolean;
}

/**
 * Calculate percentage change between baseline and follow-up
 * Positive = improvement (for metrics where lower is better, this inverts)
 */
export function calculatePercentageChange(
  baseline: number, 
  followUp: number, 
  lowerIsBetter: boolean = true
): { percentage: number; direction: 'improved' | 'worsened' | 'unchanged' } {
  if (baseline === followUp) {
    return { percentage: 0, direction: 'unchanged' };
  }
  
  const rawChange = ((followUp - baseline) / baseline) * 100;
  
  if (lowerIsBetter) {
    // For HIT-6, MIDAS: lower scores = improvement
    if (followUp < baseline) {
      return { percentage: Math.abs(rawChange), direction: 'improved' };
    } else {
      return { percentage: Math.abs(rawChange), direction: 'worsened' };
    }
  } else {
    // For PSFS: higher scores = improvement
    if (followUp > baseline) {
      return { percentage: rawChange, direction: 'improved' };
    } else {
      return { percentage: Math.abs(rawChange), direction: 'worsened' };
    }
  }
}

/**
 * Get HIT-6 interpretation text based on score
 */
export function getHIT6Interpretation(score: number): string {
  if (score <= 49) return "Little to no impact";
  if (score <= 55) return "Some impact";
  if (score <= 59) return "Substantial impact";
  return "Severe impact";
}

/**
 * Get MIDAS interpretation text based on score
 */
export function getMIDASInterpretation(score: number): string {
  if (score <= 5) return "Little or no disability";
  if (score <= 10) return "Mild disability";
  if (score <= 20) return "Moderate disability";
  return "Severe disability";
}

/**
 * Get GPOC interpretation text based on rating (1-7 scale)
 */
export function getGPOCInterpretation(rating: number): string {
  if (rating === 1) return "Very much improved";
  if (rating === 2) return "Much improved";
  if (rating === 3) return "Minimally improved";
  if (rating === 4) return "No change";
  if (rating === 5) return "Minimally worse";
  if (rating === 6) return "Much worse";
  return "Very much worse";
}

/**
 * Get PSFS interpretation text based on average score (0-10 scale)
 */
export function getPSFSInterpretation(score: number): string {
  if (score >= 8) return "Able to perform at prior level";
  if (score >= 6) return "Moderate ability";
  if (score >= 4) return "Limited ability";
  return "Unable or severely limited";
}

/**
 * Get color classes based on improvement direction
 */
export function getDirectionColor(direction: 'improved' | 'worsened' | 'unchanged' | 'unknown'): {
  bg: string;
  border: string;
  text: string;
  badge: string;
} {
  switch (direction) {
    case 'improved':
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-800',
      };
    case 'worsened':
      return {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        text: 'text-rose-800',
        badge: 'bg-rose-100 text-rose-800',
      };
    case 'unchanged':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        badge: 'bg-amber-100 text-amber-800',
      };
    default:
      return {
        bg: 'bg-neutral-50',
        border: 'border-neutral-200',
        text: 'text-neutral-800',
        badge: 'bg-neutral-100 text-neutral-800',
      };
  }
}
