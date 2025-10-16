"use client";
import { IEpic } from "@/lib/api/epic/epic.types";
import { ISprint } from "@/lib/api/sprint/sprint.types";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { TaskStatus } from "@/types/task.enum";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface ITaskPageContext {
  members: WorkspaceMember[];
  epics: IEpic[];
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  isAttaching: boolean;
  activeSprint?: ISprint;
}

export const TaskPageContext = createContext<ITaskPageContext | null>(null);

export function useTaskPageContext() {
  const context = useContext(TaskPageContext);
  if (!context) {
    throw new Error(
      "useTaskPageContext must be used within a TaskPageContextProvider"
    );
  }

  return context;
}
