"use client";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  PenBox,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { TaskStatus } from "@/types/task.enum";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { UpdateSprintPayload } from "@/lib/api/sprint/sprint.types";
import { useCallback, useState } from "react";
import SprintStartModal from "../sprint/SprintStartModal";
import { useGetOneSprint } from "@/lib/hooks/useSprint";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
}

const initialSprintFormData: UpdateSprintPayload = {
  name: "",
  goal: "",
  duration: "1-week",
  startDate: undefined,
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
}: SprintSectionProps) {
  const { setSelectedTask, setIsTaskModalOpen } = useTaskPageContext();
  const [isSprintStarting, setIsSprintStarting] = useState(false);
  const [mode, setMode] = useState<"start" | "update">("start");

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

  console.log("sprint", sprintSection);

  return (
    <div
      className="dark:bg-gray-800/20 rounded-lg"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, sprintSection.id)}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSection(sprintSection.id)}
            className="p-1 hover:bg-muted rounded-sm"
          >
            {sprintSection.expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
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
                setMode("start");
                setIsSprintStarting(true);
              }}
              size="sm"
              variant="outline"
              className="text-gray-500 dark:text-white text-xs h-7"
            >
              Complete sprint
            </Button>
          ) : (
            <Button
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

          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
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
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workitem
          </Button>
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
