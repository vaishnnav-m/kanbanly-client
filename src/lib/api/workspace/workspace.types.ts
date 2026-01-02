import { WorkspacePermissionEnum } from "@/types/permissions.enum";
import { workspaceRoles } from "@/types/roles.enum";

export type IWorkspacePermissions = {
  [key in WorkspacePermissionEnum]: boolean;
};

export interface WorkspaceCreatePayload {
  name: string;
  description?: string;
  logo?: string;
}

export interface PermissionUpdationPayload {
  role: workspaceRoles;
  permissions: Partial<IWorkspacePermissions>;
}

export interface PermissionUpdationArgs {
  workspaceId: string;
  data: PermissionUpdationPayload;
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
  createdBy:
    | string
    | {
        userId: string;
        email: string;
        name: string;
        profile?: string;
      };
  members?: number;
  logo?: string;
  permissions: {
    owner: IWorkspacePermissions;
    projectManager: IWorkspacePermissions;
    member: IWorkspacePermissions;
  };
  createdAt: Date;
  memberCount?: number;
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

export type CurrentMemberResponse = Omit<WorkspaceMember, "_id"> & {
  userId: string;
  permissions: IWorkspacePermissions;
};

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

// analytics
export interface ICompletionSlice {
  name: string;
  value: number;
  color: string;
}

export interface IProgressItem {
  status: string;
  count: number;
}

export interface ITrendItem {
  month: string;
  created: number;
  completed: number;
}

export interface ITopPerformer {
  name: string;
  role: string;
  taskCompleted: number;
  avatar?: string;
  progress: number;
}

export interface IWorkloadItem {
  role: workspaceRoles;
  workload: number;
}

export interface ITaskAnalyticsResponse {
  completionData: ICompletionSlice[];
  progressData: IProgressItem[];
  trendData: ITrendItem[];
}

export interface ITeamPerformanceResponse {
  topPerformers: ITopPerformer[];
  workloadData: IWorkloadItem[];
  productivityScore: number;
}

export interface IWorkspaceSummaryResponse {
  totalProjects: number;
  projectsThisMonth: number;
  activeMembers: number;
  membersThisWeek: number;
  ongoingTasks: number;
  completionRate: number;
  recentActivities: number;
  lastActivity: Date;
}

export interface IDashboardResponse {
  workspaceSummary: IWorkspaceSummaryResponse;
  taskAnalytics: ITaskAnalyticsResponse;
  teamPerformance: ITeamPerformanceResponse;
}
