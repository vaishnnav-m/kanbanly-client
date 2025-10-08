import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/atoms/sidebar";
import { Skeleton } from "@/components/atoms/skeleton";
import { CreateProjectModal } from "@/components/organisms/project/CreateProject";
import { IProject } from "@/lib/api/project/project.types";
import { setprojectData } from "@/store/slices/projectSlice";
import { workspaceRoles } from "@/types/roles.enum";
import { FolderClosed, FolderOpen, List, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface NavProjectsProps {
  projects?: IProject[];
  isLoading: boolean;
  role: workspaceRoles;
}

function NavProjects({ projects, isLoading, role }: NavProjectsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  function handleProjectClick(project: IProject) {
    localStorage.setItem("projectName", project.name);
    localStorage.setItem("projectTemplate", project.template);
    localStorage.setItem("projectKey", project.key);
    dispatch(
      setprojectData({
        projectName: project.name,
        projectTemplate: project.template,
        projectKey: project.key,
      })
    );
    router.push(
      `/workspaces/${params.slug}/projects/${project.projectId}/tasks`
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <div className="w-full flex justify-between items-center">
          <span>Projects</span>
          {role === "owner" && (
            <SidebarMenuButton
              className="w-fit"
              onClick={() => setIsProjectModalOpen(true)}
            >
              <Plus />
            </SidebarMenuButton>
          )}
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                {isLoading && !projects?.length ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  projects?.map((project) => (
                    <SidebarMenuSubButton
                      className="cursor-pointer"
                      key={project.projectId}
                      onClick={() => handleProjectClick(project)}
                    >
                      {params.projectId === project.projectId ? (
                        <FolderOpen className="stroke-primary" />
                      ) : (
                        <FolderClosed />
                      )}
                      {project.name}
                    </SidebarMenuSubButton>
                  ))
                )}
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  {projects?.length ? (
                    <Link
                      className="dark:text-white/70"
                      href={`/workspaces/${params.slug}/projects`}
                    >
                      <List />
                      All Projects
                    </Link>
                  ) : (
                    <span className="text-white/30">No Projects</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </SidebarGroup>
  );
}

export default NavProjects;
