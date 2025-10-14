"use client";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { TaskStatus } from "@/types/task.enum";

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
}

export function SprintSection({
  sprintSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  toggleSection,
}: SprintSectionProps) {
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
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-6"
            >
              <Calendar className="w-3 h-3 mr-1" />
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
          <Button
            size="sm"
            variant="outline"
            className="text-gray-500 dark:text-white text-xs h-7"
          >
            Start sprint
          </Button>
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
                  className="cursor-move hover:bg-issue-hover transition-colors"
                >
                  {/* <IssueCard
                    id={issue.id}
                    title={issue.title}
                    status={issue.status as TaskStatus}
                    assignee={issue.assignee}
                    workItemType={issue.workItemType}
                  /> */}
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
    </div>
  );
}
