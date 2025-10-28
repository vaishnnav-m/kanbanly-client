"use client";
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
    <div className="flex-shrink-0 p-6 border-b border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}
        >
          {taskStatus}
        </div>
        <div className="flex items-center gap-1">
          {canDelete && (
            <button
              onClick={() => setIsConfirmationOpen(true)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Trash className="h-4 w-4 text-slate-400" />
            </button>
          )}
          <button
            onClick={close}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {editingName !== null ? (
        <input
          value={editingName || name}
          onChange={(e) => setEditingName(e.target.value)}
          className="w-full text-2xl font-bold bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <h2 className="text-2xl font-bold text-white group flex items-center gap-2">
          {name}
          {canEdit && (
            <PenBox
              onClick={() => setEditingName(name)}
              className="w-4 h-4 cursor-pointer opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity"
            />
          )}
        </h2>
      )}
    </div>
  );
};
