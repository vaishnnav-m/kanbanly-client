"use client";
import {
  Dispatch,
  DragEvent,
  JSX,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { BoardTask } from "@/types/board.types";
import { DropIndicator } from "./DropIndicator";
import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Ellipsis, User } from "lucide-react";
import { InviteUserDropdown } from "../InviteUserDropdown";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { Bug, CheckSquare, Star } from "lucide-react";
// import { TaskPriority } from "@/types/task.enum";

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

  function getAssignedTo(assignedTo: WorkspaceMember) {
    return assignedTo.email[0].toUpperCase();
  }

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

  // Task type icon and label
  const typeMap: Record<string, { icon: JSX.Element; label: string }> = {
    task: {
      icon: <CheckSquare className="size-4 text-blue-400" />,
      label: "Task",
    },
    bug: { icon: <Bug className="size-4 text-red-400" />, label: "Bug" },
    feature: {
      icon: <Star className="size-4 text-yellow-400" />,
      label: "Feature",
    },
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
        className="group max-w-full overflow-hidden rounded border border-gray-700/20 bg-gray-800/20 p-3 cursor-grab active:cursor-grabbing"
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
        <p className="text-base text-gray-100 break-words">{taskData.task}</p>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-2">
            {/* Task Type */}
            <div className="flex items-center gap-2">
              {taskData.workItemType && (
                <span className="text-xs font-medium">
                  {typeMap[taskData.workItemType]?.icon}
                </span>
              )}
            </div>
            {/* Assignee */}
            {taskData.assignedTo ? (
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full">
                      {getAssignedTo(taskData.assignedTo)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {taskData.assignedTo
                      ? taskData.assignedTo.email
                      : "unassigned"}
                  </p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                ref={inviteButtonRef}
                onClick={() => setIsInvitingUser(true)}
                variant="ghost"
                className="p-0 size-6 rounded-full hover:bg-white/20 bg-white/10 flex items-center justify-center"
                disabled={isInvitingUser}
                style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
              >
                <User className="size-4 text-muted-foreground" />
              </Button>
            )}
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
