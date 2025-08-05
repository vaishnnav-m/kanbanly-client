"use client";
import ProjectListingPageTemplate from "@/components/templates/project/ProjectListingPageTemplate";
import { useGetAllProjects } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function page() {
  const worksapceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { data: projectsData, isFetching } = useGetAllProjects(worksapceId);
  const projects = projectsData?.data ? projectsData.data : [];
  return (
    <ProjectListingPageTemplate projects={projects} isLoading={isFetching} />
  );
}

export default page;
