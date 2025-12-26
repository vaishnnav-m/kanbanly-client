"use client";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { getAssignedTo } from "@/lib/task-utils";
import { useRef, useState } from "react";
import { InviteUserDropdown } from "../InviteUserDropdown";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { AvatarImage } from "@radix-ui/react-avatar";

interface AssigneeProps {
  taskId: string;
  assignedTo: { email: string; name: string; profile?: string } | null;
}

export const AssigneeCard = ({ taskId, assignedTo }: AssigneeProps) => {
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);
  const { onInvite } = useTaskPageContext();

  const handleInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.invitedEmail) {
      onInvite(taskId, { assignedTo: data.invitedEmail });
    }
    setIsInvitingUser(false);
  };

  const permissions = useSelector(
    (state: RootState) => state.workspace.permissions
  );

  const isVisible = permissions?.taskAssign;

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          {assignedTo ? (
            <Avatar className="size-6">
              <AvatarImage src={assignedTo?.profile} />
              <AvatarFallback className="m-auto bg-primary text-primary-foreground text-sm font-bold rounded-full">
                {getAssignedTo(assignedTo)}
              </AvatarFallback>
            </Avatar>
          ) : (
            isVisible && (
              <Button
                asChild
                ref={inviteButtonRef}
                onClick={() => setIsInvitingUser(true)}
                variant="ghost"
                className="p-1 size-6 rounded-full hover:bg-black/10 dark:hover:bg-white/20 bg-white/10 flex items-center justify-center"
                disabled={isInvitingUser}
                style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
              >
                <User className="text-muted-foreground" />
              </Button>
            )
          )}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{assignedTo ? assignedTo.email : "unassigned"}</p>
        </TooltipContent>
      </Tooltip>
      <InviteUserDropdown
        buttonLabel="assign"
        buttonRef={inviteButtonRef}
        isLoading={false}
        isOpen={isInvitingUser}
        onClose={() => setIsInvitingUser(false)}
        onInvite={handleInvite}
      />
    </>
  );
};
