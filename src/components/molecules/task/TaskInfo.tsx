import { Input } from "@/components/atoms/input";
import { PenBox, PlusCircle } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { AssigneeCard } from "./AssigneeCard";
import { getDate, hasPermission, PERMISSIONS } from "@/lib/utils";
import { Textarea } from "@/components/atoms/textarea";
import { TaskPriority } from "@/types/task.enum";
import { workspaceRoles } from "@/types/roles.enum";
import { PriorityBadge } from "@/lib/constants/workitem.constats";
import { Button } from "@/components/atoms/button";

interface TaskInfoProps {
  taskId: string;
  dueDate: Date;
  priority: TaskPriority;
  description?: string;
  assignedTo: { email: string; name: string } | null;
  memberRole: workspaceRoles;
  editingDueDate: string | null;
  setEditingDueDate: Dispatch<SetStateAction<string | null>>;
  editingDescription: string | null;
  setEditingDescription: Dispatch<SetStateAction<string | null>>;
}

export const TaskInfo = ({
  taskId,
  dueDate,
  priority,
  description,
  assignedTo,
  memberRole,
  editingDueDate,
  setEditingDueDate,
  editingDescription,
  setEditingDescription,
}: TaskInfoProps) => {
  const canEdit = hasPermission(memberRole, PERMISSIONS.EDIT_TASK);

  const handleOpenDatePicker = () => {
    const initialDate = dueDate ? new Date(dueDate) : new Date();
    setEditingDueDate(initialDate.toISOString().slice(0, 10));
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
        {/* Due Date */}
        <div className="space-y-2">
          <div className="flex gap-2 items-center group">
            <label className="text-muted-foreground">Due date</label>
            {canEdit && (
              <PenBox
                onClick={handleOpenDatePicker}
                className="size-4 opacity-0 group-hover:opacity-100 cursor-pointer text-muted-foreground hover:text-foreground"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {editingDueDate !== null ? (
              // --- EDITING STATE ---
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={editingDueDate}
                onChange={(e) => setEditingDueDate(e.target.value)}
                autoFocus
              />
            ) : dueDate ? (
              // --- DISPLAY STATE (Date exists) ---
              <span className="font-medium text-sm text-foreground">
                {getDate(dueDate)}
              </span>
            ) : (
              // --- DISPLAY STATE (No date exists) ---
              <>
                {canEdit ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground -ml-2 h-auto p-1"
                    onClick={handleOpenDatePicker}
                  >
                    <PlusCircle className="mr-2 size-4" />
                    Add due date
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    No due date
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Assignee */}
        <div className="space-y-2">
          <label className="text-muted-foreground">Assignee</label>
          <div className="flex items-center font-medium text-foreground">
            <AssigneeCard
              taskId={taskId}
              assignedTo={assignedTo}
            />
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-muted-foreground">Priority</label>
          <PriorityBadge priority={priority} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2 group">
          Description
          {canEdit && (
            <PenBox
              onClick={() => setEditingDescription(description || "")}
              className="size-4 cursor-pointer text-muted-foreground hidden group-hover:block group-hover:text-foreground"
            />
          )}
        </label>
        {editingDescription !== null ? (
          <Textarea
            value={editingDescription || ""}
            onChange={(e) => setEditingDescription(e.target.value)}
            placeholder="Add a more detailed description..."
            className="min-h-[120px] text-sm"
          />
        ) : description ? (
          <p className="text-sm text-foreground leading-relaxed">
            {description}
          </p>
        ) : (
          <p className="text-sm text-foreground italic">
            No description provided.
          </p>
        )}
      </div>
    </>
  );
};
