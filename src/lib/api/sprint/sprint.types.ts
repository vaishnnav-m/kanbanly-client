export enum SprintStatus {
  Future = "future",
  Active = "active",
  Completed = "completed",
}

export interface ISprint {
  sprintId: string;
  name: string;
  goal?: string;
  workspaceId: string;
  projectId: string;
  createdBy: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateSprintPayload {
  name?: string;
  goal?: string;
  duration?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface UpdateSprintArgs {
  workspaceId: string;
  projectId: string;
  sprintId: string;
  data: UpdateSprintPayload;
}

export interface CreateSprintArgs {
  workspaceId: string;
  projectId: string;
}

export interface ISprintResponse {
  sprintId: string;
  name: string;
  status: SprintStatus;
  startDate: Date;
  endDate: Date;
}
