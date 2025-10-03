"use client";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/atoms/sidebar";
import Header from "@/components/organisms/user/Header";
import UserSidebar from "@/components/organisms/user/UserSidebar";
import { useGetCurrentMember } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { setWorkspaceData } from "@/store/slices/workSpaceSlice";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isLayoutNotNeeded =
    pathname === "/workspaces" || pathname === "/workspaces/create";

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
    <SidebarProvider>
      <WorkspaceLayout>{children}</WorkspaceLayout>
    </SidebarProvider>
  );
}

function WorkspaceLayout({ children }: { children: ReactNode }) {
  const { state } = useSidebar();
  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <UserSidebar />
      <SidebarInset>
        <Header />
        <div
          className={`pt-[75px] px-10 ${state === "collapsed" ? "pl-16 " : "pl-[18.5rem]"}`}
        >
          {children}
        </div>
      </SidebarInset>
    </div>
  );
}
