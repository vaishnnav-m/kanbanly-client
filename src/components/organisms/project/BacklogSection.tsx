import {
  Bug,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Plus,
  Star,
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
import { useState } from "react";

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
  creatingSprint?: boolean;
  setCreatingSprint?: (v: boolean) => void;
  newSprintName?: string;
  setNewSprintName?: (v: string) => void;
  handleAddSprint?: () => void;
  createTask: (data: TaskCreationPayload) => void;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  isAttaching: boolean;
}

const issueTypeOptions = [
  {
    value: WorkItemType.Task,
    label: "Task",
    icon: <CheckSquare className="w-4 h-4 text-blue-500" />,
  },
  {
    value: WorkItemType.Feature,
    label: "Feature",
    icon: <Star className="w-4 h-4 text-purple-500" />,
  },
  {
    value: WorkItemType.Story,
    label: "Story",
    icon: <FileText className="w-4 h-4 text-green-500" />,
  },
  {
    value: WorkItemType.Bug,
    label: "Bug",
    icon: <Bug className="w-4 h-4 text-red-500" />,
  },
];

export function BacklogSection({
  backlogSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  toggleSection,
  creatingSprint,
  setCreatingSprint,
  newSprintName,
  setNewSprintName,
  handleAddSprint,
  createTask,
  handleStatusChange,
  handleParentAttach,
  isAttaching,
}: BacklogSectionProps) {
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueType, setNewIssueType] = useState<WorkItemType>(
    WorkItemType.Task
  );

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

  const selectedIssueType = issueTypeOptions.find(
    (type) => type.value === newIssueType
  );

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
      className="flex-1 bg-card"
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
          {/* Sprint creation button/input */}
          {creatingSprint ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newSprintName}
                onChange={(e) => setNewSprintName?.(e.target.value)}
                placeholder="Sprint name"
                className="px-2 py-1 rounded border border-border bg-background text-sm"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSprint?.();
                  if (e.key === "Escape") setCreatingSprint?.(false);
                }}
              />
              <Button
                size="sm"
                onClick={handleAddSprint}
                disabled={!newSprintName?.trim()}
                className="px-3"
              >
                Add
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCreatingSprint?.(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              {backlogSection.issueCount > 0 && (
                <Button
                  size="sm"
                  className="bg-sprint-primary hover:bg-sprint-primary/90 text-white text-xs h-7"
                  onClick={() => setCreatingSprint?.(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Sprint
                </Button>
              )}
            </>
          )}
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
                  className="cursor-move hover:bg-issue-hover transition-colors"
                >
                  <IssueCard
                    id={issue.id}
                    title={issue.title}
                    status={issue.status as TaskStatus}
                    assignee={issue.assignee}
                    workItemType={issue.workItemType}
                    epic={issue.epic}
                    handleStatusChange={handleStatusChange}
                    handleParentAttach={handleParentAttach}
                    isAttaching={isAttaching}
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
              {/* --- NEW: Custom Select Dropdown --- */}
              <Select
                value={newIssueType}
                onValueChange={(value) =>
                  setNewIssueType(value as WorkItemType)
                }
              >
                <SelectTrigger className="w-auto h-9 border-border bg-background">
                  <div className="flex items-center gap-2">
                    {selectedIssueType?.icon}
                    <span className="sr-only">{selectedIssueType?.label}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {issueTypeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
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
                className="flex-grow h-9 px-2 py-1 rounded border border-border bg-background text-sm outline-none focus:border-border focus:ring-1 focus:ring-purple-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmCreation();
                  if (e.key === "Escape") handleCancelCreation();
                }}
              />
              <Button
                size="sm"
                onClick={handleConfirmCreation}
                disabled={!newIssueTitle.trim()}
              >
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
              className="mt-3 text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create issue
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
