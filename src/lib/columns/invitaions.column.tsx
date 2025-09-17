"use client";
import { TableColumn } from "@/types/table.types";
import {
  InvitationList,
  WorkspaceInvitationPayload,
} from "../api/workspace/workspace.types";
import { RefreshCcw, Trash } from "lucide-react";

export const createInvitationColumns = (
  onRemove: (email: string) => void,
  onResend: (data: WorkspaceInvitationPayload) => void
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
  {
    key: "resend",
    label: "Resend",
    type: "button",
    cellClassName: "hover:bg-transperant",
    variant: "ghost",
    icon: () => <RefreshCcw />,
    onClick: (row) =>
      onResend({ invitedEmail: row.invitedEmail, role: row.role }),
  },
];
