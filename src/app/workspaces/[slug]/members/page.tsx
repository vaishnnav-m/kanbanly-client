"use client";
import WorkspaceMembersTemplates from "@/components/templates/workspace/WorkspaceMembersTemplate";
import { WorkspaceInvitationPayload } from "@/lib/api/workspace/workspace.types";
import {
  useEditWorkspaceMember,
  useRemoveWorkspaceMember,
  useSendInvitation,
  useWorkspaceMembers,
} from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function page() {
  const { mutate: SendInvitation, isPending: isLoading } = useSendInvitation();
  const [pageno, setPageno] = useState(1);

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  // members fetching
  const { data: members, isPending } = useWorkspaceMembers(workspaceId, pageno);
  const users = members?.data?.data ?? [];
  const totalPages = members?.data?.totalPages ?? 0;
  const total = members?.data?.total ?? 0;

  // member updation hook
  const { mutate: updateMember, isPending: isUpdating } =
    useEditWorkspaceMember();

  // member deletion hook
  const { mutate: removeMember } = useRemoveWorkspaceMember();

  function sendInvite(data: WorkspaceInvitationPayload) {
    SendInvitation({ workspaceId, data });
  }

  // function to change the role
  function handleRoleChange(memberId: string, role: workspaceRoles) {
    updateMember({ workspaceId, data: { memberId, role } });
  }

  function handleStatusUpdate(memberId: string, isActive: boolean) {
    updateMember({ workspaceId, data: { memberId, isActive } });
  }

  function handleRemoveMember(memberId: string) {
    removeMember({ workspaceId, memberId });
  }

  return (
    <WorkspaceMembersTemplates
      handleInvite={sendInvite}
      isLoading={isLoading}
      members={users}
      isMembersLoading={isPending}
      total={total}
      handleRoleChange={handleRoleChange}
      handleStatusUpdate={handleStatusUpdate}
      handleRemoveMember={handleRemoveMember}
    />
  );
}

export default page;
