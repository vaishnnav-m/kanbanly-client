"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { workspaceRoles } from "@/types/roles.enum";
import { cn } from "@/lib/utils";
import { IWorkspacePermissions } from "@/lib/api/workspace/workspace.types";
import { WorkspacePermissionEnum } from "@/types/permissions.enum";
import CustomTable from "../CustomTable";
import {
  createRolePermissionColumns,
  PermissionRowData,
} from "@/lib/columns/role-permissions.column";
import { useMemo } from "react";

export const PERMISSION_GROUPS = [
  {
    label: "Workspace Permissions",
    items: [
      { id: WorkspacePermissionEnum.WORKSPACE_EDIT, label: "Edit Workspace" },
      {
        id: WorkspacePermissionEnum.WORKSPACE_MEMBER_ADD,
        label: "Add Workspace Member",
      },
      {
        id: WorkspacePermissionEnum.WORKSPACE_MEMBER_DELETE,
        label: "Remove Workspace Member",
      },
    ],
  },
  {
    label: "Project Permissions",
    items: [
      { id: WorkspacePermissionEnum.PROJECT_CREATE, label: "Create Projects" },
      { id: WorkspacePermissionEnum.PROJECT_EDIT, label: "Edit Projects" },
      {
        id: WorkspacePermissionEnum.PROJECT_MEMBER_ADD,
        label: "Add Project Members",
      },
      {
        id: WorkspacePermissionEnum.PROJECT_MEMBER_DELETE,
        label: "Remove Project Members",
      },
      { id: WorkspacePermissionEnum.PROJECT_DELETE, label: "Delete Projects" },
    ],
  },
  {
    label: "Task Permissions",
    items: [
      { id: WorkspacePermissionEnum.TASK_CREATE, label: "Create Tasks" },
      { id: WorkspacePermissionEnum.TASK_EDIT, label: "Edit Tasks" },
      { id: WorkspacePermissionEnum.TASK_DELETE, label: "Delete Tasks" },
      { id: WorkspacePermissionEnum.TASK_ASSIGN, label: "Assign Tasks" },
    ],
  },
  {
    label: "Epic Permissions",
    items: [
      { id: WorkspacePermissionEnum.EPIC_CREATE, label: "Create Epics" },
      { id: WorkspacePermissionEnum.EPIC_EDIT, label: "Edit Epics" },
      { id: WorkspacePermissionEnum.EPIC_DELETE, label: "Delete Epics" },
    ],
  },
  {
    label: "Sprint Permissions",
    items: [
      { id: WorkspacePermissionEnum.SPRINT_CREATE, label: "Create Sprints" },
      { id: WorkspacePermissionEnum.SPRINT_EDIT, label: "Edit Sprints" },
      { id: WorkspacePermissionEnum.SPRINT_DELETE, label: "Delete Sprints" },
    ],
  },
];

interface RolePermissionsProps {
  className?: string;
  rolePermissions: {
    owner: IWorkspacePermissions;
    projectManager: IWorkspacePermissions;
    member: IWorkspacePermissions;
  };
  handleRolePermissionUpdation: (
    role: workspaceRoles,
    permissionId: keyof IWorkspacePermissions,
    checked: boolean
  ) => void;
}

export function RolePermissions({
  className,
  rolePermissions,
  handleRolePermissionUpdation,
}: RolePermissionsProps) {
  const tableData: PermissionRowData[] = useMemo(() => {
    return PERMISSION_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        id: item.id,
        label: item.label,
        category: group.label,
      }))
    );
  }, []);

  const columns = createRolePermissionColumns(
    rolePermissions,
    handleRolePermissionUpdation
  );

  return (
    <Card
      className={cn("bg-blue-200/5 border-workspace-border mt-8", className)}
    >
      <CardHeader>
        <CardTitle className="text-workspace-text-primary">
          Role Permissions
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage what actions each role can perform within the workspace.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CustomTable data={tableData} columns={columns} getRowKey={(row) => row.id} />
      </CardContent>
    </Card>
  );
}