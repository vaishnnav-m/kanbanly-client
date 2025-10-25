"use client";
import { useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import {
  ITask,
  ITaskDetails,
  TaskCreationPayload,
} from "@/lib/api/task/task.types";
import { ConfirmationModal } from "../admin/ConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { InviteUserDropdown } from "@/components/molecules/InviteUserDropdown";
import { TaskHeader } from "@/components/molecules/task/TaskHeader";
import { workspaceRoles } from "@/types/roles.enum";
import { TaskInfo } from "@/components/molecules/task/TaskInfo";
import { TaskTabs } from "@/components/molecules/task/TaskTabs";
import { WorkItemParent } from "@/components/molecules/task/WorkItemParent";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { AssigneeCard } from "@/components/molecules/task/AssigneeCard";
import { WorkItemType } from "@/types/task.enum";

interface TaskDetailsProps {
  isVisible: boolean;
  close: () => void;
  task: ITaskDetails | undefined;
  createTask: (data: TaskCreationPayload) => void;
  removeTask: (taskId: string) => void;
  handleEditTask: (taskId: string, data: Partial<TaskCreationPayload>) => void;
  isEditing: boolean;
  subTasks?: ITask[];
}

export const TaskDetails = ({
  isVisible,
  close,
  task,
  createTask,
  removeTask,
  handleEditTask,
  isEditing,
  subTasks,
}: TaskDetailsProps) => {
  const [width, setWidth] = useState(448);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [editingDescription, setEditingDescription] = useState<string | null>(
    null
  );
  const [editingDueDate, setEditingDueDate] = useState<string | null>(null);
  const [editingStoryPoint, setEditingStoryPoint] = useState<string | null>(
    null
  );
  const [editingName, setEditingName] = useState<string | null>(null);
  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);

  const taskContext = useTaskPageContext();

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
      ...(editingStoryPoint && { storyPoint: Number(editingStoryPoint) }),
    };

    handleEditTask(task?.taskId as string, data);

    setEditingName(null);
    setEditingDescription(null);
    setEditingDueDate(null);
    setEditingStoryPoint(null);
  }

  // handle invitation of user
  const handleInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.invitedEmail) {
      taskContext.onInvite(task.taskId, { assignedTo: data.invitedEmail });
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
              memberRole={role}
              editingDueDate={editingDueDate}
              setEditingDueDate={setEditingDueDate}
              editingDescription={editingDescription}
              setEditingDescription={setEditingDescription}
              storyPoint={task.storyPoint}
              editingStoryPoint={editingStoryPoint}
              setEditingStoryPoint={setEditingStoryPoint}
            />
            {(editingDescription !== null ||
              editingDueDate !== null ||
              editingName !== null ||
              editingStoryPoint !== null) && (
              <div className="w-full flex gap-5">
                <Button onClick={handleSubmit} className="w-full">
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setEditingDescription(null);
                    setEditingDueDate(null);
                    setEditingName(null);
                    setEditingStoryPoint(null);
                  }}
                  variant="outline"
                  className="w-full hover:bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            )}
            <WorkItemParent
              taskId={task.taskId}
              memberRole={role}
              parent={task.parent}
            />
            {/* Tabs */}
            {task.workItemType !== WorkItemType.Subtask && (
              <TaskTabs
                createTask={createTask}
                taskId={task.taskId}
                workItemType={task.workItemType}
                subTasks={subTasks}
              />
            )}
            <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-4">
              {/* Created By */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Created By
                </label>
                <div className="flex items-center gap-2">
                  <AssigneeCard
                    taskId={task.taskId}
                    assignedTo={task.createdBy}
                  />
                  <span className="text-sm font-medium">
                    {task.createdBy.name}
                  </span>
                </div>
              </div>
              <div className="h-px bg-border" /> {/* Divider */}
              {/* Timestamps */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {format(
                      new Date(task.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium">
                    {formatDistanceToNow(new Date(task.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <InviteUserDropdown
            buttonRef={inviteButtonRef}
            isLoading={isEditing}
            isOpen={isInvitingUser}
            onClose={() => setIsInvitingUser(false)}
            onInvite={handleInvite}
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
