"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { WorkspaceManageTemplate } from "@/components/templates/workspace/WorkspaceManageTemplate";
import { WorkspaceEditPayload } from "@/lib/api/workspace/workspace.types";
import {
  useEditWorkspace,
  useGetOneWorkspace,
  useRemoveWorkspace,
} from "@/lib/hooks/useWorkspace";
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

  const { mutate: removeWorkspace } = useRemoveWorkspace();
  const { mutate: editWorkspace } = useEditWorkspace();

  function handleEdit(data: WorkspaceEditPayload) {
    editWorkspace({ workspaceId, data });
  }

  function deleteWorkspace() {
    removeWorkspace({ workspaceId });
  }

  if (isLoading || !workspaceData?.data) {
    return <WorkspaceDetailsSkeleton />;
  }

  return (
    <WorkspaceManageTemplate
      workspaceData={workspaceData?.data}
      handleDelete={deleteWorkspace}
      uploadEdited={handleEdit}
    />
  );
}

export default page;
