"use client";
import WorkspaceMembersTemplates from "@/components/templates/workspace/WorkspaceMembersTemplate";
import { WorkspaceInvitationPayload } from "@/lib/api/workspace/workspace.types";
import {
  useSendInvitation,
  useWorkspaceMembers,
} from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
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

  function sendInvite(data: WorkspaceInvitationPayload) {
    SendInvitation({ workspaceId, data });
  }

  return (
    <WorkspaceMembersTemplates
      handleInvite={sendInvite}
      isLoading={isLoading}
      members={users}
      isMembersLoading={isPending}
      total={total}
    />
  );
}

export default page;
