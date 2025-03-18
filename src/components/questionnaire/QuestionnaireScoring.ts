
import { Questionnaire, QuestionnaireResponse } from "@/types/questionnaire";

export interface ScoringResult {
  score: number | null;
  groupScores: Record<string, number | string>;
  savedActivities?: any[];
  recommendedExercises: string[];
}

export const calculateQuestionnaireScore = (
  questionnaire: Questionnaire,
  answers: Record<string, any>,
  savedActivities: any[] = []
): ScoringResult => {
  let calculatedScore: number | null = null;
  let calculatedGroupScores: Record<string, number | string> = {};
  let calculatedRecommendedExercises: string[] = [];
  
  if (!questionnaire.scoring) {
    calculatedScore = Object.entries(answers).reduce((total, [questionId, val]) => {
      if (typeof val === 'number') {
        return total + val;
      }
      return total;
    }, 0);
  } else if (questionnaire.scoring.type === 'sum') {
    calculatedScore = 0;
    
    if (questionnaire.scoring.groups) {
      questionnaire.scoring.groups.forEach(group => {
        const groupScore = group.items.reduce((total, questionId) => {
          const val = answers[questionId];
          if (typeof val === 'number') {
            return total + val;
          }
          return total;
        }, 0);
        
        calculatedGroupScores[group.id] = groupScore;
        
        if (group.id === 'midas_total' || group.id === 'hses_total') {
          calculatedScore = groupScore;
        }
      });
    }
  } else if (questionnaire.scoring.type === 'custom') {
    if (questionnaire.id === 'hsloc') {
      const internalItems = questionnaire.scoring.groups?.find(g => g.id === 'internal')?.items || [];
      const healthcareItems = questionnaire.scoring.groups?.find(g => g.id === 'healthcare')?.items || [];
      const chanceItems = questionnaire.scoring.groups?.find(g => g.id === 'chance')?.items || [];
      
      const internalScore = internalItems.reduce((total, questionId) => {
        return total + (answers[questionId] || 0);
      }, 0);
      
      const healthcareScore = healthcareItems.reduce((total, questionId) => {
        return total + (answers[questionId] || 0);
      }, 0);
      
      const chanceScore = chanceItems.reduce((total, questionId) => {
        return total + (answers[questionId] || 0);
      }, 0);
      
      calculatedGroupScores['internal'] = internalScore;
      calculatedGroupScores['healthcare'] = healthcareScore;
      calculatedGroupScores['chance'] = chanceScore;
      
      let dominant = 'internal';
      let dominantScore = internalScore;
      
      if (healthcareScore > dominantScore) {
        dominant = 'healthcare';
        dominantScore = healthcareScore;
      }
      
      if (chanceScore > dominantScore) {
        dominant = 'chance';
      }
      
      calculatedScore = 0;
      calculatedGroupScores['dominant'] = dominant;
    } else if (questionnaire.id === 'psfs') {
      const activities = [];
      
      if (answers['psfs-activity1']) {
        activities.push({
          id: 'psfs-activity1',
          text: answers['psfs-activity1'],
          rating: Number(answers['psfs-rating1']) || 0
        });
      }
      
      if (answers['psfs-activity2']) {
        activities.push({
          id: 'psfs-activity2',
          text: answers['psfs-activity2'],
          rating: Number(answers['psfs-rating2']) || 0
        });
      }
      
      if (answers['psfs-activity3']) {
        activities.push({
          id: 'psfs-activity3',
          text: answers['psfs-activity3'],
          rating: Number(answers['psfs-rating3']) || 0
        });
      }
      
      if (activities.length > 0) {
        const sum = activities.reduce((total, activity) => total + activity.rating, 0);
        calculatedScore = Math.round((sum / activities.length) * 10) / 10;
      }
    }
  }
  
  if (questionnaire.id === 'fht' && questionnaire.recommendedExercises) {
    const selectedTypes = answers['headache-types'] || [];
    if (Array.isArray(selectedTypes)) {
      const exercises = new Set<string>();
      selectedTypes.forEach(type => {
        const typeExercises = questionnaire.recommendedExercises?.typeMap[type] || [];
        typeExercises.forEach(ex => exercises.add(ex));
      });
      calculatedRecommendedExercises = Array.from(exercises);
    }
  }

  return {
    score: calculatedScore,
    groupScores: calculatedGroupScores,
    savedActivities: questionnaire.id === 'psfs' ? savedActivities : undefined,
    recommendedExercises: calculatedRecommendedExercises
  };
};

export const formatQuestionnaireResponse = (
  questionnaire: Questionnaire,
  answers: Record<string, any>,
  result: ScoringResult
): QuestionnaireResponse => {
  return {
    questionnaireId: questionnaire.id,
    date: new Date().toISOString(),
    answers: Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    })),
    score: result.score || undefined,
    groupScores: Object.keys(result.groupScores).length > 0 ? result.groupScores : undefined,
    savedActivities: result.savedActivities,
    recommendedExercises: result.recommendedExercises.length > 0 ? result.recommendedExercises : undefined
  };
};
