
export type TaskStatus = "not-started" | "in-progress" | "completed";
export type TaskType = "default" | "questionnaire" | "document" | "video" | "content" | "warning";

export interface Task {
  id: number;
  title: string;
  description?: string; // Added description as an optional property
  status: TaskStatus;
  type?: TaskType;
  link?: string;
  questionnaire?: string;
}
