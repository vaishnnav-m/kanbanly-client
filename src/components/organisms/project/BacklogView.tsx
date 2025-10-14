"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { EpicsSidebar } from "./EpicsSidebar";
import { SprintSection } from "./SprintSection";
import { BacklogSection } from "./BacklogSection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  EpicUpdationPayload,
  IEpic,
  TaskEpic,
} from "@/lib/api/epic/epic.types";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { TaskStatus, WorkItemType } from "@/types/task.enum";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { BacklogHeader } from "@/components/molecules/backlog/BacklogHeader";
import { EpicDetailsModal } from "../epic/EpicDetailsModal";
import {
  useDeleteEpic,
  useGetEpicById,
  useUpdateEpic,
} from "@/lib/hooks/useEpic";
import { useParams } from "next/navigation";
import { useCreateSprint } from "@/lib/hooks/useSprint";

// Types
export interface Issue {
  id: string;
  title: string;
  status: string;
  workItemType: WorkItemType;
  epicId?: string;
  epic?: TaskEpic;
  sprintId?: string;
  assignee?: WorkspaceMember;
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

interface BacklogViewProps {
  addEpic: (title: string, color: string) => void;
  epics: IEpic[] | [];
  sectionsData: Section[] | [];
  createTask: (data: TaskCreationPayload) => void;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  isAttaching: boolean;
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
  members: WorkspaceMember[];
  onInvite: (
    taskId: string,
    data: {
      assignedTo: string;
    }
  ) => void;
}

export function BacklogView({
  addEpic,
  epics,
  sectionsData,
  createTask,
  handleStatusChange,
  handleParentAttach,
  isAttaching,
  setIsTaskModalOpen,
  setSelectedTask,
  members,
  onInvite,
}: BacklogViewProps) {
  const [sections, setSections] = useState<Section[]>(sectionsData);
  const [showEpics, setShowEpics] = useState(true);
  const [draggedIssue, setDraggedIssue] = useState<{
    issue: Issue;
    sourceSection: string;
    sourceIndex: number;
  } | null>(null);
  const [isEpicModalOpen, setIsEpicModalOpen] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState("");

  const params = useParams();
  const projectId = params.projectId as string;
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  //  get one epic data
  const { data: epicData } = useGetEpicById(
    workspaceId,
    projectId,
    selectedEpic,
    { enabled: !!selectedEpic && isEpicModalOpen }
  );
  // epic deletion hook
  const { mutate: deleteEpic } = useDeleteEpic();
  // epic updation hook
  const { mutate: updateEpic } = useUpdateEpic();

  const handleEpicUpdate = (data: EpicUpdationPayload, epicId: string) => {
    updateEpic({ data, epicId, projectId, workspaceId });
  };

  // sprint creation
  const { mutate: createSprint } = useCreateSprint();

  useEffect(() => {
    setSections(sectionsData);
  }, [sectionsData]);

  // to hide / show epic
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea"
      ) {
        return;
      }

      if (event.key === "e") {
        setShowEpics((prevShowEpics) => !prevShowEpics);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowEpics]);

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
    createSprint({
      projectId,
      sprintData: { name: newSprintName },
      workspaceId,
    });
    setCreatingSprint(false);
    setNewSprintName("");
  };

  return (
    <div className="flex-1 h-full flex gap-2">
      <EpicsSidebar
        epics={epics}
        showEpics={showEpics}
        addEpic={addEpic}
        setIsEpicModalOpen={setIsEpicModalOpen}
        setSelectedEpic={setSelectedEpic}
      />
      <div className="bg-card flex-1 flex flex-col gap-2">
        <BacklogHeader
          onToggleEpics={() => setShowEpics(!showEpics)}
          sections={sections}
          showEpics={showEpics}
        />

        {/* Render all sprint sections */}
        {sprintSections.map((sprintSection) => (
          <SprintSection
            key={sprintSection.id}
            sprintSection={sprintSection}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            toggleSection={toggleSection}
            // task creation
            createTask={createTask}
          />
        ))}

        <BacklogSection
          backlogSection={backlogSection}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          toggleSection={toggleSection}
          // task creation
          createTask={createTask}
          // Sprint creation controls
          creatingSprint={creatingSprint}
          setCreatingSprint={setCreatingSprint}
          newSprintName={newSprintName}
          setNewSprintName={setNewSprintName}
          handleAddSprint={handleAddSprint}
          handleStatusChange={handleStatusChange}
          handleParentAttach={handleParentAttach}
          isAttaching={isAttaching}
          epics={epics}
          setIsTaskModalOpen={setIsTaskModalOpen}
          setSelectedTask={setSelectedTask}
        />
      </div>
      <EpicDetailsModal
        close={() => setIsEpicModalOpen(false)}
        epic={epicData?.data}
        isVisible={isEpicModalOpen}
        members={members}
        onInviteMember={onInvite}
        onDeleteEpic={(epicId: string) => {
          deleteEpic({ epicId, projectId, workspaceId });
        }}
        handleEpicUpdate={handleEpicUpdate}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}
