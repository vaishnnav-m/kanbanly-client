"use client";
import WorkspaceMembersTemplates from "@/components/templates/workspace/WorkspaceMembersTemplate";
import { WorkspaceInvitationPayload } from "@/lib/api/workspace/workspace.types";
import { useSendInvitation } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const { mutate: SendInvitation, isPending: isLoading } = useSendInvitation();

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  function sendInvite(data: WorkspaceInvitationPayload) {
    SendInvitation({ workspaceId, data });
  }
  return (
    <WorkspaceMembersTemplates
      handleInvite={sendInvite}
      isLoading={isLoading}
    />
  );
}

export default page;
