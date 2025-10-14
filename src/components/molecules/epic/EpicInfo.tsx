"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { getDate, hasPermission, PERMISSIONS } from "@/lib/utils";
import { workspaceRoles } from "@/types/roles.enum";
import { PenBox, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface EpicInfoProps {
  epicId: string;
  dueDate?: Date;
  description?: string;
  percentageDone?: number;
  memberRole: workspaceRoles;
  editingDueDate: string | null;
  setEditingDueDate: Dispatch<SetStateAction<string | null>>;
  editingDescription: string | null;
  setEditingDescription: Dispatch<SetStateAction<string | null>>;
}

export const EpicInfo = ({
  dueDate,
  description,
  memberRole,
  editingDescription,
  editingDueDate,
  setEditingDescription,
  setEditingDueDate,
}: EpicInfoProps) => {
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
            <label className="font-bold text-muted-foreground">Due date</label>
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
        {/* <div className="space-y-2">
          <label className="text-muted-foreground">Assignee</label>
          <div className="flex items-center font-medium text-foreground">
            <AssigneeCard
              members={members}
              onInvite={onInvite}
              taskId={taskId}
              assignedTo={assignedTo}
            />
          </div>
        </div> */}
      </div>

      <div className="space-y-2">
        <label className="font-bold text-sm text-muted-foreground flex items-center gap-2 group">
          Description
          {canEdit && (
            <PenBox
              onClick={() => setEditingDescription(description || "")}
              className="size-4 opacity-0 group-hover:opacity-100 cursor-pointer text-muted-foreground hover:text-foreground"
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
