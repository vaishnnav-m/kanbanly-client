"use client";
import { AdminWorkspacesTemplate } from "@/components/templates/admin/AdminWorkspacesTemplate";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import {
  useGetAllWorkspaces,
  useRemoveWorkspace,
} from "@/lib/hooks/useWorkspace";
import { useDebounce } from "@/lib/utils";
import { useState } from "react";

function AdminWorkspacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const toast = useToastMessage();

  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  // workspaces fetching
  const { data: workspacesData } = useGetAllWorkspaces(
    page,
    debouncedSearchTerm
  );
  const workspaces = workspacesData?.data ? workspacesData.data.workspaces : [];
  const totalPages = workspacesData?.data?.totalPages || 1;

  // workspace deletion
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
      page={page}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
}

export default AdminWorkspacesPage;
