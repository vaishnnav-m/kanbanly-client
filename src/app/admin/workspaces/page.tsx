"use client";
import { AdminWorkspacesTemplate } from "@/components/templates/admin/AdminWorkspacesTemplate";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import {
  useGetAllWorkspaces,
  useRemoveWorkspace,
} from "@/lib/hooks/useWorkspace";
import { useState } from "react";

function AdminWorkspacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToastMessage();

  const { data: workspacesData } = useGetAllWorkspaces();
  const workspaces = workspacesData?.data ? workspacesData.data : [];
  const { mutate: deleteWorkspace } = useRemoveWorkspace({
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Deleted",
        description: response.message,
        duration: 6000,
      });
    },
  });

  // handle remove workspaces
  const onRemove = (workspaceId: string) => {
    deleteWorkspace({ workspaceId });
  };
  return (
    <AdminWorkspacesTemplate
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onRemove={onRemove}
      workspaces={workspaces}
    />
  );
}

export default AdminWorkspacesPage;
