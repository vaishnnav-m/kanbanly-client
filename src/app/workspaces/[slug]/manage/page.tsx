"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { WorkspaceManageTemplate } from "@/components/templates/workspace/WorkspaceManageTemplate";
import { WorkspaceEditPayload } from "@/lib/api/workspace/workspace.types";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import {
  useEditWorkspace,
  useGetOneWorkspace,
  useRemoveWorkspace,
} from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function WorkspaceManagementPage() {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const toast = useToastMessage();
  const router = useRouter();

  const { data: workspaceData, isLoading } = useGetOneWorkspace(workspaceId);

  const { mutate: removeWorkspace } = useRemoveWorkspace({
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Deleted",
        description: response.message,
        duration: 6000,
      });
      router.replace("/workspaces");
    },
  });
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
