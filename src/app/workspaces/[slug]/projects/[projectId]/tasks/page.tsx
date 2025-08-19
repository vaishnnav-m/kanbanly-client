"use client";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import {
  useChangeStatus,
  useEditTask,
  useGetAllTasks,
  useRemoveTask,
} from "@/lib/hooks/useTask";
import { RootState } from "@/store";
import { TaskStatus } from "@/types/task.enum";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function TasksListingPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  // hook to fetch all tasks
  const { data } = useGetAllTasks(workspaceId, projectId);

  // remove task hook
  const { mutate: removeTask, isPending: isLoading } = useRemoveTask();
  const tasks = data?.data ? data.data : [];

  // hook to change status
  const { mutate: changeStatus } = useChangeStatus();

  const { mutate: editTask, isPending: isEditing } = useEditTask();

  function handleChangeStatus(newStatus: TaskStatus, taskId: string) {
    changeStatus({ workspaceId, taskId, projectId, data: { newStatus } });
  }

  function handleRemoveTask(taskId: string) {
    removeTask({ taskId, workspaceId, projectId });
  }

  function handleEditTask(taskId: string, data: Partial<TaskCreationPayload>) {
    editTask({
      taskId,
      workspaceId,
      projectId,
      data,
    });
  }

  return (
    <TaskListingPageTemplate
      tasks={tasks}
      projectId={params.projectId as string}
      changeStatus={handleChangeStatus}
      isRemoving={isLoading}
      removeTask={handleRemoveTask}
      workspaceId={workspaceId}
      handleEditTask={handleEditTask}
      isEditing={isEditing}
    />
  );
}
