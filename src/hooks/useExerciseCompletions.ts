import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ExerciseCompletion {
  id: string;
  exercise_id: string;
  week: number;
  day: number;
  completed_at: string;
  notes: string | null;
}

export const useExerciseCompletions = (week: number, day: number) => {
  const { user, isAuthenticated } = useAuth();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load completions on mount
  useEffect(() => {
    loadCompletions();
  }, [user, week, day]);

  const loadCompletions = async () => {
    if (!isAuthenticated || !user) {
      // Fall back to localStorage
      const key = `exercise-completions-w${week}-d${day}`;
      const data = localStorage.getItem(key);
      if (data) {
        setCompletedExercises(new Set(JSON.parse(data)));
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('exercise_completions')
        .select('exercise_id')
        .eq('user_id', user.id)
        .eq('week', week)
        .eq('day', day);

      if (error) throw error;

      if (data) {
        setCompletedExercises(new Set(data.map(c => c.exercise_id)));
      }

      // Sync any local data to DB
      await syncLocalToDatabase();
    } catch (err) {
      console.error('Error loading exercise completions:', err);
      // Fall back to localStorage
      const key = `exercise-completions-w${week}-d${day}`;
      const data = localStorage.getItem(key);
      if (data) {
        setCompletedExercises(new Set(JSON.parse(data)));
      }
    } finally {
      setLoading(false);
    }
  };

  const syncLocalToDatabase = async () => {
    if (!isAuthenticated || !user) return;

    const key = `exercise-completions-w${week}-d${day}`;
    const localData = localStorage.getItem(key);
    if (!localData) return;

    try {
      const localCompletions: string[] = JSON.parse(localData);
      for (const exerciseId of localCompletions) {
        await supabase
          .from('exercise_completions')
          .upsert({
            user_id: user.id,
            exercise_id: exerciseId,
            week,
            day,
          }, {
            onConflict: 'user_id,exercise_id,week,day',
          });
      }
      // Clear local data after sync
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error syncing local exercise data:', err);
    }
  };

  const toggleExerciseCompletion = useCallback(async (exerciseId: string) => {
    const isCurrentlyCompleted = completedExercises.has(exerciseId);
    
    // Optimistically update UI
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyCompleted) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });

    if (!isAuthenticated || !user) {
      // Update localStorage
      const key = `exercise-completions-w${week}-d${day}`;
      const newCompletions = isCurrentlyCompleted
        ? Array.from(completedExercises).filter(id => id !== exerciseId)
        : [...Array.from(completedExercises), exerciseId];
      localStorage.setItem(key, JSON.stringify(newCompletions));
      return;
    }

    try {
      if (isCurrentlyCompleted) {
        // Delete completion
        await supabase
          .from('exercise_completions')
          .delete()
          .eq('user_id', user.id)
          .eq('exercise_id', exerciseId)
          .eq('week', week)
          .eq('day', day);
      } else {
        // Insert completion
        await supabase
          .from('exercise_completions')
          .insert({
            user_id: user.id,
            exercise_id: exerciseId,
            week,
            day,
          });
      }
    } catch (err) {
      console.error('Error toggling exercise completion:', err);
      // Revert optimistic update on error
      setCompletedExercises(prev => {
        const newSet = new Set(prev);
        if (isCurrentlyCompleted) {
          newSet.add(exerciseId);
        } else {
          newSet.delete(exerciseId);
        }
        return newSet;
      });
    }
  }, [user, isAuthenticated, week, day, completedExercises]);

  const isExerciseCompleted = useCallback((exerciseId: string) => {
    return completedExercises.has(exerciseId);
  }, [completedExercises]);

  return {
    completedExercises,
    toggleExerciseCompletion,
    isExerciseCompleted,
    loading,
  };
};
