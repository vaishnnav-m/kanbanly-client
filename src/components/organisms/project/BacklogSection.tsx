"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { WorkItemCreationInput } from "@/components/molecules/task/WorkItemCreationInput";

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

  const { setSelectedTask, setIsTaskModalOpen } = useTaskPageContext();

  if (!backlogSection) return null;
  function handleIssueCreation() {
    setIsCreatingIssue(true);
  }

  function handleCancelCreation() {
    setIsCreatingIssue(false);
  }

  function handleConfirmCreation(data: {
    newIssueTitle: string;
    newIssueType: string;
  }) {
    if (!data.newIssueTitle.trim()) return;

    createTask({
      task: data.newIssueTitle,
      workItemType: data.newIssueType as WorkItemType,
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
            <WorkItemCreationInput
              view="list"
              handleCancelCreation={handleCancelCreation}
              handleConfirmCreation={handleConfirmCreation}
            />
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
