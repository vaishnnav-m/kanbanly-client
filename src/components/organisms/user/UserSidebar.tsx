"use client";
import Logo from "@/components/atoms/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/atoms/sidebar";
import NavLinks from "@/components/molecules/user-sidebar/NavLinks";
import NavProjects from "@/components/molecules/user-sidebar/NavProjects";
import NavWorkspace from "@/components/molecules/user-sidebar/NavWorkspace";
import { useGetAllProjects } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import { workspaceRoles } from "@/types/roles.enum";
import { Gem, HelpCircle, Home, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

function UserSidebar() {
  const params = useParams();
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const planName = useSelector(
    (state: RootState) => state.subscription.planName
  );

  const { data, isPending: isProjectLoading } = useGetAllProjects(workspaceId);

  const role = useSelector((state: RootState) => state.workspace.memberRole);

  const navigation = [
    { title: "Home", url: `/workspaces/${params.slug}`, icon: Home },
    {
      title: "Chats",
      url: `/workspaces/${params.slug}/chats`,
      icon: MessageSquare,
    },
    {
      title: "Members",
      url: `/workspaces/${params.slug}/members`,
      icon: Users,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-5">
        <SidebarMenuButton className="group-data-[state=collapsed]:!px-0 group-data-[state=collapsed]:!pl-1 hover:bg-transparent">
          <Link
            href="/workspaces"
            className="flex gap-1 items-center font-bold text-2xl"
          >
            <Logo />
            {planName && (
              <span className="font-normal text-xs text-white/70 mt-3">
                ({planName.split(" ")[0].toLocaleLowerCase()})
              </span>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavLinks links={navigation} />
        <NavProjects
          isLoading={isProjectLoading}
          projects={data?.data}
          role={role as workspaceRoles}
        />
        <NavWorkspace />
      </SidebarContent>
      <SidebarFooter className="group-data-[state=collapsed]:hidden">
        <SidebarMenuButton>
          <Link className="flex gap-2" href="/billing/pricing">
            <Gem className="h-4 w-4" />
            <span>Upgrade Plan</span>
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <HelpCircle className="h-4 w-4" />
          Get Help
        </SidebarMenuButton>
        <div className="pt-2 text-center text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700">
          © 2025 Kanbanly
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default UserSidebar;
