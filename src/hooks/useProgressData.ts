import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from './useCurrentUser';
import { 
  ProgressSummary, 
  QuestionnaireComparison, 
  PSFSActivityComparison,
  calculatePercentageChange,
  getHIT6Interpretation,
  getMIDASInterpretation,
  getGPOCInterpretation,
} from '@/utils/progressCalculation';

interface UserResponseData {
  questionnaire_id: string;
  phase: number;
  answers: any;
  score: number | null;
  saved_activities: any;
}

/**
 * Hook to fetch progress data from database for Phase 1 vs Phase 3 comparison
 * Falls back to localStorage for unauthenticated users
 */
export const useProgressData = () => {
  const { id: userId, isAuthenticated } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    loadProgressData();
  }, [userId, isAuthenticated]);

  const loadProgressData = async () => {
    setLoading(true);

    try {
      if (isAuthenticated && userId) {
        // Fetch from database
        const { data, error } = await supabase
          .from('user_responses')
          .select('questionnaire_id, phase, answers, score, saved_activities')
          .eq('user_id', userId)
          .in('questionnaire_id', ['hit-6', 'midas', 'psfs', 'gpoc'])
          .in('phase', [1, 3]);

        if (error) throw error;

        const summary = buildProgressSummary(data || []);
        setProgress(summary);
      } else {
        // No user - return empty summary
        setProgress(buildProgressSummary([]));
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error loading progress data:', err);
      // Return empty summary on error
      setProgress(buildProgressSummary([]));
    } finally {
      setLoading(false);
    }
  };

  const refreshProgress = useCallback(() => {
    loadProgressData();
  }, [userId, isAuthenticated]);

  return { progress, loading, refreshProgress };
};

function buildProgressSummary(data: UserResponseData[]): ProgressSummary {
  const summary: ProgressSummary = {
    hit6: null,
    midas: null,
    psfs: null,
    gpoc: null,
    hasBaselineData: false,
    hasFollowUpData: false,
  };

  // Helper to get data by questionnaire ID and phase
  const getData = (id: string, phase: number) => 
    data.find(d => d.questionnaire_id === id && d.phase === phase);

  // HIT-6 Comparison
  const hit6Baseline = getData('hit-6', 1);
  const hit6FollowUp = getData('hit-6', 3);

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
  const midasBaseline = getData('midas', 1);
  const midasFollowUp = getData('midas', 3);

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

  // PSFS Comparison
  const psfsBaseline = getData('psfs', 1);
  const psfsFollowUp = getData('psfs', 3);

  const baselineActivities = (psfsBaseline?.saved_activities as any[]) || [];
  const followUpActivities = (psfsFollowUp?.saved_activities as any[]) || [];

  if (baselineActivities.length > 0 || followUpActivities.length > 0) {
    const activityComparisons: PSFSActivityComparison[] = [];

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

    const baselineAvg = baselineActivities.length > 0
      ? baselineActivities.reduce((sum: number, a: any) => sum + a.rating, 0) / baselineActivities.length
      : null;
    const followUpAvg = followUpActivities.length > 0
      ? followUpActivities.reduce((sum: number, a: any) => sum + a.rating, 0) / followUpActivities.length
      : null;

    let change = null;
    let direction: 'improved' | 'worsened' | 'unchanged' | 'unknown' = 'unknown';

    if (baselineAvg !== null && followUpAvg !== null) {
      const result = calculatePercentageChange(baselineAvg, followUpAvg, false);
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

  // GPOC (Phase 3 only)
  const gpocFollowUp = getData('gpoc', 3);

  if (gpocFollowUp) {
    const answers = gpocFollowUp.answers as any[];
    const rating = answers?.find((a: any) => a.questionId === 'gpoc-q1')?.value;

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
