"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Archive, GanttChart, LayoutGrid, List } from "lucide-react";
import { JSONContent } from "@tiptap/react";
import { TaskCreationPayload, TaskListing } from "@/lib/api/task/task.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";
import { projectTemplate } from "@/types/project.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TaskDetails } from "@/components/organisms/task/TaskDetailModal";
import { useGetAllSubTasks, useGetOneTask } from "@/lib/hooks/useTask";
import { BoardView } from "@/components/organisms/project/BoardView";
import { TaskCompletionModal } from "@/components/organisms/task/TaskCompletionModal";
import { useGetSignature, useUploadPicture } from "@/lib/hooks/useCloudinary";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { ListView } from "@/components/organisms/project/ListView";
import {
  BacklogView,
  Section,
} from "@/components/organisms/project/BacklogView";
import { IEpic } from "@/lib/api/epic/epic.types";
import { formatDataIntoSections } from "@/lib/task-utils";
import { ISprint, ISprintResponse } from "@/lib/api/sprint/sprint.types";
import { TaskPageContext } from "@/contexts/TaskPageContext";
import { useSocket } from "@/contexts/SocketContext";

import { useToastMessage } from "@/lib/hooks/useToastMessage";

interface TaskListingPageTemplateProps {
  projectId: string;
  tasks: TaskListing[] | [];
  createTask: (data: TaskCreationPayload) => void;
  isCreating: boolean;
  changeStatus: (newStatus: TaskStatus, taskId: string) => void;
  isRemoving: boolean;
  removeTask: (taskId: string) => void;
  workspaceId: string;
  handleEditTask: (taskId: string, data: Partial<TaskCreationPayload>) => void;
  isEditing: boolean;
  members: WorkspaceMember[] | [];
  addEpic: (title: string, color: string) => void;
  epics: IEpic[] | [];
  handleParentAttach: (
    parentType: "epic" | "task",
    parentId: string,
    taskId: string
  ) => void;
  handleSprintAttach: (taskId: string, sprintId: string) => void;
  isAttaching: boolean;
  filters: { status?: string; priority?: string; search?: string };
  setFilters: Dispatch<
    SetStateAction<{
      status?: string;
      priority?: string;
      search?: string;
    }>
  >;
  sprints: ISprintResponse[];
  activeSprint?: ISprint;
  handlePostComment: (content: JSONContent, taskId: string) => void;
  handleUpdateComment: (
    content: JSONContent,
    taskId: string,
    commentId: string
  ) => void;
  handleDeleteComment: (taskId: string, commentId: string) => void;
}

