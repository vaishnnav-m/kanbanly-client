"use client";

import { TableColumn, BaseRowData } from "@/types/table.types";
import { Checkbox } from "@/components/atoms/checkbox";
import { workspaceRoles } from "@/types/roles.enum";
import { IWorkspacePermissions } from "@/lib/api/workspace/workspace.types";

export interface PermissionRowData extends BaseRowData {
  id: string;
  label: string;
  category: string;
}

export const createRolePermissionColumns = (
  rolePermissions: {
    owner: IWorkspacePermissions;
    projectManager: IWorkspacePermissions;
    member: IWorkspacePermissions;
  },
  handleRolePermissionUpdation: (
    role: workspaceRoles,
    permissionId: keyof IWorkspacePermissions,
    checked: boolean
  ) => void
): TableColumn<PermissionRowData>[] => [
  {
    key: "category",
    label: "Category",
    type: "text",
    cellClassName: "font-semibold text-muted-foreground w-[200px]",
  },
  {
    key: "label",
    label: "Permission",
    type: "text",
    cellClassName: "font-medium text-workspace-text-primary",
  },
  {
    key: "owner",
    label: "Owner",
    type: "custom",
    headerClassName: "text-center",
    render: (row) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            rolePermissions.owner?.[row.id as keyof IWorkspacePermissions]
          }
          disabled={true}
          aria-label={`Owner ${row.label}`}
        />
      </div>
    ),
  },
  {
    key: "projectManager",
    label: "Project Manager",
    type: "custom",
    headerClassName: "text-center",
    render: (row) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            rolePermissions.projectManager?.[
              row.id as keyof IWorkspacePermissions
            ]
          }
          onCheckedChange={(checked) =>
            handleRolePermissionUpdation(
              workspaceRoles.projectManager,
              row.id as keyof IWorkspacePermissions,
              checked as boolean
            )
          }
          aria-label={`Project Manager ${row.label}`}
        />
      </div>
    ),
  },
  {
    key: "member",
    label: "Member",
    type: "custom",
    headerClassName: "text-center",
    render: (row) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            rolePermissions.member?.[row.id as keyof IWorkspacePermissions]
          }
          onCheckedChange={(checked) =>
            handleRolePermissionUpdation(
              workspaceRoles.member,
              row.id as keyof IWorkspacePermissions,
              checked as boolean
            )
          }
          aria-label={`Member ${row.label}`}
        />
      </div>
    ),
  },
];