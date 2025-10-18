"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import TaskListingPageTemplate from "@/components/templates/task/TaskListingPageTemplate";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { useAddEpic, useGetAllEpics } from "@/lib/hooks/useEpic";
import {
  useAttachParrent,
  useAttachSprint,
  useChangeStatus,
  useCreateTask,
  useEditTask,
  useGetAllTasks,
  useRemoveTask,
} from "@/lib/hooks/useTask";
import { useWorkspaceMembers } from "@/lib/hooks/useWorkspace";
import { RootState } from "@/store";
import { TaskStatus } from "@/types/task.enum";
import { useGetActiveSprint, useGetAllSprints } from "@/lib/hooks/useSprint";

export default function TasksListingPage() {
const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
    search?: string;
  }>({
    status: "",
    priority: "",
    search: "",
  });
  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { data: membersData } = useWorkspaceMembers(workspaceId, 1);
  const members = membersData?.data ? membersData.data.data : [];

  // hook to fetch all tasks
  const { data } = useGetAllTasks(workspaceId, projectId, filters);
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

  // hook to attach parent
  const { mutate: attachParent, isPending: isAttaching } = useAttachParrent();
  const { mutate: attachSprint } = useAttachSprint();

  // hook to get all sprints
  const { data: sprintsData } = useGetAllSprints({ projectId, workspaceId });
  const sprints = sprintsData?.data ? sprintsData.data : [];
  // hook to get active sprint
  const { data: activeSprintData } = useGetActiveSprint(workspaceId, projectId);

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
  function handleAddEpic(title: string, color: string) {
    addEpic({ workspaceId, projectId, title, color });
  }

  // function to handle attachment
  function handleParentAttach(
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) {
    attachParent({
      data: { parentId, parentType },
      projectId,
      taskId,
      workspaceId,
    });
  }

  function handleSprintAttach(taskId: string, sprintId: string) {
    attachSprint({
      projectId,
      taskId,
      workspaceId,
      sprintId,
    });
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
      members={members}
      addEpic={handleAddEpic}
      epics={epics}
      handleParentAttach={handleParentAttach}
      isAttaching={isAttaching}
      filters={filters}
      setFilters={setFilters}
      sprints={sprints}
      activeSprint={activeSprintData?.data}
      handleSprintAttach={handleSprintAttach}
    />
  );
}
