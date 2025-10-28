"use client";
import { useRef, useState } from "react";
import { Resizable } from "re-resizable";
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
import { WorkItemType } from "@/types/task.enum";
import { Separator } from "@/components/atoms/separator";
import { TaskFooter } from "@/components/molecules/task/TaskFooter";

interface TaskDetailsProps {
  isVisible: boolean;
  close: () => void;
  task?: ITaskDetails;
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

  // variable to know if editing
  const hasUnsavedChanges =
    editingDescription !== null ||
    editingName !== null ||
    editingDueDate !== null ||
    editingStoryPoint !== null;

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
    <div className="py-3 fixed top-0 right-0 h-screen z-50 animate-in slide-in-from-right duration-300">
      <Resizable
        defaultSize={{ width }}
        size={{ width: width, height: "100%" }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
        }}
        maxWidth={900}
        minWidth={480}
        enable={{ left: true }}
        handleStyles={{
          left: {
            width: "4px",
            left: 0,
            cursor: "col-resize",
          },
        }}
        handleClasses={{
          left: "hover:bg-primary/50 transition-colors",
        }}
      >
        <Card className="relative h-full flex flex-col shadow-2xl border-l-2 border-border bg-background/95 backdrop-blur">
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

          {/* Unsaved Changes */}
          {hasUnsavedChanges && (
            <div className="sticky top-0 z-10 px-6 py-3 bg-blue-500/10 border-b border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-300">
                  You have unsaved changes
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEditingDescription(null);
                      setEditingName(null);
                      setEditingDueDate(null);
                      setEditingStoryPoint(null);
                    }}
                    className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="px-6 py-6 space-y-6">
              {/* Parent Section */}
              {task.workItemType !== WorkItemType.Subtask && (
                <>
                  <WorkItemParent
                    taskId={task.taskId}
                    memberRole={role}
                    parent={task.parent}
                  />
                  <Separator />
                </>
              )}

              {/* Task Info Grid */}
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

              <Separator />

              {/* Tabs Section */}
              {task.workItemType !== WorkItemType.Subtask && (
                <TaskTabs
                  createTask={createTask}
                  taskId={task.taskId}
                  workItemType={task.workItemType}
                  subTasks={subTasks}
                />
              )}
            </div>

            {/* Footer - Created By & Timestamps */}
            <TaskFooter
              taskId={task.taskId}
              createdBy={task.createdBy}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
            />
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
            title="Delete Task?"
            description="This action cannot be undone. The task will be permanently deleted from the project."
            cancelText="Cancel"
            confirmText="Delete Task"
          />
        </Card>
      </Resizable>
    </div>
  );
};
