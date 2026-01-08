import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Json } from '@/integrations/supabase/types';

interface ActivitySheetData {
  formData: Record<string, any>;
  status: 'in-progress' | 'completed';
  completedAt?: string;
}

export const useActivitySheetProgress = (activitySheetId: string) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<'in-progress' | 'completed'>('in-progress');
  const [loading, setLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [user, activitySheetId]);

  const loadProgress = async () => {
    if (!isAuthenticated || !user) {
      // Fall back to localStorage
      const key = `activity-sheet-${activitySheetId}`;
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        setFormData(parsed.formData || {});
        setStatus(parsed.status || 'in-progress');
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('activity_sheet_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_sheet_id', activitySheetId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFormData((data.form_data as Record<string, any>) || {});
        setStatus((data.status as 'in-progress' | 'completed') || 'in-progress');
      }

      // Sync any local data to DB
      await syncLocalToDatabase();
    } catch (err) {
      console.error('Error loading activity sheet progress:', err);
      // Fall back to localStorage
      const key = `activity-sheet-${activitySheetId}`;
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        setFormData(parsed.formData || {});
        setStatus(parsed.status || 'in-progress');
      }
    } finally {
      setLoading(false);
    }
  };

  const syncLocalToDatabase = async () => {
    if (!isAuthenticated || !user) return;

    const key = `activity-sheet-${activitySheetId}`;
    const localData = localStorage.getItem(key);
    if (!localData) return;

    try {
      const parsed = JSON.parse(localData);
      await supabase
        .from('activity_sheet_progress')
        .upsert({
          user_id: user.id,
          activity_sheet_id: activitySheetId,
          form_data: parsed.formData as unknown as Json,
          status: parsed.status || 'in-progress',
          completed_at: parsed.status === 'completed' ? new Date().toISOString() : null,
        }, {
          onConflict: 'user_id,activity_sheet_id',
        });
      // Clear local data after sync
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error syncing local activity sheet data:', err);
    }
  };

  const saveProgress = useCallback(async (newFormData: Record<string, any>) => {
    setFormData(newFormData);

    if (!isAuthenticated || !user) {
      // Update localStorage
      const key = `activity-sheet-${activitySheetId}`;
      localStorage.setItem(key, JSON.stringify({
        formData: newFormData,
        status,
      }));
      return;
    }

    try {
      await supabase
        .from('activity_sheet_progress')
        .upsert({
          user_id: user.id,
          activity_sheet_id: activitySheetId,
          form_data: newFormData as unknown as Json,
          status,
        }, {
          onConflict: 'user_id,activity_sheet_id',
        });
    } catch (err) {
      console.error('Error saving activity sheet progress:', err);
      // Fall back to localStorage
      const key = `activity-sheet-${activitySheetId}`;
      localStorage.setItem(key, JSON.stringify({
        formData: newFormData,
        status,
      }));
    }
  }, [user, isAuthenticated, activitySheetId, status]);

  const markComplete = useCallback(async () => {
    setStatus('completed');

    if (!isAuthenticated || !user) {
      // Update localStorage
      const key = `activity-sheet-${activitySheetId}`;
      localStorage.setItem(key, JSON.stringify({
        formData,
        status: 'completed',
        completedAt: new Date().toISOString(),
      }));
      return;
    }

    try {
      await supabase
        .from('activity_sheet_progress')
        .upsert({
          user_id: user.id,
          activity_sheet_id: activitySheetId,
          form_data: formData as unknown as Json,
          status: 'completed',
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,activity_sheet_id',
        });
    } catch (err) {
      console.error('Error marking activity sheet complete:', err);
    }
  }, [user, isAuthenticated, activitySheetId, formData]);

  return {
    formData,
    status,
    loading,
    saveProgress,
    markComplete,
  };
};

// Hook to get all completed activity sheets
export const useCompletedActivitySheets = () => {
  const { user, isAuthenticated } = useAuth();
  const [completedSheets, setCompletedSheets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompletedSheets();
  }, [user]);

  const loadCompletedSheets = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('activity_sheet_progress')
        .select('activity_sheet_id')
        .eq('user_id', user.id)
        .eq('status', 'completed');

      if (error) throw error;

      if (data) {
        setCompletedSheets(data.map(d => d.activity_sheet_id));
      }
    } catch (err) {
      console.error('Error loading completed activity sheets:', err);
    } finally {
      setLoading(false);
    }
  };

  return { completedSheets, loading };
};
