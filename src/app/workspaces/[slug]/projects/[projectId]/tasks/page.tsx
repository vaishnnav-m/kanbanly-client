"use client";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import { useCreateTask, useGetAllTasks } from "@/lib/hooks/useTask";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { data, refetch, isPending } = useGetAllTasks(workspaceId, projectId);

  const tasks = data?.data ? data.data : [];

  return (
    <TaskListingPageTemplate
      tasks={tasks}
      projectId={params.projectId as string}
      refetchTasks={refetch}
    />
  );
}

export default page;
