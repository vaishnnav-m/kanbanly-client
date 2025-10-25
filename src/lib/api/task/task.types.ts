import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { WorkspaceMember } from "../workspace/workspace.types";
import { TaskEpic } from "../epic/epic.types";

export interface TaskCreationPayload {
  task: string;
  description?: string;
  workItemType: WorkItemType;
  priority: TaskPriority;
  status?: TaskStatus;
  assignedTo?: string;
  dueDate?: Date | string;
  storyPoint?: number;
  sprintId?: string;
  parentId?: string;
}

export interface AttachParentPayload {
  parentType: "task" | "epic";
  parentId: string;
}

export interface TaskCreationArgs {
  data: TaskCreationPayload;
  workspaceId: string;
  projectId: string;
}

export interface StatusChangingArgs {
  workspaceId: string;
  projectId: string;
  taskId: string;
  data: { newStatus: TaskStatus };
}

export interface ITask {
  taskId: string;
  task: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  workItemType: WorkItemType;
  assignedTo?: string | WorkspaceMember;
  sprintId?: string;
  epicId?: string;
  epic?: TaskEpic;
  dueDate: Date;
}

export interface TaskEditArgs {
  workspaceId: string;
  projectId: string;
  taskId: string;
  data: Partial<TaskCreationPayload>;
}

export type AttachParentArgs = Omit<TaskEditArgs, "data"> & {
  data: AttachParentPayload;
};

export interface AttachSprintPayload {
  workspaceId: string;
  projectId: string;
  taskId: string;
  sprintId: string;
}

export interface ITaskDetails {
  taskId: string;
  task: string;
  description?: string;
  status: TaskStatus;
  assignedTo: {
    email: string;
    name: string;
    profile?: string;
  } | null;
  priority: TaskPriority;
  workItemType: WorkItemType;
  parent?: {
    parentId: string;
    name: string;
    type: WorkItemType;
    color?: string;
  };
  dueDate: Date;
  createdBy: {
    email: string;
    name: string;
    profile?: string;
  };
  storyPoint?: number;
  createdAt: string;
  updatedAt: string;
}

export type TaskListing = Omit<ITask, "description">;
