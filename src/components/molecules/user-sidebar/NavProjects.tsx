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
import { Folders, Plus } from "lucide-react";
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
    dispatch(setprojectData({ projectName: project.name }));
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
                      key={project.projectId}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div
                        className={` h-3 w-3 rounded-full bg-blue-500 transition-transform duration-200 group-hover:scale-110`}
                      />
                      {project.name}
                    </SidebarMenuSubButton>
                  ))
                )}
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <Link href={`/workspaces/${params.slug}/projects`}>
                    <Folders />
                    All Projects
                  </Link>
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
