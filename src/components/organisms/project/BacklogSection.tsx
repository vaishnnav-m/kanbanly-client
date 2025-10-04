import { ChevronDown, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IssueCard } from "@/components/molecules/project/IssueCard";
import type { Section, Issue } from "./BacklogView";

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
  handleIssueCheck: (
    sectionId: string,
    issueIndex: number,
    checked: boolean
  ) => void;
  toggleSection: (sectionId: string) => void;
  // Sprint creation controls
  creatingSprint?: boolean;
  setCreatingSprint?: (v: boolean) => void;
  newSprintName?: string;
  setNewSprintName?: (v: string) => void;
  handleAddSprint?: () => void;
}

export function BacklogSection({
  backlogSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  handleIssueCheck,
  toggleSection,
  creatingSprint,
  setCreatingSprint,
  newSprintName,
  setNewSprintName,
  handleAddSprint,
}: BacklogSectionProps) {
  if (!backlogSection) return null;
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
            {backlogSection.issueCount} issues
          </Badge>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-status-done rounded-full"></div>
            <div className="w-2 h-2 bg-status-progress rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            0
          </Badge>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-status-done rounded-full"></div>
            <div className="w-2 h-2 bg-status-progress rounded-full"></div>
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
                    status={issue.status}
                    assignee={issue.assignee}
                    onCheckedChange={(checked) =>
                      handleIssueCheck(backlogSection.id, index, checked)
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <h4 className="font-medium text-foreground mb-2">
                  No issues in backlog
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create new issues or move them from epics to start building
                  your backlog.
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
            Create issue
          </Button>
        </div>
      )}
    </div>
  );
}
