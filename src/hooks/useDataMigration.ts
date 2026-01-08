import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { secureRetrieve, secureRemove } from '@/utils/security/encryption';
import { Json } from '@/integrations/supabase/types';

const QUESTIONNAIRE_IDS = ['hit-6', 'midas', 'psfs', 'gpoc', 'hsloc', 'fht', 'psc', 'hb', 'mkq', 'hses', 'headache-type'];

export const useDataMigration = () => {
  const { user, isAuthenticated } = useAuth();
  const [migrating, setMigrating] = useState(false);
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkAndMigrateData();
    }
  }, [user, isAuthenticated]);

  const checkAndMigrateData = async () => {
    if (!user) return;

    try {
      // Check if already migrated
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('data_migrated_to_db')
        .eq('user_id', user.id)
        .maybeSingle();

      if (progressError) {
        console.error('Error checking migration status:', progressError);
        return;
      }

      if (progressData?.data_migrated_to_db) {
        setMigrated(true);
        return;
      }

      // Perform migration
      await migrateLocalData();
    } catch (err) {
      console.error('Error in migration check:', err);
    }
  };

  const migrateLocalData = useCallback(async () => {
    if (!user || migrating) return;

    setMigrating(true);
    console.log('Starting data migration to database...');

    try {
      // 1. Migrate questionnaire responses
      await migrateQuestionnaireResponses();

      // 2. Migrate task completions
      await migrateTaskCompletions();

      // 3. Mark migration as complete
      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          data_migrated_to_db: true,
        }, {
          onConflict: 'user_id',
        });

      setMigrated(true);
      console.log('Data migration completed successfully');
    } catch (err) {
      console.error('Error during data migration:', err);
    } finally {
      setMigrating(false);
    }
  }, [user, migrating]);

  const migrateQuestionnaireResponses = async () => {
    if (!user) return;

    for (const phase of [1, 3]) {
      for (const questionnaireId of QUESTIONNAIRE_IDS) {
        const key = `questionnaire-phase${phase}-${questionnaireId}`;
        const data = localStorage.getItem(key);
        
        // Also check legacy format
        const legacyKey = `questionnaire-${questionnaireId}`;
        const legacyData = phase === 1 ? localStorage.getItem(legacyKey) : null;
        
        const responseData = data || legacyData;
        if (!responseData) continue;

        try {
          const response = JSON.parse(responseData);
          
          await supabase
            .from('user_responses')
            .upsert({
              user_id: user.id,
              questionnaire_id: questionnaireId,
              phase,
              answers: response.answers as unknown as Json,
              score: response.score ?? null,
              group_scores: response.groupScores as unknown as Json ?? null,
              saved_activities: response.savedActivities as unknown as Json ?? null,
              recommended_exercises: response.recommendedExercises ?? null,
              completed_at: response.date || new Date().toISOString(),
            }, {
              onConflict: 'user_id,questionnaire_id,phase',
            });

          // Don't remove localStorage data yet - keep as fallback
          console.log(`Migrated ${key}`);
        } catch (err) {
          console.error(`Error migrating ${key}:`, err);
        }
      }
    }

    // Migrate PSFS activities separately
    for (const phase of [1, 3]) {
      const key = `psfs-activities-phase${phase}`;
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const activities = JSON.parse(data);
          // PSFS activities are stored within the user_responses table
          const existingResponse = await supabase
            .from('user_responses')
            .select('id')
            .eq('user_id', user.id)
            .eq('questionnaire_id', 'psfs')
            .eq('phase', phase)
            .maybeSingle();

          if (existingResponse.data) {
            await supabase
              .from('user_responses')
              .update({
                saved_activities: activities as unknown as Json,
              })
              .eq('id', existingResponse.data.id);
          }
        } catch (err) {
          console.error(`Error migrating PSFS activities for phase ${phase}:`, err);
        }
      }
    }
  };

  const migrateTaskCompletions = async () => {
    if (!user) return;

    // Migrate Phase 2 task completions (from secureStore)
    for (let day = 1; day <= 77; day++) {
      try {
        const tasks = await secureRetrieve(`phase2-day${day}-tasks`);
        if (tasks && Object.keys(tasks).length > 0) {
          for (const [taskId, completed] of Object.entries(tasks)) {
            if (completed) {
              await supabase
                .from('task_completions')
                .upsert({
                  user_id: user.id,
                  task_id: taskId,
                  phase: 2,
                  day,
                  completed: true,
                }, {
                  onConflict: 'user_id,task_id,phase,day',
                });
            }
          }
          console.log(`Migrated Phase 2 Day ${day} tasks`);
        }
      } catch (err) {
        // Likely no data for this day
      }
    }

    // Migrate Phase 1 and 3 tasks from regular localStorage
    for (const phase of [1, 3]) {
      for (let day = 1; day <= 10; day++) {
        const key = `phase${phase}-day${day}-tasks`;
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const tasks = JSON.parse(data);
            for (const [taskId, completed] of Object.entries(tasks)) {
              if (completed) {
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
              }
            }
            console.log(`Migrated Phase ${phase} Day ${day} tasks`);
          } catch (err) {
            console.error(`Error migrating ${key}:`, err);
          }
        }
      }
    }
  };

  return {
    migrating,
    migrated,
    migrateLocalData,
  };
};
