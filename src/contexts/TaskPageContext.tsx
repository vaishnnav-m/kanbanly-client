"use client";

import { IEpic } from "@/lib/api/epic/epic.types";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface ITaskPageContext {
  members: WorkspaceMember[];
  epics: IEpic[];
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
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
