import { workspaceRoles } from "@/types/roles.enum";

export interface WorkspaceCreatePayload {
  name: string;
  description?: string;
  logo?: string;
}

export type WorkspaceEditPayload = Partial<WorkspaceCreatePayload>;

export interface WorkspaceEditArgs {
  workspaceId: string;
  data: WorkspaceEditPayload;
}

export interface IWorkspace {
  workspaceId: string;
  name: string;
  slug: string;
  description: string;
  createdBy: string;
  members?: number;
  logo?: string;
  createdAt: Date;
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
  profile?: string;
  role: workspaceRoles;
  isActive: boolean;
}

export interface EditWorkspaceMember {
  workspaceId: string;
  data: { memberId: string; role?: workspaceRoles; isActive?: boolean };
}

export enum invitationStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
  expired = "expired",
}

export interface InvitationList {
  invitedEmail: string;
  invitedBy: string;
  role: workspaceRoles;
  status: invitationStatus;
  expiresAt: Date;
}
