"use client";
import { BaseModal } from "@/components/molecules/BaseModal";
import { useCreateProject } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import { projectTemplate } from "@/types/project.enum";
import React, { useState, useEffect } from "react";
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
  const [key, setKey] = useState("");
  const [keyEdited, setKeyEdited] = useState(false);
  const [template, setTemplate] = useState<projectTemplate>(projectTemplate.kanban);
  const [nameError, setNameError] = useState("");

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const {
    mutate: createProject,
    isPending: isLoading,
  } = useCreateProject();

  // Auto-generate key from name unless user edits it
  useEffect(() => {
    if (!keyEdited) {
      const generatedKey = name
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9\-]/g, "")
        .toUpperCase();
      setKey(generatedKey);
    }
  }, [name, keyEdited]);

  const handleInvite = () => {
    if (!workspaceId) return null;
    createProject({ workspaceId, data: { name, description, key, template } });
    setName("");
    setDescription("");
    setKey("");
    setKeyEdited(false);
    setTemplate(projectTemplate.kanban);
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 50) {
      setName(newName);
      setNameError("");
    } else {
      setNameError("Name cannot exceed 50 characters.");
    }
    setKeyEdited(false);
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
            className="px-10 py-2 bg-gray-200 dark:bg-transparent dark:border rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-10 py-2 bg-primary text-white rounded cursor-pointer hover:bg-purple-400 transition"
            onClick={handleInvite}
            disabled={!name.trim() || !key.trim() || isLoading || !!nameError}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      }
    >
      <div className="border rounded-xl shadow-md p-6 flex flex-col gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="project-name"
          >
            Project Name <span className="text-red-400">*</span>
          </label>
          <input
            id="project-name"
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={handleNameChange}
            className="p-3 border border-border rounded-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="project-key"
          >
            Project Key <span className="text-red-400">*</span>
          </label>
          <input
            id="project-key"
            type="text"
            placeholder="Auto-generated from name, but editable"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setKeyEdited(true);
            }}
            className="p-3 border border-border rounded-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <span className="text-xs text-muted-foreground">
            Used as a short identifier for your project (e.g. MY-PROJECT).
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="project-description"
          >
            Description
          </label>
          <textarea
            id="project-description"
            placeholder="Describe your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-border rounded-lg bg-transparent text-foreground max-h-60 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Project Model <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="model"
                value="kanban"
                checked={template === projectTemplate.kanban}
                onChange={() => setTemplate(projectTemplate.kanban)}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Kanban</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="model"
                value="scrum"
                checked={template === projectTemplate.scrum}
                onChange={() => setTemplate(projectTemplate.scrum)}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Scrum</span>
            </label>
          </div>
          <span className="text-xs text-muted-foreground">
            Choose Kanban for continuous flow or Scrum for sprint-based workflow.
          </span>
        </div>
      </div>
    </BaseModal>
  );
};
