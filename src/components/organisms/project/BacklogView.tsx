import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { EpicsSidebar } from "./EpicsSidebar";
import { SprintSection } from "./SprintSection";
import { BacklogSection } from "./BacklogSection";
import { Badge } from "@/components/atoms/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IEpic } from "@/lib/api/epic/epic.types";

// Types
export interface Assignee {
  name: string;
  fallback: string;
}

export interface Issue {
  id: string;
  title: string;
  status: string;
  assignee?: Assignee;
}

export interface Epic {
  id: string;
  title: string;
  color: string;
  expanded: boolean;
  issues: Issue[];
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  type: "sprint" | "backlog";
  issueCount: number;
  expanded: boolean;
  issues: Issue[];
  sprintStatus?: string;
}

const mockSections: Section[] = [
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

interface BacklogViewProps {
  addEpic: (title: string) => void;
  epics: IEpic[] | [];
  tasks: Section[] | [];
}

export function BacklogView({ addEpic, epics, tasks }: BacklogViewProps) {
  const [sections, setSections] = useState<Section[]>(tasks);
  const [showEpics, setShowEpics] = useState(true);
  const [draggedIssue, setDraggedIssue] = useState<{
    issue: Issue;
    sourceSection: string;
    sourceIndex: number;
  } | null>(null);

  // Sprint creation state
  const [creatingSprint, setCreatingSprint] = useState(false);
  const [newSprintName, setNewSprintName] = useState("");

  const planName = useSelector(
    (state: RootState) => state.subscription.planName
  )
    .split(" ")[0]
    .toLowerCase();
  if (planName === "free") {
    return (
      <div
        style={{ height: "calc(100vh - 256px)" }}
        className="flex-1 flex items-center justify-center gap-6 text-muted-foreground text-lg"
      >
        <Lock className="size-9" />
        <div className="text-center">Upgrade your plan to get this feature</div>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
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
    issue: Issue,
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

  // Filter sprint and backlog sections
  const sprintSections = sections.filter(
    (section) => section.type === "sprint"
  );
  const backlogSection = sections.find((section) => section.type === "backlog");

  // Add new sprint
  const handleAddSprint = () => {
    if (!newSprintName.trim()) return;
    const newSprint: Section = {
      id: `sprint-${Date.now()}`,
      title: newSprintName.trim(),
      subtitle: "",
      type: "sprint",
      issueCount: 0,
      expanded: true,
      issues: [],
      sprintStatus: "planned",
    };
    setSections([...sections, newSprint]);
    setCreatingSprint(false);
    setNewSprintName("");
  };

  return (
    <div className="flex-1 h-full flex">
      <EpicsSidebar
        epics={epics}
        showEpics={showEpics}
        setShowEpics={setShowEpics}
        addEpic={addEpic}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Backlog Management
              </h2>
              <Badge variant="outline" className="text-xs">
                {sections.reduce(
                  (total, section) => total + section.issueCount,
                  0
                )}{" "}
                total issues
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
        {/* Render all sprint sections */}
        {sprintSections.map((sprintSection) => (
          <SprintSection
            key={sprintSection.id}
            sprintSection={sprintSection}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleIssueCheck={handleIssueCheck}
            toggleSection={toggleSection}
          />
        ))}
        <BacklogSection
          backlogSection={backlogSection}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleIssueCheck={handleIssueCheck}
          toggleSection={toggleSection}
          // Sprint creation controls
          creatingSprint={creatingSprint}
          setCreatingSprint={setCreatingSprint}
          newSprintName={newSprintName}
          setNewSprintName={setNewSprintName}
          handleAddSprint={handleAddSprint}
        />
      </div>
    </div>
  );
}
