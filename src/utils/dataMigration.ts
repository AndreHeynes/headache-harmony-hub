/**
 * Data Migration Utility
 * 
 * @deprecated This file is deprecated. Data is now stored in the database via useQuestionnaireResponses hook.
 * These functions are kept for backward compatibility during the transition period.
 * Migration from localStorage to database is handled by useDataMigration hook on user login.
 */

const PHASE1_QUESTIONNAIRES = ['hit-6', 'midas', 'psfs', 'hses', 'hsloc', 'hb', 'psc', 'fht', 'mkq', 'headache-type'];
const PHASE3_QUESTIONNAIRES = ['hit-6', 'midas', 'psfs', 'gpoc'];

/**
 * @deprecated Use database hooks instead
 */
export function isMigrated(): boolean {
  return localStorage.getItem('questionnaire-data-migrated') === 'true';
}

/**
 * @deprecated Use database hooks instead
 */
export function setMigrated(): void {
  localStorage.setItem('questionnaire-data-migrated', 'true');
}

/**
 * @deprecated Use useUserStatus hook instead
 */
export function getCurrentPhase(): number {
  const savedPhase = localStorage.getItem('current-phase');
  return savedPhase ? parseInt(savedPhase, 10) : 1;
}

/**
 * @deprecated Migration is now handled by useDataMigration hook
 */
export function migrateQuestionnaireData(): boolean {
  // No-op - migration is now handled by useDataMigration hook on user login
  console.log('migrateQuestionnaireData is deprecated - migration handled by useDataMigration hook');
  return false;
}

/**
 * @deprecated Use useQuestionnaireResponses hook instead
 */
export function hasPhase1Data(): boolean {
  return PHASE1_QUESTIONNAIRES.some(id => {
    return localStorage.getItem(`questionnaire-phase1-${id}`) !== null ||
           localStorage.getItem(`questionnaire-${id}`) !== null;
  });
}

/**
 * @deprecated Use useQuestionnaireResponses hook instead
 */
export function hasPhase3Data(): boolean {
  return PHASE3_QUESTIONNAIRES.some(id => {
    return localStorage.getItem(`questionnaire-phase3-${id}`) !== null;
  });
}

/**
 * @deprecated Use useQuestionnaireResponses.getPhaseResponses() instead
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
