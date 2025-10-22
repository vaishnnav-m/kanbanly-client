"use client";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { CardHeader } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { workItemStatusColors } from "@/lib/constants/color.constants";
import { hasPermission, PERMISSIONS } from "@/lib/utils";
import { workspaceRoles } from "@/types/roles.enum";
import { TaskStatus } from "@/types/task.enum";
import { PenBox, Trash, X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface TaskHeaderProps {
  name: string;
  taskStatus: TaskStatus;
  memberRole: workspaceRoles;
  setIsConfirmationOpen: Dispatch<SetStateAction<boolean>>;
  setEditingName: Dispatch<SetStateAction<string | null>>;
  editingName: string | null;
  close: () => void;
}

export const TaskHeader = ({
  name,
  taskStatus,
  memberRole,
  setIsConfirmationOpen,
  editingName,
  setEditingName,
  close,
}: TaskHeaderProps) => {
  const canDelete = hasPermission(memberRole, PERMISSIONS.DELETE_TASK);
  const canEdit = hasPermission(memberRole, PERMISSIONS.EDIT_TASK);

  const statusColors = workItemStatusColors[taskStatus];

  return (
    <CardHeader className="flex-shrink-0 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Badge
            variant="secondary"
            className={`${statusColors.bg} ${statusColors.text} hover:${statusColors.bg} font-medium`}
          >
            {taskStatus.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {canDelete && (
            <Button
              onClick={() => setIsConfirmationOpen(true)}
              className="hover:bg-muted-foreground/20"
              variant="ghost"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
          <Button
            className="hover:bg-muted-foreground/20"
            variant="ghost"
            size="sm"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {editingName !== null ? (
        <Input
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
        />
      ) : (
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-2 group">
          {name}
          {canEdit && (
            <PenBox
              onClick={() => setEditingName(name || "")}
              className="size-3 cursor-pointer group-hover:inline ml-2 hidden"
            />
          )}
        </h2>
      )}
    </CardHeader>
  );
};
