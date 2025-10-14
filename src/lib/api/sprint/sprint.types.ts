export interface ISprint {
  sprintId: string;
  name: string;
  description?: string;
  workspaceId: string;
  projectId: string;
  createdBy: string;
  startDate: Date;
  endDate: Date;
}

export interface CreateSprintPayload {
  name: string;
  descripiton?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateSprintArgs {
  workspaceId: string;
  projectId: string;
  sprintData: CreateSprintPayload;
}
