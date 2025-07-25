"use client";
import { BaseModal } from "@/components/molecules/BaseModal";
import { useCreateProject } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({
  isOpen,
  onClose,
}: CreateProjectModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const {
    mutate: createProject,
    isPending: isLoading,
  } = useCreateProject();

  const handleInvite = () => {
    if (!workspaceId) return null;
    createProject({ workspaceId, data: { name, description } });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
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
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="name"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
        <input
          type="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-inherit text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
      </div>
    </BaseModal>
  );
};
