export interface ProjectCreationPayload {
  name: string;
  description: string;
}

export interface ProjectCreationArgs {
  workspaceId: string;
  data: ProjectCreationPayload;
}
