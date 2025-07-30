"use client";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import {
  useCreateTask,
  useGetAllTasks,
  useRemoveTask,
} from "@/lib/hooks/useTask";
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
  const { mutate: removeTask, isPending: isLoading } = useRemoveTask();
  const tasks = data?.data ? data.data : [];

  function handleRemoveTask(taskId: string) {
    removeTask({ taskId, workspaceId, projectId });
  }

  return (
    <TaskListingPageTemplate
      tasks={tasks}
      projectId={params.projectId as string}
      refetchTasks={refetch}
      isRemoving={isLoading}
      removeTask={handleRemoveTask}
    />
  );
}

export default page;
