import { TaskPriority, TaskStatus } from "@/types/task.enum";

export interface TaskCreationPayload {
  task: string;
  description?: string;
  priority?: TaskPriority;
  assignedTo?: string;
  dueDate?: Date | string;
}

export interface TaskCreationArgs {
  data: TaskCreationPayload;
  workspaceId: string;
  projectId: string;
}

export interface ITask {
  taskId: string;
  task: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string;
  dueDate: Date;
}

export type TaskListing = Omit<ITask, "description" | "priority">;
