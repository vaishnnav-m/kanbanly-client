export interface ProjectCreationPayload {
  name: string;
  description: string;
}

export interface ProjectCreationArgs {
  workspaceId: string;
  projectId: string;
  data: ProjectCreationPayload;
}

export interface IProject {
  projectId: string;
  name: string;
  description?: string;
}
