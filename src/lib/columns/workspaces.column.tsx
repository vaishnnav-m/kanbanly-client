import { TableColumn } from "@/types/table.types";
import { IWorkspace } from "../api/workspace/workspace.types";
import { Trash } from "lucide-react";

export const createWorkspacesColumns = (onRemove: (id: string) => void) => {
  const columns: TableColumn<IWorkspace>[] = [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      type: "text",
    },
    {
      key: "memberCount",
      label: "Members",
      type: "text",
    },
    {
      key: "createdBy",
      label: "Created By",
      type: "custom",
      render: (row) => (
        <span>{typeof row.createdBy !== "string" && row.createdBy.email}</span>
      ),
    },
    {
      label: "Manage",
      type: "button",
      cellClassName: "hover:bg-transperant",
      variant: "ghost",
      icon: () => <Trash />,
      onClick: (row) => onRemove(row.workspaceId),
    },
  ];

  return columns;
};
