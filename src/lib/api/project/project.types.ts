export interface ProjectCreationPayload {
  name: string;
  description: string;
}

export interface ProjectCreationArgs {
  workspaceId: string;
  data: ProjectCreationPayload;
}

export interface IProject {
  projectId: string;
  name: string;
  description: string;
  members: string[];
  status?: "active" | "completed" | "pending";
  lastUpdated?: string;
}
