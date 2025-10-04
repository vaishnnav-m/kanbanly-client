import { projectStatus, projectTemplate } from "@/types/project.enum";

export interface ProjectCreationPayload {
  name: string;
  description: string;
  key: string;
  template: projectTemplate;
}

export interface ProjectCreationArgs {
  workspaceId: string;
  data: ProjectCreationPayload;
}

export type ProjectEditingPayload = Partial<ProjectCreationPayload>;

export interface ProjectEditingArgs {
  workspaceId: string;
  projectId: string;
  data: ProjectEditingPayload;
}

export interface IProject {
  projectId: string;
  name: string;
  key: string;
  description: string;
  members: string[];
  status?: projectStatus;
  template: projectTemplate;
  lastUpdated?: string;
  createdAt?: string;
}
