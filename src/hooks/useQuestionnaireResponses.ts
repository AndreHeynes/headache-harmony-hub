import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from './useCurrentUser';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { Json } from '@/integrations/supabase/types';
import { toast } from 'sonner';

interface UserResponse {
  id: string;
  user_id: string;
  questionnaire_id: string;
  phase: number;
  answers: Json;
  score: number | null;
  group_scores: Json | null;
  saved_activities: Json | null;
  recommended_exercises: string[] | null;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

interface SaveResponseParams {
  questionnaireId: string;
  phase: 1 | 3;
  response: QuestionnaireResponse;
}

export const useQuestionnaireResponses = () => {
  const { id: userId, isAuthenticated } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save a questionnaire response
  const saveResponse = useCallback(async ({ questionnaireId, phase, response }: SaveResponseParams) => {
    if (!isAuthenticated || !userId) {
      // Fall back to localStorage for non-authenticated users
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      localStorage.setItem(key, JSON.stringify(response));
      toast.info('Saved locally - sign in to sync across devices');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: upsertError } = await supabase
        .from('user_responses')
        .upsert({
          user_id: userId,
          questionnaire_id: questionnaireId,
          phase,
          answers: response.answers as unknown as Json,
          score: response.score ?? null,
          group_scores: response.groupScores as unknown as Json ?? null,
          saved_activities: response.savedActivities as unknown as Json ?? null,
          recommended_exercises: response.recommendedExercises ?? null,
          completed_at: response.date,
        }, {
          onConflict: 'user_id,questionnaire_id,phase',
        });

      if (upsertError) throw upsertError;

      // Also store locally for offline fallback
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      localStorage.setItem(key, JSON.stringify(response));
    } catch (err: any) {
      if (import.meta.env.DEV) console.error('Error saving questionnaire response:', err);
      setError(err.message);
      toast.error('Failed to sync to cloud - saved locally instead');
      // Fall back to localStorage on error
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      localStorage.setItem(key, JSON.stringify(response));
    } finally {
      setLoading(false);
    }
  }, [userId, isAuthenticated]);

  // Get a single response
  const getResponse = useCallback(async (questionnaireId: string, phase: 1 | 3): Promise<QuestionnaireResponse | null> => {
    if (!isAuthenticated || !userId) {
      // Fall back to localStorage
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }

    try {
      const { data, error } = await supabase
        .from('user_responses')
        .select('*')
        .eq('user_id', userId)
        .eq('questionnaire_id', questionnaireId)
        .eq('phase', phase)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        return transformToQuestionnaireResponse(data);
      }

      // Fall back to localStorage if not in DB
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      const localData = localStorage.getItem(key);
      return localData ? JSON.parse(localData) : null;
    } catch (err: any) {
      if (import.meta.env.DEV) console.error('Error fetching questionnaire response:', err);
      // Fall back to localStorage on error
      const key = `questionnaire-phase${phase}-${questionnaireId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }, [userId, isAuthenticated]);

  // Get all responses for a phase
  const getPhaseResponses = useCallback(async (phase: 1 | 3): Promise<Record<string, QuestionnaireResponse>> => {
    const responses: Record<string, QuestionnaireResponse> = {};

    if (!isAuthenticated || !userId) {
      // Fall back to localStorage
      const questionnaireIds = ['hit-6', 'midas', 'psfs', 'gpoc', 'hsloc', 'fht', 'psc', 'hb', 'mkq', 'hses'];
      for (const id of questionnaireIds) {
        const key = `questionnaire-phase${phase}-${id}`;
        const data = localStorage.getItem(key);
        if (data) {
          responses[id] = JSON.parse(data);
        }
      }
      return responses;
    }

    try {
      const { data, error } = await supabase
        .from('user_responses')
        .select('*')
        .eq('user_id', userId)
        .eq('phase', phase);

      if (error) throw error;

      if (data) {
        for (const row of data) {
          responses[row.questionnaire_id] = transformToQuestionnaireResponse(row);
        }
      }
    } catch (err: any) {
      if (import.meta.env.DEV) console.error('Error fetching phase responses:', err);
    }

    return responses;
  }, [userId, isAuthenticated]);

  // Get baseline (Phase 1) data for progress comparison
  const getBaselineData = useCallback(async (questionnaireId: string) => {
    return getResponse(questionnaireId, 1);
  }, [getResponse]);

  // Get follow-up (Phase 3) data for progress comparison
  const getFollowUpData = useCallback(async (questionnaireId: string) => {
    return getResponse(questionnaireId, 3);
  }, [getResponse]);

  return {
    saveResponse,
    getResponse,
    getPhaseResponses,
    getBaselineData,
    getFollowUpData,
    loading,
    error,
  };
};

// Helper function to transform database row to QuestionnaireResponse
function transformToQuestionnaireResponse(data: UserResponse): QuestionnaireResponse {
  return {
    questionnaireId: data.questionnaire_id,
    answers: data.answers as any[],
    date: data.completed_at,
    score: data.score ?? undefined,
    groupScores: data.group_scores as Record<string, number> | undefined,
    savedActivities: data.saved_activities as any[] | undefined,
    recommendedExercises: data.recommended_exercises ?? undefined,
  };
}
