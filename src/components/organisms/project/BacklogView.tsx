import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
  MoreHorizontal,
  Layers,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { IssueCard } from "@/components/molecules/project/IssueCard";

interface Epic {
  id: string;
  title: string;
  color: string;
  expanded: boolean;
  issues: Array<{
    id: string;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    assignee?: {
      name: string;
      avatar?: string;
      fallback: string;
    };
  }>;
}

interface BacklogSection {
  id: string;
  title: string;
  subtitle?: string;
  type: "backlog" | "sprint";
  issueCount: number;
  issues: Array<{
    id: string;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    assignee?: {
      name: string;
      avatar?: string;
      fallback: string;
    };
    epicId?: string;
  }>;
  expanded: boolean;
  sprintStatus?: "planned" | "active" | "completed";
}

const mockEpics: Epic[] = [
  {
    id: "epic-1",
    title: "User Authentication",
    color: "bg-blue-500",
    expanded: true,
    issues: [
      {
        id: "SCRUM-1",
        title: "Create login page",
        status: "TODO",
        assignee: { name: "John Doe", fallback: "JD" },
      },
      {
        id: "SCRUM-2",
        title: "Implement OAuth",
        status: "IN_PROGRESS",
        assignee: { name: "Sarah Miller", fallback: "SM" },
      },
    ],
  },
  {
    id: "epic-2",
    title: "Dashboard Features",
    color: "bg-green-500",
    expanded: true,
    issues: [
      {
        id: "SCRUM-3",
        title: "Create dashboard layout",
        status: "TODO",
        assignee: { name: "Mike Johnson", fallback: "MJ" },
      },
    ],
  },
];

const mockSections: BacklogSection[] = [
  {
    id: "sprint-1",
    title: "SCRUM Sprint 1",
    subtitle: "Add dates",
    type: "sprint",
    issueCount: 2,
    expanded: true,
    issues: [
      {
        id: "SCRUM-4",
        title: "Create user profile page",
        status: "TODO",
        assignee: { name: "John Doe", fallback: "JD" },
      },
      {
        id: "SCRUM-5",
        title: "Add notification system",
        status: "IN_PROGRESS",
        assignee: { name: "Sarah Miller", fallback: "SM" },
      },
    ],
    sprintStatus: "planned",
  },
  {
    id: "backlog",
    title: "Backlog",
    type: "backlog",
    issueCount: 3,
    expanded: true,
    issues: [
      {
        id: "SCRUM-6",
        title: "Implement search functionality",
        status: "TODO",
        assignee: { name: "Mike Johnson", fallback: "MJ" },
      },
      {
        id: "SCRUM-7",
        title: "Add dark mode support",
        status: "TODO",
        assignee: { name: "Alex Brown", fallback: "AB" },
      },
      {
        id: "SCRUM-8",
        title: "Create API documentation",
        status: "TODO",
        assignee: { name: "Emma Wilson", fallback: "EW" },
      },
    ],
  },
];

export function BacklogView() {
  const [sections, setSections] = useState(mockSections);
  const [epics, setEpics] = useState(mockEpics);
  const [showEpics, setShowEpics] = useState(true);
  const [draggedIssue, setDraggedIssue] = useState<{
    issue: any;
    sourceSection: string;
    sourceIndex: number;
  } | null>(null);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  const toggleEpic = (epicId: string) => {
    setEpics(
      epics.map((epic) =>
        epic.id === epicId ? { ...epic, expanded: !epic.expanded } : epic
      )
    );
  };

  const handleIssueCheck = (
    sectionId: string,
    issueIndex: number,
    checked: boolean
  ) => {
    console.log(
      `Issue ${issueIndex} in ${sectionId} ${
        checked ? "selected" : "deselected"
      }`
    );
  };

  const handleDragStart = (
    e: React.DragEvent,
    issue: any,
    sourceSection: string,
    sourceIndex: number
  ) => {
    setDraggedIssue({ issue, sourceSection, sourceIndex });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    
    if (!draggedIssue) return;

    const { issue, sourceSection, sourceIndex } = draggedIssue;

    // Don't allow dropping on the same section
    if (sourceSection === targetSection) {
      setDraggedIssue(null);
      return;
    }

    // Remove issue from source section
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sourceSection) {
          const newIssues = [...section.issues];
          newIssues.splice(sourceIndex, 1);
          return {
            ...section,
            issues: newIssues,
            issueCount: newIssues.length,
          };
        }
        return section;
      })
    );

    // Add issue to target section
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === targetSection) {
          const newIssues = [...section.issues, issue];
          return {
            ...section,
            issues: newIssues,
            issueCount: newIssues.length,
          };
        }
        return section;
      })
    );

    setDraggedIssue(null);
  };

  const handleDragEnd = () => {
    setDraggedIssue(null);
  };

  // Get sprint and backlog sections
  const sprintSection = sections.find(section => section.type === "sprint");
  const backlogSection = sections.find(section => section.type === "backlog");

  return (
    <div className="flex-1 h-full flex">
      {/* Left Sidebar - Epics (only show when showEpics is true) */}
      {showEpics && (
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Epics</h3>
                <Badge variant="secondary" className="text-xs">
                  {epics.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEpics(false)}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {epics.map((epic) => (
              <div key={epic.id} className="border border-border rounded-md">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleEpic(epic.id)}
                      className="p-1 hover:bg-muted rounded-sm"
                    >
                      {epic.expanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <div
                      className={`w-3 h-3 rounded-full ${epic.color}`}
                    ></div>
                    <h4 className="font-medium text-foreground text-sm">
                      {epic.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {epic.issues.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {epic.expanded && (
                  <div className="px-3 pb-3 space-y-2">
                    {epic.issues.map((issue, index) => (
                      <div
                        key={`${issue.id}-${index}`}
                        className="flex items-center gap-3 p-2 bg-muted/50 border border-border rounded-md"
                      >
                        <Badge variant="outline" className="text-xs font-mono">
                          {issue.id}
                        </Badge>
                        <span className="text-sm text-foreground flex-1 truncate">
                          {issue.title}
                        </span>
                        {issue.assignee && (
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">
                            {issue.assignee.fallback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create epic
            </Button>
          </div>
        </div>
      )}

      {/* Main Content - Sprint and Backlog (expands to full width when epics hidden) */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Header with Epic Toggle */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">Backlog Management</h2>
              <Badge variant="outline" className="text-xs">
                {sections.reduce((total, section) => total + section.issueCount, 0)} total issues
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEpics(!showEpics)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showEpics ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Epics
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Epics
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Sprint Section - Top */}
        {sprintSection && (
          <div
            className="bg-card border-b border-border"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, sprintSection.id)}
          >
            {/* Sprint Header */}
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

            {/* Sprint Content */}
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
                        Drag issues from the Backlog section, or create new
                        issues, to plan the work for this sprint. Select Start
                        sprint when you're ready.
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
        )}

        {/* Backlog Section - Bottom */}
        {backlogSection && (
          <div
            className="flex-1 bg-card"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, backlogSection.id)}
          >
            {/* Backlog Header */}
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

                <h3 className="font-medium text-foreground">{backlogSection.title}</h3>

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

                <Button
                  size="sm"
                  className="bg-sprint-primary hover:bg-sprint-primary/90 text-white text-xs h-7"
                >
                  Create Sprint
                </Button>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Backlog Content */}
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
                        Create new issues or move them from epics to start building your backlog.
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
        )}
      </div>
    </div>
  );
}
