
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from './useCurrentUser';
import { Json } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export interface SmartGoal {
  id: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  targetDate: string; // ISO date
}

export interface SelectedExercise {
  exerciseId: string;
  title: string;
  sets: number;
  reps: number;
  category: string;
}

export interface WeeklySchedule {
  [day: string]: string[]; // day name -> exercise IDs
}

export interface SportPlan {
  stages: SportStage[];
  notes: string;
}

export interface SportStage {
  id: string;
  label: string;
  completed: boolean;
  notes: string;
}

export interface MaintenanceProgram {
  goals: SmartGoal[];
  selectedExercises: SelectedExercise[];
  weeklySchedule: WeeklySchedule;
  sportPlan: SportPlan;
}

const DEFAULT_SPORT_PLAN: SportPlan = {
  stages: [
    { id: "short-slow", label: "Short slow runs", completed: false, notes: "" },
    { id: "short-fast", label: "Short faster runs", completed: false, notes: "" },
    { id: "long-slow", label: "Long slow runs", completed: false, notes: "" },
    { id: "long-fast", label: "Long faster runs", completed: false, notes: "" },
  ],
  notes: "",
};

const DEFAULT_SCHEDULE: WeeklySchedule = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const DEFAULT_PROGRAM: MaintenanceProgram = {
  goals: [],
  selectedExercises: [],
  weeklySchedule: DEFAULT_SCHEDULE,
  sportPlan: DEFAULT_SPORT_PLAN,
};

export const useMaintenanceProgram = () => {
  const { id: userId, isAuthenticated } = useCurrentUser();
  const [program, setProgram] = useState<MaintenanceProgram>(DEFAULT_PROGRAM);
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load on mount
  useEffect(() => {
    if (isAuthenticated && userId) {
      loadProgram();
    } else {
      // localStorage fallback
      const data = localStorage.getItem('maintenance-program');
      if (data) {
        try {
          setProgram({ ...DEFAULT_PROGRAM, ...JSON.parse(data) });
        } catch { /* ignore */ }
      }
      setLoading(false);
    }
  }, [userId, isAuthenticated]);

  const loadProgram = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_programs')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setRecordId(data.id);
        setProgram({
          goals: (data.goals as any) || [],
          selectedExercises: (data.selected_exercises as any) || [],
          weeklySchedule: (data.weekly_schedule as any) || DEFAULT_SCHEDULE,
          sportPlan: (data.sport_plan as any) || DEFAULT_SPORT_PLAN,
        });
      }
    } catch (err) {
      console.error('Error loading maintenance program:', err);
      const data = localStorage.getItem('maintenance-program');
      if (data) {
        try { setProgram({ ...DEFAULT_PROGRAM, ...JSON.parse(data) }); } catch { /* ignore */ }
      }
    } finally {
      setLoading(false);
    }
  };

  const persistProgram = useCallback(async (updated: MaintenanceProgram) => {
    // Always save to localStorage
    localStorage.setItem('maintenance-program', JSON.stringify(updated));

    if (!isAuthenticated || !userId) return;

    try {
      const payload = {
        user_id: userId,
        goals: updated.goals as unknown as Json,
        selected_exercises: updated.selectedExercises as unknown as Json,
        weekly_schedule: updated.weeklySchedule as unknown as Json,
        sport_plan: updated.sportPlan as unknown as Json,
      };

      if (recordId) {
        const { error } = await supabase
          .from('maintenance_programs')
          .update(payload)
          .eq('id', recordId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('maintenance_programs')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        if (data) setRecordId(data.id);
      }
    } catch (err) {
      console.error('Error saving maintenance program:', err);
    }
  }, [userId, isAuthenticated, recordId]);

  const debouncedSave = useCallback((updated: MaintenanceProgram) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persistProgram(updated), 1000);
  }, [persistProgram]);

  const updateProgram = useCallback((partial: Partial<MaintenanceProgram>) => {
    setProgram(prev => {
      const updated = { ...prev, ...partial };
      debouncedSave(updated);
      return updated;
    });
  }, [debouncedSave]);

  const setGoals = useCallback((goals: SmartGoal[]) => updateProgram({ goals }), [updateProgram]);
  const setSelectedExercises = useCallback((selectedExercises: SelectedExercise[]) => updateProgram({ selectedExercises }), [updateProgram]);
  const setWeeklySchedule = useCallback((weeklySchedule: WeeklySchedule) => updateProgram({ weeklySchedule }), [updateProgram]);
  const setSportPlan = useCallback((sportPlan: SportPlan) => updateProgram({ sportPlan }), [updateProgram]);

  const activeDaysCount = Object.values(program.weeklySchedule).filter(exs => exs.length > 0).length;

  return {
    program,
    loading,
    setGoals,
    setSelectedExercises,
    setWeeklySchedule,
    setSportPlan,
    updateProgram,
    activeDaysCount,
  };
};
