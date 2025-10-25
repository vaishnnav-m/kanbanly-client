"use client";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  PenBox,
  CornerDownLeft,
  Settings,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { UpdateSprintPayload } from "@/lib/api/sprint/sprint.types";
import { useCallback, useEffect, useState } from "react";
import SprintStartModal from "../sprint/SprintStartModal";
import { useGetOneSprint } from "@/lib/hooks/useSprint";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atoms/select";
import { workItemTypeMap } from "@/lib/constants/workitem.constats";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";

interface SprintSectionProps {
  sprintSection?: Section;
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
  createTask: (data: TaskCreationPayload) => void;
  handleUpdateSprint: ({
    sprintId,
    sprintData,
  }: {
    sprintId: string;
    sprintData: UpdateSprintPayload;
    mode: "start" | "update";
  }) => void;
  handleCompleteSprint: (sprintId: string) => void;
  handleDeleteSprint: (sprintId: string) => void;
}

const initialSprintFormData: UpdateSprintPayload = {
  name: "",
  goal: "",
  duration: "1-week",
  startDate: new Date(),
  endDate: undefined,
};

export function SprintSection({
  sprintSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  toggleSection,
  handleUpdateSprint,
  handleCompleteSprint,
  handleDeleteSprint,
  createTask,
}: SprintSectionProps) {
  const { setSelectedTask, setIsTaskModalOpen } = useTaskPageContext();
  const [isSprintStarting, setIsSprintStarting] = useState(false);
  const [mode, setMode] = useState<"start" | "update">("start");
  // workitem creation
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueType, setNewIssueType] = useState<WorkItemType>(
    WorkItemType.Task
  );
  const [selectedIssueType, setSelectedIssueType] = useState(
    workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
  );

  useEffect(() => {
    setSelectedIssueType(
      workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
    );
  }, [newIssueType]);

  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  const { data } = useGetOneSprint(
    workspaceId,
    projectId,
    sprintSection?.id || ""
  );

  const sprintData = data?.data ? data.data : null;

  const [sprintFormData, setSprintFormData] = useState<UpdateSprintPayload>(
    initialSprintFormData
  );

  const handleFormDataChange = useCallback(
    (
      field: keyof UpdateSprintPayload,
      value: UpdateSprintPayload[keyof UpdateSprintPayload]
    ) => {
      setSprintFormData((prevData) => ({ ...prevData, [field]: value }));
    },
    []
  );

  if (!sprintSection) return null;
  const sprintCounts = sprintSection.issues.reduce(
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

  const handleStartSprint = () => {
    const newSprintData = {
      ...(sprintFormData.name && { name: sprintFormData.name }),
      ...(sprintFormData.goal && { goal: sprintFormData.goal }),
      ...(sprintFormData.startDate && { startDate: sprintFormData.startDate }),
      ...(sprintFormData.endDate && { endDate: sprintFormData.endDate }),
    };

    handleUpdateSprint({
      sprintId: sprintSection.id,
      sprintData: newSprintData,
      mode,
    });

    setSprintFormData(initialSprintFormData);
    setIsSprintStarting(false);
  };

  // handle create workitem
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
      sprintId: sprintSection?.id,
    });

    handleCancelCreation();
  }

  return (
    <div
      className="dark:bg-gray-800/20 rounded-lg"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, sprintSection.id)}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => toggleSection(sprintSection.id)}
            className="p-1 hover:bg-muted rounded-sm h-fit"
          >
            {sprintSection.expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
          <h3 className="font-medium text-foreground">{sprintSection.title}</h3>
          {sprintSection.subtitle && (
            <Button
              onClick={() => {
                if (sprintSection.sprintStatus !== "active") {
                  setMode("update");
                  setIsSprintStarting(true);
                }
              }}
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-6"
            >
              {sprintSection.sprintStatus !== "active" && (
                <PenBox className="w-3 h-3 mr-1" />
              )}
              {sprintSection.subtitle}
            </Button>
          )}
          <Badge variant="secondary" className="text-xs">
            {sprintSection.issueCount} work items
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <Badge
              variant="outline"
              className="bg-yellow-500 text-yellow-900 text-xs font-normal"
            >
              {sprintCounts.todo}
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-500 text-blue-900 text-xs font-normal"
            >
              {sprintCounts.inProgress}
            </Badge>
            <Badge
              variant="outline"
              className="bg-emerald-500 text-emerald-900 text-xs font-normal"
            >
              {sprintCounts.completed}
            </Badge>
          </div>
          {sprintSection.sprintStatus === "active" ? (
            <Button
              onClick={() => {
                handleCompleteSprint(sprintSection.id);
              }}
              size="sm"
              variant="outline"
              className="text-gray-500 dark:text-white text-xs h-7"
            >
              Complete sprint
            </Button>
          ) : (
            <Button
              disabled={!sprintSection.issues.length}
              onClick={() => {
                setMode("start");
                setIsSprintStarting(true);
              }}
              size="sm"
              variant="outline"
              className="text-gray-500 dark:text-white text-xs h-7"
            >
              Start sprint
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    if (sprintSection.sprintStatus !== "active") {
                      setMode("update");
                      setIsSprintStarting(true);
                    }
                  }}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-700/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Settings className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Manage</div>
                      <div className="text-xs text-muted-foreground">
                        Configure settings
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    handleDeleteSprint(sprintSection.id);
                  }}
                  className="w-full text-left p-2 rounded-md hover:bg-destructive/10 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <Trash2 className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-destructive flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-destructive">
                        Delete
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Remove permanently
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {sprintSection.expanded && (
        <div className="p-4">
          {sprintSection.issues.length > 0 ? (
            <div className="space-y-2">
              {sprintSection.issues.map((issue, index) => (
                <div
                  key={`${issue.id}-${index}`}
                  draggable={true}
                  onDragStart={(e) =>
                    handleDragStart(e, issue, sprintSection.id, index)
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
                  Plan your sprint
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag work items from the Backlog section, or create new work
                  items, to plan the work for this sprint. Select Start sprint
                  when you&#39;re ready.
                </p>
              </div>
            </div>
          )}
          {isCreatingIssue ? (
            <div className="mt-3 flex items-center gap-2">
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
                  {Object.values(workItemTypeMap).map(
                    (type) =>
                      type.label !== "Epic" && (
                        <SelectItem
                          key={type.label}
                          value={type.label.toLowerCase()}
                        >
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      )
                  )}
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
      <SprintStartModal
        onOpenChange={setIsSprintStarting}
        open={isSprintStarting}
        sprintFormData={sprintFormData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleStartSprint}
        sprintData={sprintData}
        mode={mode}
      />
    </div>
  );
}
