"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { EpicsSidebar } from "./EpicsSidebar";
import { SprintSection } from "./SprintSection";
import { BacklogSection } from "./BacklogSection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { EpicUpdationPayload, TaskEpic } from "@/lib/api/epic/epic.types";
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
import {
  useCompleteSprint,
  useCreateSprint,
  useDeleteSprint,
  useStartSprint,
  useUpdateSprint,
} from "@/lib/hooks/useSprint";
import { UpdateSprintPayload } from "@/lib/api/sprint/sprint.types";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmationModal } from "../admin/ConfirmationModal";

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
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  type: "sprint" | "backlog";
  issueCount: number;
  expanded: boolean;
  issues: Issue[];
  sprintStatus?: "active" | "future" | "completed";
}

interface BacklogViewProps {
  addEpic: (title: string, color: string) => void;
  sectionsData: Section[] | [];
  createTask: (data: TaskCreationPayload) => void;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
  handleSprintAttach: (taskId: string, sprintId: string) => void;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export function BacklogView({
  addEpic,
  sectionsData,
  createTask,
  handleStatusChange,
  handleSprintAttach,
  setActiveTab,
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
  const [selectedSprint, setSelectedSprint] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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

  const toast = useToastMessage();
  const queryClient = useQueryClient();

  // sprint creation
  const { mutate: createSprint } = useCreateSprint();
  const { mutate: updateSprint } = useUpdateSprint();
  const { mutate: startSprint } = useStartSprint({
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Started Successfully",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getSprints"] });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({ queryKey: ["getActiveSprint"] });
      setActiveTab("Board");
    },
  });
  const { mutate: completeSprint } = useCompleteSprint();
  const { mutate: deleteSprint } = useDeleteSprint();

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

  // plan name
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

    const { issue, sourceSection } = draggedIssue;

    // Don't allow dropping on the same section
    if (sourceSection === targetSection) {
      setDraggedIssue(null);
      return;
    }

    if (targetSection === "backlog-section") {
      handleSprintAttach(issue.id, "");
    } else {
      handleSprintAttach(issue.id, targetSection);
    }

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
    createSprint({
      projectId,
      workspaceId,
    });
  };

  const handleUpdateSprint = ({
    sprintId,
    sprintData,
    mode,
  }: {
    sprintId: string;
    sprintData: UpdateSprintPayload;
    mode: "start" | "update";
  }) => {
    if (mode === "start") {
      startSprint({ data: sprintData, projectId, sprintId, workspaceId });
    } else {
      updateSprint({ data: sprintData, projectId, sprintId, workspaceId });
    }
  };

  const handleCompleteSprint = (sprintId: string) => {
    completeSprint({ workspaceId, projectId, sprintId });
  };

  const handleDeleteSprint = (sprintId: string) => {
    setSelectedSprint(sprintId);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex-1 h-full flex gap-2">
      <EpicsSidebar
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
            handleUpdateSprint={handleUpdateSprint}
            handleCompleteSprint={handleCompleteSprint}
            handleDeleteSprint={handleDeleteSprint}
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
          handleAddSprint={handleAddSprint}
        />
      </div>
      <EpicDetailsModal
        close={() => setIsEpicModalOpen(false)}
        epic={epicData?.data}
        isVisible={isEpicModalOpen}
        onDeleteEpic={(epicId: string) => {
          deleteEpic({ epicId, projectId, workspaceId });
        }}
        handleEpicUpdate={handleEpicUpdate}
        handleStatusChange={handleStatusChange}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => {
          setSelectedSprint("");
          setIsConfirmationOpen(false);
        }}
        onConfirm={() => {
          deleteSprint({ workspaceId, projectId, sprintId: selectedSprint });
          setSelectedSprint("");
          setIsConfirmationOpen(false);
        }}
        title="Are you sure you want to remove this sprint ?"
        description="This action cannot be undone. The sprint will be permanently deleted from the project."
        cancelText="Cancel"
        confirmText="Delete Sprint"
      />
    </div>
  );
}
