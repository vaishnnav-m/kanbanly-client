import { DragEvent, useState } from "react";
import { motion } from "framer-motion";
import { BoardTask } from "@/types/board.types";
import { DropIndicator } from "./DropIndicator";
import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Ellipsis, User } from "lucide-react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const TaskCard = ({
  taskId,
  task,
  status,
  assignedTo,
  handleDragStart,
}: BoardTask & {
  handleDragStart: (e: DragEvent<HTMLDivElement>, task: BoardTask) => void;
}) => {
  const [isInvitingUser, setIsInvitingUser] = useState(false);

  function getAssignedTo(assignedTo: string) {
    return assignedTo.toUpperCase();
  }
  const role = useSelector((state: RootState) => state.workspace.memberRole);
  
  return (
    <>
      <DropIndicator beforeId={taskId} status={status} />
      <motion.div
        layout
        layoutId={taskId}
        draggable={true}
        onDragStart={(e) => {
          handleDragStart(e as unknown as DragEvent<HTMLDivElement>, {
            task,
            taskId,
            status,
          });
        }}
        className="group max-w-full overflow-hidden rounded border border-gray-700/20 bg-gray-800/20 p-3 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-end">
          <Ellipsis className="size-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-base text-gray-100 break-words">{task}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {assignedTo ? (
              <Avatar className="h-6 w-6">
                {/* <AvatarImage/> */}
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full">
                  {getAssignedTo(assignedTo)}
                </AvatarFallback>
              </Avatar>
            ) : (
              role !== "member" && (
                <Button
                  onClick={() => setIsInvitingUser(true)}
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                >
                  <User className="size-6 text-muted-foreground" />
                </Button>
              )
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
