
/**
 * Data Migration Utility
 * Migrates existing questionnaire data to phase-prefixed format
 */

const PHASE1_QUESTIONNAIRES = ['hit-6', 'midas', 'psfs', 'hses', 'hsloc', 'hb', 'psc', 'fht', 'mkq', 'headache-type'];
const PHASE3_QUESTIONNAIRES = ['hit-6', 'midas', 'psfs', 'gpoc'];

/**
 * Check if migration has already been performed
 */
export function isMigrated(): boolean {
  return localStorage.getItem('questionnaire-data-migrated') === 'true';
}

/**
 * Mark migration as complete
 */
export function setMigrated(): void {
  localStorage.setItem('questionnaire-data-migrated', 'true');
}

/**
 * Get the current phase from localStorage
 */
export function getCurrentPhase(): number {
  const savedPhase = localStorage.getItem('current-phase');
  return savedPhase ? parseInt(savedPhase, 10) : 1;
}

/**
 * Migrate existing questionnaire data to phase-prefixed format
 * This preserves existing data as Phase 1 baseline
 */
export function migrateQuestionnaireData(): boolean {
  if (isMigrated()) {
    console.log('Migration already completed');
    return false;
  }

  console.log('Starting questionnaire data migration...');
  let migratedCount = 0;

  PHASE1_QUESTIONNAIRES.forEach(id => {
    const oldKey = `questionnaire-${id}`;
    const newKey = `questionnaire-phase1-${id}`;
    
    const existingData = localStorage.getItem(oldKey);
    const newData = localStorage.getItem(newKey);
    
    // Only migrate if old data exists and new data doesn't
    if (existingData && !newData) {
      localStorage.setItem(newKey, existingData);
      console.log(`Migrated ${oldKey} -> ${newKey}`);
      migratedCount++;
    }
  });

  // Also migrate PSFS activities
  const psfsActivities = localStorage.getItem('psfs-activities');
  const newPsfsActivities = localStorage.getItem('psfs-activities-phase1');
  if (psfsActivities && !newPsfsActivities) {
    localStorage.setItem('psfs-activities-phase1', psfsActivities);
    console.log('Migrated PSFS activities to Phase 1');
    migratedCount++;
  }

  setMigrated();
  console.log(`Migration complete. Migrated ${migratedCount} items.`);
  
  return migratedCount > 0;
}

/**
 * Check if any Phase 1 questionnaire data exists
 */
export function hasPhase1Data(): boolean {
  return PHASE1_QUESTIONNAIRES.some(id => {
    return localStorage.getItem(`questionnaire-phase1-${id}`) !== null ||
           localStorage.getItem(`questionnaire-${id}`) !== null;
  });
}

/**
 * Check if any Phase 3 questionnaire data exists
 */
export function hasPhase3Data(): boolean {
  return PHASE3_QUESTIONNAIRES.some(id => {
    return localStorage.getItem(`questionnaire-phase3-${id}`) !== null;
  });
}

/**
 * Get all completed questionnaires for a specific phase
 */
export function getCompletedQuestionnaires(phase: 1 | 3): Record<string, boolean> {
  const questionnaires = phase === 1 ? PHASE1_QUESTIONNAIRES : PHASE3_QUESTIONNAIRES;
  const completed: Record<string, boolean> = {};
  
  questionnaires.forEach(id => {
    const phaseKey = `questionnaire-phase${phase}-${id}`;
    const legacyKey = `questionnaire-${id}`;
    
    if (localStorage.getItem(phaseKey) || (phase === 1 && localStorage.getItem(legacyKey))) {
      completed[id] = true;
    }
  });
  
  return completed;
}
