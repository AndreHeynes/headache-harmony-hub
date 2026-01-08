
/**
 * Progress Calculation Utility
 * Compares Phase 1 baseline scores with Phase 3 follow-up scores
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
 * Get baseline (Phase 1) questionnaire data
 */
export function getBaselineData(questionnaireId: string): any | null {
  const key = `questionnaire-phase1-${questionnaireId}`;
  const data = localStorage.getItem(key);
  
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error parsing baseline data for ${questionnaireId}`, e);
    }
  }
  
  // Fallback: check for non-phase-prefixed data (migration support)
  const legacyKey = `questionnaire-${questionnaireId}`;
  const legacyData = localStorage.getItem(legacyKey);
  if (legacyData) {
    try {
      return JSON.parse(legacyData);
    } catch (e) {
      console.error(`Error parsing legacy data for ${questionnaireId}`, e);
    }
  }
  
  return null;
}

/**
 * Get follow-up (Phase 3) questionnaire data
 */
export function getFollowUpData(questionnaireId: string): any | null {
  const key = `questionnaire-phase3-${questionnaireId}`;
  const data = localStorage.getItem(key);
  
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error parsing follow-up data for ${questionnaireId}`, e);
    }
  }
  
  return null;
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
 * Get complete progress summary comparing Phase 1 and Phase 3 data
 */
export function getProgressSummary(): ProgressSummary {
  const summary: ProgressSummary = {
    hit6: null,
    midas: null,
    psfs: null,
    gpoc: null,
    hasBaselineData: false,
    hasFollowUpData: false,
  };

  // HIT-6 Comparison
  const hit6Baseline = getBaselineData('hit-6');
  const hit6FollowUp = getFollowUpData('hit-6');
  
  if (hit6Baseline?.score !== undefined || hit6FollowUp?.score !== undefined) {
    const baselineScore = hit6Baseline?.score ?? null;
    const followUpScore = hit6FollowUp?.score ?? null;
    
    let change = null;
    let direction: 'improved' | 'worsened' | 'unchanged' | 'unknown' = 'unknown';
    
    if (baselineScore !== null && followUpScore !== null) {
      const result = calculatePercentageChange(baselineScore, followUpScore, true);
      change = result.percentage;
      direction = result.direction;
      summary.hasBaselineData = true;
      summary.hasFollowUpData = true;
    } else if (baselineScore !== null) {
      summary.hasBaselineData = true;
    } else if (followUpScore !== null) {
      summary.hasFollowUpData = true;
    }
    
    summary.hit6 = {
      baseline: baselineScore,
      followUp: followUpScore,
      percentageChange: change,
      direction,
      baselineInterpretation: baselineScore !== null ? getHIT6Interpretation(baselineScore) : '',
      followUpInterpretation: followUpScore !== null ? getHIT6Interpretation(followUpScore) : '',
    };
  }

  // MIDAS Comparison
  const midasBaseline = getBaselineData('midas');
  const midasFollowUp = getFollowUpData('midas');
  
  if (midasBaseline?.score !== undefined || midasFollowUp?.score !== undefined) {
    const baselineScore = midasBaseline?.score ?? null;
    const followUpScore = midasFollowUp?.score ?? null;
    
    let change = null;
    let direction: 'improved' | 'worsened' | 'unchanged' | 'unknown' = 'unknown';
    
    if (baselineScore !== null && followUpScore !== null) {
      const result = calculatePercentageChange(baselineScore, followUpScore, true);
      change = result.percentage;
      direction = result.direction;
      summary.hasBaselineData = true;
      summary.hasFollowUpData = true;
    } else if (baselineScore !== null) {
      summary.hasBaselineData = true;
    } else if (followUpScore !== null) {
      summary.hasFollowUpData = true;
    }
    
    summary.midas = {
      baseline: baselineScore,
      followUp: followUpScore,
      percentageChange: change,
      direction,
      baselineInterpretation: baselineScore !== null ? getMIDASInterpretation(baselineScore) : '',
      followUpInterpretation: followUpScore !== null ? getMIDASInterpretation(followUpScore) : '',
    };
  }

  // PSFS Comparison (activity-by-activity)
  const psfsBaseline = getBaselineData('psfs');
  const psfsFollowUp = getFollowUpData('psfs');
  
  const baselineActivities = psfsBaseline?.savedActivities || [];
  const followUpActivities = psfsFollowUp?.savedActivities || [];
  
  if (baselineActivities.length > 0 || followUpActivities.length > 0) {
    const activityComparisons: PSFSActivityComparison[] = [];
    
    // Match activities by ID
    const allActivityIds = new Set([
      ...baselineActivities.map((a: any) => a.id),
      ...followUpActivities.map((a: any) => a.id),
    ]);
    
    allActivityIds.forEach(id => {
      const baseline = baselineActivities.find((a: any) => a.id === id);
      const followUp = followUpActivities.find((a: any) => a.id === id);
      
      if (baseline && followUp) {
        activityComparisons.push({
          id,
          text: baseline.text || followUp.text,
          baselineRating: baseline.rating,
          followUpRating: followUp.rating,
          change: followUp.rating - baseline.rating,
        });
      }
    });
    
    // Calculate averages
    const baselineAvg = baselineActivities.length > 0 
      ? baselineActivities.reduce((sum: number, a: any) => sum + a.rating, 0) / baselineActivities.length 
      : null;
    const followUpAvg = followUpActivities.length > 0 
      ? followUpActivities.reduce((sum: number, a: any) => sum + a.rating, 0) / followUpActivities.length 
      : null;
    
    let change = null;
    let direction: 'improved' | 'worsened' | 'unchanged' | 'unknown' = 'unknown';
    
    if (baselineAvg !== null && followUpAvg !== null) {
      const result = calculatePercentageChange(baselineAvg, followUpAvg, false); // Higher is better for PSFS
      change = result.percentage;
      direction = result.direction;
      summary.hasBaselineData = true;
      summary.hasFollowUpData = true;
    } else if (baselineAvg !== null) {
      summary.hasBaselineData = true;
    } else if (followUpAvg !== null) {
      summary.hasFollowUpData = true;
    }
    
    summary.psfs = {
      averageBaseline: baselineAvg,
      averageFollowUp: followUpAvg,
      percentageChange: change,
      direction,
      activities: activityComparisons,
    };
  }

  // GPOC (Phase 3 only - no baseline comparison)
  const gpocFollowUp = getFollowUpData('gpoc');
  
  if (gpocFollowUp) {
    const rating = gpocFollowUp.answers?.find((a: any) => a.questionId === 'gpoc-q1')?.value;
    
    if (rating !== undefined) {
      summary.gpoc = {
        rating: Number(rating),
        interpretation: getGPOCInterpretation(Number(rating)),
      };
      summary.hasFollowUpData = true;
    }
  }

  return summary;
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
