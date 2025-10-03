"use client";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { useAddEpic, useGetAllEpics } from "@/lib/hooks/useEpic";
import {
  useChangeStatus,
  useCreateTask,
  useEditTask,
  useGetAllTasks,
  useRemoveTask,
} from "@/lib/hooks/useTask";
import { useWorkspaceMembers } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { TaskStatus } from "@/types/task.enum";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TasksListingPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const [searchTerm, setSearchTerm] = useState("");
  const { data: membersData } = useWorkspaceMembers(workspaceId, 1, searchTerm);
  const members = membersData?.data ? membersData.data.data : [];

  // hook to fetch all tasks
  const { data } = useGetAllTasks(workspaceId, projectId);
  const tasks = data?.data ? data.data : [];

  // hook to create task
  const { mutate: createTask, isPending: isCreating } = useCreateTask();

  // remove task hook
  const { mutate: removeTask, isPending: isLoading } = useRemoveTask();

  // hook to change status
  const { mutate: changeStatus } = useChangeStatus();

  // hook to edit task
  const { mutate: editTask, isPending: isEditing } = useEditTask();

  // hook to add epic
  const { mutate: addEpic } = useAddEpic();

  // hook to get all epics
  const { data: epicsData } = useGetAllEpics(workspaceId, projectId);
  const epics = epicsData?.data ? epicsData.data : [];

  // function to handle task creation
  function handleCreateTask(data: TaskCreationPayload) {
    createTask({
      workspaceId,
      projectId,
      data,
    });
  }

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

  // function to handle epic addition
  function handleAddEpic(title: string) {
    addEpic({ workspaceId, projectId, title });
  }

  return (
    <TaskListingPageTemplate
      tasks={tasks}
      createTask={handleCreateTask}
      isCreating={isCreating}
      projectId={params.projectId as string}
      changeStatus={handleChangeStatus}
      isRemoving={isLoading}
      removeTask={handleRemoveTask}
      workspaceId={workspaceId}
      handleEditTask={handleEditTask}
      isEditing={isEditing}
      setSearchTerm={setSearchTerm}
      members={members}
      addEpic={handleAddEpic}
      epics={epics}
    />
  );
}
