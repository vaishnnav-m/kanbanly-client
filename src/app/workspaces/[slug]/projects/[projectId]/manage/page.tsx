"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { ProjectManagementTemplate } from "@/components/templates/project/ProjectManagementTemplate";
import { useGetOneProject, useRemoveProject } from "@/lib/hooks/useProject";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const params = useParams();
  const projectId = params.projectId as string;
  const slug = params.slug as string;

  // project fetching
  const { data: projectData, isLoading } = useGetOneProject(
    workspaceId,
    projectId
  );

  //Project deletion
  const toast = useToastMessage();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteProject, isPending } = useRemoveProject({
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Project Deletion Successfull",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      router.replace(`/workspaces/${slug}/`);
    },
  });

  if (isLoading || !projectData?.data) {
    return <WorkspaceDetailsSkeleton />;
  }

  function handleEdit() {}
  function handleDelete() {
    deleteProject({ workspaceId, projectId });
  }
  return (
    <ProjectManagementTemplate
      handleDelete={handleDelete}
      uploadEdited={handleEdit}
      projectData={projectData.data}
      isDeleting={isPending}
    />
  );
}

export default page;
