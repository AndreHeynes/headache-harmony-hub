
/**
 * Configuration for exercise details based on exercise title
 */
export interface ExerciseConfig {
  reps: string;
  sets: string;
  frequency: string;
}

/**
 * Get exercise details configuration based on exercise title
 */
export const getExerciseConfig = (title: string): ExerciseConfig => {
  // Default values
  const defaultConfig: ExerciseConfig = {
    reps: "10-15",
    sets: "3",
    frequency: "3x daily"
  };
  
  // IDs with specific patterns
  if (title.includes("Anterior Scalene") || 
      title.includes("Middle Scalene") ||
      title.includes("Posterior Scalene") ||
      title.includes("Serratus Superior") ||
      title.includes("Pec Major") ||
      title.includes("Pec Minor") ||
      title.includes("Levator Scapula") ||
      title.includes("Erector Spinae")) {
    return {
      reps: "20 second hold",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Serratus Superior Posterior Stretch")) {
    return {
      reps: "20 second holds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Deep Neck Flexors (Start)")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "2x daily (before getting out of bed and returning to bed)"
    };
  } else if (title.includes("Deep Neck Flexors Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Deep Neck Flexors Level 2")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Deep Neck Flexors Level 3")) {
    return {
      reps: "15",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Deep Neck Flexors Level 4")) {
    return {
      reps: "20",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Relaxed Breathing (Seated)")) {
    return {
      reps: "Relaxed breathing",
      sets: "2",
      frequency: "2x daily"
    };
  } else if (title.includes("Relaxed Breathing (Side")) {
    return {
      reps: "Relaxed breathing",
      sets: "2",
      frequency: "Before getting out of bed & when getting back to bed"
    };
  } else if (title.includes("Neck Forward Flexion") || title.includes("Neck FWD Flexion")) {
    return {
      reps: "10 x 10 second holds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Chin Retractions")) {
    return {
      reps: "10 x 10 second holds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("SNAG")) {
    return {
      reps: "5 x 10 second holds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Archer")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("TMJ Opening Mobilization")) {
    return {
      reps: "10",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Self Massage")) {
    return {
      reps: "60 seconds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neural Mobility Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neural Mobility Level 2")) {
    return {
      reps: "6",
      sets: "2",
      frequency: "2x daily"
    };
  } else if (title.includes("Combined Movement Level 1")) {
    return {
      reps: "10 x 10 second holds",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Combined Movement Level 2")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Combined Movement Level 3")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Gaze Stability Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Gaze Stability Level 2")) {
    return {
      reps: "15",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Eye/Head Coordination Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Eye/Head Coordination Level 2")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Trunk/Head Coordination")) {
    return {
      reps: "15",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Quadruped) Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Plank) Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (In Sitting) Level 1")) {
    return {
      reps: "10",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Quadruped) Level 2")) {
    return {
      reps: "15",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Plank) Level 2")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Inclined Sitting) Level 2")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Quadruped) Level 3")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Plank) Level 3")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Extensors (Inclined Sitting) Level 3")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Rotators (Plank) Level 1")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Rotators (Quadruped) Level 2")) {
    return {
      reps: "15",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Neck Rotator (Inclined Sitting) Level 3")) {
    return {
      reps: "20",
      sets: "5",
      frequency: "3x daily"
    };
  } else if (title.includes("Scapular Shrug Level 1")) {
    return {
      reps: "5 x 10 second holds",
      sets: "3",
      frequency: "Before getting out of bed and when getting back to bed"
    };
  } else if (title.includes("Scapular Shrug Level 2")) {
    return {
      reps: "10",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Scapular Shrug Level 3")) {
    return {
      reps: "20",
      sets: "3",
      frequency: "3x daily"
    };
  } else if (title.includes("Scapular Shrug Level 4")) {
    return {
      reps: "25",
      sets: "5",
      frequency: "3x daily"
    };
  }
  
  return defaultConfig;
};
