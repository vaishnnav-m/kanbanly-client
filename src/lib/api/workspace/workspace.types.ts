import { workspaceRoles } from "@/types/roles.enum";

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

export interface WorkspaceInvitationPayload {
  invitedEmail: string;
  role: workspaceRoles;
}

export interface SendInvititationArgs {
  workspaceId: string;
  data: WorkspaceInvitationPayload;
}

export interface WorkspaceMember {
  _id: string;
  name: string;
  email: string;
  role: workspaceRoles;
}

