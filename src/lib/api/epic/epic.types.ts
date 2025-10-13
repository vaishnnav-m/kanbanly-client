import { TaskStatus } from "@/types/task.enum";
import { ITask } from "../task/task.types";

export interface IEpic {
  epicId: string;
  title: string;
  status: TaskStatus;
  color: string;
  description?: string;
  children?: ITask[];
  workspaceId: string;
  projectId: string;
  dueDate?: Date;
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
