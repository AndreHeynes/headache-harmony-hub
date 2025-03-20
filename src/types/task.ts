
export type TaskStatus = "not-started" | "in-progress" | "completed";
export type TaskType = "default" | "questionnaire" | "document" | "video";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  type?: TaskType;
  link?: string;
  questionnaire?: string;
}
