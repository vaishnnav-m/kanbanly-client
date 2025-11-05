"use client";
import HomeTemplate from "@/components/templates/workspace/HomeTemplate";
import { useGetAllProjects } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function WorkspaceDashboardPage() {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { data: projectsData } = useGetAllProjects(workspaceId, {});
  const projects = projectsData?.data ? projectsData.data : [];

  return (
    <div>
      <HomeTemplate projects={projects} />
    </div>
  );
}
