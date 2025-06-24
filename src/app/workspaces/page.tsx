"use client";
import WorkSpacesTemplate from "@/components/templates/workspace/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";
import { useGetAllWorkspaces } from "@/lib/hooks/useWorkspace";

const page = () => {
  const { mutate: logout } = useLogout();
  const { data, isPending } = useGetAllWorkspaces();

  function handleLogout() {
    logout();
  }

  const workspaces = data?.data ?? [];

  function getAllWorkspaces() {}

  return (
    <main>
      <WorkSpacesTemplate handleLogout={handleLogout} workspaces={workspaces} />
    </main>
  );
};

export default page;
