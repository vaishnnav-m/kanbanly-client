"use client";
import { BoardColumn } from "@/components/molecules/kanban/BoardColumn";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { BoardTask } from "@/types/board.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { Dispatch, SetStateAction } from "react";

export const BoardView = ({
  tasksData,
  handleStatusChange,
  createTask,
  members,
  onInvite,
  setIsTaskModalOpen,
  setSelectedTask,
}: {
  tasksData: BoardTask[];
  createTask: (task: TaskCreationPayload) => void;
  isCreating: boolean;
  handleStatusChange: (status: TaskStatus, taskId: string) => void;
  members: WorkspaceMember[];
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
}) => {
  const handleCreateTask = (task: TaskCreationPayload) => {
    const newTask: TaskCreationPayload = {
      task: task.task,
      status: task.status,
      workItemType: task.workItemType,
      priority: TaskPriority.low,
      assignedTo: task.assignedTo,
    };
    createTask(newTask);
  };

  return (
    <div className="w-full h-full flex gap-3">
      <BoardColumn
        tasks={tasksData}
        createTask={handleCreateTask}
        title="TO DO"
        status={TaskStatus.Todo}
        headingColor="text-yellow-200"
        handleStatusChange={handleStatusChange}
        members={members}
        onInvite={onInvite}
        setIsTaskModalOpen={setIsTaskModalOpen}
        setSelectedTask={setSelectedTask}
      />
      <BoardColumn
        tasks={tasksData}
        title="IN PROGRESS"
        createTask={handleCreateTask}
        status={TaskStatus.InProgress}
        headingColor="text-blue-200"
        handleStatusChange={handleStatusChange}
        members={members}
        onInvite={onInvite}
        setIsTaskModalOpen={setIsTaskModalOpen}
        setSelectedTask={setSelectedTask}
      />
      <BoardColumn
        tasks={tasksData}
        title="COMPLETED"
        createTask={handleCreateTask}
        status={TaskStatus.Completed}
        headingColor="text-emerald-200"
        handleStatusChange={handleStatusChange}
        members={members}
        onInvite={onInvite}
        setIsTaskModalOpen={setIsTaskModalOpen}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};
