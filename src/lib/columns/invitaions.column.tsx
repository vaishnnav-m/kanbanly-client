"use client";
import { TableColumn } from "@/types/table.types";
import { InvitationList } from "../api/workspace/workspace.types";
import { Trash } from "lucide-react";
import { workspaceRoles } from "@/types/roles.enum";

export const createInvitationColumns = (
  onRemove: (id: string) => void
): TableColumn<InvitationList>[] => [
  {
    key: "invitedEmail",
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
  {
    key: "status",
    label: "Status",
    type: "text",
  },
  {
    key: "delete",
    label: "Manage",
    type: "button",
    cellClassName: "hover:bg-transperant",
    variant: "ghost",
    icon: (row) => row.role !== "owner" && <Trash />,
    onClick: (row) => onRemove(row.invitedEmail),
  },
];
