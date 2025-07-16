"use client";
import WorkSpacesTemplate from "@/components/templates/workspace/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";
import { useGetAllWorkspaces } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const page = () => {
  const { mutate: logout } = useLogout();
  const { data, isPending } = useGetAllWorkspaces();

  function handleLogout() {
    logout();
  }
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const workspaces = data?.data ?? [];

  return (
    <main>
      <WorkSpacesTemplate handleLogout={handleLogout} workspaces={workspaces} />
    </main>
  );
};

export default page;
