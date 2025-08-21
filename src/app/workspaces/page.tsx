"use client";
import WorkSpacesTemplate from "@/components/templates/workspace/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";
import { useGetAllWorkspaces } from "@/lib/hooks/useWorkspace";

export default function WorkspacesListingPage() {
  const { mutate: logout } = useLogout();
  const { data } = useGetAllWorkspaces();

  function handleLogout() {
    logout();
  }

  const workspaces = data?.data ?? [];

  return (
    <main>
      <WorkSpacesTemplate handleLogout={handleLogout} workspaces={workspaces} />
    </main>
  );
}
