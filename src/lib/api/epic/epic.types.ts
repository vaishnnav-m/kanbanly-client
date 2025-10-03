export interface IEpic {
  epicId: string;
  title: string;
  description?: string;
  workspaceId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEpicPayload {
  workspaceId: string;
  projectId: string;
  title: string;
  description?: string;
}
