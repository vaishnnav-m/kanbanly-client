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
  handleIssueCheck: (
    sectionId: string,
    issueIndex: number,
    checked: boolean
  ) => void;
  toggleSection: (sectionId: string) => void;
}

export function SprintSection({
  sprintSection,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  handleIssueCheck,
  toggleSection,
}: SprintSectionProps) {
  if (!sprintSection) return null;
  return (
    <div
      className="bg-card border-b border-border"
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
            {sprintSection.issueCount} issues
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            0
          </Badge>
          <Button
            size="sm"
            className="bg-sprint-primary hover:bg-sprint-primary/90 text-white text-xs h-7"
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
                  <IssueCard
                    id={issue.id}
                    title={issue.title}
                    status={issue.status}
                    assignee={issue.assignee}
                    onCheckedChange={(checked) =>
                      handleIssueCheck(sprintSection.id, index, checked)
                    }
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
                  Drag issues from the Backlog section, or create new issues, to
                  plan the work for this sprint. Select Start sprint when
                  you&#39;re ready.
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
