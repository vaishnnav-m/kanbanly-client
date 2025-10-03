"use client";
import { TableColumn } from "@/types/table.types";
import { WorkspaceMember } from "../api/workspace/workspace.types";
import { ToggleLeft, ToggleRight, Trash } from "lucide-react";
import { workspaceRoles } from "@/types/roles.enum";

export const createMemberColumns = (
  onRoleChange: (memberId: string, role: workspaceRoles) => void,
  onStatusChange: (id: string, newStatus: boolean) => void,
  onRemove: (id: string) => void,
  userRole: workspaceRoles
): TableColumn<WorkspaceMember>[] => {
  const columns: TableColumn<WorkspaceMember>[] = [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
    {
      key: "role",
      label: "Role",
      type: "select",
      cellClassName: "w-28",
      onChange: (row, newRole) =>
        onRoleChange(row._id, newRole as workspaceRoles),
      options: [
        {
          label: "Owner",
          value: "owner",
        },
        {
          label: "Member",
          value: "member",
        },
        {
          label: "PM",
          value: "projectManager",
        },
      ],
      disabled: (row) => userRole !== "owner" || row.role === "owner",
    },
    {
      key: "isActive",
      label: "Status",
      type: "custom",
      render: (row) =>
        row.isActive ? (
          <ToggleRight
            onClick={() => onStatusChange(row._id, false)}
            className="text-green-500 size-7 cursor-pointer"
          />
        ) : (
          <ToggleLeft
            onClick={() => onStatusChange(row._id, true)}
            className="text-red-500 cursor-pointer"
          />
        ),
    },
  ];

  if (userRole === "owner") {
    columns.push({
      key: "delete",
      label: "Manage",
      type: "button",
      cellClassName: "hover:bg-transperant",
      variant: "ghost",
      icon: (row) => row.role !== "owner" && userRole === "owner" && <Trash />,
      onClick: (row) => onRemove(row._id),
    });
  }

  return columns;
};
