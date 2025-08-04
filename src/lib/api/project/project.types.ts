import { projectStatus } from "@/types/project.enum";

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
  status?: projectStatus;
  lastUpdated?: string;
}
