
import { Exercise } from "../types";

// TMJ specific exercises - for Type 6
export const tmjExercises: Exercise[] = [
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
  }
];
