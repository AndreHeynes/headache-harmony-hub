
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
  
  // Scalene stretches
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
    title: "Posterior Scalene Stretch (L)",
    description: "Gentle stretch for the left posterior scalene muscle",
    videoUrl: "https://vimeo.com/1055236162",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Serratus Superior Posterior Stretches
  {
    id: "5.0",
    title: "Serratus Superior Posterior Stretch (L)",
    description: "Stretch for the left serratus superior posterior muscle",
    videoUrl: "https://vimeo.com/1055509706",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "5.1",
    title: "Serratus Superior Posterior Stretch (R)",
    description: "Stretch for the right serratus superior posterior muscle",
    videoUrl: "https://vimeo.com/1055496939",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Pec Stretches
  {
    id: "6.0",
    title: "Pec Major Stretch (R)",
    description: "Stretch for the right pectoralis major muscle",
    videoUrl: "https://vimeo.com/1055538678",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "6.1",
    title: "Pec Major Stretch (L)",
    description: "Stretch for the left pectoralis major muscle",
    videoUrl: "https://vimeo.com/1055538489",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "7.0",
    title: "Pec Minor Stretch (R)",
    description: "Stretch for the right pectoralis minor muscle",
    videoUrl: "https://vimeo.com/1055536253",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "7.1",
    title: "Pec Minor Stretch (L)",
    description: "Stretch for the left pectoralis minor muscle",
    videoUrl: "https://vimeo.com/1055537362",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Levator Scapula Stretches
  {
    id: "8.0",
    title: "Levator Scapula Stretch (L)",
    description: "Stretch for the left levator scapula muscle",
    videoUrl: "https://vimeo.com/1055495787",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "8.1",
    title: "Levator Scapula Stretch (R)",
    description: "Stretch for the right levator scapula muscle",
    videoUrl: "https://vimeo.com/1055513620",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Erector Spinae Stretch
  {
    id: "9.1",
    title: "Erector Spinae Stretch (L)",
    description: "Stretch for the left erector spinae muscles",
    videoUrl: "https://vimeo.com/1055516700",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Chin and neck exercises
  {
    id: "10.0",
    title: "Chin Retractions",
    description: "Exercise to improve posture and neck alignment",
    videoUrl: "https://vimeo.com/1055478757",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "11.0",
    title: "Neck Forward Flexion",
    description: "Exercise for controlled forward neck flexion",
    videoUrl: "https://vimeo.com/1055534709",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "12.0",
    title: "Extension SNAG",
    description: "Sustained Natural Apophyseal Glide technique for neck extension",
    videoUrl: "https://vimeo.com/1056026986",
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
    videoUrl: "https://vimeo.com/1056323077",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "15.0",
    title: "Right Rotation SNAG",
    description: "Sustained Natural Apophyseal Glide technique for right neck rotation",
    videoUrl: "https://vimeo.com/1056035754",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Archer exercises
  {
    id: "16.0",
    title: "Archer Right",
    description: "Archer exercise focusing on the right side",
    videoUrl: "https://vimeo.com/1055531453",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "17.0",
    title: "Archer Left",
    description: "Archer exercise focusing on the left side",
    videoUrl: "https://vimeo.com/1055532091",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Neck strength exercises - beginner
  {
    id: "18.0",
    title: "Deep Neck Flexors (Start)",
    description: "Beginning exercise for strengthening deep neck flexor muscles",
    videoUrl: "https://vimeo.com/1055529323",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "19.0",
    title: "Neck Extensors (Quadruped) Level 1",
    description: "Exercise for strengthening neck extensor muscles in quadruped position",
    videoUrl: "https://vimeo.com/1055528458",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Neck strength exercises - intermediate
  {
    id: "18.2",
    title: "Deep Neck Flexors Level 1",
    description: "Intermediate exercise for strengthening deep neck flexor muscles",
    videoUrl: "https://vimeo.com/1056346548",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "19.2",
    title: "Neck Extensors (In Sitting) Level 1",
    description: "Intermediate exercise for strengthening neck extensor muscles in sitting position",
    videoUrl: "https://vimeo.com/1056349026",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "23.1",
    title: "Scapular Shrug Level 2",
    description: "Intermediate exercise for strengthening scapular muscles",
    videoUrl: "https://vimeo.com/1056354815",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Neck strength exercises - advanced
  {
    id: "18.3",
    title: "Deep Neck Flexors Level 3",
    description: "Advanced exercise for strengthening deep neck flexor muscles",
    videoUrl: "https://vimeo.com/1056345656",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "20.0",
    title: "Neck Extensors (Quadruped) Level 2",
    description: "Advanced exercise for strengthening neck extensor muscles in quadruped position",
    videoUrl: "https://vimeo.com/1056350830",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "22.2",
    title: "Neck Rotators (In Sitting) Level 3",
    description: "Advanced exercise for strengthening neck rotator muscles in sitting position",
    videoUrl: "https://vimeo.com/1056356041",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Neck strength exercises - very advanced
  {
    id: "18.4",
    title: "Deep Neck Flexors Level 4",
    description: "Very advanced exercise for strengthening deep neck flexor muscles",
    videoUrl: "https://vimeo.com/1064035960",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "20.1",
    title: "Neck Extensors (Plank) Level 2",
    description: "Very advanced exercise for strengthening neck extensor muscles in plank position",
    videoUrl: "https://vimeo.com/1064036584",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "21.0",
    title: "Neck Extensors (Quadruped) Level 3",
    description: "Very advanced exercise for strengthening neck extensor muscles in quadruped position",
    videoUrl: "https://vimeo.com/1064036904",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "22.1",
    title: "Neck Rotators (Quadruped) Level 3",
    description: "Very advanced exercise for strengthening neck rotator muscles in quadruped position",
    videoUrl: "https://vimeo.com/1064037851",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "22.0",
    title: "Neck Rotators (Plank) Level 1",
    description: "Very advanced exercise for strengthening neck rotator muscles in plank position",
    videoUrl: "https://vimeo.com/1064039520",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "23.3",
    title: "Scapular Shrug Level 4",
    description: "Very advanced exercise for strengthening scapular muscles",
    videoUrl: "https://vimeo.com/1064040975",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Combined movement exercises
  {
    id: "41.0",
    title: "Combined Movement (R) Level 1",
    description: "Combined movement exercise focusing on the right side",
    videoUrl: "https://vimeo.com/1064041454",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "41.1",
    title: "Combined Movement (L) Level 1",
    description: "Combined movement exercise focusing on the left side",
    videoUrl: "https://vimeo.com/1064041845",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "20.2",
    title: "Neck Extensors (Inclined Sitting) Level 2",
    description: "Advanced exercise for strengthening neck extensor muscles in inclined sitting position",
    videoUrl: "https://vimeo.com/1064043285",
    isGeneralExercise: true,
    type: "exercise"
  },
  
  // Additional advanced exercises for days 50+
  {
    id: "21.2",
    title: "Neck Extensors (Inclined Sitting) Level 3",
    description: "Advanced exercise for strengthening neck extensor muscles in inclined sitting position",
    videoUrl: "https://vimeo.com/1064046071",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "42.0",
    title: "Combined Movement Level 2",
    description: "Combined movement exercise - advanced level",
    videoUrl: "https://vimeo.com/1064046071",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "43.0",
    title: "Combined Movement Level 3",
    description: "Combined movement exercise - expert level",
    videoUrl: "https://vimeo.com/1064047181",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "46.0",
    title: "Gaze Stability Level 1",
    description: "Beginning exercise for improving gaze stability",
    videoUrl: "https://vimeo.com/1064047552",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "46.1",
    title: "Gaze Stability Level 2",
    description: "Advanced exercise for improving gaze stability",
    videoUrl: "https://vimeo.com/1064048874",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "48.0",
    title: "Eye/Head Coordination Level 1",
    description: "Beginning exercise for improving eye and head coordination",
    videoUrl: "https://vimeo.com/1064048022",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "48.1",
    title: "Eye/Head Coordination Level 2",
    description: "Advanced exercise for improving eye and head coordination",
    videoUrl: "https://vimeo.com/1064049805",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "50.0",
    title: "Trunk/Head Coordination",
    description: "Exercise for improving coordination between trunk and head movements",
    videoUrl: "https://vimeo.com/1064048394",
    isGeneralExercise: true,
    type: "exercise"
  },
  {
    id: "57.0",
    title: "Neural Mobility Level 2",
    description: "Advanced neural mobility exercise",
    videoUrl: "https://vimeo.com/placeholder",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
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
  },
  {
    id: "mhej",
    title: "Mindful Headache Experience Journal",
    description: "Journal for tracking your mindful experiences with headaches",
    type: "activity",
    activitySheetName: "Mindful Headache Experience Journal",
    activitySheetId: "mindful-headache-journal",
    requiresInput: true
  }
];
