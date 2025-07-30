"use client";
import InsufficientPermission from "@/components/templates/workspace/InsufficientPermission";
import { WorkspaceManageTemplate } from "@/components/templates/workspace/WorkspaceManageTemplate";
import { useGetOneWorkspace } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  const {
    data: workspaceData,
    isError,
    isLoading,
  } = useGetOneWorkspace(workspaceId);

  if (!workspaceData?.data || isError) {
    return <InsufficientPermission title="Workspace Details" subHeading="Manage your workspace information and settings" subject="details"/>;
  }

  return <WorkspaceManageTemplate workspaceData={workspaceData?.data} />;
}

export default page;
