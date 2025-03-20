
import { Exercise } from "./types";

// Exercise database
export const exercises: Exercise[] = [
  // Breathing exercises - general for everyone
  {
    id: "0.1",
    title: "Relaxed Breathing (Seated)",
    description: "Deep relaxed breathing technique performed while seated",
    videoUrl: "https://vimeo.com/1055229271",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "0.2",
    title: "Relaxed Breathing (Sidelying)",
    description: "Deep relaxed breathing technique performed while lying on your side",
    videoUrl: "https://vimeo.com/1055222728",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Scalene stretches - general for everyone
  {
    id: "2.0",
    title: "Anterior Scalene Stretch (R)",
    description: "Gentle stretch for the right anterior scalene muscle",
    videoUrl: "https://vimeo.com/1055234697",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "2.1", 
    title: "Anterior Scalene Stretch (L)",
    description: "Gentle stretch for the left anterior scalene muscle",
    videoUrl: "https://vimeo.com/1055478757",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3.0",
    title: "Middle Scalene Stretch (R)",
    description: "Gentle stretch for the right middle scalene muscle",
    videoUrl: "https://vimeo.com/1055479330",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3.1",
    title: "Middle Scalene Stretch (L)",
    description: "Gentle stretch for the left middle scalene muscle",
    videoUrl: "https://vimeo.com/1055479994",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "4.0",
    title: "Posterior Scalene Stretch (R)",
    description: "Gentle stretch for the right posterior scalene muscle",
    videoUrl: "https://vimeo.com/1055481097",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "4.1",
    title: "Posterior Salene Stretch (L)",
    description: "Gentle stretch for the left posterior scalene muscle",
    videoUrl: "https://vimeo.com/1055236162",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Chin and neck exercises - general for everyone
  {
    id: "10.0",
    title: "Chin Retractions",
    description: "Exercise to improve posture and neck alignment",
    videoUrl: "https://vimeo.com/1055478757",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "12.0",
    title: "Extension SNAG",
    description: "Sustained Natural Apophyseal Glide technique for neck extension",
    videoUrl: "",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "13.0",
    title: "Reverse SNAG",
    description: "Reversed Sustained Natural Apophyseal Glide technique",
    videoUrl: "https://vimeo.com/1055482073",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "14.0",
    title: "Left Rotation SNAG",
    description: "Sustained Natural Apophyseal Glide technique for left neck rotation",
    videoUrl: "https://vimeo.com/1055483241",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // TMJ specific exercises - for Type 6
  {
    id: "51.0",
    title: "TMJ Opening Mobilization 1 (R)",
    description: "Gentle mobilization technique for the right temporomandibular joint",
    videoUrl: "https://vimeo.com/1055488933",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "51.1",
    title: "TMJ Opening Mobilization 1 (L)",
    description: "Gentle mobilization technique for the left temporomandibular joint",
    videoUrl: "https://vimeo.com/1055490245",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "52.0",
    title: "TMJ Opening Mobilization 2",
    description: "Advanced mobilization technique for the temporomandibular joint",
    videoUrl: "https://vimeo.com/1055483903",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "53.0",
    title: "Temporal Self Massage",
    description: "Self-massage technique for temporal region to relieve tension",
    videoUrl: "https://vimeo.com/1055487326",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  {
    id: "54.0",
    title: "Buccal Self Massage",
    description: "Self-massage technique for the buccal region to relieve tension",
    videoUrl: "https://vimeo.com/1055485611",
    includedForTypes: ["6"],
    excludedForTypes: ["4"],
    type: "exercise"
  },
  
  // Occipital Neuralgia specific exercises - for Type 4
  {
    id: "56.1",
    title: "Neural Mobility Level 1 (L)",
    description: "Neural mobility exercise for the left side",
    videoUrl: "https://vimeo.com/1063585819",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  {
    id: "56.2",
    title: "Neural Mobility Level 1 (R)",
    description: "Neural mobility exercise for the right side",
    videoUrl: "https://vimeo.com/1063586666",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  {
    id: "57",
    title: "Additional Occipital Exercise",
    description: "Specialized exercise for occipital neuralgia",
    videoUrl: "https://vimeo.com/example",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  },
  
  // General exercises that everyone does
  {
    id: "1",
    title: "Deep Breathing Exercise",
    description: "Controlled breathing technique to reduce stress and tension",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "2",
    title: "Posture Correction",
    description: "Exercise to improve posture and reduce neck strain",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "3",
    title: "Shoulder Rolls",
    description: "Simple exercise to relieve tension in shoulders and upper back",
    videoUrl: "https://vimeo.com/example",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Activity sheets based on readiness for change (from PSC)
  {
    id: "as-1",
    title: "Improved Readiness for Change",
    description: "Activities to help you move forward in your pain management journey",
    type: "activity",
    activitySheetName: "AS 1 Improved Readiness for Change",
    activitySheetId: "readiness-for-change",
    requiresInput: true
  },
  {
    id: "as-2",
    title: "Developing Helpful Beliefs",
    description: "Exercises to identify and modify beliefs about your pain",
    type: "activity",
    activitySheetName: "AS 2 Developing Helpful Beliefs",
    activitySheetId: "helpful-beliefs",
    requiresInput: true
  },
  {
    id: "as-3",
    title: "Introduction to Headache Mechanisms",
    description: "Learn about the science behind headaches and how they work",
    type: "activity",
    activitySheetName: "AS 3 Introduction to Headache Mechanisms",
    activitySheetId: "headache-mechanisms",
    requiresInput: false
  },
  {
    id: "as-4",
    title: "Sleep Hygiene",
    description: "Techniques to improve sleep quality and reduce headaches",
    type: "activity",
    activitySheetName: "AS 4 Sleep Hygiene",
    activitySheetId: "sleep-hygiene",
    requiresInput: true
  },
  {
    id: "as-5",
    title: "Trigger Management",
    description: "Techniques to identify and manage headache triggers",
    type: "activity",
    activitySheetName: "AS 5 Trigger Management",
    activitySheetId: "trigger-management",
    requiresInput: true
  },
  {
    id: "as-5.1",
    title: "Medication Management",
    description: "Strategies for effective use of headache medications",
    type: "activity",
    activitySheetName: "AS 5.1 Medication Management",
    activitySheetId: "medication-management",
    requiresInput: true
  }
];
