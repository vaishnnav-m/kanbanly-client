import { workspaceIcons } from "@/constants/icons";
import { workspaceRoles } from "@/types/roles.enum";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const setStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const removeStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const getWorkspaceIcon = (name: string) => {
  return workspaceIcons.find((iconData) => iconData.name === name);
};

export const getDate = (isoString: Date | string) => {
  const date = new Date(isoString);

  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatted;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "completed":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "medium":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "high":
      return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};


// handle permissions
export const PERMISSIONS = {
  VIEW_PENDING_INVITATIONS: "view_pending_invitations",
  CREATE_PROJECT: "create_project",
  EDIT_PROJECT: "edit_project",
  DELETE_PROJECT: "delete_project",
  CREATE_TASK: "create_task",
  EDIT_TASK: "edit_task",
  DELETE_TASK: "delete_task",
  MANAGE_MEMBERS: "manage_members",
  VIEW_REPORTS: "view_reports",
};

type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const rolePermissions = new Map<workspaceRoles, Set<Permission>>([
  [
    workspaceRoles.owner,
    new Set([
      PERMISSIONS.CREATE_PROJECT,
      PERMISSIONS.EDIT_PROJECT,
      PERMISSIONS.DELETE_PROJECT,
      PERMISSIONS.CREATE_TASK,
      PERMISSIONS.EDIT_TASK,
      PERMISSIONS.DELETE_TASK,
      PERMISSIONS.MANAGE_MEMBERS,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.VIEW_PENDING_INVITATIONS,
    ]),
  ],
  [
    workspaceRoles.projectManager,
    new Set([
      PERMISSIONS.CREATE_PROJECT,
      PERMISSIONS.EDIT_PROJECT,
      PERMISSIONS.CREATE_TASK,
      PERMISSIONS.EDIT_TASK,
      PERMISSIONS.DELETE_TASK,
      PERMISSIONS.MANAGE_MEMBERS,
      PERMISSIONS.VIEW_REPORTS,
    ]),
  ],
  [
    workspaceRoles.member,
    new Set([
      PERMISSIONS.CREATE_TASK,
      PERMISSIONS.EDIT_TASK,
      PERMISSIONS.VIEW_REPORTS,
    ]),
  ],
]);

export const hasPermission = (
  role: workspaceRoles,
  permission: Permission
): boolean => {
  const permissions = rolePermissions.get(role);
  if (!permissions) return false;
  return permissions.has(permission);
};
