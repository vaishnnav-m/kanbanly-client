"use client";
import WorkSpaceCreateTemplate from "@/components/templates/workspace/WorkSpaceCreateTemplate";
import { WorkspaceCreatePayload } from "@/lib/api/workspace/workspace.types";
import { useCreateWorkspace } from "@/lib/hooks/useWorkspace";
import React from "react";

export default function WorkspaceCreatePage() {
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();
  function handleCreateWorkspace(payload: WorkspaceCreatePayload): void {
    createWorkspace(payload);
  }

  return (
    <div>
      <WorkSpaceCreateTemplate
        handleCreateWorkspace={handleCreateWorkspace}
        isLoading={isPending}
      />
    </div>
  );
}
