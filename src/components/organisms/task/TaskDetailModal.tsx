"use client";
import { useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { Card, CardContent } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { ITaskDetails, TaskCreationPayload } from "@/lib/api/task/task.types";
import { ConfirmationModal } from "../admin/ConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { InviteUserDropdown } from "@/components/molecules/InviteUserDropdown";
import { TaskHeader } from "@/components/molecules/task/TaskHeader";
import { workspaceRoles } from "@/types/roles.enum";
import { TaskInfo } from "@/components/molecules/task/TaskInfo";
import { TaskTabs } from "@/components/molecules/task/TaskTabs";

interface TaskDetailsProps {
  isVisible: boolean;
  close: () => void;
  task: ITaskDetails | undefined;
  removeTask: (taskId: string) => void;
  handleEditTask: (taskId: string, data: Partial<TaskCreationPayload>) => void;
  isEditing: boolean;
  members: WorkspaceMember[] | [];
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
}

export const TaskDetails = ({
  isVisible,
  close,
  task,
  removeTask,
  handleEditTask,
  isEditing,
  members,
  onInvite,
}: TaskDetailsProps) => {
  const [width, setWidth] = useState(448);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [editingDescription, setEditingDescription] = useState<string | null>(
    null
  );
  const [editingDueDate, setEditingDueDate] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);

  const role = useSelector(
    (state: RootState) => state.workspace.memberRole
  ) as workspaceRoles;
  if (!isVisible || !task) return null;

  // funtion to handle the submit of editing
  function handleSubmit() {
    const data: Partial<TaskCreationPayload> = {
      ...(editingDescription && { editingDescription }),
      ...(editingName && { task: editingName }),
      ...(editingDueDate && { dueDate: editingDueDate }),
    };

    handleEditTask(task?.taskId as string, data);

    setEditingName(null);
    setEditingDescription(null);
    setEditingDueDate(null);
  }

  // handle invitation of user
  const handleInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.invitedEmail) {
      onInvite(task.taskId, { assignedTo: data.invitedEmail });
    }
  };

  return (
    <div className="fixed top-4 right-4 h-[calc(100vh-2rem)] z-50">
      <Resizable
        defaultSize={{ width }}
        size={{ width: width, height: "100%" }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
        }}
        maxWidth={800}
        minWidth={448}
        enable={{ left: true }}
      >
        <Card className="relative h-full flex flex-col shadow-xl border-border bg-card">
          {/* Header */}
          <TaskHeader
            memberRole={role as workspaceRoles}
            name={task.task}
            taskStatus={task.status}
            setIsConfirmationOpen={setIsConfirmationOpen}
            setEditingName={setEditingName}
            editingName={editingName}
            close={close}
          />

          {/* Content */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Task Info */}
            <TaskInfo
              taskId={task.taskId}
              dueDate={task.dueDate}
              priority={task.priority}
              description={task.description}
              assignedTo={task.assignedTo}
              parent={task.parent}
              memberRole={role}
              members={members}
              onInvite={onInvite}
              editingDueDate={editingDueDate}
              setEditingDueDate={setEditingDueDate}
              editingDescription={editingDescription}
              setEditingDescription={setEditingDescription}
            />
            {(editingDescription !== null ||
              editingDueDate !== null ||
              editingName !== null) && (
              <div className="w-full flex">
                <Button onClick={handleSubmit} className="w-full">
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setEditingDescription(null);
                    setEditingDueDate(null);
                    setEditingName(null);
                  }}
                  variant="outline"
                  className="w-full hover:bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* Tabs */}
            <TaskTabs />
          </CardContent>

          <InviteUserDropdown
            buttonRef={inviteButtonRef}
            isLoading={isEditing}
            isOpen={isInvitingUser}
            onClose={() => setIsInvitingUser(false)}
            onInvite={handleInvite}
            suggestions={members?.map((m) => ({
              id: m._id,
              name: m.name,
              email: m.email,
            }))}
          />
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            onConfirm={() => {
              removeTask(task.taskId);
              setIsConfirmationOpen(false);
              close();
            }}
            title="Are you sure you want to remove this task?"
            description="This action cannot be undone. The task will be permanently deleted from the project."
            cancelText="Cancel"
            confirmText="Delete Task"
          />
        </Card>
      </Resizable>
    </div>
  );
};
