import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { secureRetrieve, secureRemove } from '@/utils/security/encryption';

export const useTaskCompletions = (phase: number, day: number) => {
  const { user, isAuthenticated } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Load completions on mount
  useEffect(() => {
    loadCompletions();
  }, [user, phase, day]);

  const loadCompletions = async () => {
    if (!isAuthenticated || !user) {
      // Fall back to localStorage/secureStore
      await loadFromLocalStorage();
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('task_completions')
        .select('task_id, completed')
        .eq('user_id', user.id)
        .eq('phase', phase)
        .eq('day', day);

      if (error) throw error;

      if (data) {
        const tasks: Record<string, boolean> = {};
        data.forEach(t => {
          tasks[t.task_id] = t.completed;
        });
        setCompletedTasks(tasks);
      }

      // Sync any local data to DB
      await syncLocalToDatabase();
    } catch (err) {
      console.error('Error loading task completions:', err);
      // Fall back to localStorage
      await loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = async () => {
    try {
      // Try secureStore for Phase 2
      if (phase === 2) {
        const savedTasks = await secureRetrieve(`phase2-day${day}-tasks`);
        if (savedTasks) {
          setCompletedTasks(savedTasks);
          return;
        }
      }
      
      // Try regular localStorage for other phases
      const key = `phase${phase}-day${day}-tasks`;
      const data = localStorage.getItem(key);
      if (data) {
        setCompletedTasks(JSON.parse(data));
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
    }
  };

  const syncLocalToDatabase = async () => {
    if (!isAuthenticated || !user) return;

    try {
      // Sync Phase 2 secure store data
      if (phase === 2) {
        const localTasks = await secureRetrieve(`phase2-day${day}-tasks`);
        if (localTasks && Object.keys(localTasks).length > 0) {
          for (const [taskId, completed] of Object.entries(localTasks)) {
            await supabase
              .from('task_completions')
              .upsert({
                user_id: user.id,
                task_id: taskId,
                phase,
                day,
                completed: Boolean(completed),
              }, {
                onConflict: 'user_id,task_id,phase,day',
              });
          }
          // Clear local data after sync
          secureRemove(`phase2-day${day}-tasks`);
        }
      }
      
      // Sync regular localStorage data
      const key = `phase${phase}-day${day}-tasks`;
      const localData = localStorage.getItem(key);
      if (localData) {
        const tasks = JSON.parse(localData);
        for (const [taskId, completed] of Object.entries(tasks)) {
          await supabase
            .from('task_completions')
            .upsert({
              user_id: user.id,
              task_id: taskId,
              phase,
              day,
              completed: Boolean(completed),
            }, {
              onConflict: 'user_id,task_id,phase,day',
            });
        }
        localStorage.removeItem(key);
      }
    } catch (err) {
      console.error('Error syncing local task data:', err);
    }
  };

  const toggleTaskCompletion = useCallback(async (taskId: string) => {
    const isCurrentlyCompleted = completedTasks[taskId] ?? false;
    const newCompleted = !isCurrentlyCompleted;
    
    // Optimistically update UI
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: newCompleted,
    }));

    if (!isAuthenticated || !user) {
      // Update localStorage/secureStore
      const updatedTasks = {
        ...completedTasks,
        [taskId]: newCompleted,
      };
      
      if (phase === 2) {
        const { secureStore } = await import('@/utils/security/encryption');
        await secureStore(`phase2-day${day}-tasks`, updatedTasks);
      } else {
        const key = `phase${phase}-day${day}-tasks`;
        localStorage.setItem(key, JSON.stringify(updatedTasks));
      }
      return;
    }

    try {
      if (newCompleted) {
        await supabase
          .from('task_completions')
          .upsert({
            user_id: user.id,
            task_id: taskId,
            phase,
            day,
            completed: true,
          }, {
            onConflict: 'user_id,task_id,phase,day',
          });
      } else {
        await supabase
          .from('task_completions')
          .delete()
          .eq('user_id', user.id)
          .eq('task_id', taskId)
          .eq('phase', phase)
          .eq('day', day);
      }
    } catch (err) {
      console.error('Error toggling task completion:', err);
      // Revert optimistic update on error
      setCompletedTasks(prev => ({
        ...prev,
        [taskId]: isCurrentlyCompleted,
      }));
    }
  }, [user, isAuthenticated, phase, day, completedTasks]);

  const isTaskCompleted = useCallback((taskId: string) => {
    return completedTasks[taskId] ?? false;
  }, [completedTasks]);

  return {
    completedTasks,
    toggleTaskCompletion,
    isTaskCompleted,
    loading,
  };
};
