"use client";
import WorkspaceMembersTemplates from "@/components/templates/workspace/WorkspaceMembersTemplate";
import { WorkspaceInvitationPayload } from "@/lib/api/workspace/workspace.types";
import { useCreateChat } from "@/lib/hooks/useChat";
import {
  useEditWorkspaceMember,
  useRemoveInvitation,
  useRemoveWorkspaceMember,
  useSendInvitation,
  useWorkspaceInvitations,
  useWorkspaceMembers,
} from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function WorkspaceMemberPage() {
  const { mutate: SendInvitation, isPending: isLoading } = useSendInvitation();
  const [pageno] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  // members fetching
  const { data: members, isPending } = useWorkspaceMembers(workspaceId, pageno);
  const users = members?.data?.data ?? [];
  // const totalPages = members?.data?.totalPages ?? 0;
  const total = members?.data?.total ?? 0;

  // member updation hook
  const { mutate: updateMember } = useEditWorkspaceMember();

  // member deletion hook
  const { mutate: removeMember } = useRemoveWorkspaceMember();

  // chat creation hook
  const { mutate: createChat } = useCreateChat({
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getChats"] });
      router.push(`/workspaces/${params.slug}/chats/${response.data?.chatId}`);
    },
  });

  // invitations hook
  const { data: invitationsData, isFetching: isInvitationsLoading } =
    useWorkspaceInvitations(workspaceId);
  const invitations = invitationsData?.data ?? [];

  const { mutate: removeInvitation } = useRemoveInvitation();

  function sendInvite(data: WorkspaceInvitationPayload) {
    SendInvitation({ workspaceId, data });
  }

  // function to change the role
  function handleRoleChange(memberId: string, role: workspaceRoles) {
    updateMember({ workspaceId, data: { memberId, role } });
  }

  // member status updation function
  function handleStatusUpdate(memberId: string, isActive: boolean) {
    updateMember({ workspaceId, data: { memberId, isActive } });
  }

  // remove member function
  function handleRemoveMember(memberId: string) {
    removeMember({ workspaceId, memberId });
  }

  function handleCreateChat(memberId: string) {
    createChat({ workspaceId, memberId });
  }

  function handleRemoveInvitation(memberEmail: string) {
    removeInvitation({ workspaceId, userEmail: memberEmail });
  }

  function handleResend(data: WorkspaceInvitationPayload) {
    SendInvitation({ workspaceId, data });
  }

  return (
    <WorkspaceMembersTemplates
      handleInvite={sendInvite}
      isLoading={isLoading}
      members={users}
      isMembersLoading={isPending}
      total={total}
      invitations={invitations}
      handleRoleChange={handleRoleChange}
      handleStatusUpdate={handleStatusUpdate}
      handleRemoveMember={handleRemoveMember}
      handleChat={handleCreateChat}
      isInvitationsLoading={isInvitationsLoading}
      handleRemoveInvitation={handleRemoveInvitation}
      handleResend={handleResend}
    />
  );
}