function TaskListingPageTemplate({
  projectId,
  tasks,
  createTask,
  isCreating,
  removeTask,
  workspaceId,
  changeStatus,
  handleEditTask,
  isEditing,
  members,
  addEpic,
  epics,
  handleParentAttach,
  isAttaching,
  filters,
  setFilters,
  sprints,
  handleSprintAttach,
  activeSprint,
  handlePostComment,
  handleDeleteComment,
  handleUpdateComment,
}: TaskListingPageTemplateProps) {
  const [combinedTasks, setCombinedTasks] = useState<TaskListing[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [pendingCompletionTaskId, setPendingCompletionTaskId] = useState<
    string | null
  >(null);

  const { data: cloudinaryResponse } = useGetSignature();
  const cloudinarySignature = cloudinaryResponse?.data;
  const { mutateAsync: uploadPicture, isPending: isUploadingAttachment } =
    useUploadPicture();
  const toast = useToastMessage();

  const currentProjectTemplate = useSelector(
    (state: RootState) => state.project.projectTemplate
  );

  const { tasks: socketTasks } = useSocket();

  useEffect(() => {
    const map = new Map();

    tasks.forEach((task) => {
      map.set(task.taskId, task);
    });

    socketTasks.forEach((sckttask) => {
      map.set(sckttask.taskId, sckttask);
    });

    setCombinedTasks(Array.from(map.values()));
  }, [tasks, socketTasks]);

  // single task fetching
  const { data: taskData } = useGetOneTask(
    workspaceId,
    projectId,
    selectedTask,
    {
      enabled: isTaskModalOpen && !!selectedTask,
    }
  );

  const { data: subTasks } = useGetAllSubTasks(
    workspaceId,
    projectId,
    selectedTask,
    {
      enabled: isTaskModalOpen && !!selectedTask,
    }
  );

  // map tasks to board view format
  const boardTasks = useMemo(() => {
    const filtered = activeSprint
      ? combinedTasks.filter((t) => t.sprintId === activeSprint.sprintId)
      : combinedTasks;

    return filtered.map((task) => ({
      taskId: task.taskId,
      task: task.task,
      status: task.status,
      assignedTo: task.assignedTo as WorkspaceMember,
      workItemType: task.workItemType,
    }));
  }, [combinedTasks, activeSprint]);

  const formatedTasks: Section[] = useMemo(
    () => formatDataIntoSections(combinedTasks, members, sprints),
    [combinedTasks, members, sprints]
  );

  const [activeTab, setActiveTab] = useState("Board");
  const tabs = ["Board", "List", "Backlog"];

  const projectName = useSelector(
    (state: RootState) => state.project.projectName
  );

  // function handle status change
  const handleStatusChange = useCallback(
    (value: TaskStatus, taskId: string) => {
      if (value === TaskStatus.Completed) {
        setPendingCompletionTaskId(taskId);
      } else {
        changeStatus(value, taskId);
      }
    },
    [changeStatus]
  );

  const handleCompletionConfirm = async (file: File | null) => {
    if (!pendingCompletionTaskId) return;

    try {
      if (file) {
        if (!cloudinarySignature) {
          toast.showError({
            title: "Uploading failed!",
            description:
              "Failed to fetch signature try again or contact support",
            duration: 6000,
          });
          return;
        }

        const { timeStamp, signature, apiKey, cloudName } = cloudinarySignature;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timeStamp));
        formData.append("signature", signature);
        formData.append("folder", "avatars");

        const response = await uploadPicture({ cloudName, data: formData });

        if (response.secure_url) {
          const attachmentComment: JSONContent = {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Task completed with attachment: ",
                  },
                  {
                    type: "text",
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: response.secure_url,
                          target: "_blank",
                        },
                      },
                    ],
                    text: "View Attachment",
                  },
                ],
              },
            ],
          };
          handlePostComment(attachmentComment, pendingCompletionTaskId);
        }
      }

      changeStatus(TaskStatus.Completed, pendingCompletionTaskId);
    } catch (error) {
      console.error("Failed to complete task with attachment:", error);
    } finally {
      setPendingCompletionTaskId(null);
    }
  };

  // function to handle priority change
  const handlePriorityChange = useCallback(
    (value: TaskPriority, taskId: string) => {
      handleEditTask(taskId, { priority: value });
    },
    [handleEditTask]
  );

  const contextValue = {
    members,
    epics,
    setSelectedTask,
    setIsTaskModalOpen,
    onInvite: handleEditTask,
    handleParentAttach,
    handleStatusChange,
    isAttaching,
    activeSprint,
  };

  return (
    <TaskPageContext.Provider value={contextValue}>
      <div className="min-h-[calc(100vh-75px)] bg-slate-50/50 dark:bg-background transition-colors duration-300">
        {/* Header */}
        <div className="border-b border-border sticky top-[75px] z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground">
                  {projectName}
                </h1>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6">
            <div className="flex gap-6">
              {tabs.map((tab) => {
                if (
                  tab === "Backlog" &&
                  currentProjectTemplate !== projectTemplate.scrum
                ) {
                  return null;
                }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "Board" && <LayoutGrid size={16} />}
                    {tab === "List" && <List size={16} />}
                    {tab === "Backlog" && <Archive size={16} />}
                    {tab === "Timeline" && <GanttChart size={16} />}
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "Board" && (
            <BoardView
              tasksData={boardTasks ? boardTasks : []}
              createTask={createTask}
              isCreating={isCreating}
              handleStatusChange={handleStatusChange}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "List" && (
            <ListView
              projectId={projectId}
              tasks={combinedTasks}
              handlePriorityChange={handlePriorityChange}
              handleStatusChange={handleStatusChange}
              filters={filters}
              setFilters={setFilters}
            />
          )}

          {activeTab === "Backlog" && (
            <BacklogView
              addEpic={addEpic}
              sectionsData={formatedTasks}
              createTask={createTask}
              handleStatusChange={handleStatusChange}
              handleSprintAttach={handleSprintAttach}
              setActiveTab={setActiveTab}
            />
          )}
        </div>

        {taskData?.data && (
          <TaskDetails
            handleEditTask={handleEditTask}
            createTask={createTask}
            removeTask={removeTask}
            isVisible={isTaskModalOpen}
            close={() => setIsTaskModalOpen(false)}
            task={taskData.data}
            isEditing={isEditing}
            subTasks={subTasks?.data}
            handlePostComment={handlePostComment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
          />
        )}

        <TaskCompletionModal
          isOpen={!!pendingCompletionTaskId}
          onClose={() => setPendingCompletionTaskId(null)}
          onConfirm={handleCompletionConfirm}
          isUploading={isUploadingAttachment}
        />
      </div>
    </TaskPageContext.Provider>
  );
}

export default TaskListingPageTemplate;
