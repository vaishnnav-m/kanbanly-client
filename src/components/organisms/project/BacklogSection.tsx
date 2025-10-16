"use client";
import {
  ChevronDown,
  ChevronRight,
  CornerDownLeft,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atoms/select";
import { useState, useEffect } from "react";
import { workItemTypeMap } from "@/lib/constants/workitem.constats";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface BacklogSectionProps {
  backlogSection?: Section;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetSection: string) => void;
  handleDragStart: (
    e: React.DragEvent,
    issue: Issue,
    sourceSection: string,
    sourceIndex: number
  ) => void;
  handleDragEnd: () => void;
  toggleSection: (sectionId: string) => void;
  // Sprint creation controls
  handleAddSprint?: () => void;
  createTask: (data: TaskCreationPayload) => void;
}

export function BacklogSection({
  backlogSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  toggleSection,
  handleAddSprint,
  createTask,
}: BacklogSectionProps) {
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueType, setNewIssueType] = useState<WorkItemType>(
    WorkItemType.Task
  );

  const [selectedIssueType, setSelectedIssueType] = useState(
    workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
  );

  const { setSelectedTask, setIsTaskModalOpen } = useTaskPageContext();

  useEffect(() => {
    setSelectedIssueType(
      workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
    );
  }, [newIssueType]);

  if (!backlogSection) return null;
  function handleIssueCreation() {
    setIsCreatingIssue(true);
  }

  function handleCancelCreation() {
    setIsCreatingIssue(false);
    setNewIssueTitle("");
    setNewIssueType(WorkItemType.Task);
  }

  function handleConfirmCreation() {
    if (!newIssueTitle.trim()) return;

    createTask({
      task: newIssueTitle,
      workItemType: newIssueType,
      status: TaskStatus.Todo,
      priority: TaskPriority.low,
    });

    handleCancelCreation();
  }

  const backlogCounts = backlogSection.issues.reduce(
    (acc, issue) => {
      if (issue.status === TaskStatus.Todo) {
        acc.todo++;
      } else if (issue.status === TaskStatus.InProgress) {
        acc.inProgress++;
      } else if (issue.status === TaskStatus.Completed) {
        acc.completed++;
      }
      return acc;
    },
    { todo: 0, inProgress: 0, completed: 0 }
  );

  return (
    <div
      className="flex-1 dark:bg-gray-800/20 rounded-lg"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, backlogSection.id)}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSection(backlogSection.id)}
            className="p-1 hover:bg-muted rounded-sm"
          >
            {backlogSection.expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          <h3 className="font-medium text-foreground">
            {backlogSection.title}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {backlogSection.issueCount} work items
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <Badge
              variant="outline"
              className="bg-yellow-500 text-yellow-900 text-xs font-normal"
            >
              {backlogCounts.todo}
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-500 text-blue-900 text-xs font-normal"
            >
              {backlogCounts.inProgress}
            </Badge>
            <Badge
              variant="outline"
              className="bg-emerald-500 text-emerald-900 text-xs font-normal"
            >
              {backlogCounts.completed}
            </Badge>
          </div>
          <>
            {backlogSection.issueCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="text-gray-500 dark:text-white text-xs h-7"
                onClick={handleAddSprint}
              >
                <Plus className="w-4 h-4" />
                Create Sprint
              </Button>
            )}
          </>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {backlogSection.expanded && (
        <div className="p-4">
          {backlogSection.issues.length > 0 ? (
            <div className="space-y-2">
              {backlogSection.issues.map((issue, index) => (
                <div
                  key={`${issue.id}-${index}`}
                  draggable={true}
                  onDragStart={(e) =>
                    handleDragStart(e, issue, backlogSection.id, index)
                  }
                  onDragEnd={handleDragEnd}
                  className="cursor-pointer hover:bg-issue-hover transition-colors"
                  onClick={() => {
                    setIsTaskModalOpen(true);
                    setSelectedTask(issue.id);
                  }}
                >
                  <IssueCard
                    id={issue.id}
                    title={issue.title}
                    status={issue.status as TaskStatus}
                    assignee={issue.assignee}
                    workItemType={issue.workItemType}
                    epic={issue.epic}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <h4 className="font-medium text-foreground mb-2">
                  Backlog is Empty
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  There are currently no work items in the backlog. Please
                  create a new issue to begin managing your project tasks.
                </p>
              </div>
            </div>
          )}
          {isCreatingIssue ? (
            <div className="mt-3 flex items-center gap-2">
              <Select
                value={newIssueType}
                onValueChange={(value) => {
                  console.log("value is", value);
                  setNewIssueType(value as WorkItemType);
                }}
              >
                <SelectTrigger className="w-auto h-9 border-border bg-background">
                  <div className="flex items-center gap-2">
                    {selectedIssueType?.icon}
                    <span className="sr-only">{selectedIssueType?.label}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(workItemTypeMap).map((type) => (
                    <SelectItem
                      key={type.label}
                      value={type.label.toLowerCase()}
                    >
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="text"
                value={newIssueTitle}
                onChange={(e) => setNewIssueTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow h-9 px-2 py-1 rounded border border-border bg-background text-sm outline-none focus:border-border focus:ring-1 focus:ring-purple-500/30"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmCreation();
                  if (e.key === "Escape") handleCancelCreation();
                }}
              />
              <Button
                className="border-purple-400"
                variant="outline"
                size="sm"
                onClick={handleConfirmCreation}
                disabled={!newIssueTitle.trim()}
              >
                <CornerDownLeft className="size-4" />
                Create
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancelCreation}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleIssueCreation}
              variant="ghost"
              size="sm"
              className="mt-3 text-muted-foreground hover:text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Workitem
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
