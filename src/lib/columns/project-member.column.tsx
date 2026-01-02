"use client";
import { TableColumn } from "@/types/table.types";
import { WorkspaceMember } from "../api/workspace/workspace.types";
import { Trash } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getAssignedTo } from "../task-utils";

export const createProjectMemberColumns = (
  onRemove: (id: string) => void,
  hasPermission: boolean
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
      disabled: () => true,
    },
  ];

  if (hasPermission) {
    columns.push({
      label: "Manage",
      type: "button",
      cellClassName: "hover:bg-transperant",
      variant: "ghost",
      icon: (row) => row.role !== "owner" && <Trash />,
      onClick: (row) => onRemove(row._id),
    });
  }

  return columns;
};
