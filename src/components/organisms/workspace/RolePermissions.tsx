"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Checkbox } from "@/components/atoms/checkbox";
import { workspaceRoles } from "@/types/roles.enum";
import { cn } from "@/lib/utils";
import { IWorkspacePermissions } from "@/lib/api/workspace/workspace.types";
import { WorkspacePermissionEnum } from "@/types/permissions.enum";

interface Permission {
  id: string;
  label: string;
}

const permissions: Permission[] = [
  { id: WorkspacePermissionEnum.WORKSPACE_MANAGE, label: "Workspace Manage" },

  { id: WorkspacePermissionEnum.PROJECT_CREATE, label: "Create Projects" },
  { id: WorkspacePermissionEnum.PROJECT_EDIT, label: "Edit Projects" },
  {
    id: WorkspacePermissionEnum.PROJECT_MEMBER_ADD,
    label: "Add members to projects",
  },
  { id: WorkspacePermissionEnum.PROJECT_DELETE, label: "Delete Projects" },

  { id: WorkspacePermissionEnum.TASK_CREATE, label: "Task Creation" },
  { id: WorkspacePermissionEnum.TASK_EDIT, label: "Edit Task" },
  { id: WorkspacePermissionEnum.TASK_DELETE, label: "Delete Task" },
  { id: WorkspacePermissionEnum.TASK_ASSIGN, label: "Assign Task" },
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Permission</TableHead>
              <TableHead className="text-center">Owner</TableHead>
              <TableHead className="text-center">Project Manager</TableHead>
              <TableHead className="text-center">Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium text-workspace-text-primary">
                  {permission.label}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={
                        rolePermissions[workspaceRoles.owner]?.[
                          permission.id as keyof IWorkspacePermissions
                        ]
                      }
                      onCheckedChange={(checked) =>
                        handleRolePermissionUpdation(
                          workspaceRoles.owner,
                          permission.id as keyof IWorkspacePermissions,
                          checked as boolean
                        )
                      }
                      disabled={true}
                      aria-label={`Owner ${permission.label}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={
                        rolePermissions[workspaceRoles.projectManager]?.[
                          permission.id as keyof IWorkspacePermissions
                        ]
                      }
                      onCheckedChange={(checked) =>
                        handleRolePermissionUpdation(
                          workspaceRoles.projectManager,
                          permission.id as keyof IWorkspacePermissions,
                          checked as boolean
                        )
                      }
                      aria-label={`Project Manager ${permission.label}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={
                        rolePermissions[workspaceRoles.member]?.[
                          permission.id as keyof IWorkspacePermissions
                        ]
                      }
                      onCheckedChange={(checked) =>
                        handleRolePermissionUpdation(
                          workspaceRoles.member,
                          permission.id as keyof IWorkspacePermissions,
                          checked as boolean
                        )
                      }
                      aria-label={`Member ${permission.label}`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
