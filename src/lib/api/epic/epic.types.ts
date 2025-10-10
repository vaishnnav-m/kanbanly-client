import { TaskStatus } from "@/types/task.enum";

export interface IEpic {
  epicId: string;
  title: string;
  status: TaskStatus;
  color: string;
  description?: string;
  workspaceId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  percentageDone?: number;
}

export interface CreateEpicPayload {
  workspaceId: string;
  projectId: string;
  title: string;
  color: string;
  description?: string;
}

export type TaskEpic = Pick<IEpic, "epicId" | "title" | "color">;
