import { Exercise } from "../types";

// Occipital Neuralgia specific exercises - for Type 4
export const occipitalExercises: Exercise[] = [
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
    id: "57.0",
    title: "Neural Mobility Level 2",
    description: "Advanced neural mobility exercise",
    videoUrl: "https://vimeo.com/placeholder",
    includedForTypes: ["4"],
    excludedForTypes: ["6"],
    type: "exercise"
  }
];
