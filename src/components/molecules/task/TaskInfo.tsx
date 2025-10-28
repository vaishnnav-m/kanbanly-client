import { Input } from "@/components/atoms/input";
import { CalendarIcon, PenBox, PlusCircle } from "lucide-react";
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
  storyPoint?: number;
  priority: TaskPriority;
  description?: string;
  assignedTo: { email: string; name: string } | null;
  memberRole: workspaceRoles;
  editingDueDate: string | null;
  setEditingDueDate: Dispatch<SetStateAction<string | null>>;
  editingDescription: string | null;
  setEditingDescription: Dispatch<SetStateAction<string | null>>;
  setEditingStoryPoint: Dispatch<SetStateAction<string | null>>;
  editingStoryPoint: string | null;
}

export const TaskInfo = ({
  taskId,
  dueDate,
  priority,
  description,
  storyPoint,
  assignedTo,
  memberRole,
  editingDueDate,
  setEditingDueDate,
  editingDescription,
  setEditingDescription,
  editingStoryPoint,
  setEditingStoryPoint,
}: TaskInfoProps) => {
  const canEdit = hasPermission(memberRole, PERMISSIONS.EDIT_TASK);

  const handleOpenDatePicker = () => {
    const initialDate = dueDate ? new Date(dueDate) : new Date();
    setEditingDueDate(initialDate.toISOString().slice(0, 10));
  };

  return (
    <div className="space-y-6">
      {/* Properties Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Due Date Card */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between group">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              Due Date
            </label>
            {canEdit && !editingDueDate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenDatePicker}
                className="h-6 w-6 p-0 hover:bg-primary/10"
              >
                <PenBox className="w-3 h-3" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {editingDueDate !== null ? (
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={editingDueDate}
                onChange={(e) => setEditingDueDate(e.target.value)}
                autoFocus
                className="h-9"
              />
            ) : dueDate ? (
              <span className="font-semibold text-sm text-foreground">
                {getDate(dueDate)}
              </span>
            ) : (
              <>
                {canEdit ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground h-auto p-0 hover:text-primary"
                    onClick={handleOpenDatePicker}
                  >
                    <PlusCircle className="mr-1.5 w-3.5 h-3.5" />
                    Set date
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

        {/* Assignee Card */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Assignee
          </label>
          <div className="flex items-center gap-2 font-medium text-foreground">
            <AssigneeCard taskId={taskId} assignedTo={assignedTo} />
            {assignedTo && (
              <span className="text-sm truncate">{assignedTo.name}</span>
            )}
          </div>
        </div>

        {/* Priority Card */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Priority
          </label>
          <PriorityBadge priority={priority} />
        </div>

        {/* Story Point Card */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Story Points
            </label>
            {canEdit && !editingStoryPoint && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingStoryPoint(String(storyPoint || ""))}
                className="h-6 w-6 p-0 hover:bg-primary/10"
              >
                <PenBox className="w-3 h-3" />
              </Button>
            )}
          </div>
          {editingStoryPoint !== null ? (
            <Input
              min={1}
              type="number"
              value={editingStoryPoint || ""}
              onChange={(e) => setEditingStoryPoint(e.target.value)}
              placeholder="Enter points..."
              autoFocus
              className="h-9"
            />
          ) : storyPoint ? (
            <div className="inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-base font-bold text-primary">
              {storyPoint}
            </div>
          ) : (
            <>
              {canEdit ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-auto p-0 hover:text-primary"
                  onClick={() => setEditingStoryPoint("")}
                >
                  <PlusCircle className="mr-1.5 w-3.5 h-3.5" />
                  Add points
                </Button>
              ) : (
                <span className="text-sm text-muted-foreground italic">
                  No points
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Description
          </label>
          {canEdit && !editingDescription && description && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingDescription(description || "")}
              className="h-7 px-2 hover:bg-primary/10"
            >
              <PenBox className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          )}
        </div>
        {editingDescription !== null ? (
          <Textarea
            value={editingDescription || ""}
            onChange={(e) => setEditingDescription(e.target.value)}
            placeholder="Add a detailed description..."
            className="min-h-[140px] resize-none text-sm"
            autoFocus
          />
        ) : description ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>
        ) : (
          <>
            {canEdit ? (
              <Button
                variant="outline"
                onClick={() => setEditingDescription("")}
                className="w-full h-24 border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Add description
                  </span>
                </div>
              </Button>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground italic text-center">
                  No description provided
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
