"use client";
import { Button } from "@/components/atoms/button";
import { BaseModal } from "@/components/molecules/BaseModal";
import { useCreateProject } from "@/lib/hooks/useProject";
import { RootState } from "@/store";
import { projectTemplate } from "@/types/project.enum";
import { Kanban, ListTodo, Plus, X } from "lucide-react";
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
  const [template, setTemplate] = useState<projectTemplate>(
    projectTemplate.kanban
  );
  const [nameError, setNameError] = useState("");

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );
  const { mutate: createProject, isPending: isLoading } = useCreateProject();

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

  const handleCreateProject = () => {
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
      text="Organize tasks and track progress with a new project."
      footer={
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-8"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={!name.trim() || !key.trim() || isLoading || !!nameError}
            className="px-8"
          >
            {isLoading ? (
              "Creating..."
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6 py-4">
        {/* Project Name & Key Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 space-y-2">
            <label
              className="text-sm font-semibold text-foreground flex items-center gap-1"
              htmlFor="project-name"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="e.g. Website Redesign"
              value={name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
            {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
          </div>

          <div className="md:col-span-1 space-y-2">
            <label
              className="text-sm font-semibold text-foreground flex items-center gap-1"
              htmlFor="project-key"
            >
              Key <span className="text-red-500">*</span>
            </label>
            <input
              id="project-key"
              type="text"
              placeholder="KEY"
              value={key}
              onChange={(e) => {
                setKey(e.target.value.toUpperCase());
                setKeyEdited(true);
              }}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm uppercase font-mono"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="project-description"
          >
            Description
          </label>
          <textarea
            id="project-description"
            placeholder="Add a brief description of the project goals..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-[100px] max-h-[200px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-y"
          />
        </div>

        {/* Project Model Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1">
            Project Model <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTemplate(projectTemplate.kanban)}
              className={`flex items-start gap-4 p-4 text-left border rounded-xl transition-all duration-200 ${
                template === projectTemplate.kanban
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-input hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  template === projectTemplate.kanban
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Kanban size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Kanban</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-normal">
                  Visualize workflow and maximize efficiency with a continuous flow.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTemplate(projectTemplate.scrum)}
              className={`flex items-start gap-4 p-4 text-left border rounded-xl transition-all duration-200 ${
                template === projectTemplate.scrum
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-input hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  template === projectTemplate.scrum
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <ListTodo size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Scrum</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-normal">
                  Focus on delivering value in fixed-length iterations called sprints.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};