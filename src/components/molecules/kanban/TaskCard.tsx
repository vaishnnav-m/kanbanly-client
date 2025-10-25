"use client";
import { DragEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BoardTask } from "@/types/board.types";
import { DropIndicator } from "./DropIndicator";
import { Ellipsis } from "lucide-react";
import { InviteUserDropdown } from "../InviteUserDropdown";
import { workItemTypeMap } from "@/lib/constants/workitem.constats";
import { AssigneeCard } from "../task/AssigneeCard";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface TaskCardProps {
  taskData: BoardTask;
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    task: Omit<BoardTask, "workItemType">
  ) => void;
}

export const TaskCard = ({ taskData, handleDragStart }: TaskCardProps) => {
  const { setSelectedTask, setIsTaskModalOpen, onInvite } =
    useTaskPageContext();
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
        <p className="text-base dark:text-gray-100 text-gray-500 break-words">
          {taskData.task}
        </p>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-2">
            {/* Task Type */}
            <div className="flex items-center gap-2">
              {taskData.workItemType && (
                <span className="text-xs font-medium">
                  {
                    workItemTypeMap[
                      taskData.workItemType as keyof typeof workItemTypeMap
                    ]?.icon
                  }
                </span>
              )}
            </div>
            {/* Assignee */}
            <AssigneeCard
              taskId={taskData.taskId}
              assignedTo={taskData.assignedTo || null}
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
      />
    </>
  );
};
