"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { WorkspaceManageTemplate } from "@/components/templates/workspace/WorkspaceManageTemplate";
import {
  IWorkspacePermissions,
  WorkspaceEditPayload,
} from "@/lib/api/workspace/workspace.types";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import {
  useEditWorkspace,
  useGetOneWorkspace,
  useRemoveWorkspace,
  useUpdateRolePermissions,
} from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
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
  const { mutate: updateRolePermissions } = useUpdateRolePermissions();

  function handleEdit(data: WorkspaceEditPayload) {
    editWorkspace({ workspaceId, data });
  }

  function handleRolePermissionUpdation(
    role: workspaceRoles,
    permissionId: keyof IWorkspacePermissions,
    checked: boolean
  ) {
    updateRolePermissions({
      workspaceId,
      data: { permissions: { [permissionId]: checked }, role },
    });
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
      handleRolePermissionUpdation={handleRolePermissionUpdation}
    />
  );
}
