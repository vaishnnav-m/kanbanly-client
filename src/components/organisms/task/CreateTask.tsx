"use client";
import { BaseModal } from "@/components/molecules/BaseModal";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { useCreateTask } from "@/lib/hooks/useTask";
import { RootState } from "@/store";
import { TaskPriority } from "@/types/task.enum";
import React, { ChangeEvent, useReducer, useState } from "react";
import { useSelector } from "react-redux";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  refetchTasks: () => void;
}

export const CreateTaskModal = ({
  isOpen,
  onClose,
  projectId,
  refetchTasks,
}: CreateTaskModalProps) => {
  type FormAction = {
    name: keyof TaskCreationPayload;
    value: string | Date;
  };

  function reducer(
    state: TaskCreationPayload,
    action: FormAction
  ): TaskCreationPayload {
    return {
      ...state,
      [action.name]: action.value,
    };
  }

  const [formState, dispatch] = useReducer(reducer, {
    task: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: TaskPriority.low,
  });

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  const { mutate: createTask, isPending: isLoading } = useCreateTask();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | Date = value;
    if (type === "date") {
      parsedValue = new Date(value);
    }

    dispatch({
      name: name as keyof TaskCreationPayload,
      value: parsedValue,
    });
  };

  const handleInvite = () => {
    if (!workspaceId) return;
    createTask({ data: formState, workspaceId, projectId });
    refetchTasks();

    dispatch({ name: "task", value: "" });
    dispatch({ name: "description", value: "" });
    dispatch({ name: "assignedTo", value: "" });
    dispatch({ name: "dueDate", value: "" });
    dispatch({ name: "priority", value: TaskPriority.low });

    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      text=""
      footer={
        <div className="flex justify-center space-x-2">
          <button
            className="px-10 py-2 bg-gray-200 dark:bg-transparent dark:border rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-10 py-2 bg-primary text-white rounded cursor-pointer hover:bg-purple-400"
            onClick={handleInvite}
            disabled={!formState.task.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Task Name"
          name="task"
          value={formState.task}
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          name="dueDate"
          value={
            formState.dueDate
              ? new Date(formState.dueDate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
        <select
          name="priority"
          value={formState.priority}
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-50 dark:bg-inherit text-gray-500 transition-colors duration-300"
        >
          <option value={TaskPriority.low}>Low</option>
          <option value={TaskPriority.medium}>Medium</option>
          <option value={TaskPriority.high}>High</option>
        </select>
      </div>
    </BaseModal>
  );
};
