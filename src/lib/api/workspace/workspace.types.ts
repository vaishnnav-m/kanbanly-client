export interface WorkspaceCreatePayload {
  name: string;
  description?: string;
  logo?: string;
}

export interface IWorkspace {
  workspaceId: string;
  name: string;
  slug: string;
  description: string;
  createdBy: string;
  members: string[];
  logo: string;
}
