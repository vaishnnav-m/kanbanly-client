"use client";
import WorkspaceDetailsSkeleton from "@/components/organisms/workspace/WorkspaceManageSkeleton";
import { ProjectManagementTemplate } from "@/components/templates/project/ProjectManagementTemplate";
import { ProjectEditingPayload } from "@/lib/api/project/project.types";
import {
  useAddMember,
  useEditProject,
  useGetOneProject,
  useGetProjectMembers,
  useRemoveProject,
  useRemoveProjectMember,
} from "@/lib/hooks/useProject";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function ProjectManageMentPage() {
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

  function handleDelete() {
    deleteProject({ workspaceId, projectId });
  }
  // project member adding
  const { mutate: addMember, isPending: isMemberAdding } = useAddMember();
  function handleMemberAdding(data: { email: string }) {
    addMember({ workspaceId, projectId, data });
  }

  const { data: projectMembers, isFetching: isProjectMembersFetching } =
    useGetProjectMembers(workspaceId, projectId);

  // project editing
  const { mutate: editProject, isPending: isEditing } = useEditProject();

  function handleEdit(data: ProjectEditingPayload) {
    editProject({ workspaceId, projectId, data });
  }

  // project member removing
  const { mutate: removeProjectMember, isPending: isMemberRemoving } =
    useRemoveProjectMember({
      onSuccess: (response) => {
        toast.showSuccess({
          title: "Member Deletion Successfull",
          description: response.message,
          duration: 6000,
        });
        queryClient.invalidateQueries({ queryKey: ["getProjects"] });
        queryClient.invalidateQueries({ queryKey: ["getProjectMembers"] });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage =
          error?.response?.data?.message || "Unexpected Error";
        toast.showError({
          title: "Member removing failed!",
          description: errorMessage,
          duration: 6000,
        });
      },
    });

  function handleMemberRemoving(userId: string) {
    removeProjectMember({ workspaceId, projectId, memberId: userId });
  }

  if (isLoading || !projectData?.data) {
    return <WorkspaceDetailsSkeleton />;
  }

  return (
    <ProjectManagementTemplate
      handleDelete={handleDelete}
      uploadEdited={handleEdit}
      projectData={projectData.data}
      isDeleting={isPending}
      isEditLoading={isEditing}
      handleMemberAdding={handleMemberAdding}
      isMemberAdding={isMemberAdding}
      members={projectMembers?.data}
      isProjectMembersFetching={isProjectMembersFetching}
      handleMemberRemoving={handleMemberRemoving}
      isMemberRemoving={isMemberRemoving}
    />
  );
}
