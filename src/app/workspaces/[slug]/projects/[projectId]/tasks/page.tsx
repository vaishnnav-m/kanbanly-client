"use client";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import {
  useChangeStatus,
  useCreateTask,
  useGetAllTasks,
  useGetOneTask,
  useRemoveTask,
} from "@/lib/hooks/useTask";
import { RootState } from "@/store";
import { TaskStatus } from "@/types/task.enum";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function page() {
  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  // hook to fetch all tasks
  const { data, refetch, isPending } = useGetAllTasks(workspaceId, projectId);

  // remove task hook
  const { mutate: removeTask, isPending: isLoading } = useRemoveTask();
  const tasks = data?.data ? data.data : [];

  // hook to change status
  const { mutate: changeStatus } = useChangeStatus();

  function handleChangeStatus(newStatus: TaskStatus, taskId: string) {
    changeStatus({ workspaceId, taskId, projectId, data: { newStatus } });
  }

  function handleRemoveTask(taskId: string) {
    removeTask({ taskId, workspaceId, projectId });
  }

  return (
    <TaskListingPageTemplate
      tasks={tasks}
      projectId={params.projectId as string}
      changeStatus={handleChangeStatus}
      isRemoving={isLoading}
      removeTask={handleRemoveTask}
      workspaceId={workspaceId}
    />
  );
}

export default page;
