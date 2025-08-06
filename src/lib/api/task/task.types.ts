import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { WorkspaceMember } from "../workspace/workspace.types";

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
  assignedTo?: string | WorkspaceMember;
  dueDate: Date;
}

export interface ITaskDetails {
  task: string;
  description?: string;
  status: string;
  assignedTo: {
    email: string;
    name: string;
  } | null;
  priority: TaskPriority;
  dueDate: Date;
}

export type TaskListing = Omit<ITask, "description">;
