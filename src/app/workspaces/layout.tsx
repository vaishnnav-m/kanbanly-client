"use client";
import { SidebarProvider } from "@/components/atoms/sidebar";
import Header from "@/components/organisms/user/Header";
import Sidebar from "@/components/organisms/user/SideBar";
import { useGetCurrentMember } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { setWorkspaceData } from "@/store/slices/workSpaceSlice";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  let isLayoutNotNeeded =
    pathname === "/workspaces" || pathname === "/workspaces/create";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const dispatch = useDispatch();

  const { data: workspaceMember } = useGetCurrentMember(
    isLayoutNotNeeded ? null : workspaceId
  );

  useEffect(() => {
    if (workspaceMember?.data) {
      dispatch(
        setWorkspaceData({ workspaceId, memberRole: workspaceMember.data.role })
      );
    }
  }, [workspaceId, workspaceMember?.data, dispatch]);

  if (isLayoutNotNeeded) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Header
        setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />
      <main className="min-h-screen relative flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)}
        />
        <div
          className={`px-4 pt-[75px] ${
            isSidebarOpen ? "pl-16" : "pl-64"
          } py-6 w-full`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
