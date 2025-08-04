"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import InsufficientPermission from "@/components/templates/workspace/InsufficientPermission";
import { WorkspaceManageTemplate } from "@/components/templates/workspace/WorkspaceManageTemplate";
import { useGetOneWorkspace } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
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

  if (isLoading || !workspaceData?.data) {
    return <WorkspaceDetailsSkeleton />;
  }

  return <WorkspaceManageTemplate workspaceData={workspaceData?.data} />;
}

export default page;
