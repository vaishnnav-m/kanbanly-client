"use client";
import { TableColumn } from "@/types/table.types";
import { WorkspaceMember } from "../api/workspace/workspace.types";
import { MessageCircle, ToggleLeft, ToggleRight, Trash } from "lucide-react";
import { workspaceRoles } from "@/types/roles.enum";
import { Avatar } from "@/components/atoms/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getAssignedTo } from "../task-utils";

export const createMemberColumns = (
  onRoleChange: (memberId: string, role: workspaceRoles) => void,
  onStatusChange: (id: string, newStatus: boolean) => void,
  onRemove: (id: string) => void,
  onChat: (memberId: string) => void,
  hasPermission: boolean,
  userId: string
): TableColumn<WorkspaceMember>[] => {
  const columns: TableColumn<WorkspaceMember>[] = [
    {
      key: "name",
      label: "Name",
      type: "custom",
      render: (row, value) => (
        <div className="flex gap-5 items-center">
          <Avatar className="size-6">
            <AvatarImage src={row.profile} />
            <AvatarFallback className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-bold rounded-full">
              {getAssignedTo({ email: row.email, name: row.name })}
            </AvatarFallback>
          </Avatar>
          <span>{value}</span>
        </div>
      ),
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
      disabled: (row) => !hasPermission || row.role === "owner",
    },
  ];

  if (hasPermission) {
    columns.push({
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
    });

    columns.push({
      label: "Manage",
      type: "button",
      cellClassName: "hover:bg-transperant",
      variant: "ghost",
      icon: (row) => row.role !== "owner" && <Trash />,
      onClick: (row) => onRemove(row._id),
    });
  }

  columns.push({
    label: "Message",
    type: "button",
    cellClassName: "hover:bg-transperant",
    variant: "ghost",
    icon: (row) => row._id !== userId && <MessageCircle />,
    onClick: (row) => onChat(row._id),
  });

  return columns;
};
