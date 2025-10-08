"use client";
import { Dispatch, DragEvent, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BoardTask } from "@/types/board.types";
import { DropIndicator } from "./DropIndicator";
import { Ellipsis } from "lucide-react";
import { InviteUserDropdown } from "../InviteUserDropdown";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { workItemTypeMap } from "@/lib/constants/workitem.constats";
import { AssigneeCard } from "../task/AssigneeCard";

interface TaskCardProps {
  taskData: BoardTask;
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    task: Omit<BoardTask, "workItemType">
  ) => void;
  members: WorkspaceMember[];
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
}

export const TaskCard = ({
  taskData,
  members,
  handleDragStart,
  onInvite,
  setIsTaskModalOpen,
  setSelectedTask,
}: TaskCardProps) => {
  const [isInvitingUser, setIsInvitingUser] = useState(false);

  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.invitedEmail) {
      onInvite(taskData.taskId, { assignedTo: data.invitedEmail });
    }
    setIsInvitingUser(false);
  };

  return (
    <>
      <DropIndicator beforeId={taskData.taskId} status={taskData.status} />
      <motion.div
        layout
        layoutId={taskData.taskId}
        draggable={true}
        onDragStart={(e) => {
          handleDragStart(e as unknown as DragEvent<HTMLDivElement>, {
            task: taskData.task,
            taskId: taskData.taskId,
            status: taskData.status,
          });
        }}
        className="group max-w-full overflow-hidden rounded border border-gray-700/20 dark:bg-gray-800/20 p-3 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-end">
          <Ellipsis
            className="size-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => {
              setSelectedTask(taskData.taskId);
              setIsTaskModalOpen(true);
            }}
          />
        </div>
        <p className="text-base dark:text-gray-100 text-gray-500 break-words">{taskData.task}</p>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-2">
            {/* Task Type */}
            <div className="flex items-center gap-2">
              {taskData.workItemType && (
                <span className="text-xs font-medium">
                  {workItemTypeMap[taskData.workItemType]?.icon}
                </span>
              )}
            </div>
            {/* Assignee */}
            <AssigneeCard
              members={members}
              onInvite={onInvite}
              taskId={taskData.taskId}
              assignedTo={taskData.assignedTo}
            />
          </div>
        </div>
      </motion.div>
      <InviteUserDropdown
        buttonRef={inviteButtonRef}
        isLoading={false}
        isOpen={isInvitingUser}
        onClose={() => setIsInvitingUser(false)}
        onInvite={handleInvite}
        suggestions={members?.map((m) => ({
          id: m._id,
          name: m.name,
          email: m.email,
        }))}
      />
    </>
  );
};
